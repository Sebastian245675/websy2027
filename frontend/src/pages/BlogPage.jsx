import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { blogPosts, blogCategories } from '../blogData';

// Inline SVG icons
const FiClock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const FiArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const FiCalendar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const FiSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const FiX = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const FiTag = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
);

const popularSearchTags = [
  'React',
  'WhatsApp',
  'IA',
  'Flutter',
  'E-commerce',
  'SEO',
  'ERP',
  'MercadoPago',
  'Ciberseguridad',
  'SaaS'
];

export const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = { Todos: blogPosts.length };
    blogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter posts by category and search query (searching in title, description, keywords, category, author & body content)
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = post.title.toLowerCase().includes(q);
      const descMatch = post.seoDescription ? post.seoDescription.toLowerCase().includes(q) : false;
      const kwMatch = post.seoKeywords ? post.seoKeywords.toLowerCase().includes(q) : false;
      const categoryMatch = post.category ? post.category.toLowerCase().includes(q) : false;
      const contentMatch = post.content ? post.content.toLowerCase().includes(q) : false;

      return titleMatch || descMatch || kwMatch || categoryMatch || contentMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white pt-[68px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title="Blog de Desarrollo Web, Apps, IA y Software | Websy"
        description="Buscador y biblioteca completa de artículos sobre desarrollo web, React, apps móviles, e-commerce, automatización con IA, CRM/ERP y ciberseguridad. Guías tácticas para empresas."
        keywords="blog desarrollo web, buscador desarrollo software, articulos apps moviles, guias ecommerce, blog tecnologia argentina, automatizaciones ia blog, sistemas erp a medida, react native flutter, seo tecnico"
        url="https://www.websysrl.com/blog"
      />

      {/* Header & Prominent Search Bar */}
      <section className="bg-[#182A2C] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,#d9fb0640,transparent)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-white">Blog & Buscador</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] mb-4">
            Buscador de <span className="bg-[#d9fb06] text-[#182A2C] px-3">Desarrollo & Tech</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Explora y busca entre decenas de artículos especializados sobre desarrollo web, aplicaciones móviles, e-commerce, inteligencia artificial y arquitectura de software.
          </p>

          {/* Buscador Destacado */}
          <div className="bg-white/10 p-3 md:p-4 rounded-2xl border border-white/20 backdrop-blur-md max-w-3xl shadow-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#d9fb06]">
                <FiSearch size={22} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué tipo de desarrollo estás buscando? (ej. React, WhatsApp, App, ERP, SEO...)"
                className="w-full pl-12 pr-12 py-4 bg-white text-[#182A2C] placeholder-gray-500 font-medium text-base rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-[#d9fb06]/50 shadow-inner transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#182A2C] transition-colors"
                  title="Limpiar búsqueda"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>

            {/* Popular Tags under search */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pt-1 scrollbar-hide">
              <span className="text-xs text-gray-300 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                <FiTag size={12} /> Búsquedas rápidas:
              </span>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                {popularSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap ${
                      searchQuery.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#d9fb06] text-[#182A2C]'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="border-b border-gray-100 sticky top-[68px] bg-white z-30 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-2 overflow-x-auto py-3.5 scrollbar-hide">
            {blogCategories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-full transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#182A2C] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-[#d9fb06] text-[#182A2C]' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center text-sm text-gray-500">
          <div>
            Mostrando <strong className="text-[#182A2C] font-bold">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
            {activeCategory !== 'Todos' && <span> en <span className="text-[#182A2C] font-semibold">{activeCategory}</span></span>}
            {searchQuery && <span> para "<span className="text-[#182A2C] font-semibold">{searchQuery}</span>"</span>}
          </div>
          {(searchQuery || activeCategory !== 'Todos') && (
            <button
              onClick={() => {
                setActiveCategory('Todos');
                setSearchQuery('');
              }}
              className="text-xs text-[#182A2C] underline font-bold hover:text-[#182A2C]/80"
            >
              Restablecer filtros y búsqueda
            </button>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group flex flex-col bg-white border border-gray-150 rounded-2xl overflow-hidden hover:border-[#d9fb06] hover:shadow-xl transition-all duration-300 ${
                    idx === 0 && activeCategory === 'Todos' && !searchQuery ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#d9fb06] text-[#182A2C] px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <FiClock size={11} />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className={`font-black text-[#182A2C] mb-3 leading-tight group-hover:text-black ${
                      idx === 0 && activeCategory === 'Todos' && !searchQuery ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                    }`}>
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.seoDescription}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FiCalendar size={11} />
                        {new Date(post.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#182A2C] group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                        Leer artículo <FiArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <FiSearch size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#182A2C] mb-2">No se encontraron resultados para "{searchQuery}"</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                Prueba con otro término de búsqueda o explora los tags populares como React, IA, WhatsApp o E-commerce.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('Todos');
                  setSearchQuery('');
                }}
                className="bg-[#182A2C] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#d9fb06] hover:text-[#182A2C] transition-all"
              >
                Limpiar búsqueda y ver todos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#182A2C] text-white border-t border-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            ¿Querés desarrollar un proyecto de software a medida?
          </h2>
          <p className="text-gray-300 mb-8">
            Contanos tu idea y te enviamos un presupuesto detallado sin costo en menos de 24 horas.
          </p>
          <Link
            to="/contacto"
            className="inline-block bg-[#d9fb06] text-[#182A2C] font-black text-sm uppercase tracking-[0.15em] px-10 py-5 rounded-xl hover:bg-white hover:text-[#182A2C] transition-all shadow-lg"
          >
            Solicitar cotización gratis
          </Link>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
