import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Bot, CalendarClock, Mail, MessageCircle, Search, User } from 'lucide-react';
import { panel } from '../lib/api';

// Centro de prospección del panel: campañas de WhatsApp y de correo en un solo lugar, al estilo Apollo.
// Los datos los mandan los servidores de campaña a leads-api cada 5–10 minutos (POST /api/outreach/ingest);
// acá solo se leen. Vistas: resumen, bandeja (conversaciones), prospectos y cola de envíos.

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
const NEEDS_ATTENTION = ['respondio', 'interesado', 'requiere_humano'];

const toDate = (v) => (v ? new Date(v) : null);
const fmt = (v) => (v ? new Date(v).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—');
const fmtDay = (iso) => (iso ? new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit' }) : '—');
const fmtLongDay = (iso) => new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '—');
const dayKey = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(d);
const ago = (v) => {
  if (!v) return '';
  const m = Math.round((Date.now() - new Date(v)) / 60000);
  if (m < 60) return `${Math.max(1, m)} min`;
  if (m < 1440) return `${Math.round(m / 60)} h`;
  return `${Math.round(m / 1440)} d`;
};

// Datos de prospección con refresco cada minuto; lo usa el panel para los contadores de la barra lateral
export const useOutreach = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loadedAt, setLoadedAt] = useState(null);
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
  return { data, error, loadedAt, load };
};
export const attentionCount = (data) => (data?.prospects || []).filter((p) => NEEDS_ATTENTION.includes(p.estado)).length;
export const queuedCount = (data) => (data?.prospects || []).filter((p) => p.estado === 'programado').length;

const ChannelIcon = ({ canal, size = 15 }) => (canal === 'email'
  ? <Mail size={size} className="shrink-0 text-sky-600" aria-label="Correo" />
  : <MessageCircle size={size} className="shrink-0 text-[#25D366]" aria-label="WhatsApp" />);

