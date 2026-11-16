import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, MapPin, MessageCircle, Play, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQSection } from '../components/FAQSection';
import { COUNTRY_ALTERNATES, countryPageByCode } from '../countryPages';
import { CONTACT, SOCIAL, whatsappUrl } from '../siteConfig';
import { useLanguage } from '../LanguageContext';
import { saveLead } from '../lib/api';
import { trackFormSubmit } from '../lib/tracking';
import { saveCountry } from '../lib/geo';
import { withArgentina } from '../lib/argentinaView';
import { portfolio } from '../mockData';
import { initialsOf, testimonialFor } from '../testimonials';

// Página propia de /argentina (ya no usa el molde de CountryPage, que siguen usando México, Colombia y EE. UU.).
// Textos, precios y orden base: maqueta-argentina.html. Lo que está entre corchetes [ ] falta completarlo.
// Correcciones de Agustín (15-11-2026): casos arriba, productos y precios unidos, sin la franja de 4 puntos.
// BORRADOR para revisar: los ítems de "Incluye" que no estaban en la maqueta (salen de otras partes de la maqueta
// y del sitio) y toda la versión en inglés.
// El formulario "Armá el plan" guarda la consulta en leads-api con source 'plan_argentina' (se ve en /panel).

const SITE_URL = 'https://www.websysrl.com';
const SOURCE = 'plan_argentina';
const INSTAGRAM = SOCIAL.find((s) => s.name === 'Instagram')?.url;

// ---------------------------------------------------------------- Textos (español = maqueta; inglés = traducción)

