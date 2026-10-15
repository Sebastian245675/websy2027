import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getPostBySlug } from '../blogData';

// Guías más consultadas, enlazadas desde la home: son los posts que ya están entre las posiciones 6 y 12 de
// Google (Search Console, octubre de 2026). El enlace desde la página con más autoridad del sitio es lo que
// más ayuda a empujarlos al top 3. Actualizar la lista con los datos de Search Console.
const GUIDES = [
  'cuanto-cuesta-desarrollar-una-app-movil-argentina-latam',
  'cuanto-cuesta-pagina-web-argentina-2026',
  'stripe-vs-mercadopago-cual-pasarela-pagos-elegir-ecommerce',
  'publicar-app-app-store-google-play-guia-paso-a-paso',
  'como-monetizar-una-app-movil-suscripciones-anuncios-in-app-purchases',
  'automatizacion-whatsapp-negocios-guia-completa',
];

export const HomeGuides = () => {
  const posts = GUIDES.map(getPostBySlug).filter(Boolean);
  return (
    <section className="py-16 md:py-24 bg-[#f4f7f9]" aria-labelledby="guias-titulo">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#556902] mb-3">Antes de contratar</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 id="guias-titulo" className="text-[28px] md:text-[38px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight max-w-3xl">
            Las guías que más consultan nuestros clientes
          </h2>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
            Ver todo el blog <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#182A2C] transition-colors">
              <h3 className="text-lg font-bold text-[#182A2C] leading-snug">{p.title}</h3>
              {p.seoDescription && <p className="mt-3 text-[15px] text-slate-600 leading-relaxed line-clamp-3">{p.seoDescription}</p>}
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
                Leer la guía <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
