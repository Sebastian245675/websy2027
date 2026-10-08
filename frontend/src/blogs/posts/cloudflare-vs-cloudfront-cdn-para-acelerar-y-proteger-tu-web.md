**Un CDN (Content Delivery Network, red de distribución de contenidos) es una red de servidores repartidos por el mundo que guardan copias de tu web (imágenes, estilos, scripts y páginas) y las entregan desde el punto más cercano a cada visitante.** Así la web carga más rápido, el servidor original recibe menos carga y, con proveedores como Cloudflare, también se filtran ataques y tráfico malicioso antes de que lleguen a tu servidor.

En esta guía verás cómo funciona un CDN, qué beneficios da a una empresa, en qué se diferencian Cloudflare y AWS CloudFront, cómo se configura y qué cuidar para no romper nada.

## Cómo funciona un CDN

1. Un visitante de Bogotá abre tu web, alojada en un servidor de Estados Unidos.
2. En lugar de ir hasta Estados Unidos, el pedido llega al nodo del CDN más cercano.
3. Si el nodo tiene una copia (caché) del contenido, la entrega al instante.
4. Si no la tiene, la pide al servidor original, la entrega y la guarda para los siguientes visitantes.

## Beneficios para una empresa

| Beneficio | Qué significa |
| --- | --- |
| Velocidad | Menor tiempo de carga, sobre todo para visitantes lejos del servidor |
| Menos carga en el servidor | Puede atender más tráfico con los mismos recursos |
| Disponibilidad | Puede seguir mostrando contenido en caché si el servidor tiene un problema puntual |
| Seguridad | Filtrado de ataques, firewall de aplicación web y protección contra bots |
| SSL | Certificados gestionados y HTTPS en el borde |
| Optimización | Compresión y, en algunos planes, optimización de imágenes |

## Cloudflare vs AWS CloudFront

| Criterio | Cloudflare | AWS CloudFront |
| --- | --- | --- |
| Enfoque | CDN, DNS y seguridad todo en uno | CDN integrado al ecosistema de AWS |
| Configuración | Simple: se cambian los servidores DNS del dominio | Requiere configurar distribuciones y orígenes en AWS |
| Plan gratuito | Sí, muy usado por pymes | Capa gratuita con límites de uso |
| Protección contra ataques | Incluida en todos los planes, con más funciones en planes pagos | Mediante AWS Shield y AWS WAF |
| DNS | Incluido | Route 53, aparte |
| Ideal para | Sitios y pymes que quieren velocidad y seguridad sin complejidad | Proyectos que ya viven en AWS |

Las funciones por plan cambian; revisa las páginas de cada servicio.

## Cómo se configura (Cloudflare, en simple)

1. Crea la cuenta y agrega tu dominio.
2. Revisa que Cloudflare haya importado bien todos los registros DNS (web, correo, verificaciones).
3. Cambia los servidores de nombres del dominio en tu registrador por los de Cloudflare.
4. Activa HTTPS completo y estricto, con un certificado válido también en tu servidor.
5. Define qué se guarda en caché y qué no (por ejemplo, nunca el panel de administración ni el carrito).
6. Activa las reglas de seguridad básicas y revisa los registros la primera semana.

## Qué cuidar para no romper nada

- **Registros de correo**: si se pierden al migrar el DNS, deja de llegar el correo.
- **Caché de páginas dinámicas**: no guardar en caché páginas con datos de usuarios (carrito, cuenta, panel).
- **Modo SSL**: usar el modo completo y estricto; los modos flexibles generan bucles de redirección o conexiones sin cifrar entre el CDN y el servidor.
- **Purgar la caché** después de publicar cambios importantes.
- **IP real de los visitantes**: configurar el servidor para registrar la IP real y no la del CDN.

## ¿Necesito un CDN?

| Situación | Recomendación |
| --- | --- |
| Sitio en Vercel, Netlify o Cloudflare Pages | Ya incluye una red global |
| WordPress o servidor propio con visitantes de varios países | Sí, mejora velocidad y seguridad |
| Tienda online con picos de tráfico | Sí |
| Sitio que recibe ataques o tráfico de bots | Sí, por la protección |

## Preguntas frecuentes

### ¿Qué es un CDN en palabras simples?

Una red de servidores repartidos por el mundo que guarda copias de tu web y las entrega desde el punto más cercano a cada visitante, para que cargue más rápido y tu servidor reciba menos carga.

### ¿Cloudflare es gratis?

Tiene un plan gratuito con CDN, DNS, SSL y protección básica, suficiente para muchos sitios. Las funciones avanzadas están en planes pagos.

### ¿Un CDN mejora el SEO?

Indirectamente: una web más rápida y estable ofrece mejor experiencia, algo que Google tiene en cuenta.

### ¿Un CDN protege contra ataques DDoS?

Los CDN como Cloudflare absorben y filtran gran parte de ese tráfico antes de que llegue a tu servidor. Ver [cómo prevenir ataques DDoS](/blog/como-prevenir-ataques-ddos-y-fuerza-bruta-en-paginas-web).

## Configuramos tu infraestructura

En Websy configuramos CDN, DNS y SSL como parte del desarrollo web. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
