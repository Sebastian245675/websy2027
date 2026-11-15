#!/usr/bin/env bash
# Instala o actualiza leads-api (PostgreSQL + API de consultas) en el servidor de websysrl.com.
# Lo corre scripts/deploy-production.js del frontend en cada deploy; también se puede correr a mano:
#   bash /root/apps/websysrl/leads-api/deploy/install.sh
#
# Primera vez: crea .env con contraseñas aleatorias para PostgreSQL y la sesión, la contraseña del panel
# y la red Docker del proxy; después importa lo que había en Firestore (una sola vez).
# Para cambiar la contraseña del panel: editar PANEL_PASSWORD en .env y correr de nuevo este script.
set -euo pipefail
cd "$(dirname "$0")/.."

random_hex() { head -c "$1" /dev/urandom | od -An -tx1 | tr -d ' \n'; }

if [ ! -f .env ]; then
  # La red que comparten el sitio (websysrl_site) y el proxy (inmobiliaria_web): por ahí el proxy llega a la API
  net=""
  for n in $(docker inspect websysrl_site -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'); do
    if docker inspect inmobiliaria_web -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' | tr ' ' '\n' | grep -qx "$n"; then net="$n"; fi
  done
  if [ -z "$net" ]; then echo "No encontré una red Docker común entre websysrl_site e inmobiliaria_web" >&2; exit 1; fi
  umask 077
  cat > .env <<EOF
POSTGRES_PASSWORD=$(random_hex 24)
SESSION_SECRET=$(random_hex 32)
PANEL_PASSWORD=${PANEL_PASSWORD:-123456789}
PROXY_NETWORK=$net
# Aviso por email de cada consulta nueva (opcional): completar y correr de nuevo install.sh
SENDGRID_API_KEY=
NOTIFY_FROM=
NOTIFY_TO=
EOF
  echo "leads-api: .env creado (red del proxy: $net)"
fi

# Token con el que los servidores de campaña (WhatsApp, correo) mandan datos al centro de prospección
if ! grep -q '^OUTREACH_TOKEN=' .env; then
  ( umask 077; echo "OUTREACH_TOKEN=$(random_hex 32)" >> .env )
  echo "leads-api: OUTREACH_TOKEN agregado a .env"
fi

docker compose up -d --build --remove-orphans

for i in $(seq 1 45); do
  if docker exec websysrl_leads_api wget -qO- http://127.0.0.1:4100/api/panel/session >/dev/null 2>&1; then break; fi
  if [ "$i" -eq 45 ]; then
    echo "leads-api no respondió a tiempo" >&2
    docker compose logs --tail 50 api >&2
    exit 1
  fi
  sleep 2
done
echo "leads-api: en línea"

if [ ! -f .firestore-imported ]; then
  docker exec websysrl_leads_api node scripts/import-firestore.js
  date -u +%FT%TZ > .firestore-imported
fi
