import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { caseResults } from '../mockData';

export const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-white">
      <div className="container px-5 lg:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#52645d] mb-5">
              <span className="h-2 w-2 rounded-full bg-[#d9fb06] ring-4 ring-[#d9fb06]/25" />
              Casos de éxito
            </div>
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#182A2C] leading-[1.1] tracking-tight">
              Resultados reales de clientes que confiaron en Websy
            </h2>
          </div>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed max-w-md">
            Proyectos en Argentina, México y Estados Unidos, medidos por lo que más importa: ventas y retorno.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {caseResults.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_50px_-28px_rgba(24,42,44,0.35)]"
            >
              {/* Resultado arriba */}
              <div className="pb-6 border-b border-slate-100">
                <div className="text-[32px] lg:text-[34px] font-extrabold text-[#182A2C] tracking-tight leading-none">
                  {item.metric}
                </div>
                <div className="mt-2.5 text-sm text-slate-500">
                  {item.metricLabel}{item.period ? ` ${item.period}` : ''}
                </div>
              </div>

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">
                    {item.rubro}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold text-[#182A2C]">{item.client}</h3>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar sitio web de ${item.client}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#182A2C] transition-colors group-hover:border-[#d9fb06] group-hover:bg-[#d9fb06]"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>

              <p className="mt-4 text-[15px] text-[#334155]">
                <span className="font-semibold text-[#182A2C]">Qué hicimos: </span>{item.what}
              </p>

              <ul className="mt-5 space-y-3 flex-1">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-[15px] text-[#334155]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d9fb06]/40 text-[#182A2C]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#182A2C] hover:text-[#556902] transition-colors"
                >
                  Ver sitio web real
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-[#182A2C] px-7 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-white">
              ¿Querés resultados como estos para tu empresa?
            </h4>
            <p className="mt-2 text-slate-300 text-sm md:text-base">
              Pedí tu auditoría gratuita: revisamos tu web y te mandamos por WhatsApp 3 mejoras concretas.
            </p>
          </div>
          <button
            onClick={() => navigate('/contacto?tipo=auditoria')}
            className="group shrink-0 inline-flex items-center justify-center gap-3 rounded-full bg-[#d9fb06] px-7 py-4 text-[15px] font-bold text-[#182A2C] transition-colors hover:bg-white"
          >
            Pedir auditoría gratuita
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
