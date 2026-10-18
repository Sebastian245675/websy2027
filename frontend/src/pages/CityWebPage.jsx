import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, MapPin, MessageCircle, Search } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection } from '../components/FAQSection';
import { CaseCard } from '../components/CaseStudyParts';
import { caseStudies } from '../caseStudies';
import { getPostBySlug } from '../blogData';
import { cityPageBySlug, cityPages } from '../cityPages';
import { saveCountry } from '../lib/geo';
import { formatPrice, getMarket, localAmount, pricingNote } from '../pricing';
import { whatsappUrl } from '../siteConfig';

// Página de una ciudad (/colombia/desarrollo-web-bogota, /colombia/desarrollo-web-cali). El contenido está en src/cityPages.js.

const SITE_URL = 'https://www.websysrl.com';

const pageJsonLd = (city, url) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: city.seoTitle,
      description: city.seoDescription,
      inLanguage: city.country.hreflang,
      isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: 'Websy' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: city.country.name, item: `${SITE_URL}${city.country.path}` },
        { '@type': 'ListItem', position: 3, name: city.breadcrumb, item: url },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: city.serviceName,
      serviceType: 'Diseño y desarrollo web para empresas',
      url,
      provider: { '@type': 'Organization', name: 'Websy', url: `${SITE_URL}/` },
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'Country', name: city.country.name } },
      availableLanguage: ['es'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Páginas web para empresas de ${city.name}`,
        itemListElement: city.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.name, description: service.detail },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: getMarket(city.country.code).currency,
            minPrice: String(localAmount(service.price.min, city.country.code)),
            ...(service.price.max ? { maxPrice: String(localAmount(service.price.max, city.country.code)) } : {}),
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: city.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
});

const linkCls = 'font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4';
const HERO_ICONS = [MapPin, Clock, Search];

export const CityWebPage = ({ slug }) => {
  const city = cityPageBySlug(slug);
  const { code } = city.country;
  const url = `${SITE_URL}${city.path}`;
  const cases = city.caseSlugs.map((s) => caseStudies.find((study) => study.slug === s)).filter(Boolean);
  const others = cityPages.filter((c) => c.slug !== slug && c.country.code === code);
  const posts = (city.posts || []).map(getPostBySlug).filter(Boolean);

  useEffect(() => saveCountry(code), [code]);

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={city.seoTitle}
        description={city.seoDescription}
        url={url}
        locale={city.country.locale}
        alternates={[
          { hreflang: 'x-default', href: url },
          { hreflang: city.country.hreflang, href: url },
        ]}
        jsonLd={pageJsonLd(city, url)}
      />

      <section className="bg-[#182A2C] text-white py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-white/60 mb-7">
            <Link to="/" className="hover:text-white">Inicio</Link><span>/</span>
            <Link to={city.country.path} className="hover:text-white">{city.country.name}</Link><span>/</span>
            <span className="text-white">{city.breadcrumb}</span>
          </nav>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#d9fb06]">Servicio remoto · precios en {getMarket(code).currency}</p>
              <h1 className="mt-4 text-[36px] sm:text-5xl lg:text-[3.6rem] font-black leading-[1.04] tracking-tight">
                {city.h1[0]} <span className="text-[#d9fb06]">{city.h1[1]}</span> {city.h1[2]}
              </h1>
              <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-white/80">{city.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl(city.waHero)} target="_blank" rel="noopener noreferrer" data-wa-location={`${city.slug}_hero`} className="inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-6 py-3.5 font-bold text-[#182A2C] hover:bg-white transition-colors">
                  <MessageCircle size={18} /> Cotizar mi web
                </a>
                <a href="#precios-ciudad" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10">Ver precios en {getMarket(code).currency}</a>
              </div>
            </div>
            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[.06] p-6 space-y-4">
              {city.heroNotes.map((note, i) => {
                const Icon = HERO_ICONS[i % HERO_ICONS.length];
                return <p key={note} className="flex gap-3 text-white/85"><Icon className="shrink-0 text-[#d9fb06]" size={20} /> {note}</p>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">{city.introTitle}</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-slate-700">
            {city.intro.map(([lead, rest]) => (
              <p key={lead}><strong className="text-[#182A2C]">{lead}</strong> {rest}</p>
            ))}
            <p>Puedes revisar también nuestro <Link to="/servicios/desarrollo-web" className={linkCls}>servicio de desarrollo web</Link> y la guía completa para <Link to={city.country.path} className={linkCls}>empresas de {city.country.name}</Link>.</p>
          </div>
          <div className="mt-9 grid sm:grid-cols-2 gap-4">
            {city.checklist.map((item) => (
              <p key={item} className="flex items-start gap-3 rounded-xl bg-[#f4f7f9] p-4 text-[15px] font-semibold text-[#182A2C]"><Check size={18} className="mt-0.5 shrink-0 text-[#718900]" />{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f9] py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Evidencia, no promesas</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">{city.casesTitle}</h2>
          <p className="mt-4 mb-9 max-w-3xl text-slate-600 leading-relaxed">Estos proyectos tienen una ficha individual con el problema, la solución y las decisiones técnicas. No son plantillas ni ejemplos inventados.</p>
          <div className="grid md:grid-cols-3 gap-6">{cases.map((study) => <CaseCard key={study.slug} study={study} />)}</div>
        </div>
      </section>

      {city.sectors && (
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Por rubro</p>
            <h2 className="mt-3 mb-9 text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">{city.sectorsTitle}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {city.sectors.map(({ title, text, to }) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-[#182A2C]">{title}</h3>
                  <p className="mt-2 text-[15px] text-slate-600 leading-relaxed flex-1">{text}</p>
                  <Link to={to} className={`mt-4 inline-flex items-center gap-1.5 text-sm ${linkCls}`}>Ver ejemplos <ArrowRight size={14} /></Link>
                </div>
              ))}
            </div>
            {city.zones && (
              <p className="mt-8 max-w-4xl text-[15px] leading-relaxed text-slate-600">
                <MapPin size={16} className="inline -mt-0.5 mr-1.5 text-[#718900]" />
                Como trabajamos a distancia, atendemos igual a empresas de cualquier zona de {city.name}: {city.zones}.
              </p>
            )}
          </div>
        </section>
      )}

      <section id="precios-ciudad" className="py-14 md:py-20" style={{ scrollMarginTop: '120px' }}>
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Valores orientativos</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">Precios de páginas web en {city.name}</h2>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-[#182A2C] text-white"><tr><th className="p-4">Proyecto</th><th className="p-4">Precio en {getMarket(code).currency}</th><th className="p-4">Plazo habitual</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {city.services.map((service) => (
                  <tr key={service.name} className="align-top"><td className="p-4"><strong className="text-[#182A2C]">{service.name}</strong><span className="block mt-1 text-sm text-slate-500">{service.detail}</span></td><td className="p-4 font-bold text-[#182A2C] whitespace-nowrap">{formatPrice(service.price, code)}</td><td className="p-4 text-slate-600 whitespace-nowrap">{service.time}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">{pricingNote(code)}</p>
          <p className="mt-5 text-[15px] text-slate-700">Consulta todos los alcances en <Link to="/planes" onClick={() => saveCountry(code)} className={linkCls}>planes y precios en {getMarket(code).currency}</Link>.</p>
        </div>
      </section>

      {city.automation && (
        <section className="bg-[#f4f7f9] py-14 md:py-20">
          <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Automatización</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">{city.automation.title}</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-slate-700">{city.automation.text}</p>
            <Link to={city.automation.to} className={`mt-6 inline-flex items-center gap-2 ${linkCls}`}>{city.automation.link} <ArrowRight size={16} /></Link>
          </div>
        </section>
      )}

      {city.whyUs && (
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Por qué Websy</p>
            <h2 className="mt-3 mb-9 text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">Qué nos diferencia de otras agencias de diseño web en {city.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {city.whyUs.map(({ title, text }) => (
                <div key={title} className="rounded-2xl bg-[#f4f7f9] p-6">
                  <h3 className="text-lg font-bold text-[#182A2C]">{title}</h3>
                  <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {city.mistakes && (
        <section className="bg-[#f4f7f9] py-14 md:py-20">
          <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight">{city.mistakes.length} errores al contratar diseño web en {city.name}</h2>
            <ol className="mt-8 space-y-6">
              {city.mistakes.map(({ title, text }, i) => (
                <li key={title} className="flex gap-5">
                  <span className="w-10 h-10 rounded-full bg-[#182A2C] text-[#d9fb06] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#182A2C]">{title}</h3>
                    <p className="mt-1 text-[15px] text-slate-600 leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-[#182A2C] py-14 text-white">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl grid md:grid-cols-3 gap-8">
          {city.steps.map(([title, text]) => <div key={title}><h3 className="text-xl font-black text-[#d9fb06]">{title}</h3><p className="mt-3 leading-relaxed text-white/75">{text}</p></div>)}
        </div>
      </section>

      <FAQSection items={city.faq} title={`Preguntas frecuentes sobre desarrollo web en ${city.name}`} />

      {posts.length > 0 && (
        <section className="bg-[#f4f7f9] py-14">
          <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-[#182A2C] tracking-tight mb-6">Para leer antes de empezar</h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.slug}><Link to={`/blog/${p.slug}`} className={`text-lg ${linkCls}`}>{p.title}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-5 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-[#182A2C] tracking-tight">Cuéntanos qué necesita tu empresa</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">Te respondemos con una recomendación, el alcance y un valor estimado en {getMarket(code).currency}. Si buscas conectar la web con WhatsApp, CRM o tus sistemas, revisa también la <Link to={`${city.country.path}/automatizacion-procesos`} className={linkCls}>automatización de procesos en {city.country.name}</Link>.</p>
          <a href={whatsappUrl(city.waClose)} target="_blank" rel="noopener noreferrer" data-wa-location={`${city.slug}_cierre`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#182A2C] px-7 py-4 font-bold text-white hover:bg-black"><MessageCircle size={18} /> Pedir propuesta <ArrowRight size={16} /></a>
          {others.length > 0 && (
            <p className="mt-10 text-sm text-slate-500">
              También en {city.country.name}:{' '}
              {others.map((c, i) => (
                <React.Fragment key={c.slug}>
                  {i > 0 && ' · '}
                  <Link to={c.path} className={linkCls}>{c.breadcrumb}</Link>
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
