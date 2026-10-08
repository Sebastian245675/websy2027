**Una app nativa (o multiplataforma) se descarga desde Google Play o App Store y tiene acceso completo al teléfono; una PWA (Progressive Web App) es una web que se puede instalar en la pantalla de inicio, funciona sin conexión en parte y aparece en Google, sin pasar por las tiendas.** Elige app si tus usuarios la van a usar seguido, necesitas funciones avanzadas del teléfono o presencia en las tiendas; elige PWA si el uso es ocasional, quieres que te encuentren en Google o tienes un presupuesto ajustado.

En esta guía comparamos las dos opciones punto por punto, explicamos qué puede y qué no puede hacer una PWA hoy (incluido iPhone), casos en los que conviene cada una, costos y una opción intermedia.

## Comparativa

| Criterio | App (nativa o multiplataforma) | PWA |
| --- | --- | --- |
| Cómo se instala | Desde Google Play y App Store | Desde el navegador, "Agregar a pantalla de inicio" |
| Aparece en Google | No (la ficha de la tienda sí) | Sí, como cualquier web |
| Costo de desarrollo | Mayor | Menor |
| Publicación | Revisión de cada tienda | Inmediata |
| Actualizaciones | Pasan por las tiendas | Instantáneas |
| Notificaciones push | Sí | Sí en Android y en iPhone con la app instalada en la pantalla de inicio (iOS 16.4 o posterior) |
| Funcionar sin conexión | Sí | Parcialmente, con caché |
| Acceso a cámara y GPS | Sí | Sí, con permisos del navegador |
| Bluetooth, NFC, sensores avanzados | Sí | Limitado, varía por navegador y sistema |
| Pagos dentro de la app | Reglas de cada tienda | Pasarelas web habituales |
| Comisiones de las tiendas | Aplican a contenido digital | No aplican |

## Qué puede hacer hoy una PWA

- Instalarse con ícono en la pantalla de inicio y abrirse a pantalla completa.
- Funcionar con conexión lenta o sin conexión en las pantallas guardadas en caché.
- Enviar notificaciones push en Android y, en iPhone, cuando el usuario la agregó a la pantalla de inicio.
- Usar cámara, geolocalización y compartir contenido.
- Posicionar en Google, porque es una web.

Lo que todavía limita a una PWA: integraciones profundas con el sistema (widgets avanzados, Bluetooth en iPhone, algunas funciones en segundo plano) y la presencia en las tiendas, donde muchos usuarios buscan apps. Ver [qué es una PWA](/blog/que-es-una-pwa-progressive-web-app-ventajas-ejemplos).

## Cómo se instala una PWA

| Dispositivo | Pasos |
| --- | --- |
| Android (Chrome) | Abrir la web, tocar el aviso "Instalar app" o el menú y "Instalar aplicación" |
| iPhone (Safari) | Abrir la web, tocar "Compartir" y luego "Agregar a pantalla de inicio" |
| Computadora (Chrome o Edge) | Ícono de instalación en la barra de direcciones |

En iPhone el usuario tiene que hacerlo a mano, por eso conviene explicarlo con una pantalla de ayuda dentro de la web.

## Qué necesita técnicamente una PWA

- **HTTPS** obligatorio.
- **Manifiesto web** con nombre, íconos, colores y modo de visualización.
- **Service worker** que gestiona la caché y el funcionamiento sin conexión.
- **Diseño adaptable** a cualquier pantalla.
- **Rendimiento**: carga rápida en el celular, sobre todo la primera vez.

## Cuándo conviene cada una

| Caso | Recomendación | Por qué |
| --- | --- | --- |
| Restaurante que quiere pedidos online | PWA o web | Uso ocasional, importa aparecer en Google |
| Cadena con programa de fidelización | App | Uso frecuente y notificaciones |
| Equipo de técnicos en la calle | App o PWA | App si necesitan funcionar sin conexión durante horas |
| Catálogo para clientes mayoristas | PWA | Se comparte por enlace y no requiere tienda |
| Plataforma tipo marketplace | App | Usuarios recurrentes, notificaciones, presencia en tiendas |
| Validar una idea con poco presupuesto | PWA | Menor costo y publicación inmediata |

## Costos

Una PWA cuesta en general menos que una app, porque es una sola web que funciona en todos los dispositivos y no requiere publicar ni mantener fichas en tiendas. Una app multiplataforma para Android e iOS arranca en Websy en unos USD 2.000. Ver [cuánto cuesta desarrollar una app](/blog/cuanto-cuesta-desarrollar-una-app-movil-argentina-latam).

## Opción intermedia: empezar con PWA y pasar a app

Muchos proyectos empiezan como PWA para validar y, cuando hay usuarios recurrentes, pasan a una app. Si el backend y el panel de administración se diseñan bien desde el principio, la app reutiliza todo y solo se desarrolla la parte del teléfono. Con React Native, además, parte del conocimiento del equipo web se aprovecha.

## Preguntas frecuentes

### ¿Qué es mejor, una app o una PWA?

Depende del uso. Una app conviene para uso frecuente, funciones avanzadas del teléfono y presencia en tiendas. Una PWA conviene para uso ocasional, aparecer en Google y presupuestos ajustados.

### ¿Las PWA funcionan en iPhone?

Sí. Se pueden agregar a la pantalla de inicio desde Safari y, desde iOS 16.4, recibir notificaciones push si el usuario la instaló. Algunas funciones avanzadas siguen siendo más limitadas que en Android.

### ¿Una PWA se puede publicar en Google Play?

Sí, Google Play permite publicar PWA empaquetadas. En App Store las reglas son más estrictas para apps que solo envuelven una web.

### ¿Cuál es más barata?

En general, la PWA: es una sola web para todos los dispositivos, sin publicación en tiendas.

### ¿Una PWA funciona sin internet?

Parcialmente. Las pantallas y datos guardados en caché se pueden ver sin conexión, y algunas acciones pueden quedar en espera hasta recuperar la señal. Para apps que deben trabajar horas sin conexión, como en trabajo de campo, una app suele ser más confiable.

### ¿Puedo convertir mi web actual en una PWA?

Sí, si la web es moderna y rápida: se agregan el manifiesto, el service worker y los ajustes de diseño para que funcione bien instalada. Es una forma económica de ofrecer una experiencia de app a tus clientes.

## Te ayudamos a decidir

En Websy desarrollamos PWA y apps para Android e iOS, según lo que necesita tu proyecto. Mira la [guía de desarrollo de apps](/blog/guia-desarrollo-de-aplicaciones-moviles-para-empresas) o [escríbenos](/contacto).
