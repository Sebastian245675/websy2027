// Pruebas de punta a punta contra un PostgreSQL real (DATABASE_URL). Borra las tablas de esa base:
// usar una base de prueba, nunca la de producción.
//   DATABASE_URL=postgres://... npm test
const test = require('node:test');
const assert = require('node:assert');

process.env.PANEL_PASSWORD = '123456789';
process.env.SESSION_SECRET = 'secreto-de-prueba';
process.env.COOKIE_SECURE = 'false';
process.env.PORT = '4199';
process.env.OUTREACH_TOKEN = 'token-de-prueba';
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
  await pool.query('DROP TABLE IF EXISTS leads, whatsapp_clicks, firestore_archive, outreach_prospects, outreach_messages, prospect_pool, outreach_overrides');
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

test('prospección: sin token no entra nada', async () => {
  const r = await call('/outreach/ingest', { method: 'POST', body: { prospects: [{ key: 'wa:1', estado: 'enviado' }] } });
  assert.strictEqual(r.status, 401);
});

test('prospección: el lote se guarda, se actualiza y no duplica mensajes', async () => {
  const ingest = (body) => fetch(`${BASE}/outreach/ingest`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Outreach-Token': 'token-de-prueba' }, body: JSON.stringify(body),
  }).then((res) => res.json());
  const lote = {
    prospects: [{ key: 'wa:573000000000', canal: 'whatsapp', campana: 'contadores-co', pais: 'CO', nombre: 'Estudio Uno', contacto: '573000000000', estado: 'enviado', enviado_at: '2026-11-17T15:00:00Z' }],
    messages: [{ id: 'm1', key: 'wa:573000000000', at: '2026-11-17T15:00:00Z', de: 'websy', tipo: 'campana', texto: 'Hola' }],
  };
  assert.deepStrictEqual(await ingest(lote), { ok: true, prospects: 1, messages: 1 });
  lote.prospects[0].estado = 'reunion';
  lote.prospects[0].reunion = 'martes 18/11, 10:00 h de Colombia';
  assert.deepStrictEqual(await ingest(lote), { ok: true, prospects: 1, messages: 0 });
  const panel = await call('/panel/outreach');
  assert.strictEqual(panel.status, 200);
  assert.strictEqual(panel.body.prospects[0].estado, 'reunion');
  assert.strictEqual(panel.body.prospects[0].reunion, 'martes 18/11, 10:00 h de Colombia');
  const msgs = await call(`/panel/outreach/messages?key=${encodeURIComponent('wa:573000000000')}`);
  assert.strictEqual(msgs.body.length, 1);
});

test('posibles clientes: carga con token, marca los que ya están en campaña y se descartan desde el panel', async () => {
  const load = (items) => fetch(`${BASE}/outreach/pool`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Outreach-Token': 'token-de-prueba' },
    body: JSON.stringify({ items }),
  });
  assert.strictEqual((await call('/outreach/pool', { method: 'POST', body: { items: [] } })).status, 401);
  const r = await load([
    { id: 'ChIJ-uno', nombre: 'Dental Sonrisa', pais: 'CO', whatsapp: '573000000000', rating: 4.7, resenas: 120, oportunidad: 80, motivos: ['No tiene página web'], info: { instagram: 'https://instagram.com/x' } },
    { id: 'ChIJ-dos', nombre: 'Taller Pérez', pais: 'MX', email: 'hola@taller.mx', oportunidad: 40 },
  ]);
  assert.strictEqual(r.status, 200);
  let list = await call('/panel/pool');
  assert.strictEqual(list.body.length, 2);
  assert.strictEqual(list.body[0].nombre, 'Dental Sonrisa');
  assert.strictEqual(list.body[0].rating, 4.7);
  assert.ok(list.body[0].enCampana); // wa:573000000000 ya está en una campaña por la prueba anterior
  assert.strictEqual(list.body[1].enCampana, null);
  assert.deepStrictEqual(list.body[0].motivos, ['No tiene página web']);

  const upd = await call('/panel/pool/ChIJ-dos', { method: 'PATCH', body: { estado: 'descartado', nota: 'franquicia' } });
  assert.strictEqual(upd.body.estado, 'descartado');
  assert.strictEqual((await call('/panel/pool/ChIJ-dos', { method: 'PATCH', body: { estado: 'otro' } })).status, 400);
  assert.strictEqual((await call('/panel/pool/ChIJ-uno', { method: 'PATCH', body: { estado: 'contactado' } })).body.estado, 'contactado');
  // Recargar no pisa lo hecho en el panel
  await load([{ id: 'ChIJ-dos', nombre: 'Taller Pérez', oportunidad: 45 }]);
  list = await call('/panel/pool');
  const dos = list.body.find((p) => p.id === 'ChIJ-dos');
  assert.strictEqual(dos.estado, 'descartado');
  assert.strictEqual(dos.nota, 'franquicia');
  assert.strictEqual(dos.oportunidad, 45);
});

test('mensajes en cola: se editan desde el panel, los ve la campaña y vuelven al original', async () => {
  await fetch(`${BASE}/outreach/ingest`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Outreach-Token': 'token-de-prueba' },
    body: JSON.stringify({ prospects: [{ key: 'email:hola@clinica.mx', canal: 'email', estado: 'programado', extra: { mensaje: 'Plantilla', asunto: 'Asunto' } }] }),
  });
  const overrides = () => fetch(`${BASE}/outreach/overrides`, { headers: { 'X-Outreach-Token': 'token-de-prueba' } }).then((r) => r.json());
  assert.strictEqual((await fetch(`${BASE}/outreach/overrides`)).status, 401);

  const put = await call('/panel/outreach/message', { method: 'PUT', body: { key: 'email:hola@clinica.mx', mensaje: '  Texto nuevo  ', asunto: 'Otro asunto' } });
  assert.strictEqual(put.status, 200);
  assert.deepStrictEqual(await overrides(), { 'email:hola@clinica.mx': { mensaje: 'Texto nuevo', asunto: 'Otro asunto' } });
  const panel = await call('/panel/outreach');
  assert.strictEqual(panel.body.prospects.find((p) => p.key === 'email:hola@clinica.mx').editado.mensaje, 'Texto nuevo');

  // Un mensaje ya enviado no se puede editar
  assert.strictEqual((await call('/panel/outreach/message', { method: 'PUT', body: { key: 'wa:573000000000', mensaje: 'x' } })).status, 409);

  await call('/panel/outreach/message', { method: 'PUT', body: { key: 'email:hola@clinica.mx', mensaje: '' } });
  assert.deepStrictEqual(await overrides(), {});
});
