**La app WhatsApp Business es gratuita y se usa desde el celular para atender a mano, con algunas automatizaciones básicas; la WhatsApp Business API (WhatsApp Business Platform) es un servicio de Meta que se conecta a un sistema y permite chatbots, varios agentes en el mismo número, integración con CRM y notificaciones automáticas, con cobro por mensaje de plantilla.** La app alcanza mientras una o dos personas pueden responder todo a tiempo; la API conviene cuando el volumen crece o necesitas automatizar.

En esta guía comparamos las dos versiones punto por punto, explicamos cómo cobra Meta la API, cómo se implementa paso a paso y cómo decidir cuál necesita tu empresa.

## Comparativa: app vs API

| Característica | App WhatsApp Business | WhatsApp Business API |
| --- | --- | --- |
| Costo | Gratis | Cobro por mensaje de plantilla, más la plataforma |
| Cómo se usa | App en el teléfono y dispositivos vinculados | A través de un sistema o plataforma |
| Personas atendiendo | Unas pocas, en dispositivos vinculados | Equipos completos en la misma línea |
| Chatbot | No | Sí |
| Asistente con IA | No | Sí |
| Integración con CRM, tienda o agenda | No | Sí |
| Mensajes iniciados por la empresa | Manuales | Con plantillas aprobadas por Meta |
| Mensaje de bienvenida y de ausencia | Sí | Sí |
| Catálogo | Sí | Sí |
| Verificación de la cuenta | No | Posible, según requisitos de Meta |
| Métricas | Básicas | Completas desde la plataforma |

## La app WhatsApp Business

Es la versión para pequeños negocios que se descarga desde Google Play o App Store. Permite:

- Perfil de empresa con dirección, horario, correo y web.
- Catálogo de productos o servicios.
- Mensaje de bienvenida y de ausencia automáticos.
- Respuestas rápidas con atajos.
- Etiquetas para ordenar los chats.
- Usarla en el teléfono y en algunos dispositivos vinculados.

Su límite es que cada respuesta la envía una persona y no se conecta con otros sistemas. El paso a paso para sacarle el máximo está en [cómo automatizar WhatsApp Business](/blog/automatizacion-whatsapp-negocios-guia-completa).

## La API de WhatsApp Business

La API no es una app: es el acceso programático que Meta da a las empresas para que sus sistemas envíen y reciban mensajes. Con ella se arman chatbots, asistentes con IA, bandejas compartidas para equipos de ventas o soporte y notificaciones automáticas (confirmación de pedido, recordatorio de turno, código de verificación).

### Cómo se accede

- **Cloud API de Meta**: acceso directo, alojado por Meta. Se configura desde una cuenta de Meta Business.
- **Proveedor de soluciones (BSP)**: empresas que integran la API en su plataforma y suman bandeja de agentes, chatbots y soporte. Cobran su servicio además de lo que cobra Meta.

### Cómo cobra Meta

Meta cobra por cada mensaje de plantilla entregado. Las plantillas se clasifican en marketing (promociones), utilidad (confirmaciones y avisos de un pedido o turno) y autenticación (códigos de verificación), y cada categoría tiene un precio según el país del destinatario. Las respuestas que la empresa envía dentro de las 24 horas desde el último mensaje del cliente, en la llamada ventana de servicio, no tienen ese cargo. Los precios se actualizan periódicamente: consulta la tabla vigente en la documentación de Meta antes de presupuestar.

### Reglas que conviene conocer

- Fuera de la ventana de 24 horas solo se pueden enviar plantillas aprobadas por Meta.
- Los mensajes de marketing requieren que el cliente haya aceptado recibirlos.
- La calidad del número depende de cómo reaccionan los usuarios: muchos bloqueos o denuncias limitan los envíos.
- Desde enero de 2026, Meta permite asistentes con IA que atienden a los clientes de la empresa, pero no usar la API para ofrecer un chatbot de inteligencia artificial de uso general.

## Cuál necesita tu empresa

| Situación | Recomendación |
| --- | --- |
| Pocas consultas por día y una persona responde todo | App gratuita |
| Las consultas se acumulan y se responden tarde | API con chatbot o asistente con IA |
| Varios vendedores atienden desde un mismo número | API con bandeja compartida |
| Necesitas avisos automáticos de pedidos o turnos | API con plantillas de utilidad |
| Quieres registrar cada consulta en un CRM | API integrada con el CRM |
| Vendes por WhatsApp y quieres medir conversiones | API con métricas |

## Cómo implementar la API paso a paso

1. **Crea o verifica tu cuenta de Meta Business** con los datos de la empresa.
2. **Elige el número**: puede ser uno nuevo o el actual. Si ya usas ese número en la app, define cómo se va a migrar (Meta ofrece un modo para usar la app y la API al mismo tiempo, con limitaciones).
3. **Elige el acceso**: Cloud API directa o un proveedor con plataforma.
4. **Configura el perfil**: nombre visible, foto, descripción, horario.
5. **Crea las plantillas** que vas a necesitar (confirmaciones, recordatorios, seguimiento) y envíalas a aprobación.
6. **Conecta el sistema**: chatbot, asistente con IA, CRM o agenda.
7. **Prueba y lanza**: primero con el equipo, después con clientes.

## Errores frecuentes

- **Usar herramientas no oficiales** que automatizan la app: pueden hacer que bloqueen el número.
- **Enviar promociones masivas sin permiso**: baja la calidad del número y limita los envíos.
- **No prever el costo de las plantillas** en campañas grandes.
- **Migrar el número sin planificar**: define antes quién va a responder y desde dónde.

## Preguntas frecuentes

### ¿Cuál es la diferencia entre WhatsApp Business y la API?

La app es gratuita y se usa desde el teléfono para atender a mano. La API se conecta a un sistema y permite chatbots, varios agentes, integración con CRM y notificaciones automáticas, con cobro por mensaje de plantilla.

### ¿La API de WhatsApp es gratis?

No del todo. Responder dentro de las 24 horas desde el último mensaje del cliente no tiene el cargo de Meta, pero los mensajes de plantilla (marketing, utilidad, autenticación) se cobran por mensaje entregado. Además, se paga la plataforma o el desarrollo que la usa.

### ¿Puedo usar mi número actual en la API?

Sí. Según la forma de migración, el número puede dejar de usarse en la app o funcionar en las dos con algunas limitaciones.

### ¿Cuántas personas pueden atender con la API?

Con una plataforma de bandeja compartida, todo el equipo puede atender desde el mismo número, con asignación de chats e historial.

### ¿Necesito un proveedor para usar la API?

No es obligatorio: se puede usar la Cloud API de Meta directamente si tienes un sistema que la integre. Un proveedor suma plataforma, bandeja y soporte.

## Implementa la API con Websy

Configuramos la API oficial, las plantillas y el chatbot o asistente con IA integrado a tu CRM o tu agenda. Mira qué hace un [chatbot para WhatsApp](/blog/chatbot-whatsapp-business-automatizar-respuestas-clientes), el servicio de [automatizaciones con IA](/servicios/automatizaciones-ia) o [escríbenos](/contacto).
