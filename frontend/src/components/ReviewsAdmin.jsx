import React, { useEffect, useState } from 'react';
import { Check, EyeOff, Star, Trash2 } from 'lucide-react';
import { panel } from '../lib/api';

// Panel → Reseñas: las que dejan los clientes en /argentina. Entran pendientes; acá se aprueban (se ven en el
// sitio), se ocultan (rechazadas, no se ven) o se borran para siempre.

const FILTROS = [['pendiente', 'Pendientes'], ['aprobada', 'Publicadas'], ['rechazada', 'Ocultas'], ['todas', 'Todas']];
const ESTADO = {
  pendiente: { label: 'Pendiente', cls: 'bg-[#d9fb06] text-[#182A2C]' },
  aprobada: { label: 'Publicada', cls: 'bg-emerald-100 text-emerald-800' },
  rechazada: { label: 'Oculta', cls: 'bg-slate-200 text-slate-600' },
};

const Stars = ({ value }) => (
  <span className="inline-flex gap-0.5" aria-label={`${value}/5`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={15} className={i <= value ? 'fill-[#d9fb06] text-[#182A2C]' : 'text-slate-300'} />)}
  </span>
);

export const ReviewsAdmin = ({ onError }) => {
  const [items, setItems] = useState(null);
  const [filtro, setFiltro] = useState('pendiente');

  const cargar = () => panel.reviews().then(setItems).catch((err) => onError?.(err.message));
  useEffect(() => { cargar(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cambiar = async (id, status) => {
    try {
      const r = await panel.updateReview(id, status);
      setItems((xs) => xs.map((x) => (x.id === id ? r : x)));
    } catch (err) { onError?.(err.message); }
  };

  const borrar = async (id) => {
    if (!window.confirm('¿Borrar esta reseña para siempre? No se puede deshacer.')) return;
    try {
      await panel.deleteReview(id);
      setItems((xs) => xs.filter((x) => x.id !== id));
    } catch (err) { onError?.(err.message); }
  };

  if (!items) return <p className="text-slate-500">Cargando…</p>;
  const cuenta = (s) => items.filter((x) => s === 'todas' || x.status === s).length;
  const lista = items.filter((x) => filtro === 'todas' || x.status === filtro);
  const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors';

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Las reseñas que dejan los clientes en /argentina. Solo se ven en el sitio las que aprobás.</p>
      <div className="flex flex-wrap gap-2">
        {FILTROS.map(([id, label]) => (
          <button key={id} type="button" onClick={() => setFiltro(id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${filtro === id ? 'border-[#182A2C] bg-[#182A2C] text-white' : 'border-slate-200 bg-white text-[#182A2C]'}`}>
            {label} <span className="opacity-60">{cuenta(id)}</span>
          </button>
        ))}
      </div>
      {lista.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">No hay reseñas en esta lista.</p>}
      <ul className="grid gap-3 xl:grid-cols-2">
        {lista.map((r) => (
          <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Stars value={r.rating} />
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${ESTADO[r.status]?.cls || ''}`}>{ESTADO[r.status]?.label || r.status}</span>
            </div>
            <p className="text-[15px] text-slate-700 leading-relaxed">“{r.text}”</p>
            <p className="text-xs text-slate-500">
              <span className="font-bold text-[#182A2C]">{r.name}</span>{r.business ? ` · ${r.business}` : ''} · {new Date(r.createdAt).toLocaleString('es-AR')}{r.page ? ` · ${r.page}` : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {r.status !== 'aprobada' && (
                <button type="button" onClick={() => cambiar(r.id, 'aprobada')} className={`${btn} bg-[#182A2C] text-white hover:bg-black`}><Check size={14} /> Publicar</button>
              )}
              {r.status !== 'rechazada' && (
                <button type="button" onClick={() => cambiar(r.id, 'rechazada')} className={`${btn} border border-slate-300 bg-white text-[#182A2C] hover:border-[#182A2C]`}><EyeOff size={14} /> Ocultar</button>
              )}
              <button type="button" onClick={() => borrar(r.id)} className={`${btn} border border-red-200 bg-white text-red-700 hover:bg-red-50`}><Trash2 size={14} /> Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
