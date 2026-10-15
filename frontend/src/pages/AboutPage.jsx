import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, ChevronRight, Code2, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CONTACT } from '../siteConfig';

// Quiénes somos: página de confianza (no de búsqueda), fuera del menú y enlazada desde el inicio y el pie.
// Solo datos confirmados: fundador contador, líder técnico, oficina en Salta, forma de trabajo y precios publicados.

const PAGE_URL = 'https://www.websysrl.com/quienes-somos';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: PAGE_URL,
  name: 'Quiénes somos | Websy',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://www.websysrl.com/#organization',
    name: 'Websy',
    founder: { '@type': 'Person', name: 'Agustín Dávila', jobTitle: 'Contador Público Nacional', url: 'https://www.websysrl.com/autores/agustin-davila' },
    employee: [{ '@type': 'Person', name: 'Sebastian Aguirre', jobTitle: 'Líder técnico', url: 'https://www.websysrl.com/autores/sebastian-aguirre' }],
    address: { '@type': 'PostalAddress', streetAddress: 'San Luis 2105', addressLocality: 'Salta', postalCode: '4400', addressCountry: 'AR' },
  },
};

const PRINCIPLES = [
  { title: 'Medimos ventas, no entregables', text: 'Antes de diseñar preguntamos qué tiene que vender la web y cómo lo vamos a medir: consultas, pedidos, turnos. Cada botón de WhatsApp y cada formulario registran de qué página vino el cliente.' },
  { title: 'Precios publicados', text: 'Una página web arranca en USD 800, una tienda online cuesta entre USD 1.800 y 3.500 y un sistema de gestión entre USD 4.000 y 8.000. No hay "consultar precio".' },
  { title: 'Pago contra avances', text: '30% al empezar, 30% a mitad del proyecto y 40% en la entrega. Ves el diseño antes de que se programe y cada avance en un enlace de prueba.' },
  { title: 'La web es tuya', text: 'El dominio se registra a nombre de tu empresa, así la web sigue siendo tuya aunque algún día cambies de proveedor.' },
];

export const AboutPage = () => (
  <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
    <SEOHead
      title="Quiénes somos: una agencia que piensa en números | Websy"
      description="Websy es una agencia de desarrollo web de Salta fundada por un contador: diseñamos webs y sistemas pensando en las ventas que tienen que traer."
      url={PAGE_URL}
      jsonLd={jsonLd}
    />

    <section className="bg-[#182A2C] text-white">
      <div className="container mx-auto px-5 lg:px-8 max-w-5xl py-12 md:py-16">
        <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <ChevronRight size={13} />
          <span className="text-white font-semibold">Quiénes somos</span>
        </nav>
        <h1 className="text-[34px] sm:text-5xl font-black leading-[1.06] tracking-tight">
          Tu web la diseña un equipo técnico y la piensa <span className="text-[#d9fb06]">un contador</span>
        </h1>
        <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-3xl">
          Websy es una agencia de desarrollo web y software de Salta, Argentina. Hacemos páginas web, tiendas online, sistemas de gestión y automatizaciones con IA para pymes de Argentina, Colombia, México y Estados Unidos. Llevamos 20 proyectos entregados.
        </p>
      </div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-5xl grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 p-7">
          <div className="w-11 h-11 rounded-xl bg-[#d9fb06] flex items-center justify-center"><Calculator size={22} className="text-[#182A2C]" /></div>
          <h2 className="mt-4 text-xl font-bold text-[#182A2C]">Agustín Dávila · Fundador</h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
            Contador Público Nacional. Mira cada proyecto por sus números: cuánto cuesta, en cuánto tiempo se recupera y qué tiene que vender la web o el sistema para que valga la pena. Firma las <Link to="/autores/agustin-davila" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">guías de precios y costos</Link> del blog.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-7">
          <div className="w-11 h-11 rounded-xl bg-[#d9fb06] flex items-center justify-center"><Code2 size={22} className="text-[#182A2C]" /></div>
          <h2 className="mt-4 text-xl font-bold text-[#182A2C]">Sebastian Aguirre · Líder técnico</h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
            Tecnólogo en Análisis y Desarrollo de Software, especializado en inteligencia artificial y automatizaciones. Dirige la parte técnica de cada proyecto y escribe las <Link to="/autores/sebastian-aguirre" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">guías técnicas</Link> del blog.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-[#f4f7f9] py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-5xl">
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight mb-10">Cómo trabajamos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-[#182A2C]">{p.title}</h3>
              <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-5xl grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
        <img src="/images/oficina/oficina-websy-salta.webp" alt="Sala de reuniones de Websy en San Luis 2105, Salta" width="328" height="578" loading="lazy" className="w-full max-w-xs aspect-[3/4] object-cover rounded-2xl" />
        <div>
          <h2 className="text-[26px] md:text-[34px] font-extrabold text-[#182A2C] tracking-tight">Dónde estamos</h2>
          <p className="mt-4 flex items-start gap-2.5 text-[16px] text-slate-700"><MapPin size={18} className="mt-1 shrink-0 text-[#556902]" /> {CONTACT.address}, Salta Capital. Con clientes de Salta nos reunimos en la oficina; con el resto, por videollamada y WhatsApp.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/casos-de-exito" className="inline-flex items-center gap-2 rounded-full bg-[#182A2C] px-6 py-3.5 text-[15px] font-bold text-white hover:bg-black">
              Ver los proyectos <ArrowRight size={16} />
            </Link>
            <Link to="/cotizador" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-[15px] font-bold text-[#182A2C] hover:bg-slate-50">
              ¿Cuánto cuesta mi web?
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);
