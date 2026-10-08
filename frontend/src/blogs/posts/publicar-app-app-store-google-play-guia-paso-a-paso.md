Publicar una aplicación móvil en las dos tiendas principales — **Google Play Store** (para Android) y **Apple App Store** (para iOS)— requiere cumplir con un protocolo estricto de normativas de seguridad, políticas de privacidad, guías de diseño y requisitos técnicos.

El 40% de las aplicaciones subidas por primera vez son rechazadas por los revisores de Apple o Google por faltas de documentación o fallas en el flujo de autenticación. En este manual guía paso a paso te explicamos cómo preparar y subir tu app para garantizar una aprobación ágil y sin fricciones.

---

## 1. Requisitos Previos e Cuentas de Desarrollador

Antes de compilar tu proyecto para producción, debés dar de alta las cuentas oficiales de organización o desarrollador independiente en ambas plataformas.

### A. Google Play Console (Android)
- **Costo**: $25 USD (pago único por cuenta).
- **Formato del Ejecutable**: En la actualidad Google exige el formato **Android App Bundle (.aab)** en lugar del antiguo .apk.
- **Requisito de Pruebas (Google Play 2024/2026)**: Para cuentas personales creadas recientemente, Google exige que la app pase por un proceso de prueba cerrada con **al menos 20 testers durante 14 días continuos** antes de habilitar la publicación en producción.

### B. Apple Developer Program (iOS)
- **Costo**: $99 USD al año (suscripción renovable).
- **Entorno Compilación**: Requiere una computadora macOS física o en la nube para ejecutar **Xcode** y firmar los certificados de distribución con tu ID de Apple.
- **Identificador DUNS**: Si registras una cuenta de Empresa/Organización, Apple exige tramitar previamente el número DUNS internacional para verificar la existencia legal de la compañía.

---

## 2. Documentos y Requisitos Legales Obligatorios

Ambas tiendas rechazarán tu aplicación de forma inmediata si no proporcionas los siguientes enlaces públicos en la ficha de la tienda:

1. **Política de Privacidad (Privacy Policy URL)**: Debe detallar explícitamente qué datos captura la app (geolocalización, contactos, almacenamiento, cámara), cómo se cifran y cómo el usuario puede solicitar la eliminación de su cuenta y datos.
2. **URL de Soporte y Contacto**: Enlace a tu sitio web o email institucional de atención al cliente.
3. **Mecanismo de Eliminación de Cuenta en la App**: Apple exige que si tu app permite crear una cuenta de usuario, debe ofrecer un botón visible dentro de la app para **borrar la cuenta y sus datos** sin obligar al usuario a enviar un correo.

---

## 3. Guía Paso a Paso para la Publicación en Google Play Store

```
[ Compilar proyecto React Native / Flutter ] ──► (Generar bundle release .aab firmado)
                                                        │
                                                        ▼
[ Cargar .aab en Google Play Console ] ───────► (Completar ficha de la tienda y screenshots)
                                                        │
                                                        ▼
[ Enviar a Revisión Automática y Manual ] ────► (Aprobación entre 24 horas y 4 días)
```

### Paso 1: Configurar la Ficha de la Tienda (Store Listing)
- **Título**: Máximo 30 caracteres (debe incluir la palabra clave principal de tu negocio).
- **Descripción Corta**: Máximo 80 caracteres.
- **Descripción Larga**: Hasta 4.000 caracteres optimizados para SEO interno (ASO).
- **Recursos Gráficos**:
  - Ícono en alta resolución (512x512 px PNG transparente).
  - Gráfico de funciones promocional (1024x500 px).
  - Al menos 4 capturas de pantalla por cada formato de dispositivo (Teléfono y Tablet).

### Paso 2: Declaración de Permisos de Seguridad
Debes justificar por qué tu app solicita acceso a la ubicación en segundo plano, cámara o almacenamiento. Solicitudes de permisos innecesarios provocan el rechazo automático.

---

## 4. Guía Paso a Paso para la Publicación en Apple App Store

Apple realiza una **revisión manual rigurosa** de cada aplicación ejecutada por ingenieros de la compañía en Cupertino.

### Checklist Antirechazo para iOS (App Store Guidelines):
- **Cero Enlaces Rotos o Contenido de Prueba**: No subas una app con botones que digan "próximamente" o imágenes tipo *Lorem Ipsum*.
- **Credenciales de Prueba para Revisores**: Si tu app requiere inicio de sesión, debés crear una cuenta de usuario demo válida y proporcionar el usuario y contraseña en App Store Connect en el campo *Notes for Reviewer*.
- **Compras dentro de la App (In-App Purchases)**: Si vendés productos digitales o suscripciones, debés usar obligatoriamente el SDK de Apple (In-App Purchase) y no un formulario web externo de tarjeta de crédito (salvo excepciones reguladas).

---

## 5. Matriz Comparativa de Tiempos y Procesos

| Característica | Google Play Store | Apple App Store |
| --- | --- | --- |
| **Costo de Registro** | $25 USD (Único) | $99 USD / año |
| **Formato de Entrega** | Android App Bundle (.aab) | iOS App Archive (.ipa via Xcode) |
| **Tiempo Medio de Revisión** | 24 horas a 4 días | 24 a 48 horas |
| **Requisito de Testers** | 20 testers (14 días en cuentas nuevas) | Opcional (TestFlight) |
| **Revisión de Contenido** | Algorítmico + Manual | 100% Manual por Ingeniero |

---

## 6. Recomendaciones Post-Lanzamiento de Websy

Una vez aprobada tu app en ambas tiendas, asegúrate de monitorear las métricas de rendimiento y fallos (Crashes) usando herramientas como **Firebase Crashlytics**. Responder a las primeras reseñas de los usuarios en menos de 24 horas aumenta significativamente la puntuación y el posicionamiento en los rankings orgánicos.

En [Websy nos encargamos del desarrollo completo y la gestión de aprobación en App Store y Google Play sin complicaciones](/servicios/aplicaciones-moviles). ¿Tenés un proyecto de app móvil y querés lanzarlo al mercado con éxito? [Contactate con nuestro equipo técnico](/contacto).
