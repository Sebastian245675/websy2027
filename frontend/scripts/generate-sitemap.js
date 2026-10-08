// Regenerates public/sitemap.xml from the real routes, services and blog posts.
// Also keeps package.json "reactSnap.include" in sync. Runs automatically before every build ("prebuild").
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.websysrl.com';
const SRC = path.join(__dirname, '..', 'src');
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/servicios', changefreq: 'monthly', priority: '0.9' },
  { loc: '/planes', changefreq: 'weekly', priority: '0.9' },
  { loc: '/casos-de-exito', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contacto', changefreq: 'monthly', priority: '0.9' },
  { loc: '/blog', changefreq: 'daily', priority: '0.9' },
  { loc: '/politica-de-privacidad', changefreq: 'yearly', priority: '0.2' },
];

// Paid-ads landing pages: prerendered for speed but kept out of the sitemap (they are noindex)
const landingSlugs = [...fs.readFileSync(path.join(SRC, 'landingPages.js'), 'utf8')
  .matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

const serviceSlugs = [...fs.readFileSync(path.join(SRC, 'servicesSeoData.js'), 'utf8')
  .matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

// Case studies and rubro hubs, both served at /casos-de-exito/<slug> (see src/caseStudies.js)
const [casesSrc, hubsSrc] = fs.readFileSync(path.join(SRC, 'caseStudies.js'), 'utf8').split('export const rubroHubs');
const caseSlugs = [...casesSrc.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1]);
const hubPaths = [...hubsSrc.matchAll(/^\s{4}path:\s*'([^']+)'/gm)].map((m) => m[1]);
const casePages = [...hubPaths, ...caseSlugs].map((slug) => `/casos-de-exito/${slug}`);

// Each post object declares `slug` before `date`; pair every slug with the first date that follows it
const blogPosts = [];
const blogDir = path.join(SRC, 'blogs');
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const tokens = [...content.matchAll(/^\s*(slug|date):\s*['"]([^'"]+)['"]/gm)];
  tokens.forEach(([, key, value], i) => {
    if (key !== 'slug') return;
    const next = tokens[i + 1];
    blogPosts.push({ slug: value, date: next && next[1] === 'date' ? next[2] : today });
  });
}

const seen = new Set();
const uniquePosts = blogPosts
  .filter((p) => !seen.has(p.slug) && seen.add(p.slug))
  .sort((a, b) => b.date.localeCompare(a.date));

const url = ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const entries = [
  ...staticPages.map((p) => url({ ...p, lastmod: today })),
  ...serviceSlugs.map((slug) => url({ loc: `/servicios/${slug}`, lastmod: today, changefreq: 'monthly', priority: '0.9' })),
  ...casePages.map((loc) => url({ loc, lastmod: today, changefreq: 'monthly', priority: '0.8' })),
  ...uniquePosts.map((p) => url({ loc: `/blog/${p.slug}`, lastmod: p.date > today ? today : p.date, changefreq: 'monthly', priority: '0.7' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml);

// llms.txt: resumen del sitio para asistentes de IA (ChatGPT, Perplexity, Claude, Gemini).
// El encabezado está acá; la lista de casos y rubros sale de src/caseStudies.js.
const caseTitles = [...casesSrc.matchAll(/^\s{4}slug:\s*'([^']+)'[\s\S]*?^\s{4}h1:\s*'([^']+)'[\s\S]*?^\s{4}summary:\s*'([^']+)'/gm)];
const hubTitles = [...hubsSrc.matchAll(/^\s{4}path:\s*'([^']+)'[\s\S]*?^\s{4}h1:\s*'([^']+)'/gm)];
const serviceTitles = [...fs.readFileSync(path.join(SRC, 'servicesSeoData.js'), 'utf8')
  .matchAll(/slug:\s*'([^']+)',\s*title:\s*'([^']+)'/g)];
// Corta en el primer punto que cierra una palabra de 3+ letras, para no cortar en abreviaturas como "St."
const firstSentence = (text) => text.split(/(?<=[a-záéíóúñ)]{3}\.)\s/)[0];

const llms = `# Websy

> Websy es una agencia de desarrollo web y software de Salta, Argentina, que trabaja a distancia con empresas de toda Latinoamérica y Estados Unidos. Hace páginas web, tiendas online, sistemas de gestión a medida, aplicaciones móviles y automatizaciones con IA. Tiene proyectos publicados en Argentina, Colombia, México y Estados Unidos.

## Datos clave

- Ubicación: Salta, Argentina. Atiende a distancia en Argentina, México, Colombia, Chile, Perú, Uruguay, el resto de Latinoamérica y Estados Unidos.
- Precios orientativos: sitios institucionales y landing pages desde USD 800; tiendas online de USD 1.800 a 3.500; sistemas de gestión para pymes de USD 4.000 a 8.000.
- Plazos habituales: landing page en 5 a 7 días hábiles; sitio institucional en 2 a 3 semanas; tienda online en 3 a 6 semanas.
- Forma de pago: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega. Argentina: Naranja X o Mercado Pago. Exterior: Dólar App o Binance.
- Rubros con proyectos publicados: estudios jurídicos, psicología, tiendas online, sistemas de gestión, industria y servicios, hotelería, inmobiliarias.
- Contacto: WhatsApp +54 9 388 484-6695 · ${SITE_URL}/contacto
- Precios y planes: ${SITE_URL}/planes

## Servicios

${serviceTitles.map(([, slug, title]) => `- [${title}](${SITE_URL}/servicios/${slug})`).join('\n')}

## Ejemplos por rubro

${hubTitles.map(([, p, h1]) => `- [${h1}](${SITE_URL}/casos-de-exito/${p})`).join('\n')}

## Casos de éxito

${caseTitles.map(([, slug, h1, summary]) => `- [${h1}](${SITE_URL}/casos-de-exito/${slug}): ${firstSentence(summary)}`).join('\n')}

## Más

- [Todos los casos de éxito](${SITE_URL}/casos-de-exito)
- [Blog](${SITE_URL}/blog): guías sobre desarrollo web, e-commerce, SEO y automatización para pymes de Latinoamérica.
`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'llms.txt'), llms);

// The blog index is paginated, so react-snap can't discover every post by crawling links.
// Give it the full list of routes to prerender.
const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const include = [
  ...staticPages.map((p) => p.loc),
  ...serviceSlugs.map((slug) => `/servicios/${slug}`),
  ...casePages,
  ...landingSlugs.map((slug) => `/lp/${slug}`),
  ...uniquePosts.map((p) => `/blog/${p.slug}`),
  '/404', // becomes build/404.html (scripts/finalize-build.js), served by nginx for unknown routes
];
if (JSON.stringify(pkg.reactSnap?.include) !== JSON.stringify(include)) {
  pkg.reactSnap = { ...pkg.reactSnap, include };
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}
`);
}
console.log(`sitemap.xml: ${staticPages.length} pages, ${serviceSlugs.length} services, ${caseSlugs.length} cases, ${hubPaths.length} rubro hubs, ${uniquePosts.length} blog posts`);
