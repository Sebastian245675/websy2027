**Para crear un marketplace (una plataforma donde varios vendedores ofrecen sus productos o servicios y tú cobras una comisión) necesitas resolver cuatro cosas: atraer a los dos lados (vendedores y compradores), un sistema de pagos divididos que cobre al comprador y reparta entre vendedor y plataforma, paneles para que cada vendedor gestione su catálogo y sus pedidos, y reglas de confianza (verificación, reseñas, reclamos).** Lo más difícil no es la tecnología, sino conseguir oferta y demanda al mismo tiempo; por eso conviene empezar en un nicho y una zona acotados.

En esta guía verás los modelos de marketplace, las funciones que necesita, cómo resolver los pagos y la comisión, opciones para construirlo, cómo lanzarlo y los errores más comunes.

## Modelos de marketplace

| Modelo | Ejemplo | Cómo gana la plataforma |
| --- | --- | --- |
| Productos de varios vendedores | Artesanos, repuestos, productos regionales | Comisión por venta |
| Servicios | Profesionales, oficios, clases | Comisión o suscripción de los profesionales |
| Reservas | Alojamientos, canchas, espacios | Comisión por reserva |
| B2B | Proveedores y comercios de un rubro | Comisión o suscripción |

## Funciones que necesita

### Para el comprador

- Búsqueda y filtros por categoría, zona, precio.
- Fichas de producto o perfil del vendedor con reseñas.
- Carrito con productos de varios vendedores.
- Pago único y seguimiento de cada pedido.

### Para el vendedor

- Registro y verificación.
- Panel para cargar productos, precios y stock.
- Gestión de pedidos y envíos.
- Liquidaciones: cuánto vendió, comisión descontada y cuánto cobra.

### Para la plataforma

- Aprobación de vendedores y productos.
- Configuración de comisiones por categoría o vendedor.
- Gestión de reclamos y devoluciones.
- Reportes de ventas y métricas.

## Pagos y comisiones

El punto técnico más delicado es cobrar al comprador y repartir el dinero:

| Opción | Cómo funciona | Consideración |
| --- | --- | --- |
| Pagos divididos de la pasarela | La pasarela cobra y separa la parte del vendedor y la comisión | Disponible en pasarelas como Mercado Pago (modelo marketplace) o Stripe Connect, según país |
| Cobra la plataforma y liquida después | La plataforma recibe todo y paga a los vendedores periódicamente | Implica manejo de fondos de terceros, con implicancias fiscales y legales |

Consulta con un contador y, si corresponde, un abogado cómo facturar comisiones y ventas en tu país antes de definir el modelo.

## Construirlo: opciones

| Opción | Ventajas | Límites |
| --- | --- | --- |
| Plataformas o extensiones de marketplace | Rápido para validar | Reglas y diseño limitados, costos por transacción |
| Desarrollo a medida | Reglas, pagos y experiencia propios | Mayor inversión inicial |

Muchos marketplaces arrancan con una versión mínima a medida, enfocada en un nicho, y amplían funciones con la tracción. Ver [cómo crear un SaaS](/blog/como-crear-un-saas-desde-cero-guia-tecnica-negocio), que comparte varias decisiones técnicas (cuentas, cobros recurrentes, multi-tenant).

## Cómo lanzar sin quedarte sin oferta o sin demanda

1. **Elige un nicho y una zona**: "productores regionales de una provincia" antes que "todo para todos".
2. **Consigue primero la oferta**: suma a mano a los primeros vendedores y ayúdalos a cargar su catálogo.
3. **Genera demanda local**: SEO de categorías, redes y alianzas.
4. **Cuida la calidad**: pocos vendedores buenos valen más que muchos mediocres.
5. **Mide la liquidez**: qué porcentaje de búsquedas termina en compra.

## Reglas de confianza

Un marketplace vive de la confianza entre desconocidos. Define desde el inicio:

| Regla | Para qué |
| --- | --- |
| Verificación de vendedores (identidad, datos fiscales) | Evitar fraudes |
| Reseñas solo de compras reales | Que las calificaciones sean creíbles |
| Política de reclamos y plazos de respuesta | Resolver problemas antes de que escalen |
| Retención del pago hasta la entrega | Proteger al comprador |
| Sanciones por incumplimiento | Mantener la calidad de la oferta |
| Términos y condiciones para compradores y vendedores | Claridad legal |

## Métricas de un marketplace

| Métrica | Qué indica |
| --- | --- |
| Volumen bruto de ventas (GMV) | Cuánto se vende a través de la plataforma |
| Ingresos por comisiones | Lo que efectivamente gana la plataforma |
| Vendedores activos | Salud de la oferta |
| Tasa de conversión de búsquedas | Si la oferta responde a la demanda |
| Recompra | Si los compradores vuelven |
| Reclamos por pedido | Calidad y confianza |

## Errores comunes

- **Lanzar en todo el país y todas las categorías**.
- **No resolver el modelo fiscal de las comisiones** antes de lanzar.
- **No controlar la calidad de los vendedores**.
- **Construir todas las funciones** antes de validar.

## Preguntas frecuentes

### ¿Cómo crear un marketplace como Mercado Libre?

Empezando por un nicho y una zona, con un sistema de pagos divididos, paneles para vendedores, reseñas y reglas de reclamos, y creciendo a medida que la plataforma demuestra que funciona.

### ¿Cuánto cuesta desarrollar un marketplace?

Depende del alcance: modelo de pagos, paneles, integraciones de envío y app móvil. Conviene empezar con un producto mínimo y ampliar con la tracción.

### ¿Cómo cobra un marketplace sus comisiones?

Con pagos divididos de la pasarela, que separan la comisión al cobrar, o cobrando todo y liquidando a los vendedores después, con las implicancias fiscales de cada modelo.

### ¿Qué es más difícil, la tecnología o conseguir vendedores y compradores?

Conseguir oferta y demanda al mismo tiempo. Por eso se empieza en un nicho, sumando vendedores a mano.

### ¿Necesito una app o alcanza con una web?

Para empezar suele alcanzar con una web rápida y adaptada al celular. La app tiene sentido cuando compradores y vendedores usan la plataforma con frecuencia y necesitan notificaciones.

## Desarrollamos tu marketplace

En Websy desarrollamos marketplaces a medida con pagos divididos y paneles para vendedores. Mira la [guía de e-commerce](/blog/guia-ecommerce-como-vender-por-internet-en-latam) o [escríbenos](/contacto).
