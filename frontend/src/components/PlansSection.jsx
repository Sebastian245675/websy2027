import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const PlansSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleContratar = (plan) => {
    let budgetVal = '0-50';
    if (plan.name.includes('ESTÁNDAR')) budgetVal = '50-100';
    if (plan.name.includes('PROFESIONAL')) budgetVal = '100-200';

    navigate(`/contacto?plan=${encodeURIComponent(plan.name + ' - USD ' + plan.price + '/mes')}&budget=${budgetVal}&type=web`);
  };

  const plans = [
    {
      name: 'PLAN BÁSICO',
      price: '320',
      title: 'Outsourcing 360 Básico de Marketing Digital',
      reach: 'Alcance estimado: 50.000 a 70.000 personas mensuales',
      features: [
        'Gestión de 2 Redes Sociales (Facebook, Instagram, LinkedIn o X)',
        '2 Publicaciones semanales (feed / historias estáticas)',
        'Gestión de Campañas ADS (hasta 2 campañas activas)',
        'Diseño gráfico para piezas de campaña y posteos',
        'Programación mensual de contenido',
        'Respuestas básicas a comentarios y mensajes públicos',
        'Posicionamiento orgánico inicial',
        'Informe estadístico mensual',
        'Reunión mensual de seguimiento con tu manager'
      ],
      highlight: false
    },
    {
      name: 'PLAN ESTÁNDAR',
      price: '480',
      title: 'Outsourcing 360 Estándar de Marketing Digital',
      reach: 'Alcance estimado: 90.000 a 140.000 personas mensuales',
      features: [
        'Gestión de 3 Redes Sociales (por ejemplo: Facebook, Instagram y LinkedIn)',
        '3 Publicaciones semanales (mix entre feed, historias y piezas especiales)',
        'Gestión de Campañas ADS (hasta 4 campañas activas)',
        'Diseño gráfico profesional para campañas y contenidos',
        'Programación mensual de contenido con calendario estratégico',
        'Gestión de comunidad básica (comentarios y mensajes públicos)',
        'Optimización de posicionamiento orgánico',
        'Informe estadístico mensual con recomendaciones',
        'Reuniones quincenales de seguimiento con tu manager'
      ],
      highlight: true
    },
    {
      name: 'PLAN PROFESIONAL',
      price: '680',
      title: 'Outsourcing 360 Profesional – Equipo de Marketing Externo',
      reach: 'Alcance estimado: 150.000 a 220.000 personas mensuales',
      features: [
        'Gestión de hasta 4 Redes Sociales (según estrategia de la marca)',
        '5 Publicaciones semanales (feed, historias, carruseles y piezas especiales)',
        '4 Contenidos PLUS mensuales (reels, videos cortos o piezas premium)',
        'Gestión de Campañas ADS Avanzadas (hasta 8 campañas activas)',
        'Diseño gráfico full para marca, campañas y lanzamientos',
        'Programación semanal de contenido con enfoque táctico',
        'Gestión de comunidad activa (comentarios, mensajes públicos y coordinación de respuestas)',
        'Posicionamiento orgánico profesional y optimización continua',
        'Informe estadístico mensual detallado + análisis de rendimiento',
        'Reuniones semanales de seguimiento estratégico con tu manager',
        'Análisis periódico de competidores y oportunidades'
      ],
      highlight: false
    }
  ];

  return (
    <section id="planes" className="pb-16 md:pb-24 pt-8 md:pt-12" style={{ backgroundColor: '#ffffff' }}>
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer group ${
                plan.highlight ? 'lg:scale-105' : ''
              }`}
              style={{
                backgroundColor: '#ffffff',
                border: plan.highlight ? '2px solid #182A2C' : '1px solid #e2e8f0',
                boxShadow: plan.highlight ? '0 20px 60px rgba(0, 0, 0, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = plan.highlight ? 'scale(1.08) translateY(-4px)' : 'translateY(-8px)';
                e.currentTarget.style.boxShadow = plan.highlight ? '0 30px 80px rgba(0, 0, 0, 0.2)' : '0 20px 40px rgba(0, 0, 0, 0.1)';
                if (plan.highlight) e.currentTarget.style.borderColor = '#d9fb06';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = plan.highlight ? 'scale(1.05)' : 'translateY(0)';
                e.currentTarget.style.boxShadow = plan.highlight ? '0 20px 60px rgba(0, 0, 0, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.06)';
                if (plan.highlight) e.currentTarget.style.borderColor = '#182A2C';
              }}
            >
              {/* Header Badge */}
              <div 
                className="py-3 px-6 text-center font-black tracking-widest text-xs uppercase"
                style={{ backgroundColor: plan.highlight ? '#d9fb06' : '#182A2C', color: plan.highlight ? '#182A2C' : '#ffffff' }}
              >
                {plan.name}
              </div>

              <div className="p-8 flex flex-col justify-between h-full">
                {/* Price */}
                <div>
                  <div className="mb-6 pb-6 border-b border-gray-100 text-center">
                    <div className="flex items-baseline justify-center">
                      <span className="text-lg font-bold text-gray-900 mr-1">USD</span>
                      <span className="text-6xl font-black text-gray-900 tracking-tighter">{plan.price}</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 mt-2 tracking-widest uppercase">POR MES</div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-base font-bold text-gray-900 leading-tight uppercase text-center min-h-[3rem] flex items-center justify-center">
                      {plan.title}
                    </h3>
                    
                    <p className="text-xs font-black text-center py-2 px-4 bg-gray-50 rounded-lg" style={{ color: '#182A2C' }}>
                      {plan.reach}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {plan.features.slice(0, 5).map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                          <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d9fb06]" />
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 5 && (
                        <li className="text-[10px] font-bold text-gray-400 text-center pt-2 uppercase tracking-tight">
                          + {plan.features.length - 5} características adicionales
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-6 mt-auto border-t border-gray-100">
                  <button
                    onClick={() => handleContratar(plan)}
                    className={`w-full py-4 rounded-xl font-bold text-xs tracking-widest transition-all duration-300 border-2 uppercase ${
                      plan.highlight 
                        ? 'bg-[#182A2C] border-[#182A2C] text-white hover:bg-black' 
                        : 'bg-white border-[#182A2C] text-[#182A2C] hover:bg-[#182A2C] hover:text-white'
                    }`}
                  >
                    CONTRATAR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
