import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Bot, CalendarClock, Mail, MessageCircle, RefreshCw, Search, User, X } from 'lucide-react';
import { panel } from '../lib/api';

// Centro de prospección del panel (pestaña "Prospección"): campañas de WhatsApp y de correo en un solo
// lugar, al estilo Apollo. Los datos los mandan los servidores de campaña a leads-api cada 5–10 minutos
// (POST /api/outreach/ingest); acá solo se leen.

const REFRESH_MS = 60000;

export const OUTREACH_STATES = {
  programado: { label: 'En cola', cls: 'bg-slate-100 text-slate-600' },
  enviado: { label: 'Enviado', cls: 'bg-sky-100 text-sky-800' },
  respondio: { label: 'Respondió', cls: 'bg-amber-100 text-amber-800' },
  interesado: { label: 'Interesado', cls: 'bg-[#d9fb06] text-[#182A2C]' },
  reunion: { label: 'Reunión agendada', cls: 'bg-violet-100 text-violet-800' },
  requiere_humano: { label: 'Quiere hablar con alguien', cls: 'bg-orange-100 text-orange-800' },
  no_interesado: { label: 'No interesado', cls: 'bg-slate-200 text-slate-500' },
  baja: { label: 'Pidió la baja', cls: 'bg-red-50 text-red-600' },
  rebote: { label: 'Rebotó', cls: 'bg-red-50 text-red-600' },
  sin_whatsapp: { label: 'Sin WhatsApp', cls: 'bg-slate-100 text-slate-400' },
  cliente: { label: 'Cliente', cls: 'bg-emerald-100 text-emerald-800' },
};
const stateOf = (id) => OUTREACH_STATES[id] || { label: id, cls: 'bg-slate-100 text-slate-600' };

const CAMPAIGNS = {
  'contadores-co': 'Contadores Colombia · web',
  'agente-ia-ar': 'Agente IA · Argentina',
  prueba: 'Prueba',
};
const campaignLabel = (c) => CAMPAIGNS[c] || c || '—';

// Orden del embudo: cuántos llegaron al menos a cada etapa
const REACHED = {
  enviado: ['enviado', 'respondio', 'interesado', 'reunion', 'requiere_humano', 'no_interesado', 'baja', 'cliente'],
  respondio: ['respondio', 'interesado', 'reunion', 'requiere_humano', 'no_interesado', 'baja', 'cliente'],
  interesado: ['interesado', 'reunion', 'cliente'],
  reunion: ['reunion', 'cliente'],
};
const NEEDS_ATTENTION = ['respondio', 'interesado', 'requiere_humano', 'reunion'];

