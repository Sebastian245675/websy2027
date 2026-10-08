**Una arquitectura multi-tenant es la forma en que un SaaS atiende a muchos clientes (tenants) con la misma aplicación, manteniendo los datos de cada uno separados y seguros.** Hay tres modelos principales: una base de datos compartida con una columna que identifica al cliente en cada tabla, un esquema por cliente dentro de la misma base, o una base de datos por cliente. La elección define el costo, la seguridad, la facilidad de mantenimiento y cuánto puede crecer la plataforma.

Esta guía es para equipos técnicos y fundadores: compara los tres modelos, explica cómo garantizar el aislamiento de datos, cómo resolver la identificación del tenant, las migraciones, la personalización por cliente y los problemas que aparecen al escalar.

## Los tres modelos de multi-tenancy

| Modelo | Cómo funciona | Ventajas | Desventajas | Conviene para |
| --- | --- | --- | --- | --- |
| Base compartida, tablas compartidas | Cada fila tiene un `tenant_id` | Simple, barato, fácil de migrar | Un error en una consulta puede exponer datos de otro cliente | La mayoría de los SaaS para pymes |
| Esquema por tenant | Cada cliente tiene su esquema en la misma base | Mejor aislamiento lógico | Migraciones en muchos esquemas, límites con miles de clientes | Decenas o cientos de clientes con requisitos de separación |
| Base de datos por tenant | Cada cliente tiene su propia base | Máximo aislamiento, copias y restauración por cliente | Más costo y operación | Clientes grandes, regulados o con requisitos contractuales |

Es posible combinar: la mayoría de los clientes en la base compartida y los clientes grandes en una base dedicada.

## Aislamiento de datos: la regla de oro

En el modelo compartido, toda consulta debe filtrar por el tenant. Dejarlo librado a que cada desarrollador se acuerde es la causa número uno de fugas de datos entre clientes. Formas de garantizarlo:

- **Row Level Security (RLS) en PostgreSQL**: la base de datos aplica el filtro por tenant en cada consulta, según una variable de sesión. Aunque el código olvide el filtro, la base no devuelve filas de otro cliente.
- **Una capa de acceso a datos única** que agrega el filtro automáticamente.
- **Pruebas automáticas** que intentan leer datos de otro tenant y deben fallar.

## Cómo se identifica el tenant

| Método | Ejemplo | Comentario |
| --- | --- | --- |
| Subdominio | cliente.tusaas.com | Claro para el usuario, requiere certificados comodín |
| Dominio propio | app.cliente.com | Profesional, más configuración |
| Ruta | tusaas.com/cliente | Simple |
| Usuario | El tenant sale de la cuenta del usuario | Útil si un usuario pertenece a un solo cliente |

El tenant identificado debe validarse contra los permisos del usuario en cada pedido, no solo leerse de la URL.

## Migraciones y versiones

- Con base compartida, una migración se aplica una vez.
- Con esquema o base por tenant, hay que aplicarla en todos, con un proceso automatizado y la posibilidad de reanudar si falla a mitad.
- Todos los clientes deberían estar en la misma versión del esquema; mantener versiones distintas multiplica el trabajo.

## Personalización por cliente

Los clientes piden cambios. Para que el producto no se divida en versiones distintas:

- **Configuración, no código**: campos personalizados, flujos configurables, permisos.
- **Funciones activables por plan** (feature flags).
- **Marca blanca** con logo y colores por tenant, si el modelo de negocio lo necesita.

## Escalar

| Problema | Solución habitual |
| --- | --- |
| Un cliente grande afecta a los demás ("vecino ruidoso") | Límites de uso por tenant, colas de trabajo, mover el tenant a recursos dedicados |
| La base compartida crece mucho | Índices por `tenant_id`, particionado, réplicas de lectura |
| Tareas pesadas (reportes, importaciones) | Procesamiento en segundo plano con colas |
| Copias y restauración de un solo cliente | Exportaciones por tenant o base dedicada para quien lo requiera |

## Seguridad y cumplimiento

- Registros de acceso por tenant.
- Cifrado en tránsito y en reposo.
- Copias de seguridad probadas.
- Borrado de datos cuando un cliente se va, según contrato y ley de datos personales.
- Pruebas de seguridad periódicas. Ver [OWASP Top 10](/blog/ciberseguridad-web-owasp-top-10-como-proteger-tu-pagina-o-app) y [seguridad en bases de datos](/blog/seguridad-en-bases-de-datos-postgresql-y-mysql-para-empresas).

## Preguntas frecuentes

### ¿Qué es una arquitectura multi-tenant?

La forma en que una aplicación SaaS sirve a muchos clientes con el mismo sistema, manteniendo separados los datos de cada uno.

### ¿Qué modelo multi-tenant conviene?

Para la mayoría de los SaaS para pymes, la base compartida con identificador de tenant y Row Level Security. Para clientes regulados o muy grandes, una base dedicada.

### ¿Qué es Row Level Security?

Una función de PostgreSQL que aplica reglas de acceso por fila. En un SaaS, permite que la base de datos solo devuelva las filas del tenant actual, aunque el código olvide filtrar.

### ¿Se puede cambiar de modelo después?

Se puede, pero es costoso. Conviene diseñar desde el inicio con un identificador de tenant en todas las tablas y una capa de acceso a datos que permita mover clientes a recursos dedicados.

## Diseñamos tu plataforma SaaS

En Websy diseñamos y desarrollamos plataformas SaaS con aislamiento de datos y cobros recurrentes. Mira [cómo crear un SaaS](/blog/como-crear-un-saas-desde-cero-guia-tecnica-negocio) o [escríbenos](/contacto).
