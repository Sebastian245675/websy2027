import React, { useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, X, ChevronLeft, ChevronRight, ArrowRight, Calendar, Clock,
  Code2, Smartphone, ShoppingCart, Bot, Database, Cloud, ShieldCheck,
  Palette, Building2, TrendingUp, Layers, FileText,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { blogPosts, blogCategories } from '../blogData';
import postStats from '../blogs/postStats.json';

// Posts have no images, so each category gets a branded cover (icon + accent color)
const CATEGORY_STYLE = {
  'Desarrollo Web': { icon: Code2, accent: '#d9fb06' },
  'Apps Móviles': { icon: Smartphone, accent: '#38bdf8' },
  'E-commerce': { icon: ShoppingCart, accent: '#fbbf24' },
  'IA & Automatización': { icon: Bot, accent: '#a78bfa' },
  'Sistemas & ERP': { icon: Database, accent: '#34d399' },
  'APIs & Cloud': { icon: Cloud, accent: '#60a5fa' },
  'Ciberseguridad': { icon: ShieldCheck, accent: '#f87171' },
  'UI/UX Design': { icon: Palette, accent: '#f472b6' },
  'Industrias & Tech': { icon: Building2, accent: '#fb923c' },
  'SEO & Marketing': { icon: TrendingUp, accent: '#4ade80' },
  'SaaS & Software Nube': { icon: Layers, accent: '#22d3ee' },
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

const PAGE_SIZES = [10, 20, 50];

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

const PostCover = ({ category, size = 'md', className = '' }) => {
  const { icon: Icon, accent } = styleFor(category);
  const iconBox = { sm: 'w-9 h-9 rounded-lg', md: 'w-14 h-14 rounded-2xl', lg: 'w-20 h-20 rounded-3xl' }[size];
  const iconSize = { sm: 18, md: 26, lg: 38 }[size];
  return (
    <div className={`relative overflow-hidden bg-[#182A2C] ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: size === 'sm' ? '10px 10px' : '24px 24px',
        }}
      />
      <Icon
        className="absolute -right-[8%] -bottom-[18%] w-[62%] h-auto opacity-[0.12]"
        style={{ color: accent }}
        strokeWidth={1.25}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${iconBox} flex items-center justify-center`} style={{ backgroundColor: accent }}>
          <Icon size={iconSize} className="text-[#182A2C]" strokeWidth={2} />
        </div>
      </div>
      {size !== 'sm' && (
        <span className="absolute left-4 bottom-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
          {category}
        </span>
      )}
    </div>
  );
};

const CategoryLabel = ({ category }) => (
  <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: '#556902' }}>
    {category}
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
    <Link to={hrefFor(target)} onClick={onNavigate} className={`${btn} text-[#182A2C] hover:bg-slate-100`} aria-label={label}>
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
          className={`${btn} ${p === page ? 'bg-[#182A2C] text-white' : 'text-[#182A2C] hover:bg-slate-100'}`}
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
  const pageSize = PAGE_SIZES.includes(Number(params.get('mostrar'))) ? Number(params.get('mostrar')) : 10;

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

  const isDefaultView = activeCategory === 'Todos' && !searchQuery;
  const featured = isDefaultView ? filteredPosts[0] : null;
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

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title="Blog de Desarrollo Web, Apps, IA y Software | Websy"
        description="Guías y artículos sobre desarrollo web, apps móviles, e-commerce, automatización con IA, CRM/ERP, SEO y ciberseguridad para empresas de Argentina y Latinoamérica."
        url="https://www.websysrl.com/blog"
      />

      {/* Header */}
      <section className="bg-[#f8fafc] border-b border-slate-200">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <div className="pt-8 pb-8 md:pt-12 md:pb-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#182A2C] transition-colors">Inicio</Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-[#182A2C] font-semibold">Blog</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-[34px] md:text-[44px] font-extrabold text-[#182A2C] leading-[1.1] tracking-tight">
                Blog de desarrollo web, apps e inteligencia artificial para empresas
              </h1>
              <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">
                Guías prácticas sobre desarrollo web, apps, e-commerce, inteligencia artificial y tecnología para hacer crecer tu empresa.
              </p>
            </div>

            <div className="relative w-full lg:w-[400px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => updateParams({ q: e.target.value, pagina: null })}
                placeholder="Buscar artículos…"
                aria-label="Buscar artículos del blog"
                className="w-full h-12 pl-11 pr-11 bg-white text-[#182A2C] placeholder-slate-400 text-[15px] rounded-xl border border-slate-200 focus:outline-none focus:border-[#182A2C] focus:ring-4 focus:ring-[#d9fb06]/40 transition-all"
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

          <div className="mt-6 max-w-3xl space-y-3 text-[15px] md:text-base text-slate-600 leading-relaxed">
            <p>
              En este blog explicamos lo que una empresa necesita saber antes de invertir en tecnología: cuánto cuesta una página web o una app, cómo aparecer en Google, qué conviene automatizar con inteligencia artificial y cómo elegir entre opciones como WordPress o React, una plataforma de e-commerce o una tienda a medida, Make o n8n.
            </p>
            <p>
              Lo escribe el equipo de Websy, una agencia de desarrollo web de Salta, Argentina, que trabaja con pymes y profesionales de Argentina, Colombia, México y Estados Unidos. Por eso los ejemplos, los precios y las herramientas son de Latinoamérica: Mercado Pago, facturación electrónica, WhatsApp Business.
            </p>
            <p>
              Los artículos están organizados por categoría: desarrollo web, apps móviles, e-commerce, IA y automatización, sistemas de gestión, APIs y cloud, ciberseguridad, diseño UX/UI, SaaS, soluciones por industria y SEO. Si recién empezás, te sirven las guías de costos y la de SEO local; si ya tenés una web, las de velocidad y conversión. Al final de la página está el <a href="#indice-de-articulos" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">índice con todos los artículos</a>.
            </p>
          </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Link
                  key={cat}
                  to={blogUrl(params, { categoria: cat, pagina: null })}
                  replace
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? 'border-[#182A2C] text-[#182A2C]'
                      : 'border-transparent text-slate-500 hover:text-[#182A2C]'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <div className="py-10 md:py-14">
        {/* Featured post */}
        {showFeatured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center mb-14 pb-14 border-b border-slate-200"
          >
            <PostCover category={featured.category} size="lg" className="aspect-[16/10] rounded-2xl" />
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] bg-[#d9fb06] text-[#182A2C] px-2.5 py-1 rounded">
                  Destacado
                </span>
                <CategoryLabel category={featured.category} />
              </div>
              <h2 className="text-2xl md:text-[32px] font-extrabold text-[#182A2C] leading-[1.15] tracking-tight group-hover:underline decoration-[#d9fb06] decoration-4 underline-offset-4">
                {featured.title}
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed line-clamp-3">{featured.seoDescription}</p>
              <div className="mt-6 flex items-center gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Calendar size={15} /> {formatDate(featured.date)}</span>
                <span className="flex items-center gap-1.5"><Clock size={15} /> {(postStats[featured.slug] || {}).readTime || featured.readTime} de lectura</span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main list */}
          <div className="lg:col-span-8 min-w-0" ref={listTopRef} style={{ scrollMarginTop: '135px' }}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-xl font-bold text-[#182A2C]">
                {searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : activeCategory === 'Todos' ? 'Artículos recientes' : activeCategory}
              </h2>
              {(searchQuery || activeCategory !== 'Todos') && (
                <button onClick={resetFilters} className="text-sm font-semibold text-slate-500 hover:text-[#182A2C] underline underline-offset-4">
                  Ver todos los artículos
                </button>
              )}
            </div>

            {pagePosts.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {pagePosts.map((post) => (
                  <article key={post.slug} className="py-7 first:pt-0">
                    <Link to={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row gap-5 sm:gap-7">
                      <PostCover category={post.category} className="sm:w-[240px] shrink-0 aspect-[16/10] rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <CategoryLabel category={post.category} />
                        <h3 className="mt-2 text-lg md:text-xl font-bold text-[#182A2C] leading-snug group-hover:underline decoration-[#d9fb06] decoration-[3px] underline-offset-4">
                          {post.title}
                        </h3>
                        <p className="mt-2.5 text-[15px] text-slate-600 leading-relaxed line-clamp-2">{post.seoDescription}</p>
                        <div className="mt-4 flex items-center gap-4 text-[13px] text-slate-500">
                          <span>{formatDate(post.date)}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{(postStats[post.slug] || {}).readTime || post.readTime} de lectura</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-[#f8fafc] rounded-2xl border border-dashed border-slate-300">
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
                    onChange={(e) => updateParams({ mostrar: e.target.value === '10' ? null : e.target.value, pagina: null })}
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
            <div className="lg:sticky lg:top-[135px] space-y-8">
              <div className="rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-[#182A2C] mb-5">Lo más leído</h2>
                <ol className="space-y-5">
                  {mostRead.map((post) => (
                    <li key={post.slug}>
                      <Link to={`/blog/${post.slug}`} className="group flex gap-4">
                        <PostCover category={post.category} size="sm" className="w-[72px] h-[56px] shrink-0 rounded-lg" />
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-[#182A2C] leading-snug line-clamp-2 group-hover:underline decoration-[#d9fb06] decoration-2 underline-offset-2">
                            {post.title}
                          </h3>
                          <span className="mt-1 block text-xs text-slate-500">{formatDate(post.date)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-[#182A2C] mb-4">Categorías</h2>
                <ul className="space-y-1">
                  {blogCategories.filter((c) => c !== 'Todos').map((cat) => {
                    const { icon: Icon } = styleFor(cat);
                    const isActive = activeCategory === cat;
                    return (
                      <li key={cat}>
                        <Link
                          to={blogUrl(params, { categoria: cat, pagina: null })}
                          replace
                          onClick={scrollToList}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive ? 'bg-[#182A2C] text-white' : 'text-[#334155] hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex items-center gap-2.5 font-medium">
                            <Icon size={16} className={isActive ? 'text-[#d9fb06]' : 'text-slate-400'} />
                            {cat}
                          </span>
                          <span className={`text-xs font-semibold ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                            {categoryCounts[cat] || 0}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl bg-[#182A2C] p-6 text-white">
                <h2 className="text-lg font-bold">¿Tenés un proyecto en mente?</h2>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Contanos tu idea y te enviamos un presupuesto sin costo en menos de 24 horas.
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

        {/* Índice completo: todos los artículos enlazados con <a href>, sin depender de la paginación */}
        <section id="indice-de-articulos" aria-labelledby="indice-titulo" className="mt-16 pt-12 border-t border-slate-200" style={{ scrollMarginTop: '135px' }}>
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
