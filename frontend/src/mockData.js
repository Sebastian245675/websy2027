// Mock data for the software agency landing page
import { CONTACT } from './siteConfig';

export const portfolio = [
  {
    id: 'bicicletas-mx',
    title: "Bicicletería en México",
    description: "Sistema de gestión para una cadena de bicicletas con 4 sucursales en México, más una tienda online conectada al mismo sistema.",
    image: null,
    url: "",
    category: "Sistema de gestión + E-commerce · México",
    technologies: [],
    client: "Bicicletería en México",
    year: ""
  },
  {
    id: 'visfum-perfumeria',
    title: "VISFUM Perfumería",
    description: "Tienda online de perfumería, regalería y productos para el hogar. Reúne catálogo por categorías, búsqueda de productos, carrito y flujo de compra, además de registro e inicio de sesión para clientes. Desarrollada con React, Vite y Supabase, con diseño adaptable y metadatos para buscadores.",
    image: "/visfum/portada.png",
    url: "https://visfum.com/",
    category: "E-commerce · Perfumería y regalería",
    technologies: ["React", "Vite", "Supabase", "E-commerce", "SEO on-page"],
    client: "VISFUM",
    year: "2026"
  },
  {
    id: 'jujuy-multiservicios',
    title: "Jujuy MultiServicios",
    description: "Sitio corporativo para una empresa de ingeniería y seguridad contra incendios que opera en Jujuy y el NOA. Presenta servicios de auditoría, ingeniería, montaje, mantenimiento NFPA y capacitación; organiza soluciones por sector y facilita consultas por WhatsApp y formulario. Desarrollado con React y CSS, con contenido servido por API, envío de solicitudes mediante API REST, metadatos SEO y datos estructurados locales.",
    image: "/jujuy-multiservicios/portada.jpg",
    url: "https://jujuymultiservicios.com.ar/",
    category: "Sitio web corporativo · Seguridad industrial",
    technologies: ["React", "JavaScript", "CSS", "API REST", "SEO técnico"],
    client: "Jujuy MultiServicios",
    year: "2026"
  },
  {
    id: 'casamax-inmobiliaria',
    title: "CASAMAX Inmobiliaria",
    description: "Plataforma inmobiliaria para descubrir propiedades con filtros de operación y tipo, fichas de detalle y acceso a favoritos, alertas e historial. Incluye recorridos para tasar o publicar una propiedad y contacto directo con asesores. Interfaz desarrollada con React y Vite, adaptable a móviles y con contenidos en español e inglés.",
    image: "/casamax/portada.webp",
    url: "https://inmobiliariacasamax.com/",
    category: "Plataforma inmobiliaria",
    technologies: ["React", "Vite", "JavaScript", "Búsqueda y filtros", "SEO on-page"],
    client: "CASAMAX Inmobiliaria",
    year: "2026"
  },
  {
    id: 'demo-nordica-arquitectos',
    title: "Nórdica arquitectos — Demo Websy",
    description: "Demo de sitio web para estudio de arquitectura con identidad visual editorial, presentación de servicios integrales, galería de proyectos y contacto directo por WhatsApp. Implementación con HTML, CSS y JavaScript nativo, con contenido organizado en una configuración JavaScript editable.",
    image: "/demos/nordica/portada.jpg",
    url: "https://websyarg.com/",
    category: "Demo · Sitio web para arquitectura",
    technologies: ["HTML", "CSS", "JavaScript", "SEO on-page"],
    client: "Demo Websy",
    year: "2026"
  },
  {
    id: 1,
    title: "M Logística y Distribución SRL",
    description: "Sitio web corporativo para empresa especializada en transporte premium de litio, hidróxido y carbonato para exportación. Diseño profesional y optimizado para SEO.",
    image: "/Captura-de-pantalla-2025-09-13-192823.webp",
    url: "https://mlogistica.grupoemesalta.com.ar/",
    category: "Sitio Web Corporativo",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO"],
    client: "M Logística y Distribución SRL",
    year: "2025"
  },
  {
    id: 2,
    title: "Covenant - Materiales Eléctricos",
    description: "E-commerce especializado en materiales eléctricos e iluminación profesional. Plataforma completa con catálogo de productos, cotizaciones y envíos a domicilio.",
    image: "/Captura-de-pantalla-2025-09-13-194419.webp",
    url: "https://covenant.adhoc.ar/",
    category: "E-commerce",
    technologies: ["Odoo", "Python", "PostgreSQL", "E-commerce"],
    client: "Covenant",
    year: "2025"
  },
  {
    id: 3,
    title: "Regala Algo SRL",
    description: "E-commerce de productos de alta calidad con panel administrativo completo. Plataforma integral para gestión de inventario, pedidos y análisis de ventas.",
    image: "/Captura-de-pantalla-2025-09-13-195135.webp",
    url: "https://regalaalgosrl.com/",
    category: "E-commerce",
    technologies: ["React", "Node.js", "MongoDB", "Panel Admin"],
    client: "Regala Algo SRL",
    year: "2025"
  },
  {
    id: 4,
    title: "NUVO Perfumería",
    description: "Landing page elegante para perfumería de alta calidad con toque personal. Diseño sofisticado enfocado en la experiencia del cliente y personalización de fragancias.",
    image: "/Captura-de-pantalla-2025-09-13-195842.webp",
    url: "", // nuvo.website no responde (revisado 2026-10-07)
    category: "Landing Page",
    technologies: ["React", "CSS3", "JavaScript", "UX Design"],
    client: "NUVO Perfumería",
    year: "2025"
  },
  {
    id: 5,
    title: "Che Carreta Restaurante",
    description: "Landing demostrativa realizada en 2 días para destacar los mejores platos con sabor argentino servidos en Perú. Diseñada para captar reservas y mostrar la esencia del restaurante.",
    image: "/Captura%20de%20pantalla%202025-10-11%20150742.webp",
    url: "", // checarretaperu.com no responde (revisado 2026-10-07)
    category: "Landing Page",
    technologies: ["WordPress", "Elementor", "SEO Local", "UX"],
    client: "Che Carreta Restaurante",
    year: "2025"
  },
  {
    id: 6,
    title: "Animal Path - Veterinaria",
    description: "Sitio web profesional para clínica veterinaria desarrollado en WordPress. E-commerce completo de productos para mascotas con catálogo de collares, correas, pretales y ropa. Diseño moderno y funcional que permite a los clientes conocer los servicios, realizar compras online y acceder a información sobre el cuidado de sus mascotas.",
    image: "/Captura%20de%20pantalla%202025-11-03%20174324.webp",
    url: "https://www.animalpath.com.ar/",
    category: "E-commerce",
    technologies: ["WordPress", "Elementor", "Diseño Responsivo", "SEO", "E-commerce"],
    client: "Animal Path",
    year: "2025"
  },
  {
    id: 7,
    title: "Mueblería Oficial",
    description: "Sitio web para negocio de mueblería desarrollado en WordPress. Catálogo de productos con diseño atractivo que muestra las diferentes líneas de muebles disponibles, facilitando la visualización y selección de productos para los clientes.",
    image: "/Captura%20de%20pantalla%202025-11-03%20174535.webp",
    url: "https://muebleria-oficial.ola.click/products",
    category: "E-commerce",
    technologies: ["WordPress", "Elementor", "Diseño Responsivo", "SEO", "E-commerce"],
    client: "Mueblería Oficial",
    year: "2025"
  },
  {
    id: 8,
    title: "ABO Colombia",
    description: "Empresa dedicada a la fabricación de forros industriales tenía la necesidad de una web para ofrecer sus diferentes servicios y generar más ventas.",
    image: "/Abo.webp",
    url: "https://abocolombia.com/",
    category: "Desarrollo Web",
    technologies: ["HTML", "CSS", "JavaScript"],
    client: "ABO Colombia",
    year: "2025",
  },
  {
    id: 9,
    title: "STL Gold Landscaping",
    description: "Un cliente de estados unidos tenía la necesidad de ofertar sus servicios y contar con una automatización que le permita atender sus clientes de mejor manera.",
    image: "/jardineria.webp",
    url: "https://stlgoldlandscaping.com/",
    category: "Desarrollo Web",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
    client: "STL Gold Landscaping",
    year: "2025",
  },
  {
    id: 10,
    title: "Koziura",
    description: "Sistema completo de gestión para granja desarrollado a la medida con numerosos módulos especializados. Incluye gestión de partos, registro de leche, control de movimientos, administración de proveedores y múltiples funcionalidades adicionales para la administración integral de una operación ganadera. Desarrollo de 2 meses.",
    image: "/koziura.webp",
    url: "",
    category: "Desarrollo Web",
    technologies: ["React", "Supabase"],
    client: "Koziura",
    year: "2025",
  },
  {
    id: 11,
    title: "Cuervo Tarot",
    description: "Landing page profesional para servicios de tarot y lectura de cartas. Diseño místico y envolvente desarrollado en React con experiencia de usuario optimizada para conversiones.",
    image: "/tarot.webp",
    url: "https://cuervotarot.com/",
    category: "Landing Page",
    technologies: ["React", "CSS3", "JavaScript", "UX Design"],
    client: "Cuervo Tarot",
    year: "2026"
  },
  {
    id: 12,
    title: "Remix Producciones",
    description: "Plataforma oficial para una empresa líder con más de 20 años de experiencia en Manizales y el Eje Cafetero. El sitio destaca sus servicios de sonido profesional, pantallas LED y logística de espectáculos mediante un diseño inmersivo y enfocado en SEO local.",
    image: "/Captura-de-pantalla-2026-03-22-222545.webp",
    url: "https://remixproducciones.com.co/",
    category: "Sitio Web Corporativo",
    technologies: ["React", "Vite", "Tailwind CSS", "SEO", "JSON-LD"],
    client: "Remix Producciones",
    year: "2026"
  },
  {
    id: 13,
    title: "Mágica Luna",
    description: "Sitio web oficial para un hotel glamping de alta gama. Enfocado en la optimización SEO y una experiencia de usuario inmersiva que refleja el branding del lugar.",
    image: "/Captura-de-pantalla-2026-03-22-223054.webp",
    url: "https://hotelglampingmagicaluna.com.co/",
    category: "Web Comercial",
    technologies: ["Vite", "React", "Shadcn UI", "TypeScript", "Bun"],
    client: "Mágica Luna",
    year: "2025"
  },
  {
    id: 14,
    title: "Estudio Ruarte",
    description: "Landing page profesional para firma de abogados. Diseño enfocado en la conversión y presentación de servicios legales.",
    image: "/Captura-de-pantalla-2026-03-22-224055.webp",
    url: "https://ruarte-ruarte.com/",
    category: "Landing Page",
    technologies: ["React", "CSS3", "JavaScript", "SEO Local"],
    client: "Estudio Ruarte",
    year: "2026"
  },
  {
    id: 15,
    title: "Konnect",
    description: "Plataforma oficial de servicios de conectividad e internet. Una solución robusta y moderna diseñada para ofrecer una experiencia de usuario fluida y profesional con alto rendimiento.",
    image: "/Captura-de-pantalla-2026-04-18-152926.webp",
    url: "https://konnectoficial.com/",
    category: "Plataforma Web",
    technologies: ["React", "Tailwind CSS", "Vite", "SEO"],
    client: "Konnect",
    year: "2026"
  },
  {
    id: 'hotel-palmalinda-demo',
    title: "Plantilla Web Hotel Boutique",
    description: "Demo de sitio web para hoteles campestres y hospedajes turísticos. Presenta habitaciones, tarifas y servicios, con un flujo de reservas directo por WhatsApp y estructura preparada para SEO local.",
    image: "/mv-portfolio/hotel-palmalinda.png",
    url: "", // la demo en Vercel devuelve 404 (revisado 2026-10-07)
    category: "Demo · Hotelería y turismo",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Local", "WhatsApp Booking"],
    client: "Demo Websy",
    year: "2026"
  },
  {
    id: 'semillamind',
    title: "SemillaMind Psicoterapia",
    description: "Sitio web informativo para un consultorio de psicología en Bogotá. Presenta consultas presenciales y virtuales, al equipo terapéutico y accesos directos para agendar, con diseño adaptable y optimización de imágenes.",
    image: "/mv-portfolio/semillamind.png",
    url: "https://semillamind.com.co/",
    category: "Salud mental y bienestar · Bogotá",
    technologies: ["React", "Vite", "Tailwind CSS", "SEO On-Page", "Accesibilidad"],
    client: "SemillaMind",
    year: "2026"
  },
  {
    id: 'entre-relatos-psicoterapia',
    title: "Entre Relatos Psicoterapia",
    description: "Sitio web para un consultorio de psicoterapia en Bogotá. Incluye un selector de sedes —La Castellana, Galerías o modalidad virtual— y contacto directo por WhatsApp para agendar la primera cita.",
    image: "/mv-portfolio/entre-relatos.png",
    url: "https://entrerelatospsicologia.com/",
    category: "Salud mental y psicoterapia · Bogotá",
    technologies: ["React", "Vite", "Tailwind CSS", "SEO On-Page", "Accesibilidad"],
    client: "Entre Relatos",
    year: "2026"
  },
  {
    id: 'farmadesk',
    title: "FarmaDesk Pharmacy System",
    description: "Sistema web para farmacias con punto de venta, control de inventario de medicamentos, alertas por stock bajo y reportes diarios. Incluye backend en Node.js y Express y base de datos PostgreSQL.",
    image: "/mv-portfolio/farmadesk.png",
    url: "https://cozy-eclair-1d409d.netlify.app/",
    category: "Sistema de gestión · Farmacias",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    client: "FarmaDesk",
    year: "2026"
  },
  {
    id: 'psicologa-estefany-lozano',
    title: "Psicóloga Estefany Lozano",
    description: "Plataforma para atención psicoterapéutica en línea por videollamada, dirigida a pacientes hispanohablantes. Presenta las áreas terapéuticas y facilita el agendamiento por WhatsApp, con SEO internacional y datos estructurados.",
    image: "/mv-portfolio/estefany-lozano.png",
    url: "https://psicologaestefanylozano.com/",
    category: "Terapia en línea · Internacional",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Internacional", "Schema.org"],
    client: "Psicóloga Estefany Lozano",
    year: "2026"
  },
  {
    id: 'lm-asociados-abogados-penalistas',
    title: "LM & Asociados Abogados Penalistas",
    description: "Sitio web para una firma penal con sede en Bogotá y cobertura nacional. Presenta servicios de defensa penal y consultas urgentes, con contacto por WhatsApp y SEO local respaldado por datos estructurados.",
    image: "/mv-portfolio/lm-asociados.png",
    url: "https://abogadopenalistacol.com/",
    category: "Servicios jurídicos · Derecho penal",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Local", "Schema.org"],
    client: "LM & Asociados",
    year: "2026"
  },
  {
    id: 'dra-nancy-melo',
    title: "Dra. Nancy Aseneth Melo — Despacho Jurídico",
    description: "Sitio web para un despacho jurídico en Cali con asesoría presencial y virtual. Expone sus servicios en derecho penal, justicia penal militar y derechos humanos, e incorpora un canal directo de consulta.",
    image: "/mv-portfolio/nancy-melo.png",
    url: "https://abogadanancymelo.com/",
    category: "Servicios jurídicos · Cali",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Local", "WhatsApp"],
    client: "Dra. Nancy Melo",
    year: "2026"
  }
];

