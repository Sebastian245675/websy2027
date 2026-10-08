import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Clock, MessageCircle, ArrowRight, Check, ChevronRight, Calendar,
  Building2, Mountain, Scale, Store, Hotel, Truck, Phone,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CONTACT, whatsappUrl } from '../siteConfig';

// Landing local para "diseño web Salta" / "desarrollo web Salta". Contenido propio de Salta, no una
// plantilla con la ciudad cambiada: oficina real, casos del NOA, precios y zona de cobertura.

const ADDRESS = {
  street: 'San Luis 2105',
  city: 'Salta',
  region: 'Salta',
  postalCode: '4400',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=San+Luis+2105%2C+Salta%2C+Argentina',
};

const PAGE_URL = 'https://www.websysrl.com/diseno-web-salta';
const WA_TEXT = 'Hola Websy, quiero una página web para mi negocio en Salta.';

const SERVICES = [
  { name: 'Landing page', desc: 'Una página para un servicio o una campaña, con WhatsApp y formulario.', price: 'Desde USD 800', time: '5 a 7 días hábiles', to: '/servicios/desarrollo-web' },
  { name: 'Sitio institucional', desc: 'Varias páginas: servicios, empresa, casos, contacto y blog.', price: 'Desde USD 800', time: '2 a 3 semanas', to: '/servicios/desarrollo-web' },
  { name: 'Tienda online', desc: 'Catálogo, carrito, Mercado Pago, envíos y panel para cargar productos.', price: 'USD 1.800 a 3.500', time: '3 a 6 semanas', to: '/servicios/ecommerce' },
  { name: 'Sistema de gestión', desc: 'Stock, ventas, turnos, clientes o lo que tu empresa maneja hoy en planillas.', price: 'USD 4.000 a 8.000', time: 'Por etapas', to: '/servicios/sistemas-gestion' },
  { name: 'App móvil', desc: 'App para Android y iPhone, para clientes o para tu equipo.', price: 'Desde USD 2.000', time: 'Según alcance', to: '/servicios/aplicaciones-moviles' },
  { name: 'Automatización con IA', desc: 'Respuestas automáticas por WhatsApp, carga de datos, reportes.', price: 'Desde USD 200/mes', time: 'Según alcance', to: '/servicios/automatizaciones-ia' },
  { name: 'SEO local', desc: 'Aparecer cuando buscan tu servicio en Salta, en Google y en el mapa.', price: 'Desde USD 300/mes', time: 'Mensual', to: '/servicios/seo-marketing' },
];

const CASES = [
  {
    to: '/casos-de-exito/pagina-web-estudio-juridico-salta-ruarte',
    name: 'Ruarte & Ruarte',
    place: 'Salta',
    text: 'Estudio de abogados penalistas y de derecho canábico. Landing con las áreas de práctica, los perfiles de los abogados, contacto por WhatsApp y datos estructurados de servicio legal para la búsqueda local.',
  },
  {
    to: '/casos-de-exito/pagina-web-empresa-logistica-litio-m-logistica',
    name: 'M Logística y Distribución',
    place: 'Salta',
    text: 'Transporte de litio, hidróxido y carbonato para exportación. Sitio corporativo pensado para presentarse ante empresas mineras y exportadoras.',
  },
  {
    to: '/casos-de-exito/pagina-web-seguridad-contra-incendios-jujuy-multiservicios',
    name: 'Jujuy MultiServicios',
    place: 'Jujuy y el NOA',
    text: 'Ingeniería y seguridad contra incendios: auditoría, montaje, mantenimiento NFPA y capacitación, organizados por sector y con consultas por WhatsApp.',
  },
  {
    to: '/casos-de-exito/plataforma-inmobiliaria-propiedades-casamax',
    name: 'CASAMAX',
    place: 'Inmobiliaria',
    text: 'Plataforma inmobiliaria con buscador por operación y tipo, favoritos, alertas, tasación y publicación de propiedades, en español e inglés.',
  },
];

