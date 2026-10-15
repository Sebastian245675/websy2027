#!/usr/bin/env node
// Verifies indexability of the deployed site:
//   - every URL in the sitemap answers 200, its canonical is the URL itself and it has no noindex
//     (neither <meta name="robots"> nor X-Robots-Tag)
//   - its variants (trailing slash, without www, http, http without www + slash) answer ONE 301 to it
//   - /index.html, /blog/index.html, moved slugs (deploy/websysrl-redirects.conf) and query strings
//   - unknown routes answer a real 404 with noindex
//   - no internal link in the sitemap pages ends with "/"
//
// Usage:
//   node scripts/verify-seo.js                 # against production (https://www.websysrl.com)
//   node scripts/verify-seo.js --local         # against a local nginx with the deploy/ configs:
//                                              #   proxy on 8080 (http) / 8443 (https), self-signed cert
//   node scripts/verify-seo.js --sitemap=live  # take the URL list from the live sitemap instead of public/
// Requires curl. Exit code 1 if anything fails.
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const SITE = 'https://www.websysrl.com';
const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const LOCAL = args.includes('--local');
const LIVE_SITEMAP = args.includes('--sitemap=live');
const VERBOSE = args.includes('--verbose');
const reportArg = args.find((arg) => arg.startsWith('--report='));
const REPORT = reportArg ? reportArg.slice('--report='.length) : (VERBOSE ? path.join(ROOT, 'reports', 'production-seo-latest.txt') : null);
const reportLines = [];
const log = (message = '') => {
  console.log(message);
  reportLines.push(message);
};
if (REPORT) process.on('exit', () => {
  fs.mkdirSync(path.dirname(path.resolve(REPORT)), { recursive: true });
  fs.writeFileSync(path.resolve(REPORT), `${reportLines.join('\n')}\n`);
});

const CURL_BASE = ['-s', '--max-time', '30', '-o', '-', '-D', '-', '-A', 'Mozilla/5.0 (compatible; websy-seo-check)'];
const CURL_LOCAL = [
  '-k',
  '--connect-to', 'www.websysrl.com:443:127.0.0.1:8443',
  '--connect-to', 'websysrl.com:443:127.0.0.1:8443',
  '--connect-to', 'www.websysrl.com:80:127.0.0.1:8080',
  '--connect-to', 'websysrl.com:80:127.0.0.1:8080',
];

// One request, no redirects followed. Returns { status, headers, body }.
const fetchRaw = (url) => new Promise((resolve) => {
  execFile('curl', [...CURL_BASE, ...(LOCAL ? CURL_LOCAL : []), url], { maxBuffer: 1 << 26, encoding: 'utf8' }, (err, out) => {
    if (err && !out) return resolve({ status: 0, headers: {}, body: '', error: err.message });
    const split = out.indexOf('\r\n\r\n');
    const head = out.slice(0, split);
    const body = out.slice(split + 4);
    const [statusLine, ...lines] = head.split('\r\n');
    const headers = {};
    lines.forEach((l) => {
      const i = l.indexOf(':');
      if (i > 0) headers[l.slice(0, i).toLowerCase()] = l.slice(i + 1).trim();
    });
    resolve({ status: Number(statusLine.split(' ')[1]) || 0, headers, body });
  });
});

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
};
const canonicalOf = (html) => {
  const tag = (html.match(/<link\b[^>]*\brel="canonical"[^>]*>/) || [])[0];
  return tag ? attr(tag, 'href') : null;
};
const robotsOf = (html) => {
  const tag = (html.match(/<meta\b[^>]*\bname="robots"[^>]*>/) || [])[0];
  return tag ? attr(tag, 'content') : '';
};
const textOf = (html, tag) => {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1].replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim() : '';
};
const internalLinks = (html) => [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)]
  .map((m) => m[1].replace(/&amp;/g, '&'))
  .filter((h) => h.startsWith('/') || h.startsWith(SITE));

const failures = [];
const fail = (url, msg) => failures.push(`${url}  ->  ${msg}`);
let checks = 0;
let homeTitle = '';
let homeH1 = '';

const expectPage = async (url, { canonical = url, label = url } = {}) => {
  checks++;
  const r = await fetchRaw(url);
  if (r.status !== 200) return fail(label, `status ${r.status}${r.headers.location ? ` (Location: ${r.headers.location})` : ''}`);
  const c = canonicalOf(r.body);
  const title = textOf(r.body, 'title');
  const h1 = textOf(r.body, 'h1');
  if (c !== canonical) fail(label, `canonical ${c === null ? 'missing' : `"${c}"`}, expected "${canonical}"`);
  if (!title) fail(label, 'missing <title>');
  if (!h1) fail(label, 'missing <h1>');
  if (canonical !== `${SITE}/` && title === homeTitle) fail(label, 'title is identical to the home title');
  if (canonical !== `${SITE}/` && h1 === homeH1) fail(label, 'H1 is identical to the home H1');
  const robots = `${robotsOf(r.body)} ${r.headers['x-robots-tag'] || ''}`;
  if (/noindex/i.test(robots)) fail(label, `noindex (${robots.trim()})`);
  if (VERBOSE) log(`PAGE ${r.status} canonical:${c === canonical ? 'OK' : 'FAIL'} title:${title && (canonical === `${SITE}/` || title !== homeTitle) ? 'OK' : 'FAIL'} h1:${h1 && (canonical === `${SITE}/` || h1 !== homeH1) ? 'OK' : 'FAIL'} ${label}`);
  return r;
};

