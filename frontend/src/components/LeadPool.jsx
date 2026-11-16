import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark, Check, CheckCheck, Clock, Download, ExternalLink, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Search, Star, X,
} from 'lucide-react';
import { panel } from '../lib/api';

// Posibles clientes (base tipo Apollo del panel): negocios de Google Maps a los que todavía no se les
// escribió, con lo que se averiguó de su web y por qué les serviría Websy. Los carga el script de
// búsqueda en leads-api (POST /api/outreach/pool); acá se filtran, se guardan o se descartan.

const COUNTRIES = { CO: 'Colombia', MX: 'México', AR: 'Argentina' };
const PAGE = 60;

const scoreCls = (n) => (n >= 60 ? 'bg-[#d9fb06] text-[#182A2C]' : n >= 35 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500');
const scoreLabel = (n) => (n >= 60 ? 'Alta' : n >= 35 ? 'Media' : 'Baja');
const webState = (p) => {
  if (!p.web) return 'sin';
  const w = p.info?.web;
  if (!w) return 'red'; // la "web" es Instagram, Linktree, etc.
  if (!w.ok || !w.movil || (w.copyright && w.copyright <= 2021)) return 'mala';
  return 'ok';
};
const WEB_LABELS = { sin: 'Sin web', red: 'Solo redes / directorio', mala: 'Web con problemas', ok: 'Web correcta' };

const opener = (p) => {
  const first = {
    'Página web': `vi ${p.nombre} en Google Maps y noté que no tienen una página web propia. Hacemos webs para ${(p.rubro || 'negocios').toLowerCase()} que traen clientes desde Google`,
    'Tienda online': `vi ${p.nombre} en Google Maps. Armamos tiendas online para vender por internet con pagos y envíos`,
    'Agente IA para WhatsApp': `vi ${p.nombre} en Google Maps. Armamos agentes de IA que contestan WhatsApp las 24 horas, agendan y responden precios`,
    'Rediseño y SEO': `vi la web de ${p.nombre}. Tenemos algunas ideas para que traiga más consultas desde Google`,
  }[p.servicio] || `vi ${p.nombre} en Google Maps`;
  return `Hola, ¿qué tal? Te escribo de Websy, una agencia de desarrollo web. ${first}. ¿Te puedo mostrar un ejemplo?`;
};

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const downloadCsv = (rows) => {
  const cols = ['Oportunidad', 'Nombre', 'Rubro', 'Ciudad', 'País', 'Servicio sugerido', 'WhatsApp', 'Teléfono', 'Correo', 'Web', 'Instagram', 'Facebook', 'Rating', 'Reseñas', 'Motivos', 'Dirección', 'Google Maps', 'Estado', 'Nota'];
  const data = rows.map((p) => [p.oportunidad, p.nombre, p.rubro, p.ciudad, p.pais, p.servicio, p.whatsapp, p.telefono, p.email, p.web, p.info?.instagram, p.info?.facebook, p.rating, p.resenas, (p.motivos || []).join(' · '), p.direccion, p.mapsUrl, p.estado, p.nota]);
  const blob = new Blob([`﻿${[cols, ...data].map((r) => r.map(csvCell).join(',')).join('\n')}`], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `posibles-clientes-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

const count = (items, fn) => items.reduce((acc, it) => {
  const k = fn(it);
  if (k) acc[k] = (acc[k] || 0) + 1;
  return acc;
}, {});

const FilterGroup = ({ title, children }) => (
  <div className="border-b border-slate-100 px-4 py-4 last:border-0">
    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
    {children}
  </div>
);

const CheckList = ({ options, selected, onToggle, counts, labels = {} }) => (
  <ul className="space-y-1">
    {options.map((o) => (
      <li key={o}>
        <label className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-0.5 text-sm text-slate-700 hover:bg-slate-50">
          <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} className="h-3.5 w-3.5 accent-[#182A2C]" />
          <span className="flex-1 truncate">{labels[o] || o}</span>
          <span className="text-xs tabular-nums text-slate-400">{counts[o] || 0}</span>
        </label>
      </li>
    ))}
  </ul>
);

const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

const Yes = ({ ok, label }) => (
  <li className="flex items-center gap-2 text-sm">
    {ok ? <Check size={15} className="text-emerald-600" /> : <X size={15} className="text-red-500" />}
    <span className={ok ? 'text-slate-700' : 'text-slate-900 font-semibold'}>{label}</span>
  </li>
);

const Detail = ({ p, onClose, onChange }) => {
  const [nota, setNota] = useState(p.nota || '');
  useEffect(() => setNota(p.nota || ''), [p.id, p.nota]);
  const w = p.info?.web;
  const save = async (changes) => onChange(await panel.updatePool(p.id, changes));
  const waHref = p.whatsapp ? `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(opener(p))}` : null;
  const socials = [['instagram', Instagram, 'Instagram'], ['facebook', Facebook, 'Facebook'], ['linkedin', Linkedin, 'LinkedIn'], ['tiktok', Globe, 'TikTok'], ['youtube', Globe, 'YouTube']]
    .filter(([k]) => p.info?.[k]);

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/30" onClick={onClose}>
      <aside className="flex h-full w-full max-w-xl flex-col bg-[#f4f7f9] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <header className="border-b border-slate-200 bg-white p-5">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl ${scoreCls(p.oportunidad)}`}>
              <span className="text-xl font-black leading-none tabular-nums">{p.oportunidad}</span>
              <span className="text-[9px] font-bold uppercase">{scoreLabel(p.oportunidad)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-black leading-snug text-[#182A2C]">{p.nombre}</h3>
              <p className="text-sm text-slate-500">{p.rubro} · {p.ciudad}, {COUNTRIES[p.pais] || p.pais}</p>
              {p.rating && <p className="mt-1 flex items-center gap-1 text-sm text-slate-600"><Star size={14} className="fill-amber-400 text-amber-400" /> <strong>{p.rating}</strong> · {p.resenas} reseñas en Google</p>}
            </div>
            <button type="button" onClick={onClose} className="bg-transparent text-slate-400 hover:text-slate-700" aria-label="Cerrar"><X size={20} /></button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-sm font-bold text-white"><MessageCircle size={15} /> Escribir por WhatsApp</a>}
            {p.email && <a href={`mailto:${p.email}?subject=${encodeURIComponent(`${p.nombre} · Websy`)}&body=${encodeURIComponent(opener(p))}`} className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3.5 py-1.5 text-sm font-bold text-white"><Mail size={15} /> Enviar correo</a>}
            <button type="button" onClick={() => save({ estado: p.estado === 'guardado' ? 'nuevo' : 'guardado' })} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold ${p.estado === 'guardado' ? 'bg-[#182A2C] text-white' : 'border border-slate-300 bg-white text-[#182A2C]'}`}><Bookmark size={15} /> {p.estado === 'guardado' ? 'Guardado' : 'Guardar'}</button>
            <button type="button" onClick={() => save({ estado: p.estado === 'contactado' ? 'nuevo' : 'contactado' })} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold ${p.estado === 'contactado' ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-[#182A2C]'}`}><CheckCheck size={15} /> {p.estado === 'contactado' ? 'Hablado' : 'Ya le hablé'}</button>
            <button type="button" onClick={() => save({ estado: p.estado === 'descartado' ? 'nuevo' : 'descartado' })} className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-500">{p.estado === 'descartado' ? 'Restaurar' : 'Descartar'}</button>
          </div>
          {p.enCampana && <p className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-800">Ya está en una campaña de prospección (estado: {p.enCampana}).</p>}
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Qué ofrecerle</p>
            <p className="mt-1 text-lg font-black text-[#182A2C]">{p.servicio}</p>
            <ul className="mt-3 space-y-1.5">
              {(p.motivos || []).map((m) => <li key={m} className="flex gap-2 text-sm text-slate-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#182A2C]" />{m}</li>)}
              {!(p.motivos || []).length && <li className="text-sm text-slate-500">Su presencia en internet está bien; la oportunidad es menor.</li>}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Contacto</p>
            <ul className="mt-3 space-y-2 text-sm">
              {p.telefono && <li className="flex items-center gap-2"><Phone size={15} className="text-slate-400" /> {p.telefono} {p.whatsapp && <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${p.info?.whatsappSeguro ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>{p.info?.whatsappSeguro ? 'WhatsApp' : 'Posible WhatsApp'}</span>}</li>}
              {p.whatsapp && p.telefono && p.whatsapp !== (p.telefono || '').replace(/\D/g, '') && <li className="flex items-center gap-2"><MessageCircle size={15} className="text-[#25D366]" /> WhatsApp de su web: +{p.whatsapp}</li>}
              {(p.info?.emails || []).map((e) => <li key={e} className="flex items-center gap-2"><Mail size={15} className="text-slate-400" /> <a href={`mailto:${e}`} className="text-[#182A2C] underline">{e}</a></li>)}
              {p.web && <li className="flex items-center gap-2"><Globe size={15} className="text-slate-400" /> <a href={p.web} target="_blank" rel="noopener noreferrer" className="truncate text-[#182A2C] underline">{p.web.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a></li>}
              {socials.map(([k, Icon, label]) => <li key={k} className="flex items-center gap-2"><Icon size={15} className="text-slate-400" /> <a href={p.info[k]} target="_blank" rel="noopener noreferrer" className="truncate text-[#182A2C] underline">{label}: {p.info[k].replace(/^https?:\/\/(www\.|m\.)?[^/]+\//, '')}</a></li>)}
              {p.direccion && <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-slate-400" /> <span>{p.direccion}</span></li>}
              {p.mapsUrl && <li><a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#182A2C] underline">Ver en Google Maps <ExternalLink size={12} /></a></li>}
            </ul>
          </section>

          {w && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Su página web</p>
              {w.titulo && <p className="mt-2 font-semibold text-[#182A2C]">{w.titulo.trim()}</p>}
              {w.descripcion && <p className="mt-1 text-sm text-slate-500">{w.descripcion}</p>}
              {w.ok === false ? <p className="mt-2 text-sm font-semibold text-red-600">No carga ({w.error}).</p> : (
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <Yes ok={w.movil} label="Adaptada al celular" />
                  <Yes ok={w.https} label="HTTPS (candado)" />
                  <Yes ok={w.botonWhatsapp} label="Botón de WhatsApp" />
                  <Yes ok={w.formulario} label="Formulario de contacto" />
                  <Yes ok={w.reservas} label="Reservas / turnos online" />
                  <Yes ok={w.tienda} label="Tienda online" />
                  <Yes ok={w.chat} label="Chat o bot" />
                  <Yes ok={!w.segundos || w.segundos < 6} label={`Carga en ${w.segundos ?? '?'} s`} />
                </ul>
              )}
              <p className="mt-3 text-xs text-slate-500">{[w.plataforma && `Hecha con ${w.plataforma}`, w.copyright && `© ${w.copyright}`].filter(Boolean).join(' · ')}</p>
            </section>
          )}

          {p.info?.horarios && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><Clock size={12} /> Horarios</p>
              <ul className="mt-2 space-y-0.5 text-sm text-slate-600">{p.info.horarios.map((h) => <li key={h}>{h}</li>)}</ul>
            </section>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nota interna</p>
            <textarea value={nota} onChange={(e) => setNota(e.target.value)} onBlur={() => nota !== (p.nota || '') && save({ nota })} placeholder="Se guarda al salir del campo" className="mt-2 min-h-[90px] w-full rounded-lg border border-slate-200 p-3 text-sm" />
            <p className="mt-2 text-xs text-slate-400">Tipo en Google: {p.info?.tipoGoogle || '—'} · agregado el {new Date(p.createdAt).toLocaleDateString('es-AR')}</p>
          </section>
        </div>
      </aside>
    </div>
  );
};

const EMPTY = { q: '', paises: [], ciudades: [], rubros: [], servicios: [], web: [], contacto: [], min: 0, minResenas: 0, estado: 'nuevo', ocultarCampana: true };

export const LeadPool = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [f, setF] = useState(EMPTY);
  const [sort, setSort] = useState('oportunidad');
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const [undo, setUndo] = useState(null);
  useEffect(() => {
    if (!undo) return undefined;
    const t = setTimeout(() => setUndo(null), 6000);
    return () => clearTimeout(t);
  }, [undo]);

  useEffect(() => {
    panel.pool().then(setItems).catch((err) => setError(err.message));
  }, []);
  useEffect(() => setShown(PAGE), [f, sort]);

  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));
  const base = useMemo(() => (items || []).filter((p) => (f.estado === 'todos' || p.estado === f.estado) && (!f.ocultarCampana || !p.enCampana)), [items, f.estado, f.ocultarCampana]);
  const visible = useMemo(() => {
    const q = f.q.toLowerCase();
    const rows = base.filter((p) => (!f.paises.length || f.paises.includes(p.pais))
      && (!f.ciudades.length || f.ciudades.includes(p.ciudad))
      && (!f.rubros.length || f.rubros.includes(p.rubro))
      && (!f.servicios.length || f.servicios.includes(p.servicio))
      && (!f.web.length || f.web.includes(webState(p)))
      && (!f.contacto.includes('whatsapp') || p.whatsapp)
      && (!f.contacto.includes('email') || p.email)
      && (!f.contacto.includes('instagram') || p.info?.instagram)
      && p.oportunidad >= f.min && (p.resenas || 0) >= f.minResenas
      && (!q || JSON.stringify([p.nombre, p.rubro, p.ciudad, p.email, p.web, p.telefono, p.direccion, p.info?.instagram]).toLowerCase().includes(q)));
    const by = {
      oportunidad: (a, b) => b.oportunidad - a.oportunidad || (b.resenas || 0) - (a.resenas || 0),
      resenas: (a, b) => (b.resenas || 0) - (a.resenas || 0),
      rating: (a, b) => (b.rating || 0) - (a.rating || 0) || (b.resenas || 0) - (a.resenas || 0),
      nombre: (a, b) => String(a.nombre).localeCompare(String(b.nombre)),
    }[sort];
    return [...rows].sort(by);
  }, [base, f, sort]);

  if (error) return <p className="rounded-xl bg-red-50 p-6 font-semibold text-red-700">No se pudieron cargar los posibles clientes: {error}</p>;
  if (!items) return <p className="text-slate-500">Cargando posibles clientes…</p>;
  if (!items.length) return <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Todavía no se cargó ninguna búsqueda de negocios.</p>;

  const inCountry = base.filter((p) => !f.paises.length || f.paises.includes(p.pais));
  const cities = Object.entries(count(inCountry, (p) => p.ciudad)).sort((a, b) => b[1] - a[1]);
  const replace = (u) => {
    setItems((prev) => prev.map((x) => (x.id === u.id ? { ...x, ...u, enCampana: x.enCampana } : x)));
    setOpen((o) => (o && o.id === u.id ? { ...o, ...u, enCampana: o.enCampana } : o));
  };
  // Marcar como hablado desde la fila: sale de la lista al instante, con opción de deshacer
  const setEstado = async (p, estado) => {
    setItems((prev) => prev.map((x) => (x.id === p.id ? { ...x, estado } : x)));
    try {
      await panel.updatePool(p.id, { estado });
    } catch (err) {
      setItems((prev) => prev.map((x) => (x.id === p.id ? { ...x, estado: p.estado } : x)));
      window.alert(`No se pudo guardar: ${err.message}`);
    }
  };
  const markTalked = (p) => {
    setEstado(p, 'contactado');
    setUndo(p);
  };
  const byState = count((items || []).filter((p) => !f.ocultarCampana || !p.enCampana), (p) => p.estado);
  const active = JSON.stringify(f) !== JSON.stringify(EMPTY);
  const high = visible.filter((p) => p.oportunidad >= 60).length;

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <aside className="w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white xl:sticky xl:top-24 xl:max-h-[calc(100vh-7.5rem)] xl:w-64 xl:overflow-y-auto">
        <div className="flex items-center border-b border-slate-100 px-4 py-3">
          <p className="flex-1 font-black text-[#182A2C]">Filtros</p>
          {active && <button type="button" onClick={() => setF(EMPTY)} className="bg-transparent text-xs font-bold text-slate-500 underline">Limpiar</button>}
        </div>
        <FilterGroup title="Mostrar">
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 text-xs font-bold">
            {[['nuevo', 'Nuevos'], ['contactado', 'Hablados'], ['guardado', 'Guardados'], ['descartado', 'Descartados'], ['todos', 'Todos']].map(([id, label]) => (
              <button key={id} type="button" onClick={() => set('estado', id)} className={`rounded-md py-1.5 ${id === 'todos' ? 'col-span-2' : ''} ${f.estado === id ? 'bg-white text-[#182A2C] shadow-sm' : 'bg-transparent text-slate-500'}`}>
                {label} <span className="font-semibold text-slate-400">{id === 'todos' ? '' : (byState[id] || 0).toLocaleString('es-AR')}</span>
              </button>
            ))}
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={f.ocultarCampana} onChange={(e) => set('ocultarCampana', e.target.checked)} className="h-3.5 w-3.5 accent-[#182A2C]" />
            Ocultar los que ya están en campaña
          </label>
        </FilterGroup>
        <FilterGroup title="País">
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(COUNTRIES).map((c) => (
              <button key={c} type="button" onClick={() => set('paises', toggle(f.paises, c))} className={`rounded-full px-3 py-1 text-xs font-bold ${f.paises.includes(c) ? 'bg-[#182A2C] text-white' : 'bg-slate-100 text-slate-600'}`}>{COUNTRIES[c]}</button>
            ))}
          </div>
        </FilterGroup>
        <FilterGroup title="Rubro">
          <CheckList options={Object.keys(count(base, (p) => p.rubro)).sort()} selected={f.rubros} onToggle={(v) => set('rubros', toggle(f.rubros, v))} counts={count(base, (p) => p.rubro)} />
        </FilterGroup>
        <FilterGroup title="Ciudad">
          <CheckList options={cities.map(([c]) => c)} selected={f.ciudades} onToggle={(v) => set('ciudades', toggle(f.ciudades, v))} counts={Object.fromEntries(cities)} />
        </FilterGroup>
        <FilterGroup title="Qué ofrecerle">
          <CheckList options={['Página web', 'Tienda online', 'Agente IA para WhatsApp', 'Rediseño y SEO']} selected={f.servicios} onToggle={(v) => set('servicios', toggle(f.servicios, v))} counts={count(base, (p) => p.servicio)} />
        </FilterGroup>
        <FilterGroup title="Su presencia web">
          <CheckList options={['sin', 'red', 'mala', 'ok']} labels={WEB_LABELS} selected={f.web} onToggle={(v) => set('web', toggle(f.web, v))} counts={count(base, webState)} />
        </FilterGroup>
        <FilterGroup title="Se le puede escribir por">
          <CheckList options={['whatsapp', 'email', 'instagram']} labels={{ whatsapp: 'WhatsApp', email: 'Correo', instagram: 'Instagram' }} selected={f.contacto} onToggle={(v) => set('contacto', toggle(f.contacto, v))}
            counts={{ whatsapp: base.filter((p) => p.whatsapp).length, email: base.filter((p) => p.email).length, instagram: base.filter((p) => p.info?.instagram).length }} />
        </FilterGroup>
        <FilterGroup title={`Oportunidad mínima: ${f.min}`}>
          <input type="range" min="0" max="90" step="5" value={f.min} onChange={(e) => set('min', Number(e.target.value))} className="w-full accent-[#182A2C]" />
        </FilterGroup>
        <FilterGroup title={`Reseñas en Google: ${f.minResenas}+`}>
          <input type="range" min="0" max="500" step="10" value={f.minResenas} onChange={(e) => set('minResenas', Number(e.target.value))} className="w-full accent-[#182A2C]" />
        </FilterGroup>
      </aside>

      <section className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <div className="mr-auto">
            <p className="font-black text-[#182A2C]">{visible.length.toLocaleString('es-AR')} negocios</p>
            <p className="text-xs text-slate-500">{high} con oportunidad alta · ordenados por {({ oportunidad: 'oportunidad', resenas: 'reseñas', rating: 'puntaje', nombre: 'nombre' })[sort]}</p>
          </div>
          <label className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Buscar negocio, web, correo…" className="w-52 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm" />
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700" aria-label="Ordenar">
            <option value="oportunidad">Mayor oportunidad</option>
            <option value="resenas">Más reseñas</option>
            <option value="rating">Mejor puntaje</option>
            <option value="nombre">Nombre</option>
          </select>
          <button type="button" onClick={() => downloadCsv(visible)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-[#182A2C]"><Download size={15} /> CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 pl-4 pr-2 font-bold">Oport.</th>
                <th className="px-4 py-3 font-bold">Negocio</th>
                <th className="px-4 py-3 font-bold">Qué ofrecerle</th>
                <th className="px-4 py-3 font-bold">Contacto</th>
                <th className="px-4 py-3 font-bold">Google</th>
                <th className="px-4 py-3"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.slice(0, shown).map((p) => (
                <tr key={p.id} onClick={() => setOpen(p)} className="cursor-pointer align-top hover:bg-slate-50">
                  <td className="py-3 pl-4 pr-2"><span className={`inline-flex h-9 w-11 items-center justify-center rounded-lg text-sm font-black tabular-nums ${scoreCls(p.oportunidad)}`}>{p.oportunidad}</span></td>
                  <td className="max-w-[230px] px-4 py-3">
                    <p className="flex items-center gap-1.5 truncate font-bold text-[#182A2C]">{p.estado === 'guardado' && <Bookmark size={13} className="shrink-0 fill-[#182A2C]" />}{p.nombre}{p.estado === 'contactado' && <span className="shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">Hablado</span>}</p>
                    <p className="truncate text-xs text-slate-500">{p.rubro} · {p.ciudad} <span className="ml-0.5 rounded bg-slate-100 px-1 text-[10px] font-bold text-slate-500">{p.pais}</span></p>
                    {p.enCampana && <p className="mt-1 text-[11px] font-bold text-violet-700">En campaña</p>}
                  </td>
                  <td className="max-w-[240px] px-4 py-3">
                    <p className="font-semibold text-[#182A2C]">{p.servicio}</p>
                    <p className="truncate text-xs text-slate-500">{(p.motivos || [])[0] || WEB_LABELS[webState(p)]}{(p.motivos || []).length > 1 ? ` · +${p.motivos.length - 1}` : ''}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={16} className={p.whatsapp ? (p.info?.whatsappSeguro ? 'text-[#25D366]' : 'text-[#25D366]/40') : 'text-slate-200'} aria-label="WhatsApp" />
                      <Mail size={16} className={p.email ? 'text-sky-600' : 'text-slate-200'} aria-label="Correo" />
                      <Instagram size={16} className={p.info?.instagram ? 'text-pink-600' : 'text-slate-200'} aria-label="Instagram" />
                      <Facebook size={16} className={p.info?.facebook ? 'text-blue-700' : 'text-slate-200'} aria-label="Facebook" />
                      <Globe size={16} className={p.info?.web ? 'text-slate-600' : 'text-slate-200'} aria-label="Web" />
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {p.rating ? <span className="flex items-center gap-1 font-semibold text-slate-700"><Star size={13} className="fill-amber-400 text-amber-400" /> {p.rating}</span> : <span className="text-slate-400">—</span>}
                    <span className="text-xs text-slate-400">{p.resenas || 0} reseñas</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.estado === 'contactado' ? (
                      <button type="button" onClick={(e) => { e.stopPropagation(); setEstado(p, 'nuevo'); }} title="Volver a nuevos" className="rounded-lg bg-emerald-50 p-2 text-emerald-700 hover:bg-emerald-100"><CheckCheck size={16} /></button>
                    ) : (
                      <button type="button" onClick={(e) => { e.stopPropagation(); markTalked(p); }} title="Marcar como hablado" className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"><Check size={16} /></button>
                    )}
                  </td>
                </tr>
              ))}
              {!visible.length && <tr><td colSpan="6" className="px-4 py-10 text-center text-slate-500">Ningún negocio coincide con estos filtros.</td></tr>}
            </tbody>
          </table>
        </div>
        {visible.length > shown && (
          <div className="border-t border-slate-100 p-4 text-center">
            <button type="button" onClick={() => setShown(shown + PAGE * 2)} className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-[#182A2C]">Ver más ({(visible.length - shown).toLocaleString('es-AR')} restantes)</button>
          </div>
        )}
      </section>

      {open && <Detail p={open} onClose={() => setOpen(null)} onChange={replace} />}
      {undo && (
        <div className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-4 rounded-xl bg-[#182A2C] px-5 py-3 text-sm text-white shadow-2xl">
          <span><strong>{undo.nombre}</strong> marcado como hablado</span>
          <button type="button" onClick={() => { setEstado(undo, undo.estado); setUndo(null); }} className="bg-transparent font-bold text-[#d9fb06] underline">Deshacer</button>
        </div>
      )}
    </div>
  );
};
