import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection } from '../components/FAQSection';
import { formatPrice, getMarket } from '../pricing';
import { saveCountry } from '../lib/geo';
import { whatsappUrl } from '../siteConfig';

const SITE_URL = 'https://www.websysrl.com';
const MONTHLY_CHATBOT = { min: 200 };

const pages = {
  CO: {
    country: 'Colombia',
    path: '/colombia/automatizacion-procesos',
    locale: 'es_CO',
    hreflang: 'es-CO',
    title: 'Automatización de Procesos Empresariales en Colombia | Websy',
    description: 'Automatización de procesos en Colombia con IA, n8n, WhatsApp y CRM. Eliminamos tareas repetitivas y conectamos tus sistemas. Diagnóstico y precio cerrado.',
    h1: 'Automatización de procesos empresariales en Colombia',
    lead: 'Conectamos WhatsApp, CRM, email, formularios, planillas y sistemas internos para que las tareas repetitivas se ejecuten solas, con supervisión humana donde realmente hace falta.',
    location: 'Trabajamos a distancia con empresas de Bogotá, Medellín, Cali, Barranquilla y toda Colombia, en horario colombiano y por videollamada.',
    wa: 'Hola Websy, les escribo desde Colombia. Quiero analizar qué procesos de mi empresa puedo automatizar.',
  },
  MX: {
    country: 'México',
    path: '/mexico/automatizacion-procesos',
    locale: 'es_MX',
    hreflang: 'es-MX',
    title: 'Automatización de Procesos Empresariales en México | Websy',
    description: 'Automatización de procesos en México con IA, n8n, WhatsApp y CRM. Conectamos tus sistemas y eliminamos tareas repetitivas. Diagnóstico y precio cerrado.',
    h1: 'Automatización de procesos empresariales en México',
    lead: 'Automatizamos ventas, atención, administración y operaciones conectando WhatsApp, CRM, email, formularios, hojas de cálculo y los sistemas que tu empresa ya utiliza.',
    location: 'Trabajamos a distancia con empresas de CDMX, Guadalajara, Monterrey y todo México, con reuniones en horario del centro del país.',
    wa: 'Hola Websy, les escribo desde México. Quiero analizar qué procesos de mi empresa puedo automatizar.',
  },
};

const useCases = [
  ['Ventas', 'Registrar y calificar cada lead, asignarlo a un vendedor, actualizar el CRM y activar seguimientos sin depender de una planilla manual.'],
  ['WhatsApp y atención', 'Responder preguntas frecuentes, consultar datos reales, agendar y transferir la conversación a una persona cuando el caso lo requiere.'],
  ['Administración', 'Procesar formularios y documentos, mover datos entre herramientas, enviar avisos y generar comprobantes o reportes periódicos.'],
  ['Operaciones', 'Conectar pedidos, inventario, estados de trabajo, agenda y notificaciones para que cada evento active el siguiente paso.'],
];

const steps = [
  ['Medimos el proceso actual', 'Volumen, tiempo, errores, sistemas involucrados y costo de seguir haciéndolo a mano.'],
  ['Diseñamos reglas y límites', 'Qué se automatiza, qué necesita aprobación y cuándo debe intervenir una persona.'],
  ['Integramos y probamos', 'Construimos el flujo con n8n, Make o código y lo ejecutamos en paralelo al proceso manual.'],
  ['Documentamos y mejoramos', 'Tu equipo recibe capacitación y medimos horas liberadas, errores y tiempos de respuesta.'],
];

const alternates = [
  { hreflang: 'x-default', href: `${SITE_URL}/servicios/automatizaciones-ia` },
  { hreflang: 'es', href: `${SITE_URL}/servicios/automatizaciones-ia` },
  { hreflang: 'es-CO', href: `${SITE_URL}${pages.CO.path}` },
  { hreflang: 'es-MX', href: `${SITE_URL}${pages.MX.path}` },
];

const schema = (page, code, faqs) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: page.h1,
      serviceType: 'Automatización de procesos empresariales con inteligencia artificial',
      url: `${SITE_URL}${page.path}`,
      provider: { '@type': 'Organization', name: 'Websy', url: `${SITE_URL}/` },
      areaServed: { '@type': 'Country', name: page.country },
      offers: {
        '@type': 'Offer',
        priceCurrency: getMarket(code).currency,
        description: `Chatbot de WhatsApp con IA desde ${formatPrice(MONTHLY_CHATBOT, code)} por mes. Automatizaciones a medida según alcance.`,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
});

