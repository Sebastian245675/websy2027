Una página web que tarda más de 3 segundos en cargar pierde el **53% de sus visitantes móviles** antes de que vean una sola palabra de tu contenido. Google lo sabe, y por eso usa la velocidad de carga como **factor de ranking SEO directo**.

---

## ¿Cómo medir la velocidad de tu web?

Ingresá a [PageSpeed Insights](https://pagespeed.web.dev/) de Google, pegá tu URL y analizá los resultados. La herramienta evalúa 4 métricas principales (Core Web Vitals):

| Métrica | Qué Mide | Valor Ideal |
| --- | --- | --- |
| **LCP (Largest Contentful Paint)** | Tiempo en mostrar el contenido principal | < 2.5 segundos |
| **FID (First Input Delay)** | Tiempo de respuesta al primer clic | < 100 milisegundos |
| **CLS (Cumulative Layout Shift)** | Estabilidad visual (que no salten elementos) | < 0.1 |
| **INP (Interaction to Next Paint)** | Responsividad general de la página | < 200 milisegundos |

---

## 10 Técnicas para Llegar a 100/100 en PageSpeed

### 1. Convertir imágenes a formato WebP/AVIF
Las imágenes representan el 50% del peso de una web. WebP reduce el tamaño un 30% respecto a JPEG sin perder calidad visible.

### 2. Implementar Lazy Loading
Las imágenes y videos que están "abajo del pliegue" (fuera de la vista inicial) deben cargarse solo cuando el usuario hace scroll hasta ellas.

### 3. Minificar CSS, JavaScript y HTML
Eliminar espacios, comentarios y código muerto reduce el peso de los archivos un 20-40%.

### 4. Usar CDN (Content Delivery Network)
Un CDN como Cloudflare o Vercel Edge Network sirve tu web desde el servidor más cercano al usuario. Si tu servidor está en USA y el usuario en Buenos Aires, sin CDN la latencia es de 200ms. Con CDN, 20ms.

### 5. Code Splitting (División de Código)
No cargues todo el JavaScript de la web al inicio. Dividí el código por rutas: solo carga el JS necesario para la página actual.

### 6. Preload de Recursos Críticos
Usá `<link rel="preload">` para fuentes y CSS críticos que el navegador debe descargar inmediatamente.

### 7. Caché del Navegador
Configurá headers `Cache-Control` para que el navegador guarde recursos estáticos y no los descargue nuevamente en visitas posteriores.

### 8. Eliminar Render-Blocking Resources
Mové el CSS crítico inline y cargá el resto de forma asíncrona.

### 9. Comprimir con Gzip/Brotli
Activá compresión Brotli en tu servidor para reducir el tamaño de transferencia un 70%.

### 10. Optimizar Fuentes Web
Usá `font-display: swap` para que el texto sea visible inmediatamente mientras la fuente personalizada carga en segundo plano.

---

En [Websy optimizamos cada proyecto web para máximo rendimiento en PageSpeed](/servicios/desarrollo-web). [Pedí tu auditoría de velocidad gratuita](/contacto?plan=Auditoría+Gratuita).
