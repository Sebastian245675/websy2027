import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gauge, MessageCircle, MousePointerClick, Search, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AuditForm } from '../components/AuditForm';
import { FAQSection, faqSchema } from '../components/FAQSection';
import { whatsappUrl } from '../siteConfig';

// Auditoría web gratuita con página propia: se puede pautar y medir (antes era solo un botón a WhatsApp).
// Formulario de 2 campos (web y WhatsApp): es la oferta de bajo riesgo para quien todavía no está listo para cotizar.

const PAGE_URL = 'https://www.websysrl.com/auditoria-gratis';

const CHECKS = [
  { icon: Search, title: 'Si aparecés en Google', text: 'Qué buscan tus clientes, si tu web sale y qué le falta para salir: títulos, una página por servicio, datos de negocio local.' },
  { icon: Gauge, title: 'Velocidad en el celular', text: 'Cuánto tarda en cargar en un teléfono común y qué la está frenando: imágenes, scripts, plantilla.' },
  { icon: MousePointerClick, title: 'Si convierte visitas en consultas', text: 'Si en 5 segundos se entiende qué hacés, para quién y cómo contactarte, y si el WhatsApp está a un toque.' },
  { icon: ShieldCheck, title: 'Confianza', text: 'Casos, reseñas, precios orientativos, datos de contacto coherentes y certificado de seguridad.' },
];

const FAQ = [
  { q: '¿La auditoría es gratis de verdad?', a: 'Sí. Te mandamos por WhatsApp 3 mejoras concretas para tu web, sin costo y sin compromiso. Si después querés que las hagamos nosotros, te pasamos una propuesta aparte.' },
  { q: '¿Cuánto tarda?', a: 'Te respondemos en el día hábil con las 3 mejoras priorizadas por impacto.' },
  { q: '¿Y si todavía no tengo web?', a: 'Marcá "Todavía no tengo web" y te decimos por dónde empezar según tu rubro: qué tipo de sitio te conviene, qué tiene que tener y cuánto cuesta.' },
  { q: '¿Qué pasa con mis datos?', a: 'Solo los usamos para enviarte la auditoría por WhatsApp. No los compartimos con nadie.' },
];

export const AuditPage = () => (
  <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
    <SEOHead
      title="Auditoría web gratis: 3 mejoras para tu página | Websy"
      description="Dejanos tu web y tu WhatsApp: te enviamos 3 mejoras concretas para aparecer en Google y conseguir más consultas. Gratis y en el día hábil."
      url={PAGE_URL}
      jsonLd={faqSchema(FAQ)}
    />

    <section className="bg-[#182A2C] text-white">
      <div className="container mx-auto px-5 lg:px-8 max-w-6xl py-12 md:py-16 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <ChevronRight size={13} />
            <span className="text-white font-semibold">Auditoría web gratis</span>
          </nav>
          <h1 className="text-[34px] sm:text-5xl font-black leading-[1.06] tracking-tight">
            Auditoría web <span className="text-[#d9fb06]">gratis</span>: 3 mejoras para conseguir más clientes
          </h1>
          <p className="mt-5 text-lg text-white/80 leading-relaxed">
            Revisamos tu web como la ve Google y como la ve un cliente desde el celular, y te mandamos por WhatsApp las 3 mejoras que más consultas te pueden traer. En el día hábil, sin costo.
          </p>
          <p className="mt-6 text-white/70 text-[15px] leading-relaxed">
            Es lo mismo que hacemos antes de cada proyecto. Por ejemplo, para una empresa de paisajismo de St. Louis la web y una respuesta automática a las consultas terminaron en unas 40 consultas calificadas por mes. <Link to="/casos-de-exito/web-y-automatizacion-paisajismo-estados-unidos-stl-gold" className="font-semibold text-[#d9fb06] underline underline-offset-4">Ver el caso</Link>.
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-black mb-1">Pedí tu auditoría</h2>
            <p className="text-white/60 text-sm mb-6">Solo tu web y tu WhatsApp.</p>
            <AuditForm source="auditoria_pagina" compact dark />
          </div>
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight mb-10">Qué revisamos</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {CHECKS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-[#d9fb06] flex items-center justify-center"><Icon size={22} className="text-[#182A2C]" /></div>
              <h3 className="mt-4 text-lg font-bold text-[#182A2C]">{title}</h3>
              <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-[15px] text-slate-600">
          ¿Ya sabés lo que necesitás? Mirá cuánto cuesta en el <Link to="/cotizador" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">cotizador</Link> o{' '}
          <a href={whatsappUrl('Hola! Quiero una auditoría de mi web.')} target="_blank" rel="noopener noreferrer" data-wa-location="auditoria_pagina_texto" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4 inline-flex items-center gap-1"><MessageCircle size={14} /> escribinos por WhatsApp</a>.
        </p>
      </div>
    </section>

    <FAQSection items={FAQ} title="Preguntas sobre la auditoría" />
  </div>
);