const toDate = (v) => (v ? new Date(v) : null);
const fmt = (v) => (v ? new Date(v).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—');
const fmtDay = (iso) => (iso ? new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit' }) : '—');
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '—');
const dayKey = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(d);

const ChannelIcon = ({ canal, size = 15 }) => (canal === 'email'
  ? <Mail size={size} className="text-sky-600" aria-label="Correo" />
  : <MessageCircle size={size} className="text-[#25D366]" aria-label="WhatsApp" />);

const Kpi = ({ label, value, sub, highlight }) => (
  <div className={`rounded-2xl border p-4 ${highlight ? 'border-[#182A2C] bg-[#182A2C] text-white' : 'border-slate-200 bg-white'}`}>
    <p className={`text-xs font-bold uppercase tracking-wide ${highlight ? 'text-[#d9fb06]' : 'text-slate-500'}`}>{label}</p>
    <p className="mt-1 text-3xl font-black">{value}</p>
    {sub && <p className={`mt-1 text-xs ${highlight ? 'text-white/60' : 'text-slate-500'}`}>{sub}</p>}
  </div>
);

// Envíos y respuestas por día (últimos 21 días), barras apiladas por canal
const DailyChart = ({ envios, respuestas }) => {
  const days = [];
  for (let i = 20; i >= 0; i -= 1) days.push(dayKey(new Date(Date.now() - i * 864e5)));
  const get = (rows, canal, d) => rows.filter((r) => r.dia === d && (!canal || r.canal === canal)).reduce((s, r) => s + r.n, 0);
  const max = Math.max(4, ...days.map((d) => get(envios, null, d)));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="font-black text-[#182A2C]">Envíos y respuestas por día</h3>
        <span className="flex items-center gap-1.5 text-xs text-slate-500"><i className="h-2.5 w-2.5 rounded-sm bg-[#25D366]" /> WhatsApp</span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500"><i className="h-2.5 w-2.5 rounded-sm bg-sky-500" /> Correo</span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500"><i className="h-2.5 w-2.5 rounded-full bg-[#182A2C]" /> Respuestas</span>
      </div>
      <div className="mt-5 flex h-40 items-end gap-1.5">
        {days.map((d) => {
          const wa = get(envios, 'whatsapp', d);
          const em = get(envios, 'email', d);
          const rs = get(respuestas, null, d);
          return (
            <div key={d} className="group relative flex h-full flex-1 flex-col justify-end" title={`${fmtDay(d)}: ${wa} WhatsApp · ${em} correos · ${rs} respuestas`}>
              {rs > 0 && <span className="mb-1 self-center rounded-full bg-[#182A2C] px-1.5 text-[10px] font-bold text-white">{rs}</span>}
              <div className="w-full rounded-t bg-sky-500" style={{ height: `${(em / max) * 100}%` }} />
              <div className="w-full bg-[#25D366]" style={{ height: `${(wa / max) * 100}%` }} />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-400"><span>{fmtDay(days[0])}</span><span>hoy</span></div>
    </div>
  );
};

const Funnel = ({ items }) => {
  const total = items.length;
  const steps = [
    ['En campaña', total],
    ['Enviados', items.filter((p) => REACHED.enviado.includes(p.estado)).length],
    ['Respondieron', items.filter((p) => REACHED.respondio.includes(p.estado)).length],
    ['Interesados', items.filter((p) => REACHED.interesado.includes(p.estado)).length],
    ['Reuniones', items.filter((p) => REACHED.reunion.includes(p.estado)).length],
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-black text-[#182A2C]">Embudo</h3>
      <div className="mt-4 space-y-2.5">
        {steps.map(([label, n], i) => (
          <div key={label}>
            <div className="flex justify-between text-sm"><span className="font-semibold text-slate-700">{label}</span><span className="font-black text-[#182A2C]">{n}{i > 0 && <span className="ml-2 text-xs font-semibold text-slate-400">{pct(n, steps[i - 1][1])}</span>}</span></div>
            <div className="mt-1 h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-[#182A2C]" style={{ width: total ? `${Math.max(2, (n / total) * 100)}%` : 0 }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Conversación completa de un prospecto
const Conversation = ({ prospect, onClose }) => {
  const [msgs, setMsgs] = useState(null);
  useEffect(() => {
    setMsgs(null);
    panel.outreachMessages(prospect.key).then(setMsgs).catch(() => setMsgs([]));
  }, [prospect.key]);
  const phone = prospect.canal === 'whatsapp' ? (prospect.contacto || '').replace(/\D/g, '') : '';
  const st = stateOf(prospect.estado);
  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/30" onClick={onClose}>
      <aside className="flex h-full w-full max-w-xl flex-col bg-[#f4f7f9] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <header className="border-b border-slate-200 bg-white p-5">
          <div className="flex items-start gap-3">
            <ChannelIcon canal={prospect.canal} size={20} />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-black text-[#182A2C]">{prospect.nombre}</h3>
              <p className="text-sm text-slate-500">{campaignLabel(prospect.campana)} · {prospect.pais}{prospect.extra?.rubro ? ` · ${prospect.extra.rubro}` : ''}</p>
            </div>
            <button type="button" onClick={onClose} className="bg-transparent text-slate-500" aria-label="Cerrar"><X size={20} /></button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${st.cls}`}>{st.label}</span>
            {prospect.reunion && <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800"><CalendarClock size={13} /> {prospect.reunion}</span>}
            {phone && <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#182A2C] underline">Abrir en WhatsApp</a>}
            {prospect.canal === 'email' && <a href={`mailto:${prospect.contacto}`} className="font-semibold text-[#182A2C] underline">{prospect.contacto}</a>}
            {prospect.web && <a href={prospect.web} target="_blank" rel="noopener noreferrer" className="text-slate-500 underline">Ver su web</a>}
          </div>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {msgs === null && <p className="text-sm text-slate-500">Cargando conversación…</p>}
          {msgs && msgs.length === 0 && <p className="text-sm text-slate-500">{prospect.estado === 'programado' ? `Todavía no se le escribió. Envío estimado: ${fmtDay(prospect.programadoPara)}.` : 'Sin mensajes registrados todavía.'}</p>}
          {(msgs || []).map((m) => {
            if (m.de === 'sistema') return <p key={m.id} className="mx-auto max-w-[90%] rounded-lg bg-slate-200/70 px-3 py-1.5 text-center text-xs text-slate-600">{m.texto} · {fmt(m.at)}</p>;
            const mine = m.de !== 'prospecto';
            const who = m.de === 'ia' ? 'IA' : m.de === 'websy' ? (m.tipo === 'campana' ? 'Mensaje de campaña' : 'Websy') : prospect.nombre;
            return (
              <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.de === 'ia' ? 'bg-[#efffb0] text-[#182A2C]' : mine ? 'bg-[#182A2C] text-white' : 'bg-white text-slate-800'}`}>
                  <p className={`mb-1 flex items-center gap-1 text-[11px] font-bold ${mine && m.de !== 'ia' ? 'text-white/60' : 'text-slate-500'}`}>
                    {m.de === 'ia' ? <Bot size={12} /> : <User size={12} />} {who} · {fmt(m.at)}
                  </p>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.texto}</p>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export const ProspectingCenter = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loadedAt, setLoadedAt] = useState(null);
  const [open, setOpen] = useState(null);
  const [f, setF] = useState({ canal: '', campana: '', estado: '', q: '' });

  const load = useCallback(async () => {
    try {
      setData(await panel.outreach());
      setLoadedAt(new Date());
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, []);
  useEffect(() => {
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, [load]);

  const all = useMemo(() => data?.prospects || [], [data]);
  const scoped = useMemo(() => all.filter((p) => (!f.canal || p.canal === f.canal) && (!f.campana || p.campana === f.campana)), [all, f.canal, f.campana]);
  const table = useMemo(() => scoped.filter((p) => (!f.estado || p.estado === f.estado)
    && (!f.q || JSON.stringify([p.nombre, p.contacto, p.ultimaRespuesta, p.extra?.rubro]).toLowerCase().includes(f.q.toLowerCase()))), [scoped, f.estado, f.q]);

  if (error && !data) return <p className="mt-6 rounded-xl bg-red-50 p-6 font-semibold text-red-700">No se pudo cargar la prospección: {error}</p>;
  if (!data) return <p className="mt-6 text-slate-500">Cargando prospección…</p>;

  const today = dayKey(new Date());
  const sentToday = scoped.filter((p) => p.enviadoAt && dayKey(new Date(p.enviadoAt)) === today).length;
  const sent = scoped.filter((p) => REACHED.enviado.includes(p.estado)).length;
  const replied = scoped.filter((p) => REACHED.respondio.includes(p.estado)).length;
  const interested = scoped.filter((p) => REACHED.interesado.includes(p.estado)).length;
  const meetings = scoped.filter((p) => REACHED.reunion.includes(p.estado)).length;
  const queued = scoped.filter((p) => p.estado === 'programado');
  const lost = scoped.filter((p) => ['no_interesado', 'baja'].includes(p.estado)).length;
  const failed = scoped.filter((p) => ['rebote', 'sin_whatsapp'].includes(p.estado)).length;
  const attention = scoped.filter((p) => NEEDS_ATTENTION.includes(p.estado)).sort((a, b) => toDate(b.ultimoAt) - toDate(a.ultimoAt));
  const upcoming = [...queued].sort((a, b) => String(a.programadoPara).localeCompare(String(b.programadoPara)));
  const nextDay = upcoming[0]?.programadoPara;
  const campaigns = [...new Set(all.map((p) => p.campana).filter(Boolean))];
  const sel = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <select value={f.canal} onChange={set('canal')} className={sel} aria-label="Canal">
          <option value="">WhatsApp y correo</option><option value="whatsapp">Solo WhatsApp</option><option value="email">Solo correo</option>
        </select>
        <select value={f.campana} onChange={set('campana')} className={sel} aria-label="Campaña">
          <option value="">Todas las campañas</option>
          {campaigns.map((c) => <option key={c} value={c}>{campaignLabel(c)}</option>)}
        </select>
        <button type="button" onClick={load} className="bg-transparent ml-auto inline-flex items-center gap-1.5 text-sm text-slate-500"><RefreshCw size={14} /> {loadedAt ? `Actualizado ${loadedAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}` : ''}</button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi highlight label="Reuniones agendadas" value={meetings} sub={`${pct(meetings, sent)} de los contactados`} />
        <Kpi label="Interesados" value={interested} sub={`${replied} respondieron · ${pct(replied, sent)} de respuesta`} />
        <Kpi label="Enviados" value={sent} sub={`${sentToday} hoy`} />
        <Kpi label="En cola" value={queued.length} sub={nextDay ? `Próximo envío: ${fmtDay(nextDay)}` : 'Cola vacía'} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Requieren atención" value={attention.filter((p) => p.estado !== 'reunion').length} sub="Respondieron o piden hablar con alguien" />
        <Kpi label="No interesados" value={lost} sub="Incluye pedidos de baja" />
        <Kpi label="No entregados" value={failed} sub="Rebotes y números sin WhatsApp" />
        <Kpi label="Prospectos" value={scoped.length} sub={`${scoped.filter((p) => p.canal === 'whatsapp').length} WhatsApp · ${scoped.filter((p) => p.canal === 'email').length} correo`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><DailyChart envios={(data.enviosPorDia || []).filter((r) => !f.canal || r.canal === f.canal)} respuestas={(data.respuestasPorDia || []).filter((r) => !f.canal || r.canal === f.canal)} /></div>
        <Funnel items={scoped} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-black text-[#182A2C]">Para atender ahora</h3>
          <p className="mt-1 text-xs text-slate-500">Respondieron, mostraron interés o agendaron. El agente de WhatsApp contesta solo; los correos los contestas tú.</p>
          <ul className="mt-4 divide-y divide-slate-100">
            {attention.slice(0, 12).map((p) => (
              <li key={p.key}>
                <button type="button" onClick={() => setOpen(p)} className="flex w-full items-start gap-3 bg-transparent py-2.5 text-left">
                  <ChannelIcon canal={p.canal} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[#182A2C]">{p.nombre}</span>
                    <span className="block truncate text-xs text-slate-500">{p.reunion ? `Reunión: ${p.reunion}` : p.ultimaRespuesta || 'Sin texto'}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${stateOf(p.estado).cls}`}>{stateOf(p.estado).label}</span>
                </button>
              </li>
            ))}
            {!attention.length && <li className="py-2 text-sm text-slate-500">Nadie respondió todavía.</li>}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-black text-[#182A2C]">Próximos envíos</h3>
          <p className="mt-1 text-xs text-slate-500">Lunes a viernes de 9 a 16 h de Colombia, repartidos en el día. WhatsApp: 10 por día · correo: 8 por día.</p>
          <ul className="mt-4 divide-y divide-slate-100 text-sm">
            {upcoming.slice(0, 12).map((p) => (
              <li key={p.key} className="flex items-center gap-3 py-2">
                <ChannelIcon canal={p.canal} />
                <span className="min-w-0 flex-1 truncate text-slate-700">{p.nombre}</span>
                <span className="shrink-0 text-xs font-semibold text-slate-500">{fmtDay(p.programadoPara)}</span>
              </li>
            ))}
            {!upcoming.length && <li className="py-2 text-slate-500">No hay envíos en cola.</li>}
          </ul>
          {upcoming.length > 12 && <p className="mt-2 text-xs text-slate-400">y {upcoming.length - 12} más en cola</p>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <h3 className="mr-auto font-black text-[#182A2C]">Prospectos ({table.length})</h3>
          <label className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={f.q} onChange={set('q')} placeholder="Buscar nombre, contacto, respuesta…" className={`${sel} w-64 pl-9`} />
          </label>
          <select value={f.estado} onChange={set('estado')} className={sel} aria-label="Estado">
            <option value="">Todos los estados</option>
            {Object.entries(OUTREACH_STATES).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr><th className="px-4 py-3">Negocio</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Campaña</th><th className="px-4 py-3">Enviado</th><th className="px-4 py-3">Última respuesta</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {table.slice(0, 400).map((p) => (
                <tr key={p.key} onClick={() => setOpen(p)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2"><ChannelIcon canal={p.canal} /><span className="max-w-[260px] truncate font-semibold text-[#182A2C]">{p.nombre}</span></span>
                    <span className="ml-6 block text-xs text-slate-400">{p.contacto}</span>
                  </td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${stateOf(p.estado).cls}`}>{stateOf(p.estado).label}</span></td>
                  <td className="px-4 py-3 text-slate-600">{campaignLabel(p.campana)} · {p.pais}</td>
                  <td className="px-4 py-3 text-slate-600">{p.enviadoAt ? fmt(p.enviadoAt) : p.programadoPara ? `Programado ${fmtDay(p.programadoPara)}` : '—'}</td>
                  <td className="max-w-[280px] truncate px-4 py-3 text-slate-500">{p.ultimaRespuesta || '—'}</td>
                </tr>
              ))}
              {!table.length && <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-500">No hay prospectos con estos filtros.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {open && <Conversation prospect={open} onClose={() => setOpen(null)} />}
    </div>
  );
};
