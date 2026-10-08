#!/usr/bin/env node
// Quality checks for the blog markdown (src/blogs/posts/*.md). Run: node scripts/check-blog-content.js [--strict]
//   - every internal link points to a page that exists (posts, services, case studies, static pages)
//   - the post opens with a direct answer in bold (what Google's AI answers and snippets extract)
//   - it has a "## Preguntas frecuentes" section with at least 3 questions (becomes FAQPage schema)
//   - length: posts under MIN_WORDS are listed as "short"
//   - voice: posts aimed at Colombia, México or LATAM use "tú"; voseo ("podés", "tenés") is flagged
// --strict: exit code 1 on any problem (for CI); without it, it only reports.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const POSTS = path.join(SRC, 'blogs', 'posts');
// Reference length: a complete article (direct answer, sections, table, FAQ) lands around 700-1.900 words.
// Below this it is usually missing something; above it, length alone is not a goal.
const MIN_WORDS = 700;
const strict = process.argv.includes('--strict');

const slugsIn = (file, re) => [...fs.readFileSync(file, 'utf8').matchAll(re)].map((m) => m[1]);
const postSlugs = new Set(fs.readdirSync(POSTS).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)));
const serviceSlugs = new Set(slugsIn(path.join(SRC, 'servicesSeoData.js'), /slug:\s*'([^']+)'/g));
const [casesSrc, hubsSrc] = fs.readFileSync(path.join(SRC, 'caseStudies.js'), 'utf8').split('export const rubroHubs');
const caseSlugs = new Set([
  ...[...casesSrc.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1]),
  ...[...hubsSrc.matchAll(/^\s{4}path:\s*'([^']+)'/gm)].map((m) => m[1]),
]);
const STATIC = new Set(['/', '/servicios', '/planes', '/casos-de-exito', '/contacto', '/blog', '/politica-de-privacidad']);

// Country per post from the cluster map; pillars count as LATAM
const countryOf = {};
for (const m of fs.readFileSync(path.join(SRC, 'blogs', 'clusters.js'), 'utf8').matchAll(/slug: '([^']+)', kw: '[^']*', intent: '[^']*', country: '([A-Z]+)'/g)) {
  countryOf[m[1]] = m[2];
}

const linkExists = (href) => {
  const p = href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  if (STATIC.has(p)) return true;
  let m;
  if ((m = p.match(/^\/blog\/([^/]+)$/))) return postSlugs.has(m[1]);
  if ((m = p.match(/^\/servicios\/([^/]+)$/))) return serviceSlugs.has(m[1]);
  if ((m = p.match(/^\/casos-de-exito\/([^/]+)$/))) return caseSlugs.has(m[1]);
  if ((m = p.match(/^\/autores\/([^/]+)$/))) return true;
  return false;
};

// Unicode-aware word boundaries: \b does not treat accented letters as part of a word,
// so "probándolo" would match "probá"
const VOSEO = /(?<![\p{L}])(podés|tenés|querés|sabés|necesitás|hacés|elegís|mirá|pedí|contanos|escribinos|fijate|revisá|preguntá|armá|definí|exigí|poné|usá|probá|cotizá|consultá|empezá|vendé|elegí|ves que|vos)(?![\p{L}])/iu;

const report = { short: [], noAnswer: [], noFaq: [], brokenLinks: [], voseo: [] };
const words = {};
for (const slug of [...postSlugs].sort()) {
  const md = fs.readFileSync(path.join(POSTS, `${slug}.md`), 'utf8');
  const text = md.replace(/```[\s\S]*?```/g, ' ');
  const count = text.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
  words[slug] = count;
  if (count < MIN_WORDS) report.short.push(`${slug} (${count})`);
  if (!/^\*\*[^*]{60,}\*\*/.test(md.trimStart())) report.noAnswer.push(slug);
  const faq = md.split(/^## Preguntas frecuentes[^\n]*$/m)[1];
  if (!faq || (faq.split(/^## /m)[0].match(/^### /gm) || []).length < 3) report.noFaq.push(slug);
  for (const [, href] of md.matchAll(/\]\((\/[^)\s]*)\)/g)) if (!linkExists(href)) report.brokenLinks.push(`${slug} -> ${href}`);
  if ((countryOf[slug] || 'LATAM') !== 'AR') {
    const hit = text.match(VOSEO);
    if (hit) report.voseo.push(`${slug}: "${hit[0]}"`);
  }
}

const all = Object.values(words).sort((a, b) => a - b);
console.log(`${postSlugs.size} posts · words min ${all[0]} · median ${all[all.length >> 1]} · max ${all[all.length - 1]} · under ${MIN_WORDS}: ${report.short.length}`);
const show = (title, list) => {
  console.log(`\n${title}: ${list.length}`);
  list.forEach((l) => console.log(`  ${l}`));
};
show('Broken internal links', report.brokenLinks);
show('Voseo in posts aimed at CO/MX/LATAM', report.voseo);
show('No direct answer in bold at the start', report.noAnswer);
show('No FAQ section with 3+ questions', report.noFaq);
show(`Shorter than ${MIN_WORDS} words`, report.short);

const problems = report.brokenLinks.length + report.voseo.length + report.noAnswer.length + report.noFaq.length + report.short.length;
if (strict && problems) process.exit(1);
