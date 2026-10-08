**Para integrar la API de OpenAI en tu sistema o tu web necesitas una cuenta de desarrollador en la plataforma de OpenAI, una clave de API guardada en tu servidor (nunca en el código del navegador), el SDK oficial o llamadas HTTP desde tu backend, y un diseño que controle costos, errores y privacidad.** Con eso puedes sumar a cualquier aplicación funciones de redacción, resumen, clasificación, extracción de datos o asistentes conversacionales.

Esta guía es para equipos técnicos y responsables de producto: cómo se estructura la integración, un ejemplo mínimo en Node.js, cómo pedir respuestas en formato estructurado, cómo conectar funciones de tu sistema y qué cuidar en producción.

## Arquitectura recomendada

La regla principal: **el navegador o la app nunca hablan directo con OpenAI**. El flujo correcto es:

1. El usuario hace una acción en tu web o tu app.
2. Tu frontend llama a tu propio backend.
3. El backend valida al usuario, arma la instrucción con los datos necesarios y llama a la API de OpenAI con la clave guardada en variables de entorno.
4. El backend valida la respuesta, la guarda si corresponde y la devuelve al frontend.

Así la clave no queda expuesta, puedes limitar cuánto usa cada usuario y controlas qué datos se envían.

## Ejemplo mínimo en Node.js

Con el SDK oficial (`npm install openai`) y la clave en la variable de entorno `OPENAI_API_KEY`:

```javascript
import OpenAI from "openai";

const client = new OpenAI(); // lee OPENAI_API_KEY del entorno

export async function resumirConsulta(texto) {
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL, // definir el modelo por configuración, no en el código
    instructions: "Resume la consulta del cliente en una línea y detecta el producto que busca.",
    input: texto,
  });
  return response.output_text;
}
```

Definir el modelo por configuración permite cambiarlo sin tocar el código cuando OpenAI publica versiones nuevas o cambian los precios.

## Respuestas en formato estructurado

Para usar la respuesta dentro de tu sistema (por ejemplo, guardar campos en el CRM), conviene pedirla en JSON con un esquema definido. La API permite indicar un esquema para que la respuesta lo respete, lo que evita tener que interpretar texto libre:

| Caso | Campos del esquema |
| --- | --- |
| Clasificar una consulta | categoría, urgencia, producto, requiere_humano |
| Extraer datos de una factura | proveedor, fecha, número, total, impuestos |
| Calificar un cliente potencial | presupuesto, plazo, ciudad, interés |

Valida siempre el JSON recibido antes de guardarlo.

## Conectar funciones de tu sistema

Cuando el modelo necesita datos o acciones de tu sistema (consultar stock, buscar un pedido, agendar un turno), se le describen "herramientas" o funciones con sus parámetros. El modelo responde indicando qué función quiere usar y con qué datos; tu backend la ejecuta, verifica permisos y le devuelve el resultado para que redacte la respuesta final. El modelo nunca ejecuta nada por sí mismo: tu código decide.

## Responder con la información de tu empresa

El modelo no conoce tus precios ni tus políticas. Para que responda con esos datos, tu backend busca la información relevante (en tu base de datos o en una base vectorial) y la incluye en la llamada. Esa técnica, RAG, está explicada en [qué es RAG](/blog/que-es-rag-retrieval-augmented-generation-ia-empresas).

## Costos y cómo controlarlos

La API se cobra por uso, según la cantidad de texto procesado (tokens) de entrada y de salida, con precios distintos por modelo. Para controlar el gasto:

- **Elige el modelo según la tarea**: los modelos más chicos suelen alcanzar para clasificar o extraer datos.
- **Envía solo el contexto necesario**: no todo el historial ni todo el catálogo en cada llamada.
- **Pon límites**: máximo de llamadas por usuario y por día, y alertas de consumo en el panel de OpenAI.
- **Guarda en caché** respuestas a preguntas idénticas.

## Buenas prácticas para producción

- **Clave en variables de entorno**, rotada si se filtra.
- **Reintentos con espera** ante errores temporales o límites de uso.
- **Tiempo máximo de respuesta** y un mensaje alternativo si la API no responde.
- **Registro de llamadas** (sin datos personales innecesarios) para depurar y medir costos.
- **Revisión humana** en tareas de alto impacto.
- **Privacidad**: revisa las condiciones de uso de datos de la API y cumple la ley de protección de datos de tu país antes de enviar información de clientes.

## Ideas de integración

| Sistema | Integración |
| --- | --- |
| CRM | Resumir conversaciones y sugerir el próximo paso con cada cliente |
| Tienda online | Generar descripciones de productos a partir de sus características |
| Sistema de gestión | Extraer datos de facturas de proveedores |
| Atención | Clasificar y derivar correos o mensajes entrantes |
| Web | Asistente que responde con la información del sitio |

## Preguntas frecuentes

### ¿Cómo integrar ChatGPT en mi página web?

No se integra la app de ChatGPT, sino la API de OpenAI: tu web llama a tu backend, que llama a la API con la clave guardada en el servidor y devuelve la respuesta. Así la clave no queda expuesta.

### ¿Cuánto cuesta usar la API de OpenAI?

Se paga por uso, según la cantidad de texto que entra y sale de cada llamada y el modelo elegido. Los precios vigentes están en la página de precios de OpenAI.

### ¿Puedo usar la API con datos de mis clientes?

Sí, pero revisa las condiciones de uso de datos del servicio, envía solo lo necesario y cumple la ley de protección de datos de tu país.

### ¿Qué lenguaje de programación necesito?

OpenAI tiene SDK oficiales para JavaScript/TypeScript y Python, y la API se puede usar por HTTP desde cualquier lenguaje.

## Integramos la IA en tu sistema

En Websy integramos modelos de lenguaje en sistemas de gestión, tiendas y webs, con control de costos y privacidad. Mira la [guía de automatización e IA](/blog/guia-automatizacion-e-inteligencia-artificial-para-empresas), el servicio de [automatizaciones con IA](/servicios/automatizaciones-ia) o [escríbenos](/contacto).
