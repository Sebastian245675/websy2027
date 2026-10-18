// Eventos de conversión para GA4, píxel de Meta y píxel de TikTok.
// Los píxeles se cargan en public/index.html solo si REACT_APP_META_PIXEL_ID / REACT_APP_TIKTOK_PIXEL_ID
// están definidos; si no, estas funciones no hacen nada en esa plataforma.
//
// Eventos GA4 (marcarlos como "eventos clave" en GA4 > Administrar > Eventos):
//   click_whatsapp               · clic en cualquier link o botón de WhatsApp (link_location = dónde)
//   envio_formulario_contacto    · envío del formulario de contacto o de contacto rápido
//   envio_formulario_auditoria   · envío del formulario de auditoría

import { whatsappUrl } from '../siteConfig';

const gaEvent = (name, params) => {
  if (window.gtag) window.gtag('event', name, params);
};

const metaTrack = (event, params) => {
  if (window.fbq) window.fbq('track', event, params);
};

const tiktokTrack = (event, params) => {
  if (window.ttq) window.ttq.track(event, params);
};

// Cada clic a WhatsApp queda en Firestore (colección whatsapp_clicks) para verlo en el panel (/panel) junto
// a los formularios. Va por la API REST con keepalive para no cargar el SDK de Firebase ni frenar la apertura
// de WhatsApp. Las reglas de Firestore permiten crear estos documentos pero solo leerlos con sesión de admin.
const FIRESTORE_REST = 'https://firestore.googleapis.com/v1/projects/multinivel-c0bcd/databases/(default)/documents';
const FIREBASE_WEB_KEY = 'AIzaSyAX0_2aSXzeFGDX732mNBKYTnsIzqvHDI4';
const logWhatsAppClick = (location) => {
  if (typeof window === 'undefined' || navigator.userAgent.includes('ReactSnap') || window.location.hostname === 'localhost') return;
  const str = (v) => ({ stringValue: String(v || '').slice(0, 300) });
  try {
    fetch(`${FIRESTORE_REST}/whatsapp_clicks?key=${FIREBASE_WEB_KEY}`, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          location: str(location),
          page: str(window.location.pathname),
          referrer: str(document.referrer),
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    }).catch(() => {});
  } catch {
    // El registro nunca debe impedir que se abra WhatsApp
  }
};

export const trackWhatsAppClick = (location) => {
  logWhatsAppClick(location);
  gaEvent('click_whatsapp', { link_location: location });
  metaTrack('Contact', { content_name: location });
  tiktokTrack('Contact', { content_name: location });
};

// form: 'contacto' | 'contacto_rapido' | 'auditoria' | 'landing_<nicho>'
export const trackFormSubmit = (form) => {
  const isAudit = form === 'auditoria' || form.startsWith('landing_');
  gaEvent(isAudit ? 'envio_formulario_auditoria' : 'envio_formulario_contacto', { form_name: form });
  metaTrack('Lead', { content_name: form });
  tiktokTrack('SubmitForm', { content_name: form });
};

// Page views en navegación SPA (la primera la envía el snippet de cada píxel en index.html)
export const trackPageView = () => {
  if (window.fbq) window.fbq('track', 'PageView');
  if (window.ttq) window.ttq.page();
};

// Todo mensaje de WhatsApp lleva la página desde donde se escribió: así cada consulta queda con su origen
// aunque el visitante borre el texto sugerido, y se puede medir qué páginas traen clientes.
const ORIGIN_MARK = '(Página: ';
export const withOrigin = (url) => {
  try {
    const u = new URL(url);
    const text = u.searchParams.get('text') || '';
    if (text.includes(ORIGIN_MARK)) return url;
    const page = `websysrl.com${window.location.pathname === '/' ? '' : window.location.pathname}`;
    u.searchParams.set('text', `${text}${text ? '\n\n' : ''}${ORIGIN_MARK}${page})`);
    return u.toString();
  } catch {
    return url;
  }
};

export const openWhatsApp = (text, location) => {
  trackWhatsAppClick(location);
  window.open(withOrigin(whatsappUrl(text)), '_blank', 'noopener,noreferrer');
};

// Cualquier <a href="https://wa.me/..."> del sitio (incluidos los del blog) cuenta como clic a WhatsApp
// y se le agrega la página de origen al mensaje justo antes de abrirlo.
// data-wa-location en el link indica dónde está; si no, se usa la ruta actual.
export const installWhatsAppLinkTracking = () => {
  const handler = (e) => {
    const link = e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if (!link) return;
    trackWhatsAppClick(link.dataset.waLocation || window.location.pathname);
    link.href = withOrigin(link.href);
  };
  document.addEventListener('click', handler, true);
  return () => document.removeEventListener('click', handler, true);
};

// Clic en "Agendar llamada" (marcar agendar_llamada como evento clave en GA4)
export const trackBookingClick = (location) => {
  gaEvent('agendar_llamada', { link_location: location });
  metaTrack('Schedule', { content_name: location });
  tiktokTrack('Contact', { content_name: location });
};
