// "Versión Argentina" del sitio: /argentina y las páginas que se abren desde ahí con ?pais=argentina
// (casos de éxito y blog). En esas páginas el menú, el pie y el botón de WhatsApp son los reducidos.

export const AR_PARAM = 'pais=argentina';

export const isArgentinaView = (pathname = '', search = '') =>
  pathname === '/argentina' || new URLSearchParams(search).get('pais') === 'argentina';

// Agrega ?pais=argentina a un enlace interno (respeta el #ancla si lo tiene)
export const withArgentina = (to) => {
  const [path, hash = ''] = to.split('#');
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}${AR_PARAM}${hash ? `#${hash}` : ''}`;
};
