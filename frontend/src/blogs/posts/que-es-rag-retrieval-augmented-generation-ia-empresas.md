**RAG (Retrieval-Augmented Generation, o generación aumentada por recuperación) es una técnica que hace que un modelo de inteligencia artificial responda usando la información de tu empresa: antes de redactar, el sistema busca en tus documentos los fragmentos relevantes para la pregunta y se los pasa al modelo junto con la instrucción de responder solo con eso.** Así un asistente puede hablar de tus precios, tus productos o tus procesos sin "entrenar" un modelo propio y con mucho menos riesgo de inventar.

En esta guía verás cómo funciona RAG paso a paso, en qué se diferencia de entrenar un modelo, qué casos de uso tiene en una empresa, cómo se implementa y qué errores hacen que falle.

## Por qué hace falta RAG

Un modelo de lenguaje sabe mucho de temas generales, pero no conoce tu catálogo, tus precios de este mes ni tu manual de procedimientos. Si le preguntas, puede responder con seguridad algo que no es cierto. RAG resuelve ese problema dándole, en cada pregunta, la información correcta para responder.

## Cómo funciona, paso a paso

### Preparación (una vez y cada vez que cambia la información)

1. **Reunir los documentos**: catálogo, preguntas frecuentes, políticas, manuales, fichas técnicas.
2. **Dividirlos en fragmentos** de tamaño manejable, por ejemplo por sección o por producto.
3. **Convertir cada fragmento en un "embedding"**: una representación numérica de su significado.
4. **Guardar los fragmentos y sus embeddings** en una base de datos que permite buscar por significado (una base vectorial).

### En cada pregunta

1. El usuario pregunta algo.
2. La pregunta se convierte en embedding.
3. Se buscan los fragmentos con significado más parecido.
4. Se arma la instrucción para el modelo: la pregunta, los fragmentos encontrados y la regla de responder solo con esa información.
5. El modelo redacta la respuesta, idealmente indicando de qué documento salió.

## RAG vs entrenar un modelo

| | RAG | Entrenar o ajustar un modelo (fine-tuning) |
| --- | --- | --- |
| Para qué sirve | Responder con información que cambia | Enseñar un estilo o un formato muy específico |
| Actualizar la información | Cambias el documento y listo | Hay que volver a entrenar |
| Costo inicial | Bajo a medio | Mayor |
| Riesgo de inventar | Menor, si está bien configurado | No resuelve el problema por sí solo |
| Trazabilidad | Puedes mostrar de dónde sale cada respuesta | Difícil |

Para la mayoría de las empresas, RAG es la opción correcta: la información de un negocio cambia seguido y tiene que poder actualizarse sin tocar el modelo.

## Casos de uso en empresas

- **Atención al cliente**: un asistente en WhatsApp o en la web que responde con tu catálogo y tus políticas. Ver [cómo crear un chatbot con IA](/blog/como-crear-un-chatbot-con-ia-para-tu-empresa-openai-api).
- **Base de conocimiento interna**: el equipo pregunta "¿cómo se procesa una devolución?" y obtiene la respuesta del manual.
- **Soporte técnico**: respuestas a partir de manuales y fichas de producto.
- **Ventas**: el vendedor consulta especificaciones y condiciones sin buscar en carpetas.
- **Legal y administración**: encontrar cláusulas o requisitos en documentos largos (siempre con revisión profesional).

## Cómo se implementa

| Pieza | Opciones habituales |
| --- | --- |
| Modelo de lenguaje | Modelos de OpenAI, Anthropic, Google o de código abierto |
| Modelo de embeddings | Los que ofrecen esos mismos proveedores |
| Base vectorial | PostgreSQL con la extensión pgvector, o servicios especializados |
| Orquestación | Código propio, librerías como LangChain o LlamaIndex, o nodos de IA en n8n |
| Canal | WhatsApp, chat web, el CRM o el sistema interno |

Si tu sistema ya usa PostgreSQL, pgvector permite guardar los embeddings en la misma base de datos, sin sumar otro servicio.

## Errores que hacen fallar un RAG

- **Documentos desordenados o desactualizados**: el asistente responde con la versión vieja del precio.
- **Fragmentos mal cortados**: una tabla partida al medio pierde sentido.
- **Buscar pocos fragmentos o demasiados**: con pocos falta contexto; con demasiados el modelo se confunde y cuesta más.
- **No permitir que diga "no sé"**: si no encuentra información, tiene que reconocerlo.
- **No medir**: hay que probar con preguntas reales y revisar qué fragmentos se usaron.
- **Ignorar permisos**: un empleado de ventas no debería obtener respuestas de documentos de recursos humanos.

## Cómo medir la calidad

Arma un set de preguntas reales con la respuesta correcta. Para cada una, revisa si el sistema encontró los fragmentos correctos y si la respuesta es fiel a ellos. Repite la prueba cada vez que cambies documentos o configuración.

## Preguntas frecuentes

### ¿Qué es RAG en inteligencia artificial?

Es una técnica que busca información relevante en tus documentos y se la pasa al modelo de lenguaje para que responda con esos datos, en lugar de responder solo con lo que aprendió en su entrenamiento.

### ¿Para qué sirve RAG en una empresa?

Para asistentes que responden con la información real del negocio: atención al cliente, bases de conocimiento internas, soporte técnico y consulta de documentos.

### ¿RAG elimina las alucinaciones?

Las reduce mucho, pero no las elimina por completo. Se complementa con instrucciones claras, la opción de decir "no sé", citas de la fuente y revisión de conversaciones.

### ¿Necesito entrenar un modelo propio?

En la mayoría de los casos no. RAG permite usar un modelo existente con tu información, y actualizarla es tan simple como cambiar el documento.

## Implementamos asistentes con tu información

En Websy armamos asistentes con RAG conectados a WhatsApp, a la web o a tu sistema. Mira la [guía de automatización e IA](/blog/guia-automatizacion-e-inteligencia-artificial-para-empresas), qué es [un agente de IA](/blog/agentes-de-ia-autonomos-con-langchain-y-n8n-automatizacion) o [escríbenos](/contacto).
