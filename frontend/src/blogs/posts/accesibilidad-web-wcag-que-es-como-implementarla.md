**La accesibilidad web es diseñar y desarrollar sitios que puedan usar todas las personas, incluidas las que tienen discapacidades visuales, auditivas, motrices o cognitivas, y quienes usan lectores de pantalla, solo el teclado o pantallas ampliadas.** La referencia internacional son las pautas WCAG (Web Content Accessibility Guidelines) del W3C, cuya versión vigente es la 2.2; el nivel recomendado para la mayoría de los sitios es AA. Además de ampliar el alcance y mejorar la experiencia de todos, en varios países es una obligación legal para el sector público y algunas empresas.

En esta guía verás los cuatro principios de WCAG, los criterios más importantes con ejemplos concretos, cómo evaluar tu web, qué exige la normativa en Argentina y Colombia y un checklist para empezar.

## Los cuatro principios (POUR)

| Principio | Significa que el contenido es... | Ejemplo |
| --- | --- | --- |
| Perceptible | Presentado de forma que todos puedan percibirlo | Textos alternativos en imágenes, subtítulos en videos |
| Operable | Usable con distintos métodos | Todo funciona con el teclado, sin límites de tiempo imposibles |
| Comprensible | Claro y predecible | Lenguaje simple, errores de formulario explicados |
| Robusto | Compatible con tecnologías de asistencia | HTML correcto que interpretan los lectores de pantalla |

## Niveles de conformidad

| Nivel | Qué implica |
| --- | --- |
| A | Requisitos mínimos |
| AA | El estándar recomendado y el más exigido por normativas |
| AAA | El más exigente, para casos específicos |

## Criterios clave, con ejemplos

| Criterio | Qué hacer |
| --- | --- |
| Texto alternativo | Cada imagen informativa tiene una descripción; las decorativas se marcan como tales |
| Contraste | Al menos 4,5:1 para texto normal y 3:1 para texto grande y elementos de interfaz |
| Navegación por teclado | Todo se puede usar con Tab, Enter y las flechas, sin quedar atrapado |
| Foco visible | Se ve claramente qué elemento está seleccionado con el teclado |
| Títulos y estructura | Encabezados (H1, H2, H3) en orden lógico |
| Formularios | Cada campo con su etiqueta; errores explicados en texto |
| Enlaces descriptivos | "Ver precios de tiendas online" en lugar de "clic aquí" |
| Tamaño de objetivos táctiles | Botones con área suficiente para tocarlos (WCAG 2.2 agrega un mínimo) |
| No solo color | La información no depende únicamente del color |
| Multimedia | Subtítulos en videos y transcripciones de audios |
| Idioma | El idioma de la página declarado en el HTML |

## Cómo evaluar tu web

1. **Herramientas automáticas**: Lighthouse (en el navegador), WAVE o axe detectan muchos problemas, pero no todos.
2. **Navega solo con el teclado** por las tareas principales.
3. **Prueba con un lector de pantalla** (NVDA en Windows, VoiceOver en Mac e iPhone, TalkBack en Android).
4. **Amplía la página al 200%** y verifica que siga usable.
5. **Revisa los contrastes** con un verificador.

Las herramientas automáticas detectan solo una parte de los problemas; la revisión manual es imprescindible.

## Normativa en la región

- **Argentina**: la Ley 26.653 de accesibilidad de la información en las páginas web obliga al Estado y a ciertas empresas (por ejemplo, prestadoras de servicios públicos o que reciben fondos públicos) a cumplir pautas de accesibilidad.
- **Colombia**: la Resolución 1519 de 2020 del Ministerio TIC fija lineamientos de accesibilidad web basados en WCAG para las entidades obligadas.
- **Si vendes a Europa**: el Acta Europea de Accesibilidad exige requisitos de accesibilidad a muchos productos y servicios digitales desde 2025.

Consulta si tu organización está alcanzada; aunque no lo esté, cumplir WCAG AA es una buena práctica.

## Beneficios para el negocio

- **Más clientes**: una parte importante de la población tiene alguna discapacidad, y la población mayor crece.
- **Mejor experiencia para todos**: buen contraste, botones grandes y textos claros ayudan a cualquiera que use el celular al sol o con prisa.
- **SEO**: estructura clara, textos alternativos y enlaces descriptivos también ayudan a los buscadores.
- **Menos riesgo legal** donde la normativa aplica.

## Checklist para empezar

| Control | Hecho |
| --- | --- |
| Textos alternativos en imágenes informativas | |
| Contraste suficiente en textos y botones | |
| Toda la web usable con el teclado | |
| Foco visible | |
| Encabezados en orden lógico | |
| Formularios con etiquetas y errores claros | |
| Enlaces descriptivos | |
| Idioma de la página declarado | |
| Videos con subtítulos | |

## Preguntas frecuentes

### ¿Qué es la accesibilidad web?

El diseño y desarrollo de sitios que pueden usar todas las personas, incluidas las que tienen discapacidades o usan tecnologías de asistencia.

### ¿Qué son las WCAG?

Las pautas de accesibilidad para el contenido web del W3C, la referencia internacional. La versión vigente es la 2.2 y el nivel recomendado, AA.

### ¿Es obligatoria la accesibilidad web?

Para el sector público y ciertas empresas en varios países sí, como en Argentina (Ley 26.653) y Colombia (Resolución 1519 de 2020). Para el resto es una buena práctica que amplía el alcance.

### ¿Un plugin de accesibilidad hace accesible mi web?

No. Los "overlays" o widgets no reemplazan una web construida con buenas prácticas y pueden generar nuevos problemas.

## Webs accesibles

En Websy desarrollamos webs con criterios WCAG desde el diseño. Mira el servicio de [diseño UI/UX](/servicios/ui-ux), la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
