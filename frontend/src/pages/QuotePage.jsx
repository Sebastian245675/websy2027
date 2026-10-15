import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection, faqSchema } from '../components/FAQSection';
import { saveCotizacion, sendCotizacionEmail } from '../firebaseLazy';
import { trackFormSubmit } from '../lib/tracking';
import { COUNTRIES, whatsappUrl } from '../siteConfig';

// Cotizador: responde "cuánto cuesta una página web" con el rango oficial de cada tipo de proyecto y deja
// el contacto con los datos ya cargados. Solo usa los precios publicados en /planes; las opciones no inventan
// un precio exacto, indican si el proyecto va hacia el extremo bajo o alto del rango.

const PAGE_URL = 'https://www.websysrl.com/cotizador';

const TYPES = {
  landing: {
    label: 'Landing page',
    hint: 'Una página para un servicio o una campaña',
    range: 'Desde USD 800',
    time: '5 a 7 días hábiles',
    questions: [
      { id: 'copy', label: '¿Tenés los textos y las fotos?', options: [['si', 'Sí, los tengo', 0], ['parcial', 'Algunos', 1], ['no', 'No, necesito ayuda', 1]] },
      { id: 'form', label: '¿Necesitás algo además de WhatsApp y formulario?', options: [['no', 'No', 0], ['si', 'Sí (turnos, pagos, integraciones)', 2]] },
    ],
  },
  institucional: {
    label: 'Sitio institucional',
    hint: 'Varias páginas: servicios, empresa, casos, contacto',
    range: 'Desde USD 800',
    time: '2 a 3 semanas',
    questions: [
      { id: 'pages', label: '¿Cuántas páginas o servicios?', options: [['pocas', 'Hasta 5', 0], ['medio', '6 a 10', 1], ['muchas', 'Más de 10', 2]] },
      { id: 'blog', label: '¿Querés blog o novedades?', options: [['no', 'No', 0], ['si', 'Sí', 1]] },
      { id: 'lang', label: '¿En más de un idioma?', options: [['no', 'No', 0], ['si', 'Sí', 1]] },
    ],
  },
  tienda: {
    label: 'Tienda online',
    hint: 'Catálogo, carrito, pagos y envíos',
    range: 'USD 1.800 a 3.500',
    time: '3 a 6 semanas',
    questions: [
      { id: 'products', label: '¿Cuántos productos?', options: [['pocos', 'Menos de 100', 0], ['medio', '100 a 1.000', 1], ['muchos', 'Más de 1.000', 2]] },
      { id: 'stock', label: '¿Conectada a tu sistema de stock o facturación?', options: [['no', 'No', 0], ['si', 'Sí', 2]] },
      { id: 'variants', label: '¿Productos con talles, colores o variantes?', options: [['no', 'No', 0], ['si', 'Sí', 1]] },
    ],
  },
  sistema: {
    label: 'Sistema de gestión',
    hint: 'Stock, ventas, clientes, sucursales o turnos',
    range: 'USD 4.000 a 8.000',
    time: 'Por etapas',
    questions: [
      { id: 'modules', label: '¿Cuántas áreas tiene que cubrir?', options: [['pocos', '1 o 2 (por ejemplo stock y ventas)', 0], ['medio', '3 o 4', 1], ['muchos', '5 o más', 2]] },
      { id: 'branches', label: '¿Varias sucursales o depósitos?', options: [['no', 'No', 0], ['si', 'Sí', 1]] },
      { id: 'store', label: '¿Con tienda online conectada?', options: [['no', 'No', 0], ['si', 'Sí', 2]] },
    ],
  },
  app: {
    label: 'App móvil',
    hint: 'Android e iPhone, con panel de administración',
    range: 'Desde USD 2.000',
    time: '4 a 16 semanas',
    questions: [
      { id: 'kind', label: '¿Qué tipo de app?', options: [['catalogo', 'Informativa o catálogo', 0], ['turnos', 'Turnos, pedidos o reservas', 1], ['pagos', 'Con pagos, mapa en tiempo real o chat', 2]] },
    ],
    // En apps el tipo define el rango (precios del servicio de apps)
    rangeFor: (a) => ({ catalogo: ['Desde USD 2.000', '4 a 6 semanas'], turnos: ['USD 3.000 a 5.000', '6 a 10 semanas'], pagos: ['Desde USD 5.000', '10 a 16 semanas'] }[a.kind]),
  },
  automatizacion: {
    label: 'Automatización con IA',
    hint: 'WhatsApp o Instagram que responden y califican solos',
    range: 'Desde USD 200 por mes',
    time: 'Según alcance',
    questions: [
      { id: 'channel', label: '¿Qué canal?', options: [['wa', 'WhatsApp', 0], ['ig', 'Instagram', 0], ['ambos', 'Los dos', 1]] },
      { id: 'crm', label: '¿Tiene que cargar los contactos en un CRM o planilla?', options: [['no', 'No', 0], ['si', 'Sí', 1]] },
    ],
  },
};

