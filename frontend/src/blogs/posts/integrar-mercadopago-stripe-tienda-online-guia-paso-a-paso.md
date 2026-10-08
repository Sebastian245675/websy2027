**Para integrar Mercado Pago en una tienda online tienes dos caminos: Checkout Pro, donde el cliente paga en una página de Mercado Pago a la que lo rediriges con una "preferencia de pago" creada desde tu servidor, y Checkout API o Bricks, donde el formulario de pago queda dentro de tu sitio.** En ambos casos, el pago se confirma en tu servidor con notificaciones (webhooks) y recién ahí se marca el pedido como pagado, se descuenta el stock y se emite la factura.

Esta guía explica las opciones de integración, el flujo completo paso a paso, cómo probar con credenciales de prueba, cómo manejar los estados del pago y los errores más comunes. Sirve tanto para equipos técnicos como para quien necesita entender qué pedirle a su desarrollador. Al final hay notas para integrar Stripe con el mismo enfoque.

## Opciones de integración

| Opción | Cómo funciona | Ventajas | Desventajas |
| --- | --- | --- | --- |
| Plugin de tu plataforma (Tiendanube, Shopify, WooCommerce) | Se activa desde el panel | Sin desarrollo | Poca personalización |
| Checkout Pro | Redirige a una página de Mercado Pago | Rápido de integrar, el comprador ve un entorno conocido | El cliente sale de tu sitio |
| Checkout API / Bricks | Formulario de pago dentro de tu sitio | Experiencia integrada y personalizable | Más desarrollo y más responsabilidad de seguridad |
| Link de pago | Un enlace generado por pedido | Ideal para ventas por WhatsApp o redes | No es una integración de tienda |

## Flujo con Checkout Pro paso a paso

1. **Crea una aplicación** en el panel de desarrolladores de Mercado Pago y obtén las credenciales (de prueba y de producción).
2. **El cliente confirma el carrito** en tu tienda.
3. **Tu servidor crea una preferencia de pago** con los productos, cantidades, precios, datos del comprador, las URL de retorno (pago aprobado, pendiente, fallido) y la URL de notificación.
4. **Rediriges al cliente** al enlace de pago de la preferencia.
5. **El cliente paga** con el medio que elija.
6. **Mercado Pago avisa a tu servidor** mediante la notificación con el identificador del pago.
7. **Tu servidor consulta el pago** a la API para confirmar su estado real.
8. **Actualizas el pedido**: si está aprobado, descuentas stock, emites la factura y envías la confirmación al cliente.

El paso 7 es clave: nunca confíes solo en que el navegador volvió a la página de "pago aprobado"; confirma siempre con la API.

## Estados del pago y qué hacer

| Estado | Qué significa | Qué hacer con el pedido |
| --- | --- | --- |
| Aprobado | El pago se acreditó | Confirmar, descontar stock, facturar, enviar |
| Pendiente o en proceso | Medio que se paga después o pago en revisión | Reservar el stock y esperar la notificación |
| Rechazado | La tarjeta o el pago fueron rechazados | Ofrecer reintentar con otro medio |
| Cancelado o vencido | No se completó a tiempo | Liberar el stock |
| Reembolsado o contracargo | Se devolvió el dinero | Registrar y, si corresponde, emitir nota de crédito |

## Pruebas antes de publicar

- Usa las **credenciales de prueba** y los **usuarios de prueba** que ofrece Mercado Pago.
- Prueba con las **tarjetas de prueba** para simular pagos aprobados y rechazados.
- Verifica que las **notificaciones lleguen** a tu servidor y se procesen una sola vez aunque lleguen repetidas.
- Haz una **compra real de bajo monto** en producción antes de abrir la tienda.

## Buenas prácticas

- **Credenciales en el servidor**, nunca en el código del navegador (excepto la clave pública cuando el método lo requiere).
- **Procesar notificaciones de forma idempotente**: la misma notificación puede llegar varias veces.
- **Guardar el identificador del pago** asociado al pedido.
- **Reservar stock** mientras el pago está pendiente para no vender dos veces la misma unidad.
- **Conciliar** pagos, pedidos y facturas periódicamente.
- **Mostrar las cuotas** disponibles en la ficha del producto.

## Integrar Stripe con el mismo enfoque

Stripe sigue una lógica parecida: tu servidor crea una sesión de pago (Checkout Session) o un intento de pago (PaymentIntent), el cliente paga en la página de Stripe o en un formulario integrado, y Stripe notifica a tu servidor por webhook (por ejemplo, el evento de pago completado). Las mismas reglas aplican: confirmar en el servidor, idempotencia y conciliación. Ver cuándo conviene cada una en [Stripe vs Mercado Pago](/blog/stripe-vs-mercadopago-cual-pasarela-pagos-elegir-ecommerce).

## Errores comunes

- **Marcar el pedido como pagado** al volver del checkout sin consultar la API.
- **No procesar los pagos pendientes**: se pierden ventas de medios que se acreditan después.
- **Procesar dos veces la misma notificación**: doble descuento de stock o doble factura.
- **Precios calculados en el navegador**: el precio siempre lo define el servidor.
- **No probar los rechazos**: el cliente no sabe qué hacer y abandona.

## Preguntas frecuentes

### ¿Cómo integrar Mercado Pago en mi tienda online?

Con el plugin de tu plataforma si usas Tiendanube, Shopify o WooCommerce; o, en una tienda a medida, creando preferencias de pago desde tu servidor (Checkout Pro) o integrando el formulario en tu sitio (Checkout API o Bricks), y confirmando cada pago con notificaciones.

### ¿Qué diferencia hay entre Checkout Pro y Checkout API?

En Checkout Pro el cliente paga en una página de Mercado Pago; con Checkout API o Bricks, el formulario queda dentro de tu sitio, con más personalización y más desarrollo.

### ¿Cómo sé si un pago se aprobó?

Por la notificación que Mercado Pago envía a tu servidor y consultando el estado del pago en la API, no solo por la página de retorno del navegador.

### ¿Puedo probar sin cobrar de verdad?

Sí, con las credenciales, usuarios y tarjetas de prueba de Mercado Pago.

## Integramos tus pagos

En Websy integramos Mercado Pago y Stripe en tiendas y sistemas, con stock y facturación conectados. Mira la [guía de e-commerce](/blog/guia-ecommerce-como-vender-por-internet-en-latam), el servicio de [tiendas online](/servicios/ecommerce) o [escríbenos](/contacto).
