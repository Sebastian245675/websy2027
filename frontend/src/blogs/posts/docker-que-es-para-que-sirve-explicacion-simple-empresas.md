Si alguna vez un desarrollador te dijo "en mi computadora funciona" cuando algo falló en producción, **Docker resuelve exactamente ese problema**.

---

## ¿Qué es Docker en palabras simples?

Docker es una herramienta que **empaqueta tu aplicación** junto con todo lo que necesita para funcionar (lenguaje de programación, librerías, configuración) en un "contenedor" que funciona idéntico en cualquier computadora o servidor.

Es como una lonchera para software: todo lo que tu app necesita está adentro, sellado y portátil.

---

## ¿Por qué Docker es importante?

### Sin Docker:
- La app funciona en la laptop del programador pero falla en el servidor de producción.
- Instalar un proyecto nuevo requiere 2 horas configurando el entorno.
- Si actualizás una librería, puede romper otra cosa.

### Con Docker:
- La app funciona **exactamente igual** en desarrollo, testing y producción.
- Instalar un proyecto nuevo: 1 comando (`docker compose up`), 2 minutos.
- Cada servicio tiene su propio contenedor aislado (base de datos, backend, frontend).

---

## Docker vs. Máquina Virtual

| Criterio | Máquina Virtual | Docker |
| --- | --- | --- |
| **Peso** | 5-20 GB | 50-500 MB |
| **Tiempo de inicio** | 1-5 minutos | 1-5 segundos |
| **Uso de RAM** | 1-4 GB por VM | 50-200 MB por contenedor |
| **Aislamiento** | Completo (SO separado) | Parcial (comparte kernel) |
| **Portabilidad** | Baja | Alta |

---

## ¿Cuándo usar Docker?

- Tu equipo tiene más de 1 desarrollador.
- Necesitás desplegar tu app en servidores cloud.
- Querés automatizar testing y deployment (CI/CD).
- Usás microservicios o múltiples servicios interconectados.

---

En [Websy usamos Docker en todos nuestros proyectos para garantizar consistencia entre desarrollo y producción](/servicios/desarrollo-web). [Consultá sobre tu infraestructura](/contacto).
