import React, { useEffect, useState } from 'react';
import { Check, Star } from 'lucide-react';
import { reviews as reviewsApi } from '../lib/api';
import { GOOGLE_REVIEW_URL } from '../siteConfig';
import { trackFormSubmit } from '../lib/tracking';

// Reseñas de clientes (/argentina, al final de la página). Las que se mandan entran pendientes en leads-api y
// solo aparecen acá cuando se aprueban desde /panel → Reseñas, donde también se rechazan o se borran.
// Si GOOGLE_REVIEW_URL está definido en siteConfig.js, se ofrece dejarla también en Google.

const COPY = {
  es: {
    chip: 'Reseñas',
    title: 'Lo que dicen los negocios que trabajan con Websy.',
    resumen: (avg, n) => `${avg.toFixed(1)} de 5 · ${n} ${n === 1 ? 'reseña' : 'reseñas'}`,
    vacio: 'Todavía no hay reseñas publicadas. Si trabajaste con nosotros, dejá la primera.',
    formTitle: '¿Trabajaste con Websy? Dejá tu reseña',
    formSub: 'La publicamos cuando la revisamos, normalmente en el día.',
    nombre: 'Nombre y apellido',
    negocio: 'Negocio o rubro',
    opcional: 'opcional',
    estrellas: 'Tu calificación',
    comentario: 'Tu comentario',
    comentarioPh: 'Contanos cómo fue trabajar con nosotros',
    enviar: 'Enviar reseña',
    enviando: 'Enviando…',
    gracias: '¡Gracias! Tu reseña se publica cuando la revisemos.',
    google: 'Dejala también en Google',
    errEstrellas: 'Elegí de 1 a 5 estrellas.',
    errGenerico: 'No pudimos enviarla. Probá de nuevo en un rato.',
    estrellaLabel: (n) => `${n} ${n === 1 ? 'estrella' : 'estrellas'}`,
  },
  en: {
    chip: 'Reviews',
    title: 'What businesses working with Websy say.',
    resumen: (avg, n) => `${avg.toFixed(1)} out of 5 · ${n} ${n === 1 ? 'review' : 'reviews'}`,
    vacio: 'No reviews published yet. If you worked with us, leave the first one.',
    formTitle: 'Worked with Websy? Leave your review',
    formSub: 'We publish it once we review it, usually the same day.',
    nombre: 'First and last name',
    negocio: 'Business or industry',
    opcional: 'optional',
    estrellas: 'Your rating',
    comentario: 'Your comment',
    comentarioPh: 'Tell us what it was like to work with us',
    enviar: 'Send review',
    enviando: 'Sending…',
    gracias: 'Thank you! Your review will be published once we review it.',
    google: 'Leave it on Google too',
    errEstrellas: 'Choose from 1 to 5 stars.',
    errGenerico: 'We couldn’t send it. Please try again later.',
    estrellaLabel: (n) => `${n} ${n === 1 ? 'star' : 'stars'}`,
  },
};

