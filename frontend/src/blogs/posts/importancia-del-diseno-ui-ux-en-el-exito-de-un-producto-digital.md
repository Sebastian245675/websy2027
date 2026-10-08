**Para medir la experiencia de usuario de una web o una app se combinan métricas de comportamiento (tasa de conversión, abandono en cada paso, tiempo para completar una tarea, errores), métricas de percepción (encuestas como SUS, NPS o CSAT) y observación directa (pruebas con usuarios y grabaciones de sesiones).** Los números dicen dónde está el problema; la observación dice por qué. Medir antes y después de cada cambio de diseño es lo que convierte la UX en una inversión con retorno demostrable.

En esta guía verás qué métricas usar, cómo hacer pruebas con usuarios con poco presupuesto, qué herramientas existen y cómo armar un ciclo de mejora continua.

## Métricas de comportamiento

| Métrica | Qué indica | Dónde se mide |
| --- | --- | --- |
| Tasa de conversión | Cuántos completan el objetivo (consulta, compra, reserva) | Google Analytics 4 |
| Abandono por paso | En qué paso del embudo se pierden usuarios | Embudos en GA4 o la plataforma |
| Tasa de éxito de una tarea | Qué porcentaje logra hacer algo concreto | Pruebas con usuarios |
| Tiempo en completar una tarea | Cuánto esfuerzo requiere | Pruebas con usuarios, grabaciones |
| Errores | Formularios mal completados, búsquedas sin resultados | Analítica, registros |
| Clics de frustración | Clics repetidos en algo que no responde | Microsoft Clarity, Hotjar |
| Retención (apps) | Cuántos vuelven a usar el producto | Analítica de producto |

## Métricas de percepción

| Encuesta | Qué mide | Cuándo usarla |
| --- | --- | --- |
| SUS (System Usability Scale) | Usabilidad percibida, con 10 preguntas estándar | Después de usar un sistema o app |
| CSAT | Satisfacción con una interacción concreta | Después de una compra o un trámite |
| NPS | Probabilidad de recomendar | Relación general con el producto |
| Pregunta abierta | Qué le faltó o qué le costó | Siempre suma contexto |

## Pruebas con usuarios con poco presupuesto

1. **Define 3 a 5 tareas reales**: "Pide un presupuesto para tu caso", "Encuentra el precio del plan básico".
2. **Recluta 5 personas** parecidas a tus clientes (no del equipo).
3. **Pídeles que piensen en voz alta** mientras hacen las tareas, en su propio celular.
4. **No ayudes**: observa dónde dudan, se equivocan o se frustran.
5. **Anota los problemas** y ordénalos por frecuencia y gravedad.

Cinco personas suelen detectar la mayoría de los problemas graves de usabilidad. Se puede hacer por videollamada compartiendo pantalla.

## Herramientas

| Herramienta | Para qué |
| --- | --- |
| Google Analytics 4 | Conversiones y embudos |
| Microsoft Clarity | Grabaciones y mapas de calor, gratis |
| Hotjar | Grabaciones, mapas de calor y encuestas |
| Formularios (Google Forms, Typeform) | Encuestas SUS o CSAT |
| Figma | Prototipos para probar antes de programar |

## Ciclo de mejora continua

1. **Medir** la situación actual.
2. **Observar** dónde y por qué se traban los usuarios.
3. **Proponer** un cambio con una hipótesis.
4. **Probar** en prototipo o con un test A/B. Ver [qué es CRO](/blog/cro-conversion-rate-optimization-guia-testing-ab).
5. **Implementar** y volver a medir.

## Ejemplo de diagnóstico

| Observación | Métrica | Problema | Cambio propuesto |
| --- | --- | --- | --- |
| Pocos envíos del formulario | 70% abandona en el formulario | Pide demasiados datos | Reducir a nombre, contacto y consulta |
| Clics repetidos en una imagen | Clics de frustración en Clarity | Parece un botón y no lo es | Hacerla clickeable o cambiar su diseño |
| Consultas por WhatsApp preguntando el precio | Muchas consultas repetidas | El precio no se encuentra | Mostrar rangos en la página del servicio |

## Errores comunes al medir la experiencia

- **Mirar solo el promedio**: un buen promedio puede esconder un paso donde abandona la mitad.
- **Preguntarle al equipo** en lugar de observar a usuarios reales.
- **Medir sin una pregunta**: definir antes qué se quiere saber.
- **Cambiar varias cosas a la vez**: después no se sabe qué funcionó.
- **No volver a medir** después del cambio.

## Preguntas frecuentes

### ¿Cómo se mide la experiencia de usuario?

Con métricas de comportamiento (conversión, abandono, éxito de tareas, errores), encuestas (SUS, CSAT, NPS) y observación (pruebas con usuarios y grabaciones de sesiones).

### ¿Qué es el SUS?

La System Usability Scale, un cuestionario estándar de 10 preguntas que da un puntaje de usabilidad percibida de 0 a 100.

### ¿Cuántos usuarios necesito para una prueba?

Cinco personas parecidas a tus clientes suelen detectar la mayoría de los problemas graves. Para métricas comparables se necesitan más.

### ¿La UX se puede medir en dinero?

Sí, de forma indirecta: un aumento en la conversión, menos consultas de soporte o menos errores se traducen en ventas y costos.

## Medimos y mejoramos tu experiencia de usuario

En Websy analizamos datos y hacemos pruebas con usuarios para mejorar webs, tiendas y apps. Mira [qué es el diseño UX/UI](/blog/diseno-ux-ui-que-es-por-que-importa-para-tu-negocio), el servicio de [diseño UI/UX](/servicios/ui-ux) o [escríbenos](/contacto).
