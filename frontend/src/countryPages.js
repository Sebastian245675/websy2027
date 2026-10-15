// Versiones por país del sitio: /colombia, /mexico, /estados-unidos.
//
// Cada una es la "home" de ese país para Google (hreflang es-CO, es-MX, es-US): cuando alguien de Colombia
// busca "websy" o "desarrollo web", Google muestra /colombia en lugar de la home argentina. Además, la home
// detecta el país del visitante (src/lib/geo.js) y le muestra el acceso a su versión y sus casos.
//
// Regla, igual que en caseStudies.js: solo hechos reales. Websy no tiene oficina en estos países; se trabaja
// a distancia. Los casos salen de caseStudies.js filtrando por `location`, no se escriben acá.
// Tuteo (no voseo): así se habla en Colombia, México y entre hispanos de EE. UU.

const SITE_URL = 'https://www.websysrl.com';

export const countryPages = [
  {
    code: 'CO',
    path: '/colombia',
    hreflang: 'es-CO',
    locale: 'es_CO',
    name: 'Colombia',
    // Texto que se busca en caseStudies[].location
    caseMatch: 'Colombia',
    seoTitle: 'Websy Colombia: Desarrollo Web, Páginas y Tiendas Online',
    seoDescription: 'Páginas web, tiendas virtuales y automatización de WhatsApp para empresas de Colombia desde USD 800. Casos reales en Bogotá, Cali y Manizales.',
    h1: ['Desarrollo web para empresas de', 'Colombia'],
    lead: 'Hacemos páginas web, tiendas virtuales, sistemas y automatizaciones para empresas y profesionales colombianos. Ya trabajamos con abogados, psicólogos, una fábrica, un glamping y una productora de eventos de Bogotá, Cali y Manizales, todo a distancia y con precio cerrado antes de empezar.',
    highlights: ['Páginas web desde USD 800', '7 proyectos publicados en Colombia', 'Videollamadas en horario de Colombia', 'Pago en 3 partes con Dólar App o Binance'],
    pill: 'Websy en Colombia: casos en Bogotá, Cali y Manizales',
    answer: [
      'Para una empresa colombiana, una buena página web tiene que cargar rápido en el celular, explicar en segundos qué haces y para quién, permitir escribirte por WhatsApp con un toque y aparecer cuando buscan tu servicio en tu ciudad. En Websy hacemos eso desde USD 800, con el precio y el plazo por escrito antes de empezar.',
      'Somos una agencia de Salta, Argentina, y trabajamos a distancia. Colombia es hoy el país desde donde más empresas nos encuentran, y ya publicamos siete proyectos para clientes colombianos: dos firmas de abogados penalistas, dos consultorios de psicología, una fábrica de protección industrial, un hotel glamping y una productora de eventos.',
    ],
    schedule: 'Argentina va 2 horas adelante de Colombia. Agendamos las videollamadas entre las 8 y las 16 h de Colombia, y por WhatsApp respondemos durante todo el día hábil.',
    payment: 'Los precios están en dólares para que no cambien durante el proyecto. Se paga en 3 partes (30% al empezar, 30% a mitad del proyecto y 40% en la entrega) con Dólar App o Binance.',
    domain: 'El dominio (.co, .com.co o .com) se registra a tu nombre: la página es tuya aunque algún día cambies de proveedor.',
    storeNote: 'Para cobrar en Colombia, la tienda se conecta con una pasarela local como Wompi, PayU, ePayco o Mercado Pago, que aceptan PSE, tarjetas y, según la pasarela, Nequi.',
    rubros: [
      { title: 'Abogados', text: 'En derecho penal la consulta es urgente: la web de LM & Asociados (Bogotá) y la de la Dra. Nancy Melo (Cali) ponen el WhatsApp a un toque y explican cada servicio por separado para que posicione por su búsqueda.', to: '/casos-de-exito/paginas-web-para-abogados', link: 'Webs para abogados' },
      { title: 'Psicólogos y salud mental', text: 'Entre Relatos y SemillaMind, de Bogotá: pedir terapia cuesta, y la web tiene que hacer el primer contacto simple y privado.', to: '/casos-de-exito/paginas-web-para-psicologos', link: 'Webs para psicólogos' },
      { title: 'Hoteles y turismo', text: 'Mágica Luna, un glamping de alta gama: reservas directas por WhatsApp para no pagar comisión a las plataformas, y valoraciones visibles en Google.', to: '/casos-de-exito/paginas-web-para-hoteles', link: 'Webs para hoteles' },
      { title: 'Industria y servicios', text: 'ABO Colombia (forros y protección industrial) y Remix Producciones (eventos en Manizales): una web clara por servicio y el pedido de cotización a un toque.', to: '/casos-de-exito/paginas-web-para-empresas', link: 'Webs para empresas' },
    ],
    faq: [
      { q: '¿Trabajan con empresas de Colombia sin tener oficina allá?', a: 'Sí. Trabajamos a distancia por videollamada y WhatsApp, y ya publicamos siete proyectos para clientes de Bogotá, Cali, Manizales y otras zonas de Colombia. Te mostramos el diseño antes de programar y cada avance en un enlace de prueba.' },
      { q: '¿Cuánto cuesta una página web para una empresa en Colombia?', a: 'Con Websy, una landing page o una página institucional arranca en USD 800; una tienda virtual cuesta entre USD 1.800 y 3.500, y un sistema de gestión entre USD 4.000 y 8.000. El precio queda cerrado por escrito antes de empezar.' },
      { q: '¿Cómo pago desde Colombia?', a: 'En 3 partes: 30% al empezar, 30% a mitad del proyecto y 40% en la entrega, con Dólar App o Binance.' },
      { q: '¿En qué horario me atienden?', a: 'Argentina va 2 horas adelante de Colombia. Las videollamadas se agendan entre las 8 y las 16 h de Colombia.' },
      { q: '¿Pueden hacer una tienda virtual que cobre con PSE o Nequi?', a: 'Sí. La tienda se conecta con una pasarela que opere en Colombia, como Wompi, PayU, ePayco o Mercado Pago, según los medios de pago que quieras ofrecer.' },
      { q: '¿Me ayudan a aparecer en Google en mi ciudad?', a: 'Todas las webs salen preparadas para Google: rápidas, con una página por servicio, textos que nombran tu ciudad y datos estructurados de negocio. Para pelear los primeros puestos sumamos el servicio de SEO, con perfil de empresa en Google y contenido.' },
    ],
    posts: ['desarrollo-software-colombia-empresas-bogota-medellin', 'mejor-hosting-para-paginas-web-en-argentina-colombia-mexico', 'automatizacion-whatsapp-negocios-guia-completa'],
    waText: 'Hola Websy, les escribo desde Colombia. Quiero una cotización para mi proyecto.',
  },
  {
    code: 'MX',
    path: '/mexico',
    hreflang: 'es-MX',
    locale: 'es_MX',
    name: 'México',
    caseMatch: 'México',
    seoTitle: 'Websy México: Desarrollo Web, Tiendas en Línea y Sistemas',
    seoDescription: 'Páginas web, tiendas en línea y sistemas de gestión para empresas de México desde USD 800. Caso real: sistema para una cadena de 4 sucursales.',
    h1: ['Desarrollo web y sistemas para empresas de', 'México'],
    lead: 'Hacemos páginas web, tiendas en línea, sistemas de gestión y automatizaciones para negocios de México. Para una cadena de bicicletas con 4 sucursales desarrollamos el sistema que comparten todos los locales y la tienda en línea conectada al mismo inventario.',
    highlights: ['Páginas web desde USD 800', 'Sistemas multisucursal con tienda en línea', 'Videollamadas en horario de México', 'Pago en 3 partes con Dólar App o Binance'],
    pill: 'Websy en México: webs y sistemas para tu negocio',
    answer: [
      'Para un negocio en México, la página web tiene que verse bien en el celular, explicar rápido qué vendes y dónde, permitir cotizar por WhatsApp y aparecer cuando te buscan en Google. Si además tienes varias sucursales, lo que más se paga solo es que la tienda en línea y los locales compartan un mismo inventario.',
      'Somos una agencia de Salta, Argentina, y trabajamos a distancia con clientes de México. Cobramos en dólares con precio cerrado antes de empezar: una web desde USD 800, una tienda en línea de USD 1.800 a 3.500 y un sistema de gestión de USD 4.000 a 8.000.',
    ],
    schedule: 'Argentina va 3 horas adelante de la Ciudad de México. Agendamos las videollamadas entre las 9 y las 15 h del centro de México.',
    payment: 'Los precios están en dólares. Se paga en 3 partes (30% al inicio, 30% a mitad del proyecto y 40% en la entrega) con Dólar App o Binance.',
    domain: 'El dominio (.mx, .com.mx o .com) se registra a tu nombre, así la página siempre es tuya.',
    storeNote: 'Para cobrar en México, la tienda se conecta con Mercado Pago, Stripe u otra pasarela local, con tarjeta, transferencia SPEI o pago en OXXO según la pasarela que elijas.',
    rubros: [
      { title: 'Comercios con sucursales', text: 'El caso de la cadena de bicicletas: un solo sistema para 4 sucursales y la tienda en línea, para que lo que se vende en un local deje de aparecer disponible en los demás.', to: '/casos-de-exito/sistema-gestion-sucursales-tienda-online-bicicleteria-mexico', link: 'Ver el caso' },
      { title: 'Tiendas en línea', text: 'Catálogo con buscador, carrito, pagos con tarjeta, SPEI u OXXO y un panel para cargar productos, conectado al stock real.', to: '/casos-de-exito/ejemplos-de-tiendas-online', link: 'Ejemplos de tiendas' },
      { title: 'Despachos y consultorios', text: 'Abogados, psicólogos y médicos: una página por servicio, quién es el profesional y el contacto por WhatsApp a un toque.', to: '/casos-de-exito/paginas-web-para-abogados', link: 'Webs para profesionales' },
      { title: 'Automatización de WhatsApp', text: 'Respuestas automáticas, calificación de prospectos y avisos, para no perder clientes mientras atiendes el negocio.', to: '/servicios/automatizaciones-ia', link: 'Automatizaciones' },
    ],
    faq: [
      { q: '¿Trabajan con clientes de México?', a: 'Sí. Trabajamos a distancia con negocios de México; por ejemplo, desarrollamos el sistema de gestión y la tienda en línea de una cadena de bicicletas con 4 sucursales.' },
      { q: '¿Cuánto cuesta una página web en México con Websy?', a: 'Una landing page o un sitio institucional arranca en USD 800; una tienda en línea cuesta entre USD 1.800 y 3.500, y un sistema de gestión entre USD 4.000 y 8.000. El precio queda cerrado por escrito antes de empezar.' },
      { q: '¿Cómo pago desde México?', a: 'En 3 pagos: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega, con Dólar App o Binance.' },
      { q: '¿En qué horario me atienden?', a: 'Argentina va 3 horas adelante de la Ciudad de México. Las videollamadas se agendan entre las 9 y las 15 h del centro de México.' },
      { q: '¿Cuánto tarda?', a: 'Una landing page, de 5 a 7 días hábiles; un sitio institucional, de 2 a 3 semanas; una tienda en línea, de 3 a 6 semanas. El plazo exacto queda por escrito en la cotización.' },
    ],
    posts: ['desarrollo-web-mexico-empresas-cdmx-guadalajara-monterrey', 'stripe-vs-mercadopago-cual-pasarela-pagos-elegir-ecommerce', 'mejor-hosting-para-paginas-web-en-argentina-colombia-mexico'],
    waText: 'Hola Websy, les escribo desde México. Quiero una cotización para mi proyecto.',
  },
  {
    code: 'US',
    path: '/estados-unidos',
    hreflang: 'es-US',
    locale: 'es_US',
    name: 'Estados Unidos',
    caseMatch: 'Estados Unidos',
    seoTitle: 'Websy EE. UU.: Diseño Web en Español para tu Negocio',
    seoDescription: 'Páginas web bilingües y automatización de consultas para negocios hispanos en EE. UU. Caso real en St. Louis: 40 consultas calificadas por mes. Desde USD 800.',
    h1: ['Páginas web y automatización para negocios en', 'Estados Unidos'],
    lead: 'Hacemos páginas web en inglés y español, y automatizaciones que responden consultas mientras trabajas. Para una empresa de paisajismo de St. Louis hicimos la web y la automatización que hoy le trae unas 40 consultas calificadas y 5 clientes nuevos por mes.',
    highlights: ['Webs bilingües inglés y español', 'Caso real: 40 consultas por mes', 'Te atendemos en español', 'Precios de agencia latinoamericana, en dólares'],
    pill: 'Websy en Estados Unidos: webs bilingües para tu negocio',
    answer: [
      'Si tienes un negocio de servicios en Estados Unidos (paisajismo, construcción, limpieza, remodelación, restaurante), tus clientes buscan en Google en inglés y piden presupuesto a varias empresas a la vez. Gana la que aparece y responde primero. Una web clara en inglés, con versión en español si tu clientela lo necesita, más una respuesta automática a cada consulta, cubre las dos cosas.',
      'Somos una agencia de Salta, Argentina, y trabajamos a distancia con negocios de Estados Unidos. Te atendemos en español, hacemos el sitio en inglés o bilingüe, y cobramos en dólares con precios de una agencia latinoamericana: una web desde USD 800.',
    ],
    schedule: 'Argentina va de 1 a 5 horas adelante de Estados Unidos, según el estado y la época del año. Agendamos las videollamadas en la mañana o el mediodía de tu zona horaria.',
    payment: 'Precios en dólares con presupuesto cerrado. Se paga en 3 partes (30% al empezar, 30% a mitad del proyecto y 40% en la entrega) con Dólar App o Binance.',
    domain: 'El dominio (.com) se registra a tu nombre, así el sitio siempre es tuyo.',
    storeNote: 'Para cobrar en línea, la web se conecta con Stripe, Square o PayPal.',
    rubros: [
      { title: 'Paisajismo y servicios para el hogar', text: 'El caso de STL Gold Landscaping: sitio en inglés para búsquedas locales de St. Louis y automatización que responde y califica cada consulta en el momento.', to: '/casos-de-exito/web-y-automatizacion-paisajismo-estados-unidos-stl-gold', link: 'Ver el caso' },
      { title: 'Respuesta automática a consultas', text: 'Si estás en una obra no puedes contestar el teléfono. La automatización responde, pide los datos del trabajo y te pasa solo los prospectos listos para contratar.', to: '/servicios/automatizaciones-ia', link: 'Automatizaciones' },
      { title: 'Sitios bilingües', text: 'Inglés para aparecer en Google ante la mayoría de tus clientes y español para quienes prefieren hablar en su idioma, con el contacto a un toque en las dos versiones.', to: '/servicios/desarrollo-web', link: 'Desarrollo web' },
    ],
    faq: [
      { q: '¿Trabajan con negocios de Estados Unidos?', a: 'Sí. Por ejemplo, STL Gold Landscaping es de St. Louis, Missouri. Trabajamos a distancia, en español o en inglés.' },
      { q: '¿Hacen la web en inglés?', a: 'Sí. Hacemos el sitio en inglés, en español o bilingüe, según quiénes sean tus clientes.' },
      { q: '¿Cuánto cuesta?', a: 'Una landing page o un sitio institucional arranca en USD 800; una tienda en línea, entre USD 1.800 y 3.500. La automatización de consultas se cotiza según el alcance. El precio queda cerrado por escrito antes de empezar.' },
      { q: '¿Cómo pago desde Estados Unidos?', a: 'En 3 partes: 30% al empezar, 30% a mitad del proyecto y 40% en la entrega, con Dólar App o Binance.' },
    ],
    posts: ['automatizacion-whatsapp-negocios-guia-completa', 'chatbot-whatsapp-business-automatizar-respuestas-clientes'],
    waText: 'Hola Websy, les escribo desde Estados Unidos. Quiero una cotización para mi negocio.',
  },
];

export const countryPageByCode = (code) => countryPages.find((c) => c.code === code);

// hreflang de la home y de las versiones por país: todas declaran el mismo grupo (tiene que ser recíproco)
export const COUNTRY_ALTERNATES = [
  { hreflang: 'x-default', href: `${SITE_URL}/` },
  { hreflang: 'es', href: `${SITE_URL}/` },
  { hreflang: 'es-AR', href: `${SITE_URL}/` },
  { hreflang: 'es-419', href: `${SITE_URL}/` },
  ...countryPages.map((c) => ({ hreflang: c.hreflang, href: `${SITE_URL}${c.path}` })),
];
