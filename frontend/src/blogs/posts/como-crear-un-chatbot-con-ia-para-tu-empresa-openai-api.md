**Para crear un chatbot con IA para tu empresa necesitas cuatro piezas: un canal (WhatsApp, la web o Instagram), un modelo de lenguaje (por ejemplo de OpenAI, Anthropic o Google), una base de conocimiento con la información de tu negocio para que responda solo con datos reales, y una capa de control que decide cuándo derivar a una persona.** Se puede armar con una plataforma lista o con desarrollo a medida; la diferencia está en cuánto se integra con tus propios sistemas.

En esta guía verás cómo funciona un chatbot con IA por dentro, cómo prepararlo paso a paso, cómo evitar que invente respuestas, cuánto cuesta y cómo medir si funciona.

## Cómo funciona un chatbot con IA

1. **El cliente escribe** en WhatsApp, en el chat de la web o en Instagram.
2. **El sistema busca información relevante** en tu base de conocimiento: catálogo, precios, políticas, preguntas frecuentes.
3. **El modelo de lenguaje recibe** la pregunta, la información encontrada y las instrucciones (tono, límites, qué hacer si no sabe).
4. **El modelo redacta la respuesta** y, si hace falta, pide ejecutar una acción: consultar stock, agendar un turno, crear un contacto en el CRM.
5. **El sistema envía la respuesta** y registra la conversación.
6. **Si el caso lo requiere**, deriva a una persona con el historial.

A la combinación de buscar información y luego generar la respuesta se la llama RAG. La explicamos en detalle en [qué es RAG](/blog/que-es-rag-retrieval-augmented-generation-ia-empresas).

## Plataforma lista o desarrollo a medida

| | Plataforma lista | Desarrollo a medida |
| --- | --- | --- |
| Tiempo de implementación | Días | Semanas |
| Costo inicial | Bajo | Mayor |
| Costo mensual | Abono de la plataforma más consumo | Consumo del modelo e infraestructura |
| Integración con tus sistemas | Limitada a lo que ofrece la plataforma | La que necesites: stock, agenda, CRM, sistema propio |
| Control de los datos | Según la plataforma | Total |
| Conviene cuando | Preguntas frecuentes y derivación | El bot tiene que consultar o escribir en tus sistemas |

## Paso a paso para crear el chatbot

### 1. Define el objetivo y los límites

¿Qué tiene que resolver? Por ejemplo: responder preguntas de productos y envíos, y agendar visitas. ¿Qué no debe hacer? Dar descuentos, hablar de temas legales o médicos, prometer plazos que no controla.

### 2. Arma la base de conocimiento

Reúne la información que usaría una persona del equipo: catálogo con precios, políticas de envío y devolución, horarios, preguntas frecuentes reales con sus respuestas. Cuanto más ordenada y actualizada, mejores respuestas. Esta etapa es la que más define la calidad.

### 3. Escribe las instrucciones del asistente

Son las reglas permanentes: quién es, cómo habla, qué hacer si no encuentra la respuesta, cuándo derivar. Ejemplo:

```text
Eres el asistente de atención de una tienda de muebles de Bogotá.
Responde solo con la información de la base de conocimiento.
Si no encuentras la respuesta, dilo y ofrece hablar con un asesor.
Respuestas cortas, una idea por mensaje, tono cercano.
Nunca ofrezcas descuentos ni confirmes plazos de entrega que no figuren en la información.
```

### 4. Conecta las acciones

Si el bot tiene que agendar, consultar stock o registrar contactos, se le dan "herramientas": funciones que el modelo puede pedir que se ejecuten, con los datos que obtuvo de la conversación. El sistema valida y ejecuta; el modelo nunca accede directo a tu base de datos.

### 5. Conecta el canal

Para WhatsApp se usa la API oficial de WhatsApp Business. Para la web, un widget de chat. Ver [cómo automatizar WhatsApp Business](/blog/automatizacion-whatsapp-negocios-guia-completa).

### 6. Prueba antes de lanzar

Arma una lista de 50 preguntas reales, incluidas las difíciles, las mal escritas y las que el bot no debería responder. Revisa cada respuesta y ajusta la información y las instrucciones.

### 7. Lanza y revisa todas las semanas