// Casos con resultados medibles: inicio (tarjetas) y /casos-de-exito (por portfolioId).
// Pendiente de confirmar con Agustín: período del resultado de STL Gold, resultado del caso México
// y rubro de Konnect (en el portfolio figura como conectividad e internet).
export const caseResults = [
  {
    id: 'stl-gold',
    portfolioId: 9,
    client: 'STL Gold Landscaping',
    rubro: 'Paisajismo · Estados Unidos',
    what: 'Web de servicios con automatización para responder consultas',
    metric: '+USD 5.000',
    metricLabel: 'de aumento en facturación neta',
    period: null, // ej. 'en 3 meses' (lo pasa Agustín)
    details: ['40 consultas calificadas por mes', '5 clientes cerrados por mes'],
    url: 'https://stlgoldlandscaping.com/'
  },
  {
    id: 'regala-algo',
    portfolioId: 3,
    client: 'Regala Algo',
    rubro: 'E-commerce de regalos',
    what: 'Tienda online con panel de stock, pedidos y ventas',
    metric: '$2M ARS/mes',
    metricLabel: 'en ventas (~USD 1.000 por mes)',
    details: ['+3.000 productos activos en la tienda', 'Inversión inicial de USD 600'],
    url: 'https://regalaalgosrl.com/'
  },
  {
    id: 'konnect',
    portfolioId: 15,
    client: 'Konnect',
    rubro: 'Importación y distribución Latam',
    what: 'Plataforma web y canal de venta digital',
    metric: 'ROI en 2 semanas',
    metricLabel: 'recuperaron la inversión inicial',
    details: ['+100 productos traídos a Latinoamérica'],
    url: 'https://konnectoficial.com/'
  },
  {
    id: 'bicicletas-mx',
    portfolioId: 'bicicletas-mx',
    client: 'Bicicletería en México',
    rubro: 'Bicicletas · México',
    what: 'Sistema de gestión para 4 sucursales + tienda online',
    metric: '4 sucursales',
    metricLabel: 'en un solo sistema, con tienda online integrada',
    details: ['Sistema de gestión compartido por las 4 sucursales', 'Tienda online conectada al sistema'],
    url: null
  }
];

// Testimonios de clientes reales (los pasa Agustín). Se muestran junto a las reseñas de Google en el inicio.
// Formato: { name: 'Nombre Apellido', company: 'Empresa · Rubro', text: 'Testimonio textual' }
export const clientTestimonials = [];

// Datos de contacto que usa /contacto (la fuente es CONTACT en siteConfig.js)
export const companyInfo = {
  location: CONTACT.location,
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
};
