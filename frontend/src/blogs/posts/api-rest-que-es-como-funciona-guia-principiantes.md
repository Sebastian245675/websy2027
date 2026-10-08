**Una API REST es una forma estándar de que dos sistemas se comuniquen por internet: un sistema pide datos o acciones a una dirección (URL) usando métodos HTTP como GET (consultar), POST (crear), PUT o PATCH (modificar) y DELETE (eliminar), y el otro responde, generalmente en formato JSON.** Es lo que permite, por ejemplo, que tu tienda online cobre con Mercado Pago, que tu web muestre el stock del sistema de gestión o que una app móvil consulte los pedidos.

En esta guía verás qué es una API explicado sin tecnicismos, cómo funciona una API REST con un ejemplo, los métodos y códigos de respuesta, qué es la autenticación, para qué la usa una empresa y buenas prácticas de diseño.

## Qué es una API, con un ejemplo cotidiano

Piensa en un restaurante: tú (el cliente) no entras a la cocina; le pides al mozo lo que quieres según el menú, y él te trae el plato. La API es el mozo y el menú: define qué se puede pedir, cómo pedirlo y qué vas a recibir, sin que necesites saber cómo funciona la cocina por dentro.

## Cómo funciona una API REST

Cada "cosa" del sistema (productos, clientes, pedidos) es un recurso con su URL, y sobre él se hacen operaciones con métodos HTTP:

| Método | Para qué | Ejemplo |
| --- | --- | --- |
| GET | Consultar | GET /productos/123 devuelve el producto 123 |
| POST | Crear | POST /pedidos crea un pedido nuevo |
| PUT o PATCH | Modificar | PATCH /pedidos/45 cambia el estado del pedido 45 |
| DELETE | Eliminar | DELETE /productos/123 elimina el producto |

Una respuesta típica en JSON:

```json
{
  "id": 123,
  "nombre": "Silla ergonómica",
  "precio": 150000,
  "stock": 8
}
```

## Códigos de respuesta

| Código | Significado |
| --- | --- |
| 200 | Correcto |
| 201 | Creado |
| 400 | El pedido tiene datos incorrectos |
| 401 | Falta autenticación |
| 403 | Autenticado, pero sin permiso |
| 404 | El recurso no existe |
| 429 | Demasiados pedidos en poco tiempo |
| 500 | Error del servidor |

## Autenticación

Las APIs piden identificarse para saber quién hace cada pedido y qué puede hacer:

- **Clave de API**: un código que identifica a la aplicación.
- **Tokens** (por ejemplo JWT o los de OAuth): identifican al usuario y vencen.
- **OAuth**: permite autorizar a una aplicación a actuar en tu nombre sin darle tu contraseña (como "Iniciar sesión con Google").

Las claves y tokens nunca deben quedar visibles en el código del navegador ni en repositorios públicos.

## Para qué usa APIs una empresa

| Integración | Ejemplo |
| --- | --- |
| Pagos | La tienda crea un cobro en Mercado Pago o Stripe |
| Facturación | El sistema emite la factura electrónica ante ARCA, DIAN o SAT |
| Mensajería | El sistema envía avisos por WhatsApp Business |
| Envíos | La tienda cotiza el envío con un operador logístico |
| CRM | Los formularios de la web crean contactos |
| Apps | La app móvil consulta los datos del sistema |
| IA | El sistema usa un modelo de lenguaje para clasificar mensajes |

## Buenas prácticas de diseño

- **URLs con sustantivos** (/pedidos) y métodos para las acciones.
- **Versionado** (/v1/) para poder cambiar sin romper integraciones.
- **Paginación** en listados grandes.
- **Mensajes de error claros**.
- **Límites de uso** para proteger el servidor.
- **Documentación** con ejemplos (por ejemplo con OpenAPI).
- **Validación de todos los datos** en el servidor.

## Cómo documentar y probar una API

- **OpenAPI (antes Swagger)**: un formato estándar para describir los endpoints, parámetros y respuestas, del que se genera documentación navegable.
- **Herramientas de prueba** como Postman o Insomnia: permiten hacer pedidos a la API y guardar colecciones de ejemplos.
- **Entorno de prueba (sandbox)**: los servicios serios ofrecen credenciales de prueba para integrar sin afectar datos reales, como hacen Mercado Pago o Stripe.
- **Pruebas automáticas** que verifican que cada endpoint responde lo esperado antes de publicar cambios.

## REST y otras alternativas

REST es el estilo más usado, pero no el único. GraphQL permite pedir exactamente los campos necesarios en una sola consulta, y los webhooks sirven para que un sistema avise a otro cuando ocurre algo. Ver [REST vs GraphQL](/blog/desarrollo-de-apis-rest-graphql-microservicios).

## Preguntas frecuentes

### ¿Qué es una API REST en palabras simples?

Una forma estándar de que dos sistemas se comuniquen por internet: uno pide datos o acciones a una URL con métodos como GET o POST y el otro responde, normalmente en JSON.

### ¿Para qué sirve una API en una empresa?

Para conectar sistemas: cobrar online, facturar automáticamente, enviar mensajes, cotizar envíos, sincronizar el stock o alimentar una app móvil.

### ¿Qué es JSON?

Un formato de texto para intercambiar datos entre sistemas, fácil de leer para personas y máquinas.

### ¿Qué diferencia hay entre una API y un webhook?

Con una API, tu sistema pregunta cuando necesita algo. Con un webhook, el otro sistema te avisa automáticamente cuando ocurre un evento, como un pago aprobado.

## Integramos tus sistemas

En Websy desarrollamos APIs e integraciones con pagos, facturación, WhatsApp y logística. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
