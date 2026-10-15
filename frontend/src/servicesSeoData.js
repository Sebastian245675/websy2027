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

const IconLayout = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

export const servicesData = {
  'desarrollo-web': {
    slug: 'desarrollo-web',
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'Una página web profesional para una pyme cuesta desde USD 800 en Websy: una landing page está lista en 5 a 7 días hábiles y un sitio institucional en 2 a 3 semanas. La hacemos a medida, rápida en el celular, con una página por servicio y preparada para aparecer en Google, con el precio y el plazo por escrito antes de empezar.',
    title: 'Desarrollo Web Profesional',
    seoTitle: 'Desarrollo de Páginas Web Profesionales desde USD 800 | Websy',
    seoDescription: 'Páginas web y landing pages a medida, rápidas y preparadas para Google, desde USD 800. Casos reales en Argentina, Colombia y EE. UU. Respuesta en el día hábil.',
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
      { question: '¿Cuánto cuesta desarrollar una página web profesional?', answer: 'Nuestros planes arrancan desde USD 800 para landing pages y sitios institucionales, y llegan a USD 3.500 o más para sitios complejos con tienda online, integraciones y funcionalidades avanzadas. El precio exacto depende del alcance del proyecto. Respondemos con la cotización en el día hábil.' },
      { question: '¿Cuánto tiempo tarda en estar lista mi página web?', answer: 'Una landing page puede estar lista en 5-7 días hábiles. Un sitio web corporativo completo toma entre 2-3 semanas. Trabajamos con metodología ágil, así que verás avances incrementales durante todo el proceso.' },
      { question: '¿Mi página web se verá bien en celulares?', answer: 'Sí, todas nuestras páginas web son 100% responsivas. Se adaptan perfectamente a celulares, tablets y computadoras de escritorio. Más del 70% del tráfico web viene desde dispositivos móviles, así que esto es una prioridad para nosotros.' },
      { question: '¿Incluye hosting y dominio?', answer: 'El hosting está incluido en nuestros planes con servidores optimizados para máxima velocidad. El dominio (.com, .com.ar) se gestiona aparte pero te asesoramos en la compra y configuración.' }
    ],
    priceRange: 'Desde USD 800',
    pricing: [
      { name: 'Landing page', desc: 'Una página para un servicio o una campaña, con WhatsApp y formulario', price: 'Desde USD 800', time: '5 a 7 días hábiles' },
      { name: 'Sitio institucional', desc: 'Servicios, empresa, casos, contacto y blog', price: 'Desde USD 800', time: '2 a 3 semanas' },
    ],
    pricingNote: 'El precio y el plazo quedan por escrito antes de empezar. Se paga en 3 partes: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega.',
    // Posts de otros clusters que van primero en "Guías para decidir" (ServiceDetailPage)
    guides: ['cuanto-cuesta-pagina-web-argentina-2026'],
    ctaText: 'Cotizá tu página web',
    relatedServices: ['ecommerce', 'seo-marketing', 'sistemas-gestion']
  },

  'ui-ux': {
    slug: 'ui-ux',
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'El diseño UI/UX está incluido en cada web, tienda, app o sistema que hacemos: diseñamos las pantallas en Figma y las aprobás en un prototipo navegable antes de que se programe una línea de código. Si tu equipo o tu proveedor programa, también lo hacemos como servicio aparte, con cotización a medida.',
    title: 'Diseño UI/UX',
    seoTitle: 'Diseño UI/UX para Páginas Web, Apps y Sistemas | Websy',
    seoDescription: 'Diseño UI/UX en Figma antes de programar: investigación, wireframes, prototipo navegable, design system y accesibilidad WCAG para webs, apps y sistemas.',
    icon: IconLayout,
    color: '#8b5cf6',
    heroTitle: 'Diseño',
    heroHighlight: 'UI/UX',
    heroSubtitle: 'Interfaces claras que guían a cada visitante hasta la consulta o la compra.',
    description: `El diseño UI/UX define qué ve una persona al entrar a tu web o tu sistema, en qué orden lo ve y qué tan fácil le resulta hacer lo que vino a hacer: pedir un turno, comprar, cotizar o escribirte. Un sitio puede estar bien programado y aun así perder clientes porque el botón importante no se ve o el formulario pide demasiado.

En Websy diseñamos todas las interfaces en Figma antes de escribir una línea de código. Empezamos por entender a quién le habla tu negocio y qué tiene que lograr cada pantalla; después armamos wireframes, el diseño visual y un prototipo navegable que revisás y aprobás antes del desarrollo.

Trabajamos el diseño pensando primero en el celular, con criterios de accesibilidad WCAG y un design system de componentes reutilizables que después se implementa en React y Tailwind CSS. Así el diseño aprobado es exactamente lo que se publica.`,
    features: [
      'Relevamiento de objetivos, público y competencia',
      'Arquitectura de información y flujos de usuario',
      'Wireframes de cada pantalla clave',
      'Diseño visual alineado a tu marca',
      'Prototipo navegable en Figma para aprobar antes de programar',
      'Diseño mobile-first para celular, tablet y escritorio',
      'Accesibilidad según WCAG: contraste, tamaños y navegación por teclado',
      'Design system con componentes reutilizables',
      'Rediseño de sitios y sistemas existentes',
      'Implementación fiel en React y Tailwind CSS'
    ],
    technologies: ['Figma', 'React', 'Tailwind CSS', 'Shadcn UI'],
    faqs: [
      { question: '¿Qué diferencia hay entre UI y UX?', answer: 'UX (experiencia de usuario) es cómo funciona el recorrido: qué pasos sigue una persona, en qué orden y con cuánto esfuerzo. UI (interfaz de usuario) es cómo se ve cada pantalla: colores, tipografías, botones y espaciado. Un buen proyecto necesita las dos: una interfaz linda con un recorrido confuso no convierte.' },
      { question: '¿Veo el diseño antes de que empiecen a programar?', answer: 'Sí. Diseñamos en Figma y te compartimos un prototipo navegable para que lo pruebes desde tu computadora o tu celular. Se programa recién cuando aprobás el diseño, así los cambios se hacen cuando todavía son rápidos.' },
      { question: '¿Pueden rediseñar mi web o mi sistema actual?', answer: 'Sí. Revisamos dónde se traban hoy tus usuarios (formularios largos, botones que no se ven, pasos de más) y proponemos un rediseño que conserva lo que ya funciona. Se puede rediseñar sin cambiar de tecnología o como parte de una migración.' },
      { question: '¿El diseño UI/UX se contrata aparte?', answer: 'Está incluido en cada página web, tienda online, app o sistema que desarrollamos. También lo hacemos como servicio independiente cuando tu equipo o tu proveedor actual se encarga de la programación.' }
    ],
    priceRange: 'Cotización a medida',
    ctaText: 'Pedí tu propuesta de diseño',
    relatedServices: ['desarrollo-web', 'aplicaciones-moviles', 'ecommerce']
  },

  'ecommerce': {
    slug: 'ecommerce',
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'Una tienda online a medida cuesta entre USD 1.800 y 3.500 en Websy y está lista en 3 a 6 semanas, según la cantidad de productos y las integraciones. Incluye catálogo con buscador, carrito, pagos con Mercado Pago o Stripe, envíos y un panel para cargar productos, sin comisión por venta de una plataforma.',
    title: 'Tiendas E-commerce',
    seoTitle: 'Desarrollo de Tiendas Online a Medida desde USD 1.800 | Websy',
    seoDescription: 'Tiendas online con Mercado Pago o Stripe, stock conectado y panel para cargar productos, de USD 1.800 a 3.500. Ejemplos reales y respuesta en el día hábil.',
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
    pricing: [
      { name: 'Tienda online a medida', desc: 'Catálogo, carrito, pagos, envíos y panel para cargar productos', price: 'USD 1.800 a 3.500', time: '3 a 6 semanas' },
    ],
    pricingNote: 'El precio depende de la cantidad de productos, las variantes y las integraciones (stock, facturación, envíos). Queda cerrado por escrito antes de empezar.',
    ctaText: 'Creá tu tienda online',
    relatedServices: ['desarrollo-web', 'seo-marketing', 'automatizaciones-ia']
  },

  'aplicaciones-moviles': {
    slug: 'aplicaciones-moviles',
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'Una app para Android e iPhone cuesta desde USD 2.000 en Websy si es informativa o de catálogo, entre USD 3.000 y 5.000 si maneja turnos, pedidos o reservas, y desde USD 5.000 si tiene pagos, mapa en tiempo real o chat. El precio incluye el panel de administración y la publicación en Google Play y App Store.',
    title: 'Aplicaciones Móviles',
    seoTitle: 'Empresa de Desarrollo de Apps Móviles Android e iOS | Websy',
    seoDescription: 'Desarrollamos apps para Android e iPhone desde USD 2.000: diseño, programación, backend y publicación en Google Play y App Store. Respuesta en el día hábil.',
    seoKeywords: 'desarrollo apps argentina, aplicaciones moviles android, desarrollo ios, app delivery, crear aplicacion movil, desarrollador apps salta, react native argentina',
    icon: IconSmartphone,
    color: '#8b5cf6',
    heroTitle: 'Apps Móviles',
    heroHighlight: 'Android & iOS',
    heroSubtitle: 'Apps para Android e iPhone con su panel de administración y publicadas en las dos tiendas. Desde USD 2.000.',
    description: `Una app tiene sentido cuando tus clientes la van a usar seguido: pedir todas las semanas, reservar turnos, seguir un envío, acumular puntos o gestionar su cuenta. Para eso desarrollamos apps para Android e iPhone con React Native, que permite publicar en las dos tiendas con un solo código y bajar el costo frente a hacer dos apps nativas.

Una app no es solo lo que se ve en el teléfono. Casi siempre necesita un servidor, una base de datos y un panel web desde donde tu equipo carga productos, ve pedidos o responde reservas. En muchos proyectos esa parte es la mitad del trabajo, y la incluimos en el presupuesto desde el principio para que no aparezca como un costo sorpresa.

Antes de programar diseñamos las pantallas en Figma y las probás en tu celular. Después desarrollamos por etapas, con versiones de prueba que podés instalar, y nos encargamos de la publicación en Google Play y App Store: cuentas de desarrollador, ficha, capturas, política de privacidad y revisión de cada tienda.

Si lo que necesitás es que te encuentren en Google y te escriban, quizás no te convenga una app: una página web o una PWA (una web que se instala en el teléfono) cuesta bastante menos. Te lo decimos en la primera llamada.`,
    pricing: [
      { name: 'App informativa o catálogo', desc: 'Productos o servicios, contacto por WhatsApp, notificaciones básicas', price: 'Desde USD 2.000', time: '4 a 6 semanas' },
      { name: 'App de turnos, pedidos o reservas', desc: 'Usuarios con cuenta, calendario, panel de administración, notificaciones', price: 'USD 3.000 a 5.000', time: '6 a 10 semanas' },
      { name: 'App con pagos y tiempo real', desc: 'Pasarela de pago, seguimiento en mapa, chat, varios tipos de usuario', price: 'Desde USD 5.000', time: '10 a 16 semanas' },
    ],
    pricingNote: 'A esto se suman las cuentas de desarrollador de cada tienda (USD 25 por única vez en Google Play y USD 99 por año en Apple), el servidor y el mantenimiento anual.',
    features: [
      'Una sola app para Android e iPhone con React Native',
      'Diseño de pantallas en Figma que probás antes de programar',
      'Servidor, base de datos y panel web de administración',
      'Notificaciones push',
      'Login con email, Google, Apple o código por SMS',
      'Pagos con Mercado Pago o Stripe',
      'Funcionamiento sin conexión cuando la app lo necesita',
      'Publicación en Google Play y App Store',
      'Métricas de uso integradas',
      'Actualizaciones sin pasar por las tiendas (OTA) para cambios menores'
    ],
    technologies: ['React Native', 'Flutter', 'Firebase', 'Node.js', 'PostgreSQL', 'AWS'],
    faqs: [
      { question: '¿Cuánto cuesta desarrollar una app móvil?', answer: 'El costo varía según la complejidad. Una app sencilla arranca desde USD 2.000, mientras que apps más complejas con funcionalidades avanzadas pueden ir desde USD 5.000 en adelante. Ofrecemos cotización detallada según tu proyecto.' },
      { question: '¿La app funciona en Android y iPhone?', answer: 'Sí, desarrollamos apps multiplataforma que funcionan tanto en Android como en iOS con una sola base de código, lo que reduce costos y tiempos de desarrollo significativamente.' },
      { question: '¿Se puede publicar en Google Play Store y App Store?', answer: 'Sí, nos encargamos de todo el proceso de publicación en ambas tiendas, incluyendo la creación de las cuentas de desarrollador si es necesario, preparación de screenshots, descripciones y cumplimiento de las políticas de cada tienda.' },
      { question: '¿Cuánto tarda desarrollar una app?', answer: 'Una app informativa o de catálogo, de 4 a 6 semanas. Una app de turnos, pedidos o reservas, de 6 a 10 semanas. Una app con pagos, mapas en tiempo real o chat, de 10 a 16 semanas. A eso se suma la revisión de las tiendas: Google suele aprobar en pocos días y Apple puede pedir cambios antes de publicar.' },
      { question: '¿Qué costos tiene una app después de publicarla?', answer: 'Las cuentas de desarrollador (USD 25 por única vez en Google Play y USD 99 por año en Apple), el servidor y la base de datos, y el mantenimiento: cada año Android y iOS cambian requisitos y la app tiene que actualizarse para seguir publicada.' },
      { question: '¿Me conviene una app o una página web?', answer: 'Una app conviene cuando tus clientes la van a abrir seguido (pedidos, turnos, seguimiento, puntos). Si lo principal es que te encuentren en Google y te contacten, una página web o una PWA cuesta menos y posiciona mejor.' }
    ],
    priceRange: 'Desde USD 2.000',
    guides: ['cuanto-cuesta-desarrollar-una-app-movil-argentina-latam', 'cuanto-cuesta-mantener-una-aplicacion-movil-servidores-y-licencias'],
    ctaText: 'Desarrollá tu app',
    relatedServices: ['desarrollo-web', 'automatizaciones-ia', 'sistemas-gestion']
  },

  'automatizaciones-ia': {
    slug: 'automatizaciones-ia',
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'Un chatbot de WhatsApp con IA para una pyme cuesta desde USD 200 por mes en Websy: responde las preguntas frecuentes, califica cada consulta y te pasa solo los clientes listos para comprar. Para una empresa de paisajismo de St. Louis, la web con una respuesta automática hoy trae unas 40 consultas calificadas y 5 clientes nuevos por mes.',
    title: 'Automatizaciones con IA',
    seoTitle: 'Automatización con IA y Chatbots de WhatsApp | Websy',
    seoDescription: 'Chatbots de WhatsApp e Instagram, flujos con Make o n8n e integraciones con OpenAI para responder y calificar consultas solas. Desde USD 200 por mes.',
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
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'El servicio de SEO de Websy arranca en USD 300 por mes: SEO técnico, una página por servicio, contenido, perfil de empresa en Google y un informe mensual de qué búsquedas trajeron visitas y consultas. Es un trabajo de meses: los primeros resultados suelen verse entre el segundo y el cuarto mes.',
    title: 'SEO & Marketing Digital',
    seoTitle: 'Posicionamiento SEO y Marketing Digital para Pymes | Websy',
    seoDescription: 'SEO técnico, contenido, SEO local y Google Ads para que tu empresa aparezca cuando buscan lo que vendés. Desde USD 300 por mes, con informes mensuales.',
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
    // Respuesta directa con número al abrir la página (modelo de la página de Salta)
    answer: 'Un sistema de gestión a medida para una pyme cuesta entre USD 4.000 y 8.000 en Websy y se desarrolla por etapas: la primera ya se usa en el día a día. Por ejemplo, para una cadena de bicicletas de México hicimos un solo sistema para sus 4 sucursales y la tienda online, con el stock compartido.',
    title: 'Sistemas CRM, ERP & Gestión',
    seoTitle: 'Sistemas de Gestión, CRM y ERP a Medida para Pymes | Websy',
    seoDescription: 'Sistemas de gestión, CRM y ERP a medida: stock, ventas, sucursales, facturación y clientes en un solo lugar. De USD 4.000 a 8.000, con casos reales.',
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
    pricing: [
      { name: 'Sistema de gestión para pymes', desc: 'Stock, ventas, clientes, sucursales o turnos en un solo sistema', price: 'USD 4.000 a 8.000', time: 'Por etapas' },
    ],
    pricingNote: 'Se desarrolla por módulos: la primera etapa ya se usa en el día a día y las siguientes se suman sobre ella.',
    ctaText: 'Digitalizá tu empresa',
    relatedServices: ['desarrollo-web', 'automatizaciones-ia', 'aplicaciones-moviles']
  }
};
