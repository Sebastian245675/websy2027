import React, { useMemo, useState } from 'react';
import { whatsappUrl } from '../siteConfig';
import { formatPrice, formatUsdAmount, getMarket } from '../pricing';
import useVisitorCountry from '../hooks/useVisitorCountry';

// Calculadora de la nota "cuánto cuesta crear una app". Solo usa los cuatro rangos que la nota publica
// (desde USD 2.000; 3.000 a 5.000; desde 5.000; por alcance): no inventa precios por función.
// Cada respuesta puede subir de rango, nunca bajar: el resultado es el rango más alto que pide alguna respuesta.

const TIERS = [
  { name: 'App informativa o catálogo', price: { min: 2000 }, time: '4 a 6 semanas', includes: 'Listado de productos o servicios, contacto por WhatsApp y notificaciones básicas, con su panel de administración.' },
  { name: 'App de turnos, pedidos o reservas', price: { min: 3000, max: 5000 }, time: '6 a 10 semanas', includes: 'Usuarios con cuenta, calendario o pedidos, notificaciones y panel de administración.' },
  { name: 'App con pagos y operación en tiempo real', price: { min: 5000 }, time: '10 a 16 semanas', includes: 'Pasarela de pago, seguimiento en mapa, chat y distintos tipos de usuario.' },
  { name: 'Plataforma tipo marketplace o fintech', price: null, time: 'Más de 4 meses', includes: 'Varias apps conectadas, billetera o validación de identidad. Se cotiza por alcance, normalmente empezando por un MVP.' },
];

const QUESTIONS = [
  { id: 'goal', label: '¿Qué tiene que hacer la app?', options: [
    ['Mostrar productos, servicios o información', 0],
    ['Tomar turnos, pedidos o reservas', 1],
    ['Cobrar dentro de la app o seguir algo en un mapa', 2],
    ['Conectar a varios tipos de usuarios (tipo Rappi, Uber o un marketplace)', 3],
  ] },
  { id: 'accounts', label: '¿Los usuarios necesitan crear una cuenta?', options: [['No', 0], ['Sí', 1]] },
  { id: 'chat', label: '¿Necesita chat entre usuarios o avisos en tiempo real?', options: [['No', 0], ['Sí', 2]] },
  { id: 'platforms', label: '¿En qué teléfonos?', options: [['Android e iPhone', 0], ['Solo uno de los dos', 0]] },
];

export const AppCostCalculator = ({ postTitle }) => {
  const country = useVisitorCountry();
  const [answers, setAnswers] = useState({});
  const complete = QUESTIONS.every((q) => answers[q.id] !== undefined);

  const tier = useMemo(() => {
    if (!complete) return null;
    return TIERS[Math.max(...QUESTIONS.map((q) => q.options[answers[q.id]][1]))];
  }, [answers, complete]);

  // Con país de moneda propia: moneda local y USD. Sin país o en dólares: USD con el formato del resto del sitio
  const usdOnly = ({ min, max }) => (max ? `${formatUsdAmount(min)} a ${formatUsdAmount(max)}` : `Desde ${formatUsdAmount(min)}`);
  const price = !tier?.price
    ? 'Se cotiza por alcance'
    : country && getMarket(country).currency !== 'USD'
      ? formatPrice(tier.price, country, { includeUsd: true })
      : usdOnly(tier.price);
  const summary = complete ? QUESTIONS.map((q) => `${q.label} ${q.options[answers[q.id]][0]}`).join(' · ') : '';
  const waText = tier
    ? `Hola, usé la calculadora de "${postTitle}". Resultado: ${tier.name}, ${price}. ${summary}. Quiero una cotización exacta.`
    : '';

  return (
    <aside id="calculadora" className="my-10 rounded-2xl border-2 border-[#182A2C] bg-white overflow-hidden" aria-label="Calculadora del costo de una app">
      <div className="bg-[#182A2C] px-6 py-5 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9fb06]">Calculadora</p>
        <p className="mt-1 text-xl md:text-2xl font-black text-white leading-snug">¿Cuánto costaría tu app? Responde 4 preguntas</p>
      </div>
      <div className="px-6 py-6 md:px-8 space-y-6">
        {QUESTIONS.map((q) => (
          <fieldset key={q.id}>
            <legend className="text-[15px] font-bold text-[#182A2C] mb-2.5">{q.label}</legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map(([label], i) => {
                const active = answers[q.id] === i;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [q.id]: i })}
                    aria-pressed={active}
                    className={`rounded-xl border-2 px-4 py-2.5 text-left text-sm font-semibold transition-colors ${active ? 'border-[#182A2C] bg-[#182A2C] text-white' : 'border-slate-200 text-[#182A2C] hover:border-[#182A2C]'}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        {tier ? (
          <div className="rounded-xl bg-[#f4f7f9] p-5 md:p-6" role="status">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#556902]">Tu app sería: {tier.name}</p>
            <p className="mt-2 text-2xl md:text-3xl font-black text-[#182A2C]">{price}</p>
            <p className="mt-1 text-sm font-semibold text-[#182A2C]">Plazo habitual: {tier.time}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{tier.includes} A eso se suman las cuentas de las tiendas: USD 99 por año en Apple y USD 25 por única vez en Google.</p>
            <a
              href={whatsappUrl(waText)}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-location="calculadora_app"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-black text-white hover:bg-[#1ebe5b] transition-colors"
            >
              Pedir la cotización exacta por WhatsApp
            </a>
            <p className="mt-3 text-xs text-slate-500">Valores orientativos de Websy. El precio final queda por escrito antes de empezar.</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Elige una opción en cada pregunta para ver el rango de precio y el plazo.</p>
        )}
      </div>
    </aside>
  );
};
