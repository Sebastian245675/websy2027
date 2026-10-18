#!/usr/bin/env node
// Avisa a los buscadores por IndexNow (Bing, Yandex, Seznam, Naver) qué URLs cambiaron, apenas se publica.
// Bing es el índice que usan ChatGPT Search y Copilot: sin este aviso, una página nueva puede tardar semanas
// en aparecer ahí. Google no usa IndexNow; para Google sigue valiendo el sitemap.
//
// Por defecto manda solo las URLs del sitemap con <lastmod> de los últimos 7 días.
//   node scripts/indexnow.js            URLs cambiadas en los últimos 7 días
//   node scripts/indexnow.js --all      todo el sitemap (por ejemplo, la primera vez)
//   node scripts/indexnow.js --dry-run  muestra qué mandaría, sin enviar nada
//
// La clave es pública por diseño: el archivo public/<KEY>.txt prueba que el sitio es nuestro.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.websysrl.com';
const KEY = '00123f9e8a318d29dbfab3d85100bbc8';
const DAYS = 7;

const args = process.argv.slice(2);
const all = args.includes('--all');
const dryRun = args.includes('--dry-run');

const sitemap = fs.readFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), 'utf8');
const since = new Date(Date.now() - DAYS * 864e5).toISOString().slice(0, 10);
const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, block]) => ({ loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1], lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] }))
  .filter(({ loc, lastmod }) => loc && (all || (lastmod && lastmod >= since)))
  .map(({ loc }) => loc);

if (!urls.length) {
  console.log(`indexnow: ninguna URL cambió desde ${since}; nada que enviar`);
  process.exit(0);
}

console.log(`indexnow: ${urls.length} URL${urls.length === 1 ? '' : 's'}${all ? ' (sitemap completo)' : ` con cambios desde ${since}`}`);
if (dryRun) {
  urls.forEach((u) => console.log(`  ${u}`));
  process.exit(0);
}

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
})
  .then((res) => {
    // 200 y 202 son éxito; 403 = la clave no está publicada; 422 = URLs de otro dominio
    console.log(`indexnow: respuesta ${res.status}${res.ok ? ' (aceptado)' : ''}`);
    // Un fallo acá no debe marcar el deploy como fallido: el sitio ya está publicado
  })
  .catch((err) => console.log(`indexnow: no se pudo enviar (${err.message})`));
