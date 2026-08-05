import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Building2,
  Store,
  Sparkles,
  TrendingUp,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const planes = [
  {
    id: 'estandar',
    name: 'Plan Estándar',
    price: 'USD 300 - 450',
    icon: Sparkles,
    ideal: 'Emprendedores, profesionales independientes, marcas personales',
    description: 'Tener presencia digital profesional sin complejidad operativa',
    features: [
      'Sitio web institucional o landing page',
      'Diseño profesional alineado a la marca',
      'Adaptado a celular y desktop',
      'Formularios de contacto / WhatsApp',
      'Optimización básica para Google',
      'Capacitación corta de uso'
    ],
    highlighted: false,
    color: 'from-[#182A2C] to-[#2a4548]'
  },
  {
    id: 'comercio',
    name: 'Plan Comercio',
    price: 'USD 500 - 700',
    icon: Store,
    ideal: 'Comercios físicos, tiendas online, emprendimientos que ya venden',
    description: 'Vender online y ordenar la operatoria básica del negocio',
    features: [
      'Todo lo del Plan Estándar',
      'E-commerce funcional',
      'Carga inicial de productos',
      'Medios de pago integrados',
      'Control básico de pedidos',
      'Reportes simples de ventas',
      'Estructura pensada para escalar'
    ],
    highlighted: false,
    color: 'from-[#182A2C] to-[#2a4548]'
  },
  {
    id: 'pymes',
    name: 'Plan PYMES',
    price: 'USD 700 - 1.200',
    icon: TrendingUp,
    ideal: 'Pymes, empresas chicas, negocios en crecimiento',
    description: 'Ordenar el negocio, los números y la información en un solo sistema',
    features: [
      'Todo lo del Plan Comercio',
      'Web + sistema de gestión integrado',
      'Reportes en Excel y PDF',
      'Seguimiento de ventas por período',
      'Actualización de precios y costos',
      'Indicadores básicos de rentabilidad',
      'Sistema pensado con lógica contable'
    ],
    highlighted: true,
    color: 'from-[#d9fb06] to-[#aeca04]',
    badge: 'Recomendado'
  },
  {
    id: 'corpo',
    name: 'Plan Corpo',
    price: 'Desde USD 1.500',
    icon: Building2,
    ideal: 'Empresas medianas, negocios consolidados',
    description: 'Centralizar operaciones, información y control del negocio digital',
    features: [
      'Desarrollo a medida',
      'Integraciones avanzadas',
      'Automatizaciones',
      'Reportes personalizados',
      'Escalabilidad',
      'Soporte prioritario',
      'Análisis profundo del modelo de negocio'
    ],
    highlighted: false,
    color: 'from-[#1a1a1a] to-black'
  }
];

