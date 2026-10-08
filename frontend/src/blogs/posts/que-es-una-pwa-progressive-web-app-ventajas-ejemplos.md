**Una PWA (Progressive Web App, o aplicación web progresiva) es una página o aplicación web que se puede instalar en el celular o la computadora como si fuera una app: tiene ícono propio, se abre a pantalla completa, puede funcionar en parte sin conexión y enviar notificaciones, sin pasar por Google Play ni App Store.** Para una empresa, es una forma de dar una experiencia de app a sus clientes con el costo y el alcance de una web, que además se puede encontrar en Google.

En esta guía verás cómo funciona una PWA, qué necesita técnicamente, qué puede y qué no puede hacer, ejemplos de uso, cuánto cuesta y cuándo conviene frente a una app nativa.

## Cómo funciona

Una PWA es una web normal con tres agregados:

| Componente | Para qué sirve |
| --- | --- |
| HTTPS | Obligatorio para las funciones de PWA |
| Manifiesto web | Archivo con nombre, ícono, colores y forma de abrirse; permite instalarla |
| Service worker | Script que gestiona la caché, el funcionamiento sin conexión y las notificaciones |

## Qué puede hacer

- **Instalarse** en la pantalla de inicio con su ícono.
- **Abrirse a pantalla completa**, sin la barra del navegador.
- **Funcionar sin conexión o con conexión lenta** en las pantallas y datos guardados en caché.
- **Enviar notificaciones push** (en iPhone, cuando el usuario la instaló en la pantalla de inicio, desde iOS 16.4).
- **Usar la cámara, la ubicación y compartir** contenido.
- **Actualizarse sola**, sin pasar por una tienda.
- **Aparecer en Google** como cualquier web.

## Qué no puede hacer (o hace con límites)

- Integraciones profundas con el sistema (algunas funciones de Bluetooth, NFC o tareas en segundo plano, sobre todo en iPhone).
- Estar en App Store como una app nativa completa (Google Play sí permite publicar PWA empaquetadas).
- Ser descubierta por quienes buscan apps solo dentro de las tiendas.

## Ejemplos de uso para empresas

| Empresa | PWA |
| --- | --- |
| Restaurante | Menú, pedidos y seguimiento, instalable para clientes frecuentes |
| Comercio mayorista | Catálogo y pedidos para los clientes, instalable en el celular del comprador |
| Empresa de servicios | Portal de clientes con turnos y pagos |
| Equipo de campo | Formularios de inspección que se completan con mala señal y se sincronizan después |
| Medio o blog | Lectura sin conexión y notificaciones de nuevos artículos |

## PWA vs app nativa

| | PWA | App nativa o multiplataforma |
| --- | --- | --- |
| Costo | Menor | Mayor |
| Publicación | Inmediata | Revisión de tiendas |
| Actualizaciones | Instantáneas | Por las tiendas |
| SEO | Sí | No |
| Funciones del teléfono | Amplias, con límites | Completas |
| Presencia en tiendas | Limitada | Completa |

Comparación completa en [app nativa o PWA](/blog/aplicaciones-moviles-vs-web-apps-progresivas-pwa-cual-elegir).

## Cuánto cuesta

Convertir una web moderna en PWA (manifiesto, service worker, ajustes de diseño) es un trabajo acotado. Una PWA con funciones de aplicación (pedidos, cuentas, pagos) cuesta como una aplicación web; en general, menos que una app nativa para dos plataformas. Ver la [guía de precios](/blog/precios-desarrollo-web-apps-y-software-latam).

## Cómo convertir una web en PWA, paso a paso

1. **Verifica que la web use HTTPS** y cargue rápido en el celular.
2. **Crea el manifiesto** con nombre, íconos en varios tamaños, color de tema y modo de visualización.
3. **Registra un service worker** que guarde en caché las pantallas principales y defina qué mostrar sin conexión.
4. **Ajusta el diseño** para que funcione bien a pantalla completa.
5. **Prueba la instalación** en Android y en iPhone.
6. **Agrega notificaciones** si aportan valor, pidiendo permiso en el momento oportuno.

## Cuándo conviene

| Situación | ¿PWA? |
| --- | --- |
| Clientes que te usan de vez en cuando y te encuentran en Google | Sí |
| Presupuesto ajustado y necesidad de experiencia tipo app | Sí |
| Validar una idea antes de invertir en una app | Sí |
| Uso intensivo de hardware o funciones avanzadas en iPhone | Mejor app nativa |
| Necesitas estar en App Store para que te encuentren | Mejor app |

## Preguntas frecuentes

### ¿Qué es una PWA?

Una aplicación web que se puede instalar en el teléfono o la computadora, con ícono, pantalla completa, funcionamiento parcial sin conexión y notificaciones, sin pasar por las tiendas de apps.

### ¿Cómo se instala una PWA?

En Android, desde el aviso o el menú "Instalar aplicación" del navegador. En iPhone, desde Safari con "Compartir" y "Agregar a pantalla de inicio".

### ¿Las PWA funcionan en iPhone?

Sí, con algunas limitaciones. Desde iOS 16.4 pueden recibir notificaciones si el usuario las instaló en la pantalla de inicio.

### ¿Una PWA es más barata que una app?

En general sí: es una sola web para todos los dispositivos, sin publicación ni mantenimiento en tiendas.

## Tu web como app

En Websy convertimos webs en PWA y desarrollamos aplicaciones web instalables. Mira la [guía de desarrollo web](/blog/guia-desarrollo-web-para-empresas), la [guía de apps](/blog/guia-desarrollo-de-aplicaciones-moviles-para-empresas) o [escríbenos](/contacto).
