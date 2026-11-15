// API de consultas de websysrl.com: recibe los formularios y los clics a WhatsApp del sitio y sirve los
// datos al panel (/panel). El proxy nginx manda acá todo lo que empieza con /api/.
//
// Público (sin sesión, con límite por IP):
//   POST /api/leads              formulario del sitio
//   POST /api/whatsapp-clicks    clic en un botón o link de WhatsApp
// Panel (cookie de sesión):
//   POST /api/panel/login {password}   ·  POST /api/panel/logout  ·  GET /api/panel/session
//   GET /api/panel/leads  ·  PATCH /api/panel/leads/:id {status, note}  ·  DELETE /api/panel/leads/:id
//   GET /api/panel/whatsapp-clicks  ·  GET /api/panel/archive
//   GET /api/panel/outreach  ·  GET /api/panel/outreach/messages?key=…   (centro de prospección)
// Servidores de campaña (token X-Outreach-Token = OUTREACH_TOKEN):
//   POST /api/outreach/ingest {prospects: [...], messages: [...]}
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const PORT = Number(process.env.PORT || 4100);
const PANEL_PASSWORD = process.env.PANEL_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!PANEL_PASSWORD || !SESSION_SECRET) {
  console.error('Faltan PANEL_PASSWORD o SESSION_SECRET en el entorno');
  process.exit(1);
}
const SECURE_COOKIE = process.env.COOKIE_SECURE !== 'false';
const SESSION_DAYS = 7;

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: Number(process.env.PG_POOL_MAX || 10) });

const STATUSES = ['nuevo', 'contactado', 'reunion', 'propuesta', 'ganado', 'perdido', 'spam'];
const LEAD_FIELDS = { name: 200, phone: 60, email: 200, country: 80, website: 300, rubro: 200, projectType: 200, budget: 200, source: 80, page: 300, message: 5000 };

// ---------- utilidades ----------

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(body === undefined ? '' : JSON.stringify(body));
};

// Solo JSON: un formulario HTML de otro sitio no puede mandar application/json sin pasar por CORS.
// allowText: para el sendBeacon de los clics a WhatsApp, que solo puede mandar text/plain sin preflight.
const readJson = (req, max = 20000, allowText = false) => new Promise((resolve, reject) => {
  if (!(allowText ? /application\/json|text\/plain/ : /application\/json/).test(req.headers['content-type'] || '')) return reject(Object.assign(new Error('JSON requerido'), { status: 415 }));
  let size = 0;
  const chunks = [];
  req.on('data', (c) => {
    size += c.length;
    if (size > max) {
      reject(Object.assign(new Error('Cuerpo demasiado grande'), { status: 413 }));
      req.destroy();
    } else chunks.push(c);
  });
  req.on('end', () => {
    try {
      resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
    } catch {
      reject(Object.assign(new Error('JSON inválido'), { status: 400 }));
    }
  });
  req.on('error', reject);
});

const str = (v, max) => (v === undefined || v === null || v === '' ? null : String(v).slice(0, max));
// El proxy nginx pone la IP real del visitante en X-Real-IP
const clientIp = (req) => req.headers['x-real-ip'] || req.socket.remoteAddress || '';

// Límite simple en memoria: N pedidos por ventana por IP
const buckets = new Map();
const allow = (key, max, windowMs) => {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= max;
};
setInterval(() => {
  const now = Date.now();
  for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k);
}, 10 * 60 * 1000).unref();

// ---------- sesión del panel ----------
// Token firmado sin estado: expiración + firma HMAC. La clave de firma incluye la contraseña, así cambiar
// PANEL_PASSWORD cierra todas las sesiones abiertas.
const signingKey = crypto.createHash('sha256').update(`${SESSION_SECRET}:${PANEL_PASSWORD}`).digest();
const sign = (payload) => crypto.createHmac('sha256', signingKey).update(payload).digest('base64url');
const newSession = () => {
  const exp = String(Date.now() + SESSION_DAYS * 864e5);
  return `${exp}.${sign(exp)}`;
};
const validSession = (req) => {
  const m = (req.headers.cookie || '').match(/(?:^|;\s*)websy_panel=([^;]+)/);
  if (!m) return false;
  const [exp, sig] = m[1].split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  return sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
};
const sessionCookie = (value, maxAge) => `websy_panel=${value}; Path=/api/panel; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${SECURE_COOKIE ? '; Secure' : ''}`;

