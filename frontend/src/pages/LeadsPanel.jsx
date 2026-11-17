import React, { useEffect, useMemo, useState } from 'react';
import { Archive, ChartColumn, Download, FileText, Inbox, LayoutDashboard, LogOut, Menu, MessageCircle, MousePointerClick, RefreshCw, Search, Send, Star, Target, Trash2, Users, X } from 'lucide-react';
import { ReviewsAdmin } from '../components/ReviewsAdmin';
import { panel } from '../lib/api';
import { LeadPool } from '../components/LeadPool';
import { OUTREACH_STATES, ProspectingCenter, attentionCount, queuedCount, useOutreach } from '../components/ProspectingCenter';

// Panel de consultas (/panel): todos los formularios del sitio y los clics a WhatsApp, guardados en
// PostgreSQL por leads-api, con estado, notas y la meta de 10 reuniones por semana. Entra con la
// contraseña PANEL_PASSWORD del .env de leads-api; la sesión es una cookie HttpOnly de 7 días.

const REFRESH_MS = 30000;

const STATUSES = [
  { id: 'nuevo', label: 'Nuevo', cls: 'bg-[#d9fb06] text-[#182A2C]' },
  { id: 'contactado', label: 'Contactado', cls: 'bg-sky-100 text-sky-800' },
  { id: 'reunion', label: 'Reunión agendada', cls: 'bg-violet-100 text-violet-800' },
  { id: 'propuesta', label: 'Propuesta enviada', cls: 'bg-amber-100 text-amber-800' },
  { id: 'ganado', label: 'Ganado', cls: 'bg-emerald-100 text-emerald-800' },
  { id: 'perdido', label: 'Perdido', cls: 'bg-slate-200 text-slate-600' },
  { id: 'spam', label: 'Spam', cls: 'bg-red-100 text-red-700' },
];
const statusOf = (id) => STATUSES.find((s) => s.id === id) || STATUSES[0];

const SOURCE_LABELS = {
  contacto: 'Página de contacto',
  contacto_rapido: 'Contacto rápido (inicio)',
  cotizador: 'Cotizador',
  auditoria: 'Auditoría gratis (página de contacto)',
  auditoria_pagina: 'Auditoría gratis',
  formulario: 'Formulario',
};
const sourceLabel = (s) => SOURCE_LABELS[s] || (s && s.startsWith('pais_') ? `Auditoría gratis · página ${s.slice(5).toUpperCase()}` : s && s.startsWith('landing_') ? `Landing ${s.slice(8)}` : s || 'Formulario');

