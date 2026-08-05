import React from 'react';
import { portfolio } from '../mockData';
import { SEOHead } from '../components/SEOHead';

// Component for organized project detail labels
const ProjectMeta = ({ label, value, isLime = false }) => (
    <div className={`flex items-baseline gap-2 ${isLime ? 'text-[#182A2C]' : 'text-gray-900'} group cursor-default transition-all duration-300`}>
        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 shrink-0">{label}:</span>
        <span className={`text-base md:text-lg font-bold ${isLime ? 'bg-[#d9fb06] px-1' : 'text-gray-900'} tracking-tight`}>{value}</span>
    </div>
);

export const SuccessStoriesPage = () => {
  return (
    <div className="pt-[32px] md:pt-[100px] bg-white min-h-screen font-outfit">
      <SEOHead 
        title="Casos de Éxito | Websy" 
        description="Vitrina de proyectos digitales reales. Estrategia, diseño y tecnología aplicada a resultados concretos."
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
        </div>

        {/* V-Divider Peak */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-white clip-v-peak" />
      </section>

      {/* Intro Section - Clean & Organized Headers */}
      <section className="py-24 px-6 border-b border-gray-50/50">
        <div className="container max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#182A2C] mb-10 tracking-tighter leading-[0.9]">
                ¿Cómo es trabajar con <br/> <span className="bg-[#d9fb06] px-2 inline-block mt-2">Websy Soluciones Digitales®?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700 text-lg leading-relaxed font-medium">
                <p>
                    Trabajar con nosotros significa contar con un equipo que combina <span className="text-[#182A2C] font-black underline decoration-[#d9fb06] decoration-4 underline-offset-4">estrategia, creatividad y tecnología</span> para llevar tu negocio al próximo nivel.
                </p>
                <p>
                    Creemos que los resultados hablan por solos, por eso compartimos nuestros proyectos reales, donde cada cliente confió en nosotros para escalar su marca.
                </p>
            </div>
        </div>
      </section>

      {/* Main Stories List */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
            {portfolio.map((story, idx) => (
                <div key={story.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center py-24 ${idx !== portfolio.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    {/* Visual Container */}
                    <div className="w-full lg:w-1/2 group">
                        <div className="relative overflow-hidden shadow-2xl skew-y-0 translate-y-0 group-hover:-translate-y-2 group-hover:shadow-[#d9fb06]/20 transition-all duration-700">
                            <img 
                                src={story.image} 
                                alt={story.client} 
                                className="w-full h-auto aspect-[16/10] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'; }}
                            />
                            {/* Decorative Frame */}
                            <div className="absolute inset-0 border border-black/5 pointer-events-none" />
                        </div>
                    </div>

                    {/* Content Container - ORGANIZED */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        {/* Meta Grid */}
                        <div className="space-y-6 mb-10">
                            <ProjectMeta label="Cliente" value={story.client} isLime={true} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <ProjectMeta label="Año" value={story.year} />
                                <ProjectMeta label="Categoría" value={story.category} />
                            </div>
                            <ProjectMeta label="Servicio principal" value={story.technologies.join(', ')} />
                        </div>

                        {/* Description Block - Reference Image Style */}
                        <div className="relative pl-10 py-2">
                            {/* Thin vertical line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#d9fb06]" />
                            {/* Active dot marker */}
                            <div className="absolute -left-[5px] top-4 w-[12px] h-[12px] rounded-full bg-[#d9fb06] border-2 border-[#182A2C] shadow-sm" />
                            
                            <p className="text-xl text-gray-700 leading-[1.6] font-semibold tracking-tight">
                                {story.description}
                            </p>
                        </div>

                        {story.url && (
                            <button 
                                onClick={() => window.open(story.url, '_blank')}
                                className="mt-12 bg-[#182A2C] text-white px-10 py-5 font-black text-xs uppercase tracking-[0.25em] hover:bg-[#d9fb06] hover:text-[#182A2C] transition-all shadow-sm hover:shadow-xl self-start border-none"
                            >
                                Ver Proyecto Completo
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </section>

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
