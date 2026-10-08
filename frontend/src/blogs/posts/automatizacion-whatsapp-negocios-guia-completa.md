**Para automatizar WhatsApp Business tienes dos caminos: con la app gratuita puedes configurar mensajes de bienvenida, de ausencia, respuestas rápidas y un catálogo; para responder automáticamente cualquier consulta, integrar el CRM o tener varios agentes en el mismo número necesitas la API oficial de WhatsApp Business (WhatsApp Business Platform), sobre la que se conecta un chatbot o un asistente con inteligencia artificial.** Empieza por la app y pasa a la API cuando el volumen de mensajes supere lo que tu equipo puede responder a tiempo.

En esta guía verás qué se puede automatizar en cada versión, cómo configurarlo paso a paso, cuánto cuesta, qué flujos conviene armar primero y qué errores pueden hacer que Meta bloquee tu número.

## Qué se puede automatizar en WhatsApp

| Automatización | App WhatsApp Business (gratis) | API oficial + chatbot o IA |
| --- | --- | --- |
| Mensaje de bienvenida | Sí | Sí |
| Mensaje de ausencia fuera de horario | Sí | Sí |
| Respuestas rápidas con atajos | Sí (las envía una persona) | Sí (las envía el sistema) |
| Catálogo de productos | Sí | Sí |
| Responder preguntas frecuentes solo | No | Sí |
| Entender audios y mensajes libres | No | Sí, con IA |
| Agendar turnos en tu calendario | No | Sí |
| Registrar cada contacto en el CRM | No | Sí |
| Varios agentes en el mismo número | Limitado a pocos dispositivos | Sí, sin límite práctico |
| Notificaciones (pedido enviado, recordatorio de turno) | Manuales | Automáticas, con plantillas aprobadas por Meta |

## Automatizar con la app gratuita: paso a paso

Si recibes pocas consultas por día, la app alcanza y no cuesta nada. Configura esto desde Herramientas para la empresa:

1. **Perfil de empresa**: dirección, horario, correo, sitio web y una descripción clara de lo que vendes.
2. **Mensaje de bienvenida**: se envía la primera vez que alguien te escribe. Úsalo para decir qué datos necesitas (por ejemplo, "Cuéntanos qué producto buscas y en qué ciudad estás") y tu horario.
3. **Mensaje de ausencia**: fuera del horario de atención, para que el cliente sepa cuándo le vas a responder.
4. **Respuestas rápidas**: textos guardados que insertas con un atajo, como "/precios" o "/envios". Ahorran mucho tiempo en las preguntas que se repiten.
5. **Etiquetas**: "Nuevo", "Presupuesto enviado", "Pagó", "Seguimiento". Te permiten ver en qué etapa está cada cliente.
6. **Catálogo**: productos o servicios con foto y precio, para compartirlos sin escribir cada vez.

El límite de la app es que una persona sigue teniendo que responder cada mensaje.

## Automatizar con la API oficial

La API de WhatsApp Business no es una app que se descarga: es un servicio de Meta que se conecta a un sistema (un chatbot, un CRM, una plataforma de atención). Así funciona:

1. El cliente escribe a tu número de WhatsApp.
2. Meta envía el mensaje a tu sistema.
3. El sistema decide qué hacer: responder con información, hacer preguntas, consultar el stock, agendar un turno o derivar a una persona.
4. La respuesta vuelve al cliente por WhatsApp, desde tu mismo número.

Para conectarte puedes usar la API directamente desde Meta (Cloud API) o a través de un proveedor que la integra con su plataforma. Las diferencias en detalle están en [WhatsApp Business API vs app](/blog/whatsapp-business-api-vs-app-diferencias-como-implementar).

## Los flujos que conviene armar primero

### 1. Preguntas frecuentes

Precios, horarios, medios de pago, zonas de envío, tiempos de entrega. Es lo que más mensajes genera y lo más fácil de automatizar.

### 2. Calificación de la consulta

Antes de pasar el chat a un vendedor, el asistente pregunta lo necesario: qué producto, cantidad, ciudad, presupuesto o fecha. Tu equipo recibe la consulta ya ordenada.

### 3. Turnos y reservas

El cliente elige día y horario entre los disponibles, recibe la confirmación y un recordatorio antes del turno. Reduce las ausencias y las llamadas.

### 4. Seguimiento de presupuestos

Si alguien pidió un presupuesto y no respondió, el sistema le escribe a los pocos días con una plantilla aprobada. Muchas ventas se recuperan solo con ese mensaje.

### 5. Estado del pedido

Para tiendas online: aviso de pago confirmado, pedido despachado y número de seguimiento.