const Stars = ({ value, size = 16 }) => (
  <span className="inline-flex gap-0.5" aria-label={`${value}/5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={size} className={i <= value ? 'fill-[#d9fb06] text-[#182A2C]' : 'text-slate-300'} />
    ))}
  </span>
);

const fecha = (iso, lang) => {
  try {
    return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

export const ReviewsSection = ({ lang = 'es', id = 'resenas' }) => {
  const t = COPY[lang] || COPY.es;
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ name: '', business: '', rating: 0, text: '', company_website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  useEffect(() => {
    reviewsApi.list().then(setData).catch(() => setData({ count: 0, average: null, reviews: [] }));
  }, []);

  const enviar = async (e) => {
    e.preventDefault();
    if (!form.rating) { setError(t.errEstrellas); return; }
    setError('');
    setStatus('sending');
    try {
      await reviewsApi.send(form);
      trackFormSubmit('resena');
      setStatus('done');
    } catch (err) {
      setError(err.message || t.errGenerico);
      setStatus('error');
    }
  };

  const campo = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#182A2C] placeholder-slate-400 focus:outline-none focus:border-[#182A2C] focus:ring-4 focus:ring-[#d9fb06]/40';
  const lista = data?.reviews || [];

  return (
    <section id={id} className="py-12 md:py-16 bg-[#f4f7f9]" style={{ scrollMarginTop: '120px' }}>
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <span className="inline-block bg-[#d9fb06] text-[#182A2C] font-black text-[10px] tracking-[.25em] uppercase px-2 py-1 mb-5">{t.chip}</span>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="text-[28px] md:text-[40px] font-black leading-[1.1] tracking-tight max-w-3xl text-[#182A2C]">{t.title}</h2>
          {data?.count > 0 && (
            <p className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-[#182A2C]">
              <Stars value={Math.round(data.average)} /> {t.resumen(data.average, data.count)}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-6 items-start">
          {/* Reseñas publicadas */}
          <div>
            {data && lista.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-[15px] text-slate-600">{t.vacio}</p>
            )}
            <ul className="grid sm:grid-cols-2 gap-4">
              {lista.map((r) => (
                <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                  <Stars value={r.rating} />
                  <p className="text-[15px] text-slate-700 leading-relaxed">“{r.text}”</p>
                  <p className="mt-auto text-[13px] text-slate-500">
                    <span className="font-bold text-[#182A2C]">{r.name}</span>
                    {r.business ? ` · ${r.business}` : ''} · {fecha(r.createdAt, lang)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulario */}
          <div className="rounded-2xl bg-[#182A2C] text-white p-6 md:p-7">
            <h3 className="text-xl md:text-2xl font-black tracking-tight">{t.formTitle}</h3>
            <p className="mt-1 text-[14px] text-white/70">{t.formSub}</p>
            {status === 'done' ? (
              <p className="mt-6 flex items-start gap-2 text-[16px] font-semibold"><Check className="mt-0.5 shrink-0 text-[#d9fb06]" /> {t.gracias}</p>
            ) : (
              <form onSubmit={enviar} className="mt-5 flex flex-col gap-4" noValidate>
                <div>
                  <p className="text-[13px] font-bold text-white/80 mb-1.5">{t.estrellas}</p>
                  <div className="flex gap-1.5" role="radiogroup" aria-label={t.estrellas}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" role="radio" aria-checked={form.rating === n} aria-label={t.estrellaLabel(n)}
                        onClick={() => { setForm((f) => ({ ...f, rating: n })); setError(''); }}
                        className="p-1 rounded-lg hover:bg-white/10">
                        <Star size={28} className={n <= form.rating ? 'fill-[#d9fb06] text-[#d9fb06]' : 'text-white/40'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="rv-name" className="block text-[13px] font-bold text-white/80 mb-1.5">{t.nombre}</label>
                  <input id="rv-name" required maxLength={120} autoComplete="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={campo} />
                </div>
                <div>
                  <label htmlFor="rv-business" className="block text-[13px] font-bold text-white/80 mb-1.5">{t.negocio} <span className="font-normal text-white/50">({t.opcional})</span></label>
                  <input id="rv-business" maxLength={120} value={form.business} onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))} className={campo} />
                </div>
                <div>
                  <label htmlFor="rv-text" className="block text-[13px] font-bold text-white/80 mb-1.5">{t.comentario}</label>
                  <textarea id="rv-text" required minLength={10} maxLength={1500} rows={4} placeholder={t.comentarioPh} value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} className={campo} />
                </div>
                {/* Campo trampa para bots: los visitantes no lo ven */}
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={form.company_website} onChange={(e) => setForm((f) => ({ ...f, company_website: e.target.value }))}
                  className="hidden" aria-hidden="true" />
                {error && <p role="alert" className="text-sm font-semibold text-red-200">{error}</p>}
                <button type="submit" disabled={status === 'sending'} className="bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-6 py-3.5 text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors disabled:opacity-60">
                  {status === 'sending' ? t.enviando : t.enviar}
                </button>
              </form>
            )}
            {GOOGLE_REVIEW_URL && (
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d9fb06] hover:underline">
                <Star size={16} /> {t.google}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
