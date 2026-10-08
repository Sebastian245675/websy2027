**Un design system (sistema de diseño) es el conjunto de reglas, estilos y componentes reutilizables con los que se construyen todas las pantallas de un producto digital: colores, tipografías, espaciados, botones, formularios, tarjetas y sus usos, definidos una vez en Figma y replicados en el código (por ejemplo, en componentes de React).** Permite diseñar y desarrollar más rápido, mantener la coherencia de la marca y hacer cambios globales sin revisar pantalla por pantalla.

En esta guía verás qué incluye un design system, sus niveles (tokens, componentes, patrones), cómo se pasa de Figma al código, cuándo conviene armar uno y cómo empezar sin un equipo grande.

## Qué incluye

| Nivel | Qué es | Ejemplos |
| --- | --- | --- |
| Tokens de diseño | Los valores básicos con nombre | Color primario, tamaño de título, espaciado base, radio de bordes |
| Componentes | Piezas reutilizables con sus variantes y estados | Botón (primario, secundario, deshabilitado), campo de formulario, tarjeta, modal |
| Patrones | Combinaciones de componentes para resolver situaciones comunes | Formulario de contacto, listado con filtros, checkout |
| Guías | Cómo y cuándo usar cada cosa | Tono de los textos, accesibilidad, uso de íconos |

## De Figma al código

1. **Tokens en Figma** como variables (colores, tipografías, espaciados).
2. **Componentes en Figma** con variantes y propiedades (tamaño, estado, ícono).
3. **Los mismos tokens en el código**, por ejemplo en la configuración de Tailwind CSS o en variables CSS.
4. **Componentes en React** que replican los de Figma, con las mismas variantes.
5. **Documentación** con ejemplos de uso (por ejemplo con Storybook).

Cuando el diseño cambia el color primario, se cambia un token y se actualiza en todo el producto. Ver [Tailwind vs Bootstrap](/blog/desarrollo-web-con-tailwind-css-vs-bootstrap-css-vanilla) y [qué es React](/blog/que-es-react-javascript-framework-para-que-sirve).

## Beneficios

- **Coherencia**: todas las pantallas se ven y funcionan igual.
- **Velocidad**: diseñar y programar con piezas listas.
- **Menos errores**: los componentes ya resuelven estados y accesibilidad.
- **Cambios globales** en minutos.
- **Incorporación de personas** más rápida: el sistema documenta cómo se trabaja.

## Cuándo conviene

| Situación | ¿Design system? |
| --- | --- |
| Landing page única | No hace falta uno formal: alcanza con una guía de estilos |
| Sitio institucional | Una versión liviana: tokens y componentes básicos |
| Sistema de gestión, SaaS o app con muchas pantallas | Sí |
| Varios productos de la misma marca | Sí |
| Varios diseñadores y desarrolladores | Sí |

## Cómo empezar sin un equipo grande

1. **Haz un inventario** de lo que ya existe: colores, botones y formularios distintos que hay en tu web o sistema.
2. **Unifica**: elige una versión de cada cosa.
3. **Define los tokens** básicos.
4. **Construye los 10 componentes más usados** (botón, campo, selector, tarjeta, alerta, modal, tabla, encabezado, pie, navegación).
5. **Documenta** cuándo usar cada uno.
6. **Amplía** con cada pantalla nueva.

También se puede partir de una librería de componentes existente (por ejemplo, componentes accesibles sin estilo como los de Radix o colecciones como shadcn/ui) y adaptarla a la marca.

## Errores comunes

- **Diseñar el sistema completo antes de usarlo**: se construye con el producto, no antes.
- **Que Figma y el código se desincronicen**: los tokens deben ser los mismos en los dos.
- **Componentes demasiado específicos** que solo sirven para una pantalla.
- **Olvidar la accesibilidad** en los componentes base.

## Ejemplo de tokens de una marca

| Token | Valor | Uso |
| --- | --- | --- |
| color-primario | Verde lima de la marca | Botones principales y destacados |
| color-texto | Gris muy oscuro | Textos |
| color-fondo | Blanco | Fondos |
| radio-borde | 8 px | Botones y tarjetas |
| espaciado-base | 8 px | Múltiplos para márgenes y rellenos |
| fuente-titulos | Tipografía de marca | Encabezados |
| fuente-texto | Tipografía de lectura | Párrafos |

Con estos tokens definidos, cualquier pantalla nueva respeta la marca sin decisiones repetidas.

## Preguntas frecuentes

### ¿Qué es un design system?

El conjunto de reglas, estilos y componentes reutilizables con los que se construyen todas las pantallas de un producto, definidos en el diseño y replicados en el código.

### ¿Qué diferencia hay entre una guía de estilos y un design system?

La guía de estilos define colores, tipografías y uso del logo; el design system suma componentes reutilizables, patrones, documentación y su implementación en código.

### ¿Qué son los tokens de diseño?

Los valores básicos del diseño con nombre propio, como el color primario o el espaciado base, usados igual en Figma y en el código.

### ¿Una pyme necesita un design system?

Para una web simple, alcanza con una guía de estilos. Para sistemas, apps o varios productos, un design system liviano ahorra tiempo y errores.

## Diseño consistente de Figma al código

En Websy definimos tokens y componentes en Figma y los implementamos en React y Tailwind. Mira el servicio de [diseño UI/UX](/servicios/ui-ux) o [escríbenos](/contacto).