const Badge = ({ estado }) => <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ${stateOf(estado).cls}`}>{stateOf(estado).label}</span>;

const Card = ({ title, sub, action, children, className = '' }) => (
  <section className={`rounded-2xl border border-slate-200 bg-white ${className}`}>
    {title && (
      <header className="flex items-start gap-3 border-b border-slate-100 px-5 py-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-[#182A2C]">{title}</h3>
          {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
        </div>
        {action}
      </header>
    )}
    {children}
  </section>
);

const Kpi = ({ label, value, sub, highlight }) => (
  <div className={`rounded-2xl border p-5 ${highlight ? 'border-[#182A2C] bg-[#182A2C] text-white' : 'border-slate-200 bg-white'}`}>
    <p className={`text-[11px] font-bold uppercase tracking-wider ${highlight ? 'text-[#d9fb06]' : 'text-slate-500'}`}>{label}</p>
    <p className="mt-2 text-3xl font-black tabular-nums">{value}</p>
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
    <Card
      title="Envíos y respuestas por día"
      sub="Últimos 21 días"
      action={(
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#25D366]" /> WhatsApp</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-sky-500" /> Correo</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#182A2C]" /> Respuestas</span>
        </div>
      )}
    >
      <div className="p-5">
        <div className="flex h-44 items-end gap-1.5">
          {days.map((d) => {
            const wa = get(envios, 'whatsapp', d);
            const em = get(envios, 'email', d);
            const rs = get(respuestas, null, d);
            return (
              <div key={d} className="relative flex h-full flex-1 flex-col justify-end" title={`${fmtDay(d)}: ${wa} WhatsApp · ${em} correos · ${rs} respuestas`}>
                {rs > 0 && <span className="mb-1 self-center rounded-full bg-[#182A2C] px-1.5 text-[10px] font-bold text-white">{rs}</span>}
                <div className="w-full rounded-t bg-sky-500" style={{ height: `${(em / max) * 100}%` }} />
                <div className={`w-full bg-[#25D366] ${em ? '' : 'rounded-t'}`} style={{ height: `${(wa / max) * 100}%` }} />
                {!wa && !em && <div className="h-0.5 w-full rounded bg-slate-100" />}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-400"><span>{fmtDay(days[0])}</span><span>hoy</span></div>
      </div>
    </Card>
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
    <Card title="Embudo" sub="Cuántos llegaron a cada etapa">
      <div className="space-y-3 p-5">
        {steps.map(([label, n], i) => (
          <div key={label}>
            <div className="flex justify-between text-sm"><span className="font-semibold text-slate-700">{label}</span><span className="font-black tabular-nums text-[#182A2C]">{n}{i > 0 && <span className="ml-2 text-xs font-semibold text-slate-400">{pct(n, steps[i - 1][1])}</span>}</span></div>
            <div className="mt-1 h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${i === steps.length - 1 ? 'bg-violet-500' : 'bg-[#182A2C]'}`} style={{ width: total ? `${Math.max(n ? 2 : 0, (n / total) * 100)}%` : 0 }} /></div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Conversación completa de un prospecto (panel derecho de la bandeja)
const Conversation = ({ prospect, onBack }) => {
  const [msgs, setMsgs] = useState(null);
  useEffect(() => {
    setMsgs(null);
    panel.outreachMessages(prospect.key).then(setMsgs).catch(() => setMsgs([]));
  }, [prospect.key, prospect.ultimoAt]);
  const phone = prospect.canal === 'whatsapp' ? (prospect.contacto || '').replace(/\D/g, '') : '';
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-start gap-3">
          <button type="button" onClick={onBack} className="-ml-1 mt-0.5 rounded-lg bg-transparent p-1 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Volver"><ArrowLeft size={18} /></button>
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100"><ChannelIcon canal={prospect.canal} size={17} /></span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-black text-[#182A2C]">{prospect.nombre}</h3>
            <p className="truncate text-sm text-slate-500">{campaignLabel(prospect.campana)} · {prospect.pais}{prospect.extra?.rubro ? ` · ${prospect.extra.rubro}` : ''} · {prospect.contacto}</p>
          </div>
          <Badge estado={prospect.estado} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {prospect.reunion && <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800"><CalendarClock size={13} /> {prospect.reunion}</span>}
          {phone && <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-xs font-bold text-white"><MessageCircle size={13} /> Abrir en WhatsApp</a>}
          {prospect.canal === 'email' && <a href={`mailto:${prospect.contacto}`} className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-1 text-xs font-bold text-white"><Mail size={13} /> Responder por correo</a>}
          {prospect.web && <a href={prospect.web} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-500 underline">Ver su web</a>}
        </div>
      </header>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#eef2f4] p-5">
        {msgs === null && <p className="text-sm text-slate-500">Cargando conversación…</p>}
        {msgs && msgs.length === 0 && <p className="text-sm text-slate-500">{prospect.estado === 'programado' ? `Todavía no se le escribió. Envío estimado: ${fmtDay(prospect.programadoPara)}.` : 'Sin mensajes registrados todavía.'}</p>}
        {(msgs || []).map((m) => {
          if (m.de === 'sistema') return <p key={m.id} className="mx-auto w-fit max-w-[90%] rounded-lg bg-white/70 px-3 py-1.5 text-center text-xs font-semibold text-slate-600">{m.texto} · {fmt(m.at)}</p>;
          const mine = m.de !== 'prospecto';
          const who = m.de === 'ia' ? 'Agente IA' : m.de === 'websy' ? (m.tipo === 'campana' ? 'Mensaje de campaña' : 'Websy') : prospect.nombre;
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.de === 'ia' ? 'rounded-br-md bg-[#efffb0] text-[#182A2C]' : mine ? 'rounded-br-md bg-[#182A2C] text-white' : 'rounded-bl-md bg-white text-slate-800'}`}>
                <p className={`mb-1 flex items-center gap-1 text-[11px] font-bold ${mine && m.de !== 'ia' ? 'text-white/60' : 'text-slate-500'}`}>
                  {m.de === 'ia' ? <Bot size={12} /> : <User size={12} />} {who} · {fmt(m.at)}
                </p>
                <p className="whitespace-pre-wrap leading-relaxed">{m.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const INBOX_TABS = [
  ['atender', 'Por atender'],
  ['respuestas', 'Con respuesta'],
  ['todas', 'Todas'],
];

const Inbox = ({ items, selected, onSelect }) => {
  const [tab, setTab] = useState('atender');
  const [q, setQ] = useState('');
  const lists = {
    atender: items.filter((p) => NEEDS_ATTENTION.includes(p.estado) || p.estado === 'reunion'),
    respuestas: items.filter((p) => p.respondioAt || REACHED.respondio.includes(p.estado)),
    todas: items.filter((p) => p.estado !== 'programado'),
  };
  const list = lists[tab]
    .filter((p) => !q || JSON.stringify([p.nombre, p.contacto, p.ultimaRespuesta]).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => toDate(b.ultimoAt || b.enviadoAt) - toDate(a.ultimoAt || a.enviadoAt));
  const current = items.find((p) => p.key === selected) || null;

  return (
    <div className="flex h-[calc(100vh-9.5rem)] min-h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className={`${current ? 'hidden lg:flex' : 'flex'} w-full flex-col border-r border-slate-200 lg:w-[360px] lg:shrink-0`}>
        <div className="space-y-3 border-b border-slate-100 p-3">
          <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-bold">
            {INBOX_TABS.map(([id, label]) => (
              <button key={id} type="button" onClick={() => setTab(id)} className={`flex-1 rounded-md px-2 py-1.5 ${tab === id ? 'bg-white text-[#182A2C] shadow-sm' : 'bg-transparent text-slate-500'}`}>
                {label} <span className="text-slate-400">{lists[id].length}</span>
              </button>
            ))}
          </div>
          <label className="relative block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar conversación…" className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm" />
          </label>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto">
          {list.map((p) => (
            <li key={p.key}>
              <button type="button" onClick={() => onSelect(p.key)} className={`flex w-full gap-3 border-l-[3px] px-4 py-3 text-left ${p.key === selected ? 'border-[#182A2C] bg-slate-50' : 'border-transparent bg-transparent hover:bg-slate-50'}`}>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100"><ChannelIcon canal={p.canal} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-[#182A2C]">{p.nombre}</span>
                    <span className="shrink-0 text-[11px] text-slate-400">{ago(p.ultimoAt || p.enviadoAt)}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500">{p.reunion ? `Reunión: ${p.reunion}` : p.ultimaRespuesta || 'Sin respuesta todavía'}</span>
                  <span className="mt-1.5 block"><Badge estado={p.estado} /></span>
                </span>
              </button>
            </li>
          ))}
          {!list.length && <li className="p-6 text-center text-sm text-slate-500">{tab === 'atender' ? 'Nada pendiente. Cuando alguien responda aparece acá.' : 'No hay conversaciones.'}</li>}
        </ul>
      </div>
      <div className={`${current ? 'flex' : 'hidden lg:flex'} min-w-0 flex-1 flex-col`}>
        {current ? <Conversation prospect={current} onBack={() => onSelect(null)} /> : (
          <div className="flex flex-1 flex-col items-center justify-center bg-[#f8fafb] p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"><Bot size={26} className="text-[#182A2C]" /></span>
            <p className="mt-4 font-bold text-[#182A2C]">Elige una conversación</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">Ves lo que se envió, lo que respondió el prospecto y lo que contestó el agente de IA.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Overview = ({ scoped, data, canal, onOpen, onView }) => {
  const today = dayKey(new Date());
  const sentToday = scoped.filter((p) => p.enviadoAt && dayKey(new Date(p.enviadoAt)) === today).length;
  const sent = scoped.filter((p) => REACHED.enviado.includes(p.estado)).length;
  const replied = scoped.filter((p) => REACHED.respondio.includes(p.estado)).length;
  const interested = scoped.filter((p) => REACHED.interesado.includes(p.estado)).length;
  const meetings = scoped.filter((p) => REACHED.reunion.includes(p.estado)).length;
  const queued = scoped.filter((p) => p.estado === 'programado');
  const nextDay = [...queued].sort((a, b) => String(a.programadoPara).localeCompare(String(b.programadoPara)))[0]?.programadoPara;
  const attention = scoped.filter((p) => NEEDS_ATTENTION.includes(p.estado) || p.estado === 'reunion').sort((a, b) => toDate(b.ultimoAt) - toDate(a.ultimoAt));
  const byCampaign = [...new Set(scoped.map((p) => p.campana))].map((c) => {
    const it = scoped.filter((p) => p.campana === c);
    const n = (k) => it.filter((p) => REACHED[k].includes(p.estado)).length;
    return { c, canales: [...new Set(it.map((p) => p.canal))], total: it.length, enviados: n('enviado'), resp: n('respondio'), int: n('interesado'), reu: n('reunion'), cola: it.filter((p) => p.estado === 'programado').length };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Kpi highlight label="Reuniones agendadas" value={meetings} sub={`${pct(meetings, sent)} de los contactados`} />
        <Kpi label="Interesados" value={interested} sub={`${replied} respondieron · ${pct(replied, sent)} de respuesta`} />
        <Kpi label="Enviados" value={sent} sub={`${sentToday} hoy`} />
        <Kpi label="En cola" value={queued.length} sub={nextDay ? `Próximo envío: ${fmtDay(nextDay)}` : 'Cola vacía'} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DailyChart envios={(data.enviosPorDia || []).filter((r) => !canal || r.canal === canal)} respuestas={(data.respuestasPorDia || []).filter((r) => !canal || r.canal === canal)} />
        </div>
        <Funnel items={scoped} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Campañas"
          sub="WhatsApp: 10 por día · correo: 8 por día · lunes a viernes de 9 a 16 h de Colombia"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400">
                <tr><th className="px-5 py-3 font-bold">Campaña</th><th className="px-3 py-3 text-right font-bold">Enviados</th><th className="px-3 py-3 text-right font-bold">Respuesta</th><th className="px-3 py-3 text-right font-bold">Interesados</th><th className="px-3 py-3 text-right font-bold">Reuniones</th><th className="px-5 py-3 text-right font-bold">En cola</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {byCampaign.map((r) => (
                  <tr key={r.c}>
                    <td className="px-5 py-3"><span className="flex items-center gap-2 font-semibold text-[#182A2C]">{r.canales.map((c) => <ChannelIcon key={c} canal={c} />)} {campaignLabel(r.c)}</span></td>
                    <td className="px-3 py-3 text-right tabular-nums">{r.enviados}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{pct(r.resp, r.enviados)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{r.int}</td>
                    <td className="px-3 py-3 text-right font-black tabular-nums text-[#182A2C]">{r.reu}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-slate-500">{r.cola}</td>
                  </tr>
                ))}
                {!byCampaign.length && <tr><td colSpan="6" className="px-5 py-6 text-center text-slate-500">Sin campañas todavía.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Para atender ahora" sub="Respondieron, se interesaron o agendaron" action={<button type="button" onClick={() => onView('bandeja')} className="bg-transparent text-xs font-bold text-[#182A2C] underline">Abrir bandeja</button>}>
          <ul className="divide-y divide-slate-100">
            {attention.slice(0, 6).map((p) => (
              <li key={p.key}>
                <button type="button" onClick={() => onOpen(p.key)} className="flex w-full items-start gap-3 bg-transparent px-5 py-3 text-left hover:bg-slate-50">
                  <ChannelIcon canal={p.canal} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[#182A2C]">{p.nombre}</span>
                    <span className="block truncate text-xs text-slate-500">{p.reunion ? `Reunión: ${p.reunion}` : p.ultimaRespuesta || 'Sin texto'}</span>
                  </span>
                  <Badge estado={p.estado} />
                </button>
              </li>
            ))}
            {!attention.length && <li className="px-5 py-6 text-sm text-slate-500">Nadie respondió todavía.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
};

const Prospects = ({ scoped, onOpen }) => {
  const [estado, setEstado] = useState('');
  const [q, setQ] = useState('');
  const table = scoped.filter((p) => (!estado || p.estado === estado)
    && (!q || JSON.stringify([p.nombre, p.contacto, p.ultimaRespuesta, p.extra?.rubro]).toLowerCase().includes(q.toLowerCase())));
  const counts = scoped.reduce((acc, p) => ({ ...acc, [p.estado]: (acc[p.estado] || 0) + 1 }), {});
  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
        <button type="button" onClick={() => setEstado('')} className={`rounded-full px-3 py-1.5 text-xs font-bold ${!estado ? 'bg-[#182A2C] text-white' : 'bg-slate-100 text-slate-600'}`}>Todos {scoped.length}</button>
        {Object.entries(OUTREACH_STATES).filter(([id]) => counts[id]).map(([id, s]) => (
          <button key={id} type="button" onClick={() => setEstado(id)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${estado === id ? 'bg-[#182A2C] text-white' : 'bg-slate-100 text-slate-600'}`}>{s.label} {counts[id]}</button>
        ))}
        <label className="relative ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nombre, contacto, respuesta…" className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm" />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr><th className="px-5 py-3 font-bold">Negocio</th><th className="px-4 py-3 font-bold">Estado</th><th className="px-4 py-3 font-bold">Campaña</th><th className="px-4 py-3 font-bold">Enviado</th><th className="px-5 py-3 font-bold">Última respuesta</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.slice(0, 400).map((p) => (
              <tr key={p.key} onClick={() => onOpen(p.key)} className="cursor-pointer hover:bg-slate-50">
                <td className="px-5 py-3">
                  <span className="flex items-center gap-2"><ChannelIcon canal={p.canal} /><span className="max-w-[260px] truncate font-semibold text-[#182A2C]">{p.nombre}</span></span>
                  <span className="ml-6 block text-xs text-slate-400">{p.contacto}</span>
                </td>
                <td className="px-4 py-3"><Badge estado={p.estado} /></td>
                <td className="px-4 py-3 text-slate-600">{campaignLabel(p.campana)} · {p.pais}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{p.enviadoAt ? fmt(p.enviadoAt) : p.programadoPara ? `Programado ${fmtDay(p.programadoPara)}` : '—'}</td>
                <td className="max-w-[300px] truncate px-5 py-3 text-slate-500">{p.ultimaRespuesta || '—'}</td>
              </tr>
            ))}
            {!table.length && <tr><td colSpan="5" className="px-5 py-8 text-center text-slate-500">No hay prospectos con estos filtros.</td></tr>}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const Queue = ({ scoped }) => {
  const queued = scoped.filter((p) => p.estado === 'programado');
  const days = [...new Set(queued.map((p) => String(p.programadoPara || '').slice(0, 10)))].sort();
  if (!queued.length) return <Card><p className="p-8 text-center text-slate-500">No hay envíos en cola.</p></Card>;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">{queued.length} envíos programados en {days.length} día{days.length === 1 ? '' : 's'}. Se mandan de lunes a viernes entre 9 y 16 h de Colombia, espaciados durante el día para cuidar el número.</p>
      {days.map((d) => {
        const it = queued.filter((p) => String(p.programadoPara || '').slice(0, 10) === d);
        const wa = it.filter((p) => p.canal === 'whatsapp').length;
        return (
          <Card key={d} title={d ? fmtLongDay(d) : 'Sin fecha'} sub={`${wa} WhatsApp · ${it.length - wa} correos`}>
            <ul className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-y-0">
              {it.map((p) => (
                <li key={p.key} className="flex items-center gap-3 border-slate-100 px-5 py-2.5 text-sm md:border-b">
                  <ChannelIcon canal={p.canal} />
                  <span className="min-w-0 flex-1 truncate font-semibold text-[#182A2C]">{p.nombre}</span>
                  <span className="shrink-0 text-xs text-slate-400">{campaignLabel(p.campana)}</span>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
};

// view: 'resumen' | 'bandeja' | 'prospectos' | 'cola'
export const ProspectingCenter = ({ view, onView, outreach }) => {
  const { data, error } = outreach;
  const [selected, setSelected] = useState(null);
  const [f, setF] = useState({ canal: '', campana: '' });
  const all = useMemo(() => data?.prospects || [], [data]);
  const scoped = useMemo(() => all.filter((p) => (!f.canal || p.canal === f.canal) && (!f.campana || p.campana === f.campana)), [all, f]);

  if (error && !data) return <p className="rounded-xl bg-red-50 p-6 font-semibold text-red-700">No se pudo cargar la prospección: {error}</p>;
  if (!data) return <p className="text-slate-500">Cargando prospección…</p>;

  const campaigns = [...new Set(all.map((p) => p.campana).filter(Boolean))];
  const open = (key) => { setSelected(key); onView('bandeja'); };
  const sel = 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700';

  return (
    <div>
      {view !== 'bandeja' && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 bg-white p-1 text-sm font-bold">
            {[['', 'Todos los canales'], ['whatsapp', 'WhatsApp'], ['email', 'Correo']].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setF({ ...f, canal: id })} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 ${f.canal === id ? 'bg-[#182A2C] text-white' : 'bg-transparent text-slate-500'}`}>{label}</button>
            ))}
          </div>
          <select value={f.campana} onChange={(e) => setF({ ...f, campana: e.target.value })} className={sel} aria-label="Campaña">
            <option value="">Todas las campañas</option>
            {campaigns.map((c) => <option key={c} value={c}>{campaignLabel(c)}</option>)}
          </select>
        </div>
      )}
      {view === 'bandeja' ? <Inbox items={all} selected={selected} onSelect={setSelected} />
        : view === 'prospectos' ? <Prospects scoped={scoped} onOpen={open} />
          : view === 'cola' ? <Queue scoped={scoped} />
            : <Overview scoped={scoped} data={data} canal={f.canal} onOpen={open} onView={onView} />}
    </div>
  );
};
