import { Link } from 'react-router-dom';
import { SolucionesWebsySection } from '../components/SolucionesWebsySection';
import { SEOHead } from '../components/SEOHead';

export const PlansPage = () => {
  return (
    <div className="min-h-screen pt-[68px]" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <SEOHead
        title="Planes y Precios de Desarrollo Web & Marketing | Websy"
        description="Conocé nuestros planes de desarrollo web, e-commerce, sistemas CRM/ERP y paquetes de marketing digital 360. Soluciones a medida para cada etapa de tu negocio."
        keywords="planes desarrollo web, precios paginas web, costo ecommerce, outsourcing marketing digital, planes CRM Salta, Websy planes"
      />
      {/* Page Header */}
      <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 md:py-8">
        <div className="container px-4 mx-auto">
          {/* Breadcrumbs - Closer with less mt/mb */}
          <nav className="flex items-center space-x-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 md:mb-4">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Planes</span>
          </nav>

          {/* Promo Badge */}
          <div className="inline-block bg-[#182A2C] text-white px-3 py-1.5 text-xs font-black tracking-[0.2em] mb-2 md:mb-4">
            PLANES WEBSY
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#182A2C] leading-tight">
            Nuestros <span className="bg-[#d9fb06] px-3 py-1">Planes</span> <br className="hidden md:block" />
            <span className="text-[#182A2C] opacity-70">Soluciones diseñadas para despegar</span>
          </h1>
        </div>
      </div>

      {/* Plans Grid */}
      <div>
        <SolucionesWebsySection />
      </div>
    </div>
  );
};
