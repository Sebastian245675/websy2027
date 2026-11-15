import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Check, ChevronRight, Search, Settings2, Target } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection } from '../components/FAQSection';
import { saveCountry } from '../lib/geo';
import {
  formatSeoMonthlyPrice,
  getMarket,
  SEO_MONTHLY_PRICE_USD,
  SEO_PRICING_UPDATED_AT,
  seoLocalAmount,
} from '../pricing';
import { seoCountryPageByCode } from '../seoCountryPages';
import { whatsappUrl } from '../siteConfig';

const SITE_URL = 'https://www.websysrl.com';

const MONTHLY_WORK = [
  { icon: Search, title: 'Seguimiento de búsquedas', text: 'Revisamos posiciones, impresiones, clics y oportunidades en Google Search Console.' },
  { icon: Settings2, title: 'Mejoras técnicas y on-page', text: 'Corregimos indexación, titles, contenido, enlaces internos, schema y problemas que frenen el crecimiento.' },
  { icon: Target, title: 'Una prioridad comercial por mes', text: 'Creamos o mejoramos una página clave según el servicio, país o ciudad con mayor oportunidad.' },
  { icon: BarChart3, title: 'Informe y siguiente acción', text: 'Entregamos un resumen entendible: qué mejoró, qué consultas llegaron y qué atacaremos después.' },
];

const INCLUDED = [
  'Auditoría inicial y medición de base',
  'Mapa de palabras clave por servicio y ubicación',
  'Seguimiento técnico de indexación y canonical',
  'Optimización mensual de contenido y enlazado interno',
  'Una página prioritaria creada o mejorada por mes',
  'Informe mensual con posiciones, tráfico y consultas',
  'Reunión mensual de seguimiento de 30 minutos',
];

const EXCLUDED = [
  'Presupuesto de Google Ads o Meta Ads',
  'Compra de enlaces o publicaciones patrocinadas',
  'Rediseños completos o desarrollo de funciones nuevas',
];

const faqFor = (page) => [
  { q: `¿Cuánto cuesta el SEO mensual en ${page.country}?`, a: `El plan cuesta USD ${SEO_MONTHLY_PRICE_USD} por mes. La referencia actual es ${formatSeoMonthlyPrice(page.code)} y se confirma al contratar porque el tipo de cambio puede variar.` },
  { q: '¿Garantizan quedar en el top 5 de Google?', a: 'No existe una garantía seria de posición porque Google y la competencia cambian. El top 5 puede ser el objetivo para búsquedas acordadas, pero el trabajo se mide también por visibilidad, consultas y ventas.' },
  { q: '¿Cuándo se empiezan a ver resultados?', a: 'Las mejoras técnicas pueden verse rápido, pero el crecimiento orgánico suele empezar entre el segundo y el cuarto mes. Las búsquedas competidas requieren continuidad, contenido y autoridad.' },
  { q: '¿Tengo que permanecer un tiempo mínimo?', a: 'Recomendamos un ciclo inicial de 3 meses para poder medir tendencia y ejecutar prioridades. Después el servicio continúa mes a mes.' },
  { q: '¿Sirve para una web que no hizo Websy?', a: 'Sí. Primero auditamos la tecnología y los accesos. Si la plataforma permite editar SEO, contenido y medición, podemos trabajar sobre el sitio existente.' },
];

