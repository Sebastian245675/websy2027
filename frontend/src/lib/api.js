// Cliente de la API de consultas (leads-api, en el mismo servidor que el sitio, bajo /api/).
// Los formularios guardan acá cada consulta y el panel (/panel) la lee con su sesión.

const API = '/api';

const request = async (path, { method = 'GET', body } = {}) => {
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || `Error ${res.status}`), { status: res.status });
  return data;
};

// Formulario del sitio. Agrega la página de origen; `source` dice qué formulario fue.
export const saveLead = (lead) => request('/leads', {
  method: 'POST',
  body: { page: window.location.pathname, ...lead },
});

// Reseñas del sitio: se mandan pendientes y solo se ven las que se aprueban desde el panel
export const reviews = {
  list: () => request('/reviews'),
  send: (review) => request('/reviews', { method: 'POST', body: { page: window.location.pathname, ...review } }),
};

// Clic a WhatsApp: no debe frenar la apertura de WhatsApp ni fallar si la API no responde.
// sendBeacon sobrevive a que la pestaña cambie de página; va como text/plain porque un fetch con
// keepalive y JSON necesita preflight, y varios navegadores no lo soportan (el clic se perdía).
export const logWhatsAppClick = (location) => {
  if (typeof window === 'undefined' || navigator.userAgent.includes('ReactSnap')) return;
  const url = `${API}/whatsapp-clicks`;
  const payload = JSON.stringify({ location, page: window.location.pathname, referrer: document.referrer });
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([payload], { type: 'text/plain' }))) return;
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: payload }).catch(() => {});
  } catch {
    // nada: el registro es secundario
  }
};

export const panel = {
  session: () => request('/panel/session'),
  login: (password) => request('/panel/login', { method: 'POST', body: { password } }),
  logout: () => request('/panel/logout', { method: 'POST', body: {} }),
  leads: () => request('/panel/leads'),
  updateLead: (id, changes) => request(`/panel/leads/${id}`, { method: 'PATCH', body: changes }),
  deleteLead: (id) => request(`/panel/leads/${id}`, { method: 'DELETE' }),
  whatsappClicks: () => request('/panel/whatsapp-clicks'),
  archive: () => request('/panel/archive'),
  outreach: () => request('/panel/outreach'),
  outreachMessages: (key) => request(`/panel/outreach/messages?key=${encodeURIComponent(key)}`),
  saveOutreachMessage: (key, mensaje, asunto) => request('/panel/outreach/message', { method: 'PUT', body: { key, mensaje, asunto } }),
  reviews: () => request('/panel/reviews'),
  updateReview: (id, status) => request(`/panel/reviews/${id}`, { method: 'PATCH', body: { status } }),
  deleteReview: (id) => request(`/panel/reviews/${id}`, { method: 'DELETE' }),
  pool: () => request('/panel/pool'),
  updatePool: (id, changes) => request(`/panel/pool/${encodeURIComponent(id)}`, { method: 'PATCH', body: changes }),
};
