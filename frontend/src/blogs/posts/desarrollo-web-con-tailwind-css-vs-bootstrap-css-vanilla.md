**Tailwind CSS es un framework de estilos "utility-first": se arma el diseño combinando clases pequeñas (márgenes, colores, tamaños) directamente en el HTML, lo que permite diseños totalmente propios y genera hojas de estilo livianas. Bootstrap es un framework de componentes listos (botones, menús, grillas, modales) con un estilo reconocible, ideal para armar interfaces rápido. CSS puro (vanilla) da control total sin dependencias, a cambio de escribir y organizar todo a mano.** Para un diseño de marca propio y rápido, Tailwind; para paneles internos o prototipos con componentes estándar, Bootstrap; para sitios muy simples o con necesidades muy específicas, CSS puro.

En esta comparativa verás cómo funciona cada opción, rendimiento, curva de aprendizaje, mantenimiento y cuál conviene según el proyecto.

## Cómo se ve cada uno

**Tailwind**: el estilo está en las clases.

```html
<button class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
  Pedir presupuesto
</button>
```

**Bootstrap**: componentes predefinidos.

```html
<button class="btn btn-dark btn-lg">Pedir presupuesto</button>
```

**CSS puro**: una clase propia con sus reglas.

```css
.boton-principal {
  background: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

## Comparativa

| Criterio | Tailwind CSS | Bootstrap | CSS puro |
| --- | --- | --- | --- |
| Enfoque | Clases utilitarias | Componentes listos | Reglas propias |
| Diseño propio | Total | Requiere personalizar para no parecer "Bootstrap" | Total |
| Velocidad para prototipar | Alta, con experiencia | Muy alta | Baja |
| Peso del CSS final | Solo las clases usadas | Mayor si no se recorta | Lo que escribas |
| Componentes con JavaScript (modales, menús) | No incluidos; se usan librerías | Incluidos | A mano |
| Curva de aprendizaje | Media | Baja | Depende del proyecto |
| Mantenimiento | Clases en el marcado, sin hojas que crecen | Personalizaciones sobre el framework | Requiere disciplina para no desordenarse |

## Rendimiento

Tailwind genera una hoja de estilos con solo las clases que se usan, por lo que suele ser liviana. Bootstrap puede cargar más CSS y JavaScript del necesario si no se personaliza la compilación. El CSS puro es tan liviano como lo escribas. En todos los casos, lo que más pesa en la velocidad suele ser el JavaScript y las imágenes, no el CSS. Ver [cómo mejorar la velocidad de carga](/blog/velocidad-de-carga-web-como-optimizar-pagespeed-100).

## Cuál conviene según el proyecto

| Proyecto | Recomendación |
| --- | --- |
| Sitio de marca con diseño propio | Tailwind |
| Aplicación en React o Next.js | Tailwind (con una librería de componentes accesibles si hace falta) |
| Panel interno o prototipo rápido | Bootstrap o una librería de componentes |
| Landing muy liviana o sitio estático simple | CSS puro o Tailwind |
| Equipo que ya domina Bootstrap y un proyecto estándar | Bootstrap |

En Websy usamos Tailwind CSS en la mayoría de los proyectos, como [Remix Producciones](/casos-de-exito/pagina-web-productora-eventos-manizales-remix) o [SemillaMind](/casos-de-exito/pagina-web-psicologa-bogota-semillamind), y CSS puro en sitios muy livianos, como la web de [ABO Colombia](/casos-de-exito/pagina-web-fabrica-forros-industriales-abo-colombia).

## Errores comunes

- **Mezclar Bootstrap y Tailwind** en el mismo proyecto: estilos que se pisan y más peso.
- **Repetir combinaciones largas de clases de Tailwind** en vez de crear componentes.
- **Usar Bootstrap sin personalizar**: la web se parece a miles de otras.
- **CSS puro sin organización**: hojas de estilo que crecen hasta que nadie sabe qué regla afecta a qué.

## Cómo migrar de Bootstrap a Tailwind

1. Define los colores, tipografías y espaciados de la marca en la configuración de Tailwind.
2. Reconstruye primero los componentes base (botones, formularios, tarjetas).
3. Migra página por página, quitando Bootstrap cuando ya no se use.
4. Verifica que el diseño se mantenga en celular y computadora.

## Combinación con un design system

Con Tailwind, los colores, tipografías y espaciados de la marca se definen una vez en la configuración y se usan en todo el sitio, lo que facilita mantener un design system. Ver [qué es un design system](/blog/diseno-de-design-systems-figma-a-codigo-react).

## Preguntas frecuentes

### ¿Qué es mejor, Tailwind o Bootstrap?

Tailwind para diseños propios y livianos; Bootstrap para armar interfaces estándar rápidamente con componentes listos.

### ¿Tailwind hace el HTML más difícil de leer?

Las clases en el marcado son largas al principio, pero mantienen el estilo junto al elemento y evitan hojas de estilo que crecen sin control. En proyectos con componentes, ese marcado se escribe una sola vez.

### ¿Bootstrap sigue vigente?

Sí, sigue mantenido y es útil para paneles y prototipos. Para sitios de marca, muchos equipos prefieren Tailwind.

### ¿Se puede usar CSS puro en un proyecto grande?

Sí, con una metodología de organización y variables CSS. Requiere más disciplina para mantener la coherencia.

### ¿Tailwind sirve para el modo oscuro?

Sí. Permite definir estilos para el modo oscuro con un prefijo en las clases, y con variables de color se cambia toda la paleta según la preferencia del usuario.

## Diseño propio y liviano

En Websy desarrollamos con Tailwind CSS y un sistema de diseño por proyecto. Mira la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
