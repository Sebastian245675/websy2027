import React, { useEffect, useMemo, useState } from 'react';
import { Download, LogOut, MessageCircle, RefreshCw, Search, Trash2 } from 'lucide-react';
import { panel } from '../lib/api';
import { ProspectingCenter } from '../components/ProspectingCenter';

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
    <p className={`text-xs font-bold uppercase tracking-wider ${highlight ? 'text-[#d9fb06]' : 'text-slate-500'}`}>{label}</p>
    <p className="mt-2 text-3xl font-black">{value}</p>
    {sub && <p className={`mt-1 text-sm ${highlight ? 'text-white/70' : 'text-slate-500'}`}>{sub}</p>}
  </div>
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
  const [tab, setTab] = useState('formularios');
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
    if (tab === 'archivo' && !archive) panel.archive().then(setArchive).catch((err) => setError(err.message));
  }, [tab, archive]);

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
  const selectCls = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-8">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-black text-[#182A2C]">Consultas</h1>
        <button type="button" onClick={load} className="bg-transparent inline-flex items-center gap-1.5 text-sm text-slate-500" title="Actualizar"><RefreshCw size={14} /> {loadedAt ? `Actualizado ${loadedAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}` : ''}</button>
        <button type="button" onClick={async () => { await panel.logout().catch(() => {}); onLogout(); }} className="bg-transparent ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600"><LogOut size={15} /> Salir</button>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat highlight label="Reuniones esta semana" value={`${meetings} / ${META_REUNIONES}`} sub="Marca la consulta como “Reunión agendada”" />
        <Stat label="Formularios esta semana" value={thisWeek.length} sub={`${all.length} en total`} />
        <Stat label="Sin responder" value={newOnes} sub="Estado “Nuevo”" />
        <Stat label="Clics a WhatsApp esta semana" value={clicks ? clicksWeek.length : '…'} sub="Conversaciones iniciadas desde la web" />
      </div>

      <div className="mt-8 flex gap-2 border-b border-slate-200">
        {[['formularios', `Formularios (${all.length})`], ['whatsapp', `WhatsApp (${clicks ? clicks.length : '…'})`], ['prospeccion', 'Prospección'], ['archivo', 'Archivo']].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setTab(id)} className={`-mb-px border-b-2 bg-transparent px-4 py-2.5 font-bold ${tab === id ? 'border-[#182A2C] text-[#182A2C]' : 'border-transparent text-slate-500'}`}>{label}</button>
        ))}
      </div>

      {tab === 'formularios' ? (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-3">
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
            <button type="button" onClick={() => downloadCsv(visible)} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#182A2C]"><Download size={15} /> Exportar CSV</button>
          </div>
          <p className="mt-3 text-sm text-slate-500">{visible.length} consulta{visible.length === 1 ? '' : 's'}</p>
          <ul className="mt-3 space-y-3">
            {visible.map((lead) => <LeadRow key={`${lead.id}-${lead.updatedAt || ''}`} lead={lead} onChange={replaceLead} onDelete={removeLead} />)}
          </ul>
        </>
      ) : tab === 'prospeccion' ? (
        <ProspectingCenter />
      ) : tab === 'archivo' ? (
        <div className="mt-6 space-y-6">
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
      ) : (
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-black text-[#182A2C]">Páginas que más llevan a WhatsApp</h2>
            <p className="mt-1 text-xs text-slate-500">Últimos 30 días</p>
            <ol className="mt-4 space-y-2 text-sm">
              {countBy((clicks || []).filter((c) => toDate(c.createdAt) >= new Date(Date.now() - 30 * 864e5)), (c) => c.page).slice(0, 15).map(([page, n]) => (
                <li key={page} className="flex justify-between gap-3"><span className="truncate text-slate-700">{page}</span><strong>{n}</strong></li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
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
          </div>
        </div>
      )}
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
  return <div className="min-h-screen bg-[#f4f7f9]"><Dashboard onLogout={() => setAuthed(false)} /></div>;
};
