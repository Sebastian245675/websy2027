**Para migrar de WordPress a Next.js sin perder posicionamiento: haz un inventario de todas las URLs con tráfico, decide dónde va a vivir el contenido (un CMS headless, el propio WordPress como backend o archivos), reconstruye el diseño y las plantillas en Next.js, migra el contenido con sus títulos y descripciones, mantén las mismas URLs o redirige cada una con 301, verifica datos estructurados y velocidad, y monitorea Search Console después del cambio.** El resultado suele ser un sitio más rápido y seguro, con el mismo posicionamiento o mejor.

En esta guía tienes cuándo conviene migrar, las tres arquitecturas posibles, el proceso paso a paso, el checklist de SEO y los errores que hacen perder tráfico.

## Cuándo conviene migrar

| Señal | ¿Migrar? |
| --- | --- |
| La web es lenta aunque optimizaste plugins y hosting | Sí |
| Problemas de seguridad recurrentes | Sí |
| Necesitas funciones a medida que los plugins no resuelven bien | Sí |
| Diseño muy limitado por el tema | Sí |
| Publicas a diario con varias personas y el sitio funciona bien | Evaluar: quizás alcanza con optimizar |
| Presupuesto muy ajustado y el sitio cumple | No por ahora |

## Tres arquitecturas posibles

| Opción | Cómo funciona | Conviene si |
| --- | --- | --- |
| WordPress headless | El contenido se sigue editando en WordPress; Next.js lo lee por su API y lo muestra | El equipo está acostumbrado al panel de WordPress |
| CMS headless nuevo | El contenido pasa a un CMS como Sanity, Strapi o Contentful | Quieres dejar WordPress por completo |
| Contenido en archivos (Markdown) | El contenido vive en el repositorio | Sitios con poco contenido o editado por el equipo técnico |

Ver [qué es un headless CMS](/blog/desarrollo-web-jamstack-headless-cms-nextjs).

## Proceso paso a paso

### 1. Inventario

Lista todas las URLs desde el sitemap, Search Console (páginas con impresiones) y Analytics (páginas con visitas). Anota para cada una su título, descripción, H1 y si recibe enlaces externos.

### 2. Estructura nueva

Decide qué páginas se mantienen, cuáles se unifican y cuáles se eliminan. Es la oportunidad de ordenar: una página por servicio, sin duplicados.

### 3. Diseño y desarrollo

Reconstruye el diseño en Next.js con componentes reutilizables. Define plantillas para cada tipo de página (servicio, entrada del blog, categoría).

### 4. Migración del contenido

Exporta el contenido de WordPress (por su API o exportación) y llévalo al destino elegido, con imágenes, títulos, descripciones y categorías.

### 5. URLs y redirecciones

Lo ideal es mantener las mismas URLs. Si cambian (por ejemplo, WordPress usaba fechas en la URL), arma un mapa de redirecciones 301 de cada URL vieja a la nueva, sin cadenas.

| URL en WordPress | URL nueva |
| --- | --- |
| /2024/03/como-elegir-proveedor/ | /blog/como-elegir-proveedor |
| /category/servicios/ | /servicios |
| /?p=123 | La URL nueva del contenido |

### 6. SEO técnico

Títulos y descripciones migrados, canonical propias, datos estructurados, sitemap automático, robots.txt y contenido en el HTML (generación estática o renderizado en el servidor).

### 7. Pruebas y lanzamiento

Prueba en un dominio de prueba bloqueado para buscadores, verifica redirecciones y velocidad, y publica en un momento de bajo tráfico. Envía el sitemap nuevo en Search Console.

### 8. Monitoreo

Revisa durante las semanas siguientes: errores 404, páginas no indexadas, posiciones y clics de las páginas principales.

## Checklist de SEO para la migración

| Control | Hecho |
| --- | --- |
| Inventario de URLs con tráfico y enlaces | |
| Títulos, descripciones y H1 migrados | |
| Redirecciones 301 de cada URL que cambia | |
| Sin cadenas de redirecciones | |
| Canonical autorreferentes | |
| Datos estructurados equivalentes o mejores | |
| Sitemap nuevo enviado | |
| Imágenes con texto alternativo | |
| Velocidad igual o mejor | |
| Bloqueo a buscadores quitado al lanzar | |

## Errores que hacen perder tráfico

- Redirigir todo a la portada.
- Cambiar URLs, contenidos y estructura a la vez sin plan.
- Perder los títulos y descripciones que ya posicionaban.
- Dejar páginas importantes sin contenido en el HTML.
- No monitorear después del lanzamiento.

## Preguntas frecuentes

### ¿Pierdo el SEO si migro de WordPress a Next.js?

No, si mantienes las URLs o las rediriges con 301, conservas el contenido que posiciona y cuidas el SEO técnico. Muchas veces el posicionamiento mejora por la velocidad.

### ¿Puedo seguir usando el panel de WordPress?

Sí, con WordPress headless: editas en WordPress y Next.js muestra el contenido.

### ¿Cuánto tarda una migración?

Depende de la cantidad de páginas y funciones. Un sitio institucional con blog lleva algunas semanas, incluyendo diseño, migración y pruebas.

### ¿Qué pasa con los plugins?

Las funciones que daban los plugins (formularios, SEO, galerías) se resuelven en el código de Next.js o con servicios externos.

## Migramos tu web

En Websy migramos sitios de WordPress a Next.js con el mapa de redirecciones y el monitoreo posterior. Mira [React vs WordPress](/blog/desarrollo-web-react-vs-wordpress-guia-comparativa), la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
