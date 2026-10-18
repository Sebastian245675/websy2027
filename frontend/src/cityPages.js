// Páginas por ciudad dentro de un país: /colombia/desarrollo-web-bogota, /colombia/desarrollo-web-cali.
//
// Se abren solo donde hay demanda medida en Search Console: Cali ya aparecía en la posición 2 para
// "desarrollo web cali" y "marketing automation cali" sin una página propia, y por eso no recibía clics.
//
// Misma regla que countryPages.js: solo hechos reales. Websy no tiene oficina en estas ciudades; se
// trabaja a distancia. Los casos salen de caseStudies.js por slug: primero los de la ciudad, después
// otros de Colombia, y el título de la sección dice cuántos son de la ciudad.

import { PLAN_PRICES } from './pricing';

const COLOMBIA_SERVICES = [
  { name: 'Landing page', detail: 'Una página para vender un servicio o validar una campaña.', price: PLAN_PRICES.estandar, time: '5 a 7 días hábiles' },
  { name: 'Sitio web empresarial', detail: 'Servicios, empresa, casos, contacto y estructura preparada para crecer.', price: PLAN_PRICES.estandar, time: '2 a 3 semanas' },
  { name: 'Tienda virtual', detail: 'Catálogo, carrito, pagos locales, envíos y administración.', price: PLAN_PRICES.comercio, time: '3 a 6 semanas' },
];

const COLOMBIA_STEPS = [
  ['1. Diagnóstico', 'Revisamos el negocio, las búsquedas y las acciones que debe completar el visitante.'],
  ['2. Diseño y desarrollo', 'Presentamos el diseño, ajustamos contigo y publicamos avances en un enlace de prueba.'],
  ['3. Publicación y medición', 'Configuramos dominio, analítica y conversiones; luego entregamos accesos y soporte.'],
];

const COLOMBIA_CHECKLIST = ['Diseño adaptable a celular y computador', 'Dominio registrado a nombre del cliente', 'WhatsApp, formularios y medición de conversiones', 'SEO técnico y contenido indexable', 'Pasarelas colombianas para tiendas virtuales', 'Entrega por etapas con avances visibles'];

// Lo que nos diferencia, en hechos verificables del propio sitio (precios publicados, forma de pago, casos con ficha)
const WHY_US = [
  { title: 'Precio publicado, no “a la medida”', text: 'Muchas agencias responden “depende” hasta la reunión. Nosotros publicamos desde cuánto cuesta cada tipo de proyecto, y el precio final queda cerrado por escrito antes de empezar.' },
  { title: 'Pagas en 3 partes', text: '30% al empezar, 30% a mitad y 40% en la entrega. Casi la mitad del pago llega cuando ya ves la web terminada.' },
  { title: 'Casos con ficha pública', text: 'Cada proyecto del portafolio tiene su página con el problema, la solución y las decisiones técnicas, y enlaza a la web real para que la revises.' },
  { title: 'La web es tuya', text: 'Dominio a tu nombre y accesos entregados. Si algún día cambias de proveedor, te llevas todo.' },
];

const hiringMistakes = (city) => [
  { title: 'Elegir solo por el precio más bajo', text: 'Una plantilla barata sin una página por servicio no aparece en Google. Pregunta qué URLs va a tener la web y para qué búsqueda está pensada cada una.' },
  { title: 'Pagar el 100% por adelantado', text: 'Si pagas todo antes de ver el diseño, pierdes poder para pedir cambios. Lo sano es pagar por etapas, con una parte importante en la entrega.' },
  { title: 'Que el dominio quede a nombre de la agencia', text: 'Es la forma más común de quedar atado a un proveedor. Pide que el dominio y el hosting estén a tu nombre desde el primer día.' },
  { title: 'Una web sin contacto a un toque', text: `En ${city} la mayoría de las consultas llegan desde el celular. Si el WhatsApp o el botón de llamar no está siempre visible, el visitante se va a la siguiente opción.` },
  { title: 'No medir de dónde llegan las consultas', text: 'Sin medición de clics a WhatsApp y formularios no sabes si la web trae clientes. Pide que quede configurada desde la publicación.' },
];

