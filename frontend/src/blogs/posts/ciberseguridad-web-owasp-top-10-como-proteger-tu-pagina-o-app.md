**El OWASP Top 10 es la lista de referencia de los riesgos de seguridad más críticos en aplicaciones web, publicada por la fundación OWASP: incluye control de acceso roto, fallas criptográficas, inyección, diseño inseguro, configuración insegura, componentes vulnerables o desactualizados, fallas de autenticación, fallas de integridad del software y los datos, fallas de registro y monitoreo, y falsificación de solicitudes del lado del servidor (SSRF).** Sirve como lista de control para desarrollar y auditar una web o una app.

En esta guía explicamos cada riesgo con un ejemplo concreto y cómo prevenirlo, cómo usar la lista en tu proyecto y qué otras referencias existen para APIs y apps móviles. La lista se actualiza cada algunos años; aquí usamos la estructura de la edición 2021, que es la base de las siguientes.

## Los 10 riesgos, con ejemplos y prevención

| Riesgo | Ejemplo | Prevención |
| --- | --- | --- |
| 1. Control de acceso roto | Cambiar el número de pedido en la URL y ver el de otro cliente | Verificar en el servidor que cada usuario solo accede a lo suyo |
| 2. Fallas criptográficas | Contraseñas guardadas sin cifrar o datos sensibles por HTTP | HTTPS, contraseñas con algoritmos de hash adecuados, cifrado de datos sensibles |
| 3. Inyección | Un formulario que permite ejecutar consultas SQL o scripts | Consultas parametrizadas, validación y escape de datos |
| 4. Diseño inseguro | Un sistema de recuperación de contraseña adivinable | Pensar los riesgos desde el diseño, no solo en el código |
| 5. Configuración insegura | Panel de administración expuesto, mensajes de error con datos internos | Configuraciones revisadas, sin datos sensibles en errores |
| 6. Componentes vulnerables | Una librería o plugin con una falla conocida | Inventario de dependencias y actualizaciones |
| 7. Fallas de identificación y autenticación | Sin límite de intentos, sesiones que nunca vencen | Verificación en dos pasos, límites, sesiones con vencimiento |
| 8. Fallas de integridad | Actualizaciones o paquetes de fuentes no verificadas | Firmas, fuentes confiables, revisión del pipeline |
| 9. Fallas de registro y monitoreo | Un ataque que nadie detecta durante meses | Registros de eventos de seguridad y alertas |
| 10. SSRF | El servidor descarga una URL que manda el usuario y accede a recursos internos | Validar y restringir las URLs que el servidor consulta |

## Los tres más frecuentes en webs de pymes

### Control de acceso roto

Es el más común en sistemas a medida: la interfaz esconde un botón, pero el servidor no verifica permisos. La regla: el servidor valida en cada pedido si ese usuario puede ver o modificar ese recurso.

### Componentes desactualizados

Plugins, temas y librerías con fallas conocidas son la puerta de entrada de la mayoría de los ataques automáticos. Un inventario de dependencias y actualizaciones periódicas lo evita.

### Configuración insegura

Paneles de administración con contraseñas por defecto, listados de archivos públicos, copias de seguridad accesibles por URL, errores que muestran detalles internos.

## Cómo usar la lista en tu proyecto

1. **Al diseñar**: identificar qué datos son sensibles y quién debe acceder a cada cosa.
2. **Al desarrollar**: usar frameworks con protecciones por defecto (consultas parametrizadas, protección CSRF, escape de salida).
3. **Antes de publicar**: revisar la lista punto por punto y hacer pruebas de seguridad.
4. **En producción**: actualizaciones, monitoreo y revisiones periódicas.

## Otras referencias de OWASP

| Referencia | Para qué |
| --- | --- |
| OWASP API Security Top 10 | Riesgos específicos de APIs |
| OWASP MASVS | Requisitos de seguridad para apps móviles |
| OWASP ASVS | Requisitos de verificación detallados para aplicaciones web |
| OWASP Cheat Sheets | Guías prácticas por tema (autenticación, sesiones, contraseñas) |

Ver también [seguridad en aplicaciones móviles](/blog/seguridad-en-aplicaciones-moviles-cifrado-jwt-y-biometria) y [seguridad en bases de datos](/blog/seguridad-en-bases-de-datos-postgresql-y-mysql-para-empresas).

## Checklist rápido basado en el Top 10

| Control | Revisado |
| --- | --- |
| Permisos verificados en el servidor en cada pedido | |
| HTTPS en todo y contraseñas con hash seguro | |
| Consultas parametrizadas y validación de entradas | |
| Configuración de producción sin datos de depuración | |
| Dependencias actualizadas | |
| Verificación en dos pasos y límite de intentos | |
| Fuentes de paquetes y despliegues confiables | |
| Registros de seguridad y alertas | |
| Restricción de URLs que consulta el servidor | |

## Preguntas frecuentes

### ¿Qué es el OWASP Top 10?

Una lista de los riesgos de seguridad más críticos en aplicaciones web, publicada por la fundación OWASP y usada como referencia para desarrollar y auditar.

### ¿Cuál es la vulnerabilidad web más común?

El control de acceso roto, es decir, que un usuario pueda ver o modificar datos que no le corresponden porque el servidor no verifica los permisos.

### ¿El OWASP Top 10 sirve para pymes?

Sí. Es una lista práctica para revisar con tu proveedor si tu web o tu sistema tiene las protecciones básicas.

### ¿Cada cuánto se actualiza?

Cada algunos años, según la evolución de los ataques. Conviene consultar la edición vigente en el sitio de OWASP.

## Desarrollo seguro

En Websy desarrollamos webs y sistemas siguiendo las recomendaciones de OWASP. Mira cómo [proteger una página web de hackers](/blog/proteger-pagina-web-de-hackers-seguridad-web-basica), la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
