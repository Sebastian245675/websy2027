import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, BedDouble, MessageCircle, PanelsTopLeft, Search, Smartphone, Workflow
} from 'lucide-react';

// Carrusel de demos por rubro (punto 17). Para sumar una demo, agregar un objeto a `demos`.
// FEATURED_DEMO: id de la demo que se muestra primero (ej. la del nicho de la semana).
const FEATURED_DEMO = 'nordica';

const demos = [
  {
    id: 'nordica',
    rubro: 'Arquitectura',
    eyebrow: 'Experiencia digital para estudios creativos',
    title: 'Una web que deja que la arquitectura hable.',
    intro: <>Esta demo para <strong className="font-semibold text-[#263b36]">Nórdica arquitectos</strong> convierte una práctica multidisciplinaria en una experiencia visual: proyectos primero, servicios claros y una consulta fácil de iniciar.</>,
    details: [
      { icon: PanelsTopLeft, title: 'Identidad editorial', copy: 'Diseño visual sobrio para poner las obras en primer plano.' },
      { icon: Smartphone, title: 'Diseño adaptable', copy: 'Una navegación cómoda desde celular, tablet y escritorio.' },
      { icon: Workflow, title: 'Contacto directo', copy: 'Servicios, proyectos y consultas conectados en un solo recorrido.' },
    ],
    url: 'https://websyarg.com/',
    cta: 'Quiero una web para mi estudio',
    name: 'Nórdica arquitectos',
    tagline: 'Arquitectura · Diseño · Construcción',
    image: '/demos/nordica/portada.jpg',
    imageAlt: 'Casa contemporánea de la demo de Nórdica arquitectos',
    thumbs: [
      { src: '/demos/nordica/proyecto-casa.jpg', alt: 'Proyecto de vivienda contemporánea para el portfolio de Nórdica arquitectos' },
      { src: '/demos/nordica/proyecto-ladera.jpg', alt: 'Casa contemporánea integrada al paisaje' },
    ],
  },
  {
    id: 'hotel',
    rubro: 'Hotelería',
    eyebrow: 'Hoteles boutique y alojamientos turísticos',
    title: 'Una web que convierte visitas en reservas directas.',
    intro: <>La demo de <strong className="font-semibold text-[#263b36]">hotel boutique</strong> muestra habitaciones, tarifas y servicios, y lleva cada consulta directo a WhatsApp para cerrar la reserva.</>,
    details: [
      { icon: BedDouble, title: 'Habitaciones y tarifas', copy: 'Cada habitación con fotos, capacidad y precio a la vista.' },
      { icon: MessageCircle, title: 'Reservas por WhatsApp', copy: 'El huésped consulta fechas en un toque, sin formularios largos.' },
      { icon: Search, title: 'Preparada para Google', copy: 'Estructura pensada para aparecer en búsquedas locales.' },
    ],
    url: 'https://hotelpalmalindademo2.vercel.app/',
    cta: 'Quiero una web para mi hotel',
    name: 'Hotel boutique',
    tagline: 'Hotelería · Turismo · Reservas',
    image: '/mv-portfolio/hotel-palmalinda.png',
    imageAlt: 'Página de inicio de la demo de hotel boutique',
    thumbs: [],
  },
];

export const ArchitectureDemoSection = () => {
  const [index, setIndex] = useState(() => Math.max(0, demos.findIndex((d) => d.id === FEATURED_DEMO)));
  const demo = demos[index];
  const go = (step) => setIndex((i) => (i + step + demos.length) % demos.length);

  return (
    <section aria-roledescription="carrusel" aria-label="Demos Websy por rubro" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="container relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#d9d8d1] pb-5">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#52645d]">
            <span className="h-2 w-2 rounded-full bg-[#d9fb06]" /> Demos Websy
          </div>
          <div className="flex items-center gap-2">
            {demos.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] transition-colors ${
                  i === index ? 'bg-[#182a2c] text-[#d9fb06]' : 'bg-transparent text-[#8a8e85] hover:text-[#182a2c]'
                }`}
              >
                {String(i + 1).padStart(2, '0')} / {d.rubro}
              </button>
            ))}
          </div>
        </div>

        <div key={demo.id} className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 animate-[fadeIn_.4s_ease-out]">
          <div className="relative z-10">
            <p className="text-sm font-semibold text-[#a2674d]">{demo.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-.045em] text-[#182a2c] sm:text-5xl lg:text-[3.7rem]">
              {demo.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#586b66] sm:text-lg">{demo.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {demo.details.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="border-l-2 border-[#d9fb06] py-1 pl-4">
                  <div className="flex items-center gap-2 text-[#263b36]"><Icon size={17} /><span className="text-sm font-bold">{title}</span></div>
                  <p className="mt-1 text-xs leading-5 text-[#71817b]">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={demo.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md bg-[#182a2c] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#344b46]">
                Ver demo en vivo <ArrowRight size={17} />
              </a>
              <Link to="/contacto" className="inline-flex min-h-[52px] items-center justify-center gap-2 px-5 py-4 text-sm font-bold text-[#263b36] transition hover:text-[#718900]">
                {demo.cta} <ArrowDownRight size={17} />
              </Link>
            </div>
          </div>

          <a href={demo.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir demo de ${demo.name}`} className="group relative block min-h-[440px] overflow-hidden rounded-2xl bg-[#263b36] p-3 shadow-[0_32px_80px_-38px_rgba(24,42,44,.45)] sm:min-h-[550px] sm:p-4">
            <img src={demo.image} alt={demo.imageAlt} className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-xl object-cover object-top transition duration-700 group-hover:scale-[1.025] sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]" loading="lazy" />
            <div className="absolute inset-3 rounded-xl bg-gradient-to-t from-[#17231f]/85 via-[#17231f]/10 to-[#17231f]/5 sm:inset-4" />

            <div className="absolute left-7 right-7 top-7 flex items-center justify-between sm:left-9 sm:right-9 sm:top-9">
              <span className="rounded-full border border-white/40 bg-[#17231f]/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-white backdrop-blur-sm">Demo de nicho</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9fb06] text-[#182a2c] transition-transform group-hover:rotate-45"><ArrowDownRight size={19} /></span>
            </div>

            <div className="absolute bottom-7 left-7 right-7 grid grid-cols-[1fr_auto] items-end gap-3 sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/75">{demo.tagline}</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">{demo.name}</p>
              </div>
              <div className="hidden gap-2 sm:flex">
                {demo.thumbs.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} className="h-16 w-16 rounded-lg border border-white/50 object-cover shadow-lg" loading="lazy" />)}
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-[#d9d8d1] pt-5">
          <span className="text-xs font-semibold uppercase tracking-[.18em] text-[#52645d]">
            Demo {index + 1} de {demos.length} · {demo.rubro}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Demo anterior" className="flex h-11 w-11 bg-white items-center justify-center rounded-full border border-[#d9d8d1] text-[#182a2c] transition hover:border-[#d9fb06] hover:bg-[#d9fb06]">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Demo siguiente" className="flex h-11 w-11 bg-white items-center justify-center rounded-full border border-[#d9d8d1] text-[#182a2c] transition hover:border-[#d9fb06] hover:bg-[#d9fb06]">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