const RUBROS = [
  { icon: Hotel, title: 'Turismo, hoteles y bodegas', text: 'Salta vive del turismo: Cafayate, la Quebrada, los Valles Calchaquíes. Un hotel, una posada o una bodega necesita fotos que vendan, versión en inglés y reservas directas por WhatsApp para no pagar comisión en cada reserva.', to: '/blog/pagina-web-para-hoteles-posadas-alojamientos-reservas-online', link: 'Web para hoteles' },
  { icon: Truck, title: 'Minería, litio y logística', text: 'Las empresas que proveen a la minería del litio en la Puna venden a compañías grandes, muchas veces del exterior. La web es su carta de presentación: capacidad, certificaciones, flota, versión en inglés.', to: '/casos-de-exito/pagina-web-empresa-logistica-litio-m-logistica', link: 'Caso M Logística' },
  { icon: Scale, title: 'Abogados, contadores y médicos', text: 'Los profesionales de Salta compiten por aparecer cuando alguien busca "abogado laboral en Salta" o "contador en Salta". Una página por especialidad, la matrícula visible y el WhatsApp a un toque.', to: '/blog/pagina-web-para-abogados-estudio-juridico-profesional', link: 'Web para abogados' },
  { icon: Building2, title: 'Inmobiliarias y constructoras', text: 'Buscador de propiedades, fichas completas y, sobre todo, un camino para que el propietario pida una tasación: es lo que trae propiedades nuevas.', to: '/blog/pagina-web-para-inmobiliarias-publicar-propiedades-online', link: 'Web para inmobiliarias' },
  { icon: Store, title: 'Comercios y gastronomía', text: 'Carta digital con QR, pedidos online sin la comisión de las apps, catálogo con stock y venta con Mercado Pago para comercios del centro y de los barrios.', to: '/blog/pagina-web-para-restaurantes-carta-digital-pedidos-online', link: 'Web para restaurantes' },
  { icon: Mountain, title: 'Empresas del interior', text: 'Productores, fincas y empresas de Orán, Tartagal, Metán, Güemes o Rosario de la Frontera que necesitan vender fuera de su ciudad: catálogo, tienda o sistema para distribuidores.', to: '/servicios/ecommerce', link: 'Tiendas online' },
];

const STEPS = [
  { title: 'Reunión', text: 'En nuestra oficina de San Luis 2105 o por videollamada. Nos contás qué vendés, a quién y qué tiene que lograr la web.' },
  { title: 'Propuesta', text: 'En menos de 24 horas te mandamos el alcance, el precio cerrado y el plazo por escrito.' },
  { title: 'Diseño', text: 'Te mostramos el diseño antes de programar y lo ajustamos con tus comentarios.' },
  { title: 'Desarrollo', text: 'Programamos la web rápida, adaptada al celular y preparada para Google desde el primer día.' },
  { title: 'Publicación', text: 'La publicamos con tu dominio, te enseñamos a usarla y seguimos disponibles por WhatsApp.' },
];

const COVERAGE = [
  { zone: 'Salta Capital', places: 'Centro, Tres Cerritos, Grand Bourg, Castañares, zona norte, zona sur, Limache, El Tribuno, Vaqueros y San Lorenzo' },
  { zone: 'Valle de Lerma', places: 'Cerrillos, Rosario de Lerma, La Merced, Campo Quijano y Chicoana' },
  { zone: 'Interior de la provincia', places: 'Cafayate, Orán, Tartagal, Metán, General Güemes, Rosario de la Frontera, Embarcación y Joaquín V. González' },
  { zone: 'Resto del NOA', places: 'San Salvador de Jujuy, San Miguel de Tucumán, Santiago del Estero y Catamarca' },
];

