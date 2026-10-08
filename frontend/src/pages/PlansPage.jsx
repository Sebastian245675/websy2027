import { Link } from 'react-router-dom';
import { SolucionesWebsySection } from '../components/SolucionesWebsySection';
import { SEOHead } from '../components/SEOHead';
import { FAQSection, PLANS_FAQ, faqSchema } from '../components/FAQSection';

const installments = [
  { pct: '30%', when: 'Al inicio' },
  { pct: '30%', when: 'A mitad del proyecto' },
  { pct: '40%', when: 'En la entrega' },
];

export const PlansPage = () => {
  return (
    <div className="min-h-screen pt-[68px]" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <SEOHead
        title="Inversión: planes y precios de desarrollo web | Websy"
        description="Cuánto cuesta tu web, tienda online o sistema de gestión con Websy. Planes desde USD 800, pago en 3 cuotas y ejemplos reales de cada nivel."
        jsonLd={faqSchema(PLANS_FAQ)}
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
        </div>
      </div>

      {/* Plans Grid */}
      <div>
        <SolucionesWebsySection />
      </div>

      {/* Formas de pago */}
      <section className="bg-[#182A2C] py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-6xl grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[.22em] text-[#d9fb06]">Formas de pago</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Pagás en 3 cuotas, a medida que avanza el proyecto
            </h2>
            <p className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed">
              En Argentina, con Naranja X o Mercado Pago. Desde el exterior, con Dólar App o Binance.
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

      <FAQSection items={PLANS_FAQ} />
    </div>
  );
};
