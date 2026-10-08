**Las Core Web Vitals son las tres métricas con las que Google mide la experiencia real de carga e interacción de una página: LCP (Largest Contentful Paint), el tiempo hasta que se ve el contenido principal, que debe ser de 2,5 segundos o menos; INP (Interaction to Next Paint), cuánto tarda la página en responder a un clic o toque, que debe ser de 200 milisegundos o menos; y CLS (Cumulative Layout Shift), cuánto se mueven los elementos mientras carga, que debe ser de 0,1 o menos.** Se miden con datos de usuarios reales y forman parte de las señales de experiencia que Google usa para el posicionamiento.

En esta guía verás qué mide cada métrica, cómo consultarlas, qué las empeora y cómo mejorarlas, con un plan de trabajo por prioridad.

## Las tres métricas

| Métrica | Qué mide | Bueno | Necesita mejorar | Malo |
| --- | --- | --- | --- | --- |
| LCP | Tiempo hasta ver el elemento principal | 2,5 s o menos | Entre 2,5 y 4 s | Más de 4 s |
| INP | Demora en responder a las interacciones | 200 ms o menos | Entre 200 y 500 ms | Más de 500 ms |
| CLS | Saltos visuales durante la carga | 0,1 o menos | Entre 0,1 y 0,25 | Más de 0,25 |

INP reemplazó a FID (First Input Delay) como métrica oficial en marzo de 2024. Google evalúa el percentil 75 de las visitas: el 75% de los usuarios tiene que tener una experiencia buena.

## Dónde consultarlas

- **Search Console**, informe de Core Web Vitals: datos reales agrupados por URLs similares, para celular y computadora.
- **PageSpeed Insights**: datos reales de la página (si hay suficiente tráfico) y una prueba de laboratorio con recomendaciones.
- **Herramientas del navegador**: para investigar la causa en detalle.

## LCP: cómo mejorarlo

| Causa | Solución |
| --- | --- |
| Imagen principal pesada | WebP o AVIF, tamaño adecuado, compresión |
| Imagen principal con carga diferida | Quitar la carga diferida y darle prioridad alta |
| Servidor lento | Mejor hosting, caché, CDN |
| Contenido generado solo con JavaScript | Renderizado en el servidor o generación estática |
| Fuentes o CSS que bloquean | Fuentes optimizadas, CSS crítico, menos hojas de estilo |

## INP: cómo mejorarlo

| Causa | Solución |
| --- | --- |
| Mucho JavaScript ejecutándose | Quitar código y librerías innecesarias, dividir el código |
| Scripts de terceros (chats, píxeles, widgets) | Cargarlos diferidos o después de la interacción |
| Tareas largas en el hilo principal | Dividirlas o moverlas fuera del hilo principal |
| Componentes que se vuelven a dibujar de más | Optimizar el renderizado del framework |

## CLS: cómo mejorarlo

| Causa | Solución |
| --- | --- |
| Imágenes y videos sin dimensiones | Declarar width y height o una relación de aspecto |
| Banners o avisos que aparecen arriba del contenido | Reservar su espacio o mostrarlos sin empujar el contenido |
| Fuentes que cambian el tamaño del texto al cargar | Fuentes de respaldo con métricas similares |
| Contenido que se inserta después de cargar | Espacio reservado o carga sin desplazar |

## Plan de trabajo por prioridad

1. **Revisa Search Console** y elige el grupo de URLs con peor resultado y más tráfico.
2. **Analiza una URL representativa** con PageSpeed Insights.
3. **Ataca primero el LCP** (suele ser la imagen principal o el servidor).
4. **Después el CLS** (dimensiones y elementos que se insertan).
5. **Después el INP** (JavaScript y terceros).
6. **Valida la corrección** en Search Console; los datos reales tardan unas semanas en actualizarse.

## ¿Cuánto pesan en el posicionamiento?

Las Core Web Vitals son parte de las señales de experiencia de página. No compensan un contenido que no responde la búsqueda, pero entre páginas con contenido similar, la experiencia puede marcar la diferencia, y siempre afecta las conversiones. Ver la [guía de SEO técnico](/blog/guia-seo-tecnico-para-sitios-web-2026).

## Preguntas frecuentes

### ¿Qué son las Core Web Vitals?

Tres métricas de Google sobre la experiencia real de los usuarios: LCP (carga del contenido principal), INP (respuesta a la interacción) y CLS (estabilidad visual).

### ¿Qué valores son buenos?

LCP de 2,5 segundos o menos, INP de 200 milisegundos o menos y CLS de 0,1 o menos, en el 75% de las visitas.

### ¿Qué pasó con FID?

Fue reemplazado por INP como métrica oficial de interactividad en marzo de 2024.

### ¿Por qué Search Console no muestra datos de mi web?

Porque no tiene suficientes visitas reales de usuarios de Chrome para generar el informe. Mientras tanto, usa las pruebas de laboratorio de PageSpeed Insights.

## Optimizamos tus Core Web Vitals

En Websy desarrollamos y optimizamos webs para que pasen las Core Web Vitals en celular. Mira cómo [mejorar la velocidad de carga](/blog/velocidad-de-carga-web-como-optimizar-pagespeed-100), la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