const FAQ = [
  {
    q: '¿Cuánto cuesta una página web en Salta?',
    a: 'En Websy, una landing page o un sitio institucional arranca en USD 800, una tienda online cuesta entre USD 1.800 y 3.500, y un sistema de gestión entre USD 4.000 y 8.000. El precio se cierra por escrito antes de empezar y se puede pagar en pesos al tipo de cambio del día.',
  },
  {
    q: '¿Cuánto tarda en estar lista?',
    a: 'Una landing page, de 5 a 7 días hábiles. Un sitio institucional, de 2 a 3 semanas. Una tienda online, de 3 a 6 semanas, según la cantidad de productos y las integraciones.',
  },
  {
    q: '¿Puedo reunirme en persona?',
    a: `Sí. Nuestra oficina está en ${ADDRESS.street}, Salta Capital, y atendemos de lunes a viernes de 9 a 18 con turno previo. Si te queda más cómodo, hacemos la reunión por videollamada.`,
  },
  {
    q: '¿Trabajan con negocios del interior de Salta o de Jujuy?',
    a: 'Sí. Trabajamos con empresas de toda la provincia y del NOA. La mayor parte del proceso se hace por videollamada y WhatsApp, y, si podés venir a Salta Capital, nos reunimos en la oficina.',
  },
  {
    q: '¿Cómo se paga?',
    a: 'En tres partes: 30% para empezar, 30% con el diseño aprobado y 40% al publicar. En Argentina se paga con Mercado Pago o Naranja X.',
  },
  {
    q: '¿El dominio y el hosting están incluidos?',
    a: 'El dominio se registra a tu nombre (los .com.ar, en NIC Argentina), así la web siempre es tuya. En el presupuesto te detallamos qué incluye cada plan y el costo anual de dominio y hosting.',
  },
  {
    q: '¿La web va a aparecer en Google cuando busquen en Salta?',
    a: 'La entregamos preparada para Google: rápida, con una página por servicio, textos que mencionan tu ciudad y datos estructurados de negocio local. Para pelear los primeros puestos de búsquedas con competencia sumamos el perfil de empresa en Google, reseñas y contenido, que es el servicio de SEO local.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${PAGE_URL}#negocio`,
      name: 'Websy — Diseño y desarrollo web en Salta',
      url: PAGE_URL,
      image: 'https://www.websysrl.com/images/oficina/oficina-websy-salta.webp',
      telephone: CONTACT.phoneDisplay,
      priceRange: 'USD 800 - USD 8.000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.region,
        postalCode: ADDRESS.postalCode,
        addressCountry: 'AR',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      areaServed: [
        { '@type': 'City', name: 'Salta' },
        { '@type': 'AdministrativeArea', name: 'Provincia de Salta' },
        { '@type': 'AdministrativeArea', name: 'Provincia de Jujuy' },
        { '@type': 'AdministrativeArea', name: 'Provincia de Tucumán' },
      ],
      parentOrganization: { '@type': 'Organization', name: 'Websy', url: 'https://www.websysrl.com' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de desarrollo web en Salta',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.desc },
          description: `${s.price} · ${s.time}`,
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
};

const SectionTitle = ({ kicker, children, id }) => (
  <div className="mb-8 md:mb-10">
    {kicker && <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#556902] mb-3">{kicker}</p>}
    <h2 id={id} className="text-[28px] md:text-[38px] font-extrabold text-[#182A2C] leading-[1.12] tracking-tight max-w-3xl">{children}</h2>
  </div>
);

const WhatsAppCta = ({ label = 'Pedí tu presupuesto por WhatsApp', dark = false }) => (
  <a
    href={whatsappUrl(WA_TEXT)}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold transition-colors ${
      dark ? 'bg-[#182A2C] text-white hover:bg-black' : 'bg-[#d9fb06] text-[#182A2C] hover:bg-white'
    }`}
  >
    <MessageCircle size={18} />
    {label}
    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
  </a>
);

export const SaltaPage = () => (
  <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
    <SEOHead
      title="Diseño Web en Salta: Páginas Web y Tiendas Online | Websy"
      description="Agencia de diseño y desarrollo web en Salta, con oficina en San Luis 2105. Páginas web desde USD 800, tiendas online y sistemas. Casos reales del NOA."
      url={PAGE_URL}
      jsonLd={jsonLd}
    />

    {/* Hero */}
    <section className="bg-[#182A2C] text-white">
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={13} />
            <span className="text-white font-semibold">Diseño web en Salta</span>
          </nav>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[34px] sm:text-5xl lg:text-[3.4rem] font-black leading-[1.06] tracking-tight">
                Diseño y desarrollo web en <span className="text-[#d9fb06]">Salta</span>
              </h1>
              <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
                Somos una agencia salteña: hacemos páginas web, tiendas online, sistemas y apps para empresas y profesionales de Salta y el NOA. Te recibimos en nuestra oficina de San Luis 2105 y te pasamos el precio cerrado antes de empezar.
              </p>
              <ul className="mt-7 grid sm:grid-cols-2 gap-3 text-[15px] text-white/90">
                {['Páginas web desde USD 800', 'Landing lista en 5 a 7 días hábiles', 'Reunión presencial en Salta Capital', 'Preparada para aparecer en Google'].map((t) => (
                  <li key={t} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-[#d9fb06]" />{t}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <WhatsAppCta />
                <a href="#precios" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-white/10 transition-colors">
                  Ver precios
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-7">
                <div className="flex gap-4">
                  <img
                    src="/images/oficina/oficina-websy-salta.webp"
                    alt="Oficina de Websy en San Luis 2105, Salta"
                    width="328"
                    height="578"
                    className="w-28 sm:w-32 aspect-[3/4] object-cover rounded-xl shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d9fb06]">Nuestra oficina</p>
                    <p className="mt-2 text-xl font-bold leading-snug">{ADDRESS.street}</p>
                    <p className="text-white/70">Salta Capital · CP {ADDRESS.postalCode}</p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-white/80"><Clock size={15} /> Lunes a viernes, 9 a 18 h</p>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-white/80"><Phone size={15} /> {CONTACT.phoneDisplay}</p>
                  </div>
                </div>
                <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d9fb06] hover:underline underline-offset-4">
                  <MapPin size={16} /> Cómo llegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Direct answer */}
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <div className="max-w-3xl text-[17px] text-slate-700 leading-relaxed space-y-5">
          <p>
            <strong className="text-[#182A2C]">Para tener una página web profesional en Salta necesitás tres cosas: que se vea bien y cargue rápido en el celular, que explique en segundos qué hacés y para quién, y que aparezca cuando alguien de Salta busca tu servicio en Google. En Websy hacemos las tres, desde USD 800, con reunión presencial en nuestra oficina de San Luis 2105.</strong>
          </p>
          <p>
            Varias de las agencias que aparecen cuando buscás "diseño web Salta" no están en Salta: usan la misma página para cada provincia y solo cambian el nombre de la ciudad. Nosotros trabajamos acá. Conocemos lo que necesita un hotel de Cafayate que compite con Booking, un proveedor de la minería del litio que se presenta ante una empresa extranjera, o un estudio jurídico del centro que quiere aparecer antes que el de al lado.
          </p>
          <p>
            Esta página resume lo que hacemos, cuánto cuesta, cómo trabajamos y los proyectos que ya hicimos en Salta y el NOA, para que puedas decidir con información concreta antes de escribirnos.
          </p>
        </div>
      </div>
    </section>

    {/* Prices */}
    <section id="precios" className="bg-[#f4f7f9] py-14 md:py-20" style={{ scrollMarginTop: '120px' }}>
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <SectionTitle kicker="Precios">Cuánto cuesta una página web en Salta</SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-[#182A2C] text-white">
              <tr>
                <th className="px-5 py-4 font-bold">Servicio</th>
                <th className="px-5 py-4 font-bold hidden md:table-cell">Qué incluye</th>
                <th className="px-5 py-4 font-bold whitespace-nowrap">Precio</th>
                <th className="px-5 py-4 font-bold whitespace-nowrap">Plazo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SERVICES.map((s) => (
                <tr key={s.name} className="align-top">
                  <td className="px-5 py-4">
                    <Link to={s.to} className="font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">{s.name}</Link>
                    <p className="md:hidden mt-1 text-sm text-slate-500">{s.desc}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{s.desc}</td>
                  <td className="px-5 py-4 font-semibold text-[#182A2C] whitespace-nowrap">{s.price}</td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6 text-[15px] text-slate-700 leading-relaxed">
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-[#182A2C] mb-2">En pesos</h3>
            <p>
              Los precios están en dólares porque así no cambian mientras dura el proyecto, pero podés pagar en pesos al tipo de cambio del día de cada pago. Como referencia, USD 800 eran unos $1.170.000 al dólar oficial del Banco Nación de octubre de 2026.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-[#182A2C] mb-2">Forma de pago</h3>
            <p>
              En tres partes: 30% para empezar, 30% cuando aprobás el diseño y 40% al publicar. Aceptamos Mercado Pago y Naranja X. Ver el detalle de cada plan en <Link to="/planes" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">planes</Link> o la guía <Link to="/blog/cuanto-cuesta-pagina-web-argentina-2026" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">cuánto cuesta una página web en Argentina</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Cases */}
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <SectionTitle kicker="Casos reales">Proyectos que hicimos en Salta y el NOA</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-6">
          {CASES.map((c) => (
            <Link key={c.to} to={c.to} className="group rounded-2xl border border-slate-200 p-6 md:p-7 hover:border-[#182A2C] hover:shadow-[0_12px_30px_-12px_rgba(16,24,40,0.25)] transition-all">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#556902]">{c.place}</p>
              <h3 className="mt-2 text-xl font-bold text-[#182A2C]">{c.name}</h3>
              <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{c.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-[3px] underline-offset-4">
                Ver el caso <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-slate-600">
          También trabajamos para clientes de Buenos Aires, Colombia, México y Estados Unidos. Mirá todos los <Link to="/casos-de-exito" className="font-semibold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">casos de éxito</Link>.
        </p>
      </div>
    </section>

    {/* Rubros */}
    <section className="bg-[#f4f7f9] py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
        <SectionTitle kicker="Por rubro">Qué necesita la web de cada negocio salteño</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RUBROS.map(({ icon: Icon, title, text, to, link }) => (
            <div key={title} className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#d9fb06] flex items-center justify-center"><Icon size={22} className="text-[#182A2C]" /></div>
              <h3 className="mt-4 text-lg font-bold text-[#182A2C]">{title}</h3>
              <p className="mt-2 text-[15px] text-slate-600 leading-relaxed flex-1">{text}</p>
              <Link to={to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
                {link} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why local + process */}
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionTitle kicker="Por qué Websy">Una agencia de Salta, no una página más por provincia</SectionTitle>
          <div className="space-y-4 text-[16px] text-slate-700 leading-relaxed">
            <p>
              <strong className="text-[#182A2C]">Nos podés conocer en persona.</strong> Antes de pagar un peso sabés quién hace tu web y dónde encontrarnos si algo no funciona.
            </p>
            <p>
              <strong className="text-[#182A2C]">Precio cerrado y por escrito.</strong> Publicamos nuestros precios: no hay "consultar" ni sorpresas a mitad del proyecto.
            </p>
            <p>
              <strong className="text-[#182A2C]">Hecho a medida, no con plantilla.</strong> Programamos cada web para tu negocio, rápida en el celular y lista para Google, en lugar de rellenar un tema genérico.
            </p>
            <p>
              <strong className="text-[#182A2C]">Más que una web.</strong> Si después necesitás una tienda, un sistema de stock o automatizar el WhatsApp, lo hace el mismo equipo.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionTitle kicker="Proceso">Cómo trabajamos</SectionTitle>
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="w-10 h-10 rounded-full bg-[#182A2C] text-[#d9fb06] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#182A2C]">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-slate-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    {/* SEO local */}
    <section className="bg-[#182A2C] text-white py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9fb06] mb-3">SEO local</p>
          <h2 className="text-[28px] md:text-[38px] font-extrabold leading-[1.12] tracking-tight">Cómo aparecer en Google cuando buscan tu servicio en Salta</h2>
        </div>
        <div className="space-y-4 text-[16px] text-white/80 leading-relaxed">
          <p>
            Cuando alguien busca "dentista en Salta" o "ferretería en Tres Cerritos", Google muestra primero el mapa con tres negocios y después las webs. Para estar ahí hacen falta el perfil de empresa en Google completo y con reseñas, una web con una página por servicio que nombre la ciudad, y datos estructurados que le digan a Google qué sos y dónde estás.
          </p>
          <p>
            Todas nuestras webs salen con esa base. Si querés pelear los primeros puestos de búsquedas con competencia, el servicio de <Link to="/servicios/seo-marketing" className="font-semibold text-[#d9fb06] underline underline-offset-4">SEO y marketing</Link> suma contenido, reseñas y seguimiento mensual. Te explicamos el método completo en la guía de <Link to="/blog/como-posicionar-mi-negocio-local-en-google-seo-local" className="font-semibold text-[#d9fb06] underline underline-offset-4">SEO local</Link>.
          </p>
        </div>
      </div>
    </section>

    {/* Coverage + visit */}
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-7xl grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <SectionTitle kicker="Zona de trabajo">Dónde trabajamos</SectionTitle>
          <div className="space-y-5">
            {COVERAGE.map((c) => (
              <div key={c.zone} className="border-l-4 border-[#d9fb06] pl-5">
                <h3 className="text-lg font-bold text-[#182A2C]">{c.zone}</h3>
                <p className="mt-1 text-[15px] text-slate-600 leading-relaxed">{c.places}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-slate-600 leading-relaxed">
            Con clientes de Salta Capital nos reunimos en la oficina. Con el interior y el resto del NOA trabajamos por videollamada y WhatsApp.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-2">
              <img src="/images/oficina/fachada-san-luis-2105.webp" alt="Ingreso del edificio de San Luis 2105, Salta" width="328" height="476" loading="lazy" className="w-full h-56 object-cover" />
              <img src="/images/oficina/oficina-websy-salta.webp" alt="Sala de reuniones de Websy en Salta" width="328" height="578" loading="lazy" className="w-full h-56 object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#182A2C]">Visitanos</h2>
              <p className="mt-3 flex items-start gap-2.5 text-[15px] text-slate-700"><MapPin size={18} className="mt-0.5 shrink-0 text-[#556902]" /> {ADDRESS.street}, Salta Capital ({ADDRESS.postalCode})</p>
              <p className="mt-2 flex items-start gap-2.5 text-[15px] text-slate-700"><Calendar size={18} className="mt-0.5 shrink-0 text-[#556902]" /> Lunes a viernes de 9 a 18 h, con turno previo</p>
              <p className="mt-2 flex items-start gap-2.5 text-[15px] text-slate-700"><Phone size={18} className="mt-0.5 shrink-0 text-[#556902]" /> {CONTACT.phoneDisplay}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#182A2C] hover:bg-slate-50">
                  <MapPin size={16} /> Ver en Google Maps
                </a>
                <Link to="/contacto" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#182A2C] hover:bg-slate-50">
                  Formulario de contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="bg-[#f4f7f9] py-14 md:py-20">
      <div className="container mx-auto px-5 lg:px-8 max-w-4xl">
        <SectionTitle kicker="Preguntas frecuentes">Lo que más nos preguntan en Salta</SectionTitle>
        <div className="space-y-3">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group rounded-2xl bg-white border border-slate-200 p-5 md:p-6 open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-[#182A2C]">
                <h3>{q}</h3>
                <ChevronRight size={20} className="shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-5 lg:px-8 max-w-4xl text-center">
        <h2 className="text-[30px] md:text-[44px] font-black text-[#182A2C] leading-[1.08] tracking-tight">¿Hacemos la web de tu negocio?</h2>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Contanos qué hacés y te mandamos la propuesta con precio cerrado en menos de 24 horas. Si preferís, pasá por San Luis 2105 y lo charlamos en persona.
        </p>
        <div className="mt-8 flex justify-center"><WhatsAppCta dark /></div>
      </div>
    </section>
  </div>
);