const META_REUNIONES = 10;
const toDate = (ts) => (ts ? new Date(ts) : null);
const fmt = (d) => (d ? d.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—');
// Lunes 00:00 de la semana actual
const weekStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
};
const phoneOf = (lead) => lead.whatsapp || lead.phone || '';
const waLink = (lead) => {
  const digits = phoneOf(lead).replace(/\D/g, '');
  if (digits.length < 8) return null;
  const name = (lead.name || '').split(' ')[0];
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hola ${name}, te escribimos de Websy por tu consulta en websysrl.com.`)}`;
};

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const downloadCsv = (leads) => {
  const cols = ['Fecha', 'Estado', 'Nombre', 'WhatsApp', 'Email', 'País', 'Fuente', 'Página', 'Qué necesita', 'Presupuesto', 'Mensaje', 'Nota'];
  const rows = leads.map((l) => [fmt(toDate(l.createdAt)), statusOf(l.status).label, l.name, phoneOf(l), l.email, l.country, sourceLabel(l.source), l.page, l.projectType, l.budget, l.message, l.note]);
  const blob = new Blob([`﻿${[cols, ...rows].map((r) => r.map(csvCell).join(',')).join('\n')}`], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `consultas-websy-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await panel.login(password);
      onLogin();
    } catch (err) {
      setError(err.status === 401 ? 'Contraseña incorrecta.' : err.message);
      setPassword('');
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-[#182A2C] flex items-center justify-center p-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 space-y-4">
        <h1 className="text-2xl font-black text-[#182A2C]">Panel de consultas</h1>
        <input type="password" required autoFocus autoComplete="current-password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3" />
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        <button disabled={busy} className="w-full rounded-full bg-[#d9fb06] py-3 font-bold text-[#182A2C] disabled:opacity-60">{busy ? 'Ingresando…' : 'Ingresar'}</button>
      </form>
    </div>
  );
};

const Stat = ({ label, value, sub, highlight }) => (
  <div className={`rounded-2xl p-5 ${highlight ? 'bg-[#182A2C] text-white' : 'bg-white border border-slate-200'}`}>
    <p className={`text-[11px] font-bold uppercase tracking-wider ${highlight ? 'text-[#d9fb06]' : 'text-slate-500'}`}>{label}</p>
    <p className="mt-2 text-3xl font-black tabular-nums">{value}</p>
    {sub && <p className={`mt-1 text-xs ${highlight ? 'text-white/60' : 'text-slate-500'}`}>{sub}</p>}
  </div>
);

// Navegación de la barra lateral: [id, etiqueta, icono]
const NAV = [
  { items: [['inicio', 'Inicio', LayoutDashboard]] },
  { group: 'Entrantes', items: [['formularios', 'Formularios', FileText], ['whatsapp', 'Clics a WhatsApp', MousePointerClick], ['resenas', 'Reseñas', Star]] },
  { group: 'Prospección', items: [['p-clientes', 'Posibles clientes', Target], ['p-resumen', 'Resumen', ChartColumn], ['p-bandeja', 'Bandeja', Inbox], ['p-prospectos', 'Prospectos', Users], ['p-cola', 'Cola de envíos', Send]] },
  { group: 'Otros', items: [['archivo', 'Archivo', Archive]] },
];
const SECTIONS = {
  inicio: ['Inicio', 'Lo importante de la semana en un vistazo'],
  formularios: ['Formularios', 'Consultas que llegan desde los formularios del sitio'],
  whatsapp: ['Clics a WhatsApp', 'Conversaciones iniciadas desde los botones del sitio'],
  resenas: ['Reseñas', 'Lo que dejan los clientes en /argentina: publicar, ocultar o borrar'],
  'p-clientes': ['Posibles clientes', 'Negocios a los que todavía no les escribimos y por qué les serviría Websy'],
  'p-resumen': ['Prospección', 'Campañas de WhatsApp y correo: envíos, respuestas y reuniones'],
  'p-bandeja': ['Bandeja', 'Conversaciones con prospectos y lo que respondió el agente de IA'],
  'p-prospectos': ['Prospectos', 'Todos los negocios en campaña y en qué etapa está cada uno'],
  'p-cola': ['Cola de envíos', 'Lo que sale en los próximos días'],
  archivo: ['Archivo', 'Datos importados del panel anterior'],
};

const Sidebar = ({ section, onSelect, badges, meetings, open, onClose, onLogout }) => (
  <>
    <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose} />
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#132224] text-white transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center gap-3 px-5 pb-5 pt-6">
        <img src="/websy-logo.png" alt="" className="h-9 w-9 rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="font-black leading-tight">Websy</p>
          <p className="text-xs text-white/50">Panel comercial</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg bg-transparent p-1 text-white/60 lg:hidden" aria-label="Cerrar menú"><X size={18} /></button>
      </div>

      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {NAV.map(({ group, items }) => (
          <div key={group || 'main'}>
            {group && <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">{group}</p>}
            <ul className="space-y-0.5">
              {items.map(([id, label, Icon]) => {
                const active = section === id;
                const badge = badges[id];
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onSelect(id)}
                      className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${active ? 'bg-white/10 text-white' : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {active && <span className="absolute -left-3 top-1.5 bottom-1.5 w-1 rounded-r bg-[#d9fb06]" />}
                      <Icon size={17} className={active ? 'text-[#d9fb06]' : 'text-white/45 group-hover:text-white/80'} />
                      <span className="flex-1 text-left">{label}</span>
                      {badge ? <span className={`min-w-[22px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold tabular-nums ${badge.alert ? 'bg-[#d9fb06] text-[#182A2C]' : 'bg-white/10 text-white/70'}`}>{badge.n}</span> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-white/5 p-3">
          <div className="flex items-baseline justify-between text-xs">
            <span className="font-bold text-white/60">Meta semanal</span>
            <span className="font-black tabular-nums text-white">{meetings} / {META_REUNIONES} <span className="font-semibold text-white/50">reuniones</span></span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-[#d9fb06]" style={{ width: `${Math.min(100, (meetings / META_REUNIONES) * 100)}%` }} /></div>
        </div>
        <button type="button" onClick={onLogout} className="mt-3 flex w-full items-center gap-3 rounded-lg bg-transparent px-3 py-2 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white"><LogOut size={17} /> Salir</button>
      </div>
    </aside>
  </>
);

const LeadRow = ({ lead, onChange, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(lead.note || '');
  const status = statusOf(lead.status);
  const wa = waLink(lead);

  const setStatus = async (status) => onChange(await panel.updateLead(lead.id, { status }));
  const saveNote = async () => note !== (lead.note || '') && onChange(await panel.updateLead(lead.id, { note }));
  const remove = async () => {
    if (!window.confirm(`¿Eliminar la consulta de ${lead.name || 'sin nombre'}? No se puede deshacer.`)) return;
    await panel.deleteLead(lead.id);
    onDelete(lead.id);
  };

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
        <div className="min-w-[200px] flex-1">
          <p className="text-lg font-bold text-[#182A2C]">{lead.name || 'Sin nombre'}</p>
          <p className="text-sm text-slate-500">{fmt(toDate(lead.createdAt))} · {lead.country || 'País sin indicar'}</p>
        </div>
        <div className="min-w-[180px] flex-1 text-sm">
          <p className="font-semibold text-[#182A2C]">{lead.projectType || 'Sin tipo'}</p>
          {lead.budget && <p className="text-slate-600">{lead.budget}</p>}
        </div>
        <div className="min-w-[180px] flex-1 text-sm">
          <p className="text-slate-700">{sourceLabel(lead.source)}</p>
          {lead.page && <a href={lead.page} target="_blank" rel="noopener noreferrer" className="text-slate-500 underline">{lead.page}</a>}
        </div>
        <div className="flex items-center gap-2">
          <select value={status.id} onChange={(e) => setStatus(e.target.value)} className={`rounded-full px-3 py-1.5 text-sm font-bold ${status.cls}`} aria-label="Estado">
            {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-sm font-bold text-white" title={phoneOf(lead)}>
              <MessageCircle size={15} /> WhatsApp
            </a>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-slate-500">{phoneOf(lead) || 'Sin teléfono'}{lead.email && lead.email.includes('@') ? ` · ${lead.email}` : ''}</span>
        <button type="button" onClick={() => setOpen(!open)} className="bg-transparent font-semibold text-[#182A2C] underline">{open ? 'Ocultar detalle' : 'Ver detalle'}</button>
        <button type="button" onClick={remove} className="bg-transparent ml-auto inline-flex items-center gap-1 text-red-500 hover:text-red-700"><Trash2 size={14} /> Eliminar</button>
      </div>
      {open && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <p className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">{lead.message || 'Sin mensaje.'}</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} onBlur={saveNote} placeholder="Nota interna (se guarda al salir del campo)" className="min-h-[110px] rounded-lg border border-slate-300 p-3 text-sm" />
        </div>
      )}
    </li>
  );
};

const countBy = (items, key) => Object.entries(items.reduce((acc, it) => {
  const k = key(it) || '—';
  acc[k] = (acc[k] || 0) + 1;
  return acc;
}, {})).sort((a, b) => b[1] - a[1]);

const Dashboard = ({ onLogout }) => {
  const [leads, setLeads] = useState(null);
  const [clicks, setClicks] = useState(null);
  const [archive, setArchive] = useState(null);
  const [error, setError] = useState('');
  const [loadedAt, setLoadedAt] = useState(null);
  const [section, setSection] = useState(() => {
    const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return SECTIONS[h] ? h : 'inicio';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const outreach = useOutreach();
  const [filters, setFilters] = useState({ status: 'activos', source: '', country: '', range: '30', q: '' });

  const load = async () => {
    try {
      const [l, c] = await Promise.all([panel.leads(), panel.whatsappClicks()]);
      setLeads(l);
      setClicks(c);
      setError('');
      setLoadedAt(new Date());
    } catch (err) {
      if (err.status === 401) onLogout();
      else setError(`No se pudieron cargar los datos: ${err.message}`);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (section === 'archivo' && !archive) panel.archive().then(setArchive).catch((err) => setError(err.message));
  }, [section, archive]);

  const replaceLead = (updated) => setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  const removeLead = (id) => setLeads((prev) => prev.filter((l) => l.id !== id));

  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });
  const since = filters.range === 'todo' ? null : new Date(Date.now() - Number(filters.range) * 864e5);
  const ws = weekStart();

  const visible = useMemo(() => (leads || []).filter((l) => {
    const st = l.status || 'nuevo';
    if (filters.status === 'activos' ? ['perdido', 'spam'].includes(st) : filters.status && st !== filters.status) return false;
    if (filters.source && l.source !== filters.source) return false;
    if (filters.country && l.country !== filters.country) return false;
    if (since && toDate(l.createdAt) < since) return false;
    if (filters.q && !JSON.stringify([l.name, l.phone, l.whatsapp, l.email, l.message, l.note, l.page]).toLowerCase().includes(filters.q.toLowerCase())) return false;
    return true;
  }), [leads, filters, since]);

  if (error && !leads) return <p className="m-8 rounded-xl bg-red-50 p-6 font-semibold text-red-700">{error}</p>;
  if (!leads) return <p className="p-8 text-slate-500">Cargando consultas…</p>;

  const all = leads;
  const thisWeek = all.filter((l) => toDate(l.createdAt) >= ws);
  const meetings = all.filter((l) => toDate(l.reunionAt) >= ws).length;
  const newOnes = all.filter((l) => (l.status || 'nuevo') === 'nuevo').length;
  const clicksWeek = (clicks || []).filter((c) => toDate(c.createdAt) >= ws);
  const sources = [...new Set(all.map((l) => l.source).filter(Boolean))];
  const countries = [...new Set(all.map((l) => l.country).filter(Boolean))];
  const selectCls = 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm';

  const outreachItems = outreach.data?.prospects || [];
  const outreachMeetings = outreachItems.filter((p) => p.estado === 'reunion' && toDate(p.ultimoAt) >= ws).length;
  const weekMeetings = meetings + outreachMeetings;
  const sentWeek = outreachItems.filter((p) => toDate(p.enviadoAt) >= ws);
  const positiveWeek = outreachItems.filter((p) => ['interesado', 'reunion', 'cliente'].includes(p.estado) && toDate(p.respondioAt || p.ultimoAt) >= ws);
  const badges = {
    formularios: newOnes ? { n: newOnes, alert: true } : null,
    whatsapp: clicksWeek.length ? { n: clicksWeek.length } : null,
    'p-bandeja': attentionCount(outreach.data) ? { n: attentionCount(outreach.data), alert: true } : null,
    'p-cola': queuedCount(outreach.data) ? { n: queuedCount(outreach.data) } : null,
  };
  const go = (id) => {
    setSection(id);
    setMenuOpen(false);
    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo(0, 0);
  };
  const logout = async () => { await panel.logout().catch(() => {}); onLogout(); };
  const [title, subtitle] = SECTIONS[section] || SECTIONS.inicio;
  const updated = outreach.loadedAt || loadedAt;
  const reload = () => { load(); outreach.load(); };

  return (
    <div className="min-h-screen bg-[#f4f7f9]">
      <Sidebar section={section} onSelect={go} badges={badges} meetings={weekMeetings} open={menuOpen} onClose={() => setMenuOpen(false)} onLogout={logout} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#f4f7f9]/90 backdrop-blur">
          <div className="flex items-center gap-3 px-5 py-4 md:px-8">
            <button type="button" onClick={() => setMenuOpen(true)} className="-ml-1 rounded-lg bg-transparent p-1.5 text-[#182A2C] hover:bg-slate-200/60 lg:hidden" aria-label="Abrir menú"><Menu size={22} /></button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-black text-[#182A2C] md:text-2xl">{title}</h1>
              <p className="hidden truncate text-sm text-slate-500 sm:block">{subtitle}</p>
            </div>
            <button type="button" onClick={reload} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#182A2C]" title="Actualizar">
              <RefreshCw size={14} /> <span className="hidden sm:inline">{updated ? `Actualizado ${updated.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}` : 'Actualizar'}</span>
            </button>
          </div>
        </header>

        <div className="px-5 py-6 md:px-8 md:py-8">
          {error && <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

          {section === 'inicio' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <Stat highlight label="Reuniones esta semana" value={`${weekMeetings} / ${META_REUNIONES}`} sub={`${meetings} de formularios · ${outreachMeetings} de prospección`} />
                <Stat label="Formularios esta semana" value={thisWeek.length} sub={`${all.length} en total · ${newOnes} sin responder`} />
                <Stat label="Mensajes enviados esta semana" value={sentWeek.length} sub={`${sentWeek.filter((p) => p.canal === 'whatsapp').length} WhatsApp · ${sentWeek.filter((p) => p.canal === 'email').length} correos`} />
                <Stat label="Respuestas positivas esta semana" value={positiveWeek.length} sub="Interesados o con reunión agendada" />
              </div>
              <div className="grid gap-6 xl:grid-cols-2">
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <header className="flex items-center border-b border-slate-100 px-5 py-4">
                    <h2 className="flex-1 font-black text-[#182A2C]">Últimas consultas</h2>
                    <button type="button" onClick={() => go('formularios')} className="bg-transparent text-xs font-bold text-[#182A2C] underline">Ver todas</button>
                  </header>
                  <ul className="divide-y divide-slate-100">
                    {all.slice(0, 6).map((l) => (
                      <li key={l.id}>
                        <button type="button" onClick={() => go('formularios')} className="flex w-full items-center gap-3 bg-transparent px-5 py-3 text-left hover:bg-slate-50">
                          <FileText size={15} className="shrink-0 text-slate-400" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-[#182A2C]">{l.name || 'Sin nombre'}</span>
                            <span className="block truncate text-xs text-slate-500">{l.projectType || sourceLabel(l.source)} · {fmt(toDate(l.createdAt))}</span>
                          </span>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${statusOf(l.status).cls}`}>{statusOf(l.status).label}</span>
                        </button>
                      </li>
                    ))}
                    {!all.length && <li className="px-5 py-6 text-sm text-slate-500">Todavía no llegaron consultas.</li>}
                  </ul>
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <header className="flex items-center border-b border-slate-100 px-5 py-4">
                    <h2 className="flex-1 font-black text-[#182A2C]">Respuestas de prospección</h2>
                    <button type="button" onClick={() => go('p-bandeja')} className="bg-transparent text-xs font-bold text-[#182A2C] underline">Abrir bandeja</button>
                  </header>
                  <ul className="divide-y divide-slate-100">
                    {outreachItems.filter((p) => p.ultimaRespuesta).sort((a, b) => toDate(b.ultimoAt) - toDate(a.ultimoAt)).slice(0, 6).map((p) => (
                      <li key={p.key}>
                        <button type="button" onClick={() => go('p-bandeja')} className="flex w-full items-center gap-3 bg-transparent px-5 py-3 text-left hover:bg-slate-50">
                          <MessageCircle size={15} className="shrink-0 text-slate-400" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-[#182A2C]">{p.nombre}</span>
                            <span className="block truncate text-xs text-slate-500">{p.ultimaRespuesta}</span>
                          </span>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${(OUTREACH_STATES[p.estado] || {}).cls}`}>{(OUTREACH_STATES[p.estado] || {}).label || p.estado}</span>
                        </button>
                      </li>
                    ))}
                    {!outreachItems.some((p) => p.ultimaRespuesta) && <li className="px-5 py-6 text-sm text-slate-500">Nadie respondió todavía.</li>}
                  </ul>
                </section>
              </div>
            </div>
          )}

          {section === 'formularios' && (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <label className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={filters.q} onChange={set('q')} placeholder="Buscar nombre, teléfono, texto…" className={`${selectCls} pl-9 w-64`} />
                </label>
                <select value={filters.status} onChange={set('status')} className={selectCls} aria-label="Filtrar por estado">
                  <option value="activos">Activos (sin perdidos ni spam)</option>
                  <option value="">Todos los estados</option>
                  {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <select value={filters.source} onChange={set('source')} className={selectCls} aria-label="Fuente">
                  <option value="">Todas las fuentes</option>
                  {sources.map((s) => <option key={s} value={s}>{sourceLabel(s)}</option>)}
                </select>
                <select value={filters.country} onChange={set('country')} className={selectCls} aria-label="País">
                  <option value="">Todos los países</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={filters.range} onChange={set('range')} className={selectCls} aria-label="Período">
                  <option value="7">Últimos 7 días</option>
                  <option value="30">Últimos 30 días</option>
                  <option value="90">Últimos 90 días</option>
                  <option value="todo">Todo</option>
                </select>
                <button type="button" onClick={() => downloadCsv(visible)} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#182A2C]"><Download size={15} /> Exportar CSV</button>
              </div>
              <p className="mt-4 text-sm text-slate-500">{visible.length} consulta{visible.length === 1 ? '' : 's'}</p>
              <ul className="mt-3 space-y-3">
                {visible.map((lead) => <LeadRow key={`${lead.id}-${lead.updatedAt || ''}`} lead={lead} onChange={replaceLead} onDelete={removeLead} />)}
                {!visible.length && <li className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No hay consultas con estos filtros.</li>}
              </ul>
            </>
          )}

          {section === 'resenas' && <ReviewsAdmin onError={setError} />}

          {section === 'p-clientes' && <LeadPool />}
          {section.startsWith('p-') && section !== 'p-clientes' && <ProspectingCenter view={section.slice(2)} onView={(v) => go(`p-${v}`)} outreach={outreach} />}

          {section === 'archivo' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">Datos que había en Firestore y que el sitio ya no usa (testimonios, novedades y analítica del panel viejo), importados tal cual.</p>
              {!archive ? <p className="text-slate-500">Cargando…</p> : archive.collections.length === 0 ? <p className="text-slate-500">No hay datos archivados.</p> : archive.collections.map((c) => (
                <details key={c.collection} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-black text-[#182A2C]">{c.collection} · {c.n} registros <span className="font-normal text-slate-500">({fmt(toDate(c.desde))} a {fmt(toDate(c.hasta))})</span></summary>
                  <ul className="mt-4 divide-y divide-slate-100 text-xs">
                    {archive.latest.filter((r) => r.collection === c.collection).map((r) => (
                      <li key={r.firestore_id} className="py-2"><span className="text-slate-500">{fmt(toDate(r.created_at))}</span> <code className="break-all text-slate-700">{JSON.stringify(r.data).slice(0, 400)}</code></li>
                    ))}
                  </ul>
                  {c.n > 50 && <p className="mt-2 text-xs text-slate-500">Se muestran los 50 más recientes; el resto está completo en PostgreSQL (tabla firestore_archive).</p>}
                </details>
              ))}
            </div>
          )}

          {section === 'whatsapp' && (
            <div className="grid gap-6 xl:grid-cols-3">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="font-black text-[#182A2C]">Páginas que más llevan a WhatsApp</h2>
                <p className="mt-1 text-xs text-slate-500">Últimos 30 días</p>
                <ol className="mt-4 space-y-2 text-sm">
                  {countBy((clicks || []).filter((c) => toDate(c.createdAt) >= new Date(Date.now() - 30 * 864e5)), (c) => c.page).slice(0, 15).map(([page, n]) => (
                    <li key={page} className="flex justify-between gap-3"><span className="truncate text-slate-700">{page}</span><strong>{n}</strong></li>
                  ))}
                </ol>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
                <h2 className="font-black text-[#182A2C]">Últimos clics</h2>
                <p className="mt-1 text-xs text-slate-500">El mensaje llega a WhatsApp con “(Página: …)” al final, así lo cruzas con esta lista.</p>
                <ul className="mt-4 divide-y divide-slate-100 text-sm">
                  {(clicks || []).slice(0, 200).map((c) => (
                    <li key={c.id} className="flex flex-wrap gap-x-4 py-2">
                      <span className="w-32 text-slate-500">{fmt(toDate(c.createdAt))}</span>
                      <span className="font-semibold text-[#182A2C]">{c.page}</span>
                      <span className="text-slate-500">botón: {c.location}</span>
                      {c.referrer && <span className="truncate text-slate-400">desde {c.referrer}</span>}
                    </li>
                  ))}
                  {clicks && clicks.length === 0 && <li className="py-2 text-slate-500">Todavía no hay clics registrados.</li>}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const LeadsPanel = () => {
  const [authed, setAuthed] = useState(null);
  useEffect(() => {
    panel.session().then((r) => setAuthed(r.ok)).catch(() => setAuthed(false));
  }, []);

  if (authed === null) return <div className="min-h-screen bg-[#f4f7f9]" />;
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
};
