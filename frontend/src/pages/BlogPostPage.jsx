import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { blogPosts } from '../blogData';
import { EMBED_ID, embedJson, loadPostContent, readEmbeddedContent } from '../blogs/postContent';
import postStats from '../blogs/postStats.json';
import { clusterOf } from '../blogs/clusters';
import { authorByName } from '../blogs/authors';
import ogImages from '../blogs/ogImages.json';
import { whatsappUrl } from '../siteConfig';

const SITE_URL = 'https://www.websysrl.com';

// "## Preguntas frecuentes" section of the markdown: each "### question" and the text under it.
// Only questions visible on the page go into the FAQPage schema.
const extractFaq = (md) => {
  if (!md) return [];
  const section = md.split(/^## Preguntas frecuentes[^\n]*$/m)[1];
  if (!section) return [];
  const body = section.split(/^## /m)[0];
  return body.split(/^### /m).slice(1).map((block) => {
    const [q, ...rest] = block.split('\n');
    const a = rest.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`>|]/g, '').replace(/\s+/g, ' ').trim();
    return { q: q.trim(), a };
  }).filter((f) => f.q && f.a);
};

// Neighbours in the cluster reading order, so every post links to 4 posts on the same topic
const clusterNeighbours = (cluster, slug, count = 4) => {
  const list = cluster.posts.map((e) => e.slug);
  const i = list.indexOf(slug);
  const ordered = i === -1 ? list : [...list.slice(i + 1), ...list.slice(0, i)];
  return ordered.slice(0, count);
};

// Inline SVG icons
const FiClock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const FiCalendar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const FiArrowLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const FiArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const FiShare2 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);

// Simple markdown renderer without dependency
const MarkdownContent = ({ content }) => {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let currentList = [];
  let inTable = false;
  let tableRows = [];
  let inCodeBlock = false;
  let codeBlockLines = [];
  let codeLang = '';

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2.5 my-5 pl-2">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-800 text-base md:text-lg leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-[#d9fb06] mt-2.5 shrink-0 border border-[#182A2C]" />
              <span dangerouslySetInnerHTML={{ __html: processInline(item) }} />
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headers = tableRows[0];
      const dataRows = tableRows.slice(2); // skip header separator
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-8 shadow-sm rounded-xl border border-gray-200">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-[#182A2C] text-white">
                {headers.split('|').filter(Boolean).map((h, i) => (
                  <th key={i} className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#d9fb06]">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white hover:bg-gray-50/80 transition-colors' : 'bg-gray-50/50 hover:bg-gray-50 transition-colors'}>
                  {row.split('|').filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="px-5 py-3.5 text-gray-800 font-medium">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockLines.length > 0) {
      elements.push(
        <div key={`code-${elements.length}`} className="my-6 rounded-xl overflow-hidden bg-[#0d1618] border border-gray-800 text-gray-100 font-mono text-sm shadow-xl">
          {codeLang && (
            <div className="bg-[#182A2C] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#d9fb06] border-b border-gray-800 flex justify-between items-center">
              <span>{codeLang}</span>
              <span className="text-gray-400 text-[10px]">Ejemplo Técnico</span>
            </div>
          )}
          <pre className="p-4 md:p-6 overflow-x-auto text-xs md:text-sm leading-relaxed text-gray-200">
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        </div>
      );
      codeBlockLines = [];
      inCodeBlock = false;
      codeLang = '';
    }
  };

  const processInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#182A2C]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-2 py-0.5 bg-gray-100 text-[#182A2C] font-mono text-xs md:text-sm rounded border border-gray-200 font-semibold">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#182A2C] underline decoration-[#d9fb06] decoration-4 underline-offset-4 hover:bg-[#d9fb06]/30 transition-all font-bold">$1</a>')
      .replace(/❌/g, '<span class="text-red-500 font-bold">❌</span>')
      .replace(/✅/g, '<span class="text-green-600 font-bold">✅</span>');
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Code block toggle (``` or ```javascript etc)
    if (trimmed.startsWith('```')) {
      flushList();
      flushTable();
      if (inCodeBlock) {
        flushCodeBlock();
      } else {
        inCodeBlock = true;
        codeLang = trimmed.replace('```', '').trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // Table detection
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      inTable = true;
      tableRows.push(trimmed);
      return;
    } else if (inTable) {
      flushTable();
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      flushList();
      elements.push(
        <hr key={idx} className="my-10 border-t-2 border-gray-100" />
      );
      return;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={idx} className="my-6 pl-5 py-3 border-l-4 border-[#d9fb06] bg-[#182A2C]/5 rounded-r-lg text-gray-800 italic font-medium">
          <span dangerouslySetInnerHTML={{ __html: processInline(trimmed.replace('> ', '')) }} />
        </blockquote>
      );
      return;
    }

    // Headers
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={idx} className="text-2xl md:text-3xl font-black text-[#182A2C] mt-12 mb-4 leading-tight border-b border-gray-100 pb-2">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-xl md:text-2xl font-bold text-[#182A2C] mt-8 mb-3">
          {trimmed.replace('### ', '')}
        </h3>
      );
    }
    // List items (- or 1., 2.)
    else if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      const itemText = trimmed.replace(/^(-\s|\d+\.\s)/, '');
      currentList.push(itemText);
    }
    // Empty lines
    else if (trimmed === '') {
      flushList();
    }
    // Paragraphs
    else {
      flushList();
      elements.push(
        <p key={idx} className="text-base md:text-lg text-gray-700 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: processInline(trimmed) }} />
      );
    }
  });

  flushList();
  flushTable();
  flushCodeBlock();

  return <div className="blog-content font-sans">{elements}</div>;
};

