import React from 'react';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Experiencia real en crecimiento empresarial",
      description: "Más de 11 años impulsando PyMEs, empresas y franquicias en el NOA con estrategias de marketing, branding, publicidad y desarrollo digital."
    },
    {
      title: "Soluciones integrales, no servicios sueltos",
      description: "Trabajamos bajo tres pilares: Branding, Outsourcing 360° y Ecommerce + ERP, integrando además desarrollo web, gestión profesional de redes sociales y publicidad digital para cubrir todas las necesidades de tu empresa en un solo lugar."
    },
    {
      title: "Equipo multidisciplinario a tu disposición",
      description: "Diseñadores, marketers, copywriters, programadores y especialistas en Ads trabajando como tu propio Departamento de Tecnología y Marketing."
    },
    {
      title: "Desarrollos y tecnología propios",
      description: "Desde sitios web hasta integraciones con ERP y sistemas personalizados a través de Websy Factory, nuestra unidad avanzada de tecnología."
    },
    {
      title: "Resultados comprobados",
      description: "+378 empresas impulsadas, +3800 campañas integrales y múltiples casos de éxito reales en branding, marketing y comercio electrónico."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#1a1a1a]">
      {/* Top Peak Divider */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-white clip-path-v-peak z-20"></div>

      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Left Side: Blue Backdrop with Masked Text */}
        <div className="lg:w-[40%] bg-[#35affb] relative flex items-center justify-center py-20 lg:py-0 overflow-hidden">
           {/* Geometric shapes in background for texture */}
           <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 border-[40px] border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 border-[60px] border-white rotate-45 translate-x-1/3 translate-y-1/3" />
           </div>

           <h2 
             className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none pointer-events-none"
             style={{
               color: 'transparent',
               WebkitTextStroke: '1px rgba(255,255,255,0.2)',
               backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               WebkitBackgroundClip: 'text',
               backgroundClip: 'text',
             }}
           >
             BENEFICIOS
           </h2>
        </div>

        {/* Right Side: Dark Content with List */}
        <div className="lg:w-[60%] bg-[#1a1a1a] flex items-center py-12 lg:py-20 px-6 sm:px-12 lg:px-20 relative">
          <div className="max-w-xl">
            <span className="text-[#35affb] font-black tracking-[0.2em] uppercase text-xs mb-4 block">
              POR QUÉ NOSOTROS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-12 tracking-tighter">
              Principales Razones Para Elegir Websy Soluciones Digitales®
            </h2>

            <div className="space-y-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#35affb]/10 border border-[#35affb]/30 flex items-center justify-center group-hover:bg-[#35affb] group-hover:scale-110 transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-lg mb-1.5 tracking-tight group-hover:text-[#35affb] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Dot Circle like the reference */}
          <div className="absolute top-20 right-20 w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center opacity-40">
             <div className="w-1.5 h-1.5 rounded-full bg-[#35affb] animate-pulse" />
          </div>
        </div>
      </div>

      <style>{`
        .clip-path-v-peak {
          clip-path: polygon(0 0, 100% 0, 100% 30%, 50% 100%, 0 30%);
        }
        @media (min-width: 1024px) {
          .clip-path-v-peak {
            clip-path: polygon(0 0, 100% 0, 100% 20%, 50% 100%, 0 20%);
          }
        }
      `}</style>
    </section>
  );
};
