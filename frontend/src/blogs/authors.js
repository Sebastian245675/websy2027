// Autores del blog (/autores/<slug>). Solo datos confirmados: lo que no esté acá no se muestra.
// sameAs: perfiles personales públicos (LinkedIn, GitHub). Agregarlos cuando estén disponibles: Google los usa
// para relacionar al autor con su trabajo fuera del sitio.

export const authors = [
  {
    slug: 'agustin-davila',
    name: 'Agustín Dávila',
    jobTitle: 'Fundador · Contador Público',
    summary: 'Contador Público Nacional y fundador de Websy. Escribe sobre precios, costos y retorno de la inversión en tecnología para pymes.',
    bio: [
      'Agustín es el fundador de Websy, la agencia de desarrollo web y software de Salta, Argentina. Es Contador Público Nacional.',
      'Desde ese lugar mira cada proyecto por sus números: cuánto cuesta, en cuánto tiempo se recupera y qué tiene que vender la web o el sistema para que valga la pena.',
      'Firma las guías de precios y costos del blog, escritas con los valores que Websy publica y cobra.',
    ],
    expertise: ['Costos y presupuestos de proyectos digitales', 'Retorno de la inversión en tecnología', 'Gestión de pymes'],
    sameAs: [],
  },
  {
    slug: 'sebastian-aguirre',
    name: 'Sebastian Aguirre',
    jobTitle: 'Líder técnico de Websy',
    summary: 'Tecnólogo en Análisis y Desarrollo de Software, especializado en inteligencia artificial y automatizaciones. Lidera la parte técnica de los proyectos de Websy.',
    bio: [
      'Sebastian es el líder técnico de Websy, la agencia de desarrollo web y software de Salta, Argentina. Es Tecnólogo en Análisis y Desarrollo de Software y trabaja como desarrollador full stack, con foco en inteligencia artificial y automatización de procesos.',
      'Dirige la parte técnica de los proyectos de la agencia: sitios web y tiendas online en React y Next.js, sistemas de gestión a medida, integraciones con WhatsApp y automatizaciones con IA para empresas de Argentina, Colombia, México y Estados Unidos.',
      'Escribe el blog de Websy a partir de esos proyectos: qué conviene, cuánto cuesta y qué errores evitar cuando una empresa invierte en tecnología.',
    ],
    expertise: ['Desarrollo full stack', 'React y Next.js', 'Node.js', 'Python', 'Inteligencia artificial', 'Automatización de procesos', 'Sistemas de gestión a medida'],
    sameAs: [],
  },
];

export const authorBySlug = (slug) => authors.find((a) => a.slug === slug);
export const authorByName = (name) => authors.find((a) => a.name === name);