const schemaFor = (page, faqs) => {
  const market = getMarket(page.code);
  const url = `${SITE_URL}${page.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Servicio mensual de SEO en ${page.country}`,
        serviceType: 'Posicionamiento SEO',
        url,
        provider: { '@type': 'Organization', name: 'Websy', url: `${SITE_URL}/` },
        areaServed: { '@type': 'Country', name: page.country },
        offers: {
          '@type': 'Offer',
          price: String(seoLocalAmount(page.code)),
          priceCurrency: market.currency,
          description: `Equivalente orientativo a USD ${SEO_MONTHLY_PRICE_USD} por mes`,
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
};

export const SeoCountryPage = ({ code }) => {
  const page = seoCountryPageByCode(code);
  const faqs = faqFor(page);
  const price = formatSeoMonthlyPrice(code);

  useEffect(() => saveCountry(code), [code]);

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={page.title}
        description={page.description}
        url={`${SITE_URL}${page.path}`}
        locale={page.locale}
        jsonLd={schemaFor(page, faqs)}
      />

      <section className="bg-[#182A2C] text-white py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="mb-7 flex items-center gap-1.5 text-[13px] text-white/60" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Inicio</Link><ChevronRight size={13} />
            <Link to={page.parentPath} className="hover:text-white">{page.country}</Link><ChevronRight size={13} />
            <span className="font-semibold text-white">SEO mensual</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#d9fb06]">Posicionamiento por país</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{page.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{page.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl(page.wa, code)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-6 py-3.5 font-bold text-[#182A2C] hover:bg-white">
                  Quiero mejorar mis posiciones <ArrowRight size={17} />
                </a>
                <a href="#plan" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10">Ver qué incluye</a>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/15 bg-white/[.06] p-7">
              <p className="text-sm font-bold uppercase tracking-[.16em] text-white/60">Plan SEO mensual</p>
              <p className="mt-3 text-4xl font-black text-[#d9fb06]">{price}</p>
              <p className="mt-2 font-semibold text-white">Equivalente a USD {SEO_MONTHLY_PRICE_USD}/mes</p>
              <p className="mt-5 text-sm leading-relaxed text-white/65">Conversión orientativa actualizada el {SEO_PRICING_UPDATED_AT}. {page.payment}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Estrategia local y nacional</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#182A2C] md:text-4xl">Posicionamos servicios, no páginas vacías</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate-700">{page.proof}</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.searches.map((term) => <div key={term} className="rounded-xl border border-slate-200 bg-[#f8fafc] p-5 font-bold text-[#182A2C]">“{term}”</div>)}
          </div>
        </div>
      </section>

      <section id="plan" className="bg-[#f4f7f9] py-14 md:py-20" style={{ scrollMarginTop: '110px' }}>
        <div className="container mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Trabajo continuo</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#182A2C] md:text-4xl">Qué hacemos todos los meses</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {MONTHLY_WORK.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <Icon className="text-[#556902]" size={24} />
                <h3 className="mt-4 text-xl font-extrabold text-[#182A2C]">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-[#182A2C] p-7 text-white">
              <h3 className="text-2xl font-black">Incluido por {price}</h3>
              <ul className="mt-6 space-y-3">
                {INCLUDED.map((item) => <li key={item} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#d9fb06]" />{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h3 className="text-2xl font-black text-[#182A2C]">Se cotiza por separado</h3>
              <ul className="mt-6 space-y-3 text-slate-700">
                {EXCLUDED.map((item) => <li key={item} className="flex gap-3"><span className="font-black text-slate-400">—</span>{item}</li>)}
              </ul>
              <p className="mt-7 text-sm leading-relaxed text-slate-500">El objetivo puede ser entrar al top 5 para un grupo de búsquedas, pero ninguna agencia controla el algoritmo de Google. Informamos avances y obstáculos con datos, sin promesas artificiales.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-5xl px-5 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#182A2C] md:text-4xl">Empezamos con una auditoría y un objetivo de 90 días</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">Definimos las búsquedas prioritarias, medimos la posición inicial y acordamos qué mejorar primero. También puedes solicitar una <Link to="/auditoria-gratis" className="font-bold underline decoration-[#d9fb06] decoration-2 underline-offset-4">auditoría inicial</Link> o revisar el <Link to="/servicios/seo-marketing" className="font-bold underline decoration-[#d9fb06] decoration-2 underline-offset-4">servicio general de SEO</Link>.</p>
          <a href={whatsappUrl(page.wa, code)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#182A2C] px-7 py-4 font-bold text-white hover:bg-black">Consultar el plan <ArrowRight size={17} /></a>
        </div>
      </section>

      <FAQSection items={faqs} title={`Preguntas frecuentes sobre SEO en ${page.country}`} />
    </div>
  );
};