// Llamado a mitad del artículo según el tema: los de precios llevan al cotizador, el resto a la auditoría
// gratis. El lector del blog llega con una duda; al terminar la mitad ya sabe si le sirve dar el paso.
const splitAtMiddleHeading = (md) => {
  const starts = [...md.matchAll(/^## /gm)].map((m) => m.index);
  if (starts.length < 3) return [md, ''];
  const cut = starts.reduce((best, i) => (Math.abs(i - md.length / 2) < Math.abs(best - md.length / 2) ? i : best), starts[1]);
  return [md.slice(0, cut), md.slice(cut)];
};

const isPricingPost = (post, mapped) =>
  (mapped && mapped.cluster.id === 'precios') || /cuanto-cuesta|precio|presupuesto/.test(post.slug);

const MidArticleCta = ({ pricing, slug }) => (
  <aside className="my-10 rounded-2xl bg-[#182A2C] text-white p-6 md:p-8" aria-label={pricing ? 'Cotizador' : 'Auditoría gratis'}>
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9fb06]">{pricing ? 'Cotizador' : 'Auditoría web gratis'}</p>
    <p className="mt-2 text-xl md:text-2xl font-black leading-snug">
      {pricing ? '¿Cuánto costaría tu proyecto? Calculalo en 1 minuto con nuestros precios publicados.' : '¿Tu web aplica esto? Te mandamos 3 mejoras concretas por WhatsApp, gratis.'}
    </p>
    <Link
      to={pricing ? '/cotizador' : '/auditoria-gratis'}
      data-cta-location={`blog_medio_${slug}`}
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-6 py-3 text-sm font-black text-[#182A2C] hover:bg-white transition-colors"
    >
      {pricing ? 'Usar el cotizador' : 'Pedir mi auditoría gratis'} <FiArrowRight size={16} />
    </Link>
  </aside>
);

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [content, setContent] = useState(() => (post ? readEmbeddedContent(post.slug) : null));

  useEffect(() => {
    if (!post) return undefined;
    let active = true;
    const embedded = readEmbeddedContent(post.slug);
    if (embedded) {
      setContent(embedded);
      return undefined;
    }
    setContent(null);
    loadPostContent(post.slug).then((md) => { if (active) setContent(md); });
    return () => { active = false; };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-[100px]">
        <SEOHead title="Artículo no encontrado | Websy" noindex breadcrumbs={false} />
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#182A2C] mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-[#d9fb06] bg-[#182A2C] px-6 py-3 font-bold inline-block">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const mapped = clusterOf(post.slug);
  const cluster = mapped && mapped.cluster;
  const pillarPost = cluster && !mapped.isPillar ? blogPosts.find((p) => p.slug === cluster.pillar) : null;
  const serviceLink = cluster && ((mapped.entry && mapped.entry.service) || cluster.service);
  const relatedPosts = cluster && !mapped.isPillar
    ? clusterNeighbours(cluster, post.slug).map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean)
    : (post.relatedPosts || []).map((id) => blogPosts.find((p) => p.id === id)).filter(Boolean);
  const pillarIndex = mapped && mapped.isPillar
    ? cluster.posts.map((e) => ({ entry: e, post: blogPosts.find((p) => p.slug === e.slug) })).filter((x) => x.post)
    : [];
  const author = authorByName(post.author);
  const faq = extractFaq(content);

  // Tarjeta para compartir y miniatura del artículo (scripts/generate-og-images.py)
  const ogImage = ogImages.includes(post.slug) ? `/og/blog/${post.slug}.png` : undefined;

  // BlogPosting schema: author links to the author page (E-E-A-T)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seoDescription,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": author ? `${SITE_URL}/autores/${author.slug}` : SITE_URL,
      ...(author && { "jobTitle": author.jobTitle })
    },
    ...(cluster && { "articleSection": cluster.name }),
    ...(mapped && mapped.entry && { "keywords": mapped.entry.kw }),
    "publisher": {
      "@type": "Organization",
      "name": "Websy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.websysrl.com/websy-logo.png"
      }
    },
    ...(ogImage && { "image": `${SITE_URL}${ogImage}` }),
    "datePublished": post.date,
    "dateModified": post.updated || post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.websysrl.com/blog/${post.slug}`
    },
    "inLanguage": "es"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.websysrl.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.websysrl.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.websysrl.com/blog/${post.slug}` }
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.seoDescription,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={post.seoTitle}
        description={post.seoDescription}
        url={`https://www.websysrl.com/blog/${post.slug}`}
        type="article"
        image={ogImage}
        breadcrumbs={false}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faq.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }))
        }) }} />
      )}

      {/* Header */}
      <section className="bg-[#182A2C] pt-[100px] md:pt-[120px] pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,#d9fb0640,transparent)]" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="opacity-30">/</span>
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#d9fb06] text-[#182A2C] px-3 py-1 text-[10px] font-black uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FiClock size={11} />
              {(postStats[post.slug] || {}).readTime || post.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FiCalendar size={11} />
              {new Date(post.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d9fb06] flex items-center justify-center text-[#182A2C] font-black text-sm">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white text-sm font-bold">
                  {author ? <Link to={`/autores/${author.slug}`} className="hover:underline">{post.author}</Link> : post.author}
                </p>
                <p className="text-gray-400 text-xs">Websy</p>
                <a 
                  href={whatsappUrl(`Hola, leí el artículo "${post.title}" en el blog de Websy y quiero cotizar.`)}
                  data-wa-location="blog_autor"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-full text-xs font-bold transition-all border border-[#25D366]/40"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <FiShare2 size={14} />
              Compartir
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {content ? (
            <>
              {(() => {
                const [before, after] = splitAtMiddleHeading(content);
                return (
                  <>
                    <MarkdownContent content={before} />
                    {after && <MidArticleCta pricing={isPricingPost(post, mapped)} slug={post.slug} />}
                    {after && <MarkdownContent content={after} />}
                  </>
                );
              })()}
              {/* Markdown embedded in the prerendered HTML so hydration has it synchronously */}
              <script type="application/json" id={EMBED_ID} data-slug={post.slug} dangerouslySetInnerHTML={{ __html: embedJson(content) }} />
            </>
          ) : (
            <div className="min-h-[60vh]" aria-busy="true" />
          )}
        </div>
      </article>

      {/* Cluster: index of the guide (pillar) or link up to the guide + related service */}
      {cluster && (
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            {pillarIndex.length > 0 && (
              <div className="border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#182A2C] mb-5">Todos los artículos de esta guía</h2>
                <ol className="space-y-3 list-decimal pl-5">
                  {pillarIndex.map(({ entry, post: p }) => (
                    <li key={p.slug} className="text-gray-700">
                      <Link to={`/blog/${p.slug}`} className="font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">{p.title}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {pillarPost && (
              <Link to={`/blog/${pillarPost.slug}`} className="block border-l-4 border-[#d9fb06] bg-[#182A2C]/5 p-5 hover:bg-[#182A2C]/10 transition-colors">
                <span className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 mb-1">Este artículo es parte de la guía</span>
                <span className="block text-lg font-black text-[#182A2C]">{pillarPost.title}</span>
              </Link>
            )}
            {serviceLink && (
              <Link to={serviceLink} className="flex items-center justify-between gap-4 bg-[#182A2C] text-white p-5 hover:bg-black transition-colors">
                <span>
                  <span className="block text-[11px] font-black uppercase tracking-[0.15em] text-[#d9fb06] mb-1">Servicio relacionado</span>
                  <span className="block text-lg font-bold">{cluster.serviceLabel}</span>
                </span>
                <FiArrowRight size={20} />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Share & Back */}
      <section className="border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-3xl flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-bold text-[#182A2C] hover:gap-3 transition-all uppercase tracking-wider"
          >
            <FiArrowLeft size={14} />
            Volver al blog
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-[#182A2C] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#d9fb06] hover:text-[#182A2C] transition-all"
          >
            <FiShare2 size={14} />
            Compartir artículo
          </button>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#f9fafb] border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-black text-[#182A2C] mb-8 text-center">
              {cluster ? `Más sobre ${cluster.name.toLowerCase()}` : 'Artículos relacionados'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-[#d9fb06] hover:shadow-lg transition-all duration-300"
                >
                  <span className="bg-[#d9fb06] text-[#182A2C] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    {rp.category}
                  </span>
                  <h3 className="text-lg font-black text-[#182A2C] mt-3 mb-2 leading-tight line-clamp-2">{rp.title}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold mt-3 uppercase tracking-wider text-[#182A2C] group-hover:gap-2 transition-all">
                    Leer <FiArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#182A2C]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            ¿Necesitás ayuda con tu proyecto?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Cotización gratuita en el día hábil.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contacto"
              className="bg-[#d9fb06] text-[#182A2C] font-black text-sm uppercase tracking-[0.15em] px-10 py-5 hover:scale-105 transition-all text-center"
            >
              Solicitar cotización
            </Link>
            <a
              href="https://wa.me/5493884846695"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/20 text-white font-black text-sm uppercase tracking-[0.15em] px-10 py-5 hover:bg-white/10 transition-all text-center"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
};
