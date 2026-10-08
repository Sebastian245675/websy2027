**Headless commerce es una arquitectura de tienda online en la que la parte visible (el frontend: diseño, páginas, experiencia) está separada del motor de comercio (catálogo, carrito, pagos, pedidos), y se comunican por una API.** Por ejemplo, una tienda con el frontend en Next.js y el catálogo y los pedidos en Shopify a través de su Storefront API. Permite diseño totalmente propio, velocidad y libertad para sumar canales, a cambio de más desarrollo y mantenimiento.

En esta guía verás cómo funciona, sus ventajas y desventajas frente a una tienda tradicional, las opciones de motor y de frontend, cuándo conviene y cuándo no, y cómo afecta al SEO.

## Tradicional vs headless

| Aspecto | Tienda tradicional (monolítica) | Headless |
| --- | --- | --- |
| Frontend | Plantillas de la plataforma | Desarrollo propio (Next.js u otro) |
| Motor de comercio | El mismo sistema | Una plataforma o servicio vía API |
| Diseño | Limitado por la plantilla | Libre |
| Velocidad | Depende del tema y las apps | Optimizable al máximo |
| Canales | La tienda web | Web, app, kioscos, otros canales con el mismo motor |
| Desarrollo y mantenimiento | Menor | Mayor |
| Conviene para | La mayoría de las pymes | Marcas con necesidades de experiencia o rendimiento altas |

## Cómo funciona

1. El cliente entra a la web (frontend en Next.js, por ejemplo).
2. El frontend pide productos, precios y stock al motor de comercio por API.
3. El carrito se gestiona contra el motor.
4. El pago se completa en el checkout del motor o integrado.
5. El pedido queda en el motor, que se conecta con stock, logística y facturación.

## Motores de comercio habituales

| Motor | Cómo se usa en headless |
| --- | --- |
| Shopify | Storefront API para catálogo y carrito; checkout de Shopify |
| WooCommerce | API REST o GraphQL sobre WordPress |
| Tiendanube | API para integraciones |
| Medusa, Saleor u otros de código abierto | Motor propio autoalojado |
| Motor a medida | Base de datos y API propias |

## Ventajas

- **Diseño y experiencia propios**, sin las limitaciones de una plantilla.
- **Velocidad**: páginas generadas de forma estática o en el servidor, con muy buenas métricas de carga.
- **SEO controlado**: URLs, contenido y datos estructurados a medida.
- **Varios canales** con un solo catálogo.
- **Libertad para cambiar** el frontend sin tocar el motor, o viceversa.

## Desventajas

- **Más desarrollo inicial** y mantenimiento de dos partes.
- **Algunas funciones de la plataforma** (apps del tema, editores visuales) no se usan directamente en el frontend propio.
- **Requiere un equipo técnico** para cada cambio de diseño importante.

## Cuándo conviene

| Situación | ¿Headless? |
| --- | --- |
| Pyme que empieza | No: plataforma tradicional |
| Marca con diseño y contenido editorial muy cuidados | Sí |
| Tienda con problemas de velocidad que el tema no resuelve | Puede ser |
| Varios canales (web, app, puntos de venta) con un catálogo | Sí |
| Equipo técnico propio o un proveedor estable | Condición necesaria |

## SEO en headless

Bien implementado, el headless puede posicionar muy bien: el contenido llega en el HTML (renderizado en el servidor o estático), las URLs se diseñan a medida y los datos estructurados de producto se generan desde el catálogo. Mal implementado (contenido solo en el navegador, sin redirecciones al migrar), puede perder posicionamiento. Ver [SEO para ecommerce](/blog/seo-para-ecommerce-como-posicionar-fichas-de-producto-en-google) y [qué es Next.js](/blog/next-js-que-es-por-que-usarlo-para-tu-pagina-web).

## Relación con la tienda a medida

Un headless con un motor como Shopify es una opción intermedia entre la plataforma tradicional y una tienda totalmente a medida (motor y frontend propios). La tienda a medida da control total y evita comisiones de plataforma; el headless aprovecha un motor probado. Ver [mejores plataformas de e-commerce](/blog/mejores-plataformas-ecommerce-pymes-latinoamerica).

## Preguntas frecuentes

### ¿Qué es headless commerce?

Una arquitectura en la que el frontend de la tienda está separado del motor de comercio y se comunican por API, lo que permite diseño propio y varios canales con un mismo catálogo.

### ¿Headless es mejor para el SEO?

Puede serlo, si el contenido se entrega en el HTML y se cuidan las URLs y los datos estructurados. La arquitectura por sí sola no garantiza mejor posicionamiento.

### ¿Cuánto cuesta una tienda headless?

Más que una tienda en una plataforma tradicional, porque incluye el desarrollo del frontend y su mantenimiento, además del costo del motor.

### ¿Qué es la Storefront API de Shopify?

La API que permite a un frontend propio consultar productos, colecciones y gestionar el carrito de una tienda Shopify.

## Te ayudamos a decidir la arquitectura

En Websy desarrollamos tiendas a medida y headless con Next.js. Mira la [guía de e-commerce](/blog/guia-ecommerce-como-vender-por-internet-en-latam) o [escríbenos](/contacto).
