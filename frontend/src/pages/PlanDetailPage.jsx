import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, MessageCircle, Target } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection, faqSchema } from '../components/FAQSection';
import useVisitorCountry from '../hooks/useVisitorCountry';
import { planById, plans } from '../planData';
import { DEFAULT_MARKET, formatPrice, getMarket, localAmount, MARKET_PRICING, pricingNote } from '../pricing';
import { whatsappUrl } from '../siteConfig';
import { NotFoundPage } from './NotFoundPage';

const SITE_URL = 'https://www.websysrl.com';

export const PlanDetailPage = () => {
  const { planId } = useParams();
  const plan = planById(planId);
  const visitorCountry = useVisitorCountry();
  const [countryCode, setCountryCode] = useState(DEFAULT_MARKET);

  useEffect(() => {
    if (visitorCountry && MARKET_PRICING[visitorCountry]) setCountryCode(visitorCountry);
  }, [visitorCountry]);

  if (!plan) return <NotFoundPage />;

  const market = getMarket(countryCode);
  const price = formatPrice(plan.price, countryCode, { includeUsd: true });
  const contactPath = `/contacto?plan=${encodeURIComponent(`${plan.name} (${price})`)}&budget=${plan.id}&type=web&country=${countryCode}`;
  const message = `Hola Websy, quiero consultar por el ${plan.name} (${price}).`;
  const faq = [
    { q: `¿Cuánto cuesta el ${plan.name}?`, a: `${price}. Es un valor orientativo: después de conocer el alcance te enviamos un presupuesto cerrado por escrito.` },
    { q: '¿Cómo se paga?', a: `En tres partes: 30% al comenzar, 30% a mitad del proyecto y 40% en la entrega. En ${market.country} puedes pagar con ${market.payment}.` },
    { q: '¿Cuánto tarda?', a: plan.timeline },
    { q: '¿El precio incluye mantenimiento mensual?', a: 'La publicación y la entrega funcional están incluidas. El soporte continuo, nuevas funciones y el plan SEO mensual se contratan por separado según lo que necesites.' },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', name: plan.name, description: plan.description, url: `${SITE_URL}/planes/${plan.id}`,
        provider: { '@type': 'Organization', name: 'Websy', url: `${SITE_URL}/` },
        offers: {
          '@type': 'AggregateOffer', priceCurrency: market.currency,
          lowPrice: String(localAmount(plan.price.min, countryCode)),
          ...(plan.price.max ? { highPrice: String(localAmount(plan.price.max, countryCode)) } : {}),
        },
      },
      faqSchema(faq),
    ],
  };
  const ExampleLink = plan.example?.url?.startsWith('/') ? Link : 'a';

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]">
      <SEOHead title={plan.seoTitle} description={plan.seoDescription} url={`${SITE_URL}/planes/${plan.id}`} jsonLd={schema} />

      <section className="bg-[#182A2C] py-12 text-white md:py-20">
        <div className="container mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="mb-7 flex items-center gap-1.5 text-sm text-white/60" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Inicio</Link><ChevronRight size={14} />
            <Link to="/planes" className="hover:text-white">Planes</Link><ChevronRight size={14} />
            <span className="font-semibold text-white">{plan.shortName}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#d9fb06]">Solución Websy</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{plan.name}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{plan.description}</p>
              <p className="mt-5 flex items-start gap-3 text-white/75"><Target size={20} className="mt-0.5 shrink-0 text-[#d9fb06]" /><span><strong className="text-white">Ideal para:</strong> {plan.ideal}</span></p>
            </div>
            <aside className="rounded-2xl border border-white/15 bg-white/[.07] p-7 md:p-8">
              <p className="text-xs font-black uppercase tracking-[.16em] text-white/55">Inversión orientativa</p>
              <p className="mt-3 text-3xl font-black leading-tight text-[#d9fb06] md:text-4xl">{formatPrice(plan.price, countryCode)}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{pricingNote(countryCode)}</p>
              <label htmlFor="plan-country" className="mt-6 block text-xs font-bold uppercase tracking-wider text-white/60">Ver precio para</label>
              <select id="plan-country" value={countryCode} onChange={(event) => setCountryCode(event.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#182A2C]">
                {Object.entries(MARKET_PRICING).map(([code, item]) => <option key={code} value={code}>{item.country} ({item.currency})</option>)}
              </select>
              <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" data-wa-location={`plan_${plan.id}`} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9fb06] px-6 py-3.5 font-bold text-[#182A2C] hover:bg-white"><MessageCircle size={18} /> Consultar por WhatsApp</a>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Alcance claro</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#182A2C] md:text-4xl">Qué incluye el plan</h2>
            <ul className="mt-8 grid gap-3">
              {plan.features.map((feature) => <li key={feature} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-slate-700"><Check size={19} className="mt-0.5 shrink-0 text-[#718600]" />{feature}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#556902]">Resultado esperado</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#182A2C] md:text-4xl">Qué cambia en tu negocio</h2>
            <div className="mt-8 rounded-2xl bg-[#f4f7f9] p-7">
              <ul className="space-y-5">{plan.outcomes.map((outcome) => <li key={outcome} className="flex items-start gap-3 text-lg font-semibold text-[#182A2C]"><Check size={20} className="mt-1 shrink-0 text-[#718600]" />{outcome}</li>)}</ul>
              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="flex items-start gap-3 text-slate-600"><Clock size={20} className="mt-0.5 shrink-0 text-[#182A2C]" /><span><strong className="text-[#182A2C]">Plazo:</strong> {plan.timeline}</span></p>
              </div>
            </div>
            {plan.example && (
              <div className="mt-6 rounded-2xl border-2 border-[#d9fb06] p-6">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#556902]">Proyecto real de este nivel</p>
                <h3 className="mt-2 text-xl font-black text-[#182A2C]">{plan.example.name}</h3>
                <p className="mt-1 text-slate-600">{plan.example.detail}</p>
                <ExampleLink {...(plan.example.url.startsWith('/') ? { to: plan.example.url } : { href: plan.example.url, target: '_blank', rel: 'noopener noreferrer' })} className="mt-4 inline-flex items-center gap-2 font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">Ver proyecto <ArrowRight size={16} /></ExampleLink>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#182A2C] py-14 text-white md:py-20">
        <div className="container mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl font-black md:text-4xl">Cuéntanos qué necesitas y cerramos el alcance</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">Antes de empezar recibirás por escrito qué incluye, cuánto cuesta y cuándo se entrega.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={contactPath} className="inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-7 py-4 font-bold text-[#182A2C] hover:bg-white">Solicitar cotización <ArrowRight size={17} /></Link>
            <Link to="/planes" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-bold hover:bg-white/10"><ArrowLeft size={17} /> Comparar planes</Link>
          </div>
        </div>
      </section>

      <FAQSection items={faq} title={`Preguntas sobre el ${plan.name}`} />

      <section className="bg-[#f4f7f9] py-12">
        <div className="container mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-2xl font-black text-[#182A2C]">También puedes comparar</h2>
          <div className="mt-6 flex flex-wrap gap-3">{plans.filter((item) => item.id !== plan.id).map((item) => <Link key={item.id} to={`/planes/${item.id}`} className="rounded-full border border-slate-300 bg-white px-5 py-3 font-bold text-[#182A2C] hover:border-[#182A2C]">{item.name}</Link>)}</div>
        </div>
      </section>
    </div>
  );
};