const position = (score, max) => {
  if (max === 0 || score === 0) return 'Tu proyecto está en el extremo bajo del rango.';
  if (score / max < 0.5) return 'Tu proyecto está en la parte baja o media del rango.';
  return 'Tu proyecto va hacia la parte alta del rango.';
};

const FAQ = [
  { q: '¿Cuánto cuesta una página web en 2026?', a: 'En Websy, una landing page o un sitio institucional arranca en USD 800; una tienda online cuesta entre USD 1.800 y 3.500; un sistema de gestión, entre USD 4.000 y 8.000, y una app móvil desde USD 2.000. El precio exacto queda cerrado por escrito antes de empezar.' },
  { q: '¿El resultado del cotizador es el precio final?', a: 'Es un rango orientativo con los precios publicados. El precio final depende del detalle del proyecto y te lo pasamos por escrito, con el plazo, después de una charla corta.' },
  { q: '¿Cómo se paga?', a: 'En 3 partes: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega. En Argentina, con Mercado Pago o Naranja X; desde el exterior, con Dólar App o Binance.' },
  { q: '¿Qué hace subir el precio de una web?', a: 'La cantidad de páginas y productos, las integraciones (stock, facturación, pagos, turnos), los idiomas y si hay que producir los textos y las fotos. Una landing simple con WhatsApp es lo más económico.' },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cotizador de páginas web de Websy',
    url: PAGE_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@type': 'Organization', name: 'Websy', url: 'https://www.websysrl.com/' },
  },
  faqSchema(FAQ),
];

