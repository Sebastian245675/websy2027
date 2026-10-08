import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

// Preguntas frecuentes del Inicio y de /planes (Inversión), punto 8.
// Pendiente de Agustín: plazo típico por tipo de proyecto y condiciones de soporte después de la entrega.
// Mientras tanto se usan los plazos que ya publicaba el sitio.
const PAYMENT = {
  q: '¿Cómo se paga?',
  a: 'En 3 cuotas: 30% al inicio, 30% a mitad del proyecto y 40% en la entrega. En Argentina podés pagar con Naranja X o Mercado Pago; desde el exterior, con Dólar App o Binance.',
};
const MEXICO = {
  q: '¿Trabajan con clientes de México?',
  a: 'Sí. Trabajamos a distancia con clientes de México, Estados Unidos y el resto de Latinoamérica. En México, por ejemplo, hicimos el sistema de gestión y la tienda online de una cadena de bicicletas con 4 sucursales.',
};
const TIMING = {
  q: '¿Cuánto tarda?',
  a: 'Depende del proyecto: una landing page suele estar lista en 5 a 7 días hábiles, un sitio institucional en 2 a 3 semanas y una tienda online en 3 a 6 semanas. El plazo exacto queda escrito en la cotización.',
};
const REVISIONS = {
  q: '¿Cuántas revisiones incluye?',
  a: 'Entre 3 y 5 rondas de cambios, según lo que defina el contrato.',
};
const AFTER = {
  q: '¿Qué pasa después de la entrega?',
  a: 'Te entregamos el sitio publicado y funcionando, y te mostramos cómo usarlo. Después de la entrega seguís teniendo soporte para dudas y ajustes; las condiciones quedan detalladas en el contrato.',
};
const PRICE = {
  q: '¿Cuánto cuesta una página web?',
  a: 'Los sitios institucionales y landing pages arrancan en USD 800, las tiendas online van de USD 1.800 a 3.500 y los sistemas de gestión para pymes de USD 4.000 a 8.000.',
  link: { to: '/planes', label: 'Ver inversión por plan' },
};

export const HOME_FAQ = [PRICE, PAYMENT, TIMING, REVISIONS, AFTER, MEXICO];
export const PLANS_FAQ = [PAYMENT, TIMING, REVISIONS, AFTER, MEXICO];

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const FAQSection = ({ items, title = 'Preguntas frecuentes', id = 'preguntas-frecuentes' }) => (
  <section id={id} className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#52645d] mb-5">
        <span className="h-2 w-2 rounded-full bg-[#d9fb06] ring-4 ring-[#d9fb06]/25" />
        Antes de empezar
      </div>
      <h2 className="text-[30px] md:text-[42px] font-extrabold text-[#182A2C] leading-[1.1] tracking-tight mb-10">
        {title}
      </h2>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {items.map(({ q, a, link }) => (
          <details key={q} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg md:text-xl font-bold text-[#182A2C] [&::-webkit-details-marker]:hidden">
              {q}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-transform duration-300 group-open:rotate-45 group-open:bg-[#d9fb06] group-open:border-[#d9fb06]">
                <Plus size={18} />
              </span>
            </summary>
            <p className="pb-6 pr-12 text-base md:text-lg leading-relaxed text-[#475569]">
              {a}
              {link && (
                <>
                  {' '}
                  <Link to={link.to} className="font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
                    {link.label}
                  </Link>
                </>
              )}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
