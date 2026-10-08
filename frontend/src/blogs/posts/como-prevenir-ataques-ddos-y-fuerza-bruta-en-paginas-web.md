**Para prevenir ataques DDoS en una web, la medida más efectiva es poner el sitio detrás de un CDN o servicio de protección (como Cloudflare) que absorba y filtre el tráfico malicioso antes de que llegue al servidor, combinado con límites de solicitudes por IP, caché del contenido y un servidor que no exponga su IP real.** Para los ataques de fuerza bruta (probar contraseñas en masa), la defensa es limitar los intentos de inicio de sesión, usar verificación en dos pasos, protección anti-bots y contraseñas robustas.

En esta guía verás cómo funcionan estos ataques, cómo detectarlos, las medidas de prevención por capas y qué hacer si tu web está bajo ataque.

## Qué es un ataque DDoS

Un ataque de denegación de servicio distribuido (DDoS) envía una cantidad enorme de tráfico desde muchas computadoras o dispositivos infectados para saturar un sitio y dejarlo fuera de servicio.

| Tipo | Cómo funciona | Ejemplo |
| --- | --- | --- |
| Volumétrico | Satura el ancho de banda | Inundación de paquetes |
| De protocolo | Agota recursos de red o del servidor | Conexiones a medio abrir |
| De aplicación (capa 7) | Pedidos que parecen legítimos a páginas costosas | Miles de búsquedas o envíos de formularios por segundo |

## Qué es un ataque de fuerza bruta

Programas que prueban miles de combinaciones de usuario y contraseña en el inicio de sesión, o usan listas de contraseñas filtradas de otros sitios (relleno de credenciales).

## Señales de que estás bajo ataque

- La web se vuelve lenta o deja de responder sin un aumento real de clientes.
- Picos de tráfico desde pocos países o redes inusuales.
- Muchos intentos fallidos de inicio de sesión.
- Consumo de recursos del servidor al máximo.
- Formularios llenos de envíos basura.

## Prevención por capas

### Capa 1: red y CDN

- **CDN con protección DDoS** delante del sitio. Ver [qué es un CDN](/blog/cloudflare-vs-cloudfront-cdn-para-acelerar-y-proteger-tu-web).
- **Ocultar la IP real del servidor** y aceptar tráfico solo desde el CDN.
- **Caché** de todo lo que se pueda, para que el servidor reciba menos pedidos.

### Capa 2: aplicación

- **Límites de solicitudes** (rate limiting) por IP y por usuario en endpoints sensibles: inicio de sesión, búsqueda, formularios, API.
- **Protección anti-bots** en formularios (desafíos invisibles o CAPTCHA cuando hay sospecha).
- **Firewall de aplicación web (WAF)** con reglas para patrones de ataque conocidos.

### Capa 3: cuentas

- **Límite de intentos** de inicio de sesión con bloqueo temporal o demora creciente.
- **Verificación en dos pasos** para administradores y, si es posible, para usuarios.
- **Avisos de inicio de sesión** desde dispositivos o lugares nuevos.
- **Contraseñas** robustas y verificación contra listas de contraseñas filtradas.

### Capa 4: monitoreo

- Alertas de caída y de consumo de recursos.
- Registros de intentos fallidos de inicio de sesión.

## Si tu web está bajo ataque

1. **Activa el modo de protección reforzada** de tu CDN (por ejemplo, el modo "bajo ataque" de Cloudflare).
2. **Identifica los patrones**: países, redes, URLs atacadas.
3. **Bloquea o desafía** ese tráfico con reglas de firewall.
4. **Contacta a tu proveedor de hosting** si el ataque llega directo al servidor.
5. **Si fue fuerza bruta exitosa**, cambia contraseñas y revisa accesos.

## Checklist de protección

| Medida | Revisada |
| --- | --- |
| Sitio detrás de un CDN con protección DDoS | |
| IP del servidor oculta y accesible solo desde el CDN | |
| Caché configurada para el contenido público | |
| Límites de solicitudes en inicio de sesión, búsqueda, formularios y API | |
| Protección anti-bots en formularios | |
| Límite de intentos de inicio de sesión con bloqueo temporal | |
| Verificación en dos pasos para administradores | |
| Alertas de caída y de consumo de recursos | |
| Plan escrito de qué hacer durante un ataque | |

## Preguntas frecuentes

### ¿Cómo protejo mi web de un ataque DDoS?

Con un CDN o servicio de protección que filtre el tráfico antes de llegar al servidor, ocultando la IP real del servidor, con caché y límites de solicitudes.

### ¿Qué es un ataque de fuerza bruta?

Un ataque que prueba muchas combinaciones de usuario y contraseña de forma automática para entrar a una cuenta.

### ¿Cloudflare protege de DDoS gratis?

El plan gratuito de Cloudflare incluye protección contra ataques DDoS; los planes pagos suman reglas y funciones avanzadas.

### ¿Una pyme puede sufrir un DDoS?

Sí. Algunos ataques son dirigidos, pero muchos son oportunistas o afectan a sitios compartidos en el mismo servidor.

## Protegemos tu web

En Websy configuramos CDN, firewall, límites de solicitudes y protección de inicio de sesión. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
