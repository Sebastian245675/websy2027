// Páginas de aterrizaje por nicho para la pauta paga: /lp/<slug>.
// No están en el menú ni en el sitemap (noindex). Versión AR en voseo y versión MX en tuteo neutro.
// caseIds: ids del portfolio (mockData.js) que se muestran como trabajos del rubro.

const FAQ_AR = [
  {
    q: '¿Cómo se paga?',
    a: 'En 3 cuotas: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega, con Naranja X o Mercado Pago.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Un sitio institucional suele estar listo en 2 a 3 semanas y una tienda online en 3 a 6 semanas. El plazo exacto queda escrito en la cotización.',
  },
  {
    q: '¿Cuántas revisiones incluye?',
    a: 'Entre 3 y 5 rondas de cambios, según lo que defina el contrato.',
  },
];

const FAQ_MX = [
  {
    q: '¿Cómo se paga?',
    a: 'En 3 pagos: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega. Desde México puedes pagar con Dólar App o Binance.',
  },
  {
    q: '¿Trabajan con clientes de México?',
    a: 'Sí. Trabajamos a distancia con clientes de todo México; por ejemplo, desarrollamos el sistema de gestión y la tienda en línea de una cadena de bicicletas con 4 sucursales.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Un sitio institucional suele estar listo en 2 a 3 semanas y una tienda en línea en 3 a 6 semanas. El plazo exacto queda por escrito en la cotización.',
  },
  {
    q: '¿Cuántas revisiones incluye?',
    a: 'Entre 3 y 5 rondas de cambios, según lo que defina el contrato.',
  },
];

const base = {
  inmobiliarias: {
    rubro: 'Inmobiliarias',
    caseIds: ['casamax-inmobiliaria'],
  },
  juridicos: {
    rubro: 'Estudios jurídicos',
    caseIds: [14, 'lm-asociados-abogados-penalistas', 'dra-nancy-melo'],
  },
  infoproductores: {
    rubro: 'Infoproductores',
    caseIds: [],
  },
};

export const landingPages = [
  {
    slug: 'inmobiliarias',
    ...base.inmobiliarias,
    tone: 'vos',
    country: 'AR',
    eyebrow: 'Webs para inmobiliarias',
    title: 'Una web para tu inmobiliaria que trae consultas por cada propiedad',
    subtitle: 'Publicá tus propiedades con filtros, fichas completas y contacto directo por WhatsApp, sin depender solo de los portales.',
    includes: [
      'Buscador con filtros por operación, tipo de propiedad y zona',
      'Ficha de cada propiedad con fotos, datos y botón de WhatsApp',
      'Panel para cargar y editar propiedades vos mismo',
      'Formularios para pedir tasación o publicar una propiedad',
      'Posicionamiento en Google por zona y tipo de propiedad',
    ],
    cta: 'Quiero mi auditoría gratis',
    whatsappText: 'Hola Websy, tengo una inmobiliaria y quiero una web.',
    faq: FAQ_AR,
  },
  {
    slug: 'inmobiliarias-mx',
    ...base.inmobiliarias,
    tone: 'tu',
    country: 'MX',
    eyebrow: 'Sitios web para inmobiliarias',
    title: 'Un sitio web para tu inmobiliaria que genera consultas por cada propiedad',
    subtitle: 'Publica tus propiedades con filtros, fichas completas y contacto directo por WhatsApp, sin depender solo de los portales.',
    includes: [
      'Buscador con filtros por operación, tipo de propiedad y zona',
      'Ficha de cada propiedad con fotos, datos y botón de WhatsApp',
      'Panel para cargar y editar propiedades tú mismo',
      'Formularios para solicitar avalúo o publicar una propiedad',
      'Posicionamiento en Google por zona y tipo de propiedad',
    ],
    cta: 'Quiero mi auditoría gratis',
    whatsappText: 'Hola Websy, tengo una inmobiliaria en México y quiero un sitio web.',
    faq: FAQ_MX,
  },
  {
    slug: 'estudios-juridicos',
    ...base.juridicos,
    tone: 'vos',
    country: 'AR',
    eyebrow: 'Webs para estudios jurídicos',
    title: 'Una web para tu estudio jurídico que convierte búsquedas en consultas',
    subtitle: 'Mostrá tus áreas de práctica con claridad y recibí por WhatsApp a las personas que ya están buscando un abogado en Google.',
    includes: [
      'Una página por cada área de práctica',
      'Botón de consulta urgente por WhatsApp',
      'Posicionamiento en Google para tu ciudad y especialidad',
      'Diseño sobrio que transmite confianza',
      'Carga rápida en celular',
    ],
    cta: 'Quiero mi auditoría gratis',
    whatsappText: 'Hola Websy, tengo un estudio jurídico y quiero una web.',
    faq: FAQ_AR,
  },
  {
    slug: 'estudios-juridicos-mx',
    ...base.juridicos,
    rubro: 'Despachos de abogados',
    tone: 'tu',
    country: 'MX',
    eyebrow: 'Sitios web para despachos de abogados',
    title: 'Un sitio web para tu despacho que convierte búsquedas en consultas',
    subtitle: 'Muestra tus áreas de práctica con claridad y recibe por WhatsApp a las personas que ya están buscando un abogado en Google.',
    includes: [
      'Una página por cada área de práctica',
      'Botón de consulta urgente por WhatsApp',
      'Posicionamiento en Google para tu ciudad y especialidad',
      'Diseño sobrio que transmite confianza',
      'Carga rápida en celular',
    ],
    cta: 'Quiero mi auditoría gratis',
    whatsappText: 'Hola Websy, tengo un despacho de abogados en México y quiero un sitio web.',
    faq: FAQ_MX,
  },
  {
    slug: 'infoproductores',
    ...base.infoproductores,
    tone: 'vos',
    country: 'AR',
    eyebrow: 'Webs para infoproductores',
    title: 'Tu curso o mentoría, con una web que vende sola',
    subtitle: 'Landing de venta, cobro online y acceso para tus alumnos en un solo lugar, listo para tus anuncios.',
    includes: [
      'Landing de venta pensada para anuncios de Meta y TikTok',
      'Cobro online con Mercado Pago',
      'Área de alumnos con videoclases y materiales',
      'Seguimiento automático por WhatsApp y email',
      'Píxeles instalados para medir cada venta',
    ],
    cta: 'Quiero mi auditoría gratis',
    whatsappText: 'Hola Websy, vendo cursos/mentorías y quiero una web.',
    faq: FAQ_AR,
  },
  {
    slug: 'infoproductores-mx',
    ...base.infoproductores,
    tone: 'tu',
    country: 'MX',
    eyebrow: 'Sitios web para infoproductores',
    title: 'Tu curso o mentoría, con un sitio que vende solo',
    subtitle: 'Página de venta, cobro en línea y acceso para tus alumnos en un solo lugar, listo para tus anuncios.',
    includes: [
      'Página de venta pensada para anuncios de Meta y TikTok',
      'Cobro en línea con Mercado Pago o Stripe',
      'Área de alumnos con videoclases y materiales',
      'Seguimiento automático por WhatsApp y correo',
      'Píxeles instalados para medir cada venta',
    ],
    cta: 'Quiero mi auditoría gratis',
    whatsappText: 'Hola Websy, vendo cursos/mentorías en México y quiero un sitio web.',
    faq: FAQ_MX,
  },
];
