**React es una biblioteca de JavaScript creada por Meta para construir interfaces de usuario a partir de componentes reutilizables: piezas como un botón, una tarjeta de producto o un formulario que se combinan para armar páginas y aplicaciones.** Es una de las tecnologías más usadas del mundo para desarrollar webs y aplicaciones web, y con React Native también se usa para apps móviles. Para una empresa, significa sitios rápidos, interfaces consistentes y mucho talento disponible para mantenerlos.

En esta guía verás qué es React explicado sin tecnicismos, cómo funciona, para qué sirve, sus ventajas y límites, cómo se relaciona con Next.js y React Native, y cuándo conviene usarlo.

## React en palabras simples

Imagina una web como un juego de bloques. Con React, cada bloque (el encabezado, la tarjeta de un servicio, el formulario de contacto) se construye una vez y se reutiliza en todas las páginas. Si cambias el bloque, cambia en todos lados. Además, React actualiza solo la parte de la pantalla que cambia (por ejemplo, el contador del carrito) sin recargar toda la página.

## Conceptos básicos

| Concepto | Qué es |
| --- | --- |
| Componente | Una pieza de la interfaz reutilizable |
| Props | Los datos que recibe un componente (por ejemplo, el nombre y precio de un producto) |
| Estado | Datos que cambian con la interacción (lo que hay en el carrito) |
| JSX | La forma de escribir la interfaz mezclando JavaScript y una sintaxis parecida a HTML |
| Hooks | Funciones para manejar estado y efectos en los componentes |

Un componente simple:

```javascript
function TarjetaServicio({ titulo, precio }) {
  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      <p>Desde {precio}</p>
    </div>
  );
}
```

## Para qué sirve

| Uso | Ejemplo |
| --- | --- |
| Sitios web de empresa | Con Next.js, sitios rápidos y bien posicionados |
| Tiendas online | Catálogos, filtros, carrito interactivo |
| Sistemas de gestión | Paneles, tablas, formularios complejos |
| Aplicaciones web | Portales de clientes, plataformas, SaaS |
| Apps móviles | Con React Native, para Android e iOS |

Muchos proyectos de Websy están hechos con React, como la tienda de [VISFUM](/casos-de-exito/tienda-online-perfumeria-visfum) o la plataforma de [CASAMAX](/casos-de-exito/plataforma-inmobiliaria-propiedades-casamax).

## Ventajas

- **Componentes reutilizables**: menos código repetido y una interfaz coherente.
- **Interfaces muy interactivas** sin recargar la página.
- **Ecosistema enorme**: librerías para formularios, gráficos, mapas, pagos.
- **Talento disponible**: es una de las tecnologías más demandadas, lo que facilita mantener el proyecto.
- **Un mismo conocimiento para web y móvil** con React Native.

## Límites

- **Por sí solo, React renderiza en el navegador**: si la web necesita posicionar en Google, conviene usarlo con un framework como Next.js, que entrega el contenido en el HTML. Ver [qué es Next.js](/blog/next-js-que-es-por-que-usarlo-para-tu-pagina-web).
- **Requiere desarrolladores** para cambios de estructura; el contenido se puede editar con un CMS.
- **Elección de librerías**: el ecosistema es amplio y hay que elegir dependencias mantenidas.

## React, Next.js y React Native

| | React | Next.js | React Native |
| --- | --- | --- | --- |
| Qué es | Biblioteca de interfaces | Framework web basado en React | Framework móvil basado en React |
| Dónde corre | Navegador | Servidor y navegador | Android e iOS |
| Ideal para | Interfaces y aplicaciones web | Sitios y aplicaciones web con SEO | Apps móviles |

## ¿Conviene React para tu proyecto?

| Proyecto | ¿React? |
| --- | --- |
| Sitio de empresa que tiene que posicionar | Sí, con Next.js |
| Sistema de gestión o panel interno | Sí |
| Tienda online a medida | Sí |
| Blog editado a diario sin desarrolladores | Puede convenir WordPress o React con un CMS |
| Página única muy simple | Puede alcanzar con HTML estático |

Ver [React vs WordPress](/blog/desarrollo-web-react-vs-wordpress-guia-comparativa).

## Qué preguntarle a tu proveedor si propone React

| Pregunta | Por qué importa |
| --- | --- |
| ¿Cómo se entrega el contenido para Google? | Con React solo, el contenido no está en el HTML; con Next.js o prerenderizado, sí |
| ¿Con qué voy a editar los textos e imágenes? | CMS, panel propio o pedidos al desarrollador |
| ¿Se usa TypeScript? | Menos errores y mejor mantenimiento |
| ¿Qué librerías principales se usan y están mantenidas? | Evita depender de paquetes abandonados |
| ¿Quién mantiene las actualizaciones? | React y sus librerías se actualizan seguido |

## Errores comunes en proyectos con React

- **Sitios públicos sin renderizado en el servidor**, que tardan en mostrar contenido y posicionan peor.
- **Demasiadas librerías** para cosas simples, que hacen pesada la página.
- **Componentes gigantes** difíciles de mantener.
- **No probar en celulares de gama media**, donde el JavaScript pesado se nota más.

## Preguntas frecuentes

### ¿Qué es React y para qué sirve?

Una biblioteca de JavaScript para construir interfaces con componentes reutilizables. Sirve para sitios web, tiendas, sistemas de gestión, aplicaciones web y, con React Native, apps móviles.

### ¿React es un lenguaje de programación?

No. Es una biblioteca escrita en JavaScript; se programa en JavaScript o TypeScript.

### ¿Las webs hechas con React posicionan en Google?

Sí, si el contenido se entrega en el HTML, por ejemplo con Next.js o con prerenderizado.

### ¿React es gratis?

Sí, es de código abierto.

## Desarrollamos con React

En Websy desarrollamos sitios, tiendas y sistemas con React y Next.js. Mira la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas) o [escríbenos](/contacto).
