Procesar cobros de forma fluida y segura es el corazón de cualquier tienda e-commerce. Si tu pasarela falla o resulta confusa, los usuarios abandonarán el carrito en el último segundo.

En esta guía explicamos cómo integrar **MercadoPago (para Argentina y Latinoamérica)** y **Stripe (para facturación internacional en dólares)** en tu e-commerce.

---

## 1. MercadoPago: Checkout API Transparente vs. Checkout Pro

- **Checkout Pro (Redirección)**: Envía al cliente a la página externa de MercadoPago para pagar. Es fácil de instalar pero genera fricción visual.
- **Checkout API (Transparente)**: El cliente ingresa los datos de su tarjeta de crédito o débito directamente en tu propio sitio web, manteniendo la identidad visual de tu marca y aumentando la tasa de conversión hasta un **25%**.

---

## 2. Ejemplo Práctico: Integración de MercadoPago Checkout API (Node.js)

```javascript
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);

export async function crearPagoTarjeta(req, res) {
  try {
    const response = await payment.create({
      body: {
        transaction_amount: Number(req.body.transaction_amount),
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
        payment_method_id: req.body.payment_method_id,
        payer: { email: req.body.email }
      }
    });

    res.json({ status: response.status, id: response.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## 3. Stripe: Cobros Internacionales con Apple Pay y Google Pay

Para vender servicios o productos físicos a clientes de Estados Unidos, Europa o globalmente, **Stripe Elements** permite aceptar tarjetas internacionales, Apple Pay, Google Pay y Klarna en milisegundos con verificación 3D Secure 2.0.

---

En [Websy integramos pasarelas de pago seguras en e-commerce a medida](/servicios/ecommerce). [Contactá a nuestro equipo](/contacto).
