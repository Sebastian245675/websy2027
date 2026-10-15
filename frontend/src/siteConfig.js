// Datos de negocio que se repiten en todo el sitio. Se cambian acá, no en cada componente.

export const CONTACT = {
  email: 'administracion@websysrl.com',
  phoneDisplay: '+54 9 388 484-6695',
  whatsapp: '5493884846695',
  location: 'Salta, Argentina',
  address: 'San Luis 2105, Salta',
};

export const whatsappUrl = (text) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const SOCIAL = [
  { name: 'Instagram', url: 'https://www.instagram.com/websyar' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/18nU64kL9y/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@websyar' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/websy-dev' },
];

// Foto real de Agustín o del equipo para la sección de contacto del inicio (punto 21).
// Mientras sea null se muestra el panel de datos de contacto en lugar de una foto de banco.
export const CONTACT_PHOTO = null;

export const COUNTRIES = [
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'MX', name: 'México', dial: '+52' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'PE', name: 'Perú', dial: '+51' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'ES', name: 'España', dial: '+34' },
  { code: 'US', name: 'Estados Unidos', dial: '+1' },
  { code: 'OT', name: 'Otro país', dial: '' },
];

// Formulario de contacto de 4 campos (auditoría SEO y conversión, oct-2026): qué necesita y presupuesto
// aproximado. El presupuesto filtra a las empresas que pueden pagar el proyecto.
export const PROJECT_NEEDS = ['Página web', 'Tienda online', 'Sistema de gestión', 'Automatización con IA', 'App móvil', 'Otro'];
export const BUDGET_RANGES = ['Menos de USD 800', 'USD 800 a 1.500', 'USD 1.500 a 3.500', 'Más de USD 3.500', 'Todavía no sé'];

// Rubros reales trabajados (franja "Portafolio por rubro" y selector de la auditoría)
export const RUBROS = [
  'Inmobiliarias',
  'Estudios jurídicos',
  'Logística',
  'Perfumería',
  'Seguridad industrial',
  'Gastronomía',
  'Veterinaria',
  'Salud mental',
  'Farmacias',
  'Mueblería',
];

// Plan destacado en /planes (punto 5). Lo define Agustín: id del plan que más se vende
// ('estandar' | 'comercio' | 'pymes' | 'corpo'). null = ninguno destacado.
export const HIGHLIGHTED_PLAN_ID = null;

// Link de agenda para videollamadas (Cal.com, Calendly o Google Calendar "citas").
// Mientras sea null, el botón "Agendar llamada" abre WhatsApp con el pedido de reunión ya escrito.
export const BOOKING_URL = null;

export const bookingUrl = (context) =>
  BOOKING_URL || whatsappUrl(`Hola! Quiero agendar una llamada de 20 minutos para hablar de mi proyecto${context ? ` (vi ${context})` : ''}.`);