export const AutomationCountryPage = ({ code }) => {
  const page = pages[code];
  const monthlyPrice = formatPrice(MONTHLY_CHATBOT, code);
  const faqs = [
    { q: `¿Qué procesos se pueden automatizar en una empresa de ${page.country}?`, a: 'Registro y seguimiento de prospectos, atención por WhatsApp, turnos, recordatorios, carga de datos, generación de reportes, actualización del CRM, control de pedidos y tareas administrativas basadas en reglas.' },
    { q: '¿Tengo que cambiar los sistemas que ya utilizo?', a: 'No necesariamente. Primero revisamos si tus herramientas ofrecen API o una integración segura. El objetivo es conectarlas y aprovechar lo que ya funciona antes de proponer un reemplazo.' },
    { q: '¿Cuánto cuesta?', a: `Un chatbot de WhatsApp con IA parte desde ${monthlyPrice} por mes. Una automatización de procesos o un agente de IA a medida se cotiza según los sistemas, reglas, volumen y soporte. El precio queda cerrado por escrito.` },
    { q: '¿Cuánto tarda la implementación?', a: 'Un flujo acotado puede estar funcionando en 1 a 3 semanas. Los proyectos que conectan varios sistemas se dividen en etapas y se prueban en paralelo antes de reemplazar el proceso manual.' },
    { q: `¿Websy tiene oficina en ${page.country}?`, a: `No. Websy tiene su oficina en Salta, Argentina, y trabaja a distancia con empresas de ${page.country}. Las reuniones se coordinan en el horario local del cliente y cada avance se revisa en línea.` },
  ];

  useEffect(() => saveCountry(code), [code]);

  return (
    <div className="min-h-screen bg-white pt-[108px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={page.title}
        description={page.description}
        url={`${SITE_URL}${page.path}`}
        locale={page.locale}
        alternates={alternates}
        jsonLd={schema(page, code, faqs)}
      />

      <section className="bg-[#182A2C] text-white py-14 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Inicio</Link><ChevronRight size={13} />
            <Link to={`/${code === 'CO' ? 'colombia' : 'mexico'}`} className="hover:text-white">{page.country}</Link><ChevronRight size={13} />
            <span className="text-white">Automatización</span>
          </nav>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#d9fb06] mb-4">IA + n8n + WhatsApp + CRM</p>
              <h1 className="text-[35px] sm:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight">{page.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">{page.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl(page.wa, code)} target="_blank" rel="noopener noreferrer" data-wa-location={`automatizacion_${code.toLowerCase()}`} className="inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-6 py-3.5 font-bold text-[#182A2C] hover:bg-white transition-colors">
                  <MessageCircle size={18} /> Analizar mi proceso <ArrowRight size={16} />
                </a>
                <a href="#casos-de-uso" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10">Ver qué automatizar</a>
              </div>
            </div>
            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[.06] p-6">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#d9fb06]">Referencia de inversión</p>
              <p className="mt-3 text-3xl font-black">{monthlyPrice}<span className="text-base text-white/60">/mes</span></p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">Chatbot de WhatsApp con IA. Las integraciones y automatizaciones a medida se cotizan según el proceso.</p>
              <p className="mt-5 border-t border-white/10 pt-5 text-sm text-white/75 leading-relaxed">{page.location}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="casos-de-uso" className="py-16 md:py-20" style={{ scrollMarginTop: 110 }}>
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#182A2C] max-w-3xl">Procesos que podemos automatizar en tu empresa</h2>
          <p className="mt-4 max-w-3xl text-gray-600 text-lg leading-relaxed">No empezamos vendiendo un bot. Elegimos una tarea repetitiva, medimos su costo actual y diseñamos el flujo alrededor de tus reglas y herramientas.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {useCases.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-6">
                <h3 className="text-xl font-black text-[#182A2C]">{title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f6f7] py-16 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#182A2C]">Cómo implementamos la automatización</h2>
          <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(([title, text], index) => (
              <li key={title} className="rounded-2xl bg-white border border-gray-200 p-6">
                <span className="text-3xl font-black text-[#9db600]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-black text-[#182A2C]">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-[#182A2C] p-7 text-white">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#d9fb06]">Caso real</p>
            <h2 className="mt-3 text-2xl font-black">40 consultas calificadas y 5 clientes nuevos por mes</h2>
            <p className="mt-4 text-white/75 leading-relaxed">Para una empresa de paisajismo de St. Louis conectamos la web con una respuesta automática que recibe y califica cada consulta. Son resultados reportados por el cliente, no una proyección.</p>
            <Link to="/casos-de-exito/web-y-automatizacion-paisajismo-estados-unidos-stl-gold" className="mt-6 inline-flex items-center gap-2 font-bold text-[#d9fb06] underline underline-offset-4">Ver el caso completo <ArrowRight size={15} /></Link>
          </div>
          <div className="rounded-2xl border border-gray-200 p-7">
            <h2 className="text-2xl font-black text-[#182A2C]">Qué recibe tu empresa</h2>
            <ul className="mt-5 space-y-3 text-gray-700">
              {['Mapa del proceso y oportunidades', 'Flujo con errores y excepciones controladas', 'Pruebas con casos reales antes de publicar', 'Documentación y capacitación para el equipo', 'Medición y soporte después del lanzamiento'].map((item) => <li key={item} className="flex gap-2"><Check size={18} className="mt-0.5 shrink-0 text-[#718300]" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title={`Preguntas sobre automatización en ${page.country}`} />

      <section className="bg-[#182A2C] py-16 text-center text-white">
        <div className="container mx-auto px-5 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black">¿Qué tarea repite tu equipo todas las semanas?</h2>
          <p className="mt-4 text-lg text-white/70">Cuéntanos el proceso. Te diremos qué parte conviene automatizar, qué debe seguir en manos de una persona y cuál sería el siguiente paso.</p>
          <a href={whatsappUrl(page.wa, code)} target="_blank" rel="noopener noreferrer" data-wa-location={`automatizacion_${code.toLowerCase()}_cierre`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9fb06] px-7 py-4 font-bold text-[#182A2C] hover:bg-white transition-colors"><MessageCircle size={18} /> Solicitar diagnóstico</a>
          <p className="mt-6 text-sm text-white/60">También puedes revisar el <Link to="/servicios/automatizaciones-ia" className="underline">servicio general de automatización con IA</Link>.</p>
        </div>
      </section>
    </div>
  );
};
