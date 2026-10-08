// Inline SVG icon components (no external dependency)
const IconMonitor = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconShoppingCart = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const IconSmartphone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IconCpu = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const IconSearch = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconDatabase = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

export const servicesData = {
  'desarrollo-web': {
    slug: 'desarrollo-web',
    title: 'Desarrollo Web Profesional',
    seoTitle: 'Desarrollo Web Profesional en Argentina | Diseño de Páginas Web | Websy',
    seoDescription: 'Servicio de desarrollo web profesional en Salta, Argentina. Creamos páginas web responsivas, landing pages optimizadas para conversión y portales corporativos. Cotización gratuita.',
    seoKeywords: 'desarrollo web argentina, diseño web salta, paginas web profesionales, landing pages, diseño responsivo, desarrollo web react, sitio web corporativo, web developer argentina',
    icon: IconMonitor,
    color: '#d9fb06',
    heroTitle: 'Desarrollo Web',
    heroHighlight: 'Profesional',
    heroSubtitle: 'Creamos páginas web que no solo se ven increíbles, sino que convierten visitantes en clientes.',
    description: `En Websy desarrollamos páginas web profesionales utilizando las tecnologías más modernas del mercado. Cada proyecto es diseñado a medida, pensando en la experiencia del usuario y optimizado para aparecer en los primeros resultados de Google.

Nuestro equipo de desarrolladores trabaja con React, Next.js y tecnologías de vanguardia para crear sitios web ultra-rápidos, responsivos y 100% personalizados. No usamos plantillas genéricas: cada web es única y diseñada para tu marca.

Ya sea que necesites una landing page para captar leads, un sitio corporativo para mostrar tus servicios, o un portal complejo con panel administrativo, tenemos la experiencia y las herramientas para hacerlo realidad.`,
    features: [
      'Diseño 100% personalizado y responsivo',
      'Optimización SEO on-page incluida',
      'Panel administrable para gestionar contenido',
      'Certificado SSL y hosting optimizado',
      'Velocidad de carga ultra-rápida (Core Web Vitals)',
      'Integración con Google Analytics y Search Console',
      'Formularios de contacto con notificación por email',
      'Diseño adaptado a celulares, tablets y PC'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Firebase', 'Vercel'],
    faqs: [
      { question: '¿Cuánto cuesta desarrollar una página web profesional?', answer: 'Nuestros planes arrancan desde USD 800 para landing pages y sitios institucionales, y llegan a USD 3.500 o más para sitios complejos con tienda online, integraciones y funcionalidades avanzadas. El precio exacto depende del alcance del proyecto. Ofrecemos cotización gratuita en 24 horas.' },
      { question: '¿Cuánto tiempo tarda en estar lista mi página web?', answer: 'Una landing page puede estar lista en 5-7 días hábiles. Un sitio web corporativo completo toma entre 2-3 semanas. Trabajamos con metodología ágil, así que verás avances incrementales durante todo el proceso.' },
      { question: '¿Mi página web se verá bien en celulares?', answer: 'Sí, todas nuestras páginas web son 100% responsivas. Se adaptan perfectamente a celulares, tablets y computadoras de escritorio. Más del 70% del tráfico web viene desde dispositivos móviles, así que esto es una prioridad para nosotros.' },
      { question: '¿Incluye hosting y dominio?', answer: 'El hosting está incluido en nuestros planes con servidores optimizados para máxima velocidad. El dominio (.com, .com.ar) se gestiona aparte pero te asesoramos en la compra y configuración.' }
    ],
    priceRange: 'Desde USD 800',
    ctaText: 'Cotizá tu página web',
    relatedServices: ['ecommerce', 'seo-marketing', 'sistemas-gestion']
  },

  'ecommerce': {
    slug: 'ecommerce',
    title: 'Tiendas E-commerce',
    seoTitle: 'Desarrollo de Tiendas Online y E-commerce en Argentina | Websy',
    seoDescription: 'Creamos tiendas online profesionales con MercadoPago, Stripe, gestión de inventario y panel administrativo. E-commerce optimizado para vender más en Argentina y Latinoamérica.',
    seoKeywords: 'tienda online argentina, ecommerce argentina, vender por internet, mercadopago ecommerce, tienda virtual, carrito de compras, desarrollo ecommerce salta',
    icon: IconShoppingCart,
    color: '#10b981',
    heroTitle: 'Tiendas Online',
    heroHighlight: 'E-commerce',
    heroSubtitle: 'Tu tienda online 24/7. Vendé más con una plataforma e-commerce diseñada para convertir.',
    description: `Desarrollamos tiendas online completas que están diseñadas para vender. No importa si vendés productos físicos, digitales o servicios: creamos la plataforma perfecta para tu negocio.

Cada e-commerce incluye integración con las pasarelas de pago más populares de Latinoamérica (MercadoPago, Stripe, PayPal), gestión completa de inventario, sistema de pedidos con notificaciones automáticas y un panel administrativo intuitivo.

Optimizamos cada tienda para SEO, velocidad de carga y conversión. Porque no basta con tener una tienda online: necesitás que tus clientes te encuentren en Google y compren fácilmente.`,
    features: [
      'Integración con MercadoPago, Stripe y PayPal',
      'Catálogo de productos con filtros avanzados',
      'Carrito de compras y checkout optimizado',
      'Gestión de inventario y stock en tiempo real',
      'Sistema de pedidos con notificaciones automáticas',
      'Panel administrativo completo',
      'Envíos: integración con Correo Argentino, Andreani, OCA',
      'Facturación electrónica (AFIP) disponible',
      'Diseño responsive optimizado para móviles',
      'SEO on-page para cada producto'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'MercadoPago', 'Firebase'],
    faqs: [
      { question: '¿Puedo vender con MercadoPago en mi tienda online?', answer: 'Sí, integramos MercadoPago como pasarela de pago principal. Tus clientes podrán pagar con tarjeta de crédito, débito, transferencia bancaria y efectivo en puntos de pago. También integramos Stripe para pagos internacionales.' },
      { question: '¿Cuántos productos puedo cargar en mi tienda?', answer: 'No hay límite de productos. Podés cargar desde 10 hasta miles de productos con sus variantes (talle, color, etc). El panel administrativo te permite gestionar todo fácilmente.' },
      { question: '¿Mi tienda online será segura para los compradores?', answer: 'Absolutamente. Todas nuestras tiendas incluyen certificado SSL, procesamiento seguro de pagos a través de pasarelas certificadas y protección contra fraudes. Cumplimos con los estándares PCI DSS.' }
    ],
    priceRange: 'Desde USD 1.800',
    ctaText: 'Creá tu tienda online',
    relatedServices: ['desarrollo-web', 'seo-marketing', 'automatizaciones-ia']
  },

  'aplicaciones-moviles': {
    slug: 'aplicaciones-moviles',
    title: 'Aplicaciones Móviles',
    seoTitle: 'Desarrollo de Apps Android e iOS en Argentina | Aplicaciones Móviles | Websy',
    seoDescription: 'Desarrollamos aplicaciones móviles nativas y multiplataforma para Android e iOS. Apps de delivery, gestión, catálogos y más. Publicación en Play Store y App Store.',
    seoKeywords: 'desarrollo apps argentina, aplicaciones moviles android, desarrollo ios, app delivery, crear aplicacion movil, desarrollador apps salta, react native argentina',
    icon: IconSmartphone,
    color: '#8b5cf6',
    heroTitle: 'Apps Móviles',
    heroHighlight: 'Android & iOS',
    heroSubtitle: 'Tu negocio en el bolsillo de tus clientes. Apps nativas que enamoran.',
    description: `Desarrollamos aplicaciones móviles profesionales para Android e iOS que tus usuarios van a amar. Utilizamos React Native y Flutter para crear apps multiplataforma con rendimiento nativo.

Desde apps de delivery y pedidos online hasta catálogos digitales, sistemas de reservas y apps de gestión empresarial. Cada aplicación es diseñada con UX/UI de primer nivel para que la experiencia sea fluida e intuitiva.

Nos encargamos de todo el proceso: diseño de interfaces, desarrollo, testing, publicación en Google Play Store y Apple App Store, y soporte post-lanzamiento.`,
    features: [
      'Desarrollo nativo y multiplataforma (React Native / Flutter)',
      'Diseño UX/UI profesional e intuitivo',
      'Notificaciones push en tiempo real',
      'Integración con APIs y servicios externos',
      'Autenticación segura (biometría, OAuth, SMS)',
      'Modo offline disponible',
      'Publicación en Google Play y App Store',
      'Analytics y métricas de uso integradas',
      'Actualizaciones OTA (Over-the-Air)',
      'Soporte post-lanzamiento incluido'
    ],
    technologies: ['React Native', 'Flutter', 'Firebase', 'Node.js', 'PostgreSQL', 'AWS'],
    faqs: [
      { question: '¿Cuánto cuesta desarrollar una app móvil?', answer: 'El costo varía según la complejidad. Una app sencilla arranca desde USD 2.000, mientras que apps más complejas con funcionalidades avanzadas pueden ir desde USD 5.000 en adelante. Ofrecemos cotización detallada según tu proyecto.' },
      { question: '¿La app funciona en Android y iPhone?', answer: 'Sí, desarrollamos apps multiplataforma que funcionan tanto en Android como en iOS con una sola base de código, lo que reduce costos y tiempos de desarrollo significativamente.' },
      { question: '¿Se puede publicar en Google Play Store y App Store?', answer: 'Sí, nos encargamos de todo el proceso de publicación en ambas tiendas, incluyendo la creación de las cuentas de desarrollador si es necesario, preparación de screenshots, descripciones y cumplimiento de las políticas de cada tienda.' }
    ],
    priceRange: 'Desde USD 2.000',
    ctaText: 'Desarrollá tu app',
    relatedServices: ['desarrollo-web', 'automatizaciones-ia', 'sistemas-gestion']
  },

  'automatizaciones-ia': {
    slug: 'automatizaciones-ia',
    title: 'Automatizaciones con IA',
    seoTitle: 'Automatizaciones con Inteligencia Artificial y ChatBots WhatsApp | Websy',
    seoDescription: 'Automatizamos tu negocio con IA: chatbots WhatsApp e Instagram, workflows con Make/n8n, integración OpenAI. Ahorrá tiempo y vendé más con automatizaciones inteligentes.',
    seoKeywords: 'automatizaciones ia argentina, chatbot whatsapp, bot instagram, make integromat, n8n automatizaciones, inteligencia artificial pymes, openai api, chatgpt negocios',
    icon: IconCpu,
    color: '#f59e0b',
    heroTitle: 'Automatizaciones',
    heroHighlight: 'con IA',
    heroSubtitle: 'Tu negocio trabajando 24/7 con inteligencia artificial. Automatizá, vendé más, trabajá menos.',
    description: `La inteligencia artificial ya no es ciencia ficción: es la herramienta más poderosa para escalar tu negocio. En Websy implementamos automatizaciones inteligentes que trabajan por vos las 24 horas del día.

Creamos chatbots para WhatsApp e Instagram que responden consultas, toman pedidos y agendan citas automáticamente. Configuramos workflows con Make (Integromat) y n8n que conectan tus herramientas favoritas y eliminan tareas repetitivas.

Integramos modelos de IA de OpenAI y Google para que tu negocio pueda ofrecer atención personalizada, generar contenido, analizar datos y tomar decisiones basadas en inteligencia artificial.`,
    features: [
      'Chatbots inteligentes para WhatsApp Business',
      'Bots de atención para Instagram DM',
      'Workflows automatizados con Make (Integromat)',
      'Automatizaciones con n8n (self-hosted)',
      'Integración con OpenAI (ChatGPT / GPT-4)',
      'Respuestas automáticas 24/7',
      'Seguimiento de leads automático',
      'Generación de contenido con IA',
      'Conexión de CRM + email + WhatsApp',
      'Reportes y analytics automatizados'
    ],
    technologies: ['OpenAI API', 'Make (Integromat)', 'n8n', 'WhatsApp API', 'Python', 'Node.js'],
    faqs: [
      { question: '¿Qué es un chatbot para WhatsApp y cómo me ayuda?', answer: 'Un chatbot para WhatsApp es un sistema automatizado que responde mensajes de tus clientes 24/7. Puede responder preguntas frecuentes, mostrar catálogos, tomar pedidos, agendar citas y derivar consultas complejas a un humano. Esto te ahorra horas de trabajo diario.' },
      { question: '¿Necesito conocimientos técnicos para usar las automatizaciones?', answer: 'No, nosotros configuramos todo por vos. Las automatizaciones funcionan en segundo plano sin que tengas que hacer nada. Además, te capacitamos para que puedas hacer ajustes básicos si lo necesitás.' },
      { question: '¿Cuánto puedo ahorrar con automatizaciones?', answer: 'Nuestros clientes reportan ahorros del 60-80% en tiempo dedicado a tareas repetitivas como responder consultas, enviar cotizaciones y hacer seguimiento de leads. Eso se traduce en más tiempo para hacer crecer tu negocio.' }
    ],
    priceRange: 'Desde USD 200/mes',
    ctaText: 'Automatizá tu negocio',
    relatedServices: ['desarrollo-web', 'ecommerce', 'seo-marketing']
  },

  'seo-marketing': {
    slug: 'seo-marketing',
    title: 'SEO & Marketing Digital',
    seoTitle: 'SEO y Marketing Digital en Argentina | Posicionamiento Web | Websy',
    seoDescription: 'Posicionamos tu negocio en los primeros resultados de Google. SEO on-page, off-page, Google Ads, redes sociales y estrategias de marketing digital para toda Latinoamérica.',
    seoKeywords: 'seo argentina, posicionamiento web salta, marketing digital, google ads argentina, agencia seo latinoamerica, posicionamiento google, sem, redes sociales marketing',
    icon: IconSearch,
    color: '#ef4444',
    heroTitle: 'SEO &',
    heroHighlight: 'Marketing Digital',
    heroSubtitle: 'Que te encuentren primero en Google. Más visitas, más clientes, más ventas.',
    description: `¿De qué sirve tener la mejor página web si nadie la encuentra? En Websy nos especializamos en posicionamiento web (SEO) y marketing digital para que tu negocio aparezca en los primeros resultados de Google.

Implementamos estrategias SEO completas: auditoría técnica, optimización on-page, link building, contenido optimizado, Google My Business y analítica avanzada. Todo diseñado para que tu web atraiga tráfico orgánico de calidad.

Complementamos con campañas de Google Ads y estrategias en redes sociales para maximizar tu visibilidad online y convertir visitantes en clientes reales.`,
    features: [
      'Auditoría SEO técnica completa',
      'Optimización SEO on-page y off-page',
      'Investigación de palabras clave',
      'Creación de contenido optimizado',
      'Google My Business optimizado',
      'Link building y autoridad de dominio',
      'Campañas Google Ads (SEM)',
      'Marketing en redes sociales',
      'Reportes mensuales detallados',
      'Análisis de competencia',
      'Optimización de Core Web Vitals',
      'Estrategia de contenidos para blog'
    ],
    technologies: ['Google Search Console', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Google Ads', 'Meta Ads'],
    faqs: [
      { question: '¿Cuánto tiempo tarda en verse resultados de SEO?', answer: 'El SEO es una estrategia a mediano-largo plazo. Los primeros resultados suelen verse entre 2-4 meses, con mejoras progresivas. A los 6-12 meses es cuando se consolidan las posiciones top. Es una inversión que genera resultados sostenibles en el tiempo.' },
      { question: '¿Puedo aparecer primero en Google?', answer: 'Sí, con una estrategia SEO bien ejecutada es posible posicionarte en las primeras posiciones para las palabras clave relevantes de tu industria. Hacemos un análisis de competencia previo para definir una estrategia realista y efectiva.' },
      { question: '¿Qué diferencia hay entre SEO y Google Ads?', answer: 'SEO es posicionamiento orgánico (gratuito, resultados sostenibles a largo plazo). Google Ads es publicidad paga (resultados inmediatos mientras pagás). Lo ideal es combinar ambas estrategias para maximizar resultados.' }
    ],
    priceRange: 'Desde USD 300/mes',
    ctaText: 'Posicioná tu negocio',
    relatedServices: ['desarrollo-web', 'ecommerce', 'automatizaciones-ia']
  },

  'sistemas-gestion': {
    slug: 'sistemas-gestion',
    title: 'Sistemas CRM, ERP & Gestión',
    seoTitle: 'Desarrollo de CRM, ERP y Sistemas de Gestión a Medida | Websy Argentina',
    seoDescription: 'Desarrollamos sistemas CRM, ERP y software de gestión empresarial a medida. Control de inventario, facturación, seguimiento de clientes y reportes en tiempo real.',
    seoKeywords: 'crm argentina, erp a medida, sistema de gestion empresarial, software de gestion, facturacion electronica, control de inventario, sistema administrativo, desarrollo software',
    icon: IconDatabase,
    color: '#06b6d4',
    heroTitle: 'Sistemas de',
    heroHighlight: 'Gestión',
    heroSubtitle: 'CRM, ERP y software a medida. Controlá tu empresa desde un solo lugar.',
    description: `Desarrollamos sistemas de gestión empresarial a medida que se adaptan exactamente a cómo funciona tu negocio. No forzamos tu empresa a adaptarse a un software genérico: creamos el software que tu empresa necesita.

Desde CRM para gestión de clientes y seguimiento de ventas, hasta ERP completos con módulos de inventario, facturación, recursos humanos, contabilidad y logística. Todo integrado en una plataforma web accesible desde cualquier dispositivo.

Cada sistema incluye panel administrativo intuitivo, reportes en tiempo real, permisos por usuario y soporte técnico continuo.`,
    features: [
      'CRM: gestión completa de clientes y leads',
      'ERP: módulos de inventario, compras y ventas',
      'Facturación electrónica (AFIP)',
      'Reportes y dashboards en tiempo real',
      'Control de stock y alertas automáticas',
      'Gestión de empleados y RRHH',
      'Multi-sucursal y multi-usuario',
      'Permisos y roles personalizados',
      'Integración con WhatsApp, email y redes',
      'App móvil complementaria',
      'Backups automáticos y seguridad',
      'Soporte técnico incluido'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Docker', 'AWS'],
    faqs: [
      { question: '¿Qué diferencia hay entre un CRM y un ERP?', answer: 'Un CRM se enfoca en la gestión de clientes, leads y ventas. Un ERP es más amplio e incluye gestión de inventario, compras, finanzas, RRHH y operaciones. En Websy podemos desarrollar cualquiera de los dos o una solución integrada según tus necesidades.' },
      { question: '¿Puedo acceder al sistema desde el celular?', answer: 'Sí, todos nuestros sistemas son 100% web y responsivos. Podés acceder desde cualquier dispositivo con internet: celular, tablet o computadora. También podemos desarrollar una app móvil complementaria.' },
      { question: '¿Se integra con mi sistema actual?', answer: 'Sí, desarrollamos integraciones con sistemas existentes, incluyendo software contable, bancos, pasarelas de pago, servicios de correo y más. Analizamos tu infraestructura actual para garantizar una transición fluida.' }
    ],
    priceRange: 'Desde USD 4.000',
    ctaText: 'Digitalizá tu empresa',
    relatedServices: ['desarrollo-web', 'automatizaciones-ia', 'aplicaciones-moviles']
  }
};
