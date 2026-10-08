**Next.js es un framework basado en React que genera las páginas en el servidor o al compilar el sitio, en lugar de armarlas solo en el navegador; así cada página llega con su contenido completo en el HTML, carga rápido y Google la lee sin problemas.** Además resuelve rutas, optimización de imágenes, datos estructurados y una API en el mismo proyecto, lo que lo vuelve una de las opciones más usadas para webs de empresa, tiendas y aplicaciones web que necesitan posicionar.

En esta guía verás qué es Next.js, cómo funciona, las formas de generar páginas, sus ventajas para el SEO y la velocidad, en qué se diferencia de React solo y cuándo conviene.

## Por qué existe Next.js

Una aplicación hecha solo con React suele enviar al navegador una página casi vacía y JavaScript que arma el contenido. Funciona, pero tiene dos problemas: tarda más en mostrar algo y los buscadores tienen que ejecutar ese JavaScript para ver el contenido. Next.js genera el HTML completo antes de enviarlo.

## Formas de generar las páginas

| Modo | Cómo funciona | Conviene para |
| --- | --- | --- |
| Generación estática | El HTML se genera al compilar el sitio | Páginas que cambian poco: servicios, blog |
| Regeneración incremental | Páginas estáticas que se actualizan cada cierto tiempo o a pedido | Catálogos, blogs con muchas entradas |
| Renderizado en el servidor | El HTML se genera en cada pedido | Contenido personalizado o muy cambiante |
| Componentes del servidor | Partes de la página que se resuelven en el servidor y envían menos JavaScript | Páginas con datos y buena velocidad |
| Renderizado en el navegador | La parte interactiva se resuelve en el cliente | Paneles, carritos, filtros |

En un mismo sitio se combinan: la página de servicios estática, el carrito en el navegador.

## Ventajas para una empresa

### SEO

El contenido está en el HTML, y Next.js facilita definir títulos, descripciones, canonical, datos estructurados y sitemap por página. Por ejemplo, la web de la [Dra. Nancy Melo](/casos-de-exito/pagina-web-abogada-penalista-cali-nancy-melo), hecha con Next.js, declara el perfil profesional y sus credenciales en datos estructurados.

### Velocidad

Optimización automática de imágenes, carga de fuentes, división del código y servidores cercanos al usuario cuando se aloja en plataformas como Vercel. Ayuda a cumplir las Core Web Vitals. Ver [qué son las Core Web Vitals](/blog/core-web-vitals-como-optimizar-velocidad-web-posicionamiento-google).

### Todo en un proyecto

Páginas, API para formularios o integraciones y lógica del servidor en el mismo código.

### Escala

Sirve tanto para una landing como para una tienda o una plataforma grande.

## Next.js vs React solo

| Aspecto | React solo | Next.js |
| --- | --- | --- |
| Contenido en el HTML | No por defecto | Sí |
| Rutas | Hay que configurarlas con librerías | Incluidas por estructura de carpetas |
| Optimización de imágenes | Manual | Incluida |
| API propia | Aparte | Incluida |
| Ideal para | Paneles y aplicaciones sin SEO | Sitios y aplicaciones con SEO |

## Límites

- Requiere un equipo que conozca React.
- Algunas funciones dependen de cómo y dónde se aloja (plataformas como Vercel, un servidor Node.js o exportación estática).
- El contenido editable se resuelve con un CMS headless o un panel. Ver [qué es un headless CMS](/blog/desarrollo-web-jamstack-headless-cms-nextjs).

## Cuándo conviene

| Proyecto | ¿Next.js? |
| --- | --- |
| Sitio de empresa que quiere posicionar | Sí |
| Tienda online a medida | Sí |
| Blog con muchas entradas | Sí, con CMS o archivos |
| Panel interno sin SEO | Opcional; React solo también sirve |
| Sitio muy simple de una página | Puede alcanzar con HTML estático |

## Errores comunes con Next.js

- **Marcar todo como componente del cliente** y perder las ventajas del renderizado en el servidor.
- **No definir metadatos por página**: títulos y descripciones repetidos.
- **Imágenes sin el componente optimizado** o sin dimensiones.
- **Alojarlo sin considerar las funciones que usa**: algunas requieren un entorno con servidor Node.js o una plataforma compatible.
- **No configurar redirecciones** al migrar desde otra web.

## Funciones útiles para una web de empresa

| Función | Para qué sirve |
| --- | --- |
| Metadatos por página | Títulos, descripciones y datos para redes en cada URL |
| Sitemap y robots generados | Que Google encuentre todas las páginas |
| Optimización de imágenes | Formatos modernos y tamaños por dispositivo |
| Rutas de API | Formularios, integraciones con CRM o WhatsApp |
| Redirecciones | Mantener el posicionamiento al cambiar URLs |

## Preguntas frecuentes

### ¿Qué es Next.js?

Un framework basado en React que genera las páginas en el servidor o al compilar, para que lleguen con su contenido completo en el HTML, carguen rápido y posicionen bien.

### ¿Next.js es mejor que WordPress?

Depende del proyecto. Next.js da velocidad, diseño propio y control del SEO; WordPress, edición sencilla con un panel conocido. Ver [React vs WordPress](/blog/desarrollo-web-react-vs-wordpress-guia-comparativa).

### ¿Dónde se aloja una web en Next.js?

En plataformas como Vercel o Netlify, en un servidor con Node.js o, si es estática, en cualquier hosting. Ver [AWS vs Vercel vs Firebase](/blog/aws-vs-vercel-vs-firebase-donde-alojar-tu-proyecto-web-app).

### ¿Next.js es gratis?

Sí, es de código abierto. Pagas el hosting según dónde lo alojes.

## Tu web con Next.js

En Websy desarrollamos webs y tiendas con Next.js, con SEO técnico y velocidad desde el inicio. Mira la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
