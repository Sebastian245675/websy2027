import { Building2, Sparkles, Store, TrendingUp } from 'lucide-react';
import { PLAN_PRICES } from './pricing';
import { HIGHLIGHTED_PLAN_ID } from './siteConfig';

const basePlans = [
  {
    id: 'estandar', name: 'Plan Estándar', shortName: 'Estándar', price: PLAN_PRICES.estandar, icon: Sparkles,
    ideal: 'Emprendedores, profesionales independientes y marcas personales',
    description: 'Una presencia digital profesional para explicar lo que haces y convertir visitas en consultas.',
    seoTitle: 'Plan Estándar de Desarrollo Web | Websy',
    seoDescription: 'Landing page o sitio institucional profesional, adaptable a celulares, preparado para Google y conectado con WhatsApp. Conoce precio y entregables.',
    features: ['Sitio web institucional o landing page', 'Diseño profesional alineado a la marca', 'Adaptado a celular y escritorio', 'Formulario de contacto y WhatsApp', 'SEO técnico y on-page inicial', 'Capacitación corta de uso'],
    outcomes: ['Presentar tu negocio con credibilidad', 'Concentrar servicios y contacto en un solo lugar', 'Tener una base rápida y preparada para crecer'],
    timeline: '5 a 7 días hábiles para una landing; 2 a 3 semanas para un sitio institucional.',
    example: { name: 'Jujuy MultiServicios', detail: 'Sitio institucional', url: 'https://jujuymultiservicios.com.ar/' },
  },
  {
    id: 'comercio', name: 'Plan Comercio', shortName: 'Comercio', price: PLAN_PRICES.comercio, icon: Store,
    ideal: 'Comercios físicos, tiendas online y emprendimientos que ya venden',
    description: 'Una tienda online funcional para vender y ordenar la operación básica del negocio.',
    seoTitle: 'Plan Comercio: Tienda Online y E-commerce | Websy',
    seoDescription: 'Tienda online con catálogo, pagos, pedidos y panel de administración. Revisa entregables, precio orientativo y un caso real desarrollado por Websy.',
    features: ['Todo lo del Plan Estándar', 'E-commerce funcional', 'Carga inicial de productos', 'Medios de pago integrados', 'Control básico de pedidos', 'Reportes simples de ventas', 'Estructura pensada para escalar'],
    outcomes: ['Vender las 24 horas desde tu propio canal', 'Reducir pedidos manuales y errores', 'Administrar productos, precios y ventas'],
    timeline: '3 a 6 semanas, según catálogo, pagos, envíos e integraciones.',
    example: { name: 'VISFUM Perfumería', detail: 'Tienda online', url: 'https://visfum.com/' },
  },
  {
    id: 'pymes', name: 'Plan PYMES', shortName: 'PYMES', price: PLAN_PRICES.pymes, icon: TrendingUp,
    ideal: 'Pymes, empresas pequeñas y negocios en crecimiento',
    description: 'Web y sistema de gestión para centralizar ventas, números e información operativa.',
    seoTitle: 'Plan PYMES: Web y Sistema de Gestión | Websy',
    seoDescription: 'Web y sistema de gestión integrado para pymes: ventas, reportes, costos e indicadores en una solución a medida. Consulta alcance y precio.',
    features: ['Todo lo del Plan Comercio', 'Web y sistema de gestión integrado', 'Reportes en Excel y PDF', 'Seguimiento de ventas por período', 'Actualización de precios y costos', 'Indicadores básicos de rentabilidad', 'Sistema pensado con lógica contable'],
    outcomes: ['Dejar de depender de planillas separadas', 'Ver ventas y operación en tiempo real', 'Tomar decisiones con información ordenada'],
    timeline: 'Se entrega por etapas, con prioridades y fechas definidas antes de empezar.',
    example: { name: 'Bicicletería en México', detail: 'Sistema para 4 sucursales y tienda online', url: '/casos-de-exito/sistema-gestion-sucursales-tienda-online-bicicleteria-mexico' },
  },
  {
    id: 'corpo', name: 'Plan Corpo', shortName: 'Corpo', price: PLAN_PRICES.corpo, icon: Building2,
    ideal: 'Empresas medianas y negocios consolidados',
    description: 'Desarrollo a medida para centralizar operaciones, integraciones y control del negocio.',
    seoTitle: 'Plan Corpo: Software Empresarial a Medida | Websy',
    seoDescription: 'Software empresarial a medida con integraciones, automatizaciones, reportes y soporte prioritario. Conoce el alcance del Plan Corpo de Websy.',
    features: ['Desarrollo a medida', 'Integraciones avanzadas', 'Automatizaciones', 'Reportes personalizados', 'Arquitectura escalable', 'Soporte prioritario', 'Análisis profundo del modelo de negocio'],
    outcomes: ['Unificar procesos y fuentes de información', 'Automatizar tareas críticas y repetitivas', 'Construir una plataforma preparada para escalar'],
    timeline: 'Se planifica por etapas y entregables; el cronograma depende del alcance y las integraciones.',
    example: null,
  },
];

export const plans = basePlans.map((plan) => plan.id === HIGHLIGHTED_PLAN_ID
  ? { ...plan, highlighted: true, badge: 'El más elegido' }
  : { ...plan, highlighted: false });

export const planById = (id) => plans.find((plan) => plan.id === id);
