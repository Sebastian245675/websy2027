import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp } from '../lib/tracking';
import {
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Zap,
  Bot,
  Layers,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

const serviceCategories = [
  {
    id: 'web',
    title: 'Desarrollo Web & Plataformas Digitales',
    icon: Globe,
    badge: 'WEB & SISTEMAS',
    description: 'Creamos soluciones web de alto rendimiento orientadas a conversiones, ventas y automatización operativa.',
    services: [
      {
        id: 'web-institucional',
        title: 'Sitios Institucionales',
        description: 'La web de tu empresa: quiénes son, qué servicios ofrecen, casos y contacto directo por WhatsApp. Pensada para generar confianza y convertir visitas en consultas.',
        tags: ['Diseño a medida de tu marca', 'Carga rápida en celular', 'Posicionamiento en Google'],
        type: 'web',
        plan: 'Sitio Institucional',
        cta: 'Cotizar mi sitio institucional'
      },
      {
        id: 'web-landing',
        title: 'Landing Pages de Alta Conversión',
        description: 'Páginas de aterrizaje optimizadas para campañas publicitarias, diseñadas para captar leads y cerrar ventas velozmente.',
        tags: ['Diseño Responsivo', 'Carga rápida en celular', 'Integración WhatsApp & CRM'],
        type: 'web',
        plan: 'Landing Page'
      },
      {
        id: 'web-ecommerce',
        title: 'E-Commerce & Tiendas Online',
        description: 'Plataformas de comercio electrónico completas con carrito, pasarelas de pago (Mercado Pago, Stripe), inventario en tiempo real y facturación.',
        tags: ['Mercado Pago / Stripe', 'Gestión de Stock', 'Facturación Automática'],
        type: 'web',
        plan: 'E-Commerce'
      },
      {
        id: 'web-crm-erp',
        title: 'Sistemas de Gestión a Medida (CRM / ERP)',
        description: 'Software administrativo personalizado para controlar ventas, proveedores, flujo de caja, clientes y compras en un único panel.',
        tags: ['Panel Administrativo', 'Reportes Excel/PDF', 'Lógica Contable'],
        type: 'custom',
        plan: 'Sistema de Gestión CRM/ERP'
      },
      {
        id: 'web-custom',
        title: 'Desarrollo Web & Software a Medida',
        description: 'Plataformas SaaS, portales de clientes y sistemas web desarrollados desde cero con las tecnologías más modernas.',
        tags: ['React / Node.js / Python', 'Arquitectura Escalable', 'Soporte Continuo'],
        type: 'custom',
        plan: 'Software a Medida'
      },
      {
        id: 'web-elearning',
        title: 'Plataformas E-Learning & Cursos Online',
        description: 'Portales educativos con área de miembros, videoclases, exámenes, certificados y venta de cursos automatizada.',
        tags: ['Área de Estudiantes', 'Clases Grabadas / Vivo', 'Suscripciones'],
        type: 'web',
        plan: 'Plataforma E-Learning'
      }
    ]
  },
  {
    id: 'android',
    title: 'Aplicaciones Móviles (Android & iOS)',
    icon: Smartphone,
    badge: 'MOBILE APPS',
    description: 'Desarrollo de aplicaciones móviles nativas e híbridas diseñadas para brindar la mejor experiencia de usuario en smartphones.',
    services: [
      {
        id: 'app-nativas',
        title: 'Apps Móviles Nativas e Híbridas (Android / iOS)',
        description: 'Desarrollamos aplicaciones rápidas y seguras para teléfonos usando React Native, Flutter y Kotlin para Android y App Store.',
        tags: ['Android Studio', 'React Native / Flutter', 'Publicación en Tiendas'],
        type: 'app',
        plan: 'App Android & iOS'
      },
      {
        id: 'app-servicios',
        title: 'Apps de Comercio, Servicios & Turnos',
        description: 'Aplicaciones para reservas de turnos, agendamiento de citas, catálogo móvil y atención al cliente al instante.',
        tags: ['Reserva de Turnos', 'Catálogo In-App', 'Pagos Móviles'],
        type: 'app',
        plan: 'App de Servicios & Turnos'
      },
      {
        id: 'app-logistica',
        title: 'Apps de Operaciones de Campo & Logística',
        description: 'Software para control de choferes, firmas digitales, inventarios en terreno y seguimiento de tareas offline/online.',
        tags: ['Tracking GPS', 'Modo Offline', 'Firma Digital'],
        type: 'app',
        plan: 'App Logística y Operaciones'
      },
      {
        id: 'app-delivery',
        title: 'Apps de Delivery & Fidelización de Clientes',
        description: 'Solución integral para pedidos de comida, comercios locales y programas de puntos o descuentos para retener clientes.',
        tags: ['Pedidos en Tiempo Real', 'Geolocalización', 'Notificaciones Push'],
        type: 'app',
        plan: 'App Delivery & Fidelización'
      }
    ]
  },
  {
    id: 'ia',
    title: 'Automatizaciones & Inteligencia Artificial',
    icon: Cpu,
    badge: 'IA & WORKFLOWS',
    description: 'Integraciones inteligentes para automatizar tareas repetitivas y responder a tus clientes 24 horas al día sin intervención humana.',
    services: [
      {
        id: 'ia-chatbots',
        title: 'Chatbots & Agentes de IA en WhatsApp & Web',
        description: 'Asistentes virtuales entrenados con la información de tu negocio para vender, calificar prospectos y agendar turnos por WhatsApp.',
        tags: ['ChatGPT / Claude API', 'Atención 24/7', 'Integración WhatsApp Business'],
        type: 'custom',
        plan: 'Chatbot de IA en WhatsApp'
      },
      {
        id: 'ia-workflows',
        title: 'Automatización de Flujos de Trabajo (Make / n8n)',
        description: 'Sincronizamos tus herramientas (Gmail, WhatsApp, Google Sheets, CRM, Facturación) para eliminar la carga manual de trabajo.',
        tags: ['n8n / Make Integrations', 'Sincronización Automática', 'Bots en Python'],
        type: 'custom',
        plan: 'Automatización de Workflows'
      },
      {
        id: 'ia-custom',
        title: 'Modelos de Lenguaje (LLMs) & Procesamiento Inteligente',
        description: 'Extracción automática de datos desde PDFs o facturas, generación de reportes inteligentes y asistentes internos corporativos.',
        tags: ['Extracción de Datos', 'Búsqueda RAG', 'Reportes IA'],
        type: 'custom',
        plan: 'IA y Análisis de Datos'
      }
    ]
  },
  {
    id: 'seo',
    title: 'Posicionamiento SEO & Marketing Digital',
    icon: TrendingUp,
    badge: 'CRECIMIENTO',
    description: 'Estrategias de tráfico orgánico y de pago para posicionar tu marca en los primeros puestos y generar clientes calificados.',
    services: [
      {
        id: 'seo-google',
        title: 'SEO y Posicionamiento en Google',
        description: 'Optimización técnica y de contenidos para que tu web gane posiciones en Google y te encuentren antes que a tu competencia.',
        tags: ['Google Search Console', 'Palabras Clave', 'SEO Local & Mapa'],
        type: 'seo',
        plan: 'Posicionamiento en Google (SEO)'
      },
      {
        id: 'seo-ads',
        title: 'Gestión de Campañas ADS (Google Ads & Meta Ads)',
        description: 'Creación y optimización de anuncios de pago en Google Search, Instagram y Facebook enfocados en el máximo retorno de inversión (ROAS).',
        tags: ['Google Ads', 'Meta Ads (Instagram/FB)', 'Retargeting'],
        type: 'seo',
        plan: 'Gestión de Campañas ADS'
      }
    ]
  }
];

export const AntigravityServices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const handleConsultar = (service) => {
    navigate(`/contacto?type=${service.type || 'web'}&plan=${encodeURIComponent(service.plan || service.title)}`);
  };

  const handleWhatsApp = (service) => {
    openWhatsApp(`¡Hola Websy! Me interesa pedir información sobre el servicio: ${service.title}.`, `servicios_${service.id}`);
  };

  const filteredCategories = activeTab === 'all'
    ? serviceCategories
    : serviceCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="servicios" className="py-16 md:py-24 bg-[#ffffff] relative overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header - Matching reference layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-gray-900 pb-8 mb-12">
          <div>
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#182A2C] bg-[#d9fb06] px-3 py-1 inline-block mb-4">
              NUESTRA PROPUESTA
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#182A2C] leading-none tracking-tight uppercase">
              Nuestros <span className="underline decoration-[#d9fb06] decoration-8 underline-offset-4">Servicios</span>
            </h1>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-sm sm:text-base font-bold text-gray-600 leading-relaxed">
              Diseñamos, desarrollamos y escalamos soluciones digitales integrales de alto nivel para posicionar tu negocio en lo más alto del mercado.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-16">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 border-2 ${
              activeTab === 'all'
                ? 'bg-[#182A2C] text-white border-[#182A2C]'
                : 'bg-white text-[#182A2C] border-gray-200 hover:border-[#182A2C]'
            }`}
          >
            Todos los servicios
          </button>
          {serviceCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 border-2 ${
                  activeTab === cat.id
                    ? 'bg-[#182A2C] text-[#d9fb06] border-[#182A2C]'
                    : 'bg-white text-[#182A2C] border-gray-200 hover:border-[#182A2C]'
                }`}
              >
                <Icon size={14} />
                <span>{cat.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Categories List */}
        <div className="space-y-20">
          {filteredCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.id} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8 bg-[#f8f9fa] p-4 md:p-6 border-l-8 border-[#182A2C]">
                  <div className="p-3 bg-[#182A2C] text-[#d9fb06]">
                    <CategoryIcon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 block">CATEGORÍA</span>
                    <h2 className="text-xl md:text-3xl font-black text-[#182A2C] tracking-tight uppercase">
                      {category.title}
                    </h2>
                  </div>
                </div>

                {/* Services Table/Rows List - Matching reference style */}
                <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="py-8 md:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:bg-[#fcfdfe] transition-colors duration-300 px-2 md:px-4"
                    >
                      {/* Left: Title & Description */}
                      <div className="lg:w-2/3 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl md:text-2xl font-black text-[#182A2C] tracking-tight group-hover:text-[#182A2C]">
                            {service.title}
                          </h3>
                        </div>

                        <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                          {service.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {service.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-3 py-1 rounded-sm flex items-center gap-1.5"
                            >
                              <CheckCircle2 size={12} className="text-[#182A2C]" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0 pt-4 lg:pt-0">
                        <button
                          onClick={() => handleConsultar(service)}
                          className="flex items-center justify-center gap-3 px-6 py-3.5 bg-[#182A2C] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 group-hover:bg-[#182A2C]"
                        >
                          <span>{service.cta || 'Solicitar Cotización'}</span>
                          <ArrowRight size={16} className="text-[#d9fb06] group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button
                          onClick={() => handleWhatsApp(service)}
                          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-widest border border-emerald-200 transition-all duration-300"
                        >
                          <MessageSquare size={16} className="text-emerald-600" />
                          <span>WhatsApp Directo</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-24 bg-[#182A2C] text-white p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d9fb06] mb-3 block">
              ¿PROYECTO A MEDIDA?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
              ¿Tenés una idea o requerimiento especial en mente?
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 font-medium leading-relaxed">
              Analizamos las necesidades específicas de tu empresa sin cargo para diseñarte una propuesta técnica y económica personalizada en el día hábil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/contacto')}
                className="bg-[#d9fb06] hover:bg-[#aeca04] text-[#182A2C] font-black px-8 py-4 uppercase text-xs tracking-widest transition-all"
              >
                Hablar con un Especialista
              </button>
              <button
                onClick={() => openWhatsApp('Hola Websy, quiero consultar por un proyecto a medida.', 'servicios_banner')}
                className="bg-white/10 hover:bg-white/20 text-white font-black px-8 py-4 uppercase text-xs tracking-widest border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Consulta Rápida WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


