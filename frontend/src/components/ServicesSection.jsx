import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// Inline SVG icons to avoid loading lucide-react in main bundle
const Code2 = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const Database = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
  </svg>
);

const ShoppingBag = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const Settings = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const Lightbulb = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>
);

const Shield = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
  </svg>
);

const Star = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const CheckCircle = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ExternalLink = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

const ArrowRight = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const MessageSquare = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const iconMap = {
  Globe: Code2,        // Diseño Web - Código moderno
  ShoppingCart: ShoppingBag,  // E-commerce - Bolsa de compras moderna
  Settings: Settings,   // Sistemas de Gestión - Configuración
  Lightbulb: Lightbulb, // SEO y E-Learning - Bombilla/Ideas
  Wrench: Shield       // Automatizaciones - Escudo de protección
};

export const ServicesSection = React.memo(() => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  // Services data using translation keys - reorganized for better UX
  const servicesData = [
    // First row - User-friendly services
    {
      id: 'webDesign',
      translationKey: 'services.webDesign',
      icon: 'Globe'
    },
    {
      id: 'ecommerce',
      translationKey: 'services.ecommerce',
      icon: 'ShoppingCart'
    },
    {
      id: 'seo',
      translationKey: 'services.seo',
      icon: 'Lightbulb'
    },
    // Second row - Technical services
    {
      id: 'elearning',
      translationKey: 'services.elearning',
      icon: 'Lightbulb'
    },
    {
      id: 'management',
      translationKey: 'services.management',
      icon: 'Settings'
    },
    {
      id: 'automation',
      translationKey: 'services.automation',
      icon: 'Wrench'
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleContactClick = () => {
    setIsModalOpen(false);
    const elemento = document.querySelector('#contacto');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si no existe el elemento, navegar a la página de contacto
      window.location.href = '/contacto';
    }
  };

  return (
    <section id="servicios" className="py-16 md:py-20 lg:py-28 xl:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container px-4 md:px-6 lg:px-8 relative z-10">
        {/* Clean header - CGI style */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#6B46C1', fontWeight: 600 }}>
            Servicios
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)', opacity: 0.9 }}>
            Le ayudamos a complacer las demandas digitales en constante evolución de sus clientes a través de nuestros servicios integrales seguros y flexibles.
          </p>
        </div>

        {/* Secciones individuales para los 3 primeros servicios - Estilo Xenbux */}
        {servicesData.slice(0, 3).map((service, index) => {
          const IconComponent = iconMap[service.icon];
          const serviceTitle = t(`${service.translationKey}.title`);
          const serviceDescription = t(`${service.translationKey}.description`);
          const serviceFeatures = t(`${service.translationKey}.features`);

          // Imágenes placeholder - puedes reemplazarlas con imágenes reales
          const serviceImages = {
            webDesign: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
            ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
            seo: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2d82a?w=1200&h=800&fit=crop'
          };

          return (
            <div key={service.id} className="mb-24 md:mb-32 lg:mb-40">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Imagen o Video - Estilo Xenbux - Click to load para no bloquear main thread */}
                <div className={index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}>
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{ aspectRatio: '4/3' }}
                    onClick={(e) => {
                      // Video IDs for each service
                      const videoIds = {
                        webDesign: 'bDkRs7hkWss',
                        ecommerce: 'c6Grr8r5j5g',
                        seo: 'AavsQP3gPj4'
                      };
                      const videoId = videoIds[service.id];
                      if (videoId && !e.currentTarget.querySelector('iframe')) {
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                        iframe.title = serviceTitle;
                        iframe.className = 'w-full h-full absolute inset-0';
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        const container = e.currentTarget;
                        container.innerHTML = '';
                        container.appendChild(iframe);
                      }
                    }}
                  >
                    {/* Thumbnail placeholder - no iframe until clicked */}
                    {service.id === 'webDesign' || service.id === 'ecommerce' || service.id === 'seo' ? (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${service.id === 'webDesign' ? 'bDkRs7hkWss' :
                              service.id === 'ecommerce' ? 'c6Grr8r5j5g' : 'AavsQP3gPj4'
                            }/maxresdefault.jpg`}
                          alt={`${serviceTitle} - Click para ver video`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          width={480}
                          height={360}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={serviceImages[service.id] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop'}
                          alt={serviceTitle}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          loading="lazy"
                          width={480}
                          height={360}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Contenido - Estilo Xenbux */}
                <div className={index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}>
                  {/* Título destacado */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
                    <strong style={{ color: 'var(--brand-primary)' }}>{serviceTitle.split(' ')[0]}</strong> {serviceTitle.split(' ').slice(1).join(' ')}
                  </h3>

                  {/* Descripción */}
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)', opacity: 0.9, fontWeight: 400 }}>
                    {serviceDescription}
                  </p>

                  {/* Características - Estilo Xenbux */}
                  {Array.isArray(serviceFeatures) && serviceFeatures.length > 0 && (
                    <ul className="mb-8 md:mb-10 space-y-4 md:space-y-5">
                      {serviceFeatures.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="flex items-start group">
                          <div className="flex-shrink-0 mr-4 mt-1">
                            <CheckCircle size={24} className="md:w-6 md:h-6" style={{ color: 'var(--brand-primary)' }} />
                          </div>
                          <span className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)', opacity: 0.9 }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Botón CTA - Estilo Xenbux */}
                  <button
                    onClick={() => handleServiceClick(service)}
                    className="inline-flex items-center px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--brand-primary) 0%, #f8d47a 100%)',
                      color: 'var(--text-inverse)',
                      boxShadow: '0 10px 30px rgba(217, 251, 6, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(217, 251, 6, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(217, 251, 6, 0.3)';
                    }}
                  >
                    Ver más detalles
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Grid para los servicios restantes */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center" style={{ color: 'var(--text-primary)' }}>
            Otros Servicios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {servicesData.slice(3).map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const serviceTitle = t(`${service.translationKey}.title`);
              const serviceDescription = t(`${service.translationKey}.description`);

              return (
                <div
                  key={service.id}
                  className="relative overflow-hidden cursor-pointer transition-all duration-300 group border rounded-lg p-6 md:p-8 lg:p-10 text-left min-h-[320px] md:min-h-[360px] flex flex-col justify-between hover:border-opacity-60"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-medium)',
                    borderWidth: '1px'
                  }}
                  onClick={() => handleServiceClick(service)}
                >
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300"
                      style={{
                        backgroundColor: 'rgba(217, 251, 6, 0.1)',
                        borderRadius: '8px'
                      }}
                    >
                      <IconComponent size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" style={{ color: 'var(--brand-primary)' }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                      {serviceTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed flex-grow" style={{ color: 'var(--text-secondary)', opacity: 0.85 }}>
                      {serviceDescription.length > 140
                        ? `${serviceDescription.substring(0, 140)}...`
                        : serviceDescription
                      }
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <button
                      className="w-full py-3 md:py-4 px-4 md:px-6 rounded-md font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--brand-primary)',
                        border: '1px solid var(--border-medium)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(217, 251, 6, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Ver más detalles
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modern Call to Action */}
        <div className="text-center mt-16 md:mt-20 lg:mt-24">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 text-white">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)', opacity: 0.9 }}>
            Ofrecemos soluciones personalizadas para cada necesidad. Contáctanos y cuéntanos tu proyecto.
          </p>
          <button
            onClick={handleContactClick}
            className="px-10 md:px-12 py-5 md:py-6 rounded-full font-black text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-lime-500/30"
            style={{
              background: 'linear-gradient(135deg, var(--brand-primary) 0%, #f8d47a 100%)',
              color: 'var(--text-inverse)',
              boxShadow: '0 15px 50px rgba(217, 251, 6, 0.4)'
            }}
          >
            Solicitar Cotización Personalizada
          </button>
        </div>
      </div>

      {/* Modal para detalles del servicio - Responsive */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6 lg:p-8 border-2 shadow-2xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-medium)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
          }}
        >
          {selectedService && (
            <div className="space-y-4 md:space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center mb-4" style={{ color: 'var(--text-primary)' }}>
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mr-3 md:mr-4"
                    style={{
                      background: `linear-gradient(135deg, var(--brand-primary), var(--secondary-yellow))`
                    }}
                  >
                    {React.createElement(iconMap[selectedService.icon], {
                      size: 20,
                      className: "md:w-6 md:h-6",
                      style: { color: 'var(--text-inverse)' }
                    })}
                  </div>
                  {t(`${selectedService.translationKey}.title`)}
                </DialogTitle>

                <DialogDescription className="text-base md:text-lg lg:text-xl leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {t(`${selectedService.translationKey}.fullDescription`)}
                </DialogDescription>
              </DialogHeader>

              {/* Características responsive */}
              <div className="mb-6">
                <h4 className="font-semibold text-lg md:text-xl mb-4 flex items-center" style={{ color: 'var(--brand-primary)' }}>
                  <CheckCircle size={20} className="mr-2" />
                  {t('services.mainFeatures')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {t(`${selectedService.translationKey}.features`).map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 md:p-4 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--bg-page)',
                        borderColor: 'var(--border-light)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'var(--brand-primary)' }}
                      >
                        <CheckCircle size={14} style={{ color: 'var(--text-inverse)' }} />
                      </div>
                      <span className="text-sm md:text-base leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de Contacto responsive */}
              <div className="border-t-2 pt-6" style={{ borderColor: 'var(--border-medium)' }}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleContactClick}
                    style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
                    className="flex items-center text-sm md:text-base px-4 md:px-6 py-2 md:py-3 font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    {t('services.cta')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://wa.me/5493884846695', '_blank')}
                    className="flex items-center text-sm md:text-base px-4 md:px-6 py-2 md:py-3 border-2 font-semibold"
                    style={{
                      borderColor: 'var(--brand-primary)',
                      color: 'var(--brand-primary)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};