const expectRedirect = async (from, to) => {
  checks++;
  const r = await fetchRaw(from);
  if (VERBOSE) log(`REDIRECT ${r.status} ${r.headers.location === to ? 'OK' : 'FAIL'} ${from} -> ${r.headers.location || '(none)'}`);
  if (r.status !== 301) return fail(from, `status ${r.status}, expected 301 to ${to}`);
  if (r.headers.location !== to) fail(from, `301 to "${r.headers.location}", expected "${to}" in a single hop`);
};

const expectNotFound = async (url) => {
  checks++;
  const r = await fetchRaw(url);
  if (VERBOSE) log(`NOT_FOUND ${r.status} noindex:${/noindex/i.test(robotsOf(r.body)) ? 'OK' : 'FAIL'} ${url}`);
  if (r.status !== 404) return fail(url, `status ${r.status}, expected 404`);
  if (!/noindex/i.test(robotsOf(r.body))) fail(url, '404 page without noindex');
};

// Run async jobs with limited concurrency
const pool = async (items, size, fn) => {
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) await fn(items[i++]);
  }));
};

(async () => {
  const sitemapXml = LIVE_SITEMAP
    ? (await fetchRaw(`${SITE}/sitemap.xml`)).body
    : fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  log(`Target: ${LOCAL ? 'local nginx (deploy/ configs)' : 'production'} · ${urls.length} URLs in the sitemap\n`);

  const home = await fetchRaw(`${SITE}/`);
  homeTitle = textOf(home.body, 'title');
  homeH1 = textOf(home.body, 'h1');
  if (home.status !== 200 || !homeTitle || !homeH1) fail(`${SITE}/`, 'could not establish home title/H1 baseline');

  // Sitemap URLs must already be canonical-shaped
  urls.forEach((u) => {
    if (!u.startsWith(`${SITE}/`)) fail(u, 'sitemap URL is not https://www.websysrl.com/...');
    if (u !== `${SITE}/` && u.endsWith('/')) fail(u, 'sitemap URL ends with "/"');
  });

  const slashLinks = new Map();
  await pool(urls, 8, async (url) => {
    const page = await expectPage(url);
    if (page && page.body) {
      internalLinks(page.body)
        .filter((h) => { const p = h.replace(SITE, '').split(/[?#]/)[0]; return p.length > 1 && p.endsWith('/'); })
        .forEach((h) => slashLinks.set(h, url));
    }
    const p = url.slice(SITE.length); // "/planes" or "/"
    const variants = [
      p !== '/' && `${SITE}${p}/`,
      `https://websysrl.com${p}`,
      `http://www.websysrl.com${p}`,
      `http://websysrl.com${p === '/' ? '/' : `${p}/`}`,
    ].filter(Boolean);
    for (const v of variants) await expectRedirect(v, url);
  });
  slashLinks.forEach((page, href) => fail(page, `internal link with trailing slash: ${href}`));

  // Duplicates and moved URLs
  await expectRedirect(`${SITE}/index.html`, `${SITE}/`);
  await expectRedirect(`${SITE}/blog/index.html`, `${SITE}/blog`);
  await expectRedirect(`${SITE}/servicios/index.html`, `${SITE}/servicios`);
  await expectRedirect(`${SITE}/planes/?utm_source=test`, `${SITE}/planes?utm_source=test`);
  await expectPage(`${SITE}/planes?utm_source=test`, { canonical: `${SITE}/planes` });
  await expectPage(`${SITE}/blog?pagina=2`, { canonical: `${SITE}/blog` });
  await expectPage(`${SITE}/blog?categoria=E-commerce`, { canonical: `${SITE}/blog` });

  // Moved slugs: the "map $websy_clean_path $websy_moved_path" block of the nginx config
  const redirectsConf = fs.readFileSync(path.join(ROOT, 'deploy', 'websysrl-redirects.conf'), 'utf8');
  const movedBlock = redirectsConf.split('map $websy_clean_path $websy_moved_path {')[1].split('}')[0];
  const moved = [...movedBlock.matchAll(/^\s*(\/[^\s#]+)\s+(\/[^\s;]+);/gm)].map((m) => [m[1], m[2]]);
  for (const [from, to] of moved) {
    await expectRedirect(`${SITE}${from}`, `${SITE}${to}`);
    await expectRedirect(`${SITE}${from}/`, `${SITE}${to}`);
    await expectPage(`${SITE}${to}`);
    if (!urls.includes(`${SITE}${to}`)) fail(`${SITE}${to}`, 'redirect target is not in the sitemap');
    if (urls.includes(`${SITE}${from}`)) fail(`${SITE}${from}`, 'redirected URL is still in the sitemap');
  }

  // Real 404s
  await expectNotFound(`${SITE}/esta-pagina-no-existe`);
  await expectNotFound(`${SITE}/pagina-que-no-existe-xyz`);
  await expectNotFound(`${SITE}/blog/post-que-no-existe`);
  await expectNotFound(`${SITE}/servicios/servicio-que-no-existe`);
  await expectNotFound(`${SITE}/404.html`);
  await expectNotFound(`${SITE}/200.html`);

  // robots.txt
  checks++;
  const robots = await fetchRaw(`${SITE}/robots.txt`);
  if (robots.status !== 200 || !robots.body.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail(`${SITE}/robots.txt`, 'missing or without Sitemap line');
  if (/^Disallow:\s*\/(blog|static|.*\.(css|js))/mi.test(robots.body)) fail(`${SITE}/robots.txt`, 'blocks /blog, CSS or JS');

  log(`${checks} checks, ${failures.length} failures`);
  if (failures.length) {
    log(`\n${failures.slice(0, 200).join('\n')}${failures.length > 200 ? `\n... and ${failures.length - 200} more` : ''}`);
    process.exit(1);
  }
  log('OK: every sitemap URL is 200, self-canonical and indexable; every variant is a single 301 to it.');
})();
