// Testimonios de clientes, tomados de la historia destacada "clientes" del Instagram de Websy (@websyar).
// Se indexan por el id del proyecto en mockData.js (portfolio). Los que son en video enlazan a la destacada.
// Se usan en /argentina (casos) y en /casos-de-exito.

export const TESTIMONIALS_HIGHLIGHT_URL = 'https://www.instagram.com/stories/highlights/18070602206268770/';

export const testimonials = {
  // M Logística y Distribución SRL
  1: {
    name: 'Ramiro Piorno',
    quote: 'Sobre la construcción de la página web, para nosotros fue una experiencia sumamente positiva desde el principio, donde planteamos cuál era nuestra idea, nos sentimos escuchados, y después en todo el proceso de construcción, en los ida y vuelta, en ese feedback de cada devolución también.',
  },
  // Covenant
  2: {
    name: 'Ricardo Alfaro',
    role: 'dueño de Covenant',
    quote: 'Contratamos a Websy y en pocas semanas nuestra web pasó de ser un catálogo a una máquina de consultas. Profesionalismo y resultados. 100% recomendados.',
  },
  // Regala Algo SRL
  3: {
    name: 'Dr. Leandro Calvo Schenelle',
    quote: 'La verdad muy buena experiencia, me sentí siempre acompañado, fue muy bueno, me dieron muchas recomendaciones. Al comienzo me ayudaron a cómo organizar, me recomendaron cómo poner los títulos. La verdad que lo recomiendo mucho.',
  },
  // NUVO Perfumería
  4: {
    name: 'Ricardo Alfaro',
    quote: '¡Buenas tardes! Quería comentarles que me encantó la página web. Quedó exactamente como quería, y en parte al buen acompañamiento por parte de ustedes en el proceso de principio a fin y en servicio posventa. ¡Muchas gracias!',
  },
  // Che Carreta Restaurante (Perú)
  5: {
    name: 'Che Carreta',
    quote: 'Estamos como empresa, Che Carreta, muy agradecidos con el apoyo brindado en el desarrollo de mi página web. Websy nos asesoró constantemente en todo, ha sido una experiencia satisfactoria, el compromiso para que todo salga como nosotros queríamos, una página que sea fácil navegar y que sea ligera para poder hacerla parte de nuestro ecosistema digital. Muchas gracias por toda la paciencia y sé que cuento con ustedes para mis futuros proyectos. Che Carreta Perú recomienda poner tus proyectos en sus manos.',
  },
  // Ascenta (no está en el portfolio). Texto redactado con Agustín para su socio Nicolás, a confirmar con él.
  ascenta: {
    name: 'Nicolás Tula Monsech',
    role: 'socio de Ascenta',
    quote: 'Con Websy armamos una web que explica claro lo que hacemos en Ascenta y suma herramientas reales para nuestros clientes, como los simuladores. Estamos muy contentos con el trabajo y con el acompañamiento en todo el proceso.',
  },
  // Cuervo Tarot (testimonio en video)
  11: { name: 'Cuervo Tarot', video: TESTIMONIALS_HIGHLIGHT_URL },
  // Estudio Ruarte (testimonio en video)
  14: { name: 'Ruarte & Ruarte', video: TESTIMONIALS_HIGHLIGHT_URL },
};

export const testimonialFor = (portfolioId) => (portfolioId == null ? null : testimonials[portfolioId] || null);

export const initialsOf = (name = '') =>
  name.replace(/^(Dr|Dra|Lic)\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
