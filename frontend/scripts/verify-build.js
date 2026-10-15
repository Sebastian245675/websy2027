#!/usr/bin/env node
// Mandatory pre-deploy gate. A partial react-snap run must never be deployable.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const SITE = 'https://www.websysrl.com';
const sitemap = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const failures = [];

const textOf = (html, tag) => {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1].replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim() : '';
};
const canonicalOf = (html) => {
  const tag = (html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i) || [])[0];
  return tag ? ((tag.match(/href="([^"]*)"/i) || [])[1] || '') : '';
};
const fileOf = (url) => {
  const route = new URL(url).pathname;
  return route === '/' ? path.join(BUILD, 'index.html') : path.join(BUILD, route, 'index.html');
};

const homeFile = fileOf(`${SITE}/`);
if (!fs.existsSync(homeFile)) failures.push('missing build/index.html');
const homeHtml = fs.existsSync(homeFile) ? fs.readFileSync(homeFile, 'utf8') : '';
const homeTitle = textOf(homeHtml, 'title');
const homeH1 = textOf(homeHtml, 'h1');

for (const url of urls) {
  const file = fileOf(url);
  if (!fs.existsSync(file)) {
    failures.push(`${url} -> missing ${path.relative(ROOT, file)}`);
    console.log(`FAIL missing ${url}`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const canonical = canonicalOf(html);
  const title = textOf(html, 'title');
  const h1 = textOf(html, 'h1');
  if (canonical !== url) failures.push(`${url} -> canonical "${canonical}"`);
  if (!title) failures.push(`${url} -> missing title`);
  if (!h1) failures.push(`${url} -> missing H1`);
  if (url !== `${SITE}/` && title === homeTitle) failures.push(`${url} -> home title`);
  if (url !== `${SITE}/` && h1 === homeH1) failures.push(`${url} -> home H1`);
  const ok = canonical === url && title && h1 && (url === `${SITE}/` || (title !== homeTitle && h1 !== homeH1));
  console.log(`${ok ? 'OK' : 'FAIL'} ${url}`);
}

const notFound = path.join(BUILD, '404.html');
if (!fs.existsSync(notFound)) failures.push('missing build/404.html');
else {
  const notFoundHtml = fs.readFileSync(notFound, 'utf8');
  const robotsTag = [...notFoundHtml.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => /name="robots"/i.test(tag));
  if (!robotsTag || !/content="[^"]*noindex/i.test(robotsTag)) failures.push('build/404.html is missing noindex');
}

console.log(`verify-build: ${urls.length} sitemap URLs, ${failures.length} failures`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
