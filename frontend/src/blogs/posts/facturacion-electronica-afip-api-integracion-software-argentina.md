**Para integrar la factura electrónica de ARCA (ex AFIP) en un software, tu sistema se autentica en el WSAA con un certificado digital para obtener un ticket de acceso (token y sign), y con ese ticket llama al web service de facturación electrónica (WSFEv1) para consultar el último número de comprobante y solicitar el CAE de cada factura.** Todo se prueba primero en el ambiente de homologación y recién después se pasa a producción.

Esta guía es para desarrolladores y equipos técnicos: arquitectura de la integración, cómo generar el certificado, el flujo de autenticación y emisión, los métodos principales, el manejo de errores y lo que suele fallar en producción. Si buscás la visión de negocio, mirá [automatizar la facturación electrónica](/blog/automatizar-facturacion-electronica-argentina-afip-sistema-web).

## Las piezas de la integración

| Pieza | Qué es | Para qué se usa |
| --- | --- | --- |
| Certificado digital | Certificado X.509 emitido por ARCA a partir de tu CSR | Firmar el pedido de autenticación |
| WSAA | Web Service de Autenticación y Autorización | Obtener el ticket de acceso para un servicio |
| Ticket de acceso (TA) | Token y sign con vencimiento | Autenticar cada llamada al servicio de negocio |
| WSFEv1 | Web service de factura electrónica (mercado interno) | Emitir comprobantes A, B, C y obtener el CAE |
| Punto de venta para web services | Punto de venta habilitado en ARCA | Numerar los comprobantes emitidos por el sistema |
| Homologación y producción | Dos ambientes separados con URLs y certificados propios | Probar sin emitir comprobantes reales |

Para exportación (factura E) existe un web service específico, distinto de WSFEv1.

## Generar el certificado

1. Generá una clave privada y un pedido de certificado (CSR) con OpenSSL, con el CUIT en el campo correspondiente del sujeto.
2. En el sitio de ARCA, con clave fiscal, usá el servicio de administración de certificados digitales para subir el CSR y descargar el certificado.
3. Con el administrador de relaciones de clave fiscal, autorizá ese certificado para el servicio de facturación electrónica.
4. Guardá la clave privada en el servidor como secreto: nunca en el repositorio de código.

En homologación el proceso es similar, con el certificado de testing.

## Flujo de autenticación (WSAA)

1. Tu sistema arma un "ticket de requerimiento de acceso" (un XML con el servicio pedido, por ejemplo `wsfe`, y una ventana de tiempo).
2. Lo firma con el certificado y la clave privada (formato CMS/PKCS#7).
3. Lo envía al WSAA, que devuelve el ticket de acceso con `token`, `sign` y su vencimiento.
4. **Guardá el ticket y reutilizalo** hasta que venza: pedir uno nuevo en cada factura es un error frecuente y el WSAA rechaza pedidos repetidos mientras el anterior sigue vigente.

## Flujo de emisión (WSFEv1)

1. **Consultar el último comprobante autorizado** para el punto de venta y tipo de comprobante (`FECompUltimoAutorizado`).
2. **Armar el comprobante** con el número siguiente, la fecha, el concepto (productos, servicios o ambos), el documento del receptor, los importes (neto, IVA discriminado según el tipo, total) y, si corresponde, las fechas de servicio.
3. **Solicitar el CAE** (`FECAESolicitar`).
4. **Leer el resultado**: aprobado, rechazado u observado, con el CAE y su vencimiento si se aprobó.
5. **Generar el PDF** con el código QR que exige ARCA.
6. **Guardar todo** asociado a la venta: número, CAE, vencimiento, respuesta completa.

Los métodos auxiliares (tipos de comprobante, alícuotas de IVA, tipos de documento, monedas) permiten validar los datos antes de enviar.

## Ejemplo de estructura en el backend

```text
FacturaService
  ├── obtenerTicket(servicio)        -> usa el TA guardado o pide uno nuevo al WSAA
  ├── ultimoNumero(ptoVta, tipo)     -> FECompUltimoAutorizado
  ├── emitir(venta)                  -> arma el comprobante y llama a FECAESolicitar
  ├── generarPdf(comprobante)        -> PDF con el QR
  └── reintentarPendientes()         -> tarea programada para comprobantes sin CAE
```

## Errores y casos a manejar

| Situación | Qué hacer |
| --- | --- |
| Rechazo por datos (importes, documento, tipo) | Mostrar el motivo, no reintentar sin corregir |
| El servicio no responde | Marcar el comprobante como pendiente y reintentar |
| Respuesta perdida tras enviar | Antes de reintentar, consultar el último autorizado para no duplicar ni saltear números |
| Ticket de acceso vencido | Pedir uno nuevo y repetir la llamada |
| Certificado vencido | Alertas con anticipación y procedimiento de renovación |
| Ventas simultáneas | Serializar la emisión por punto de venta para no tomar el mismo número |

## Buenas prácticas

- **Una cola de emisión por punto de venta**, para evitar números duplicados con ventas concurrentes.
- **Logs de cada request y response** (sin datos sensibles innecesarios) para auditar.
- **Separación de ambientes** con configuración, nunca con cambios en el código.
- **Notas de crédito asociadas** al comprobante original para devoluciones.
- **Alertas** de certificado próximo a vencer y de comprobantes pendientes.
- **Seguir las novedades de ARCA**: los web services incorporan campos y validaciones nuevas cada tanto, y la documentación oficial es la referencia.

## Preguntas frecuentes

### ¿Qué es el WSFEv1?

Es el web service de factura electrónica de ARCA para el mercado interno. Permite solicitar el CAE de comprobantes A, B y C, y consultar números y parámetros.

### ¿Qué es el WSAA?

El web service de autenticación de ARCA. Con el certificado digital se obtiene un ticket de acceso (token y sign) que habilita las llamadas al servicio de facturación.

### ¿Cuánto dura el ticket de acceso?

Tiene un vencimiento de algunas horas. Se debe guardar y reutilizar hasta que venza, en lugar de pedir uno por cada factura.

### ¿Puedo probar sin emitir facturas reales?

Sí, en el ambiente de homologación de ARCA, con un certificado de testing y URLs propias.

### ¿Conviene una librería o un servicio intermediario?

Hay librerías de código abierto en varios lenguajes y servicios que exponen una API más simple. La integración directa da más control; un intermediario ahorra tiempo de desarrollo a cambio de un costo por uso.

## Integramos ARCA en tu sistema

En Websy integramos la facturación electrónica en sistemas de gestión y tiendas online, con manejo de errores y reintentos. Mirá el servicio de [sistemas de gestión](/servicios/sistemas-gestion) o [escribinos](/contacto).
