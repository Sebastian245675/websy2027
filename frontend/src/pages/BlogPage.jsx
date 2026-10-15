import React, { useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, X, ChevronLeft, ChevronRight, ArrowRight, Clock,
  Code2, Smartphone, ShoppingCart, Bot, Database, ShieldCheck,
  Building2, TrendingUp, FileText,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { blogPosts, blogCategories } from '../blogData';
import postStats from '../blogs/postStats.json';

// Posts have no images, so each category gets a branded cover (icon + accent color)
const CATEGORY_STYLE = {
  'Precios y costos': { icon: TrendingUp, accent: '#d9fb06' },
  'Desarrollo web y diseño': { icon: Code2, accent: '#d9fb06' },
  'Hosting, seguridad y cloud': { icon: ShieldCheck, accent: '#60a5fa' },
  'Apps móviles': { icon: Smartphone, accent: '#38bdf8' },
  'E-commerce': { icon: ShoppingCart, accent: '#fbbf24' },
  'Automatización e IA': { icon: Bot, accent: '#a78bfa' },
  'SEO y marketing': { icon: Search, accent: '#4ade80' },
  'Sistemas de gestión y CRM': { icon: Database, accent: '#34d399' },
  'Páginas web por rubro': { icon: Building2, accent: '#fb923c' },
};
const styleFor = (category) => CATEGORY_STYLE[category] || { icon: FileText, accent: '#d9fb06' };

// Curated "most read" list (no analytics data available in the app)
const MOST_READ_SLUGS = [
  'cuanto-cuesta-pagina-web-argentina-2026',
  'como-aparecer-en-google-primeros-resultados-guia-seo-2026',
  'chatbot-whatsapp-business-automatizar-respuestas-clientes',
  'cuanto-cuesta-desarrollar-una-app-movil-argentina-latam',
  'como-crear-una-tienda-online-desde-cero-paso-a-paso',
];

// Even sizes so the two-column grid always closes its last row
const PAGE_SIZES = [12, 24, 48];
const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

// Real URLs for pagination and categories, so crawlers can follow them as <a href>
const blogUrl = (params, changes) => {
  const next = new URLSearchParams(params);
  Object.entries(changes).forEach(([key, value]) => {
    if (value === null || value === '' || value === 'Todos' || value === 1) next.delete(key);
    else next.set(key, String(value));
  });
  const qs = next.toString();
  return qs ? `/blog?${qs}` : '/blog';
};

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

const readTimeOf = (post) => (postStats[post.slug] || {}).readTime || post.readTime;

// Short headline for the cover: the SEO title is already ≤60 characters
const coverTitle = (post) => (post.seoTitle || post.title).replace(/\s*[|—-]\s*Websy\s*$/i, '');

const COVER_SIZES = {
  sm: { pad: 'p-0', title: '', pill: '', ring: 'border-[6px]' },
  md: { pad: 'p-5', title: 'text-[19px] leading-[1.15]', pill: 'text-[10px] px-2 py-0.5', ring: 'border-[22px]' },
  lg: { pad: 'p-7 md:p-10', title: 'text-[21px] sm:text-[28px] md:text-[38px] leading-[1.08]', pill: 'text-[11px] md:text-xs px-3 py-1', ring: 'border-[34px] md:border-[44px]' },
};

// Editorial cover in the style of a designed blog thumbnail: brand mark, category pill and headline
const PostCover = ({ post, size = 'md', className = '' }) => {
  const { icon: Icon, accent } = styleFor(post.category);
  const s = COVER_SIZES[size];
  return (
    <div className={`relative overflow-hidden bg-[#182A2C] ${className}`} aria-hidden="true">
      <div className={`absolute -top-[38%] -left-[16%] w-[58%] aspect-square rounded-full ${s.ring}`} style={{ borderColor: accent }} />
      <div className={`absolute -bottom-[52%] -right-[18%] w-[44%] aspect-square rounded-full ${s.ring} opacity-90`} style={{ borderColor: accent }} />
      <Icon
        className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[30%] h-auto opacity-[0.14] text-white"
        strokeWidth={1.25}
      />
      {size === 'sm' ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={20} className="text-white" strokeWidth={2} />
        </div>
      ) : (
        <div className={`absolute inset-0 flex flex-col justify-between ${s.pad}`}>
          <span className="self-start text-white font-extrabold tracking-tight text-sm md:text-base">
            websy<span style={{ color: accent }}>.</span>
          </span>
          <div className="relative max-w-[72%]">
            <span className={`inline-block rounded-full font-bold uppercase tracking-[0.12em] text-[#182A2C] ${s.pill}`} style={{ backgroundColor: accent }}>
              {post.category}
            </span>
            <p className={`mt-2.5 font-extrabold text-white tracking-tight line-clamp-3 ${s.title}`}>
              {coverTitle(post)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const ReadMore = ({ label = 'Leer artículo' }) => (
  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-[3px] underline-offset-4">
    {label}
    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
  </span>
);

const Pagination = ({ page, totalPages, hrefFor, onNavigate }) => {
  if (totalPages <= 1) return null;
  // Compact page list: first, last, current ±1, with gaps
  const pages = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  const btn = 'min-w-[36px] h-9 px-2.5 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors';
  const arrow = (target, label, Icon) => (target < 1 || target > totalPages ? (
    <span className={`${btn} text-[#182A2C] opacity-30`} aria-hidden="true"><Icon size={18} /></span>
  ) : (
    <Link to={hrefFor(target)} onClick={onNavigate} className={`${btn} text-[#182A2C] hover:bg-white`} aria-label={label}>
      <Icon size={18} />
    </Link>
  ));
  return (
    <nav className="flex flex-wrap justify-center items-center gap-1" aria-label="Paginación del blog">
      {arrow(page - 1, 'Página anterior', ChevronLeft)}
      {pages.map((p, i) => p === '…' ? (
        <span key={`gap-${i}`} className="px-1 text-slate-400">…</span>
      ) : (
        <Link
          key={p}
          to={hrefFor(p)}
          onClick={onNavigate}
          aria-current={p === page ? 'page' : undefined}
          className={`${btn} ${p === page ? 'bg-[#182A2C] text-white' : 'text-[#182A2C] hover:bg-white'}`}
        >
          {p}
        </Link>
      ))}
      {arrow(page + 1, 'Página siguiente', ChevronRight)}
    </nav>
  );
};

export const BlogPage = () => {
  const [params, setParams] = useSearchParams();
  const listTopRef = useRef(null);

  const activeCategory = params.get('categoria') || 'Todos';
  const searchQuery = params.get('q') || '';
  const pageSize = PAGE_SIZES.includes(Number(params.get('mostrar'))) ? Number(params.get('mostrar')) : DEFAULT_PAGE_SIZE;

  const updateParams = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'Todos') next.delete(key);
      else next.set(key, String(value));
    });
    setParams(next, { replace: true });
  };

  const sortedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => (b.date || '').localeCompare(a.date || '')),
    []
  );

  const categoryCounts = useMemo(() => {
    const counts = { Todos: blogPosts.length };
    blogPosts.forEach((post) => { counts[post.category] = (counts[post.category] || 0) + 1; });
    return counts;
  }, []);

  const mostRead = useMemo(
    () => MOST_READ_SLUGS.map((slug) => blogPosts.find((p) => p.slug === slug)).filter(Boolean),
    []
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return sortedPosts.filter((post) => {
      if (activeCategory !== 'Todos' && post.category !== activeCategory) return false;
      if (!q) return true;
      return [post.title, post.seoDescription, post.seoKeywords, post.category]
        .some((field) => field && field.toLowerCase().includes(q));
    });
  }, [sortedPosts, activeCategory, searchQuery]);

  // The newest post of the current view (all posts or one category) leads the page, as in an editorial home
  const featured = !searchQuery ? filteredPosts[0] : null;
  const listPosts = featured ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.max(1, Math.ceil(listPosts.length / pageSize));
  const page = Math.min(Math.max(1, Number(params.get('pagina')) || 1), totalPages);
  const pagePosts = listPosts.slice((page - 1) * pageSize, page * pageSize);
  const showFeatured = featured && page === 1;

  const scrollToList = () => listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const postsByCategory = useMemo(
    () => blogCategories.filter((c) => c !== 'Todos')
      .map((cat) => ({ cat, posts: sortedPosts.filter((p) => p.category === cat) }))
      .filter(({ posts }) => posts.length),
    [sortedPosts]
  );

  const resetFilters = () => setParams(new URLSearchParams(), { replace: true });

  const rangeStart = listPosts.length ? (page - 1) * pageSize + 1 : 0;
  const rangeEnd = Math.min(page * pageSize, listPosts.length);

  const listTitle = searchQuery
    ? `Resultados para "${searchQuery}"`
    : activeCategory === 'Todos' ? 'Lo más reciente' : `Lo más reciente en ${activeCategory}`;

  const categoryLinks = blogCategories.filter((c) => c !== 'Todos');

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title="Blog de Desarrollo Web, Apps, IA y Software | Websy"
        description="Guías sobre desarrollo web, apps, e-commerce, automatización con IA, CRM/ERP, SEO y ciberseguridad para empresas de Argentina y Latinoamérica."
        url="https://www.websysrl.com/blog"
      />

      {/* Top bar: breadcrumb, title and search */}
      <section className="pt-6 md:pt-8">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#182A2C] transition-colors">Inicio</Link>
          <ChevronRight size={13} className="text-slate-400" />
          {activeCategory === 'Todos' ? (
            <span className="text-[#182A2C] font-bold">Blog</span>
          ) : (
            <>
              <Link to="/blog" className="hover:text-[#182A2C] transition-colors">Blog</Link>
              <ChevronRight size={13} className="text-slate-400" />
              <span className="text-[#182A2C] font-bold">{activeCategory}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-[26px] md:text-[32px] font-extrabold text-[#182A2C] leading-tight tracking-tight">
            Blog de desarrollo web, apps e IA para empresas
          </h1>
          <div className="relative w-full md:w-[340px] shrink-0">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => updateParams({ q: e.target.value, pagina: null })}
              placeholder="Buscar artículos…"
              aria-label="Buscar artículos del blog"
              className="w-full h-11 pl-11 pr-11 bg-white text-[#182A2C] placeholder-slate-400 text-[15px] rounded-full border border-slate-200 focus:outline-none focus:border-[#182A2C] focus:ring-4 focus:ring-[#d9fb06]/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => updateParams({ q: null, pagina: null })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#182A2C]"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* Featured post */}
      {showFeatured && (
        <section className="pt-7 md:pt-8 pb-12 md:pb-16">
          <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <PostCover post={featured} size="lg" className="lg:col-span-7 aspect-[16/9.5] rounded-2xl shadow-sm" />
            <div className="lg:col-span-5">
              <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight group-hover:underline decoration-[#d9fb06] decoration-4 underline-offset-[6px]">
                {featured.title}
              </h2>
              <p className="mt-4 text-[16px] text-slate-600 leading-relaxed line-clamp-4">{featured.seoDescription}</p>
              <p className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span>{formatDate(featured.date)}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1"><Clock size={14} /> {readTimeOf(featured)}</span>
              </p>
              <div className="mt-5"><ReadMore /></div>
            </div>
          </Link>
          </div>
        </section>
      )}

      {/* Latest posts + sidebar */}
      <section className="bg-[#f4f7f9] border-t border-slate-100">
        <div className="py-12 md:py-16">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-8 min-w-0 lg:border-r lg:border-slate-200 lg:pr-12" ref={listTopRef} style={{ scrollMarginTop: '135px' }}>
              <div className="flex flex-wrap items-end justify-between gap-3 mb-7">
                <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#182A2C] tracking-tight leading-tight">{listTitle}</h2>
                {(searchQuery || activeCategory !== 'Todos') && (
                  <button onClick={resetFilters} className="text-sm font-semibold text-slate-500 hover:text-[#182A2C] underline underline-offset-4">
                    Ver todos los artículos
                  </button>
                )}
              </div>

              {/* Categories as chips on small screens; the sidebar holds them on desktop */}
              <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-7">
                {['Todos', ...categoryLinks].map((cat) => (
                  <Link
                    key={cat}
                    to={blogUrl(params, { categoria: cat, pagina: null })}
                    replace
                    aria-current={activeCategory === cat ? 'page' : undefined}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                      activeCategory === cat ? 'bg-[#182A2C] border-[#182A2C] text-white' : 'bg-white border-slate-200 text-[#182A2C]'
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              {pagePosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7">
                  {pagePosts.map((post) => (
                    <article key={post.slug} className="h-full">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_30px_-12px_rgba(16,24,40,0.25)] hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <PostCover post={post} className="aspect-[16/9.5]" />
                        <div className="flex flex-col flex-1 p-6">
                          <h3 className="text-[19px] md:text-[21px] font-bold text-[#182A2C] leading-snug tracking-tight line-clamp-3">
                            {post.title}
                          </h3>
                          <p className="mt-3 text-[15px] text-slate-600 leading-relaxed line-clamp-3">{post.seoDescription}</p>
                          <div className="mt-auto pt-5">
                            <p className="text-sm text-slate-400">
                              {formatDate(post.date)} · {readTimeOf(post)} de lectura
                            </p>
                            <div className="mt-3"><ReadMore /></div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-2xl border border-dashed border-slate-300">
                  <Search size={28} className="mx-auto mb-4 text-slate-400" />
                  <h3 className="text-xl font-bold text-[#182A2C] mb-2">No encontramos artículos</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                    Probá con otra palabra, por ejemplo React, WhatsApp, SEO o e-commerce.
                  </p>
                  <button onClick={resetFilters} className="bg-[#182A2C] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-black transition-colors">
                    Ver todos los artículos
                  </button>
                </div>
              )}

              {/* Pagination footer */}
              {listPosts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-5">
                  <p className="text-sm text-slate-500">
                    Mostrando <strong className="text-[#182A2C]">{rangeStart} - {rangeEnd}</strong> de <strong className="text-[#182A2C]">{listPosts.length}</strong> artículos
                  </p>
                  <Pagination page={page} totalPages={totalPages} hrefFor={(p) => blogUrl(params, { pagina: p })} onNavigate={scrollToList} />
                  <label className="flex items-center gap-2 text-sm text-slate-500">
                    Mostrar
                    <select
                      value={pageSize}
                      onChange={(e) => updateParams({ mostrar: Number(e.target.value) === DEFAULT_PAGE_SIZE ? null : e.target.value, pagina: null })}
                      className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#182A2C] font-semibold focus:outline-none focus:border-[#182A2C]"
                    >
                      {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 min-w-0">
              <div className="space-y-10">
                <div className="hidden lg:block">
                  <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#182A2C] tracking-tight leading-tight mb-7">Categorías</h2>
                  <ul className="bg-white rounded-2xl border border-slate-200/70 py-3">
                    {categoryLinks.map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <li key={cat}>
                          <Link
                            to={blogUrl(params, { categoria: cat, pagina: null })}
                            replace
                            onClick={scrollToList}
                            aria-current={isActive ? 'page' : undefined}
                            className={`flex items-center justify-between gap-3 px-7 py-3 text-[15px] font-semibold transition-colors ${
                              isActive ? 'text-[#182A2C] bg-[#d9fb06]/30' : 'text-[#182A2C]/80 hover:text-[#182A2C] hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: styleFor(cat).accent }} />
                              {cat}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">{categoryCounts[cat] || 0}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#182A2C] tracking-tight leading-tight mb-7">Lo más leído</h2>
                  {mostRead[0] && (
                    <Link to={`/blog/${mostRead[0].slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200/70 mb-5">
                      <PostCover post={mostRead[0]} className="aspect-[16/10]" />
                      <h3 className="p-5 text-[17px] font-bold text-[#182A2C] leading-snug group-hover:underline decoration-[#d9fb06] decoration-[3px] underline-offset-4">
                        {mostRead[0].title}
                      </h3>
                    </Link>
                  )}
                  <ol className="bg-white rounded-2xl border border-slate-200/70 divide-y divide-slate-100">
                    {mostRead.slice(1).map((post, i) => (
                      <li key={post.slug}>
                        <Link to={`/blog/${post.slug}`} className="group flex gap-4 p-5">
                          <span className="text-2xl font-extrabold text-[#182A2C]/20 leading-none w-6 shrink-0">{i + 2}</span>
                          <h3 className="text-[15px] font-semibold text-[#182A2C] leading-snug line-clamp-3 group-hover:underline decoration-[#d9fb06] decoration-2 underline-offset-2">
                            {post.title}
                          </h3>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl bg-[#182A2C] p-7 text-white">
                  <h2 className="text-xl font-bold">¿Tenés un proyecto en mente?</h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Contanos tu idea y te enviamos un presupuesto sin costo en el día hábil.
                  </p>
                  <Link
                    to="/contacto"
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-5 py-3 text-sm font-bold text-[#182A2C] hover:bg-white transition-colors"
                  >
                    Solicitar cotización
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
        </div>
      </section>

      <div className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        {/* About the blog */}
        <section aria-labelledby="sobre-el-blog" className="max-w-3xl">
          <h2 id="sobre-el-blog" className="text-2xl md:text-3xl font-extrabold text-[#182A2C] tracking-tight mb-4">Sobre este blog</h2>
          <div className="space-y-3 text-[15px] md:text-base text-slate-600 leading-relaxed">
            <p>
              En este blog explicamos lo que una empresa necesita saber antes de invertir en tecnología: cuánto cuesta una página web o una app, cómo aparecer en Google, qué conviene automatizar con inteligencia artificial y cómo elegir entre opciones como WordPress o React, una plataforma de e-commerce o una tienda a medida, Make o n8n.
            </p>
            <p>
              Lo escribe el equipo de Websy, una agencia de desarrollo web de Salta, Argentina, que trabaja con pymes y profesionales de Argentina, Colombia, México y Estados Unidos. Por eso los ejemplos, los precios y las herramientas son de Latinoamérica: Mercado Pago, facturación electrónica, WhatsApp Business.
            </p>
            <p>
              Los artículos están organizados por categoría: desarrollo web, apps móviles, e-commerce, IA y automatización, sistemas de gestión, APIs y cloud, ciberseguridad, diseño UX/UI, SaaS, soluciones por industria y SEO. Si recién empezás, te sirven las guías de costos y la de SEO local; si ya tenés una web, las de velocidad y conversión. Abajo está el <a href="#indice-de-articulos" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">índice con todos los artículos</a>.
            </p>
          </div>
        </section>

        {/* Índice completo: todos los artículos enlazados con <a href>, sin depender de la paginación */}
        <section id="indice-de-articulos" aria-labelledby="indice-titulo" className="mt-14 pt-12 border-t border-slate-200" style={{ scrollMarginTop: '135px' }}>
          <h2 id="indice-titulo" className="text-2xl md:text-3xl font-extrabold text-[#182A2C] tracking-tight mb-2">Índice de artículos</h2>
          <p className="text-slate-600 mb-10">Los {blogPosts.length} artículos del blog, por categoría.</p>
          <div className="grid gap-10 md:grid-cols-2">
            {postsByCategory.map(({ cat, posts }) => (
              <div key={cat}>
                <h3 className="text-base font-bold uppercase tracking-[0.12em] mb-4" style={{ color: '#556902' }}>{cat} ({posts.length})</h3>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link to={`/blog/${post.slug}`} className="text-[15px] text-[#182A2C] hover:underline decoration-[#d9fb06] decoration-2 underline-offset-4">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
