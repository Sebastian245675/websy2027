**Para mejorar la velocidad de carga de una web, lo que más impacto tiene es: optimizar las imágenes (formato WebP o AVIF, tamaño adecuado, carga diferida y dimensiones declaradas), reducir el JavaScript que se carga al inicio (menos plugins, scripts de terceros y librerías), servir el contenido desde un hosting rápido con CDN, optimizar las fuentes y usar caché.** Mide antes y después con PageSpeed Insights y, sobre todo, con los datos reales de usuarios que muestra Search Console.

En esta guía tienes cómo medir correctamente, las 10 optimizaciones ordenadas por impacto, qué hacer en WordPress y en webs modernas, y por qué el puntaje de 100 no debe ser la meta.

## Cómo medir

| Herramienta | Qué muestra | Cuándo usarla |
| --- | --- | --- |
| PageSpeed Insights | Puntaje de laboratorio y datos reales de usuarios (si hay suficientes) | Diagnóstico de una página |
| Search Console, informe de Core Web Vitals | Datos reales agrupados por tipo de página | Seguimiento del sitio completo |
| Herramientas de desarrollador del navegador | Qué recursos se cargan y cuánto pesan | Encontrar los culpables |
| WebPageTest | Pruebas detalladas desde distintas ubicaciones y conexiones | Análisis profundo |

Mide siempre la versión para celular: es la que Google usa y la que ven la mayoría de tus clientes.

## Las 10 optimizaciones con más impacto

| # | Optimización | Qué mejora |
| --- | --- | --- |
| 1 | Imágenes en WebP o AVIF, comprimidas y con el tamaño en que se muestran | Peso total y tiempo de carga |
| 2 | Dimensiones declaradas (width y height) en imágenes y videos | Estabilidad visual (CLS) |
| 3 | Carga diferida de imágenes fuera de la primera pantalla | Carga inicial |
| 4 | La imagen principal (la más grande arriba) sin carga diferida y con prioridad | Tiempo hasta ver el contenido principal (LCP) |
| 5 | Menos JavaScript inicial: quitar plugins y scripts que no se usan | Respuesta a la interacción (INP) |
| 6 | Scripts de terceros (chat, píxeles, mapas) diferidos | Carga e interacción |
| 7 | Fuentes optimizadas: pocas variantes, precargadas, con display swap | Texto visible antes |
| 8 | Hosting rápido y CDN | Tiempo de respuesta del servidor |
| 9 | Caché del navegador y del servidor | Visitas repetidas y carga del servidor |
| 10 | HTML con el contenido (renderizado en el servidor o estático) | Primera carga y SEO |

## WordPress: qué revisar

- Quitar plugins que no se usan y los constructores visuales pesados si no son necesarios.
- Usar un tema liviano.
- Plugin de caché bien configurado.
- Optimización de imágenes al subirlas.
- Hosting administrado para WordPress.

Si después de todo sigue lento, puede convenir migrar. Ver [React vs WordPress](/blog/desarrollo-web-react-vs-wordpress-guia-comparativa).

## Webs modernas (React, Next.js)

- Renderizado en el servidor o generación estática, para no depender de JavaScript para mostrar el contenido.
- Componente de imagen optimizado del framework.
- División del código: cada página carga solo lo que usa.
- Revisar el tamaño de las dependencias.

Ver [qué es Next.js](/blog/next-js-que-es-por-que-usarlo-para-tu-pagina-web).

## El puntaje de 100 no es la meta

El puntaje de PageSpeed es una prueba de laboratorio en condiciones simuladas. Lo que importa para Google y para tus ventas es la experiencia real de los usuarios: que las Core Web Vitals estén en verde en los datos de campo. Una web con 85 puntos y buenas métricas reales está mejor que una con 100 que nadie usa. Ver [qué son las Core Web Vitals](/blog/core-web-vitals-como-optimizar-velocidad-web-posicionamiento-google).

## Por qué la velocidad importa

- **Ventas**: los visitantes abandonan las páginas que tardan en cargar, sobre todo en el celular.
- **SEO**: la experiencia de carga es una de las señales que usa Google.
- **Publicidad**: una página de destino rápida mejora el rendimiento de las campañas.
- **Costos**: una web liviana consume menos recursos del servidor.

## Checklist rápido

| Control | Hecho |
| --- | --- |
| Imágenes en WebP o AVIF y con tamaño adecuado | |
| Width y height en imágenes | |
| Imagen principal sin carga diferida | |
| Scripts de terceros diferidos | |
| Plugins o librerías sin uso eliminados | |
| Fuentes optimizadas | |
| CDN y caché configurados | |
| Core Web Vitals revisadas en Search Console | |

## Preguntas frecuentes

### ¿Cómo hago que mi página web cargue más rápido?

Optimizando imágenes, reduciendo el JavaScript y los scripts de terceros, usando un hosting rápido con CDN, optimizando fuentes y configurando caché.

### ¿Qué velocidad de carga es buena?

Según los umbrales de Google, que el contenido principal se vea en 2,5 segundos o menos (LCP), que la página responda a la interacción en 200 milisegundos o menos (INP) y que no haya saltos visuales (CLS de 0,1 o menos).

### ¿El puntaje de PageSpeed afecta el SEO?

Google usa los datos reales de experiencia de los usuarios, no el puntaje de laboratorio. El puntaje sirve como diagnóstico.

### ¿Por qué mi web es lenta en el celular y rápida en la computadora?

Porque los celulares tienen menos capacidad de procesamiento y conexiones más variables. Hay que optimizar pensando en el celular.

## Webs rápidas desde el inicio

En Websy desarrollamos webs rápidas en celular, con imágenes optimizadas, poco JavaScript y CDN. Mira la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
