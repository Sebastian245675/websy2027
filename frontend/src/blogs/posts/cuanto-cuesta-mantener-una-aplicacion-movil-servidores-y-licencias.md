**Mantener una app móvil publicada cuesta, como mínimo, USD 99 por año de la cuenta de desarrollador de Apple, más el servidor y la base de datos (desde unos pocos dólares por mes en apps chicas) y las actualizaciones que Google y Apple exigen cada año.** A eso se suman los servicios que usa la app (mapas, SMS, notificaciones) y el soporte para corregir errores y sumar mejoras.

Muchas empresas presupuestan el desarrollo de la app y se olvidan de lo que viene después. En esta guía están todos los costos recurrentes, por qué no se pueden evitar y cómo estimarlos para que la app siga funcionando sin sorpresas.

## Resumen de costos de mantenimiento

| Concepto | Costo | Frecuencia | ¿Se puede evitar? |
| --- | --- | --- | --- |
| Cuenta de desarrollador de Apple | USD 99 | Anual | No, si la app está en App Store |
| Cuenta de desarrollador de Google Play | USD 25 | Única vez | No |
| Servidor y base de datos | Desde pocos dólares a cientos | Mensual | No, si la app guarda datos |
| Servicios externos (mapas, SMS, correo, notificaciones) | Muchos tienen capa gratuita; cobran por uso | Mensual | Depende de las funciones |
| Actualizaciones obligatorias | Horas de desarrollo | Al menos una vez por año | No: las tiendas las exigen |
| Soporte y mejoras | Según el plan contratado | Mensual o por pedido | Se puede ajustar |
| Comisiones de las tiendas | Porcentaje de las ventas digitales | Por venta | Solo aplica si vendes contenido digital |

## Las cuentas de las tiendas

Para publicar en App Store hay que pagar el Apple Developer Program: USD 99 por año. Si no se renueva, la app deja de estar disponible para descargar. Google Play cobra USD 25 por única vez. Las dos cuentas conviene que estén a nombre de tu empresa, no del desarrollador: si cambias de proveedor, la app sigue siendo tuya.

## El servidor: el costo que crece con los usuarios

Casi toda app guarda datos en algún lado: usuarios, pedidos, turnos, mensajes. Eso vive en un servidor y una base de datos. Hay dos formas de pagarlo:

- **Servicios administrados** como Firebase o Supabase: tienen un plan gratuito generoso para empezar y cobran por uso a medida que la app crece. Son ideales para lanzar.
- **Servidor propio** en AWS, Google Cloud, DigitalOcean u otro proveedor: cuesta un monto mensual fijo según la capacidad y requiere que alguien lo administre.

Una app con cientos de usuarios puede funcionar con pocos dólares por mes. Una con decenas de miles de usuarios activos y operación en tiempo real necesita bastante más. Lo importante es elegir una arquitectura que pueda crecer sin rehacerse. Comparamos proveedores en [AWS vs Vercel vs Firebase](/blog/aws-vs-vercel-vs-firebase-donde-alojar-tu-proyecto-web-app).

## Las actualizaciones obligatorias

Este es el costo que más sorprende. Cada año Apple y Google publican nuevas versiones de iOS y Android y, con el tiempo, exigen que las apps se compilen con versiones recientes de sus herramientas. Si la app no se actualiza:

- Google Play puede dejar de mostrarla a los usuarios con teléfonos nuevos.
- Apple puede rechazar las nuevas versiones hasta que se actualice el proyecto.
- Las librerías que usa la app dejan de recibir parches de seguridad.

Por eso conviene presupuestar al menos una actualización técnica por año, aunque la app no cambie de funciones.

## Servicios que cobran por uso

| Servicio | Para qué | Cómo cobra |
| --- | --- | --- |
| Notificaciones push | Avisos a los usuarios | Firebase Cloud Messaging no tiene costo por envío; otros servicios cobran por volumen |
| Mapas y geolocalización | Mostrar ubicaciones, calcular rutas | Google Maps Platform cobra por carga o consulta por encima de un crédito mensual |
| SMS de verificación | Códigos de acceso | Por mensaje enviado, según el país |
| Correo transaccional | Confirmaciones, recuperación de contraseña | Capa gratuita y luego por volumen |
| Almacenamiento de archivos | Fotos y documentos de los usuarios | Por gigabyte almacenado y transferido |

Antes de lanzar, pide a tu proveedor la lista de servicios externos de la app y cómo cobra cada uno. Así sabes qué costo crece cuando crecen los usuarios.

## Comisiones de Google Play y App Store

Si la app vende contenido o funciones digitales (suscripciones, créditos, versiones premium), las tiendas exigen usar su sistema de pago y cobran una comisión, que en general va del 15% al 30% según el programa y el tipo de venta. Si vendes productos físicos o servicios que se consumen fuera de la app (un pedido de comida, un turno, un viaje), puedes cobrar con tu propia pasarela, como Mercado Pago o Stripe, sin esa comisión. Más en [cómo monetizar una app](/blog/como-monetizar-una-app-movil-suscripciones-anuncios-in-app-purchases).

## Cómo presupuestar el mantenimiento

1. **Separa lo fijo de lo variable**: cuentas de las tiendas y servidor base son fijos; los servicios por uso crecen con la app.
2. **Reserva horas de desarrollo**: para la actualización anual obligatoria y para corregir errores.
3. **Define un plan de soporte**: tiempo de respuesta ante una caída y cuántas horas de mejoras incluye por mes.
4. **Revisa los costos cada trimestre**: el panel de cada servicio muestra el consumo real.

## Preguntas frecuentes

### ¿Cuánto cuesta tener una app en la App Store?

USD 99 por año por la cuenta de desarrollador de Apple. Si no se renueva, la app deja de estar disponible para descargar.

### ¿Y en Google Play?

USD 25 por única vez para abrir la cuenta de desarrollador. Después, Google cobra comisión solo si vendes contenido digital dentro de la app.

### ¿Puedo dejar una app sin mantenimiento?

Por un tiempo, sí, pero no indefinidamente. Las tiendas exigen actualizar las apps para que sigan compatibles con las nuevas versiones de Android e iOS, y las librerías sin actualizar acumulan fallas de seguridad.

### ¿Cuánto cuesta el servidor de una app?

Una app chica puede funcionar dentro del plan gratuito de servicios como Firebase o Supabase, o con pocos dólares por mes. El costo crece con la cantidad de usuarios activos, los datos guardados y las funciones en tiempo real.

### ¿Las cuentas de desarrollador deben estar a mi nombre?

Sí. Si están a nombre del proveedor y la relación termina, puedes perder el control de la app publicada.

## Mantenimiento de apps con Websy

Cuando desarrollamos una app, definimos desde el inicio los costos de servidores y servicios, y ofrecemos planes de mantenimiento con las actualizaciones obligatorias incluidas. Mira el servicio de [desarrollo de apps móviles](/servicios/aplicaciones-moviles), cuánto cuesta [desarrollar una app](/blog/cuanto-cuesta-desarrollar-una-app-movil-argentina-latam) o [escríbenos](/contacto).
