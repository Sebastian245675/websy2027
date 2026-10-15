import React from 'react';
import { Link } from 'react-router-dom';
import { portfolio, caseResults } from '../mockData';
import { SEOHead } from '../components/SEOHead';
import { caseForPortfolio, rubroHubs } from '../caseStudies';
import { ProjectCta } from '../components/CaseStudyParts';

// Component for organized project detail labels
const ProjectMeta = ({ label, value, isLime = false }) => (
    <div className={`flex items-baseline gap-2 ${isLime ? 'text-[#182A2C]' : 'text-gray-900'} group cursor-default transition-all duration-300`}>
        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 shrink-0">{label}:</span>
        <span className={`text-base md:text-lg font-bold ${isLime ? 'bg-[#d9fb06] px-1' : 'text-gray-900'} tracking-tight`}>{value}</span>
    </div>
);

const resultFor = (story) => caseResults.find((c) => c.portfolioId === story.id);

// Casos con resultado medible primero, el resto en el orden del portfolio
const stories = [
  ...portfolio.filter((p) => resultFor(p)),
  ...portfolio.filter((p) => !resultFor(p)),
];

export const SuccessStoriesPage = () => {
  return (
    <div className="pt-[32px] md:pt-[100px] bg-white min-h-screen font-outfit">
      <SEOHead
        title="Casos de Éxito en Desarrollo Web y E-commerce | Websy"
        description="Proyectos reales de páginas web, tiendas online y automatizaciones en Argentina y Latam, con resultados medibles: más consultas, más ventas y ROI en semanas."
        url="https://www.websysrl.com/casos-de-exito"
      />

      {/* Header - High Impact */}
      <section className="relative py-12 md:py-24 bg-[#f9f9fa] overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 text-center">
            <nav className="flex justify-center items-center gap-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <a href="/" className="hover:text-[#182A2C] transition-all">HOME</a>
                <span className="opacity-20">/</span>
                <span className="text-gray-900 font-black">CASOS DE ÉXITO</span>
            </nav>
            <h1 className="text-4xl md:text-8xl font-black text-[#182A2C] tracking-tighter mb-4">
                Casos de <span className="bg-[#d9fb06] px-2">Éxito</span>
            </h1>
            <div className="w-16 h-1 bg-[#182A2C] mx-auto mt-4 transition-all duration-500 hover:w-32" />
            <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {portfolio.length} proyectos reales en Argentina, Colombia, México y Estados Unidos: qué problema tenía cada cliente, cómo lo resolvimos y con qué tecnología.
            </p>
            <nav aria-label="Ejemplos por rubro" className="mt-8 flex flex-wrap justify-center gap-2">
                {rubroHubs.map((h) => (
                    <Link key={h.path} to={`/casos-de-exito/${h.path}`} className="border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-[#182A2C] hover:border-[#182A2C] hover:bg-[#d9fb06] transition-colors">
                        {h.name}
                    </Link>
                ))}
            </nav>
        </div>

        {/* V-Divider Peak */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-white clip-v-peak" />
      </section>

      {/* Intro Section - Clean & Organized Headers */}
      <section className="py-24 px-6 border-b border-gray-50/50">
        <div className="container max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#182A2C] mb-10 tracking-tighter leading-[0.9]">
                ¿Cómo es trabajar con <br/> <span className="bg-[#d9fb06] px-2 py-1 inline-block mt-3 leading-none">Websy?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700 text-lg leading-relaxed font-medium">
                <p>
                    Trabajar con nosotros significa contar con un equipo que combina <span className="text-[#182A2C] font-black underline decoration-[#d9fb06] decoration-4 underline-offset-4">estrategia, creatividad y tecnología</span> para llevar tu negocio al próximo nivel.
                </p>
                <p>
                    Creemos que los resultados hablan por sí solos, por eso compartimos nuestros proyectos reales, donde cada cliente confió en nosotros para escalar su marca.
                </p>
            </div>
        </div>
      </section>

      {/* Main Stories List */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
            {stories.map((story, idx) => {
                const result = resultFor(story);
                const study = caseForPortfolio(story.id);
                return (
                <div key={story.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center py-24 ${idx !== stories.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    {/* Visual Container */}
                    <div className="w-full lg:w-1/2 group">
                        {story.image ? (
                        <div className="relative overflow-hidden shadow-2xl skew-y-0 translate-y-0 group-hover:-translate-y-2 group-hover:shadow-[#d9fb06]/20 transition-all duration-700">
                            <img 
                                src={story.image} 
                                alt={`${story.title}: ${story.category}`} 
                                width="640"
                                height="400"
                                className="w-full h-auto aspect-[16/10] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Decorative Frame */}
                            <div className="absolute inset-0 border border-black/5 pointer-events-none" />
                        </div>
                        ) : (
                        <div className="aspect-[16/10] bg-[#182A2C] flex flex-col justify-end p-10 shadow-2xl">
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d9fb06] mb-3">{story.category}</span>
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{result ? result.metric : story.client}</span>
                        </div>
                        )}
                    </div>

                    {/* Content Container: resultado arriba, después rubro, qué se hizo y qué logró */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        {result && (
                            <div className="mb-8">
                                <div className="text-5xl md:text-6xl font-black text-[#182A2C] tracking-tighter leading-none">{result.metric}</div>
                                <div className="mt-3 text-base md:text-lg font-semibold text-gray-500">
                                    {result.metricLabel}{result.period ? ` ${result.period}` : ''}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 mb-8">
                            <ProjectMeta label="Cliente" value={story.client} isLime={true} />
                            <ProjectMeta label="Rubro" value={result ? result.rubro : story.category} />
                        </div>

                        <div className="relative pl-10 py-2">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#d9fb06]" />
                            <div className="absolute -left-[5px] top-4 w-[12px] h-[12px] rounded-full bg-[#d9fb06] border-2 border-[#182A2C] shadow-sm" />

                            <p className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-2">Qué hicimos</p>
                            <p className="text-xl text-gray-700 leading-[1.6] font-semibold tracking-tight">
                                {story.description}
                            </p>

                            {result && (
                                <>
                                    <p className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mt-6 mb-2">Qué logró el cliente</p>
                                    <ul className="space-y-1.5">
                                        {result.details.map((d) => (
                                            <li key={d} className="text-lg text-[#182A2C] font-bold">{d}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        {story.technologies.length > 0 && (
                            <p className="mt-6 text-xs text-gray-400">
                                {story.year ? `${story.year} · ` : ''}Tecnología: {story.technologies.join(', ')}
                            </p>
                        )}

                        {(study || story.url) && (
                            <div className="mt-12 flex flex-wrap gap-4">
                                {study && (
                                    <Link
                                        to={`/casos-de-exito/${study.slug}`}
                                        className="bg-[#182A2C] text-white px-10 py-5 font-black text-xs uppercase tracking-[0.25em] hover:bg-[#d9fb06] hover:text-[#182A2C] transition-all shadow-sm hover:shadow-xl"
                                    >
                                        Ver el caso completo
                                    </Link>
                                )}
                                {story.url && (
                                    <a
                                        href={story.url}
                                        target="_blank"
                                        rel="noopener"
                                        className="border border-[#182A2C] text-[#182A2C] px-10 py-5 font-black text-xs uppercase tracking-[0.25em] hover:bg-[#182A2C] hover:text-white transition-all"
                                    >
                                        Ver sitio publicado
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                );
            })}
        </div>
      </section>

      <ProjectCta location="casos_cierre" context="sus casos de éxito" />

      <style>{`
        .clip-v-peak {
          clip-path: polygon(0 0, 100% 0, 100% 0, 50% 100%, 0 0);
        }
        .container {
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        ::selection {
            background: #d9fb06;
            color: #182A2C;
        }
      `}</style>
    </div>
  );
};
