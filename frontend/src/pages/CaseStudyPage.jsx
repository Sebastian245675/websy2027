import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { FAQSection, faqSchema } from '../components/FAQSection';
import { BookCallButton, Breadcrumbs, CaseCard, ProjectCta, portfolioItem, resultForPortfolio } from '../components/CaseStudyParts';
import { caseBySlug, casesForHub, hubByPath, hubBySlug, VERIFIED_AT } from '../caseStudies';
import { servicesData } from '../servicesSeoData';
import { getPostBySlug } from '../blogData';

const SITE_URL = 'https://www.websysrl.com';
const ORG = { '@type': 'Organization', name: 'Websy', url: SITE_URL, logo: `${SITE_URL}/websy-logo.png` };

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-black text-[#182A2C] tracking-tight mb-5">{children}</h2>
);

const formatDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

const CaseView = ({ study }) => {
  const item = portfolioItem(study.portfolioId) || {};
  const result = resultForPortfolio(study.portfolioId);
  const hub = hubBySlug(study.hub);
  const service = servicesData[study.service];
  const related = casesForHub(study.hub).filter((c) => c.slug !== study.slug).slice(0, 3);
  const url = `${SITE_URL}/casos-de-exito/${study.slug}`;
  const image = item.image ? `${SITE_URL}${item.image}` : undefined;
  const context = `el caso ${item.client}`;

  const facts = [
    ['Cliente', item.client],
    ['Rubro', item.category],
    ['Ubicación', study.location],
    ['Año', item.year],
    ['Tipo de proyecto', study.type],
    ['Tecnología', item.technologies?.join(', ')],
    ['Servicio', service && <Link to={`/servicios/${study.service}`} className="underline decoration-[#d9fb06] decoration-2 underline-offset-4">{service.title}</Link>],
  ].filter(([, v]) => v);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.h1,
      description: study.seoDescription,
      url,
      ...(image && { image }),
      dateModified: VERIFIED_AT,
      inLanguage: 'es',
      author: ORG,
      publisher: ORG,
      about: {
        '@type': 'Organization',
        name: item.client,
        ...(item.url && !study.isDemo && { url: item.url }),
        ...(study.location && { location: study.location }),
      },
      ...(item.technologies?.length && { keywords: item.technologies.join(', ') }),
    },
    ...(study.faq?.length ? [faqSchema(study.faq)] : []),
  ];

  return (
    <article className="bg-white font-outfit">
      <SEOHead
        title={study.seoTitle}
        description={study.seoDescription}
        url={url}
        image={item.image || undefined}
        type="article"
        jsonLd={schema}
      />

      <header className="bg-[#f6f7f4] border-b border-slate-200 pt-28 md:pt-36 pb-14">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
          <Breadcrumbs items={[{ to: '/', label: 'Inicio' }, { to: '/casos-de-exito', label: 'Casos de éxito' }, { label: item.client }]} />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#52645d] mb-4">{study.type} · {study.location}{item.year ? ` · ${item.year}` : ''}</p>
          <h1 className="text-4xl md:text-6xl font-black text-[#182A2C] tracking-tighter leading-[1.05] mb-7">{study.h1}</h1>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl">{study.summary}</p>

          {result && (
            <div className="mt-9 inline-flex flex-col border-l-4 border-[#d9fb06] pl-5">
              <span className="text-4xl md:text-5xl font-black text-[#182A2C] tracking-tight">{result.metric}</span>
              <span className="text-base font-semibold text-slate-600 mt-1">{result.metricLabel}{result.period ? ` ${result.period}` : ''}</span>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <BookCallButton location="caso_encabezado" context={context} />
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener" className="inline-flex items-center justify-center border border-[#182A2C] px-7 py-4 font-bold text-sm uppercase tracking-[0.12em] text-[#182A2C] hover:bg-[#182A2C] hover:text-white transition-colors">
                {study.isDemo ? 'Ver la demo' : 'Ver el sitio publicado'}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-5 lg:px-8 max-w-5xl py-14 md:py-20">
        {item.image && (
          <img
            src={item.image}
            alt={`Captura de ${item.title}: ${study.type.toLowerCase()} en ${study.location}`}
            className="w-full aspect-[16/10] object-cover object-top shadow-2xl mb-16"
            loading="lazy"
          />
        )}

        <div className="grid lg:grid-cols-[1fr_300px] gap-14">
          <div className="space-y-14 min-w-0">
            <section>
              <SectionTitle>El desafío</SectionTitle>
              <p className="text-lg text-slate-700 leading-relaxed">{study.challenge}</p>
            </section>

            <section>
              <SectionTitle>Qué hicimos</SectionTitle>
              <ul className="space-y-3">
                {study.solution.map((s) => (
                  <li key={s} className="flex gap-3 text-lg text-slate-700 leading-relaxed">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#182A2C]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            {study.decisions?.length > 0 && (
              <section>
                <SectionTitle>Decisiones técnicas y por qué</SectionTitle>
                <div className="space-y-6">
                  {study.decisions.map((d) => (
                    <div key={d.title} className="border-l-2 border-[#d9fb06] pl-5">
                      <h3 className="text-lg font-extrabold text-[#182A2C] mb-1">{d.title}</h3>
                      <p className="text-base text-slate-700 leading-relaxed">{d.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {result && (
              <section>
                <SectionTitle>Resultados</SectionTitle>
                <ul className="space-y-2">
                  <li className="text-lg font-bold text-[#182A2C]">{result.metric} {result.metricLabel}{result.period ? ` ${result.period}` : ''}</li>
                  {result.details.map((d) => <li key={d} className="text-lg text-slate-700">{d}</li>)}
                </ul>
              </section>
            )}

            {study.verified && (
              <section className="bg-[#f6f7f4] p-6 md:p-8">
                <SectionTitle>Verificado en el sitio publicado</SectionTitle>
                <p className="text-sm text-slate-500 mb-5">Revisión del sitio en producción del {formatDate(VERIFIED_AT)}.</p>
                <dl className="space-y-4 text-base">
                  {study.verified.rendering && (
                    <div><dt className="font-bold text-[#182A2C]">Cómo se entrega el contenido</dt><dd className="text-slate-700">{study.verified.rendering}</dd></div>
                  )}
                  {study.verified.sitemapUrls > 0 && (
                    <div><dt className="font-bold text-[#182A2C]">URLs publicadas en el sitemap</dt><dd className="text-slate-700">{study.verified.sitemapUrls}</dd></div>
                  )}
                  {study.verified.schema?.length > 0 && (
                    <div>
                      <dt className="font-bold text-[#182A2C] mb-2">Datos estructurados (Schema.org)</dt>
                      <dd className="flex flex-wrap gap-2">
                        {study.verified.schema.map((t) => (
                          <code key={t} className="bg-white border border-slate-200 px-2 py-1 text-sm text-[#182A2C]">{t}</code>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="border border-slate-200 p-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Ficha del proyecto</h2>
              <dl className="space-y-4">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">{k}</dt>
                    <dd className="text-base font-semibold text-[#182A2C]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {hub && (
              <Link to={`/casos-de-exito/${hub.path}`} className="mt-4 block border border-slate-200 p-6 hover:border-[#182A2C] transition-colors">
                <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">Más del rubro</span>
                <span className="block text-base font-bold text-[#182A2C] mt-1">{hub.name}: todos los ejemplos</span>
              </Link>
            )}
          </aside>
        </div>
      </div>

      {study.faq?.length > 0 && <FAQSection items={study.faq} id="preguntas-del-caso" />}

      <ProjectCta location="caso_cierre" context={context} />

      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f6f7f4]">
          <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-black text-[#182A2C] tracking-tight mb-8">Otros proyectos de {hub.name.toLowerCase()}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((c) => <CaseCard key={c.slug} study={c} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

const HubView = ({ hub }) => {
  const studies = casesForHub(hub.slug);
  const posts = hub.posts.map(getPostBySlug).filter(Boolean);
  const url = `${SITE_URL}/casos-de-exito/${hub.path}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.h1,
    description: hub.seoDescription,
    url,
    inLanguage: 'es',
    publisher: ORG,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: studies.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/casos-de-exito/${s.slug}`,
        name: s.h1,
      })),
    },
  };

  return (
    <div className="bg-white font-outfit">
      <SEOHead title={hub.seoTitle} description={hub.seoDescription} url={url} jsonLd={schema} />

      <header className="bg-[#f6f7f4] border-b border-slate-200 pt-28 md:pt-36 pb-14">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
          <Breadcrumbs items={[{ to: '/', label: 'Inicio' }, { to: '/casos-de-exito', label: 'Casos de éxito' }, { label: hub.name }]} />
          <h1 className="text-4xl md:text-6xl font-black text-[#182A2C] tracking-tighter leading-[1.05] mb-7">{hub.h1}</h1>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mb-10">{hub.intro}</p>
          <BookCallButton location="rubro_encabezado" context={`los ejemplos de ${hub.name.toLowerCase()}`} />
        </div>
      </header>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
          <h2 className="text-3xl font-black text-[#182A2C] tracking-tight mb-8">{studies.length === 1 ? 'Proyecto real' : `${studies.length} proyectos reales`}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((s) => <CaseCard key={s.slug} study={s} />)}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#f6f7f4]">
        <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-black text-[#182A2C] tracking-tight mb-8">Qué tiene que tener la web</h2>
          <ol className="space-y-6">
            {hub.mustHave.map((m, i) => (
              <li key={m.title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#182A2C] text-[#d9fb06] font-black">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-[#182A2C]">{m.title}</h3>
                  <p className="text-base text-slate-700 leading-relaxed">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="py-14">
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

      <ProjectCta location="rubro_cierre" context={`los ejemplos de ${hub.name.toLowerCase()}`} title="¿Querés una web así para tu negocio?" />
    </div>
  );
};

export const CaseStudyPage = () => {
  const { slug } = useParams();
  const hub = hubByPath(slug);
  if (hub) return <HubView hub={hub} />;

  const study = caseBySlug(slug);
  if (study) return <CaseView study={study} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-[100px] px-5">
      <SEOHead title="Caso no encontrado | Websy" noindex breadcrumbs={false} />
      <div className="text-center">
        <h1 className="text-4xl font-black text-[#182A2C] mb-6">No encontramos este caso</h1>
        <Link to="/casos-de-exito" className="bg-[#182A2C] text-[#d9fb06] px-6 py-3 font-bold">Ver todos los casos</Link>
      </div>
    </div>
  );
};
