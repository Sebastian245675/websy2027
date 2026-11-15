import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SolucionesWebsySection } from '../components/SolucionesWebsySection';
import { SEOHead } from '../components/SEOHead';
import { FAQSection, PLANS_FAQ, faqSchema } from '../components/FAQSection';
import useVisitorCountry from '../hooks/useVisitorCountry';
import { saveCountry } from '../lib/geo';
import { DEFAULT_MARKET, formatPrice, formatSeoMonthlyPrice, getMarket, MARKET_PRICING, PLAN_PRICES, SEO_MONTHLY_PRICE_USD, SEO_PRICING_UPDATED_AT } from '../pricing';

const installments = [
  { pct: '30%', when: 'Al inicio' },
  { pct: '30%', when: 'A mitad del proyecto' },
  { pct: '40%', when: 'En la entrega' },
];

export const PlansPage = () => {
  const visitorCountry = useVisitorCountry();
  const [countryCode, setCountryCode] = useState(DEFAULT_MARKET);

  useEffect(() => {
    if (visitorCountry && MARKET_PRICING[visitorCountry]) setCountryCode(visitorCountry);
  }, [visitorCountry]);

  const market = getMarket(countryCode);
  const seoCountryPath = { AR: '/argentina/seo', CO: '/colombia/seo', MX: '/mexico/seo' }[countryCode] || '/servicios/seo-marketing';
  const localizedFaq = [
    {
      q: `¿Cuánto cuesta una página web en ${market.country}?`,
      a: `Una landing page o un sitio institucional cuesta ${formatPrice(PLAN_PRICES.estandar, countryCode)}; una tienda online, ${formatPrice(PLAN_PRICES.comercio, countryCode)}; y un sistema de gestión, ${formatPrice(PLAN_PRICES.pymes, countryCode)}. Son valores orientativos: el precio final queda cerrado por escrito.`,
    },
    ...PLANS_FAQ.map((item) => item.q.includes('Cómo se paga') ? {
      ...item,
      a: `En 3 cuotas: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega. En ${market.country} puedes pagar con ${market.payment}.`,
    } : item),
  ];
  const selectCountry = (event) => {
    const nextCountry = event.target.value;
    setCountryCode(nextCountry);
    saveCountry(nextCountry);
  };

  return (
    <div className="min-h-screen pt-[68px]" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <SEOHead
        title="Inversión: planes y precios de desarrollo web | Websy"
        description="Precios de desarrollo web, tiendas online y sistemas de gestión con Websy. Valores en tu moneda, pago en 3 cuotas y ejemplos reales."
        jsonLd={faqSchema(localizedFaq)}
      />
      {/* Page Header */}
      <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 md:py-8">
        <div className="container px-4 mx-auto">
          {/* Breadcrumbs - Closer with less mt/mb */}
          <nav className="flex items-center space-x-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 md:mb-4">
            <Link to="/" className="hover:text-gray-900 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900">Inversión</span>
          </nav>

          {/* Promo Badge */}
          <div className="inline-block bg-[#182A2C] text-white px-3 py-1.5 text-xs font-black tracking-[0.2em] mb-2 md:mb-4">
            INVERSIÓN
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#182A2C] leading-tight">
            ¿Cuánto <span className="bg-[#d9fb06] px-3 py-1">cuesta</span> tu proyecto? <br className="hidden md:block" />
            <span className="text-[#182A2C] opacity-70">Elegí el nivel que necesita tu negocio hoy</span>
          </h1>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label htmlFor="pricing-country" className="text-sm font-bold text-[#182A2C]">Ver precios para</label>
            <select
              id="pricing-country"
              value={countryCode}
              onChange={selectCountry}
              className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#182A2C] focus:outline-none focus:ring-2 focus:ring-[#9db600]"
            >
              {Object.entries(MARKET_PRICING).map(([code, item]) => (
                <option key={code} value={code}>{item.country} ({item.currency})</option>
              ))}
            </select>
            <span className="text-xs text-slate-500">Detectamos tu país; puedes cambiarlo aquí.</span>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div>
        <SolucionesWebsySection countryCode={countryCode} />
      </div>

      <section className="bg-[#f4f7f9] py-14 md:py-20">
        <div className="container mx-auto max-w-6xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-[#182A2C] text-white lg:grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-7 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#d9fb06]">Suscripción SEO</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Seguimiento y mejora todos los meses</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/75">Para ganar posiciones de forma sostenida: medimos búsquedas, corregimos SEO técnico, optimizamos contenido y trabajamos una prioridad comercial cada mes.</p>
              <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
                {['Auditoría y medición inicial', 'Seguimiento de posiciones', 'Mejoras técnicas y on-page', 'Una página prioritaria por mes', 'Enlazado interno y contenido', 'Informe y reunión mensual'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5"><Check size={17} className="mt-0.5 shrink-0 text-[#d9fb06]" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center bg-white/[.07] p-7 md:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[.16em] text-white/60">En {market.country}</p>
              <p className="mt-3 text-4xl font-black text-[#d9fb06]">{formatSeoMonthlyPrice(countryCode)}</p>
              <p className="mt-2 font-semibold">Equivalente a USD {SEO_MONTHLY_PRICE_USD}/mes</p>
              <p className="mt-5 text-sm leading-relaxed text-white/60">Conversión orientativa actualizada el {SEO_PRICING_UPDATED_AT}; se confirma al contratar.</p>
              <Link to={seoCountryPath} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#d9fb06] px-6 py-3.5 font-bold text-[#182A2C] hover:bg-white">
                Ver el plan completo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Formas de pago */}
      <section className="bg-[#182A2C] py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-6xl grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[.22em] text-[#d9fb06]">Formas de pago</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Pagás en 3 cuotas, a medida que avanza el proyecto
            </h2>
            <p className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed">
              En {market.country}, puedes pagar con {market.payment}. El importe y las fechas quedan por escrito antes de empezar.
            </p>
          </div>
          <ol className="grid grid-cols-3 gap-3 md:gap-4">
            {installments.map(({ pct, when }, i) => (
              <li key={when} className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-6">
                <span className="block text-[10px] font-black uppercase tracking-[.16em] text-white/50">Cuota {i + 1}</span>
                <span className="mt-2 block text-3xl md:text-5xl font-black text-[#d9fb06] tracking-tight">{pct}</span>
                <span className="mt-2 block text-xs md:text-sm font-semibold text-white">{when}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection items={localizedFaq} />
    </div>
  );
};