export const QuotePage = () => {
  const [type, setType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', phone: '', country: 'AR' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const def = type ? TYPES[type] : null;
  const complete = def && def.questions.every((q) => answers[q.id]);

  const result = useMemo(() => {
    if (!complete) return null;
    const score = def.questions.reduce((sum, q) => sum + (q.options.find(([v]) => v === answers[q.id])?.[2] || 0), 0);
    const max = def.questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o[2])), 0);
    const [range, time] = def.rangeFor ? def.rangeFor(answers) : [def.range, def.time];
    const summary = def.questions.map((q) => `${q.label} ${q.options.find(([v]) => v === answers[q.id])?.[1]}`);
    return { range, time, note: def.rangeFor ? null : position(score, max), summary };
  }, [complete, def, answers]);

  const waText = result
    ? `Hola! Usé el cotizador: ${def.label}, rango ${result.range}. ${result.summary.join(' · ')}. Quiero la propuesta exacta.`
    : 'Hola! Quiero cotizar un proyecto.';

  const pick = (t) => {
    setType(t);
    setAnswers({});
    setStatus('idle');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.phone.trim()) return;
    setStatus('sending');
    const dial = (COUNTRIES.find((c) => c.code === contact.country) || COUNTRIES[0]).dial;
    const phone = `${dial} ${contact.phone.trim()}`;
    const message = [`Cotizador: ${def.label}`, `Rango mostrado: ${result.range} (${result.time})`, ...result.summary, 'Página: /cotizador'].join('\n');
    const record = { name: contact.name.trim(), phone, whatsapp: phone, email: `Sin email · WhatsApp ${phone}`, projectType: def.label, budget: result.range, source: 'cotizador', message };
    try {
      const docId = await saveCotizacion(record);
      try { await sendCotizacionEmail({ cotizacionId: docId, ...record }); } catch (err) { console.error(err); }
      try {
        await fetch('https://backend.websysrl.com/api/public/forms/websy-contacto-landing/submissions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ formData: record }),
        });
      } catch (err) { console.error(err); }
      trackFormSubmit('cotizador');
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const optCls = (active) => `text-left rounded-xl border-2 px-4 py-3 transition-colors ${active ? 'border-[#182A2C] bg-[#182A2C] text-white' : 'border-slate-200 bg-white text-[#182A2C] hover:border-[#182A2C]'}`;

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title="Cotizador: ¿cuánto cuesta una página web? | Websy"
        description="Calculá en 1 minuto cuánto cuesta tu página web, tienda online, sistema o app con los precios publicados de Websy: desde USD 800. Sin registrarte."
        url={PAGE_URL}
        jsonLd={jsonLd}
      />

      <section className="bg-[#182A2C] text-white">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl py-12 md:py-16">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <ChevronRight size={13} />
            <span className="text-white font-semibold">Cotizador</span>
          </nav>
          <h1 className="text-[34px] sm:text-5xl font-black leading-[1.06] tracking-tight">¿Cuánto cuesta tu <span className="text-[#d9fb06]">página web</span>?</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl leading-relaxed">
            Elegí qué necesitás, respondé 2 o 3 preguntas y te mostramos el rango de precio y el plazo con nuestros precios publicados. Sin registrarte.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl font-black text-[#182A2C] mb-5">1. ¿Qué necesitás?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(TYPES).map(([key, t]) => (
              <button key={key} type="button" onClick={() => pick(key)} className={optCls(type === key)} aria-pressed={type === key}>
                <span className="block font-bold">{t.label}</span>
                <span className={`block text-sm mt-0.5 ${type === key ? 'text-white/70' : 'text-slate-500'}`}>{t.hint}</span>
              </button>
            ))}
          </div>

          {def && (
            <div className="mt-10 space-y-8">
              <h2 className="text-xl md:text-2xl font-black text-[#182A2C]">2. Contanos un poco más</h2>
              {def.questions.map((q) => (
                <fieldset key={q.id}>
                  <legend className="font-semibold text-[#182A2C] mb-3">{q.label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map(([value, text]) => (
                      <button key={value} type="button" onClick={() => setAnswers((a) => ({ ...a, [q.id]: value }))}
                        className={optCls(answers[q.id] === value)} aria-pressed={answers[q.id] === value}>
                        {text}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          )}

          {result && (
            <div className="mt-10 rounded-2xl bg-[#182A2C] text-white p-6 md:p-9" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9fb06]">Tu estimación · {def.label}</p>
              <p className="mt-3 text-4xl md:text-5xl font-black">{result.range}</p>
              <p className="mt-2 text-white/80">Plazo habitual: {result.time}. {result.note}</p>
              <p className="mt-1 text-sm text-white/60">Pago en 3 partes: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega.</p>

              {status === 'done' ? (
                <p className="mt-8 flex items-start gap-2 text-lg font-semibold"><Check className="text-[#d9fb06] mt-1 shrink-0" /> Listo. Te escribimos por WhatsApp en el día hábil con la propuesta exacta.</p>
              ) : (
                <form onSubmit={submit} className="mt-8 grid md:grid-cols-[1fr_1.3fr_auto] gap-3 items-end">
                  <div>
                    <label htmlFor="q-name" className="block text-sm font-semibold mb-1.5">Nombre</label>
                    <input id="q-name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required autoComplete="name"
                      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40" />
                  </div>
                  <div>
                    <label htmlFor="q-phone" className="block text-sm font-semibold mb-1.5">WhatsApp</label>
                    <div className="flex gap-2">
                      <select value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} aria-label="Código de país"
                        className="rounded-lg bg-white/10 border border-white/20 px-2 text-sm">
                        {COUNTRIES.filter((c) => c.dial).map((c) => <option key={c.code} value={c.code} className="text-[#182A2C]">{c.code} {c.dial}</option>)}
                      </select>
                      <input id="q-phone" type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} required autoComplete="tel-national"
                        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white" />
                    </div>
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="rounded-lg bg-[#d9fb06] text-[#182A2C] font-black px-6 py-3.5 hover:bg-white disabled:opacity-60">
                    {status === 'sending' ? 'Enviando...' : 'Quiero la propuesta exacta'}
                  </button>
                  {status === 'error' && <p className="md:col-span-3 text-sm text-red-300">No pudimos enviarlo. Escribinos por WhatsApp.</p>}
                </form>
              )}
              <a href={whatsappUrl(waText)} target="_blank" rel="noopener noreferrer" data-wa-location="cotizador"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d9fb06] hover:underline">
                <MessageCircle size={16} /> O mandanos este resultado por WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f4f7f9] py-12 md:py-16">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
          <h2 className="text-[26px] md:text-[34px] font-extrabold text-[#182A2C] tracking-tight mb-6">Precios de Websy en 2026</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-[#182A2C] text-white">
                <tr><th className="px-5 py-4">Proyecto</th><th className="px-5 py-4 whitespace-nowrap">Precio</th><th className="px-5 py-4 whitespace-nowrap">Plazo</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.values(TYPES).map((t) => (
                  <tr key={t.label}><td className="px-5 py-4 font-bold text-[#182A2C]">{t.label}</td><td className="px-5 py-4 whitespace-nowrap">{t.range}</td><td className="px-5 py-4 whitespace-nowrap text-slate-600">{t.time}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[15px] text-slate-600">
            El detalle de qué incluye cada plan está en <Link to="/planes" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">Inversión</Link>. Si querés saber primero qué mejorar en tu web actual, pedí la <Link to="/auditoria-gratis" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">auditoría gratis</Link>.
          </p>
        </div>
      </section>

      <FAQSection items={FAQ} title="Preguntas sobre precios" />

      <section className="pb-16">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl text-center">
          <Link to="/casos-de-exito" className="inline-flex items-center gap-2 font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
            Ver proyectos reales con sus resultados <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
