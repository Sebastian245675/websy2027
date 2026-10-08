import React from 'react';
import { Link } from 'react-router-dom';
import { AntigravityServices } from '../components/AntigravityServices';
import { SEOHead } from '../components/SEOHead';
import { servicesData } from '../servicesSeoData';

export const ServicesPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <SEOHead
        title="Servicios de Desarrollo Web, Apps Android & IA | Websy"
        description="Servicios completos de desarrollo web, tiendas e-commerce, apps móviles Android/iOS, automatizaciones con Inteligencia Artificial y sistemas a medida."
      />
      {/* Antigravity Services Section */}
      <AntigravityServices />

      {/* Enlaces a cada página de servicio: sin ellos, /servicios/<slug> solo se alcanzaba desde el sitemap */}
      <section aria-labelledby="servicios-en-detalle" className="py-16 md:py-20 bg-[#f6f7f4] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 id="servicios-en-detalle" className="text-3xl md:text-4xl font-black text-[#182A2C] tracking-tight mb-8">Cada servicio en detalle</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(servicesData).map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="block h-full bg-white border border-slate-200 p-5 hover:border-[#182A2C] transition-colors">
                  <span className="block text-lg font-extrabold text-[#182A2C] mb-1">{s.title}</span>
                  <span className="block text-sm text-slate-600 leading-relaxed">{s.heroSubtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
