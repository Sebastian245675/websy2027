**REST organiza una API en recursos con URLs y métodos HTTP (GET, POST, PATCH, DELETE), es simple, fácil de cachear y es el estándar más usado; GraphQL expone un único punto de acceso donde el cliente pide exactamente los campos que necesita en una consulta, lo que evita traer datos de más o hacer muchos pedidos, a cambio de más complejidad en el servidor.** Para la mayoría de los sistemas de pymes e integraciones con terceros, REST es suficiente; GraphQL rinde en aplicaciones con pantallas que combinan muchos datos relacionados y varios clientes (web, app) con necesidades distintas.

En esta guía comparamos los dos enfoques con ejemplos, vemos cuándo conviene cada uno y explicamos cómo encajan los microservicios y cuándo no conviene usarlos.

## Comparativa

| Criterio | REST | GraphQL |
| --- | --- | --- |
| Punto de acceso | Una URL por recurso | Un solo endpoint |
| Qué datos devuelve | Lo que define el servidor para ese recurso | Exactamente lo que pide el cliente |
| Pedidos para armar una pantalla | Puede requerir varios | Normalmente uno |
| Caché HTTP | Simple | Requiere estrategias propias |
| Curva de aprendizaje | Baja | Media |
| Errores | Códigos HTTP estándar | Dentro de la respuesta |
| Herramientas | Universales | Muy buenas, más específicas |
| Ideal para | APIs públicas, integraciones, CRUD | Apps con datos muy relacionados y varios clientes |

## Ejemplo: la misma pantalla con REST y con GraphQL

Pantalla: el pedido de un cliente con sus productos y el estado del envío.

**Con REST** podrían ser tres pedidos:

```text
GET /pedidos/45
GET /pedidos/45/productos
GET /envios?pedido=45
```

**Con GraphQL**, una consulta:

```graphql
query {
  pedido(id: 45) {
    estado
    total
    productos { nombre cantidad }
    envio { empresa seguimiento estado }
  }
}
```

REST puede resolverlo también con un endpoint que devuelva todo junto; GraphQL lo resuelve por diseño.

## Cuándo conviene cada uno

| Situación | Recomendación |
| --- | --- |
| API para integraciones con otros sistemas o terceros | REST |
| Sistema de gestión con pantallas tipo CRUD | REST |
| App móvil y web con pantallas que combinan muchos datos | GraphQL |
| Muchos clientes distintos consumiendo la misma API | GraphQL |
| Equipo chico que necesita avanzar rápido | REST |

## Microservicios: cuándo sí y cuándo no

Una arquitectura de microservicios divide el sistema en servicios independientes (pedidos, pagos, usuarios), cada uno con su base de datos y su despliegue.

| | Monolito bien organizado | Microservicios |
| --- | --- | --- |
| Complejidad operativa | Baja | Alta |
| Despliegue | Uno | Muchos, coordinados |
| Escalado | Todo junto | Por servicio |
| Equipos | Uno o pocos | Varios equipos independientes |
| Conviene para | La mayoría de las pymes y startups | Sistemas grandes con equipos grandes |

Para la mayoría de los proyectos de pymes, un monolito modular (un solo sistema bien dividido por dentro) es más rápido de desarrollar y más barato de mantener. Los microservicios tienen sentido cuando el sistema y el equipo crecen tanto que un solo despliegue se vuelve un cuello de botella.

## Webhooks: el complemento de cualquier API

Además de consultar una API, muchos sistemas avisan de eventos con webhooks: Mercado Pago avisa que un pago se aprobó, una plataforma de envíos avisa que el paquete se entregó. Tu sistema recibe el aviso, lo verifica y actúa. Ver [qué es una API REST](/blog/api-rest-que-es-como-funciona-guia-principiantes).

## Buenas prácticas para cualquier API

- Autenticación y permisos verificados en cada pedido.
- Validación de datos de entrada.
- Límites de uso y paginación.
- Versionado para no romper integraciones.
- Documentación con ejemplos.
- Monitoreo de errores y tiempos de respuesta.

## Errores comunes al diseñar una API

| Error | Consecuencia | Cómo evitarlo |
| --- | --- | --- |
| No verificar permisos por recurso | Un usuario accede a datos de otro | Validar en el servidor en cada pedido |
| Devolver listas sin paginar | Respuestas lentas y servidores saturados | Paginación y límites |
| Cambiar respuestas sin versionar | Se rompen las integraciones existentes | Versiones o cambios compatibles |
| Mensajes de error genéricos | Integraciones difíciles de depurar | Códigos y mensajes claros |
| En GraphQL, consultas sin límite de profundidad | Consultas que tiran el servidor | Límites de complejidad y profundidad |

## Preguntas frecuentes

### ¿Qué es mejor, REST o GraphQL?

Ninguno es mejor en general. REST es más simple y universal; GraphQL es más eficiente para pantallas que combinan muchos datos y para varios clientes con necesidades distintas.

### ¿GraphQL reemplaza a REST?

No. Conviven: muchas empresas usan REST para integraciones con terceros y GraphQL para sus propias aplicaciones.

### ¿Qué son los microservicios?

Una arquitectura que divide un sistema en servicios pequeños e independientes. Da flexibilidad a sistemas y equipos grandes, a cambio de más complejidad.

### ¿Una pyme necesita microservicios?

En general no. Un sistema único bien organizado es más rápido de desarrollar y más barato de mantener.

## Diseñamos tu API

En Websy desarrollamos APIs REST y GraphQL para sistemas, apps e integraciones. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
