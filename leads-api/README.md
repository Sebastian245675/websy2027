# leads-api

Consultas de websysrl.com en PostgreSQL: los formularios y los clics a WhatsApp del sitio llegan acá, y el panel
`https://www.websysrl.com/panel` los muestra. Reemplaza a Firestore.

- **Contenedores** (docker compose): `websysrl_leads_db` (PostgreSQL 16, sin puertos publicados) y
  `websysrl_leads_api` (Node 20, puerto 4100 solo dentro de la red del proxy).
- **nginx**: el proxy (`inmobiliaria_web`) manda `/api/` a `websysrl_leads_api:4100`
  (ver `frontend/deploy/websysrl-proxy.conf`).
- **Deploy**: `npm run deploy` en `frontend/` sube este directorio y corre `deploy/install.sh` antes de publicar el
  sitio. Si la API no queda sana, el deploy se corta sin tocar lo que está en vivo.

## En el servidor

```bash
cd /root/apps/websysrl/leads-api
bash deploy/install.sh                 # instala o actualiza (idempotente)
docker compose logs -f api             # ver la API
docker compose exec db psql -U websy   # consola de PostgreSQL
```

`.env` (solo en el servidor, lo crea `install.sh` la primera vez):

| Variable | Qué es |
|---|---|
| `PANEL_PASSWORD` | Contraseña del panel. Cambiarla y correr `install.sh` cierra todas las sesiones. |
| `POSTGRES_PASSWORD`, `SESSION_SECRET` | Aleatorias, generadas por `install.sh`. |
| `PROXY_NETWORK` | Red Docker que comparten `websysrl_site` e `inmobiliaria_web`. |
| `SENDGRID_API_KEY`, `NOTIFY_FROM`, `NOTIFY_TO` | Opcional: email por cada consulta nueva. |

El panel bloquea una IP 15 minutos después de 5 contraseñas incorrectas.

## Importación desde Firestore

`install.sh` la corre una vez (deja la marca `.firestore-imported`). Trae `cotizaciones` → `leads`,
`whatsapp_clicks` y archiva `comentarios`, `news` y `analytics` en `firestore_archive`. Se puede repetir sin
duplicar: `docker compose exec api node scripts/import-firestore.js`.

Después de importar, publicar `frontend/firestore.rules` en Firebase Console para cerrar Firestore.

## Backup

```bash
docker compose exec -T db pg_dump -U websy websy | gzip > backup-$(date +%F).sql.gz
```

## Pruebas

Contra una base de prueba (borra sus tablas): `DATABASE_URL=postgres://... npm test`
