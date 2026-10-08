**El SEO técnico es el trabajo que permite que Google rastree, entienda e indexe correctamente un sitio: URLs y canonical correctas, una sola versión de cada página, sitemap y robots.txt bien configurados, contenido disponible en el HTML, velocidad y Core Web Vitals, datos estructurados, enlaces internos y respuestas HTTP correctas (200, 301, 404).** Sin esta base, el mejor contenido puede quedar fuera de los resultados.

Esta guía es una lista de control completa para revisar un sitio, con qué verificar en cada punto, cómo detectar el problema y cómo corregirlo. Sirve tanto para sitios nuevos como para auditar uno existente.

## Checklist de SEO técnico

| Área | Qué verificar | Herramienta |
| --- | --- | --- |
| Indexación | Las páginas importantes están indexadas; las que no aportan, no | Search Console, informe Páginas |
| Canonical | Cada página declara su propia URL como canónica | Inspección de URL, código fuente |
| Versiones de URL | Una sola: https, con o sin www, con o sin barra final | Probar las variantes en el navegador |
| Redirecciones | 301 directas, sin cadenas | Herramientas de rastreo, curl |
| Códigos de respuesta | 200 en páginas válidas, 404 real en las inexistentes | curl, rastreadores |
| robots.txt | No bloquea CSS, JS ni secciones importantes; incluye el sitemap | /robots.txt |
| Sitemap | Solo URLs canónicas con 200, lastmod real | Search Console, Sitemaps |
| Renderizado | El contenido está en el HTML | Ver código fuente |
| Velocidad | Core Web Vitals en verde en el celular | PageSpeed Insights, Search Console |
| Datos estructurados | Válidos y coherentes con el contenido visible | Prueba de resultados enriquecidos |
| Enlaces internos | Todas las páginas alcanzables con enlaces reales | Rastreadores |
| HTTPS | Certificado válido, sin contenido mixto | Navegador |

## Indexación y canonical

- **Cada página debe tener una canonical autorreferente**, absoluta y con la versión elegida del dominio: `https://www.tudominio.com/servicios/desarrollo-web`.
- **No uses una canonical fija en la plantilla**: si todas las páginas heredan la canonical de la portada, Google las trata como copias de la portada.
- **Las páginas con noindex no deberían declarar canonical** ni estar en el sitemap.
- **Los parámetros** (utm, filtros, paginación) deben mantener la canonical de la página limpia cuando el contenido es el mismo.

## Una sola versión de cada URL

Elige un formato y redirige todo lo demás con 301 en un solo salto:

| Variante | Debe ir a |
| --- | --- |
| http://tudominio.com/pagina/ | https://www.tudominio.com/pagina |
| https://tudominio.com/pagina | https://www.tudominio.com/pagina |
| https://www.tudominio.com/pagina/ | https://www.tudominio.com/pagina |
| https://www.tudominio.com/pagina/index.html | https://www.tudominio.com/pagina |

Los enlaces internos, el sitemap y las canonical deben usar exactamente el formato elegido.

## Respuestas HTTP correctas

- **200**: la página existe.
- **301**: se movió de forma permanente (slugs viejos, variantes de URL).
- **404**: no existe. Una página inexistente que muestra la portada con código 200 es un "soft 404" y Google la penaliza como contenido de baja calidad.
- **5xx**: errores del servidor; si se repiten, Google reduce el rastreo.

## Sitemap y robots.txt

- El sitemap debe listar solo URLs canónicas, que respondan 200, sin noindex.
- `lastmod` con la fecha real de modificación: si siempre es "hoy", Google lo ignora.
- Genera el sitemap automáticamente desde las páginas reales para que no queden páginas afuera.
- El robots.txt debe incluir la línea `Sitemap:` y no bloquear recursos (CSS, JS) ni secciones que quieres posicionar.

## Renderizado: que el contenido esté en el HTML

Las webs hechas con frameworks de JavaScript (React, Vue, Angular) pueden mostrar el contenido solo después de ejecutar el código en el navegador. Google lo procesa en una segunda etapa, con demoras. Lo más seguro es entregar el HTML completo:

| Técnica | Cómo funciona |
| --- | --- |
| Renderizado en el servidor (SSR) | El servidor genera el HTML en cada pedido (por ejemplo Next.js) |
| Generación estática (SSG) | El HTML se genera al compilar el sitio |
| Prerenderizado | Una herramienta guarda el HTML de cada ruta después de ejecutar la app |

Ver [qué es Next.js](/blog/next-js-que-es-por-que-usarlo-para-tu-pagina-web).

## Velocidad y Core Web Vitals

Las métricas que Google usa para la experiencia de carga son LCP (carga del contenido principal), INP (respuesta a la interacción) y CLS (estabilidad visual). Las mejoras más comunes: imágenes en formatos modernos con tamaño declarado, menos JavaScript en la carga inicial, fuentes optimizadas y un buen hosting con CDN. Ver [qué son las Core Web Vitals](/blog/core-web-vitals-como-optimizar-velocidad-web-posicionamiento-google).

## Datos estructurados

Los datos estructurados (Schema.org en formato JSON-LD) le explican a Google qué es cada página. Los más útiles:

| Tipo | Dónde |
| --- | --- |
| Organization y LocalBusiness | Portada |
| Service | Páginas de servicio |
| Product y Offer | Fichas de producto |
| BlogPosting | Artículos, con autor y fechas |
| BreadcrumbList | Todas las páginas internas |
| FAQPage | Solo donde las preguntas son visibles en la página |

Deben coincidir con lo que se ve en la página; datos estructurados engañosos pueden generar una acción manual.

## Enlaces internos y arquitectura

- Toda página importante debe estar a pocos clics de la portada y enlazada con `<a href>` reales, no solo con botones JavaScript.
- Agrupa el contenido en temas con una página pilar que enlace a los artículos y viceversa.
- Evita páginas huérfanas, que solo aparecen en el sitemap.

## Cómo auditar un sitio paso a paso

1. Revisa el informe "Páginas" de Search Console y anota cada motivo de exclusión.
2. Prueba las variantes de URL (http, sin www, barra final, index.html).
3. Rastrea el sitio con una herramienta de rastreo para encontrar errores, redirecciones y canonical.
4. Revisa el sitemap contra lo que responde cada URL.
5. Mide la velocidad de las plantillas principales en el celular.
6. Valida los datos estructurados de cada tipo de página.
7. Prioriza: primero lo que impide indexar, después lo que impide posicionar.

## Preguntas frecuentes

### ¿Qué es el SEO técnico?

El conjunto de configuraciones que permiten que Google rastree, entienda e indexe correctamente un sitio: URLs, canonical, redirecciones, sitemap, robots.txt, renderizado, velocidad, datos estructurados y enlaces internos.

### ¿Qué es una canonical?

Una etiqueta que indica cuál es la URL principal de una página cuando existen versiones parecidas. Cada página debería declarar su propia URL como canónica.

### ¿Qué es un soft 404?

Una página que no existe pero responde con código 200, por ejemplo mostrando la portada. Google la trata como contenido de baja calidad. Debe responder 404.

### ¿Las webs hechas en React posicionan mal?

No necesariamente. Posicionan bien si el contenido llega en el HTML mediante renderizado en el servidor, generación estática o prerenderizado.

## Auditamos tu SEO técnico

En Websy auditamos y corregimos el SEO técnico de tu sitio, con un script que verifica estado, canonical y redirecciones de cada URL. Mira el servicio de [SEO](/servicios/seo-marketing) o [escríbenos](/contacto).
