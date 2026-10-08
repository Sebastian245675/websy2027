**La seguridad de una aplicación móvil se apoya en cinco pilares: comunicación cifrada con el servidor (HTTPS/TLS), autenticación robusta (tokens de corta duración y renovación segura), almacenamiento de datos sensibles en el almacenamiento seguro del sistema (Keychain en iOS, Keystore en Android), permisos mínimos y validación de todo en el servidor, porque el código de la app puede ser analizado y modificado.** La biometría (huella o rostro) suma comodidad y seguridad para desbloquear credenciales, pero no reemplaza a la autenticación del servidor.

En esta guía verás los riesgos más comunes de una app, cómo proteger la comunicación, la autenticación con tokens, la biometría, el almacenamiento de datos, el backend y un checklist basado en estándares reconocidos.

## Los riesgos más comunes

| Riesgo | Ejemplo | Consecuencia |
| --- | --- | --- |
| Datos sensibles guardados sin protección | Token o contraseña en almacenamiento común | Robo de sesión si el teléfono se compromete |
| Comunicación sin cifrar o mal validada | Conexión HTTP o certificados no verificados | Intercepción de datos |
| Confiar en la app para validar | El servidor acepta lo que envía la app sin verificar | Fraude, acceso a datos de otros usuarios |
| Claves de servicios dentro del código | Clave de una API con permisos amplios en la app | Uso indebido y costos |
| Autenticación débil | Sesiones que no vencen, sin protección contra fuerza bruta | Cuentas comprometidas |
| Permisos excesivos | Acceso a contactos o ubicación sin necesidad | Riesgo de privacidad y rechazo de las tiendas |

## Comunicación segura

- **Siempre HTTPS** con TLS actualizado.
- **Validación correcta de certificados**: nunca desactivarla, ni siquiera "temporalmente".
- **Certificate pinning** en apps de alto riesgo (finanzas, salud): la app solo acepta el certificado o la clave pública esperados, lo que dificulta interceptar el tráfico.

## Autenticación con tokens

Un esquema habitual y seguro:

1. El usuario inicia sesión y el servidor entrega un **token de acceso de corta duración** (por ejemplo, un JWT de minutos) y un **token de renovación** de mayor duración.
2. El token de acceso viaja en cada pedido a la API.
3. Cuando vence, la app usa el token de renovación para pedir uno nuevo.
4. El servidor puede revocar el token de renovación (por ejemplo, al cerrar sesión o al detectar un uso sospechoso).

Buenas prácticas:

- Guardar los tokens en el almacenamiento seguro del sistema.
- Rotar el token de renovación en cada uso y detectar reutilizaciones.
- Firmar los JWT con algoritmos seguros y validar firma, emisor, audiencia y vencimiento en el servidor.
- No guardar datos sensibles dentro del JWT: su contenido se puede leer.

## Biometría

La huella o el reconocimiento facial se usan para desbloquear una credencial guardada en el almacenamiento seguro (por ejemplo, el token de renovación), no como única prueba de identidad ante el servidor. Se implementan con las APIs del sistema (LocalAuthentication en iOS, BiometricPrompt en Android), que no exponen los datos biométricos a la app.

## Almacenamiento de datos en el teléfono

| Dato | Dónde guardarlo |
| --- | --- |
| Tokens y credenciales | Keychain (iOS) o Keystore / almacenamiento cifrado (Android) |
| Datos sensibles necesarios sin conexión | Base local cifrada |
| Preferencias no sensibles | Almacenamiento común |
| Contraseñas | Nunca en el teléfono |

Y evita que los datos sensibles queden en registros (logs), capturas de la vista de apps recientes o el portapapeles.

## El backend: donde se decide la seguridad

- **Validar todo en el servidor**: permisos, montos, cantidades, identidad del usuario en cada pedido.
- **Controlar el acceso a cada recurso**: que un usuario no pueda ver datos de otro cambiando un identificador en la URL.
- **Limitar intentos** de inicio de sesión y de pedidos sensibles.
- **No exponer claves con permisos amplios**: la app usa claves restringidas o pasa por tu backend.
- **Registrar y monitorear** accesos y errores.

Ver [OWASP Top 10](/blog/ciberseguridad-web-owasp-top-10-como-proteger-tu-pagina-o-app) y [seguridad en bases de datos](/blog/seguridad-en-bases-de-datos-postgresql-y-mysql-para-empresas).

## Checklist de seguridad para tu app

| Control | Revisado |
| --- | --- |
| Toda la comunicación por HTTPS con certificados validados | |
| Tokens de corta duración con renovación segura y revocable | |
| Credenciales en Keychain o Keystore | |
| Biometría para desbloquear credenciales, no como única autenticación | |
| Permisos mínimos y justificados | |
| Validación y control de acceso en el servidor | |
| Sin claves con permisos amplios dentro de la app | |
| Sin datos sensibles en logs | |
| Dependencias actualizadas | |
| Pruebas de seguridad antes de cada versión importante | |

El estándar MASVS de OWASP (Mobile Application Security Verification Standard) ofrece una lista de requisitos más completa para apps de alto riesgo.

## Preguntas frecuentes

### ¿Cómo proteger una aplicación móvil?

Con comunicación cifrada, autenticación con tokens de corta duración, almacenamiento seguro de credenciales, permisos mínimos y validación de todo en el servidor.

### ¿Es seguro usar JWT en una app?

Sí, con tokens de corta duración, renovación segura y revocable, firma con algoritmos seguros, validación completa en el servidor y almacenamiento en el espacio seguro del sistema.

### ¿La huella digital es suficiente para autenticar?

Sirve para desbloquear una credencial guardada en el teléfono, pero la autenticación ante el servidor sigue dependiendo de tokens válidos.

### ¿Dónde guardo el token en el teléfono?

En el Keychain de iOS y en el Keystore o almacenamiento cifrado de Android, no en el almacenamiento común.

## Apps seguras desde el diseño

En Websy desarrollamos apps con seguridad en la app y en el servidor. Mira la [guía de desarrollo de apps](/blog/guia-desarrollo-de-aplicaciones-moviles-para-empresas) o [escríbenos](/contacto).
