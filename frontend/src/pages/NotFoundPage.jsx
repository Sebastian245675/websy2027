import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

// Cualquier ruta desconocida: noindex para que Google no la indexe como copia del inicio (soft 404)
export const NotFoundPage = () => (
  <div className="min-h-[70vh] flex items-center justify-center bg-white pt-[120px] pb-20 px-5 font-outfit">
    <SEOHead title="Página no encontrada | Websy" noindex breadcrumbs={false} />
    <div className="text-center max-w-xl">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Error 404</p>
      <h1 className="text-4xl md:text-5xl font-black text-[#182A2C] tracking-tight mb-6">Esta página no existe</h1>
      <p className="text-lg text-slate-600 mb-10">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="bg-[#182A2C] text-[#d9fb06] px-7 py-4 font-bold">Ir al inicio</Link>
        <Link to="/casos-de-exito" className="border border-[#182A2C] text-[#182A2C] px-7 py-4 font-bold">Ver casos de éxito</Link>
      </div>
    </div>
  </div>
);
