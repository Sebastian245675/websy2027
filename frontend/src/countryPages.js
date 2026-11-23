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
    code: 'AR',
    path: '/argentina',
    hreflang: 'es-AR',
    locale: 'es_AR',
    name: 'Argentina',
    caseMatch: 'Argentina',
    seoTitle: 'Desarrollo Web en Argentina para Empresas | Websy',
    seoDescription: 'Desarrollo web en Argentina para empresas: páginas rápidas, tiendas online, sistemas y SEO. Agencia de Salta con proyectos reales y precios claros.',
    h1: ['Desarrollo web para empresas en', 'Argentina'],
    lead: 'Diseñamos páginas web, tiendas online, sistemas de gestión y estrategias SEO para empresas argentinas. Trabajamos desde Salta con alcance nacional, precio cerrado, avances visibles y una estructura preparada para convertir búsquedas en consultas.',
    highlights: ['Agencia argentina con atención nacional', 'Páginas web desde USD 800', 'SEO técnico desde el desarrollo', 'Pago en 3 partes'],
    pill: 'Websy en Argentina: desarrollo web, sistemas y SEO',
    answer: [
      'Si buscas desarrollo web en Argentina, la web tiene que hacer tres trabajos: explicar con claridad qué vendes, convertir visitas en consultas y darle a Google una página sólida para cada servicio y ciudad que quieras posicionar. En Websy combinamos diseño, desarrollo y SEO técnico desde el inicio.',
      'Somos una agencia de Salta y trabajamos con empresas de todo el país. Entregamos el alcance, el precio y el plazo por escrito; mostramos cada avance en un enlace de prueba y publicamos la web con el dominio registrado a nombre del cliente.',
    ],
    schedule: 'Trabajamos en horario de Argentina y coordinamos por videollamada y WhatsApp con empresas de todo el país.',
    payment: 'El presupuesto se expresa en pesos argentinos con referencia en USD. Se paga en 3 partes: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega, por Mercado Pago o Naranja X.',
    domain: 'El dominio .com.ar o .com se registra a tu nombre y la web queda bajo tu control.',
    storeNote: 'Para vender online integramos Mercado Pago, transferencia, envíos y facturación según el alcance del proyecto.',
    rubros: [
      { title: 'Empresas de servicios', text: 'Una página por servicio, casos reales y contacto inmediato para competir en búsquedas comerciales de alcance nacional o local.', to: '/casos-de-exito/paginas-web-para-empresas', link: 'Webs para empresas' },
      { title: 'Estudios jurídicos y profesionales', text: 'Sitios que transmiten confianza, explican cada especialidad y facilitan una consulta urgente desde el celular.', to: '/casos-de-exito/paginas-web-para-abogados', link: 'Webs para profesionales' },
      { title: 'Hoteles y turismo', text: 'Webs con reservas directas, galería, ubicación y SEO local para depender menos de plataformas con comisión.', to: '/casos-de-exito/paginas-web-para-hoteles', link: 'Webs para turismo' },
      { title: 'Pymes con operación propia', text: 'Sistemas para stock, ventas, clientes y reportes conectados con la web o la tienda online.', to: '/servicios/sistemas-gestion', link: 'Sistemas de gestión' },
    ],
    faq: [
      { q: '¿Trabajan con empresas de toda Argentina?', a: 'Sí. La agencia está en Salta y trabajamos a distancia con empresas de cualquier provincia mediante videollamadas, WhatsApp y avances visibles en línea.' },
      { q: '¿Cuánto cuesta una página web en Argentina?', a: 'Una landing page o un sitio institucional parte de USD 800, convertido a pesos argentinos al acordar el proyecto. El alcance, el precio final, las cuotas y el plazo quedan por escrito antes de empezar.' },
      { q: '¿La página incluye SEO?', a: 'Incluye la base técnica: contenido disponible en el HTML, URLs limpias, canonical, sitemap, datos estructurados, velocidad y medición. Para trabajar posiciones mes a mes ofrecemos un plan SEO mensual de USD 200.' },
      { q: '¿Puedo posicionarme fuera de Salta?', a: 'Sí. La estrategia se organiza por servicio, provincia o ciudad según dónde puedas vender. Evitamos crear páginas repetidas: cada landing debe responder una intención real y aportar contenido propio.' },
      { q: '¿Cómo se paga?', a: 'En 3 partes: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega, mediante Mercado Pago o Naranja X.' },
    ],
    posts: ['desarrollo-web-argentina-mejores-empresas-como-contratar', 'cuanto-cuesta-pagina-web-argentina-2026', 'como-posicionar-mi-negocio-local-en-google-seo-local'],
    waText: 'Hola Websy, les escribo desde Argentina. Quiero una cotización para mi proyecto.',
  },
  {
    code: 'CO',
    path: '/colombia',
    hreflang: 'es-CO',
    locale: 'es_CO',
    name: 'Colombia',
    // Texto que se busca en caseStudies[].location
    caseMatch: 'Colombia',
    seoTitle: 'Diseño y Desarrollo Web en Colombia | Agencia Websy',
    seoDescription: 'Diseño y desarrollo web en Colombia para empresas: páginas desde COP 3.000.000, tiendas y sistemas. Casos reales en Bogotá y Manizales.',
    h1: ['Agencia de diseño y desarrollo web para empresas en', 'Colombia'],
    lead: 'Diseñamos y desarrollamos páginas web, tiendas virtuales, sistemas y automatizaciones para empresas y profesionales de Colombia. Ya trabajamos con una firma de abogados, una fábrica, un glamping, una productora de eventos y un marketplace de repuestos, en Bogotá, Manizales y otras ciudades, todo a distancia y con precio cerrado antes de empezar.',
    highlights: ['Páginas web desde COP 3.000.000', '5 proyectos publicados en Colombia', 'Videollamadas en horario de Colombia', 'Pago en 3 partes'],
    pill: 'Websy en Colombia: casos en Bogotá y Manizales',
    answer: [
      'Si buscas una empresa de desarrollo web en Colombia, necesitas algo más que un diseño atractivo: la página debe cargar rápido en el celular, explicar en segundos qué haces, permitir escribirte por WhatsApp y aparecer cuando buscan tu servicio en tu ciudad. En Websy hacemos eso desde COP 3.000.000, con el precio y el plazo por escrito antes de empezar.',
      'Somos una agencia de Salta, Argentina, y trabajamos a distancia. Colombia es hoy el país desde donde más empresas nos encuentran, y ya publicamos cinco proyectos para clientes colombianos: una firma de abogados penalistas, una fábrica de protección industrial, un hotel glamping, una productora de eventos y un marketplace de repuestos para carros.',
    ],
    schedule: 'Argentina va 2 horas adelante de Colombia. Agendamos las videollamadas entre las 8 y las 16 h de Colombia, y por WhatsApp respondemos durante todo el día hábil.',
    payment: 'Mostramos los precios en pesos colombianos con su referencia en USD. Se paga en 3 partes (30% al empezar, 30% a mitad del proyecto y 40% en la entrega) con Dólar App o Binance.',
    domain: 'El dominio (.co, .com.co o .com) se registra a tu nombre: la página es tuya aunque algún día cambies de proveedor.',
    storeNote: 'Para cobrar en Colombia, la tienda se conecta con una pasarela local como Wompi, PayU, ePayco o Mercado Pago, que aceptan PSE, tarjetas y, según la pasarela, Nequi.',
    rubros: [
      { title: 'Abogados', text: 'En derecho penal la consulta es urgente: la web de LM & Asociados (Bogotá) pone el WhatsApp a un toque y explica cada servicio por separado para que posicione por su búsqueda.', to: '/casos-de-exito/paginas-web-para-abogados', link: 'Webs para abogados' },
      { title: 'Tiendas y marketplaces', text: 'R. Repuestos 24/7, de Bogotá: marketplace de repuestos para carros con búsqueda por marca, modelo y año, tiendas verificadas y pago protegido hasta la entrega.', to: '/casos-de-exito/ejemplos-de-tiendas-online', link: 'Ejemplos de tiendas online' },
      { title: 'Hoteles y turismo', text: 'Mágica Luna, un glamping de alta gama: reservas directas por WhatsApp para no pagar comisión a las plataformas, y valoraciones visibles en Google.', to: '/casos-de-exito/paginas-web-para-hoteles', link: 'Webs para hoteles' },
      { title: 'Industria y servicios', text: 'ABO Colombia (forros y protección industrial) y Remix Producciones (eventos en Manizales): una web clara por servicio y el pedido de cotización a un toque.', to: '/casos-de-exito/paginas-web-para-empresas', link: 'Webs para empresas' },
    ],
    faq: [
      { q: '¿Trabajan con empresas de Colombia sin tener oficina allá?', a: 'Sí. Trabajamos a distancia por videollamada y WhatsApp, y ya publicamos cinco proyectos para clientes de Bogotá, Manizales y otras zonas de Colombia. Te mostramos el diseño antes de programar y cada avance en un enlace de prueba.' },
      { q: '¿Cuánto cuesta una página web para una empresa en Colombia?', a: 'Con Websy, una landing page o una página institucional arranca en COP 3.000.000; una tienda virtual cuesta entre COP 6.800.000 y 13.300.000, y un sistema de gestión entre COP 15.200.000 y 30.400.000. Son valores orientativos y el precio queda cerrado por escrito antes de empezar.' },
      { q: '¿Cómo pago desde Colombia?', a: 'En 3 partes: 30% al empezar, 30% a mitad del proyecto y 40% en la entrega, con Dólar App o Binance.' },
      { q: '¿En qué horario me atienden?', a: 'Argentina va 2 horas adelante de Colombia. Las videollamadas se agendan entre las 8 y las 16 h de Colombia.' },
      { q: '¿Pueden hacer una tienda virtual que cobre con PSE o Nequi?', a: 'Sí. La tienda se conecta con una pasarela que opere en Colombia, como Wompi, PayU, ePayco o Mercado Pago, según los medios de pago que quieras ofrecer.' },
      { q: '¿Me ayudan a aparecer en Google en mi ciudad?', a: 'Todas las webs salen preparadas para Google: rápidas, con una página por servicio, textos que nombran tu ciudad y datos estructurados de negocio. Para pelear los primeros puestos sumamos el servicio de SEO, con perfil de empresa en Google y contenido.' },
    ],
    posts: ['cuanto-cuesta-una-pagina-web-en-colombia-2026', 'como-crear-una-tienda-virtual-en-colombia-pagos-envios-costos', 'empresa-de-desarrollo-de-aplicaciones-moviles-en-colombia', 'desarrollo-software-colombia-empresas-bogota-medellin'],
    waText: 'Hola Websy, les escribo desde Colombia. Quiero una cotización para mi proyecto.',
  },
  {
    code: 'MX',
    path: '/mexico',
    hreflang: 'es-MX',
    locale: 'es_MX',
    name: 'México',
    caseMatch: 'México',
    seoTitle: 'Diseño y Desarrollo Web en México | Agencia Websy',
    seoDescription: 'Diseño y desarrollo web en México para empresas: páginas desde MXN 15.000, tiendas en línea y sistemas. Caso real para una cadena de 4 sucursales.',
    h1: ['Agencia de diseño y desarrollo web para empresas en', 'México'],
    lead: 'Hacemos páginas web, tiendas en línea, sistemas de gestión y automatizaciones para negocios de México. Para una cadena de bicicletas con 4 sucursales desarrollamos el sistema que comparten todos los locales y la tienda en línea conectada al mismo inventario.',
    highlights: ['Páginas web desde MXN 15.000', 'Sistemas multisucursal con tienda en línea', 'Videollamadas en horario de México', 'Pago en 3 partes'],
    pill: 'Websy en México: webs y sistemas para tu negocio',
    answer: [
      'Para un negocio en México, la página web tiene que verse bien en el celular, explicar rápido qué vendes y dónde, permitir cotizar por WhatsApp y aparecer cuando te buscan en Google. Si además tienes varias sucursales, lo que más se paga solo es que la tienda en línea y los locales compartan un mismo inventario.',
      'Somos una agencia de desarrollo web de Salta, Argentina, y trabajamos a distancia con clientes de México. Mostramos valores en pesos mexicanos: una web desde MXN 15.000, una tienda en línea de MXN 33.500 a 65.000 y un sistema de gestión de MXN 74.000 a 148.000. El precio final queda cerrado antes de empezar.',
    ],
    schedule: 'Argentina va 3 horas adelante de la Ciudad de México. Agendamos las videollamadas entre las 9 y las 15 h del centro de México.',
    payment: 'Mostramos los precios en pesos mexicanos con su referencia en USD. Se paga en 3 partes (30% al inicio, 30% a mitad del proyecto y 40% en la entrega) con Dólar App o Binance.',
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
      { q: '¿Cuánto cuesta una página web en México con Websy?', a: 'Una landing page o un sitio institucional arranca en MXN 15.000; una tienda en línea cuesta entre MXN 33.500 y 65.000, y un sistema de gestión entre MXN 74.000 y 148.000. Son valores orientativos y el precio queda cerrado por escrito antes de empezar.' },
      { q: '¿Cómo pago desde México?', a: 'En 3 pagos: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega, con Dólar App o Binance.' },
      { q: '¿En qué horario me atienden?', a: 'Argentina va 3 horas adelante de la Ciudad de México. Las videollamadas se agendan entre las 9 y las 15 h del centro de México.' },
      { q: '¿Cuánto tarda?', a: 'Una landing page, de 5 a 7 días hábiles; un sitio institucional, de 2 a 3 semanas; una tienda en línea, de 3 a 6 semanas. El plazo exacto queda por escrito en la cotización.' },
    ],
    posts: ['cuanto-cuesta-una-pagina-web-en-mexico-2026', 'como-crear-una-tienda-en-linea-en-mexico-pagos-envios-facturacion', 'desarrollo-web-mexico-empresas-cdmx-guadalajara-monterrey'],
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
    posts: ['pagina-web-bilingue-para-negocios-hispanos-en-estados-unidos', 'pagina-web-para-contratistas-y-remodelacion-en-estados-unidos', 'pagina-web-para-empresas-de-limpieza-en-estados-unidos', 'automatizacion-whatsapp-negocios-guia-completa'],
    waText: 'Hola Websy, les escribo desde Estados Unidos. Quiero una cotización para mi negocio.',
  },
];

export const countryPageByCode = (code) => countryPages.find((c) => c.code === code);

// hreflang de la home y de las versiones por país: todas declaran el mismo grupo (tiene que ser recíproco)
export const COUNTRY_ALTERNATES = [
  { hreflang: 'x-default', href: `${SITE_URL}/` },
  { hreflang: 'es', href: `${SITE_URL}/` },
  { hreflang: 'es-419', href: `${SITE_URL}/` },
  ...countryPages.map((c) => ({ hreflang: c.hreflang, href: `${SITE_URL}${c.path}` })),
];
