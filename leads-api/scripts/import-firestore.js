#!/usr/bin/env node
// Importa a PostgreSQL todo lo que había en Firestore (proyecto multinivel-c0bcd):
//   cotizaciones     -> leads             (cada formulario, con su fecha original)
//   whatsapp_clicks  -> whatsapp_clicks
//   comentarios, news, analytics -> firestore_archive (completos, como JSON)
//
// Se puede correr varias veces: usa el id del documento de Firestore y no duplica.
// Lee por la API REST pública de Firestore, así que funciona mientras las reglas permitan leer.
//   docker compose exec api node scripts/import-firestore.js
const { Pool } = require('pg');

const PROJECT = process.env.FIRESTORE_PROJECT || 'multinivel-c0bcd';
const KEY = process.env.FIRESTORE_WEB_KEY || 'AIzaSyAX0_2aSXzeFGDX732mNBKYTnsIzqvHDI4';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: Number(process.env.PG_POOL_MAX || 10) });

// Valor de la API REST de Firestore -> valor JS
const decode = (v) => {
  if (!v || typeof v !== 'object') return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('nullValue' in v) return null;
  if ('mapValue' in v) return decodeFields(v.mapValue.fields || {});
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decode);
  if ('referenceValue' in v) return v.referenceValue;
  if ('geoPointValue' in v) return v.geoPointValue;
  return null;
};
const decodeFields = (fields) => Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decode(v)]));

async function* documents(collection) {
  let pageToken = '';
  do {
    const url = `${BASE}/${collection}?pageSize=300&key=${KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url);
    const body = await res.json();
    if (!res.ok) throw new Error(`${collection}: ${res.status} ${body.error && body.error.message}`);
    for (const doc of body.documents || []) {
      yield { id: doc.name.split('/').pop(), createTime: doc.createTime, data: decodeFields(doc.fields || {}) };
    }
    pageToken = body.nextPageToken || '';
  } while (pageToken);
}

const s = (v) => (v === undefined || v === null || v === '' ? null : String(v));
const dateOf = (d, doc) => d.createdAt || d.fecha || d.timestamp || doc.createTime;

// Lo que los formularios guardaban en Firestore, con los nombres de columna de PostgreSQL
const LEAD_COLUMNS = {
  name: 'name', email: 'email', country: 'country', website: 'website', rubro: 'rubro', projectType: 'project_type',
  budget: 'budget', source: 'source', page: 'page', message: 'message', note: 'note', status: 'status',
};

const importLeads = async () => {
  let n = 0;
  for await (const doc of documents('cotizaciones')) {
    const d = doc.data;
    const row = { phone: s(d.whatsapp || d.phone) };
    for (const [from, to] of Object.entries(LEAD_COLUMNS)) row[to] = s(d[from]);
    if (!row.status) row.status = 'nuevo';
    const known = new Set([...Object.keys(LEAD_COLUMNS), 'whatsapp', 'phone', 'createdAt', 'updatedAt', 'reunionAt']);
    const extra = Object.fromEntries(Object.entries(d).filter(([k]) => !known.has(k)));
    await pool.query(
      `INSERT INTO leads (created_at, updated_at, status, name, phone, email, country, website, rubro, project_type, budget, source, page, message, note, reunion_at, firestore_id, extra)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
       ON CONFLICT (firestore_id) DO NOTHING`,
      [dateOf(d, doc), d.updatedAt || null, row.status, row.name, row.phone, row.email, row.country, row.website, row.rubro,
        row.project_type, row.budget, row.source, row.page, row.message, row.note, d.reunionAt || null, doc.id, JSON.stringify(extra)],
    );
    n += 1;
  }
  return n;
};

const importClicks = async () => {
  let n = 0;
  for await (const doc of documents('whatsapp_clicks')) {
    const d = doc.data;
    await pool.query(
      'INSERT INTO whatsapp_clicks (created_at, location, page, referrer, firestore_id) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (firestore_id) DO NOTHING',
      [dateOf(d, doc), s(d.location), s(d.page), s(d.referrer), doc.id],
    );
    n += 1;
  }
  return n;
};

const importArchive = async (collection) => {
  let n = 0;
  for await (const doc of documents(collection)) {
    await pool.query(
      'INSERT INTO firestore_archive (collection, firestore_id, created_at, data) VALUES ($1,$2,$3,$4) ON CONFLICT (collection, firestore_id) DO NOTHING',
      [collection, doc.id, dateOf(doc.data, doc), JSON.stringify(doc.data)],
    );
    n += 1;
  }
  return n;
};

(async () => {
  // El esquema es idempotente: se aplica también acá por si la importación corre antes que la API
  await pool.query(require('fs').readFileSync(require('path').join(__dirname, '..', 'db', 'schema.sql'), 'utf8'));
  console.log(`cotizaciones -> leads: ${await importLeads()} documentos leídos`);
  console.log(`whatsapp_clicks: ${await importClicks()} documentos leídos`);
  for (const c of ['comentarios', 'news', 'analytics']) console.log(`${c} -> firestore_archive: ${await importArchive(c)} documentos leídos`);
  const { rows } = await pool.query("SELECT (SELECT count(*) FROM leads)::int AS leads, (SELECT count(*) FROM whatsapp_clicks)::int AS clicks, (SELECT count(*) FROM firestore_archive)::int AS archivo");
  console.log('En PostgreSQL ahora:', rows[0]);
  await pool.end();
})().catch((err) => {
  console.error('La importación falló:', err.message);
  process.exit(1);
});
