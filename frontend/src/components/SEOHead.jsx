import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const SITE_URL = 'https://www.websysrl.com';
const SITE_NAME = 'Websy';
// Tarjeta 1200x630 generada por scripts/generate-og-images.py
const DEFAULT_IMAGE = '/og/websy.png';

// Readable breadcrumb names for known first-level paths
const SECTION_NAMES = {
  servicios: 'Servicios',
  planes: 'Inversión',
  blog: 'Blog',
  contacto: 'Contacto',
  'casos-de-exito': 'Casos de Éxito',
  colombia: 'Colombia',
  cotizador: 'Cotizador',
  'auditoria-gratis': 'Auditoría web gratis',
  'quienes-somos': 'Quiénes somos',
  mexico: 'México',
  'estados-unidos': 'Estados Unidos',
};

// Canonical URL: always www, no query string, no hash, no trailing slash (except root)
const buildCanonical = (url, pathname) => {
  if (url) {
    const clean = url.replace('https://websysrl.com', SITE_URL).split(/[?#]/)[0];
    return clean.length > SITE_URL.length + 1 ? clean.replace(/\/$/, '') : `${SITE_URL}/`;
  }
  const path = pathname.replace(/\/+$/, '');
  return path ? `${SITE_URL}${path}` : `${SITE_URL}/`;
};

const buildBreadcrumbs = (pathname, title) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const items = [{ name: 'Inicio', item: `${SITE_URL}/` }];
  segments.forEach((segment, i) => {
    const isLast = i === segments.length - 1;
    const name = isLast && i > 0
      ? title.split('|')[0].trim()
      : SECTION_NAMES[segment] || segment.replace(/-/g, ' ');
    items.push({ name, item: `${SITE_URL}/${segments.slice(0, i + 1).join('/')}` });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({ '@type': 'ListItem', position: i + 1, ...entry })),
  };
};

const upsertMeta = (name, content, property = false) => {
  const attribute = property ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (selector, attrs) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
};

// Page-level JSON-LD lives in its own script tag so it never overwrites the site-wide schemas in index.html
const PAGE_JSONLD_ID = 'seo-page-jsonld';

export const SEOHead = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  breadcrumbs = true,
  jsonLd,
  // [{ hreflang, href }] para páginas con versiones por país (home y /colombia, /mexico...). Sin esto,
  // la página se declara a sí misma como versión en español.
  alternates,
  locale,
}) => {
  const { currentLanguage } = useLanguage();
  const { pathname } = useLocation();

  const defaultDescription = currentLanguage === 'es'
    ? 'Agencia de desarrollo web en Salta. Creamos landing pages, e-commerce, CRM/ERP y SEO. Diseño responsivo y soluciones a medida para tu negocio.'
    : 'Web development agency in Salta. We create landing pages, e-commerce, CRM/ERP and SEO. Responsive design and custom solutions for your business.';

  const finalTitle = title || SITE_NAME;
  const finalDescription = description || defaultDescription;
  const canonicalUrl = buildCanonical(url, pathname);
  const finalImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';
  const alternatesString = JSON.stringify(alternates
    || ['es', 'es-AR', 'es-419', 'x-default'].map((hreflang) => ({ hreflang, href: canonicalUrl })));
  const ogLocale = locale || (currentLanguage === 'es' ? 'es_AR' : 'en_US');

  useEffect(() => {
    document.title = finalTitle;

    upsertMeta('description', finalDescription);
    upsertMeta('robots', noindex
      ? 'noindex'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    upsertMeta('og:title', finalTitle, true);
    upsertMeta('og:description', finalDescription, true);
    upsertMeta('og:image', finalImage, true);
    upsertMeta('og:url', canonicalUrl, true);
    upsertMeta('og:type', type, true);
    upsertMeta('og:site_name', SITE_NAME, true);
    upsertMeta('og:locale', ogLocale, true);

    // Twitter
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', finalTitle);
    upsertMeta('twitter:description', finalDescription);
    upsertMeta('twitter:image', finalImage);
    upsertMeta('twitter:url', canonicalUrl);
    upsertMeta('twitter:site', '@websyar');

    document.documentElement.setAttribute('lang', locale ? locale.replace('_', '-') : currentLanguage === 'es' ? 'es' : 'en');

    // Canonical + hreflang must point to THIS page, otherwise Google treats subpages as duplicates of the home.
    // A noindex page (404, not found) declares no canonical: "don't index" + "this is the canonical" contradict each other.
    // Se borran todos antes de escribir: al navegar de la home (con es-CO, es-MX...) a otra página no deben quedar.
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (noindex) {
      document.head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
    } else {
      upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
      JSON.parse(alternatesString).forEach(({ hreflang, href }) => {
        upsertLink(`link[rel="alternate"][hreflang="${hreflang}"]`, { rel: 'alternate', hreflang, href });
      });
    }

    // Page-specific structured data: breadcrumbs + any schema passed by the page
    const graph = [breadcrumbs && buildBreadcrumbs(pathname, finalTitle), ...(jsonLdString ? [].concat(JSON.parse(jsonLdString)) : [])]
      .filter(Boolean);
    let script = document.getElementById(PAGE_JSONLD_ID);
    if (graph.length) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = PAGE_JSONLD_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(graph.length === 1 ? graph[0] : graph);
    } else if (script) {
      script.remove();
    }
  }, [finalTitle, finalDescription, finalImage, canonicalUrl, type, noindex, jsonLdString, alternatesString, ogLocale, breadcrumbs, pathname, currentLanguage]);

  return null;
};
