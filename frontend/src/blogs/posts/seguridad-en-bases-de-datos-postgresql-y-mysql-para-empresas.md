**La seguridad de una base de datos de empresa (PostgreSQL, MySQL u otra) se basa en: que no sea accesible desde internet, que cada aplicación y persona tenga su propio usuario con los permisos mínimos, que las consultas usen parámetros para evitar inyección SQL, que las conexiones y las copias estén cifradas, que haya copias de seguridad automáticas y probadas, y que los accesos queden registrados.** La mayoría de las filtraciones de datos de pymes vienen de bases expuestas, contraseñas compartidas o copias de seguridad olvidadas en lugares públicos.

En esta guía tienes las medidas por capa (red, usuarios, aplicación, datos, copias y monitoreo), ejemplos concretos para PostgreSQL y MySQL, y un checklist para revisar con tu equipo o proveedor.

## Capa 1: red

- **La base de datos no debe estar expuesta a internet**: solo los servidores de la aplicación deben poder conectarse.
- **Firewall o reglas de red** que limiten las IP permitidas.
- **Conexiones cifradas** (TLS) entre la aplicación y la base.
- **Acceso administrativo** por VPN o túnel seguro, no abriendo el puerto a todo el mundo.

## Capa 2: usuarios y permisos

| Usuario | Permisos |
| --- | --- |
| Aplicación (lectura y escritura) | Solo las tablas y operaciones que usa, sin permisos de administración |
| Reportes | Solo lectura, idealmente sobre una réplica |
| Migraciones | Permisos para cambiar estructura, usado solo al desplegar |
| Administradores | Usuarios individuales, con verificación adicional |

Nunca uses el usuario administrador (postgres o root) en la aplicación, ni compartas una misma contraseña entre personas.

## Capa 3: la aplicación

- **Consultas parametrizadas** o un ORM que las use: evita la inyección SQL, uno de los ataques más conocidos.
- **Validar permisos en cada consulta**: que un usuario solo lea sus datos. En SaaS con varios clientes, Row Level Security de PostgreSQL aplica ese filtro en la propia base. Ver [arquitectura multi-tenant](/blog/desarrollo-de-software-saas-multi-tenant-guia-arquitectura).
- **Credenciales en variables de entorno o gestores de secretos**, nunca en el código.

## Capa 4: los datos

| Dato | Cómo protegerlo |
| --- | --- |
| Contraseñas de usuarios | Hash con algoritmos diseñados para contraseñas (bcrypt, Argon2) |
| Datos sensibles (salud, documentos) | Cifrado de columna o de disco, acceso restringido |
| Datos de tarjetas | No guardarlos: usar la pasarela de pago |
| Datos que ya no se usan | Eliminarlos o anonimizarlos según la política de retención |

## Capa 5: copias de seguridad

- **Automáticas y frecuentes**, con copias diarias y la posibilidad de restaurar a un punto en el tiempo si el servicio lo permite.
- **Guardadas fuera del servidor** de la base y cifradas.
- **Probadas**: restaurar periódicamente en un entorno de prueba. Una copia que nunca se restauró no es una copia confiable.
- **Nunca en carpetas públicas** del servidor web.

## Capa 6: monitoreo y auditoría

- Registro de conexiones y errores de autenticación.
- Alertas ante muchos intentos fallidos o consultas inusuales.
- Revisión periódica de usuarios y permisos.
- Actualizaciones de seguridad del motor de base de datos.

## Específico de PostgreSQL y MySQL

| Tema | PostgreSQL | MySQL |
| --- | --- | --- |
| Control de acceso por red | pg_hba.conf | Usuarios por host y bind-address |
| Seguridad por fila | Row Level Security nativo | Se resuelve en la aplicación o con vistas |
| Cifrado de conexiones | TLS configurable y exigible por usuario | TLS configurable y exigible por usuario |
| Auditoría | Extensiones como pgAudit | Plugins de auditoría según la edición |

En servicios administrados, buena parte de esto se configura desde el panel del proveedor.

## Checklist

| Control | Revisado |
| --- | --- |
| Base sin acceso desde internet | |
| Conexiones cifradas | |
| Usuarios separados con permisos mínimos | |
| Sin usuario administrador en la aplicación | |
| Consultas parametrizadas | |
| Contraseñas con hash seguro | |
| Copias automáticas, cifradas y probadas | |
| Registros y alertas de acceso | |
| Motor actualizado | |

## Preguntas frecuentes

### ¿Cómo proteger una base de datos?

Sin acceso desde internet, con usuarios y permisos mínimos, consultas parametrizadas, cifrado de conexiones y datos sensibles, copias de seguridad probadas y monitoreo.

### ¿Qué es la inyección SQL?

Un ataque en el que se introducen instrucciones SQL en un formulario o URL para leer o modificar la base de datos. Se previene con consultas parametrizadas.

### ¿Cada cuánto hay que hacer copias de seguridad?

Al menos diarias para sistemas con datos que cambian cada día, y con restauración a un punto en el tiempo si el servicio lo permite. Lo importante es probar que se pueden restaurar.

### ¿Es más segura una base de datos en la nube?

Un servicio administrado bien configurado suele ser más seguro que un servidor propio sin mantenimiento, porque incluye actualizaciones, copias y cifrado. La configuración de accesos sigue siendo responsabilidad tuya.

## Datos protegidos

En Websy diseñamos sistemas con estas medidas desde el inicio. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web), la [ley de protección de datos personales](/blog/como-proteger-datos-clientes-empresa-ley-proteccion-datos) o [escríbenos](/contacto).
