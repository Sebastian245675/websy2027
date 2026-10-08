// Regenerates public/sitemap.xml from the real routes, services and blog posts.
// Also keeps package.json "reactSnap.include" in sync. Runs automatically before every build ("prebuild").
//
// lastmod is the real date of the last change, never the build date (Google ignores lastmod when it is
// always "today"):
//   - pages: last git commit that touched the page file or any local module it imports (followed
//     recursively), ignoring site-wide plumbing listed in SHARED_MODULES. Uncommitted changes count as today.
//   - blog posts: `updated` if the post has it, otherwise `date`.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SITE_URL = 'https://www.websysrl.com';
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const today = new Date().toISOString().slice(0, 10);

// Each indexable static route and the page component that renders it
const staticPages = [
  { loc: '/', page: 'pages/HomePage.jsx', changefreq: 'weekly', priority: '1.0' },
  { loc: '/servicios', page: 'pages/ServicesPage.jsx', changefreq: 'monthly', priority: '0.9' },
  { loc: '/planes', page: 'pages/PlansPage.jsx', changefreq: 'monthly', priority: '0.9' },
  { loc: '/casos-de-exito', page: 'pages/SuccessStoriesPage.jsx', changefreq: 'monthly', priority: '0.8' },
  { loc: '/contacto', page: 'pages/ContactPage.jsx', changefreq: 'monthly', priority: '0.9' },
  { loc: '/blog', page: 'pages/BlogPage.jsx', changefreq: 'weekly', priority: '0.9' },
  { loc: '/politica-de-privacidad', page: 'pages/PrivacyPolicyPage.jsx', changefreq: 'yearly', priority: '0.2' },
];
// Routes in App.js that are deliberately not in the sitemap
const NOT_IN_SITEMAP = ['/panel-cotizaciones', '/lp/:slug', '*'];
// Dynamic routes; their URLs come from services, case studies and blog posts below
const DYNAMIC_ROUTES = ['/servicios/:slug', '/casos-de-exito/:slug', '/blog/:slug'];

// A new public route in App.js must be added to staticPages (or to one of the lists above)
const appRoutes = [...fs.readFileSync(path.join(SRC, 'App.js'), 'utf8').matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]);
const unlisted = appRoutes.filter((r) => !staticPages.some((p) => p.loc === r) && !NOT_IN_SITEMAP.includes(r) && !DYNAMIC_ROUTES.includes(r));
if (unlisted.length) {
  console.error(`generate-sitemap: routes in App.js missing from the sitemap config: ${unlisted.join(', ')}`);
  process.exit(1);
}

// Site-wide plumbing: changing these does not change what a page says
const SHARED_MODULES = new Set([
  'components/SEOHead.jsx', 'LanguageContext.js', 'translations.js', 'locales/es.js', 'locales/en.js',
  'lib/tracking.js', 'firebase.js', 'firebaseLazy.js', 'components/UXEnhancements.jsx', 'components/LazyImage.jsx',
  'components/LazyRenderSection.jsx', 'siteConfig.js',
  'blogData.js', // posts carry their own dates; /blog adds the newest post date below
]);

const resolveImport = (from, spec) => {
  const base = path.resolve(path.dirname(from), spec);
  return ['', '.js', '.jsx', '/index.js'].map((ext) => base + ext).find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
};

// The page file plus every local module it imports, recursively
const sourcesOf = (file, seen = new Set()) => {
  const rel = path.relative(SRC, file).split(path.sep).join('/');
  if (seen.has(file) || SHARED_MODULES.has(rel)) return seen;
  seen.add(file);
  const code = fs.readFileSync(file, 'utf8');
  for (const [, spec] of code.matchAll(/(?:from\s+|import\(\s*)['"](\.{1,2}\/[^'"]+)['"]/g)) {
    const dep = resolveImport(file, spec);
    if (dep) sourcesOf(dep, seen);
  }
  return seen;
};

const git = (args) => {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
};

// null when git is not available: the <lastmod> tag is then omitted rather than faked
const lastmodOf = (files) => {
  const rel = [...files].map((f) => path.relative(ROOT, f));
  const dirty = git(['status', '--porcelain', '--', ...rel]);
  if (dirty === null) return null;
  if (dirty) return today;
  return git(['log', '-1', '--format=%cs', '--', ...rel]) || null;
};

const pageLastmod = (...pageFiles) => {
  const files = new Set();
  pageFiles.forEach((f) => sourcesOf(path.join(SRC, f), files));
  return lastmodOf(files);
};

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

// Each post object declares `slug`, then `date` and optionally `updated`, before the next post's `slug`
const blogPosts = [];
const blogDir = path.join(SRC, 'blogs');
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const tokens = [...content.matchAll(/^\s*(slug|date|updated):\s*['"]([^'"]+)['"]/gm)];
  tokens.forEach(([, key, value], i) => {
    if (key !== 'slug') return;
    const post = { slug: value };
    for (let j = i + 1; j < tokens.length && tokens[j][1] !== 'slug'; j++) post[tokens[j][1]] = tokens[j][2];
    if (!post.date) {
      console.error(`generate-sitemap: post ${value} (${file}) has no date`);
      process.exit(1);
    }
    blogPosts.push(post);
  });
}

const seen = new Set();
const uniquePosts = blogPosts
  .filter((p) => !seen.has(p.slug) && seen.add(p.slug))
  .sort((a, b) => b.date.localeCompare(a.date));

const url = ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const postLastmod = (p) => {
  const d = p.updated && p.updated > p.date ? p.updated : p.date;
  return d > today ? today : d;
};
const latest = (...dates) => dates.filter(Boolean).sort().pop() || null;
const newestPost = latest(...uniquePosts.map(postLastmod));

const servicesLastmod = pageLastmod('pages/ServiceDetailPage.jsx');
const casesLastmod = pageLastmod('pages/CaseStudyPage.jsx');

const entries = [
  ...staticPages.map((p) => url({
    ...p,
    lastmod: p.loc === '/blog' ? latest(pageLastmod(p.page), newestPost) : pageLastmod(p.page),
  })),
  ...serviceSlugs.map((slug) => url({ loc: `/servicios/${slug}`, lastmod: servicesLastmod, changefreq: 'monthly', priority: '0.9' })),
  ...casePages.map((loc) => url({ loc, lastmod: casesLastmod, changefreq: 'monthly', priority: '0.8' })),
  ...uniquePosts.map((p) => url({ loc: `/blog/${p.slug}`, lastmod: postLastmod(p), changefreq: 'monthly', priority: '0.7' })),
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
