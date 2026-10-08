import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { authorBySlug } from '../blogs/authors';
import { blogPosts } from '../blogData';
import { clusters } from '../blogs/clusters';
import { NotFoundPage } from './NotFoundPage';

const SITE_URL = 'https://www.websysrl.com';

export const AuthorPage = () => {
  const { slug } = useParams();
  const author = authorBySlug(slug);
  if (!author) return <NotFoundPage />;

  const url = `${SITE_URL}/autores/${author.slug}`;
  const posts = blogPosts.filter((p) => p.author === author.name);
  const byCluster = clusters
    .map((c) => ({ c, posts: posts.filter((p) => c.pillar === p.slug || c.posts.some((e) => e.slug === p.slug)) }))
    .filter(({ posts: list }) => list.length);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      description: author.summary,
      url,
      knowsAbout: author.expertise,
      worksFor: { '@type': 'Organization', name: 'Websy', url: SITE_URL },
      ...(author.sameAs.length && { sameAs: author.sameAs }),
    },
  };

  return (
    <div className="bg-white font-outfit">
      <SEOHead
        title={`${author.name}, ${author.jobTitle} | Websy`}
        description={author.summary}
        url={url}
        type="profile"
        jsonLd={schema}
      />
      <header className="bg-[#f6f7f4] border-b border-slate-200 pt-28 md:pt-36 pb-12">
        <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#52645d] mb-4">Autor del blog</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#182A2C] tracking-tight mb-3">{author.name}</h1>
          <p className="text-lg font-semibold text-slate-600">{author.jobTitle}</p>
        </div>
      </header>

      <div className="container mx-auto px-5 lg:px-8 max-w-4xl py-12 space-y-10">
        <section className="space-y-4 text-lg text-slate-700 leading-relaxed">
          {author.bio.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#182A2C] mb-4">Especialidades</h2>
          <ul className="flex flex-wrap gap-2">
            {author.expertise.map((e) => (
              <li key={e} className="border border-slate-200 px-3 py-1.5 text-sm font-semibold text-[#182A2C]">{e}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#182A2C] mb-2">Artículos de {author.name.split(' ')[0]}</h2>
          <p className="text-slate-600 mb-8">{posts.length} artículos, organizados por tema.</p>
          <div className="space-y-8">
            {byCluster.map(({ c, posts: list }) => (
              <div key={c.id}>
                <h3 className="text-base font-bold uppercase tracking-[0.12em] mb-3" style={{ color: '#556902' }}>{c.name}</h3>
                <ul className="space-y-2">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/blog/${p.slug}`} className="text-[#182A2C] hover:underline decoration-[#d9fb06] decoration-2 underline-offset-4">{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <p className="text-slate-600">
          Proyectos en los que trabajó el equipo: <Link to="/casos-de-exito" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">casos de éxito de Websy</Link>.
        </p>
      </div>
    </div>
  );
};
