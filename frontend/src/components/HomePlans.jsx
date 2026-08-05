import React from 'react';
import PlansSection from './PlansSection';

export const HomePlans = () => {
  return (
    <section id="planes-home" className="bg-white overflow-hidden">
      {/* Header section similar to PlansPage but adapted for Home */}
      <div className="bg-[#f8f9fa] border-y border-gray-100 py-16 md:py-20">
        <div className="container px-4 text-center">
          {/* Section Subtitle */}
          <span className="text-[#182A2C] font-black tracking-[0.2em] uppercase text-xs mb-4 block">
            Planes
          </span>
          
          {/* Promo Badge */}
          <div className="inline-block bg-[#182A2C] text-[#d9fb06] px-6 py-2 text-sm md:text-base font-black tracking-[0.2em] mb-8">
            PLANES ON LINE 10% OFF
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#182A2C] leading-none tracking-tighter uppercase mb-6">
            Outsourcing 360° <br className="hidden md:block" />
            <span className="text-[#d9fb06] bg-[#182A2C] px-4 py-1 inline-block mt-2" style={{ textShadow: '1px 1px 0px #182A2C' }}>
                 (Departamento de Tecnología)
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-500 font-medium text-lg leading-relaxed mt-8">
            Elegí el plan que mejor se adapte al ritmo de tu negocio y empezá a escalar tu presencia digital hoy mismo.
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="py-12 md:py-16">
        <PlansSection />
      </div>
    </section>
  );
};
