import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, Clock, CreditCard, Globe, MessageCircle, ShoppingBag } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection } from '../components/FAQSection';
import { AuditForm } from '../components/AuditForm';
import { CaseCard } from '../components/CaseStudyParts';
import { caseStudies } from '../caseStudies';
import { getPostBySlug } from '../blogData';
import { COUNTRY_ALTERNATES, countryPageByCode, countryPages } from '../countryPages';
import { whatsappUrl } from '../siteConfig';
import { saveCountry } from '../lib/geo';

// Versión del sitio para un país (/colombia, /mexico, /estados-unidos). El contenido está en src/countryPages.js.

const SITE_URL = 'https://www.websysrl.com';

const SERVICES = [
  { name: 'Landing page', desc: 'Una página para un servicio o una campaña, con WhatsApp y formulario.', price: 'Desde USD 800', time: '5 a 7 días hábiles', to: '/servicios/desarrollo-web' },
  { name: 'Sitio institucional', desc: 'Varias páginas: servicios, empresa, casos, contacto y blog.', price: 'Desde USD 800', time: '2 a 3 semanas', to: '/servicios/desarrollo-web' },
  { name: 'Tienda en línea', desc: 'Catálogo, carrito, pagos, envíos y panel para cargar productos.', price: 'USD 1.800 a 3.500', time: '3 a 6 semanas', to: '/servicios/ecommerce' },
  { name: 'Sistema de gestión', desc: 'Inventario, ventas, sucursales, turnos o clientes en un solo sistema.', price: 'USD 4.000 a 8.000', time: 'Por etapas', to: '/servicios/sistemas-gestion' },
  { name: 'Automatización con IA', desc: 'Respuestas automáticas por WhatsApp, calificación de prospectos, reportes.', price: 'Según alcance', time: 'Según alcance', to: '/servicios/automatizaciones-ia' },
];

const STEPS = [
  { title: 'Videollamada', text: 'Nos cuentas qué vendes, a quién y qué tiene que lograr la web. Dura 20 minutos.' },
  { title: 'Propuesta', text: 'En el día hábil te enviamos el alcance, el precio cerrado y el plazo por escrito.' },
  { title: 'Diseño', text: 'Te mostramos el diseño antes de programar y lo ajustamos con tus comentarios.' },
  { title: 'Desarrollo', text: 'Ves cada avance en un enlace de prueba: rápida en el celular y preparada para Google.' },
  { title: 'Publicación', text: 'La publicamos con tu dominio, te enseñamos a usarla y seguimos disponibles por WhatsApp.' },
];

const linkCls = 'font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4';

