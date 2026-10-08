**Un agente de IA es un sistema que usa un modelo de lenguaje para decidir qué pasos dar y qué herramientas usar para cumplir un objetivo: por ejemplo, leer un pedido por WhatsApp, consultar el stock, calcular el envío, crear la orden y avisar al cliente, sin que alguien programe de antemano cada camino posible.** A diferencia de un chatbot, que conversa, un agente actúa: consulta y modifica tus sistemas dentro de los límites que le das.

En esta guía verás qué es un agente y en qué se diferencia de un chatbot y de una automatización, cómo funciona por dentro, casos de uso concretos, con qué herramientas se construye (n8n, LangChain, desarrollo propio) y qué controles necesita para ser seguro.

## Chatbot, automatización y agente

| | Automatización | Chatbot con IA | Agente de IA |
| --- | --- | --- | --- |
| Qué hace | Ejecuta pasos fijos | Responde preguntas | Decide pasos y usa herramientas para lograr un objetivo |
| Quién define el camino | La persona que lo programó | El modelo redacta, el flujo está definido | El modelo elige, dentro de límites |
| Acciones sobre tus sistemas | Sí, las previstas | Pocas o ninguna | Sí, las herramientas que le habilites |
| Ejemplo | Formulario → CRM → correo | Responder dudas sobre envíos | Gestionar un pedido de punta a punta |

## Cómo funciona un agente

1. **Recibe un objetivo o un mensaje**: "Quiero 3 cajas del producto X para el viernes en Córdoba."
2. **Razona qué necesita**: verificar stock, calcular el envío, confirmar el precio.
3. **Usa herramientas**: cada herramienta es una función de tu sistema (consultar stock, cotizar envío, crear pedido, enviar mensaje) con parámetros definidos.
4. **Evalúa el resultado** de cada herramienta y decide el siguiente paso.
5. **Termina** cuando cumple el objetivo, o deriva a una persona si algo no está dentro de sus permisos.

El modelo solo pide usar las herramientas; tu sistema las ejecuta, valida los datos y controla los permisos.

## Casos de uso

- **Ventas por WhatsApp**: el agente entiende el pedido, consulta stock y precios, arma el carrito y envía el link de pago.
- **Atención posventa**: busca el pedido, informa el estado, inicia una devolución según la política.
- **Administración**: lee facturas de proveedores del correo, las carga en el sistema y avisa si un monto no coincide con la orden de compra.
- **Agenda**: coordina turnos entre varios profesionales y sedes, reprograma y envía recordatorios.
- **Investigación interna**: responde preguntas cruzando datos de ventas, stock y CRM para armar un reporte.

## Con qué se construye

| Herramienta | Qué es | Cuándo conviene |
| --- | --- | --- |
| n8n | Plataforma de automatización visual con nodos de agente de IA, memoria y herramientas | Agentes que conectan tus aplicaciones sin mucho código |
| LangChain / LangGraph | Librerías de Python y JavaScript para construir agentes | Agentes a medida dentro de tu propio software |
| SDK de los proveedores | Funciones de "herramientas" de OpenAI, Anthropic o Google | Integraciones directas y controladas |
| Plataformas de agentes | Servicios listos con conectores | Casos estándar y poco tiempo |

Comparamos n8n con su principal alternativa en [n8n vs Make](/blog/n8n-vs-make-integromat-comparativa-automatizacion-empresarial-2026).

## Ejemplo completo: un pedido por WhatsApp

Un cliente escribe: "Necesito 3 cajas de guantes talle M para el viernes, estoy en Rosario." Así lo resuelve un agente con cuatro herramientas habilitadas (consultar stock, cotizar envío, crear pedido, generar link de pago):

1. **Entiende el pedido**: producto (guantes), talle (M), cantidad (3 cajas), fecha (viernes), destino (Rosario).
2. **Consulta stock**: la herramienta devuelve que hay 10 cajas disponibles.
3. **Cotiza el envío**: la herramienta devuelve el costo y la fecha estimada de entrega a Rosario.
4. **Detecta un problema**: la entrega estimada es el lunes, no el viernes. No lo oculta.
5. **Responde**: informa el precio total, que el envío estándar llega el lunes y ofrece el envío express, si existe en la lista de opciones.
6. **El cliente acepta el express**: el agente crea el pedido y genera el link de pago.
7. **Registra todo** en el CRM y avisa al depósito.

Si el cliente hubiera pedido un descuento por cantidad, el agente lo derivaría a un vendedor: no tiene una herramienta para aplicar descuentos, y eso es intencional.

## Controles que un agente necesita

Un agente que puede modificar tus sistemas necesita reglas claras:

- **Permisos mínimos**: solo las herramientas indispensables. Un agente de atención no necesita poder borrar pedidos.
- **Límites de montos y cantidades**: por ejemplo, descuentos o reembolsos por encima de cierto valor requieren aprobación humana.
- **Confirmación antes de acciones irreversibles**: cobrar, cancelar, enviar a muchos clientes.
- **Registro de cada acción**: qué herramienta usó, con qué datos y por qué.
- **Límite de pasos y de costo**: para que un error no genere un bucle de llamadas.
- **Información verificada**: las respuestas sobre precios y políticas salen de tus sistemas o de una base de conocimiento (ver [qué es RAG](/blog/que-es-rag-retrieval-augmented-generation-ia-empresas)).

## Cómo empezar con un agente

1. **Elige un proceso acotado** con objetivo claro y pocas herramientas.
2. **Define las herramientas** y sus permisos.
3. **Empieza en modo asistido**: el agente propone y una persona aprueba.
4. **Mide** errores, tiempo ahorrado y casos derivados.
5. **Amplía la autonomía** solo donde los errores son poco probables y de bajo impacto.

## Preguntas frecuentes

### ¿Qué es un agente de inteligencia artificial?

Un sistema que usa un modelo de lenguaje para decidir qué pasos dar y qué herramientas usar para cumplir un objetivo, como gestionar un pedido o agendar un turno, dentro de los límites que le define la empresa.

### ¿En qué se diferencia de un chatbot?

Un chatbot conversa y responde preguntas. Un agente, además, actúa: consulta y modifica tus sistemas para completar una tarea.

### ¿Se puede crear un agente de IA con n8n?

Sí. n8n tiene nodos de agente que combinan un modelo de lenguaje con memoria y herramientas, como consultar una base de datos o llamar a una API.

### ¿Es seguro dejar que un agente actúe solo?

Es seguro si tiene permisos mínimos, límites de montos, confirmación humana en acciones irreversibles y registro de todo lo que hace. Conviene empezar en modo asistido.

## Construimos agentes para tu empresa

En Websy diseñamos agentes con n8n o desarrollo a medida, conectados a WhatsApp y a tus sistemas, con los controles necesarios. Mira la [guía de automatización e IA](/blog/guia-automatizacion-e-inteligencia-artificial-para-empresas) o [escríbenos](/contacto).
