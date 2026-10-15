// País del visitante, sin pedir permisos ni llamar a servicios externos.
//
// Orden: la elección explícita del visitante (visitó /colombia, /mexico...) > zona horaria del navegador >
// región del idioma (es-CO). La zona horaria es lo más fiable en Latinoamérica: muchos navegadores
// colombianos o mexicanos dicen "es-419" o "es-ES" en el idioma, pero la hora es la del país.
//
// Los buscadores y el prerender (react-snap) no se personalizan: siempre ven la versión por defecto,
// y cada versión por país tiene su propia URL con hreflang. Así no hay contenido distinto por IP
// para el mismo URL (lo que Google puede tratar como cloaking).

const STORAGE_KEY = 'websy_country';

const TIMEZONES = {
  CO: ['America/Bogota'],
  MX: ['America/Mexico_City', 'America/Cancun', 'America/Merida', 'America/Monterrey', 'America/Matamoros',
    'America/Chihuahua', 'America/Ciudad_Juarez', 'America/Ojinaga', 'America/Mazatlan', 'America/Bahia_Banderas',
    'America/Hermosillo', 'America/Tijuana'],
  US: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix',
    'America/Anchorage', 'America/Detroit', 'America/Boise', 'America/Juneau', 'America/Puerto_Rico', 'Pacific/Honolulu'],
  CL: ['America/Santiago', 'America/Punta_Arenas'],
  PE: ['America/Lima'],
  UY: ['America/Montevideo'],
  PY: ['America/Asuncion'],
  BO: ['America/La_Paz'],
  EC: ['America/Guayaquil'],
  VE: ['America/Caracas'],
  ES: ['Europe/Madrid', 'Atlantic/Canary'],
};

const BOT_UA = /bot|crawl|spider|slurp|google|bing|yandex|baidu|duckduck|facebookexternalhit|lighthouse|headless|prerender|reactsnap|inspectiontool|preview/i;

export const isBot = () => typeof navigator === 'undefined' || BOT_UA.test(navigator.userAgent || '');

const fromTimezone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('America/Argentina/') || tz === 'America/Buenos_Aires') return 'AR';
    if (tz.startsWith('America/Indiana/') || tz.startsWith('America/Kentucky/') || tz.startsWith('America/North_Dakota/')) return 'US';
    return Object.keys(TIMEZONES).find((code) => TIMEZONES[code].includes(tz)) || null;
  } catch {
    return null;
  }
};

const fromLanguage = () => {
  const langs = (typeof navigator !== 'undefined' && (navigator.languages || [navigator.language])) || [];
  for (const lang of langs) {
    const region = (lang || '').split('-')[1];
    if (region && /^[A-Z]{2}$/i.test(region)) return region.toUpperCase();
  }
  return null;
};

export const savedCountry = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

// Se guarda cuando el visitante entra a una versión por país: es una elección explícita
export const saveCountry = (code) => {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // modo privado o almacenamiento bloqueado: la detección sigue funcionando sin recordar la elección
  }
};

// Código ISO de 2 letras, o null para buscadores, prerender o si no se pudo detectar
export const detectCountry = () => {
  if (isBot()) return null;
  return savedCountry() || fromTimezone() || fromLanguage();
};