export const cityPages = [
  {
    slug: 'bogota',
    path: '/colombia/desarrollo-web-bogota',
    country: { code: 'CO', name: 'Colombia', path: '/colombia', hreflang: 'es-CO', locale: 'es_CO' },
    name: 'Bogotá',
    teaser: 'Reunimos precios en COP, el proceso de trabajo y tres proyectos publicados en la ciudad.',
    seoTitle: 'Diseño y Desarrollo Web en Bogotá para Empresas | Websy',
    seoDescription: 'Diseño y desarrollo de páginas web en Bogotá para empresas. 3 casos reales, precios en COP, SEO local y cotización con alcance cerrado.',
    serviceName: 'Diseño y desarrollo de páginas web en Bogotá',
    breadcrumb: 'Desarrollo web en Bogotá',
    h1: ['Diseño y desarrollo de páginas web en', 'Bogotá', 'para empresas'],
    lead: 'Creamos sitios que explican qué vendes, cargan rápido en el celular y convierten búsquedas de Google en conversaciones por WhatsApp. Tenemos tres proyectos publicados en Bogotá y cotizamos con precio y plazo cerrados.',
    heroNotes: [
      'Atendemos Bogotá a distancia; no afirmamos tener una oficina local.',
      'Videollamadas entre las 8 y las 16 h de Colombia.',
      'Base técnica de SEO y una URL por servicio cuando el proyecto lo requiere.',
    ],
    introTitle: 'Una web para competir en Bogotá, no solo para “estar en internet”',
    intro: [
      ['El diseño web en Bogotá es una búsqueda competitiva.', 'Una portada genérica no basta: Google y tus clientes necesitan entender qué servicio ofreces, en qué zona trabajas, por qué confiar y cómo contactarte.'],
    ],
    checklist: COLOMBIA_CHECKLIST,
    caseSlugs: [
      'pagina-web-abogados-penalistas-bogota-lm-asociados',
      'pagina-web-psicologos-bogota-entre-relatos',
      'pagina-web-psicologa-bogota-semillamind',
    ],
    localCases: 3,
    casesTitle: '3 páginas web que hicimos para clientes de Bogotá',
    services: COLOMBIA_SERVICES,
    steps: COLOMBIA_STEPS,
    automation: null,
    sectorsTitle: 'Diseño web para los sectores que más compiten en Bogotá',
    sectors: [
      { title: 'Firmas de abogados', text: 'En penal la consulta es urgente y se decide en minutos. La web de LM & Asociados pone el WhatsApp a un toque y separa cada servicio en su propia página.', to: '/casos-de-exito/paginas-web-para-abogados' },
      { title: 'Psicología y salud', text: 'Entre Relatos (dos sedes) y SemillaMind: el primer contacto tiene que ser simple y privado, con modalidad presencial y virtual explicada.', to: '/casos-de-exito/paginas-web-para-psicologos' },
      { title: 'Empresas B2B e industria', text: 'Una página por línea de producto o servicio y la cotización a un toque, para competir por búsquedas de compradores de empresas.', to: '/casos-de-exito/paginas-web-para-empresas' },
      { title: 'Tiendas virtuales', text: 'Catálogo, carrito y pagos con PSE, tarjeta o Nequi según la pasarela, con un panel para cargar productos.', to: '/casos-de-exito/ejemplos-de-tiendas-online' },
    ],
    zones: 'Chapinero, Usaquén, Chicó, Salitre, Teusaquillo, Cedritos, Fontibón, Kennedy y municipios de la Sabana como Chía, Cota y Mosquera',
    whyUs: WHY_US,
    mistakes: hiringMistakes('Bogotá'),
    posts: ['desarrollo-software-colombia-empresas-bogota-medellin', 'mejor-hosting-para-paginas-web-en-argentina-colombia-mexico'],
    faq: [
      { q: '¿Websy tiene oficina en Bogotá?', a: 'No. Nuestra sede administrativa está en Salta, Argentina, y trabajamos a distancia por videollamada y WhatsApp. Ya publicamos tres proyectos para clientes de Bogotá y siete para Colombia.' },
      { q: '¿Cuánto cuesta una página web en Bogotá con Websy?', a: 'Una landing page o un sitio empresarial parte de COP 3.000.000. Una tienda virtual suele estar entre COP 6.800.000 y COP 13.300.000. El alcance, el precio final y el plazo quedan por escrito antes de empezar.' },
      { q: '¿El diseño web incluye SEO para Bogotá?', a: 'Incluye la base técnica: rendimiento móvil, títulos y descripciones, contenido legible por Google, datos estructurados y una arquitectura preparada para una página por servicio. El trabajo continuo de contenidos, autoridad y Perfil de Empresa en Google se cotiza como SEO mensual.' },
      { q: '¿Puedo pagar desde Colombia?', a: 'Sí. El proyecto se divide en tres pagos: 30% al comenzar, 30% a mitad y 40% al entregar. Mostramos la referencia en COP y coordinamos el pago mediante Dólar App o Binance.' },
      { q: '¿El dominio y la página quedan a mi nombre?', a: 'Sí. El dominio .co, .com.co o .com se registra a nombre del cliente. Al entregar también damos los accesos acordados para que el negocio no quede atado al proveedor.' },
    ],
    waHero: 'Hola Websy, les escribo desde Bogotá. Quiero cotizar una página web.',
    waClose: 'Hola Websy, les escribo desde Bogotá. Quiero una propuesta para mi página web.',
  },
  {
    slug: 'cali',
    path: '/colombia/desarrollo-web-cali',
    country: { code: 'CO', name: 'Colombia', path: '/colombia', hreflang: 'es-CO', locale: 'es_CO' },
    name: 'Cali',
    teaser: 'Páginas web, tiendas virtuales y automatización de WhatsApp, con el caso de un despacho de abogados de Cali.',
    seoTitle: 'Desarrollo Web en Cali: Páginas Web y Automatización | Websy',
    seoDescription: 'Desarrollo web en Cali para empresas y profesionales: páginas desde COP 3.000.000, tiendas virtuales y automatización de WhatsApp. Caso real en Cali.',
    serviceName: 'Desarrollo web y automatización para empresas de Cali',
    breadcrumb: 'Desarrollo web en Cali',
    h1: ['Desarrollo web en', 'Cali', 'para empresas y profesionales'],
    lead: 'Hacemos páginas web, tiendas virtuales y automatizaciones de WhatsApp para negocios de Cali y el Valle del Cauca. Ya publicamos la web de un despacho de abogados penalistas de Cali y otros seis proyectos en Colombia, con precio y plazo cerrados antes de empezar.',
    heroNotes: [
      'Atendemos Cali a distancia; no tenemos oficina en la ciudad.',
      'Videollamadas entre las 8 y las 16 h de Colombia.',
      'Web y automatización en un mismo proyecto, si lo necesitas.',
    ],
    introTitle: 'Qué tiene que hacer una página web en Cali para traer clientes',
    intro: [
      ['Quien busca “desarrollo web en Cali” o un servicio en la ciudad compara pocas opciones y escribe a la que responde primero.', 'Por eso la web tiene que explicar en segundos qué haces y en qué zona trabajas, mostrar por qué confiar en ti y tener el WhatsApp a un toque.'],
      ['En la web de la Dra. Nancy Melo, abogada penalista de Cali,', 'cada área de práctica tiene su propia URL (derecho penal, justicia penal militar y derechos humanos) y sus credenciales están declaradas en datos estructurados, para que Google y los asistentes de IA sepan quién es y en qué se especializa.'],
    ],
    checklist: COLOMBIA_CHECKLIST,
    caseSlugs: [
      'pagina-web-abogada-penalista-cali-nancy-melo',
      'pagina-web-productora-eventos-manizales-remix',
      'pagina-web-fabrica-forros-industriales-abo-colombia',
    ],
    localCases: 1,
    casesTitle: 'Un proyecto en Cali y otros en Colombia',
    services: COLOMBIA_SERVICES,
    steps: COLOMBIA_STEPS,
    automation: {
      title: 'Automatización de marketing y WhatsApp para empresas de Cali',
      text: 'Si recibes consultas por WhatsApp, formularios o redes, la automatización responde al instante, pide los datos que necesitas, califica al prospecto y lo registra en tu CRM o en una hoja. Tú hablas solo con quien está listo para comprar. Para una empresa de servicios de Estados Unidos, esa automatización hoy trae unas 40 consultas calificadas por mes.',
      link: 'Automatización de procesos en Colombia',
      to: '/colombia/automatizacion-procesos',
    },
    sectorsTitle: 'Páginas web para los negocios de Cali',
    sectors: [
      { title: 'Abogados y despachos', text: 'El caso de la Dra. Nancy Melo: el nombre de la profesional como título, una URL por área de práctica y credenciales declaradas para Google.', to: '/casos-de-exito/paginas-web-para-abogados' },
      { title: 'Salud y estética', text: 'Cali recibe pacientes de otras ciudades y del exterior. La web tiene que explicar cada procedimiento por separado, mostrar al profesional y agendar la valoración por WhatsApp.', to: '/casos-de-exito/paginas-web-para-psicologos' },
      { title: 'Industria y servicios', text: 'Para empresas de Cali, Yumbo o Palmira que venden a otras empresas: una página por servicio y la cotización a un toque, como hicimos con ABO Colombia.', to: '/casos-de-exito/paginas-web-para-empresas' },
      { title: 'Comercio y tiendas virtuales', text: 'Catálogo con buscador, carrito y pagos con PSE, tarjeta o Nequi según la pasarela, con un panel para cargar productos.', to: '/casos-de-exito/ejemplos-de-tiendas-online' },
    ],
    zones: 'Granada, El Peñón, San Fernando, Ciudad Jardín, El Ingenio, Chipichape y el área metropolitana: Yumbo, Jamundí y Palmira',
    whyUs: WHY_US,
    mistakes: hiringMistakes('Cali'),
    posts: ['automatizacion-whatsapp-negocios-guia-completa', 'mejor-hosting-para-paginas-web-en-argentina-colombia-mexico'],
    faq: [
      { q: '¿Websy tiene oficina en Cali?', a: 'No. Nuestra sede está en Salta, Argentina, y trabajamos a distancia por videollamada y WhatsApp. Publicamos la web de un despacho de abogados de Cali y, en total, siete proyectos para clientes de Colombia.' },
      { q: '¿Cuánto cuesta una página web en Cali?', a: 'Con Websy, una landing page o un sitio empresarial parte de COP 3.000.000 y una tienda virtual cuesta entre COP 6.800.000 y COP 13.300.000. Son valores orientativos: el alcance, el precio final y el plazo quedan por escrito antes de empezar.' },
      { q: '¿Hacen automatización de marketing para empresas de Cali?', a: 'Sí. Automatizamos respuestas de WhatsApp, calificación de prospectos, seguimiento por email y la carga de datos en CRM. Se puede hacer junto con la web o sobre la web que ya tienes, y se cotiza según el alcance.' },
      { q: '¿La web sale preparada para aparecer en Google en Cali?', a: 'Sí. Sale rápida en el celular, con una página por servicio, textos que nombran la ciudad y datos estructurados del negocio. Para pelear los primeros puestos de forma sostenida sumamos el servicio de SEO mensual, con Perfil de Empresa en Google y contenido.' },
      { q: '¿Cómo pago desde Cali?', a: 'En 3 partes: 30% al comenzar, 30% a mitad y 40% al entregar. Mostramos la referencia en COP y coordinamos el pago mediante Dólar App o Binance.' },
      { q: '¿El dominio y la página quedan a mi nombre?', a: 'Sí. El dominio .co, .com.co o .com se registra a nombre del cliente y al entregar damos los accesos acordados.' },
    ],
    waHero: 'Hola Websy, les escribo desde Cali. Quiero cotizar una página web.',
    waClose: 'Hola Websy, les escribo desde Cali. Quiero una propuesta para mi página web o una automatización.',
  },
  {
    slug: 'cdmx',
    path: '/mexico/diseno-web-cdmx',
    country: { code: 'MX', name: 'México', path: '/mexico', hreflang: 'es-MX', locale: 'es_MX' },
    name: 'Ciudad de México',
    teaser: 'Precios en MXN, tiendas con SPEI u OXXO y sistemas para negocios con varias sucursales.',
    seoTitle: 'Diseño de Páginas Web en CDMX desde MXN 15.000 | Websy',
    seoDescription: 'Diseño y desarrollo de páginas web en Ciudad de México: precios publicados en MXN, tiendas en línea y sistemas multisucursal. Pago en 3 partes.',
    serviceName: 'Diseño y desarrollo de páginas web en Ciudad de México',
    breadcrumb: 'Diseño web en CDMX',
    h1: ['Diseño de páginas web en', 'Ciudad de México', 'con precio publicado'],
    lead: 'Hacemos páginas web, tiendas en línea y sistemas para negocios de la CDMX y el Valle de México. Una web arranca en MXN 15.000, con el alcance y el plazo por escrito antes de empezar, y pagas en 3 partes. Para una cadena mexicana de bicicletas con 4 sucursales hicimos el sistema que comparten los locales y la tienda en línea.',
    heroNotes: [
      'Atendemos la CDMX a distancia; no tenemos oficina en México.',
      'Videollamadas entre las 9 y las 15 h del centro de México.',
      'Precios en pesos mexicanos publicados en la web.',
    ],
    introTitle: 'Qué tiene que hacer tu página web para vender en la CDMX',
    intro: [
      ['En la Ciudad de México compites con cientos de negocios por la misma búsqueda.', 'Gana la web que explica en segundos qué vendes y en qué zona, carga rápido en el celular y deja cotizar por WhatsApp sin llenar formularios largos.'],
      ['Si tienes varias sucursales, el problema suele ser otro:', 'que la tienda en línea y los locales no compartan inventario. En el caso de la bicicletería, las 4 sucursales y la tienda trabajan sobre una sola base de datos, así lo que se vende en un local deja de aparecer disponible en los demás.'],
    ],
    checklist: ['Diseño adaptable a celular y computador', 'Dominio .mx o .com a tu nombre', 'WhatsApp, formularios y medición de conversiones', 'SEO técnico y una página por servicio', 'Pagos con tarjeta, SPEI u OXXO según la pasarela', 'Entrega por etapas con avances visibles'],
    caseSlugs: [
      'sistema-gestion-sucursales-tienda-online-bicicleteria-mexico',
      'web-y-automatizacion-paisajismo-estados-unidos-stl-gold',
      'tienda-online-regalos-panel-admin-regala-algo',
    ],
    localCases: 1,
    casesTitle: 'Un proyecto en México y otros que sirven de referencia',
    services: [
      { name: 'Landing page', detail: 'Una página para vender un servicio o una campaña.', price: PLAN_PRICES.estandar, time: '5 a 7 días hábiles' },
      { name: 'Sitio web empresarial', detail: 'Servicios, empresa, casos, contacto y blog.', price: PLAN_PRICES.estandar, time: '2 a 3 semanas' },
      { name: 'Tienda en línea', detail: 'Catálogo, carrito, pagos con tarjeta, SPEI u OXXO, envíos y panel.', price: PLAN_PRICES.comercio, time: '3 a 6 semanas' },
      { name: 'Sistema multisucursal', detail: 'Inventario, ventas y sucursales en un solo sistema, conectado a la tienda.', price: PLAN_PRICES.pymes, time: 'Por etapas' },
    ],
    steps: COLOMBIA_STEPS,
    automation: {
      title: 'Automatización de WhatsApp para negocios de la CDMX',
      text: 'Respuestas automáticas a cada consulta, calificación de prospectos y avisos al equipo, para no perder clientes mientras atiendes el negocio. Para una empresa de servicios de Estados Unidos, esa automatización hoy trae unas 40 consultas calificadas por mes.',
      link: 'Automatización de procesos en México',
      to: '/mexico/automatizacion-procesos',
    },
    sectorsTitle: 'Páginas web para los negocios de la Ciudad de México',
    sectors: [
      { title: 'Comercios con sucursales', text: 'Un solo sistema para todas las sucursales y la tienda en línea, como en la cadena de bicicletas: el inventario deja de desfasarse entre locales.', to: '/casos-de-exito/sistema-gestion-sucursales-tienda-online-bicicleteria-mexico' },
      { title: 'Tiendas en línea', text: 'Catálogo con buscador, carrito y cobro con Mercado Pago, Stripe u otra pasarela: tarjeta, SPEI u OXXO, con un panel para cargar productos.', to: '/casos-de-exito/ejemplos-de-tiendas-online' },
      { title: 'Despachos y consultorios', text: 'Abogados, psicólogos y médicos: una página por servicio, quién es el profesional y la consulta por WhatsApp a un toque.', to: '/casos-de-exito/paginas-web-para-abogados' },
      { title: 'Empresas de servicios', text: 'Para quien vende a otras empresas: una página por servicio, casos y la cotización a un toque, preparadas para búsquedas en Google.', to: '/casos-de-exito/paginas-web-para-empresas' },
    ],
    zones: 'Polanco, Roma, Condesa, Del Valle, Narvarte, Coyoacán, Santa Fe, Reforma y el Estado de México: Naucalpan, Tlalnepantla e Interlomas',
    whyUs: WHY_US,
    mistakes: hiringMistakes('la CDMX'),
    posts: ['desarrollo-web-mexico-empresas-cdmx-guadalajara-monterrey', 'stripe-vs-mercadopago-cual-pasarela-pagos-elegir-ecommerce'],
    faq: [
      { q: '¿Websy tiene oficina en la Ciudad de México?', a: 'No. Nuestra sede está en Salta, Argentina, y trabajamos a distancia por videollamada y WhatsApp. Ya desarrollamos el sistema y la tienda en línea de una cadena mexicana de bicicletas con 4 sucursales.' },
      { q: '¿Cuánto cuesta una página web en la CDMX?', a: 'Con Websy, una landing page o un sitio empresarial arranca en MXN 15.000; una tienda en línea cuesta entre MXN 33.500 y 65.000, y un sistema de gestión entre MXN 74.000 y 148.000. Son valores orientativos y el precio queda cerrado por escrito antes de empezar.' },
      { q: '¿Cuánto tarda una página web?', a: 'Una landing page, de 5 a 7 días hábiles; un sitio empresarial, de 2 a 3 semanas; una tienda en línea, de 3 a 6 semanas. El plazo exacto queda por escrito en la cotización.' },
      { q: '¿Cómo pago desde México?', a: 'En 3 pagos: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega, con Dólar App o Binance.' },
      { q: '¿Mi tienda en línea puede cobrar con SPEI u OXXO?', a: 'Sí. La tienda se conecta con Mercado Pago, Stripe u otra pasarela que opere en México, según los medios de pago que quieras ofrecer.' },
      { q: '¿En qué horario me atienden?', a: 'Argentina va 3 horas adelante de la Ciudad de México. Las videollamadas se agendan entre las 9 y las 15 h del centro de México, y por WhatsApp respondemos durante todo el día hábil.' },
    ],
    waHero: 'Hola Websy, les escribo desde la Ciudad de México. Quiero cotizar una página web.',
    waClose: 'Hola Websy, les escribo desde la Ciudad de México. Quiero una propuesta para mi página web.',
  },
];

export const cityPageBySlug = (slug) => cityPages.find((c) => c.slug === slug);
