import React from 'react';
import { AntigravityServices } from '../components/AntigravityServices';
import { SEOHead } from '../components/SEOHead';

export const ServicesPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <SEOHead
        title="Servicios de Desarrollo Web, Apps Android & IA | Websy"
        description="Servicios completos de desarrollo web, tiendas e-commerce, apps móviles Android/iOS, automatizaciones con Inteligencia Artificial y sistemas a medida."
        keywords="desarrollo web, e-commerce, apps android, aplicaciones moviles, chatbots whatsapp, inteligencia artificial, automatizaciones, CRM, ERP, SEO"
      />
      {/* Antigravity Services Section */}
      <AntigravityServices />
    </div>
  );
};


