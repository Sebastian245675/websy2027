// Pruebas de punta a punta contra un PostgreSQL real (DATABASE_URL). Borra las tablas de esa base:
// usar una base de prueba, nunca la de producción.
//   DATABASE_URL=postgres://... npm test
const test = require('node:test');
const assert = require('node:assert');

process.env.PANEL_PASSWORD = '123456789';
process.env.SESSION_SECRET = 'secreto-de-prueba';
process.env.COOKIE_SECURE = 'false';
process.env.PORT = '4199';
const { server, pool, start } = require('../src/server');

const BASE = 'http://127.0.0.1:4199/api';
let cookie = '';
const call = async (path, { method = 'GET', body, ip = '10.0.0.1', auth = true } = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), 'X-Real-IP': ip, ...(auth && cookie ? { Cookie: cookie } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json().catch(() => null), headers: res.headers };
};

test.before(async () => {
  await pool.query('DROP TABLE IF EXISTS leads, whatsapp_clicks, firestore_archive');
  await start();
});
test.after(async () => {
  server.close();
  await pool.end();
});

test('un formulario se guarda con su página y fuente', async () => {
  const r = await call('/leads', { method: 'POST', body: { name: 'Ana', phone: '+57 300 000 0000', projectType: 'Landing page', source: 'contacto', page: '/contacto', message: 'Hola' } });
  assert.strictEqual(r.status, 201);
  const { rows } = await pool.query('SELECT * FROM leads');
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].status, 'nuevo');
  assert.strictEqual(rows[0].source, 'contacto');
  assert.strictEqual(rows[0].page, '/contacto');
});

test('rechaza formularios sin contacto, sin JSON o con el campo trampa', async () => {
  assert.strictEqual((await call('/leads', { method: 'POST', body: { message: 'sin datos' } })).status, 400);
  const raw = await fetch(`${BASE}/leads`, { method: 'POST', body: 'name=x', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  assert.strictEqual(raw.status, 415);
  assert.strictEqual((await call('/leads', { method: 'POST', body: { name: 'Bot', company_website: 'x' } })).status, 201);
  const { rows } = await pool.query("SELECT count(*)::int AS n FROM leads WHERE name = 'Bot'");
  assert.strictEqual(rows[0].n, 0);
});

test('registra clics a WhatsApp', async () => {
  assert.strictEqual((await call('/whatsapp-clicks', { method: 'POST', body: { location: 'cali_hero', page: '/colombia/desarrollo-web-cali' } })).status, 201);
});

test('el panel exige sesión', async () => {
  assert.strictEqual((await call('/panel/leads', { auth: false })).status, 401);
  assert.strictEqual((await call('/panel/session', { auth: false })).body.ok, false);
});

test('contraseña incorrecta no entra y bloquea la IP al quinto intento', async () => {
  for (let i = 0; i < 5; i += 1) assert.strictEqual((await call('/panel/login', { method: 'POST', body: { password: 'mal' }, ip: '10.9.9.9' })).status, 401);
  // Ya bloqueada: ni la contraseña correcta entra desde esa IP
  assert.strictEqual((await call('/panel/login', { method: 'POST', body: { password: '123456789' }, ip: '10.9.9.9' })).status, 429);
});

test('con la contraseña correcta se ven, editan y borran las consultas', async () => {
  const login = await call('/panel/login', { method: 'POST', body: { password: '123456789' } });
  assert.strictEqual(login.status, 200);
  const setCookie = login.headers.get('set-cookie');
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  cookie = setCookie.split(';')[0];

  const leads = await call('/panel/leads');
  assert.strictEqual(leads.status, 200);
  assert.strictEqual(leads.body.length, 1);
  const id = leads.body[0].id;

  const updated = await call(`/panel/leads/${id}`, { method: 'PATCH', body: { status: 'reunion', note: 'Llamar el lunes' } });
  assert.strictEqual(updated.body.status, 'reunion');
  assert.strictEqual(updated.body.note, 'Llamar el lunes');
  assert.ok(updated.body.reunionAt, 'pasar a reunión marca la fecha para la meta semanal');
  assert.strictEqual((await call(`/panel/leads/${id}`, { method: 'PATCH', body: { status: 'inventado' } })).status, 400);

  const clicks = await call('/panel/whatsapp-clicks');
  assert.strictEqual(clicks.body[0].page, '/colombia/desarrollo-web-cali');
  assert.strictEqual((await call('/panel/archive')).status, 200);

  assert.strictEqual((await call(`/panel/leads/${id}`, { method: 'DELETE' })).status, 200);
  assert.strictEqual((await call('/panel/leads')).body.length, 0);
});

test('una cookie alterada no sirve', async () => {
  const [exp] = cookie.split('=')[1].split('.');
  const forged = `websy_panel=${Number(exp) + 1000}.${cookie.split('.')[1]}`;
  const res = await fetch(`${BASE}/panel/leads`, { headers: { Cookie: forged } });
  assert.strictEqual(res.status, 401);
});