const COPY = {
  es: {
    pill: 'Páginas web para negocios de toda Argentina',
    tagline: 'tu web, en 7 días',
    lead: 'Hacemos páginas web, tiendas online y asistentes de WhatsApp para negocios argentinos. Ves el diseño antes de publicarlo y sabés el precio final antes de empezar.',
    ctaPlan: 'Armá tu plan en 1 minuto',
    ctaPrices: 'Ver precios',
    trabajan: 'Negocios que ya trabajan con su web',

    casos: {
      chip: 'Casos y testimonios en Argentina',
      title: 'Negocios argentinos que ya trabajan con su web.',
      items: [
        // Clientes argentinos de la historia destacada "clientes" de Instagram, más Ascenta (testimonios en src/testimonials.js)
        // Textos compensados: si el testimonio es corto o es un video, la descripción es más larga (pedido de Agustín)
        { portfolioId: 3, tag: 'Tienda online', name: 'Regala Algo', result: '~ARS 2 M por mes', text: 'Qué hicimos: tienda online con panel propio para gestionar inventario, pedidos y ventas. Hoy tiene más de 3.000 productos activos.' },
        { image: '/ascenta/captura.jpg', testimonial: 'ascenta', tag: 'Estudio contable', name: 'Ascenta', text: 'Qué hicimos: web para un estudio contable de Salta, con simuladores gratis de monotributo, IVA y deudas, y un asistente que responde consultas.' },
        { portfolioId: 14, tag: 'Estudio jurídico', name: 'Estudio Ruarte', text: 'Qué hicimos: landing page para Ruarte & Ruarte, un estudio de abogados de Salta que trabaja derecho penal y derecho canábico. Presenta los servicios legales y a los profesionales, con contacto por WhatsApp desde el celular y preparada para aparecer en la búsqueda local.' },
        { portfolioId: 1, tag: 'Logística y distribución', name: 'M Logística y Distribución', text: 'Qué hicimos: sitio web corporativo para una empresa de transporte de litio para exportación.' },
        { portfolioId: 2, tag: 'Tienda online', name: 'Covenant', text: 'Qué hicimos: tienda online de materiales eléctricos e iluminación. El catálogo, las cotizaciones y los envíos funcionan sobre el mismo sistema que gestiona inventario, pedidos y clientes.' },
        { portfolioId: 11, tag: 'Servicios online', name: 'Cuervo Tarot', text: 'Qué hicimos: landing page para un servicio de lecturas de tarot y runas online, con un diseño envolvente de marca, los servicios presentados como ofertas y contacto por WhatsApp para convertir visitas en consultas.' },
      ],
      captura: '[CAPTURA DE LA WEB]',
      video: 'Mirá su testimonio en video',
      verTodos: 'Ver todos los casos',
      instagram: 'Testimonios en Instagram',
      resena: 'Dejá tu reseña',
    },

    problema: {
      chip: 'El problema',
      title: 'Si tu negocio no tiene una buena web, los clientes se van con otro.',
      items: [
        { title: 'Te buscan y no te encuentran', text: 'Cuando alguien busca lo que vendés, aparece tu competencia. Ese cliente ya es de otro.' },
        { title: 'Tu web no te representa', text: 'Una página vieja o lenta hace que tu negocio parezca más chico de lo que es.' },
        { title: 'Te escriben y contestás tarde', text: 'La consulta que llega de noche o en pleno trabajo se enfría, y el cliente le compra a quien respondió primero.' },
      ],
    },

    productos: {
      chip: 'Tres productos · Precio cerrado, sin sorpresas',
      title: 'Elegí lo que necesita tu negocio.',
      promo: {
        small: 'Promo verano · [15 de diciembre al 7 de enero]',
        strong: 'Arrancá el año con tu web funcionando.',
        nota: 'Mismo plazo y misma garantía. [Cupo limitado: X webs y X tiendas]',
        cta: 'Quiero la promo',
      },
      incluye: 'Incluye',
      prepLabel: 'Para empezar',
      items: [
        {
          tag: 'Lista en 7 días', name: 'Web institucional', featured: true,
          text: 'Para negocios que ofrecen servicios: estudios, consultorios, profesionales y empresas.',
          antes: 'USD 743', precio: 'USD 474', nota: 'Precio de promo. Fuera de la promo: USD 743. En pesos: [ARS]',
          items: ['Hasta 7 secciones', 'Diseño que ves y ajustás antes de publicar', '4 rondas de cambios', 'Adaptada al celular', 'Botón de WhatsApp', 'Preparada para aparecer en Google', 'Conectada a Google Search Console y Google Analytics para ver tus estadísticas', 'Panel para cambiar los textos, sin costo', 'Dominio a tu nombre'],
          prep: 'Logo, textos y fotos',
          cta: 'Armá tu plan',
        },
        {
          tag: 'Lista en 12 días', name: 'Tienda online',
          text: 'Para negocios que venden productos y quieren cobrar por internet.',
          antes: 'USD 1.244', precio: 'USD 796', nota: 'Precio de promo. Fuera de la promo: USD 1.244. En pesos: [ARS]',
          items: ['Catálogo y carrito', 'Cobro con Mercado Pago o la pasarela de pagos que prefieras', 'Envíos', 'Carga inicial de hasta 300 productos sin costo (más productos se cotizan aparte)', 'Panel para cargar productos y precios y cambiar los textos', 'Conectada a Google Search Console y Google Analytics para ver tus estadísticas', 'Adaptada al celular', 'Dominio a tu nombre'],
          prep: 'Logo, fotos y lista de productos con precios',
          cta: 'Armá tu plan',
        },
        {
          tag: 'Próximamente', name: 'Asistente de WhatsApp con IA', soon: true,
          text: 'Para negocios que ya reciben consultas y no llegan a contestarlas todas.',
          items: ['Responde al instante, las 24 horas', 'Le pide los datos al interesado', 'Te avisa cuando hay un cliente listo'],
          cta: 'Avisame cuando esté',
        },
      ],
      garantia: {
        tag: 'Plazo garantizado',
        fuerte: 'Si no entregamos tu web en el plazo acordado, te devolvemos lo que pagaste.',
        text: 'El plazo corre desde que recibimos tu material y cubre la primera versión completa del sitio. Condiciones en el presupuesto.',
      },
      despues: 'Después de publicar, no quedás solo.',
      porMes: 'por mes',
      mensuales: [
        { tag: 'Plan Servidor', precio: 'USD 34', text: 'Alojamiento de tu web, copias de seguridad y soporte por WhatsApp para [X] cambios chicos por mes.' },
        { tag: 'Plan Posicionamiento en Google', precio: 'USD 148', text: 'Revisión mensual de cómo aparecés en Google, mejoras en tu web, una página nueva por mes e informe de visitas y consultas.' },
      ],
    },

    pasos: {
      chip: 'Cómo trabajamos',
      title: 'Así trabajamos, paso a paso.',
      items: [
        { title: 'Armás tu plan', text: 'Respondés unas preguntas rápidas y ves qué necesitás, cuánto sale y en cuántos días.' },
        { title: 'Presupuesto en el día', text: 'Alcance, precio y plazo cerrados por escrito.' },
        { title: 'Nos mandás tu material', text: 'Logo, textos y fotos. Ese día empieza a correr el plazo.' },
        { title: 'Tu web en 7 días', text: 'La ves, la ajustamos con tus comentarios y la publicamos con tu dominio.' },
      ],
    },

    quien: {
      chip: 'Quién está detrás',
      cargo: 'Fundador de Websy · Contador Público Nacional',
      bio: [
        'Arranqué Websy con una idea: ayudar a emprendedores y pymes a crecer en lo digital, con una web que trabaje para el negocio y no sea un gasto más.',
        'Como contador, miro cada proyecto por sus números: cuánto cuesta, en cuánto tiempo se recupera y qué tiene que lograr la web para que valga la pena.',
        'Te atiendo, entiendo tu negocio y armo la propuesta. Un equipo técnico de ingenieros diseña y publica cada web.',
      ],
      aptitudes: ['Costos y presupuestos de proyectos digitales', 'Retorno de la inversión en tecnología', 'Gestión de pymes'],
      nota: 'Hablás siempre con la misma persona, de principio a fin.',
    },

    faq: {
      title: 'Antes de decidir.',
      items: [
        { q: '¿De verdad está lista en 7 días?', a: 'Sí. El plazo empieza cuando nos mandás tus textos, fotos y logo. En 7 días tenés la primera versión completa. La tienda lleva 12.' },
        { q: '¿Qué pasa si no cumplen el plazo?', a: 'Te devolvemos lo que pagaste. Queda por escrito en el presupuesto.' },
        { q: '¿Qué pasa si no me gusta el diseño?', a: 'Lo ves antes de publicar y lo ajustamos con tus comentarios. Tenés 4 rondas de cambios.' },
        { q: '¿La web queda a mi nombre?', a: 'Sí. El dominio se registra a tu nombre y la web es tuya.' },
        { q: '¿Tengo que pagar algo por mes?', a: 'Solo si querés que nos ocupemos del servidor y los cambios: desde USD 34 por mes, y lo das de baja cuando quieras.' },
        { q: '¿Emiten factura?', a: 'Sí, en cada pago.' },
      ],
    },


    plan: {
      chip: 'Gratis y sin compromiso',
      title: 'Armá el plan de tu web en 1 minuto.',
      sub: 'Respondé unas preguntas rápidas y te armamos tu plan personalizado: qué necesitás, cuánto sale y en cuántos días lo tenés.',
      armar: 'Armar mi plan personalizado',
      contacto: 'Prefiero el contacto habitual',
      directo: '¿Preferís escribirnos directo?',
      hablanos: 'Hablanos por WhatsApp',
    },

    form: {
      paso: (n, t) => `Paso ${n} de ${t}`,
      empecemos: 'Empecemos',
      ultimo: 'Último paso',
      opcional: 'Opcional',
      // Preguntas: las del formulario "Scaling Roadmap" de Acquisition.com (Alex Hormozi), traducidas,
      // más las de la maqueta que definen el producto (negocio, qué tiene hoy, consultas por semana)
      q: {
        nombre: '¿Cómo te llamás?',
        negocio: (nombre) => (nombre ? `${nombre}, ¿qué hace tu negocio?` : '¿Qué hace tu negocio?'),
        hoy: '¿Qué tenés hoy?',
        rubro: '¿En qué rubro está tu negocio?',
        facturacion: '¿Cuánto factura tu negocio por mes?',
        inversion: '¿Cuánto estás dispuesto a invertir en tu web?',
        socios: '¿Sos el único dueño o tenés socios?',
        consultas: '¿Cuántas consultas recibís por semana?',
        canal: '¿Por dónde nos conociste?',
        contacto: '¿A dónde te enviamos tu plan personalizado?',
      },
      contactoSub: 'Tu plan ya está listo. Dejanos tus datos y te lo mostramos.',
      opts: {
        negocio: { servicios: 'Ofrezco servicios', productos: 'Vendo productos', ambos: 'Las dos cosas' },
        hoy: { sin: 'No tengo web', vieja: 'Tengo una web vieja', redes: 'Solo uso redes y WhatsApp' },
        rubro: { inmobiliario: 'Inmobiliario', tecnologia: 'Tecnología', finanzas: 'Finanzas', salud: 'Salud', industria: 'Industria y fabricación', profesionales: 'Servicios profesionales', hogar: 'Servicios locales o para el hogar', comercio: 'Comercio', educacion: 'Educación', otro: 'Otro' },
        // Facturación mensual (rangos definidos por Agustín)
        facturacion: { f0: 'Menos de USD 500', f1: 'USD 500 a 1.000', f2: 'USD 1.000 a 2.000', f3: 'USD 2.000 a 5.000', f4: 'USD 5.000 a 10.000', f5: 'Más de USD 10.000' },
        // Rangos de Agustín: "Menos de USD 500" es el umbral en el que no podemos ayudar (en /panel sirve para filtrar)
        inversion: { i0: 'Menos de USD 500', i1: 'USD 500 a 1.500', i2: 'USD 1.500 a 3.500', i3: 'Más de USD 3.500', i4: 'Todavía no sé' },
        socios: { sociedad: 'En sociedad', unico: 'Único dueño', empleado: 'Soy empleado' },
        consultas: { pocas: 'Menos de 10', medio: 'Entre 10 y 50', muchas: 'Más de 50' },
        canal: { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', google: 'Google', recomendacion: 'Me lo recomendó alguien', otro: 'Otro' },
      },
      campos: { nombre: 'Nombre', apellido: 'Apellido', email: 'Email', whatsapp: 'WhatsApp', ciudad: 'Ciudad y provincia', instagram: 'Instagram', rubroOtro: '¿Cuál?', canalOtro: '¿Dónde?' },
      ph: { nombre: 'Tu nombre', apellido: 'Tu apellido', email: 'tu@email.com', whatsapp: 'Ej.: 387 555 0000', ciudad: 'Ej.: Salta, Salta', instagram: '@tunegocio', rubroOtro: 'Ej.: gastronomía, turismo, construcción', canalOtro: 'Ej.: un evento, una publicidad, LinkedIn' },
      errOtro: 'Contanos cuál para seguir.',
      errNombre: 'Escribí tu nombre y apellido para seguir.',
      errOpcion: 'Elegí una opción para seguir.',
      errEmail: 'Escribí un email válido.',
      errTel: 'Escribí un número de WhatsApp válido.',
      errCiudad: 'Escribí tu ciudad y provincia.',
      volver: '← Volver',
      seguir: 'Seguir',
      verPlan: 'Ver mi plan',
      alTerminar: 'Lo que ves al terminar',
      vacioTitulo: 'Tu plan aparece acá.',
      vacio: 'Respondé las preguntas y vas a ver el producto que te recomendamos, el precio cerrado, el plazo garantizado y lo que tenés que preparar.',
      tuPlan: (nombre) => `${nombre}, este es tu plan.`,
      recomendamos: 'Te recomendamos',
      precioCerrado: 'Precio cerrado',
      plazoGarantizado: 'Plazo garantizado',
      preparar: 'Qué tenés que preparar',
      precioTxt: (p) => `${p.promo} (promo verano; después ${p.lista})`,
      plazoTxt: (p) => `${p.plazo}, o te devolvemos lo que pagaste`,
      extraAmbos: 'Como también ofrecés servicios, la tienda puede llevar una sección para mostrarlos.',
      extraMuchas: 'Con más de 50 consultas por semana, te conviene sumar el asistente de WhatsApp cuando esté disponible: te avisamos.',
      waMsg: (d, p, hoy, consultas) => `Hola, soy ${d.nombre}. Armé mi plan en la web: ${p.nombre}, ${p.promo}, ${p.plazo}. Hoy: ${hoy.toLowerCase()}. Consultas por semana: ${consultas.toLowerCase()}. Quiero empezar.`,
      waBtn: 'Quiero empezar por WhatsApp',
      waNota: 'El botón abre WhatsApp con tu plan ya escrito. WhatsApp de Websy:',
      errGuardar: 'No pudimos guardar tus respuestas. Escribinos por WhatsApp con el botón de arriba.',
    },
    prod: {
      web: { nombre: 'Web institucional', promo: 'USD 474', lista: 'USD 743', plazo: '7 días', prep: 'Logo, textos y fotos' },
      tienda: { nombre: 'Tienda online', promo: 'USD 796', lista: 'USD 1.244', plazo: '12 días', prep: 'Logo, fotos y lista de productos con precios' },
    },
  },

  en: {
    pill: 'Websites for businesses all over Argentina',
    tagline: 'your website, in 7 days',
    lead: 'We build websites, online stores and WhatsApp assistants for Argentine businesses. You see the design before it goes live and you know the final price before we start.',
    ctaPlan: 'Build your plan in 1 minute',
    ctaPrices: 'See prices',
    trabajan: 'Businesses already working with their website',

    casos: {
      chip: 'Case studies and testimonials in Argentina',
      title: 'Argentine businesses already working with their website.',
      items: [
        { portfolioId: 3, tag: 'Online store', name: 'Regala Algo', result: '~ARS 2 M per month', text: 'What we did: online store with its own dashboard to manage inventory, orders and sales. It now has more than 3,000 active products.' },
        { image: '/ascenta/captura.jpg', testimonial: 'ascenta', tag: 'Accounting firm', name: 'Ascenta', text: 'What we did: website for an accounting firm in Salta, with free simulators for small-taxpayer regime, VAT and debts, and an assistant that answers inquiries.' },
        { portfolioId: 14, tag: 'Law firm', name: 'Estudio Ruarte', text: 'What we did: landing page for Ruarte & Ruarte, a law firm in Salta that handles criminal law and cannabis law. It presents the legal services and the lawyers, with WhatsApp contact from a phone, and is ready to show up in local search.' },
        { portfolioId: 1, tag: 'Logistics and distribution', name: 'M Logística y Distribución', text: 'What we did: corporate website for a company that transports lithium for export.' },
        { portfolioId: 2, tag: 'Online store', name: 'Covenant', text: 'What we did: online store for electrical materials and lighting. The catalog, quotes and shipping run on the same system that manages inventory, orders and customers.' },
        { portfolioId: 11, tag: 'Online services', name: 'Cuervo Tarot', text: 'What we did: landing page for an online tarot and rune reading service, with an immersive brand design, services presented as offers and WhatsApp contact to turn visits into inquiries.' },
      ],
      captura: '[WEBSITE SCREENSHOT]',
      video: 'Watch their video testimonial',
      verTodos: 'See all case studies',
      instagram: 'Testimonials on Instagram',
      resena: 'Leave your review',
    },

    problema: {
      chip: 'The problem',
      title: 'If your business doesn’t have a good website, customers go elsewhere.',
      items: [
        { title: 'They search for you and can’t find you', text: 'When someone searches for what you sell, your competitors show up. That customer is already someone else’s.' },
        { title: 'Your website doesn’t represent you', text: 'An old or slow website makes your business look smaller than it is.' },
        { title: 'They message you and you reply late', text: 'An inquiry that arrives at night or in the middle of work goes cold, and the customer buys from whoever answered first.' },
      ],
    },

    productos: {
      chip: 'Three products · Fixed price, no surprises',
      title: 'Choose what your business needs.',
      promo: {
        small: 'Summer promo · [December 15 to January 7]',
        strong: 'Start the year with your website up and running.',
        nota: 'Same deadline and same guarantee. [Limited spots: X websites and X stores]',
        cta: 'I want the promo',
      },
      incluye: 'Includes',
      prepLabel: 'To get started',
      items: [
        {
          tag: 'Ready in 7 days', name: 'Business website', featured: true,
          text: 'For businesses that offer services: firms, practices, professionals and companies.',
          antes: 'USD 743', precio: 'USD 474', nota: 'Promo price. Regular price: USD 743. In pesos: [ARS]',
          items: ['Up to 7 sections', 'Design you see and adjust before it goes live', '4 rounds of changes', 'Mobile-friendly', 'WhatsApp button', 'Ready to show up on Google', 'Connected to Google Search Console and Google Analytics to see your stats', 'Dashboard to edit your texts, free of charge', 'Domain in your name'],
          prep: 'Logo, texts and photos',
          cta: 'Build your plan',
        },
        {
          tag: 'Ready in 12 days', name: 'Online store',
          text: 'For businesses that sell products and want to get paid online.',
          antes: 'USD 1,244', precio: 'USD 796', nota: 'Promo price. Regular price: USD 1,244. In pesos: [ARS]',
          items: ['Catalog and cart', 'Payments with Mercado Pago or the payment gateway you prefer', 'Shipping', 'Initial upload of up to 300 products free of charge (more products quoted separately)', 'Dashboard to add products and prices and edit your texts', 'Connected to Google Search Console and Google Analytics to see your stats', 'Mobile-friendly', 'Domain in your name'],
          prep: 'Logo, photos and product list with prices',
          cta: 'Build your plan',
        },
        {
          tag: 'Coming soon', name: 'AI WhatsApp assistant', soon: true,
          text: 'For businesses that already get inquiries and can’t answer them all.',
          items: ['Replies instantly, 24 hours a day', 'Asks the prospect for their details', 'Lets you know when a customer is ready'],
          cta: 'Let me know when it’s ready',
        },
      ],
      garantia: {
        tag: 'Guaranteed deadline',
        fuerte: 'If we don’t deliver your website by the agreed deadline, we refund what you paid.',
        text: 'The deadline starts when we receive your material and covers the first complete version of the site. Terms in the quote.',
      },
      despues: 'After launch, you’re not on your own.',
      porMes: 'per month',
      mensuales: [
        { tag: 'Hosting Plan', precio: 'USD 34', text: 'Hosting for your website, backups and WhatsApp support for [X] small changes per month.' },
        { tag: 'Google Ranking Plan', precio: 'USD 148', text: 'Monthly review of how you show up on Google, improvements to your website, one new page per month and a report on visits and inquiries.' },
      ],
    },

    pasos: {
      chip: 'How we work',
      title: 'How we work, step by step.',
      items: [
        { title: 'You build your plan', text: 'Answer a few quick questions and see what you need, how much it costs and how many days it takes.' },
        { title: 'Quote the same day', text: 'Scope, price and deadline fixed in writing.' },
        { title: 'You send us your material', text: 'Logo, texts and photos. The deadline starts that day.' },
        { title: 'Your website in 7 days', text: 'You review it, we adjust it with your feedback and publish it with your domain.' },
      ],
    },

    quien: {
      chip: 'Who’s behind it',
      cargo: 'Founder of Websy · Certified Public Accountant',
      bio: [
        'I started Websy with one idea: to help entrepreneurs and small businesses grow online, with a website that works for the business instead of being one more expense.',
        'As an accountant, I look at every project through its numbers: how much it costs, how long it takes to pay off and what the website has to achieve to be worth it.',
        'I look after you, understand your business and put together the proposal. A technical team of engineers designs and publishes each website.',
      ],
      aptitudes: ['Costs and budgets for digital projects', 'Return on technology investment', 'Small business management'],
      nota: 'You always talk to the same person, from start to finish.',
    },

    faq: {
      title: 'Before you decide.',
      items: [
        { q: 'Is it really ready in 7 days?', a: 'Yes. The deadline starts when you send us your texts, photos and logo. In 7 days you have the first complete version. The store takes 12.' },
        { q: 'What if you miss the deadline?', a: 'We refund what you paid. It’s in writing in the quote.' },
        { q: 'What if I don’t like the design?', a: 'You see it before it goes live and we adjust it with your feedback. You get 4 rounds of changes.' },
        { q: 'Is the website in my name?', a: 'Yes. The domain is registered in your name and the website is yours.' },
        { q: 'Do I have to pay anything monthly?', a: 'Only if you want us to take care of the server and changes: from USD 34 per month, and you can cancel whenever you want.' },
        { q: 'Do you issue invoices?', a: 'Yes, for every payment.' },
      ],
    },

    plan: {
      chip: 'Free, no commitment',
      title: 'Build your website plan in 1 minute.',
      sub: 'Answer a few quick questions and we’ll build your personalized plan: what you need, how much it costs and in how many days you’ll have it.',
      armar: 'Build my personalized plan',
      contacto: 'I prefer the usual contact form',
      directo: 'Prefer to write to us directly?',
      hablanos: 'Message us on WhatsApp',
    },

    form: {
      paso: (n, t) => `Step ${n} of ${t}`,
      empecemos: 'Let’s start',
      ultimo: 'Last step',
      opcional: 'Optional',
      q: {
        nombre: 'What’s your name?',
        negocio: (nombre) => (nombre ? `${nombre}, what does your business do?` : 'What does your business do?'),
        hoy: 'What do you have today?',
        rubro: 'What industry is your business in?',
        facturacion: 'How much does your business make per month?',
        inversion: 'How much are you willing to invest in your website?',
        socios: 'Are you a solo owner or have a partner(s)?',
        consultas: 'How many inquiries do you get per week?',
        canal: 'How did you find us?',
        contacto: 'Where should we send your personalized plan?',
      },
      contactoSub: 'Your plan is ready. Leave your details and we’ll show it to you.',
      opts: {
        negocio: { servicios: 'I offer services', productos: 'I sell products', ambos: 'Both' },
        hoy: { sin: 'I don’t have a website', vieja: 'I have an old website', redes: 'I only use social media and WhatsApp' },
        rubro: { inmobiliario: 'Real Estate', tecnologia: 'Tech', finanzas: 'Finance', salud: 'Healthcare', industria: 'Manufacturing', profesionales: 'Professional Services', hogar: 'Home/Local Services', comercio: 'Retail', educacion: 'Education', otro: 'Other' },
        facturacion: { f0: 'Under USD 500', f1: 'USD 500 to 1,000', f2: 'USD 1,000 to 2,000', f3: 'USD 2,000 to 5,000', f4: 'USD 5,000 to 10,000', f5: 'Over USD 10,000' },
        inversion: { i0: 'Under USD 500', i1: 'USD 500 to 1,500', i2: 'USD 1,500 to 3,500', i3: 'Over USD 3,500', i4: 'Not sure yet' },
        socios: { sociedad: 'In a partnership', unico: 'Sole owner', empleado: 'I am an employee' },
        consultas: { pocas: 'Fewer than 10', medio: 'Between 10 and 50', muchas: 'More than 50' },
        canal: { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', google: 'Google', recomendacion: 'Someone recommended you', otro: 'Other' },
      },
      campos: { nombre: 'First name', apellido: 'Last name', email: 'Email', whatsapp: 'WhatsApp', ciudad: 'City and province', instagram: 'Instagram', rubroOtro: 'Which one?', canalOtro: 'Where?' },
      ph: { nombre: 'Your first name', apellido: 'Your last name', email: 'you@email.com', whatsapp: 'E.g.: 387 555 0000', ciudad: 'E.g.: Salta, Salta', instagram: '@yourbusiness', rubroOtro: 'E.g.: food, tourism, construction', canalOtro: 'E.g.: an event, an ad, LinkedIn' },
      errOtro: 'Tell us which one to continue.',
      errNombre: 'Type your first and last name to continue.',
      errOpcion: 'Choose an option to continue.',
      errEmail: 'Type a valid email.',
      errTel: 'Type a valid WhatsApp number.',
      errCiudad: 'Type your city and province.',
      volver: '← Back',
      seguir: 'Next',
      verPlan: 'See my plan',
      alTerminar: 'What you’ll see at the end',
      vacioTitulo: 'Your plan shows up here.',
      vacio: 'Answer the questions and you’ll see the product we recommend, the fixed price, the guaranteed deadline and what you need to prepare.',
      tuPlan: (nombre) => `${nombre}, here’s your plan.`,
      recomendamos: 'We recommend',
      precioCerrado: 'Fixed price',
      plazoGarantizado: 'Guaranteed deadline',
      preparar: 'What you need to prepare',
      precioTxt: (p) => `${p.promo} (summer promo; then ${p.lista})`,
      plazoTxt: (p) => `${p.plazo}, or we refund what you paid`,
      extraAmbos: 'Since you also offer services, the store can include a section to show them.',
      extraMuchas: 'With more than 50 inquiries per week, you should add the WhatsApp assistant when it’s available: we’ll let you know.',
      waMsg: (d, p, hoy, consultas) => `Hi, I’m ${d.nombre}. I built my plan on the website: ${p.nombre}, ${p.promo}, ${p.plazo}. Today: ${hoy.toLowerCase()}. Inquiries per week: ${consultas.toLowerCase()}. I want to get started.`,
      waBtn: 'I want to start on WhatsApp',
      waNota: 'The button opens WhatsApp with your plan already written. Websy’s WhatsApp:',
      errGuardar: 'We couldn’t save your answers. Message us on WhatsApp with the button above.',
    },
    prod: {
      web: { nombre: 'Business website', promo: 'USD 474', lista: 'USD 743', plazo: '7 days', prep: 'Logo, texts and photos' },
      tienda: { nombre: 'Online store', promo: 'USD 796', lista: 'USD 1,244', plazo: '12 days', prep: 'Logo, photos and product list with prices' },
    },
  },
};

// ---------------------------------------------------------------- Formulario "Armá tu plan personalizado"
// Una pregunta por pantalla, como el quiz del Scaling Roadmap de Acquisition.com. Las opciones de cada pregunta
// salen de COPY[idioma].form.opts; acá solo va el orden y qué respuesta es obligatoria.

const PASOS = [
  { id: 'nombre', tipo: 'nombre' },
  { id: 'negocio', tipo: 'opciones' },
  { id: 'hoy', tipo: 'opciones' },
  { id: 'rubro', tipo: 'opciones' },
  { id: 'facturacion', tipo: 'opciones' }, // mensual, bruta o neta da igual: es para tener una idea
  { id: 'inversion', tipo: 'opciones' },
  { id: 'socios', tipo: 'opciones' },
  { id: 'consultas', tipo: 'opciones' },
  { id: 'canal', tipo: 'opciones' },
  { id: 'contacto', tipo: 'contacto' },
];
const TOTAL = PASOS.length;
const VACIO = { nombre: '', apellido: '', negocio: '', hoy: '', rubro: '', rubroOtro: '', facturacion: '', inversion: '', socios: '', consultas: '', canal: '', canalOtro: '', email: '', tel: '', ciudad: '', instagram: '' };

const PlanForm = ({ c, formRef }) => {
  const f = c.form;
  const [paso, setPaso] = useState(1);
  const [d, setD] = useState(VACIO);
  const [error, setError] = useState('');
  const [listo, setListo] = useState(false);
  const [guardado, setGuardado] = useState('idle'); // idle | sending | done | error
  const resultadoRef = useRef(null);
  const paso0 = PASOS[paso - 1];

  const prodKey = d.negocio === 'servicios' ? 'web' : 'tienda';

  const validar = () => {
    if (paso0.tipo === 'nombre' && (!d.nombre.trim() || !d.apellido.trim())) return f.errNombre;
    if (paso0.tipo === 'opciones' && !paso0.opcional && !d[paso0.id]) return f.errOpcion;
    // "Otro" en cualquier pregunta: hay que escribir cuál (campo <id>Otro)
    if (paso0.tipo === 'opciones' && d[paso0.id] === 'otro' && !(d[`${paso0.id}Otro`] || '').trim()) return f.errOtro;
    if (paso0.tipo === 'contacto') {
      if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) return f.errEmail;
      if (d.tel.replace(/\D/g, '').length < 8) return f.errTel;
      if (!d.ciudad.trim()) return f.errCiudad;
    }
    return '';
  };

  // Lo que llega a /panel va siempre en español, sin importar el idioma en que se completó
  const guardar = async () => {
    const es = COPY.es;
    const o = es.form.opts;
    const conOtro = (id) => (d[id] === 'otro' ? `Otro: ${(d[`${id}Otro`] || '').trim()}` : o[id][d[id]]);
    const p = es.prod[prodKey];
    const phone = `+54 ${d.tel.trim()}`;
    const nombre = `${d.nombre.trim()} ${d.apellido.trim()}`;
    const record = {
      name: nombre,
      phone,
      whatsapp: phone,
      email: d.email.trim(),
      country: 'Argentina',
      rubro: conOtro('rubro'),
      projectType: p.nombre,
      budget: o.inversion[d.inversion],
      source: SOURCE,
      message: [
        'Armá tu plan personalizado (Argentina)',
        `Nombre: ${nombre}`,
        `Email: ${d.email.trim()}`,
        `WhatsApp: ${phone}`,
        `Ciudad y provincia: ${d.ciudad.trim()}`,
        `Instagram: ${d.instagram.trim() || '—'}`,
        `Qué hace el negocio: ${o.negocio[d.negocio]}`,
        `Qué tiene hoy: ${o.hoy[d.hoy]}`,
        `Rubro: ${conOtro('rubro')}`,
        `Facturación mensual: ${o.facturacion[d.facturacion]}`,
        `Dispuesto a invertir: ${o.inversion[d.inversion]}`,
        `Dueño o socios: ${o.socios[d.socios]}`,
        `Consultas por semana: ${o.consultas[d.consultas]}`,
        `Cómo nos conoció: ${conOtro('canal')}`,
        `Plan mostrado: ${p.nombre}, ${p.promo}, ${p.plazo}`,
        'Página: /argentina',
      ].join('\n'),
    };
    setGuardado('sending');
    try {
      await saveLead(record);
      trackFormSubmit(SOURCE);
      setGuardado('done');
    } catch (err) {
      console.error(err);
      setGuardado('error');
    }
  };

  const seguir = (e) => {
    e.preventDefault();
    const m = validar();
    if (m) { setError(m); return; }
    setError('');
    if (paso < TOTAL) { setPaso(paso + 1); return; }
    setListo(true);
    guardar();
    setTimeout(() => resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };

  const elegir = (campo, v) => { setD((x) => ({ ...x, [campo]: v })); setError(''); };

  const optCls = (active) => `w-full text-left rounded-xl px-5 py-4 min-h-[54px] text-[17px] font-bold text-white transition-colors ${
    active ? 'border-2 border-[#d9fb06] bg-[#d9fb06]/10' : 'border border-white/20 bg-black/25 hover:border-[#d9fb06]'
  }`;
  const campoCls = 'w-full bg-transparent border-0 border-b border-slate-500 text-white text-xl py-3.5 placeholder-slate-400 focus:outline-none focus:border-[#d9fb06]';
  const preguntaCls = 'text-2xl md:text-[28px] font-black tracking-tight leading-tight text-white';
  const etiquetaCls = 'block text-[13px] font-bold text-white/75 mb-1';
  const pregunta = paso0.id === 'negocio' ? f.q.negocio(d.nombre.trim()) : f.q[paso0.id];
  const opciones = paso0.tipo === 'opciones' ? Object.entries(f.opts[paso0.id]) : [];
  const campoTexto = (key, props = {}) => (
    <div key={key}>
      <label htmlFor={`ar-${key}`} className={etiquetaCls}>{f.campos[key]}{props.opcional ? ` · ${f.opcional}` : ''}</label>
      <input id={`ar-${key}`} value={d[key === 'whatsapp' ? 'tel' : key]} onChange={(e) => setD({ ...d, [key === 'whatsapp' ? 'tel' : key]: e.target.value })}
        placeholder={f.ph[key]} className={campoCls} {...props.input} />
    </div>
  );

  const p = c.prod[prodKey];
  const extra = [d.negocio === 'ambos' && f.extraAmbos, d.consultas === 'muchas' && f.extraMuchas].filter(Boolean).join(' ');

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-stretch">
      <form ref={formRef} onSubmit={seguir} noValidate style={{ scrollMarginTop: '120px' }} className="rounded-2xl bg-white/[0.05] border border-white/10 p-6 md:p-8 flex flex-col gap-5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[.2em] text-white/70 mb-2">{f.paso(paso, TOTAL)}</p>
          <div className="h-1.5 rounded bg-white/10 overflow-hidden">
            <div className="h-1.5 bg-[#d9fb06] transition-all duration-300" style={{ width: `${(paso / TOTAL) * 100}%` }} />
          </div>
        </div>

        {paso0.tipo === 'nombre' && (
          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-bold text-white/75">{f.empecemos}</p>
            <p className={preguntaCls}>{pregunta}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {campoTexto('nombre', { input: { autoComplete: 'given-name' } })}
              {campoTexto('apellido', { input: { autoComplete: 'family-name' } })}
            </div>
          </div>
        )}

        {paso0.tipo === 'opciones' && (
          <div>
            <p className={`${preguntaCls} mb-4`}>{pregunta}{paso0.opcional && <span className="ml-2 align-middle text-xs font-bold uppercase tracking-widest text-white/50">{f.opcional}</span>}</p>
            <div className={`grid gap-3 ${opciones.length > 5 ? 'sm:grid-cols-2' : ''}`}>
              {opciones.map(([v, texto]) => (
                <button key={v} type="button" onClick={() => elegir(paso0.id, v)} aria-pressed={d[paso0.id] === v} className={optCls(d[paso0.id] === v)}>{texto}</button>
              ))}
            </div>
            {/* Rubro "Otro": se escribe cuál */}
            {d[paso0.id] === 'otro' && (
              <div className="mt-4">{campoTexto(`${paso0.id}Otro`, { input: { autoFocus: true } })}</div>
            )}
          </div>
        )}

        {paso0.tipo === 'contacto' && (
          <div className="flex flex-col gap-4">
            <p className="text-[13px] font-bold text-white/75">{f.ultimo}</p>
            <div>
              <p className={preguntaCls}>{pregunta}</p>
              <p className="mt-2 text-[15px] text-white/70">{f.contactoSub}</p>
            </div>
            {campoTexto('email', { input: { type: 'email', inputMode: 'email', autoComplete: 'email' } })}
            {campoTexto('whatsapp', { input: { type: 'tel', inputMode: 'tel', autoComplete: 'tel' } })}
            {campoTexto('ciudad', { input: { autoComplete: 'address-level2' } })}
            {campoTexto('instagram', { opcional: true })}
          </div>
        )}

        <p role="alert" className="min-h-[20px] text-sm font-semibold text-red-200">{error}</p>
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => { setPaso(paso - 1); setError(''); }} className={`min-h-[44px] text-sm font-bold text-white/75 hover:text-[#d9fb06] ${paso > 1 ? '' : 'invisible'}`}>{f.volver}</button>
          <button type="submit" disabled={guardado === 'sending'} className="inline-flex items-center gap-2 bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-7 py-3.5 text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors disabled:opacity-60">
            {paso === TOTAL ? f.verPlan : f.seguir} <ArrowRight size={16} />
          </button>
        </div>
      </form>

      <div ref={resultadoRef} aria-live="polite" className="rounded-2xl bg-white text-[#182A2C] p-6 md:p-8 flex flex-col gap-4">
        <span className="text-[11px] font-black uppercase tracking-[.18em] text-[#52645d]">{f.alTerminar}</span>
        {!listo ? (
          <>
            <h3 className="text-2xl md:text-[28px] font-black tracking-tight leading-tight">{f.vacioTitulo}</h3>
            <p className="text-slate-600 leading-relaxed">{f.vacio}</p>
          </>
        ) : (
          <>
            <h3 className="text-2xl md:text-[28px] font-black tracking-tight leading-tight">{f.tuPlan(d.nombre.trim())}</h3>
            <dl className="text-[15px] md:text-base">
              {[
                [f.recomendamos, p.nombre],
                [f.precioCerrado, f.precioTxt(p)],
                [f.plazoGarantizado, f.plazoTxt(p)],
                [f.preparar, p.prep],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3 border-b border-slate-200">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-extrabold text-right">{v}</dd>
                </div>
              ))}
            </dl>
            {extra && <p className="text-[15px] text-slate-600 leading-relaxed">{extra}</p>}
            <a href={whatsappUrl(f.waMsg(d, p, f.opts.hoy[d.hoy], f.opts.consultas[d.consultas]), 'AR')} target="_blank" rel="noopener noreferrer" data-wa-location="plan_argentina"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 bg-[#182A2C] hover:bg-black text-white font-black px-6 py-4 text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors">
              <MessageCircle size={16} /> {f.waBtn}
            </a>
            <p className="text-[13px] text-slate-500">{f.waNota} {CONTACT.phoneDisplay}</p>
            {guardado === 'error' && <p className="text-[13px] text-red-600">{f.errGuardar}</p>}
          </>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- Piezas visuales (mismo estilo que el resto del sitio)

const Chip = ({ children }) => (
  <span className="inline-block bg-[#d9fb06] text-[#182A2C] font-black text-[10px] tracking-[.25em] uppercase px-2 py-1 mb-5">{children}</span>
);

const Titulo = ({ children, light = false }) => (
  <h2 className={`text-[28px] md:text-[40px] font-black leading-[1.1] tracking-tight max-w-3xl mb-8 ${light ? 'text-white' : 'text-[#182A2C]'}`}>{children}</h2>
);

const Seccion = ({ id, className = 'bg-white', children }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`} style={id ? { scrollMarginTop: '120px' } : undefined}>
    <div className="container mx-auto px-5 lg:px-8 max-w-7xl">{children}</div>
  </section>
);

const Tag = ({ children, className = '' }) => (
  <span className={`text-[11px] font-black uppercase tracking-[.18em] text-[#52645d] ${className}`}>{children}</span>
);

const Placeholder = ({ children, className = '' }) => (
  <div className={`flex items-center justify-center bg-slate-200 text-slate-600 text-[13px] font-bold ${className}`}>{children}</div>
);

const btnDark = 'inline-flex items-center justify-center gap-2 bg-[#182A2C] hover:bg-black text-white font-black px-5 py-3 text-[11px] uppercase tracking-[0.15em] transition-colors';
const btnLine = 'inline-flex items-center justify-center gap-2 border border-[#182A2C] text-[#182A2C] hover:bg-[#182A2C] hover:text-white font-black px-5 py-3 text-[11px] uppercase tracking-[0.15em] transition-colors';

// ---------------------------------------------------------------- Página

export const ArgentinaPage = () => {
  const { currentLanguage } = useLanguage();
  const c = COPY[currentLanguage] || COPY.es;
  const { hash } = useLocation();
  const planFormRef = useRef(null);
  const page = countryPageByCode('AR');
  const url = `${SITE_URL}/argentina`;

  // Igual que antes: entrar a /argentina fija el mercado para que /planes muestre los precios de Argentina
  useEffect(() => saveCountry('AR'), []);

  // Enlaces con ancla (#productos desde el menú y el pie, o la redirección de /servicios)
  useEffect(() => {
    if (!hash) return undefined;
    // Después de ScrollToTopOnRouteChange, que sube al inicio en cada cambio de ruta. Salto directo (sin
    // animación) y un segundo intento por si la página todavía estaba acomodándose al terminar de cargar.
    const ir = () => {
      const el = document.querySelector(hash);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'instant' });
    };
    const timers = [setTimeout(ir, 300), setTimeout(ir, 900)];
    return () => timers.forEach(clearTimeout);
  }, [hash]);

  const casos = c.casos;
  const pr = c.productos;

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[115px]" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={page.seoTitle}
        description={page.seoDescription}
        url={url}
        alternates={COUNTRY_ALTERNATES}
        locale={page.locale}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@800;900&display=swap');
        .ar-brand { font-family: 'Outfit', sans-serif; }
        .ar-cursive { font-family: 'Caveat', cursive; }
      `}</style>

      {/* Inicio: marca, propuesta y botones; la promesa de los 7 días va debajo de "Armá tu plan" */}
      <section id="inicio-ar" className="relative bg-[#182A2C] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#244246]/60 via-[#182A2C]/90 to-[#0e1b1d] pointer-events-none" />
        <div className="relative container mx-auto px-5 lg:px-8 max-w-5xl text-center flex flex-col items-center py-14 md:py-20">
          {/* El cartel es el h1 de la página (Agustín sacó la frase de los 7 días que antes cumplía ese rol) */}
          <h1 className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9fb06]/40 bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold text-white/90">
            <MapPin size={14} className="shrink-0 text-[#d9fb06]" aria-hidden="true" /> {c.pill}
          </h1>
          <div aria-hidden="true" className="ar-brand text-7xl sm:text-8xl lg:text-[128px] font-black leading-none tracking-tight uppercase drop-shadow-2xl">WEBSY</div>
          <p aria-hidden="true" className="ar-cursive text-4xl sm:text-5xl lg:text-6xl text-[#d9fb06] -mt-1 sm:-mt-4 mb-6 rotate-[-2deg]">{c.tagline}</p>
          <p className="max-w-3xl text-base sm:text-lg text-gray-100 font-medium leading-relaxed mb-8">{c.lead}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href="#plan" className="w-full sm:w-auto bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.15em] transition-all hover:scale-105 inline-flex items-center justify-center gap-3">
              {c.ctaPlan} <ArrowRight size={18} />
            </a>
            <a href="#productos" className="w-full sm:w-auto bg-black/50 hover:bg-black/80 text-white hover:text-[#d9fb06] font-black px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.15em] border border-[#d9fb06]/60 hover:border-[#d9fb06] transition-all hover:scale-105">
              {c.ctaPrices}
            </a>
          </div>
          {/* Franja de clientes: suma confianza y completa el inicio (las capturas son las mismas de los casos) */}
          <div className="mt-12 md:mt-14 pt-8 w-full border-t border-white/10">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 mb-5">{c.trabajan}</p>
            <ul className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
              {casos.items.map((it) => {
                const src = it.image || portfolio.find((p) => p.id === it.portfolioId)?.image;
                return (
                  <li key={it.name}>
                    <a href="#casos" className="group block" aria-label={it.name}>
                      <img src={src} alt="" width="320" height="200" loading="eager" decoding="async"
                        className="w-full aspect-[16/10] rounded-lg object-cover object-top border border-white/15 group-hover:border-[#d9fb06] transition-colors" />
                      <span className="mt-2 block text-[11px] sm:text-xs font-semibold text-white/75 group-hover:text-[#d9fb06] truncate">{it.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Casos (arriba, pedido de Agustín) */}
      <Seccion id="casos" className="bg-[#f4f7f9]">
        <Chip>{casos.chip}</Chip>
        <Titulo>{casos.title}</Titulo>
        <div className="grid md:grid-cols-3 gap-5">
          {casos.items.map((it) => (
            <article key={it.name} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
              {/* La misma captura que usa el sitio en Casos de Éxito (mockData.js); sin captura, el lugar marcado */}
              {it.image || portfolio.find((p) => p.id === it.portfolioId)?.image ? (
                <img src={it.image || portfolio.find((p) => p.id === it.portfolioId).image} alt={`${it.name}: ${it.tag}`} width="640" height="400" loading="lazy" decoding="async"
                  className="h-36 w-full rounded-xl object-cover object-top border border-slate-200" />
              ) : (
                <Placeholder className="h-36 rounded-xl">{casos.captura}</Placeholder>
              )}
              <Tag>{it.tag}</Tag>
              <h3 className="text-xl font-extrabold text-[#182A2C] leading-tight">{it.name}</h3>
              {it.result && <span className="text-2xl font-black tracking-tight text-[#182A2C]">{it.result}</span>}
              <p className="text-[15px] text-slate-600 leading-relaxed">{it.text}</p>
              {/* Testimonio de la historia destacada "clientes" de Instagram (src/testimonials.js) */}
              {(() => {
                const t = testimonialFor(it.testimonial || it.portfolioId);
                if (!t) return null;
                return (
                  <div className="mt-auto border-t border-slate-200 pt-3 flex flex-col gap-3">
                    {t.quote ? (
                      <p className="italic text-[15px] text-slate-700 leading-relaxed">“{t.quote}”</p>
                    ) : (
                      <a href={t.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-2 underline-offset-4">
                        <Play size={16} /> {casos.video}
                      </a>
                    )}
                    <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-500">
                      <span className="h-10 w-10 shrink-0 rounded-full bg-[#182A2C] text-[#d9fb06] text-xs font-black flex items-center justify-center" aria-hidden="true">{initialsOf(t.name)}</span>
                      <span><span className="text-[#182A2C]">{t.name}</span>{t.role ? `, ${t.role}` : ''}</span>
                    </div>
                  </div>
                );
              })()}
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={withArgentina('/casos-de-exito')} className={btnDark}>{casos.verTodos}</Link>
          {INSTAGRAM && <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={btnLine}>{casos.instagram}</a>}
          <a href="#casos" className={btnLine}>{casos.resena}</a>
        </div>
      </Seccion>

      {/* El problema: fondo verde claro de la marca en lugar de blanco */}
      <Seccion className="bg-[#faffdc] border-y border-[#d9fb06]/60">
        <Chip>{c.problema.chip}</Chip>
        <Titulo>{c.problema.title}</Titulo>
        <div className="grid md:grid-cols-3 gap-5">
          {c.problema.items.map((p, i) => (
            <div key={p.title} className="rounded-2xl bg-white border border-[#182A2C]/10 p-6 flex flex-col gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#182A2C] text-[#d9fb06] font-black flex items-center justify-center">{i + 1}</span>
              <h3 className="text-xl font-extrabold text-[#182A2C] leading-tight">{p.title}</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </Seccion>

      {/* Productos y precios en una sola sección */}
      <Seccion id="productos">
        <span id="precios" className="block relative -top-[120px]" aria-hidden="true" />
        <Chip>{pr.chip}</Chip>
        <Titulo>{pr.title}</Titulo>

        <div className="rounded-2xl bg-[#182A2C] text-white p-6 md:p-7 flex flex-wrap items-center justify-between gap-5 mb-6">
          <div>
            <small className="block text-[11px] font-black tracking-[.2em] uppercase text-[#d9fb06] mb-1.5">{pr.promo.small}</small>
            <strong className="block text-2xl font-black tracking-tight leading-tight">{pr.promo.strong}</strong>
            <span className="text-[15px] text-white/75">{pr.promo.nota}</span>
          </div>
          <a href="#plan" className="bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-7 py-3.5 text-xs uppercase tracking-[0.15em] transition-colors">{pr.promo.cta}</a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pr.items.map((it) => (
            <div key={it.name} className={`rounded-2xl p-6 flex flex-col gap-3 ${
              it.featured ? 'bg-white border-2 border-[#182A2C] shadow-[0_20px_40px_rgba(24,42,44,.12)]' : it.soon ? 'border border-dashed border-slate-300 bg-[#f8fafc]' : 'bg-white border border-slate-200'
            }`}>
              <Tag>{it.tag}</Tag>
              <h3 className="text-2xl font-extrabold text-[#182A2C] leading-tight">{it.name}</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">{it.text}</p>
              {it.precio && (
                <div className="py-3 border-y border-slate-200">
                  <span className="block text-base font-semibold text-slate-500 line-through">{it.antes}</span>
                  <span className="block text-[44px] font-black tracking-tight text-[#182A2C] leading-none">{it.precio}</span>
                  <p className="mt-2 text-[13px] text-slate-500 leading-snug">{it.nota}</p>
                </div>
              )}
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.18em] text-[#182A2C] mb-2">{pr.incluye}</p>
                <ul className="space-y-1.5 text-[15px] text-[#182A2C]">
                  {it.items.map((x) => <li key={x} className="flex items-start gap-2"><Check size={16} className="mt-1 shrink-0 text-[#556902]" />{x}</li>)}
                </ul>
              </div>
              {it.prep && <p className="text-[14px] text-slate-600"><strong className="text-[#182A2C]">{pr.prepLabel}:</strong> {it.prep}</p>}
              <a href="#plan" className={`mt-auto ${it.soon ? btnLine : btnDark}`}>{it.cta}</a>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-[#d9fb06] p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 text-[#182A2C]">
          <ShieldCheck size={36} className="shrink-0" />
          <div>
            <Tag className="!text-[#182A2C]/70">{pr.garantia.tag}</Tag>
            <p className="mt-1 text-xl font-extrabold leading-snug">{pr.garantia.fuerte}</p>
            <p className="mt-1 text-[15px] leading-relaxed">{pr.garantia.text}</p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#182A2C] mb-5">{pr.despues}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Planes mensuales con los verdes oscuros de la marca (en blanco quedaban pálidos) */}
            {pr.mensuales.map((m, i) => (
              <div key={m.tag} className={`rounded-2xl p-6 flex flex-col gap-2 text-white ${i === 0 ? 'bg-[#182A2C]' : 'bg-[#244246]'}`}>
                <span className="text-[11px] font-black uppercase tracking-[.18em] text-[#d9fb06]">{m.tag}</span>
                <span className="text-3xl font-black tracking-tight text-white">{m.precio} <span className="text-[15px] font-semibold text-white/60 tracking-normal">{pr.porMes}</span></span>
                <p className="text-[15px] text-white/80 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Seccion>

      {/* Cómo trabajamos */}
      <Seccion className="bg-[#182A2C] text-white">
        <Chip>{c.pasos.chip}</Chip>
        <Titulo light>{c.pasos.title}</Titulo>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.pasos.items.map((s, i) => (
            <div key={s.title} className="rounded-2xl bg-white/[0.05] border border-white/10 p-6">
              <b className="block text-4xl font-black text-[#d9fb06] tracking-tight leading-none mb-3">{String(i + 1).padStart(2, '0')}</b>
              <h3 className="text-lg font-extrabold mb-1.5">{s.title}</h3>
              <p className="text-[15px] text-white/75 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </Seccion>

      {/* Quién está detrás: foto grande y redonda, quién es y por qué arrancó Websy (estilo "Meet the team") */}
      <Seccion className="bg-white">
        <Chip>{c.quien.chip}</Chip>
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-14 items-center">
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
            <div className="absolute -inset-3 rounded-full bg-[#d9fb06]" aria-hidden="true" />
            <img src="/equipo/agustin-davila.jpg" alt="Agustín Dávila, fundador de Websy" width="640" height="640" loading="lazy" decoding="async"
              className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-[0_20px_40px_rgba(24,42,44,.18)]" />
          </div>
          <div>
            <h2 className="text-[30px] md:text-[42px] font-black leading-[1.05] tracking-tight text-[#182A2C]">Agustín Dávila</h2>
            <p className="mt-2 text-[13px] font-black uppercase tracking-[.18em] text-[#556902]">{c.quien.cargo}</p>
            <div className="mt-5 space-y-3 text-[16px] md:text-[17px] text-slate-700 leading-relaxed">
              {c.quien.bio.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.quien.aptitudes.map((a) => (
                <li key={a} className="rounded-full bg-[#182A2C] text-white text-[13px] font-semibold px-4 py-2">{a}</li>
              ))}
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#faffdc] border border-[#d9fb06] px-4 py-3 text-[15px] font-bold text-[#182A2C]">
              <MessageCircle size={18} className="shrink-0 text-[#556902]" /> {c.quien.nota}
            </p>
          </div>
        </div>
      </Seccion>

      {/* Preguntas frecuentes justo antes del formulario (sin el blog, pedido de Agustín), en tarjetas sobre verde claro */}
      <FAQSection items={c.faq.items} title={c.faq.title} id="preguntas" variant="cards" />

      {/* Armá tu plan */}
      <Seccion id="plan" className="bg-[#182A2C] text-white">
        <Chip>{c.plan.chip}</Chip>
        <Titulo light>{c.plan.title}</Titulo>
        <p className="-mt-4 mb-6 text-lg text-white/80 max-w-2xl leading-relaxed">{c.plan.sub}</p>
        {/* Dos caminos: el plan personalizado (el que más conviene completar) o el contacto de siempre */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <button type="button"
            onClick={() => { planFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); planFormRef.current?.querySelector('input,button')?.focus({ preventScroll: true }); }}
            className="inline-flex items-center justify-center gap-2 bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-7 py-4 text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors">
            {c.plan.armar} <ArrowRight size={16} />
          </button>
          <Link to="/contacto" className="inline-flex items-center justify-center border border-white/40 hover:border-[#d9fb06] hover:text-[#d9fb06] text-white font-black px-7 py-4 text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors">
            {c.plan.contacto}
          </Link>
        </div>
        <PlanForm key={currentLanguage} c={c} formRef={planFormRef} />
        <p className="mt-6 text-white/80">
          {c.plan.directo}{' '}
          <a href={whatsappUrl('', 'AR')} target="_blank" rel="noopener noreferrer" data-wa-location="plan_argentina_directo" className="font-extrabold text-[#d9fb06]">{c.plan.hablanos}</a>
          {' '}· {CONTACT.phoneDisplay}
        </p>
      </Seccion>
    </div>
  );
};
