Si alguna vez te dijeron que tu sistema necesita "una API" y no entendiste de qué hablaban, esta guía es para vos.

---

## ¿Qué es una API en palabras simples?

Una **API (Application Programming Interface)** es un puente que permite que dos programas de software se comuniquen entre sí. Es como un mozo en un restaurante: vos le decís lo que querés (pedido), el mozo lo lleva a la cocina (servidor) y te trae el plato terminado (respuesta).

---

## ¿Qué es REST?

**REST (Representational State Transfer)** es un conjunto de reglas que define cómo deben comunicarse las APIs. Es el estándar más usado en el mundo web.

---

## Ejemplo Real: API de un E-commerce

Supongamos que tenés una tienda online. Tu API REST podría tener estos endpoints:

| Método | URL | Qué Hace |
| --- | --- | --- |
| GET | /api/productos | Lista todos los productos |
| GET | /api/productos/42 | Devuelve el producto con ID 42 |
| POST | /api/productos | Crea un nuevo producto |
| PUT | /api/productos/42 | Actualiza el producto 42 |
| DELETE | /api/productos/42 | Elimina el producto 42 |

---

## ¿Por qué tu Empresa Necesita APIs?

1. **Integración con Servicios Externos**: Conectar tu sistema con MercadoPago, WhatsApp Business API, Google Maps, AFIP, etc.
2. **App Móvil + Web**: Una sola API sirve datos tanto a tu sitio web como a tu app de celular.
3. **Automatización**: Otros sistemas pueden enviar y recibir datos de tu plataforma de forma programática.

---

En [Websy diseñamos y desarrollamos APIs REST robustas para todo tipo de integraciones](/servicios/desarrollo-web). [Consultá sobre tu integración](/contacto).