## Chatbot de menú o asistente con IA

| | Chatbot de menú | Asistente con IA |
| --- | --- | --- |
| Cómo funciona | Opciones numeradas ("Escribe 1 para ventas") | Entiende el mensaje como lo escribe el cliente |
| Audios | No | Sí, los transcribe |
| Preguntas fuera del menú | Se traba | Responde si la información está cargada |
| Costo | Menor | Mayor (se paga el consumo del modelo) |
| Conviene cuando | Hay pocas opciones y bien definidas | Las consultas son variadas o llegan muchos audios |

El asistente con IA tiene que responder solo con la información de tu negocio: catálogo, precios, políticas. Para eso se usa una técnica llamada RAG, que explicamos en [qué es RAG](/blog/que-es-rag-retrieval-augmented-generation-ia-empresas). Y siempre debe poder derivar a una persona. Comparamos opciones en [chatbot para WhatsApp](/blog/chatbot-whatsapp-business-automatizar-respuestas-clientes).

## Cuánto cuesta automatizar WhatsApp

- **App WhatsApp Business**: gratis.
- **API oficial**: Meta cobra por mensaje de plantilla entregado (marketing, utilidad o autenticación), con precios que varían según el país del cliente. Las respuestas que envías dentro de las 24 horas desde el último mensaje del cliente (la ventana de servicio) no tienen ese cargo. Revisa la tabla vigente en la documentación de Meta, porque cambia.
- **Plataforma o desarrollo**: el chatbot o asistente, el CRM y la integración. En Websy las automatizaciones con IA arrancan en USD 200 por mes.
- **Modelo de IA**: si usas IA, se paga por uso según la cantidad de mensajes procesados.

## Reglas para no perder tu número

- **Usa la API oficial**. Las extensiones y programas que automatizan la app desde una computadora violan los términos de WhatsApp y pueden hacer que bloqueen el número.
- **Envía mensajes promocionales solo a quien aceptó recibirlos** y usa plantillas aprobadas por Meta.
- **Respeta la ventana de 24 horas**: fuera de ella, solo se pueden enviar plantillas aprobadas.
- **Ofrece siempre una salida a una persona** y una forma de dejar de recibir mensajes.
- **Asistentes con IA, sí; chatbots de uso general, no**: desde enero de 2026 Meta permite asistentes con IA que atienden a los clientes de tu empresa, pero no usar la API para ofrecer un chatbot de inteligencia artificial de propósito general.

## Cómo medir los resultados

Antes de automatizar, anota cuánto tardas en responder, cuántas consultas recibes por día y cuántas terminan en venta. Después compara: tiempo de primera respuesta, porcentaje de consultas resueltas sin una persona, conversión y horas que tu equipo dejó de dedicar a responder lo mismo.

## Preguntas frecuentes

### ¿Cómo automatizar respuestas en WhatsApp Business gratis?

Desde la app WhatsApp Business puedes configurar un mensaje de bienvenida, un mensaje de ausencia, respuestas rápidas con atajos y un catálogo. Es gratis, pero cada respuesta personalizada la sigue enviando una persona.

### ¿Se puede poner un chatbot en WhatsApp?

Sí, a través de la API oficial de WhatsApp Business. El chatbot puede ser de menú o un asistente con inteligencia artificial que entiende mensajes escritos y audios.

### ¿Me pueden bloquear el número por automatizar?

Sí, si usas herramientas no oficiales que automatizan la app o si envías mensajes masivos a quien no te dio permiso. Con la API oficial y plantillas aprobadas no hay riesgo de bloqueo por automatizar.

### ¿Cuánto cobra WhatsApp por usar la API?

Meta cobra por cada mensaje de plantilla entregado, con precios según la categoría (marketing, utilidad, autenticación) y el país del destinatario. Las respuestas dentro de la ventana de 24 horas no tienen ese cargo.

### ¿Puedo seguir usando mi número actual?

Sí, se puede conectar un número existente a la API. Según cómo se haga, el número puede dejar de usarse en la app del teléfono; Meta también ofrece un modo que permite usar la app y la API al mismo tiempo, con algunas limitaciones. Conviene definirlo antes de migrar.

## Automatiza tu WhatsApp con Websy

Configuramos la API oficial de WhatsApp, el asistente con IA y la integración con tu CRM o tu agenda. Mira el servicio de [automatizaciones con IA](/servicios/automatizaciones-ia), la [guía de automatización e inteligencia artificial](/blog/guia-automatizacion-e-inteligencia-artificial-para-empresas) o [escríbenos](/contacto).
