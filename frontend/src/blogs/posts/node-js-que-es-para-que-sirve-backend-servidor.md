**Node.js es un entorno que permite ejecutar JavaScript fuera del navegador, en un servidor; se usa para construir el backend de webs y apps (APIs, sistemas de gestión, chats, integraciones) con el mismo lenguaje que el frontend.** Su modelo asíncrono lo hace muy eficiente para manejar muchas conexiones simultáneas, como APIs, notificaciones en tiempo real o integraciones que esperan respuestas de otros servicios.

En esta guía verás qué es Node.js en términos simples, cómo funciona, para qué sirve con ejemplos, sus ventajas y límites, cómo se compara con otras opciones de backend y cuándo conviene usarlo.

## Frontend, backend y dónde entra Node.js

| Parte | Qué hace | Tecnologías |
| --- | --- | --- |
| Frontend | Lo que ves y tocas en el navegador o la app | HTML, CSS, JavaScript, React |
| Backend | La lógica, los datos y las integraciones en el servidor | Node.js, Python, PHP, Java, .NET |
| Base de datos | Donde se guardan los datos | PostgreSQL, MySQL, MongoDB |

Antes, JavaScript solo corría en el navegador. Node.js permitió usarlo también en el servidor, así un mismo equipo puede trabajar en las dos partes.

## Cómo funciona

Node.js usa el motor V8 (el de Chrome) y un modelo de entrada y salida no bloqueante: cuando un pedido tiene que esperar (una consulta a la base de datos, una llamada a una API externa), Node.js no se queda parado, atiende otros pedidos y retoma cuando llega la respuesta. Por eso maneja muy bien muchas conexiones simultáneas con pocos recursos.

## Para qué sirve, con ejemplos

| Uso | Ejemplo |
| --- | --- |
| APIs | El backend de una app móvil o de una tienda online |
| Tiempo real | Chats, notificaciones, seguimiento de pedidos en vivo |
| Integraciones | Conectar la tienda con Mercado Pago, la facturación y WhatsApp |
| Sistemas de gestión | El servidor de un CRM o un sistema de stock |
| Herramientas y automatizaciones | Scripts, tareas programadas, bots |
| Renderizado de webs | Next.js usa Node.js para generar las páginas en el servidor |

Por ejemplo, el sistema para farmacias [FarmaDesk](/casos-de-exito/sistema-farmacia-punto-de-venta-inventario-farmadesk) tiene su backend en Node.js con Express y PostgreSQL.

## Ventajas

- **Un solo lenguaje** en frontend y backend (JavaScript o TypeScript).
- **Muy eficiente** para APIs y tiempo real.
- **Ecosistema enorme**: npm tiene paquetes para casi cualquier necesidad.
- **Mucho talento disponible** en Latinoamérica.
- **TypeScript** suma tipos que reducen errores en proyectos grandes.

## Límites

- **Tareas de cálculo intensivo** (procesamiento pesado de imágenes o datos) bloquean el hilo principal; se resuelven con procesos separados o con otros lenguajes para esa parte.
- **Calidad de los paquetes variable**: hay que elegir dependencias mantenidas y revisarlas.
- **Requiere disciplina** en el manejo de errores asíncronos.

## Node.js frente a otras opciones

| Backend | Fortalezas | Conviene para |
| --- | --- | --- |
| Node.js | Tiempo real, APIs, mismo lenguaje que el frontend | Webs, apps, integraciones |
| Python | Datos, IA, scripting | Proyectos con análisis de datos o IA |
| PHP | Muy extendido en hostings, WordPress y Laravel | Sitios y sistemas tradicionales |
| Java / .NET | Ecosistemas corporativos | Grandes empresas con esos estándares |

## Frameworks habituales

- **Express**: minimalista y muy usado.
- **NestJS**: estructurado, con TypeScript, para proyectos grandes.
- **Fastify**: enfocado en rendimiento.
- **Next.js**: para webs con renderizado en el servidor y API en el mismo proyecto. Ver [qué es Next.js](/blog/next-js-que-es-por-que-usarlo-para-tu-pagina-web).

## Cómo se ve un servidor mínimo

Un servidor que responde una lista de productos en formato JSON, con Express:

```javascript
import express from "express";

const app = express();

app.get("/api/productos", async (req, res) => {
  const productos = await db.query("SELECT id, nombre, precio FROM productos");
  res.json(productos.rows);
});

app.listen(3000);
```

En un proyecto real se suman autenticación, validación de datos, manejo de errores, registros y pruebas.

## Dónde se aloja una aplicación Node.js

| Opción | Cuándo conviene |
| --- | --- |
| Funciones serverless (Vercel, Netlify, nubes) | APIs livianas y webs con Next.js |
| Contenedores (Docker) en un servidor o servicio administrado | Sistemas con procesos de larga duración |
| Servidor virtual con un gestor de procesos | Proyectos con requisitos específicos o costo previsible |

## Preguntas frecuentes

### ¿Qué es Node.js en palabras simples?

Un entorno que permite ejecutar JavaScript en un servidor para crear el backend de webs y apps.

### ¿Node.js es un lenguaje de programación?

No. El lenguaje es JavaScript (o TypeScript); Node.js es el entorno que lo ejecuta fuera del navegador.

### ¿Para qué se usa Node.js?

Para APIs, aplicaciones en tiempo real, integraciones entre sistemas, sistemas de gestión y el renderizado de webs en el servidor.

### ¿Node.js sirve para proyectos grandes?

Sí, con buenas prácticas, TypeScript y una arquitectura ordenada. Muchas empresas grandes lo usan en producción.

## Desarrollamos tu backend

En Websy desarrollamos APIs y sistemas con Node.js, TypeScript y PostgreSQL. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
