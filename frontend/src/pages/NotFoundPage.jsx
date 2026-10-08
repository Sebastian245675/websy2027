import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { servicesData } from '../servicesSeoData';

// Cualquier ruta desconocida. Se prerenderiza como build/404.html y nginx la sirve con estado 404 real
// (ver scripts/finalize-build.js y deploy/nginx-site.conf). noindex para que Google no la indexe.
export const NotFoundPage = () => (
  <div className="min-h-[70vh] bg-white pt-[120px] pb-20 px-5 font-outfit">
    <SEOHead title="Página no encontrada | Websy" noindex breadcrumbs={false} />
    <div className="max-w-3xl mx-auto">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Error 404</p>
      <h1 className="text-4xl md:text-5xl font-black text-[#182A2C] tracking-tight mb-6">Esta página no existe</h1>
      <p className="text-lg text-slate-600 mb-10">Puede que el enlace esté mal escrito o que la página se haya movido. Estas secciones te pueden servir:</p>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-extrabold text-[#182A2C] mb-4">Servicios</h2>
          <ul className="space-y-2">
            {Object.values(servicesData).map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-[#182A2C] mb-4">Más</h2>
          <ul className="space-y-2">
            {[['/', 'Inicio'], ['/blog', 'Blog'], ['/casos-de-exito', 'Casos de éxito'], ['/planes', 'Precios y planes'], ['/contacto', 'Contacto']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
