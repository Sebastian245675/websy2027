Automatizar la emisión de facturas electrónicas directamente al concretarse una venta es una necesidad operativa fundamental para cualquier PyME, e-commerce o sistema de gestión en Argentina.

Emitir comprobantes manualmente ingresando al portal de comprobantes en línea de AFIP para cada venta genera demoras, errores humanos y cuellos de botella en la operación. Integrar los **Web Services de AFIP (WSFE v1)** por API permite solicitar el **CAE (Código de Autorización Electrónico)** y generar facturas en PDF en milisegundos de forma transparente.

---

## 1. El Flujo Técnico de Autenticación y Facturación con AFIP

La arquitectura de comunicación con AFIP se divide en dos fases obligatorias: **WSAA (Autenticación)** y **WSFE (Facturación)**.

```
[ Sistema de Gestión Web ] ──► (Solicitá Ticket de Acceso TA al WSAA con Certificado X.509)
                                                        │
                                                        ▼
[ Token y Sign Recibido ] ───► (Consulta a WSFE v1 enviando CUIT y detalles del comprobante)
                                                        │
                                                        ▼
[ AFIP Devuelve CAE y Vencimiento ] ─► (Generación automática de Factura PDF con QR)
```

1. **Servicio WSAA (Web Service de Autenticación y Autorización)**:
   - Requiere un certificado digital privado (.crt y .key) generado desde la web de AFIP con clave fiscal.
   - Devuelve un Ticket de Acceso (Token + Sign) válido por **12 horas**, el cual debe guardarse en caché para no saturar los servidores de AFIP.
2. **Servicio WSFE v1 (Web Service de Facturación Electrónica)**:
   - Recibe los datos del comprobante (Punto de Venta, Tipo de Factura A/B/C, CUIT del comprador, Importe Neto, IVA del 21% o 10.5%).
   - Si los datos son válidos, AFIP asigna y devuelve el número de **CAE y fecha de vencimiento**.

---

## 2. Requisitos para Generación del Código QR Obligatorio de AFIP

Desde 2021, AFIP exige que todas las facturas electrónicas impresas o enviadas en PDF contengan un **código QR escaneable** que encodifique en Base64 una URL oficial con el siguiente formato JSON:

```json
{
  "ver": 1,
  "fecha": "2026-07-23",
  "cuit": 30716543219,
  "ptoVta": 5,
  "tipoCmp": 1,
  "nroCmp": 1420,
  "importe": 150000.00,
  "moneda": "PES",
  "ctz": 1,
  "tipoDocRec": 80,
  "nroDocRec": 30554433221,
  "tipoCodAut": "E",
  "codAut": 74291823910283
}
```

---

## 3. Ventajas de la Integración Automatizada de AFIP de Websy

- **Emisión Instantánea**: La factura se emite y se envía por correo o WhatsApp al cliente inmediatamente después de confirmado el pago.
- **Sincronización con MercadoPago**: Facturación automática de ventas cobradas por pasarelas de pago.
- **Soporte para Notas de Crédito y Débito**: Anulación de comprobantes con un solo clic desde el panel de control.

---

En [Websy realizamos integraciones directas con los Web Services de AFIP para sistemas web, ERP y e-commerce](/servicios/sistemas-gestion). ¿Querés automatizar la facturación de tu empresa? [Contactate con nuestro equipo técnico](/contacto).