const SectionTitle = ({ kicker, children }) => (
  <div className="mb-8 md:mb-10">
    {kicker && <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#556902] mb-3">{kicker}</p>}
    <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight max-w-3xl">{children}</h2>
  </div>
);

const pageJsonLd = (page, url) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: page.seoTitle,
      inLanguage: page.hreflang,
      isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: 'Websy' },
    },
    {
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: `Desarrollo web para empresas de ${page.name}`,
      serviceType: 'Desarrollo web y software',
      url,
      provider: { '@type': 'Organization', name: 'Websy', url: `${SITE_URL}/` },
      areaServed: { '@type': 'Country', name: page.name },
      availableLanguage: page.code === 'US' ? ['es', 'en'] : ['es'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Servicios de Websy en ${page.name}`,
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.desc },
          description: `${s.price} · ${s.time}`,
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: page.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
});

export const CountryPage = ({ code }) => {
  const page = countryPageByCode(code);
  const url = `${SITE_URL}${page.path}`;
  const cases = caseStudies.filter((c) => c.location.includes(page.caseMatch));
  const posts = page.posts.map(getPostBySlug).filter(Boolean);
  const others = countryPages.filter((c) => c.code !== code);

  // Entrar a una versión por país es una elección explícita: la home la recuerda la próxima vez
  useEffect(() => saveCountry(code), [code]);

  const WhatsAppCta = ({ dark = false }) => (
    <a
      href={whatsappUrl(page.waText)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa-location={`pais_${code.toLowerCase()}`}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold transition-colors ${
        dark ? 'bg-[#182A2C] text-white hover:bg-black' : 'bg-[#d9fb06] text-[#182A2C] hover:bg-white'
      }`}
    >
      <MessageCircle size={18} />
      Pide tu cotización por WhatsApp
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </a>
  );

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={page.seoTitle}
        description={page.seoDescription}
        url={url}
        alternates={COUNTRY_ALTERNATES}
        locale={page.locale}
        jsonLd={pageJsonLd(page, url)}
      />

      {/* Hero */}
      <section className="bg-[#182A2C] text-white">
        <div className="py-12 md:py-20">
          <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
            <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight size={13} />
              <span className="text-white font-semibold">Websy en {page.name}</span>
            </nav>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h1 className="text-[34px] sm:text-5xl lg:text-[3.4rem] font-black leading-[1.06] tracking-tight">
                  {page.h1[0]} <span className="text-[#d9fb06]">{page.h1[1]}</span>
                </h1>
                <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">{page.lead}</p>
                <ul className="mt-7 grid sm:grid-cols-2 gap-3 text-[15px] text-white/90">
                  {page.highlights.map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-[#d9fb06]" />{t}</li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <WhatsAppCta />
                  <a href="#precios" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-white/10 transition-colors">
                    Ver precios
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-7 space-y-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d9fb06]">Cómo trabajamos con {page.name}</p>
                  <p className="flex items-start gap-3 text-[15px] text-white/85 leading-relaxed"><Clock size={18} className="mt-0.5 shrink-0 text-[#d9fb06]" />{page.schedule}</p>
                  <p className="flex items-start gap-3 text-[15px] text-white/85 leading-relaxed"><CreditCard size={18} className="mt-0.5 shrink-0 text-[#d9fb06]" />{page.payment}</p>
                  <p className="flex items-start gap-3 text-[15px] text-white/85 leading-relaxed"><Globe size={18} className="mt-0.5 shrink-0 text-[#d9fb06]" />{page.domain}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Respuesta directa */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <div className="max-w-3xl text-[17px] text-slate-700 leading-relaxed space-y-5">
            <p><strong className="text-[#182A2C]">{page.answer[0]}</strong></p>
            {page.answer.slice(1).map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Casos del país */}
      {cases.length > 0 && (
        <section className="bg-[#f4f7f9] py-14 md:py-20">
          <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
            <SectionTitle kicker="Casos reales">
              {cases.length === 1 ? `Un proyecto que hicimos en ${page.name}` : `${cases.length} proyectos que hicimos en ${page.name}`}
            </SectionTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c) => <CaseCard key={c.slug} study={c} />)}
            </div>
            <p className="mt-8 text-[15px] text-slate-600">
              También trabajamos con empresas de Argentina y del resto de Latinoamérica. Mira todos los <Link to="/casos-de-exito" className={linkCls}>casos de éxito</Link>.
            </p>
          </div>
        </section>
      )}

      {/* Precios */}
      <section id="precios" className="py-14 md:py-20" style={{ scrollMarginTop: '120px' }}>
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <SectionTitle kicker="Precios en dólares">Cuánto cuesta una página web desde {page.name}</SectionTitle>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-[#182A2C] text-white">
                <tr>
                  <th className="px-5 py-4 font-bold">Servicio</th>
                  <th className="px-5 py-4 font-bold hidden md:table-cell">Qué incluye</th>
                  <th className="px-5 py-4 font-bold whitespace-nowrap">Precio</th>
                  <th className="px-5 py-4 font-bold whitespace-nowrap">Plazo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SERVICES.map((s) => (
                  <tr key={s.name} className="align-top">
                    <td className="px-5 py-4">
                      <Link to={s.to} className="font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">{s.name}</Link>
                      <p className="md:hidden mt-1 text-sm text-slate-500">{s.desc}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{s.desc}</td>
                    <td className="px-5 py-4 font-semibold text-[#182A2C] whitespace-nowrap">{s.price}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-[15px] text-slate-700 leading-relaxed">
            <div className="rounded-2xl bg-[#f4f7f9] p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#182A2C] mb-2"><CreditCard size={18} /> Cómo se paga</h3>
              <p>{page.payment} El detalle de cada plan está en <Link to="/planes" className={linkCls}>planes</Link>.</p>
            </div>
            <div className="rounded-2xl bg-[#f4f7f9] p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#182A2C] mb-2"><ShoppingBag size={18} /> Cobrar en tu tienda</h3>
              <p>{page.storeNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por rubro */}
      <section className="bg-[#f4f7f9] py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <SectionTitle kicker="Por rubro">Qué hicimos y qué necesita cada negocio</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {page.rubros.map(({ title, text, to, link }) => (
              <div key={title} className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col">
                <h3 className="text-lg font-bold text-[#182A2C]">{title}</h3>
                <p className="mt-2 text-[15px] text-slate-600 leading-relaxed flex-1">{text}</p>
                <Link to={to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
                  {link} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso + formulario */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <SectionTitle kicker="A distancia">Cómo trabajamos sin estar en {page.name}</SectionTitle>
            <ol className="space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="w-10 h-10 rounded-full bg-[#182A2C] text-[#d9fb06] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#182A2C]">{s.title}</h3>
                    <p className="mt-1 text-[15px] text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#182A2C] p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Auditoría gratuita de tu web</h2>
              <p className="mt-3 mb-7 text-white/70">Te enviamos por WhatsApp 3 mejoras concretas para tu página. Si todavía no tienes web, te decimos por dónde empezar.</p>
              <AuditForm tone="tu" defaultCountry={code} source={`pais_${code.toLowerCase()}`} dark />
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={page.faq} title={`Preguntas frecuentes desde ${page.name}`} />

      {posts.length > 0 && (
        <section className="bg-[#f4f7f9] py-14">
          <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-[#182A2C] tracking-tight mb-6">Para leer antes de empezar</h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="text-lg font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4 hover:decoration-[#182A2C]">{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Cierre */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 lg:px-8 max-w-4xl text-center">
          <h2 className="text-[30px] md:text-[44px] font-black text-[#182A2C] leading-[1.08] tracking-tight">¿Hacemos la web de tu negocio?</h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Cuéntanos qué haces y te enviamos la propuesta con precio cerrado en el día hábil.
          </p>
          <div className="mt-8 flex justify-center"><WhatsAppCta dark /></div>
          <p className="mt-10 text-sm text-slate-500">
            Websy en otros países:{' '}
            {others.map((c, i) => (
              <React.Fragment key={c.code}>
                {i > 0 && ' · '}
                <Link to={c.path} className={linkCls}>{c.name}</Link>
              </React.Fragment>
            ))}
            {' · '}<Link to="/" onClick={() => saveCountry('AR')} className={linkCls}>Argentina</Link>
          </p>
        </div>
      </section>
    </div>
  );
};