Lee conversaciones reales, detecta preguntas sin respuesta y súmalas a la base de conocimiento.

## Ejemplo de conversación

Así se ve una conversación bien resuelta con un asistente de una tienda de muebles:

| Quién | Mensaje | Qué pasa detrás |
| --- | --- | --- |
| Cliente | Hola, ¿tienen el sofá Nilo en gris? | El sistema busca "sofá Nilo" en el catálogo |
| Asistente | Sí, el sofá Nilo está disponible en gris. Cuesta lo que figura en el catálogo y tarda 5 días hábiles en llegar dentro de la ciudad. ¿Quieres que te envíe el enlace para comprarlo? | El precio y el plazo salen del catálogo, no de la memoria del modelo |
| Cliente | ¿Y me lo pueden llevar a otra ciudad? | Busca la política de envíos |
| Asistente | Enviamos a todo el país; el costo depende de la ciudad. ¿A cuál sería? | Pide el dato necesario para cotizar |
| Cliente | ¿Me hacen un descuento si llevo dos? | Pregunta fuera de sus límites |
| Asistente | Eso lo define un asesor. Te paso con una persona del equipo, que ya ve esta conversación. | Deriva con el historial |

Fíjate en tres detalles: confirma lo que entendió, siempre propone un siguiente paso y no responde lo que no le corresponde.

## Cómo evitar que el chatbot invente

- **Responder solo con la información recuperada**: las instrucciones lo exigen y el sistema solo le pasa datos verificados.
- **Permitirle decir "no sé"** y derivar.
- **Separar lo que el modelo redacta de lo que el sistema decide**: precios, stock y disponibilidad salen de tus sistemas, no de la memoria del modelo.
- **Revisar conversaciones** periódicamente.

## Cuánto cuesta un chatbot con IA

- **Consumo del modelo**: se paga por uso (por la cantidad de texto que procesa). Para la mayoría de las pymes es un costo mensual moderado; crece con el volumen de conversaciones.
- **Canal**: WhatsApp cobra por mensaje de plantilla; las respuestas dentro de las 24 horas desde el último mensaje del cliente no tienen ese cargo.
- **Plataforma o infraestructura**: abono de la plataforma o servidor propio.
- **Implementación y mantenimiento**: armado de la base de conocimiento, integraciones y revisión.

En Websy, las automatizaciones con IA arrancan en USD 200 por mes según el volumen y las integraciones.

## Cómo medir si funciona

| Métrica | Qué indica |
| --- | --- |
| Porcentaje de conversaciones resueltas sin una persona | Cuánto trabajo absorbe el bot |
| Tiempo de primera respuesta | Velocidad de atención |
| Derivaciones por "no sé" | Qué información falta cargar |
| Conversiones (ventas, turnos) desde el chat | Impacto en el negocio |
| Calificación de los clientes | Si la experiencia es buena |

## Preguntas frecuentes

### ¿Cómo hacer un chatbot con inteligencia artificial?

Se necesita un canal (WhatsApp o la web), un modelo de lenguaje, una base de conocimiento con la información del negocio y reglas para derivar a una persona. Se arma con una plataforma lista o con desarrollo a medida.

### ¿Puedo entrenar un chatbot con la información de mi empresa?

Sí. En lugar de "entrenar" el modelo, lo habitual es darle acceso a tu información mediante una base de conocimiento (RAG), que se actualiza fácilmente cuando cambian precios o políticas.

### ¿Qué modelo de IA conviene usar?

Los modelos de OpenAI, Anthropic y Google sirven para atención al cliente. La elección depende del costo, la calidad en español, la velocidad y las condiciones de privacidad. Conviene que la integración permita cambiar de modelo.

### ¿El chatbot puede vender?

Puede recomendar productos, responder dudas, enviar el enlace de pago y registrar el pedido. Las negociaciones y los casos especiales conviene derivarlos a una persona.

## Creamos tu chatbot con IA

Diseñamos la base de conocimiento, las integraciones y el canal. Mira la [guía de automatización e IA](/blog/guia-automatizacion-e-inteligencia-artificial-para-empresas), el servicio de [automatizaciones con IA](/servicios/automatizaciones-ia) o [escríbenos](/contacto).
