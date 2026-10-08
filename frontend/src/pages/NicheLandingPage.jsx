import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AuditForm } from '../components/AuditForm';
import { FAQSection } from '../components/FAQSection';
import { landingPages } from '../landingPages';
import { caseResults, portfolio } from '../mockData';
import { openWhatsApp } from '../lib/tracking';

const T = {
  vos: {
    included: 'Qué incluye',
    cases: 'Trabajos del rubro',
    results: 'Resultados de otros clientes',
    formTitle: 'Pedí tu auditoría gratuita',
    formText: 'Completá el formulario y te mandamos por WhatsApp 3 mejoras concretas para tu negocio.',
    whatsapp: 'Prefiero escribir por WhatsApp',
    see: 'Ver sitio',
  },
  tu: {
    included: 'Qué incluye',
    cases: 'Trabajos del giro',
    results: 'Resultados de otros clientes',
    formTitle: 'Solicita tu auditoría gratuita',
    formText: 'Completa el formulario y te enviamos por WhatsApp 3 mejoras concretas para tu negocio.',
    whatsapp: 'Prefiero escribir por WhatsApp',
    see: 'Ver sitio',
  },
};

export const NicheLandingPage = () => {
  const { slug } = useParams();
  const page = landingPages.find((p) => p.slug === slug);
  if (!page) return <Navigate to="/" replace />;

  const t = T[page.tone];
  const cases = page.caseIds.map((id) => portfolio.find((p) => p.id === id)).filter(Boolean);
  const scrollToForm = () => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-white">
      <SEOHead
        title={`${page.eyebrow} | Websy`}
        description={page.subtitle}
        url={`https://www.websysrl.com/lp/${page.slug}`}
        noindex
      />

      {/* Hero */}
      <section className="bg-[#182A2C] text-white pt-10 pb-20 md:pt-12 md:pb-28">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 mb-14">
            <img src="/websy-logo.png" alt="" width="40" height="40" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-black uppercase tracking-tighter">Websy</span>
          </div>
          <span className="inline-block bg-[#d9fb06] text-[#182A2C] text-[11px] font-black uppercase tracking-[.22em] px-3 py-1.5">{page.eyebrow}</span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight">{page.title}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-xl text-gray-200 leading-relaxed">{page.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToForm} className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-8 py-4 text-sm uppercase tracking-[0.14em] transition-colors">
              {page.cta} <ArrowDown size={18} />
            </button>
            <button onClick={() => openWhatsApp(page.whatsappText, `lp_${page.slug}_hero`)} className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold px-8 py-4 text-sm uppercase tracking-[0.14em] transition-colors">
              <MessageCircle size={18} /> WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#182A2C] tracking-tight mb-10">{t.included}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {page.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 p-5 text-base md:text-lg text-[#182A2C] font-medium">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d9fb06]"><Check size={14} strokeWidth={3} /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trabajos del rubro */}
      {cases.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f8fafc]">
          <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#182A2C] tracking-tight mb-10">{t.cases}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {cases.map((c) => (
                <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={c.image} alt={c.title} className="aspect-video w-full object-cover object-top" loading="lazy" />
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">{c.category}</p>
                      <p className="mt-1 text-lg font-bold text-[#182A2C]">{c.client}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 group-hover:bg-[#d9fb06] group-hover:border-[#d9fb06] transition-colors" aria-label={t.see}>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resultados */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#182A2C] tracking-tight mb-10">{t.results}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseResults.map((r) => (
              <div key={r.id} className="rounded-2xl border border-slate-200 p-6">
                <p className="text-3xl font-extrabold text-[#182A2C] tracking-tight leading-none">{r.metric}</p>
                <p className="mt-2 text-sm text-slate-500">{r.metricLabel}</p>
                <p className="mt-5 text-sm font-bold text-[#182A2C]">{r.client}</p>
                <p className="text-xs text-slate-400">{r.rubro}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="lp-form" className="py-16 md:py-24 bg-[#182A2C]">
        <div className="container mx-auto px-5 lg:px-8 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{t.formTitle}</h2>
          <p className="mt-3 mb-8 text-gray-300 text-base md:text-lg">{t.formText}</p>
          <AuditForm tone={page.tone} defaultCountry={page.country} defaultRubro={page.rubro} source={`landing_${page.slug}`} dark />
          <button onClick={() => openWhatsApp(page.whatsappText, `lp_${page.slug}_form`)} className="mt-6 w-full bg-transparent text-center text-sm font-bold text-[#d9fb06] hover:underline">
            {t.whatsapp}
          </button>
        </div>
      </section>

      <FAQSection items={page.faq} id="lp-faq" />
    </div>
  );
};
