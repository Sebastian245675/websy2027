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

export const trackWhatsAppClick = (location) => {
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

export const openWhatsApp = (text, location) => {
  trackWhatsAppClick(location);
  window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
};

// Cualquier <a href="https://wa.me/..."> del sitio (incluidos los del blog) cuenta como clic a WhatsApp.
// data-wa-location en el link indica dónde está; si no, se usa la ruta actual.
export const installWhatsAppLinkTracking = () => {
  const handler = (e) => {
    const link = e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if (link) trackWhatsAppClick(link.dataset.waLocation || window.location.pathname);
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
