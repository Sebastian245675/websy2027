#!/usr/bin/env node
// Checks the two things Google flags as soft 404 / duplicate content, and prints every result:
//   - made-up URLs answer a real HTTP 404 with noindex, no canonical and links to services, blog and contact
//   - every redirect (old slugs from deploy/websysrl-redirects.conf, trailing slash, /index.html,
//     without www, http) is ONE 301 straight to its final URL, and that URL answers 200
//
// Usage:
//   node scripts/check-404-redirects.js           # against production (https://www.websysrl.com)
//   node scripts/check-404-redirects.js --local   # against a local nginx with the deploy/ configs
//                                                 #   (proxy on 8080 http / 8443 https, self-signed cert)
// Requires curl. Exit code 1 if anything fails.

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const LOCAL = process.argv.includes('--local');
const SITE = 'https://www.websysrl.com';
const CURL = [
  '-s', '--max-time', '30', '-o', '-', '-D', '-', '-A', 'Mozilla/5.0 (compatible; websy-404-check)',
  ...(LOCAL ? [
    '-k',
    '--connect-to', 'www.websysrl.com:443:127.0.0.1:8443',
    '--connect-to', 'websysrl.com:443:127.0.0.1:8443',
    '--connect-to', 'www.websysrl.com:80:127.0.0.1:8080',
    '--connect-to', 'websysrl.com:80:127.0.0.1:8080',
  ] : []),
];

// One request, no redirect following: status, headers (lowercase) and body
const get = (url) => new Promise((resolve) => {
  execFile('curl', [...CURL, url], { maxBuffer: 1 << 26, encoding: 'utf8' }, (err, out) => {
    if (err && !out) return resolve({ status: 0, headers: {}, body: '' });
    const split = out.indexOf('\r\n\r\n');
    const head = out.slice(0, split).split('\r\n');
    const headers = {};
    head.slice(1).forEach((line) => {
      const i = line.indexOf(':');
      if (i > 0) headers[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
    });
    resolve({ status: Number(head[0].split(' ')[1]) || 0, headers, body: out.slice(split + 4) });
  });
});

// Old slugs straight from the nginx map, so a line added there is tested without touching this script
const movedPaths = () => {
  const conf = fs.readFileSync(path.join(__dirname, '..', 'deploy', 'websysrl-redirects.conf'), 'utf8');
  const block = conf.slice(conf.indexOf('map $websy_clean_path $websy_moved_path'));
  const body = block.slice(block.indexOf('{') + 1, block.indexOf('}'));
  return body.split('\n')
    .map((line) => line.trim().match(/^(\/\S+)\s+(\/\S*);$/))
    .filter(Boolean)
    .map(([, from, to]) => [`${SITE}${from}`, `${SITE}${to}`]);
};

const NOT_FOUND = [
  '/pagina-que-no-existe-xyz',
  '/blog/post-que-no-existe-xyz',
  '/servicios/servicio-que-no-existe-xyz',
  '/casos-de-exito/caso-que-no-existe-xyz',
];

const REDIRECTS = [
  ...movedPaths(),
  [`${SITE}/blog/index.html`, `${SITE}/blog`],
  [`${SITE}/index.html`, `${SITE}/`],
  [`${SITE}/servicios/`, `${SITE}/servicios`],
  [`${SITE}/planes/`, `${SITE}/planes`],
  [`${SITE}/blog/`, `${SITE}/blog`],
  [`${SITE}/casos-de-exito/`, `${SITE}/casos-de-exito`],
  [`${SITE}/contacto/`, `${SITE}/contacto`],
  [`${SITE}/servicios/desarrollo-web/`, `${SITE}/servicios/desarrollo-web`],
  [`${SITE}/blog/cuanto-cuesta-pagina-web-argentina-2026/`, `${SITE}/blog/cuanto-cuesta-pagina-web-argentina-2026`],
  // Old slug + trailing slash + no www + http: still a single hop
  ['http://websysrl.com/blog/seo-empresas-salta-como-aparecer-en-google/', `${SITE}/blog/como-posicionar-mi-negocio-local-en-google-seo-local`],
  ['http://websysrl.com/planes/', `${SITE}/planes`],
  ['https://websysrl.com/blog', `${SITE}/blog`],
  [`${SITE}/blog/?utm_source=test`, `${SITE}/blog?utm_source=test`],
];

const show = (url) => (url ? url.replace(SITE, '') || '/' : '');
const pad = (s, n) => (s.length >= n ? s : s + ' '.repeat(n - s.length));

(async () => {
  let fails = 0;
  const line = (ok, text) => { if (!ok) fails += 1; console.log(`${ok ? 'OK  ' : 'FAIL'} ${text}`); };

  console.log(`Target: ${LOCAL ? 'local nginx (deploy/ configs)' : 'production'}\n`);
  console.log('Made-up URLs -> real 404');
  for (const p of NOT_FOUND) {
    const r = await get(`${SITE}${p}`);
    const robots = (r.body.match(/<meta[^>]*name="robots"[^>]*>|<meta[^>]*content="[^"]*"[^>]*name="robots"[^>]*>/i) || [''])[0];
    const noindex = /noindex/i.test(robots) || /noindex/i.test(r.headers['x-robots-tag'] || '');
    const canonical = /rel="canonical"/i.test(r.body);
    const links = ['/servicios', '/blog', '/contacto'].every((href) => r.body.includes(`href="${href}"`));
    const ok = r.status === 404 && noindex && !canonical && links;
    line(ok, `${pad(p, 42)} ${r.status}  noindex:${noindex ? 'sí' : 'no'}  canonical:${canonical ? 'sí' : 'no'}  enlaces servicios/blog/contacto:${links ? 'sí' : 'no'}`);
  }

  console.log('\nRedirects -> one 301 to the final URL, which answers 200');
  for (const [from, to] of REDIRECTS) {
    const r = await get(from);
    const location = r.headers.location || '';
    const final = location ? await get(location) : { status: 0 };
    const ok = r.status === 301 && location === to && final.status === 200;
    line(ok, `${pad(show(from), 70)} ${r.status} -> ${show(location) || '(sin Location)'}  [${final.status}]${location && location !== to ? `  esperado: ${show(to)}` : ''}`);
  }

  console.log(`\n${fails ? `${fails} failures` : 'All checks passed'}`);
  process.exit(fails ? 1 : 0);
})();