export const SolucionesWebsySection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleContactClick = () => {
    setIsModalOpen(false);
    if (selectedPlan) {
      navigate(`/contacto?plan=${encodeURIComponent(selectedPlan.name + ' (' + selectedPlan.price + ')')}&budget=${encodeURIComponent(selectedPlan.id)}&type=web`);
    } else {
      navigate('/contacto');
    }
  };

  return (
    <div className="pt-2 md:pt-6 lg:pt-8 pb-12 md:pb-20 lg:pb-28 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none -z-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="#182A2C" />
        </svg>
      </div>

      <div className="text-center mb-8 md:mb-12">
      </div>

      {/* Grid de Planes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 container mx-auto px-4 pb-12">
        {planes.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer group ${plan.highlighted ? 'lg:scale-105' : ''
                }`}
              style={{
                backgroundColor: '#ffffff',
                border: plan.highlighted ? '2px solid #182A2C' : '1px solid #e2e8f0',
                boxShadow: plan.highlighted ? '0 20px 60px rgba(24, 42, 44, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.06)'
              }}
              onClick={() => handlePlanClick(plan)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = plan.highlighted ? 'scale(1.08) translateY(-4px)' : 'translateY(-8px)';
                e.currentTarget.style.boxShadow = plan.highlighted ? '0 30px 80px rgba(24, 42, 44, 0.2)' : '0 20px 40px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#182A2C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = plan.highlighted ? 'scale(1.05)' : 'translateY(0)';
                e.currentTarget.style.boxShadow = plan.highlighted ? '0 20px 60px rgba(24, 42, 44, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = plan.highlighted ? '#182A2C' : '#e2e8f0';
              }}
            >
              {/* Badge superior */}
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <div className="px-4 py-2 rounded-bl-xl rounded-tr-lg" style={{ backgroundColor: '#182A2C' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>
                      {plan.badge}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Precio destacado arriba */}
                <div className="mb-6 pb-6 border-b" style={{ borderColor: '#e2e8f0' }}>
                  <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#718096' }}>
                    {plan.name.replace('Plan ', '')}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold" style={{ color: '#182A2C', letterSpacing: '-0.02em' }}>
                      {plan.price.split(' ')[0]}
                    </span>
                    <span className="text-lg font-medium" style={{ color: '#718096' }}>
                      {plan.price.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </div>

                {/* Ideal para */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#718096' }}>
                    Ideal para
                  </p>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: '#2d3748' }}>
                    {plan.ideal}
                  </p>
                </div>

                {/* Descripción */}
                <p className="text-base leading-relaxed mb-6" style={{ color: '#4a5568' }}>
                  {plan.description}
                </p>

                {/* Características */}
                <ul className="space-y-3 mb-8">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ backgroundColor: 'rgba(217, 251, 6, 0.15)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--brand-primary)' }} />
                      </div>
                      <span style={{ color: '#4a5568', lineHeight: '1.6' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Botón */}
                <button
                  className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 uppercase tracking-wider"
                  style={{
                    backgroundColor: plan.highlighted ? '#182A2C' : 'transparent',
                    color: plan.highlighted ? '#ffffff' : '#182A2C',
                    border: plan.highlighted ? 'none' : '2px solid #182A2C'
                  }}
                >
                  Conocer más
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para Planes */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 border-2 shadow-2xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-medium)'
          }}
        >
          {selectedPlan && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <DialogTitle className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {selectedPlan.name}
                    </DialogTitle>
                    <div className="text-3xl font-black mb-4" style={{ color: 'var(--brand-primary)' }}>
                      {selectedPlan.price}
                    </div>
                  </div>
                  {selectedPlan.badge && (
                    <Badge className="text-sm font-bold px-4 py-2" style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}>
                      {selectedPlan.badge}
                    </Badge>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h5 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                      Ideal para:
                    </h5>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {selectedPlan.ideal}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                      Qué problema resuelve:
                    </h5>
                    <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {selectedPlan.description}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center" style={{ color: 'var(--brand-primary)' }}>
                  <CheckCircle size={20} className="mr-2" />
                  Características incluidas
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg border"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-light)' }}
                    >
                      <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-primary)' }} />
                      <span className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t-2 pt-6" style={{ borderColor: 'var(--border-medium)' }}>
                <p className="text-center text-lg mb-4 font-medium" style={{ color: 'var(--text-primary)' }}>
                  ¿Te interesa este plan? Contáctanos para más información
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleContactClick}
                    style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--text-inverse)' }}
                    className="flex items-center text-base px-8 py-4 font-bold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Solicitar Cotización
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const text = encodeURIComponent(`¡Hola Websy! Me interesa solicitar información sobre el ${selectedPlan ? selectedPlan.name : 'desarrollo de mi sitio web'} (${selectedPlan ? selectedPlan.price : ''}).`);
                      window.open(`https://wa.me/5493884846695?text=${text}`, '_blank');
                    }}
                    className="flex items-center text-base px-8 py-4 border-2 font-bold"
                    style={{
                      borderColor: 'var(--brand-primary)',
                      color: 'var(--brand-primary)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Consultar por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
