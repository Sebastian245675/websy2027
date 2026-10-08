import React from 'react';
import { RUBROS } from '../siteConfig';

// Franja "Portafolio por rubro": rubros reales trabajados, para mostrar amplitud debajo de los casos.
export const RubrosStrip = () => (
  <section aria-labelledby="rubros-title" className="bg-[#182A2C] py-10 md:py-12">
    <div className="container mx-auto px-5 lg:px-8 max-w-7xl flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
      <h2 id="rubros-title" className="shrink-0 text-xs font-black uppercase tracking-[.22em] text-[#d9fb06]">
        Rubros en los que ya trabajamos
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {RUBROS.map((rubro) => (
          <li key={rubro} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
            {rubro}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
