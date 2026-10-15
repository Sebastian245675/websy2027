import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CaseCard } from './CaseStudyParts';
import { caseStudies } from '../caseStudies';
import { countryPageByCode } from '../countryPages';
import { whatsappUrl } from '../siteConfig';

// Bloque de la home para visitantes de un país con versión propia: sus casos y el acceso a esa versión.
// Va debajo del hero (fuera de la primera pantalla), así aparecer después de detectar el país no mueve nada visible.
export const CountryHighlight = ({ country }) => {
  const page = countryPageByCode(country);
  if (!page) return null;
  const cases = caseStudies.filter((c) => c.location.includes(page.caseMatch)).slice(0, 3);

  return (
    <section className="bg-[#f4f7f9] py-14 md:py-20" aria-labelledby="pais-titulo">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#556902] mb-3">Para empresas de {page.name}</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 id="pais-titulo" className="text-[28px] md:text-[38px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight max-w-3xl">
            {cases.length > 1 ? `Lo que ya hicimos en ${page.name}` : `Websy en ${page.name}`}
          </h2>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to={page.path} className="group inline-flex items-center gap-2 rounded-full bg-[#182A2C] px-6 py-3.5 text-[15px] font-bold text-white hover:bg-black transition-colors">
              Precios y pagos desde {page.name}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappUrl(page.waText)}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-location={`home_pais_${page.code.toLowerCase()}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-[15px] font-bold text-[#182A2C] hover:bg-white transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => <CaseCard key={c.slug} study={c} />)}
        </div>
      </div>
    </section>
  );
};
