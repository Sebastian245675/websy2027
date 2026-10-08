**MercadoPago** es la pasarela de pagos #1 en Latinoamérica, operando en Argentina, Brasil, México, Colombia, Chile, Uruguay y Perú. Si vendés online en cualquiera de estos países, integrar MercadoPago es prácticamente obligatorio.

---

## Tipos de Integración de MercadoPago

### 1. Checkout Pro (Redireccionado)
El usuario hace clic en "Pagar" y es redirigido a la página de MercadoPago donde completa el pago. Es la integración más rápida (menos de 1 hora de desarrollo).

**Ventaja**: MercadoPago se encarga de todo (formulario, seguridad PCI, fraude).
**Desventaja**: El usuario sale de tu sitio, lo que puede generar abandono.

### 2. Checkout API (Transparente)
El formulario de pago se renderiza directamente dentro de tu sitio web. El usuario nunca sale de tu dominio. Requiere más desarrollo pero la tasa de conversión es significativamente mayor.

### 3. Checkout Bricks (Componentes Modulares)
MercadoPago ofrece componentes pre-construidos (Card Form, Status Screen, Wallet) que se insertan en tu web como bloques Lego. Equilibrio entre personalización y facilidad.

---

## Costos y Comisiones de MercadoPago 2026

| Medio de Pago | Comisión | Acreditación |
| --- | --- | --- |
| **Tarjeta de Crédito (1 cuota)** | 4.99% + IVA | Inmediata |
| **Tarjeta de Crédito (3-12 cuotas)** | 4.99% + financiación + IVA | Inmediata |
| **Tarjeta de Débito** | 2.99% + IVA | Inmediata |
| **Transferencia Bancaria (CBU/CVU)** | 1.49% + IVA | 1-2 días hábiles |
| **Pago en Efectivo (Rapipago/PagoFácil)** | 4.99% + IVA | 1-2 días hábiles |

---

## Webhooks: Notificaciones en Tiempo Real

MercadoPago envía webhooks (notificaciones HTTP POST) a tu servidor cuando el estado de un pago cambia. Debes implementar un endpoint que procese estos eventos:
- `payment.approved` → Confirmar la orden al cliente.
- `payment.rejected` → Notificar al cliente e intentar cobro alternativo.
- `payment.refunded` → Registrar la devolución en tu sistema.

---

En [Websy integramos MercadoPago, Stripe y pasarelas de pago en tiendas online a medida](/servicios/ecommerce). [Consultá sobre tu e-commerce](/contacto).
