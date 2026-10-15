import React from 'react';
import { Link } from 'react-router-dom';
import { RUBROS } from '../siteConfig';

// Página de ejemplos de cada rubro (rubroHubs en caseStudies.js). Se escribe acá en vez de importar
// caseStudies para no sumar ese módulo al inicio.
const HUB = '/casos-de-exito/';
const RUBRO_LINKS = {
  Inmobiliarias: `${HUB}paginas-web-para-inmobiliarias`,
  'Estudios jurídicos': `${HUB}paginas-web-para-abogados`,
  Logística: `${HUB}paginas-web-para-empresas`,
  Perfumería: `${HUB}ejemplos-de-tiendas-online`,
  'Seguridad industrial': `${HUB}paginas-web-para-empresas`,
  Veterinaria: `${HUB}ejemplos-de-tiendas-online`,
  'Salud mental': `${HUB}paginas-web-para-psicologos`,
  Farmacias: `${HUB}ejemplos-de-sistemas-de-gestion-a-medida`,
  Mueblería: `${HUB}ejemplos-de-tiendas-online`,
};

// Franja "Portafolio por rubro": rubros reales trabajados, cada uno enlazado a sus ejemplos.
export const RubrosStrip = () => (
  <section aria-labelledby="rubros-title" className="bg-[#182A2C] py-10 md:py-12">
    <div className="container mx-auto px-5 lg:px-8 max-w-7xl flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
      <h2 id="rubros-title" className="shrink-0 text-xs font-black uppercase tracking-[.22em] text-[#d9fb06]">
        Rubros en los que ya trabajamos
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {RUBROS.map((rubro) => (
          <li key={rubro}>
            {RUBRO_LINKS[rubro] ? (
              <Link to={RUBRO_LINKS[rubro]} className="block rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-[#d9fb06] hover:text-[#d9fb06] transition-colors">
                {rubro}
              </Link>
            ) : (
              <span className="block rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">{rubro}</span>
            )}
          </li>
        ))}
        <li>
          <Link to={`${HUB}paginas-web-para-hoteles`} className="block rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-[#d9fb06] hover:text-[#d9fb06] transition-colors">
            Hoteles y turismo
          </Link>
        </li>
      </ul>
    </div>
  </section>
);