// Contraseña: comparación en tiempo constante y bloqueo de 15 minutos tras 5 intentos fallidos por IP
const failures = new Map();
const LOCK_AFTER = 5;
const LOCK_MS = 15 * 60 * 1000;
const passwordOk = (given) => {
  const a = crypto.createHash('sha256').update(String(given || '')).digest();
  const b = crypto.createHash('sha256').update(PANEL_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
};

// ---------- aviso por email (opcional) ----------
// Con SENDGRID_API_KEY, NOTIFY_FROM y NOTIFY_TO definidos, cada formulario nuevo manda un email.
const notify = async (lead) => {
  const { SENDGRID_API_KEY, NOTIFY_FROM, NOTIFY_TO } = process.env;
  if (!SENDGRID_API_KEY || !NOTIFY_FROM || !NOTIFY_TO) return;
  const lines = [
    `Nombre: ${lead.name || '—'}`, `WhatsApp: ${lead.phone || '—'}`, `País: ${lead.country || '—'}`,
    `Qué necesita: ${lead.project_type || '—'}`, `Presupuesto: ${lead.budget || '—'}`,
    `Fuente: ${lead.source || '—'} · Página: ${lead.page || '—'}`, '', lead.message || '',
    '', 'Panel: https://www.websysrl.com/panel',
  ];
  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: NOTIFY_TO.split(',').map((email) => ({ email: email.trim() })) }],
        from: { email: NOTIFY_FROM },
        subject: `Nueva consulta en websysrl.com: ${lead.name || 'sin nombre'}`,
        content: [{ type: 'text/plain', value: lines.join('\n') }],
      }),
    });
  } catch (err) {
    console.error('No se pudo enviar el aviso por email:', err.message);
  }
};

// ---------- prospección ----------
// Los servidores de campaña (WhatsApp, correo) mandan su estado completo y los mensajes nuevos.
const OUTREACH_TOKEN = process.env.OUTREACH_TOKEN || '';
const OUTREACH_STATES = ['programado', 'enviado', 'respondio', 'interesado', 'reunion', 'no_interesado', 'requiere_humano', 'sin_whatsapp', 'rebote', 'baja', 'cliente'];
const tokenOk = (given) => {
  if (!OUTREACH_TOKEN) return false;
  const a = crypto.createHash('sha256').update(String(given || '')).digest();
  const b = crypto.createHash('sha256').update(OUTREACH_TOKEN).digest();
  return crypto.timingSafeEqual(a, b);
};
const ts = (v) => (v ? new Date(v) : null);

// ---------- rutas ----------

const leadRow = (r) => ({
  id: String(r.id), createdAt: r.created_at, updatedAt: r.updated_at, status: r.status, name: r.name, phone: r.phone,
  email: r.email, country: r.country, website: r.website, rubro: r.rubro, projectType: r.project_type, budget: r.budget,
  source: r.source, page: r.page, message: r.message, note: r.note, reunionAt: r.reunion_at, extra: r.extra,
});

