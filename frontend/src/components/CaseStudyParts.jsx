import React from 'react';
import { Link } from 'react-router-dom';
import { bookingUrl, whatsappUrl } from '../siteConfig';
import { trackBookingClick } from '../lib/tracking';
import { portfolio, caseResults } from '../mockData';

export const portfolioItem = (id) => portfolio.find((p) => p.id === id);
export const resultForPortfolio = (id) => caseResults.find((r) => r.portfolioId === id);

// Botón principal de conversión de las páginas de caso y de rubro: pedir una videollamada
export const BookCallButton = ({ location, context, className = '', children = 'Agendar una llamada de 20 min' }) => (
  <a
    href={bookingUrl(context)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackBookingClick(location)}
    data-wa-location={location}
    className={`inline-flex items-center justify-center gap-2 bg-[#d9fb06] text-[#182A2C] px-7 py-4 font-black text-sm uppercase tracking-[0.12em] hover:bg-[#182A2C] hover:text-[#d9fb06] transition-colors ${className}`}
  >
    {children}
  </a>
);

export const ProjectCta = ({ location, context, title = '¿Tenés un proyecto parecido?' }) => (
  <section className="bg-[#182A2C] text-white py-16 md:py-20">
    <div className="container mx-auto px-5 lg:px-8 max-w-4xl text-center">
      <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] mb-5">{title}</h2>
      <p className="text-lg text-white/70 max-w-2xl mx-auto mb-9">
        Contanos qué necesitás en una llamada de 20 minutos. Te decimos cómo lo resolveríamos, cuánto tarda y cuánto cuesta, sin compromiso.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <BookCallButton location={location} context={context} />
        <a
          href={whatsappUrl(`Hola! Vi ${context} en su web y quiero cotizar algo parecido.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-location={`${location}_whatsapp`}
          className="inline-flex items-center justify-center border border-white/30 px-7 py-4 font-bold text-sm uppercase tracking-[0.12em] hover:border-[#d9fb06] hover:text-[#d9fb06] transition-colors"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export const CaseCard = ({ study }) => {
  const item = portfolioItem(study.portfolioId);
  const result = resultForPortfolio(study.portfolioId);
  return (
    <Link to={`/casos-de-exito/${study.slug}`} className="group flex flex-col bg-white border border-slate-200 hover:border-[#182A2C] transition-colors">
      {item?.image ? (
        <img src={item.image} alt={`${item.title}: ${study.type}`} loading="lazy" className="w-full aspect-[16/10] object-cover object-top" />
      ) : (
        <div className="aspect-[16/10] bg-[#182A2C] flex items-end p-6">
          <span className="text-3xl font-black text-[#d9fb06] tracking-tight">{result ? result.metric : study.type}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">{study.type} · {study.location}</span>
        <h3 className="text-xl font-extrabold text-[#182A2C] leading-snug mb-3">{item?.client || item?.title}</h3>
        {result && <p className="text-sm font-bold text-[#182A2C] mb-2">{result.metric} {result.metricLabel}</p>}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{study.summary}</p>
        <span className="mt-auto pt-5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">Ver el caso completo</span>
      </div>
    </Link>
  );
};

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">
    {items.map(({ to, label }, i) => (
      <React.Fragment key={label}>
        {i > 0 && <span className="opacity-40">/</span>}
        {to ? <Link to={to} className="hover:text-[#182A2C]">{label}</Link> : <span className="text-[#182A2C]">{label}</span>}
      </React.Fragment>
    ))}
  </nav>
);
