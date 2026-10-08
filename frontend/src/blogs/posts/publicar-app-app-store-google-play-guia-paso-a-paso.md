**Para publicar una app necesitas una cuenta de desarrollador en cada tienda (Google Play Console por USD 25 una sola vez y Apple Developer Program por USD 99 al año), la app compilada y firmada, una ficha con nombre, descripción, capturas e ícono, una política de privacidad y la declaración de qué datos usa la app; después la envías a revisión.** Google suele aprobar en pocos días; Apple revisa con más detalle y puede pedir cambios antes de publicar.

En esta guía tienes el paso a paso para cada tienda, los requisitos que más rechazos generan, cómo preparar la ficha para que la app se descargue y qué hacer después del lanzamiento.

## Antes de empezar: cuentas a nombre de la empresa

| Tienda | Costo | Requisitos para empresas |
| --- | --- | --- |
| Google Play Console | USD 25, pago único | Datos de la organización y verificación de identidad |
| Apple Developer Program | USD 99 por año | Número D-U-N-S de la empresa, sitio web y datos legales |

Abre las cuentas a nombre de tu empresa, no del desarrollador. Si la relación con el proveedor termina, la app sigue siendo tuya. El número D-U-N-S para Apple es gratuito pero puede tardar en emitirse: pídelo con anticipación.

## Paso a paso en Google Play

1. **Crea la app** en Play Console: nombre, idioma, si es app o juego, gratuita o paga.
2. **Completa el contenido de la app**: política de privacidad, acceso para revisión (usuario de prueba si hay login), anuncios, clasificación de contenido, público objetivo y la sección de seguridad de datos.
3. **Sube la app** en formato Android App Bundle (AAB), firmada.
4. **Prueba** en un canal interno o cerrado. Las cuentas personales nuevas deben hacer una prueba cerrada con un grupo de testers durante un período mínimo antes de poder publicar en producción; revisa el requisito vigente.
5. **Prepara la ficha**: título, descripción breve, descripción completa, ícono, imagen destacada y capturas.
6. **Envía a revisión** y publica en producción (completa o gradual).

## Paso a paso en App Store

1. **Registra el identificador de la app** (bundle ID) y crea la app en App Store Connect.
2. **Sube la compilación** desde Xcode o un servicio de compilación en la nube.
3. **Prueba con TestFlight**, con testers internos y externos.
4. **Completa la ficha**: nombre, subtítulo, palabras clave, descripción, capturas para los tamaños requeridos, ícono.
5. **Completa la privacidad**: política de privacidad y las etiquetas de privacidad (qué datos recolecta la app y para qué).
6. **Indica cómo revisar la app**: usuario de prueba y notas para el revisor.
7. **Envía a revisión** y elige si publicar automáticamente al aprobarse.

## Requisitos que más rechazos generan

| Motivo | Cómo evitarlo |
| --- | --- |
| La app falla o tiene funciones incompletas | Probar todos los flujos antes de enviar |
| Falta un usuario de prueba para entrar | Incluirlo en las notas de revisión |
| Permisos sin justificación | Pedir solo los necesarios y explicar para qué |
| No permite eliminar la cuenta | Si la app permite crear cuenta, debe permitir borrarla desde la app |
| Política de privacidad ausente o incompleta | Enlace accesible y coherente con lo declarado |
| La app es solo una web dentro de un contenedor | Aportar funciones propias de app (en App Store es motivo frecuente de rechazo) |
| Pagos de contenido digital fuera del sistema de la tienda | Usar las compras dentro de la app cuando corresponde |
| Datos declarados que no coinciden con lo que hace la app | Revisar las etiquetas de privacidad y la sección de seguridad de datos |

## Cómo preparar una ficha que se descargue

- **Nombre** con la marca y, si suma, la función principal.
- **Capturas que cuenten una historia**: el beneficio principal primero, con textos cortos.
- **Descripción** que empiece por lo que resuelve la app.
- **Ícono simple** y reconocible en tamaño chico.
- **Palabras clave** (en App Store) y descripción (en Google Play) con las búsquedas de tus usuarios.

Ver [qué es ASO](/blog/app-store-optimization-aso-como-posicionar-tu-app).

## Después del lanzamiento

- **Responde las reseñas**, sobre todo las negativas.
- **Monitorea errores y cierres** con herramientas de reporte de fallos.
- **Publica actualizaciones** con correcciones y mejoras.
- **Cumple los requisitos anuales**: Google exige compilar para versiones recientes de Android y Apple para versiones recientes de iOS. Ver [cuánto cuesta mantener una app](/blog/cuanto-cuesta-mantener-una-aplicacion-movil-servidores-y-licencias).

## Preguntas frecuentes

### ¿Cuánto cuesta publicar una app?

USD 25 por única vez en Google Play y USD 99 por año en App Store.

### ¿Cuánto tarda la revisión?

Google suele aprobar en pocos días. Apple también responde en general en pocos días, pero es más estricto y puede pedir cambios que demoran la publicación.

### ¿Puedo publicar una app a mi nombre y después pasarla a la empresa?

Se puede transferir, pero es un trámite. Es más simple crear las cuentas a nombre de la empresa desde el inicio.

### ¿Por qué Apple rechazó mi app?

Los motivos más comunes son errores, funciones incompletas, falta de usuario de prueba, permisos injustificados, privacidad incompleta, no permitir eliminar la cuenta o ser solo una web dentro de una app.

## Publicamos tu app

En Websy desarrollamos y publicamos apps en Google Play y App Store, con las cuentas a nombre de tu empresa. Mira la [guía de desarrollo de apps](/blog/guia-desarrollo-de-aplicaciones-moviles-para-empresas) o [escríbenos](/contacto).