const routes = {
  'POST /api/leads': async (req, res) => {
    if (!allow(`lead:${clientIp(req)}`, 20, 60 * 60 * 1000)) return send(res, 429, { error: 'Demasiados envíos, intenta más tarde' });
    const body = await readJson(req);
    // Campo trampa para bots: los visitantes reales no lo ven
    if (body.company_website) return send(res, 201, { ok: true });
    const v = {};
    for (const [k, max] of Object.entries(LEAD_FIELDS)) v[k] = str(body[k], max);
    v.phone = v.phone || str(body.whatsapp, 60);
    if (!v.name && !v.phone && !v.email) return send(res, 400, { error: 'Falta nombre o forma de contacto' });
    const { rows } = await pool.query(
      `INSERT INTO leads (name, phone, email, country, website, rubro, project_type, budget, source, page, message, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [v.name, v.phone, v.email, v.country, v.website, v.rubro, v.projectType, v.budget, v.source, v.page, v.message, str(req.headers['user-agent'], 300)],
    );
    notify(rows[0]);
    send(res, 201, { ok: true, id: String(rows[0].id) });
  },

  'POST /api/whatsapp-clicks': async (req, res) => {
    if (!allow(`wa:${clientIp(req)}`, 120, 60 * 60 * 1000)) return send(res, 429, { error: 'Demasiados pedidos' });
    const body = await readJson(req, 4000, true);
    await pool.query('INSERT INTO whatsapp_clicks (location, page, referrer) VALUES ($1,$2,$3)', [str(body.location, 300), str(body.page, 300), str(body.referrer, 300)]);
    send(res, 201, { ok: true });
  },

  'POST /api/panel/login': async (req, res) => {
    const ip = clientIp(req);
    const f = failures.get(ip);
    if (f && f.count >= LOCK_AFTER && Date.now() < f.until) {
      return send(res, 429, { error: `Demasiados intentos. Prueba de nuevo en ${Math.ceil((f.until - Date.now()) / 60000)} minutos.` });
    }
    const body = await readJson(req, 2000);
    if (!passwordOk(body.password)) {
      const count = (f && Date.now() < f.until ? f.count : 0) + 1;
      failures.set(ip, { count, until: Date.now() + LOCK_MS });
      return send(res, 401, { error: 'Contraseña incorrecta' });
    }
    failures.delete(ip);
    send(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie(newSession(), SESSION_DAYS * 86400) });
  },

  'POST /api/panel/logout': async (req, res) => send(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) }),

  'GET /api/panel/session': async (req, res) => send(res, 200, { ok: validSession(req) }),

  'GET /api/panel/leads': async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5000');
    send(res, 200, rows.map(leadRow));
  },

  'PATCH /api/panel/leads/:id': async (req, res, id) => {
    const body = await readJson(req);
    const sets = [];
    const vals = [];
    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status)) return send(res, 400, { error: 'Estado inválido' });
      vals.push(body.status);
      sets.push(`status = $${vals.length}`);
      // La primera vez que pasa a "reunión" cuenta para la meta semanal
      if (body.status === 'reunion') sets.push('reunion_at = COALESCE(reunion_at, now())');
    }
    if (body.note !== undefined) {
      vals.push(str(body.note, 5000));
      sets.push(`note = $${vals.length}`);
    }
    if (!sets.length) return send(res, 400, { error: 'Nada para actualizar' });
    vals.push(id);
    const { rows } = await pool.query(`UPDATE leads SET ${sets.join(', ')}, updated_at = now() WHERE id = $${vals.length} RETURNING *`, vals);
    if (!rows.length) return send(res, 404, { error: 'No existe' });
    send(res, 200, leadRow(rows[0]));
  },

  'DELETE /api/panel/leads/:id': async (req, res, id) => {
    const { rowCount } = await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    send(res, rowCount ? 200 : 404, { ok: !!rowCount });
  },

  'GET /api/panel/whatsapp-clicks': async (req, res) => {
    const { rows } = await pool.query("SELECT id, created_at, location, page, referrer FROM whatsapp_clicks WHERE created_at > now() - interval '180 days' ORDER BY created_at DESC LIMIT 20000");
    send(res, 200, rows.map((r) => ({ id: String(r.id), createdAt: r.created_at, location: r.location, page: r.page, referrer: r.referrer })));
  },

  'POST /api/outreach/ingest': async (req, res) => {
    if (!tokenOk(req.headers['x-outreach-token'])) return send(res, 401, { error: 'Token inválido' });
    const body = await readJson(req, 4_000_000);
    const prospects = Array.isArray(body.prospects) ? body.prospects.slice(0, 5000) : [];
    const messages = Array.isArray(body.messages) ? body.messages.slice(0, 5000) : [];
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const p of prospects) {
        const key = str(p.key, 300);
        if (!key) continue;
        const estado = OUTREACH_STATES.includes(p.estado) ? p.estado : 'programado';
        await client.query(
          `INSERT INTO outreach_prospects (key, canal, campana, pais, nombre, contacto, web, estado, programado_para, enviado_at, respondio_at, reunion, ultimo_at, extra, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, now())
           ON CONFLICT (key) DO UPDATE SET canal=$2, campana=$3, pais=$4, nombre=$5, contacto=$6, web=$7, estado=$8,
             programado_para=$9, enviado_at=$10, respondio_at=$11, reunion=$12, ultimo_at=$13, extra=$14, updated_at=now()`,
          [key, str(p.canal, 20) || 'whatsapp', str(p.campana, 80), str(p.pais, 10), str(p.nombre, 300), str(p.contacto, 300), str(p.web, 500), estado,
            p.programado_para || null, ts(p.enviado_at), ts(p.respondio_at), str(p.reunion, 300), ts(p.ultimo_at), p.extra && typeof p.extra === 'object' ? p.extra : {}],
        );
      }
      let inserted = 0;
      for (const m of messages) {
        const key = str(m.key, 300);
        if (!key || !m.at) continue;
        const r = await client.query(
          `INSERT INTO outreach_messages (prospect_key, ext_id, at, de, tipo, texto) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (ext_id) DO NOTHING`,
          [key, str(m.id, 300), ts(m.at), str(m.de, 20) || 'sistema', str(m.tipo, 20) || 'mensaje', str(m.texto, 20000)],
        );
        inserted += r.rowCount;
      }
      await client.query('COMMIT');
      send(res, 200, { ok: true, prospects: prospects.length, messages: inserted });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  'GET /api/panel/outreach': async (req, res) => {
    const [prospects, porDia, respuestasDia] = await Promise.all([
      pool.query(`SELECT p.*, (SELECT texto FROM outreach_messages m WHERE m.prospect_key = p.key AND m.de = 'prospecto' ORDER BY at DESC LIMIT 1) AS ultima_respuesta,
                         (SELECT count(*)::int FROM outreach_messages m WHERE m.prospect_key = p.key) AS mensajes
                  FROM outreach_prospects p ORDER BY COALESCE(p.ultimo_at, p.enviado_at, p.updated_at) DESC LIMIT 5000`),
      pool.query(`SELECT canal, to_char(date_trunc('day', enviado_at AT TIME ZONE 'America/Bogota'), 'YYYY-MM-DD') AS dia, count(*)::int AS n
                  FROM outreach_prospects WHERE enviado_at > now() - interval '45 days' GROUP BY 1, 2`),
      pool.query(`SELECT canal, to_char(date_trunc('day', respondio_at AT TIME ZONE 'America/Bogota'), 'YYYY-MM-DD') AS dia, count(*)::int AS n
                  FROM outreach_prospects WHERE respondio_at > now() - interval '45 days' GROUP BY 1, 2`),
    ]);
    send(res, 200, {
      prospects: prospects.rows.map((r) => ({
        key: r.key, canal: r.canal, campana: r.campana, pais: r.pais, nombre: r.nombre, contacto: r.contacto, web: r.web, estado: r.estado,
        programadoPara: r.programado_para, enviadoAt: r.enviado_at, respondioAt: r.respondio_at, reunion: r.reunion, ultimoAt: r.ultimo_at,
        ultimaRespuesta: r.ultima_respuesta, mensajes: r.mensajes, extra: r.extra,
      })),
      enviosPorDia: porDia.rows,
      respuestasPorDia: respuestasDia.rows,
    });
  },

  'GET /api/panel/outreach/messages': async (req, res) => {
    const key = new URL(req.url, 'http://x').searchParams.get('key');
    if (!key) return send(res, 400, { error: 'Falta key' });
    const { rows } = await pool.query('SELECT id, at, de, tipo, texto FROM outreach_messages WHERE prospect_key = $1 ORDER BY at, id LIMIT 2000', [key]);
    send(res, 200, rows.map((r) => ({ id: String(r.id), at: r.at, de: r.de, tipo: r.tipo, texto: r.texto })));
  },

  'GET /api/panel/archive': async (req, res) => {
    const counts = await pool.query('SELECT collection, count(*)::int AS n, min(created_at) AS desde, max(created_at) AS hasta FROM firestore_archive GROUP BY collection ORDER BY collection');
    const latest = await pool.query(`SELECT collection, firestore_id, created_at, data FROM (
      SELECT *, row_number() OVER (PARTITION BY collection ORDER BY created_at DESC NULLS LAST) AS rn FROM firestore_archive
    ) t WHERE rn <= 50 ORDER BY collection, created_at DESC NULLS LAST`);
    send(res, 200, { collections: counts.rows, latest: latest.rows });
  },
};

const match = (method, url) => {
  const p = url.split('?')[0].replace(/\/+$/, '');
  if (routes[`${method} ${p}`]) return [routes[`${method} ${p}`]];
  const m = p.match(/^(\/api\/panel\/leads)\/(\d+)$/);
  if (m && routes[`${method} ${m[1]}/:id`]) return [routes[`${method} ${m[1]}/:id`], m[2]];
  return null;
};

const server = http.createServer(async (req, res) => {
  const found = match(req.method, req.url);
  if (!found) return send(res, 404, { error: 'No encontrado' });
  const [handler, id] = found;
  if (req.url.startsWith('/api/panel/') && !/^\/api\/panel\/(login|logout|session)/.test(req.url) && !validSession(req)) {
    return send(res, 401, { error: 'Sesión vencida' });
  }
  try {
    await handler(req, res, id);
  } catch (err) {
    if (err.status) return send(res, err.status, { error: err.message });
    console.error(req.method, req.url, err);
    send(res, 500, { error: 'Error interno' });
  }
});

const start = async () => {
  // Espera a que PostgreSQL acepte conexiones (en docker compose arranca en paralelo)
  for (let i = 1; ; i += 1) {
    try {
      await pool.query(fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8'));
      break;
    } catch (err) {
      if (i >= 30) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  server.listen(PORT, () => console.log(`websy-leads-api escuchando en :${PORT}`));
};

if (require.main === module) start().catch((err) => { console.error(err); process.exit(1); });

module.exports = { server, pool, start };
