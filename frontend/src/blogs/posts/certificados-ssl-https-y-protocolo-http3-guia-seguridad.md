**HTTP/3 es la versión más reciente del protocolo con el que los navegadores piden las páginas a los servidores. A diferencia de HTTP/1.1 y HTTP/2, que funcionan sobre TCP, HTTP/3 funciona sobre QUIC, un protocolo basado en UDP que establece la conexión más rápido, maneja mejor las redes inestables (como datos móviles) y lleva el cifrado TLS 1.3 integrado.** En la práctica, la web carga más rápido en celulares y conexiones con pérdidas, sin cambiar nada del código del sitio.

En esta guía verás cómo evolucionó HTTP, qué mejora concretamente HTTP/3, su relación con TLS 1.3, cómo activarlo y cómo verificar que tu web lo usa.

## De HTTP/1.1 a HTTP/3

| Versión | Transporte | Característica principal | Limitación |
| --- | --- | --- | --- |
| HTTP/1.1 | TCP | Una petición a la vez por conexión | Muchas conexiones para cargar una página |
| HTTP/2 | TCP | Varias peticiones en paralelo por una conexión (multiplexación) | Si se pierde un paquete, se frena todo lo que viaja por esa conexión |
| HTTP/3 | QUIC (sobre UDP) | Multiplexación sin ese bloqueo y conexión más rápida | Algunas redes corporativas bloquean UDP (el navegador vuelve a HTTP/2) |

## Qué mejora HTTP/3

- **Conexión más rápida**: QUIC combina el establecimiento de la conexión y el cifrado, con menos idas y vueltas que TCP más TLS.
- **Sin bloqueo por paquetes perdidos**: cada recurso viaja por su propio flujo; una pérdida no frena a los demás.
- **Cambio de red sin cortar**: si el teléfono pasa de Wi-Fi a datos móviles, la conexión puede continuar.
- **Cifrado obligatorio**: siempre usa TLS 1.3.

El beneficio es mayor en celulares, conexiones lentas o con pérdidas, y para visitantes lejos del servidor: un escenario muy común en Latinoamérica.

## TLS 1.3: el cifrado de HTTP/3

TLS 1.3 es la versión actual del protocolo de cifrado de las conexiones HTTPS. Respecto de versiones anteriores, elimina algoritmos inseguros y reduce el tiempo para establecer una conexión segura. HTTP/3 lo usa siempre; para HTTP/2 y HTTP/1.1 conviene tenerlo activado y desactivar versiones viejas (TLS 1.0 y 1.1). Ver [qué es un certificado SSL](/blog/certificado-ssl-https-que-es-por-que-es-obligatorio-web).

## Cómo activar HTTP/3

| Dónde está tu web | Cómo activarlo |
| --- | --- |
| Detrás de Cloudflare u otros CDN | Una opción en el panel; muchos lo traen activado |
| Vercel, Netlify y plataformas similares | Generalmente ya disponible |
| Servidor propio con Nginx | Versiones recientes lo soportan con la configuración de QUIC y el puerto UDP 443 abierto |
| Hosting compartido | Depende del proveedor; consulta si lo ofrece |

El navegador descubre que el servidor soporta HTTP/3 mediante una cabecera (Alt-Svc) o registros DNS, y lo usa en las siguientes conexiones. Si algo falla, vuelve automáticamente a HTTP/2.

## Cómo verificar que tu web usa HTTP/3

1. Abre las herramientas de desarrollador del navegador (pestaña Red).
2. Activa la columna "Protocolo".
3. Recarga la página: los recursos servidos por HTTP/3 aparecen como "h3".

También hay verificadores en línea que prueban el soporte de HTTP/3 de un dominio.

## ¿Mejora el SEO?

Google no usa la versión de HTTP como factor directo, pero sí la experiencia de carga (Core Web Vitals). Si HTTP/3 mejora la velocidad real de tus usuarios, eso suma. Ver [qué son las Core Web Vitals](/blog/core-web-vitals-como-optimizar-velocidad-web-posicionamiento-google).

## Mitos y dudas frecuentes

| Afirmación | Realidad |
| --- | --- |
| "HTTP/3 reemplaza a HTTPS" | HTTP/3 es HTTPS: siempre va cifrado con TLS 1.3 |
| "Hay que reescribir la web" | No, se activa en el servidor o el CDN |
| "Si lo activo, algunos usuarios no van a poder entrar" | Si un navegador o una red no lo soporta, se usa HTTP/2 automáticamente |
| "Solo sirve para sitios enormes" | El beneficio se nota sobre todo en celulares y redes lentas, algo frecuente en cualquier sitio |
| "Mejora el posicionamiento por sí solo" | Ayuda si mejora la velocidad real; no es un factor directo |

## Preguntas frecuentes

### ¿Qué es HTTP/3?

La versión más reciente del protocolo de la web, que funciona sobre QUIC en lugar de TCP, con conexiones más rápidas, mejor desempeño en redes inestables y cifrado TLS 1.3 integrado.

### ¿Tengo que cambiar mi web para usar HTTP/3?

No. Se activa en el servidor o en el CDN; el código del sitio no cambia.

### ¿Todos los navegadores soportan HTTP/3?

Los navegadores modernos principales sí. Si un navegador o una red no lo soporta, la conexión usa HTTP/2 automáticamente.

### ¿HTTP/3 es más seguro?

Usa siempre TLS 1.3 y cifra más información de la conexión, por lo que mantiene un nivel de seguridad alto por diseño.

## Webs rápidas y seguras

En Websy publicamos los sitios en infraestructura con HTTP/3, TLS 1.3 y CDN. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
