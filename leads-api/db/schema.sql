-- Base de datos de consultas de websysrl.com. Se aplica sola al arrancar la API (idempotente).

CREATE TABLE IF NOT EXISTS leads (
  id            BIGSERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ,
  status        TEXT NOT NULL DEFAULT 'nuevo',
  name          TEXT,
  phone         TEXT,
  email         TEXT,
  country       TEXT,
  website       TEXT,
  rubro         TEXT,
  project_type  TEXT,
  budget        TEXT,
  source        TEXT,
  page          TEXT,
  message       TEXT,
  note          TEXT,
  reunion_at    TIMESTAMPTZ,
  user_agent    TEXT,
  -- Documento de Firestore del que vino (solo los importados); evita duplicar al reimportar
  firestore_id  TEXT UNIQUE,
  -- Campos que no tienen columna propia
  extra         JSONB NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id            BIGSERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  location      TEXT,
  page          TEXT,
  referrer      TEXT,
  firestore_id  TEXT UNIQUE
);
CREATE INDEX IF NOT EXISTS whatsapp_clicks_created_at_idx ON whatsapp_clicks (created_at DESC);

-- Colecciones viejas de Firestore sin uso en el sitio actual (comentarios, news, analytics): se guardan
-- completas, tal cual estaban, para consultarlas desde la pestaña "Archivo" del panel.
CREATE TABLE IF NOT EXISTS firestore_archive (
  id            BIGSERIAL PRIMARY KEY,
  collection    TEXT NOT NULL,
  firestore_id  TEXT NOT NULL,
  created_at    TIMESTAMPTZ,
  data          JSONB NOT NULL,
  UNIQUE (collection, firestore_id)
);

-- Prospección (centro tipo Apollo del panel): prospectos de las campañas de WhatsApp y correo, y los
-- mensajes de cada conversación. Los llenan los servidores de campaña con POST /api/outreach/ingest.
CREATE TABLE IF NOT EXISTS outreach_prospects (
  key            TEXT PRIMARY KEY,                 -- 'wa:573016581069' · 'email:info@estudio.com'
  canal          TEXT NOT NULL,                    -- whatsapp | email
  campana        TEXT,                             -- contadores-co · agente-ia-ar …
  pais           TEXT,
  nombre         TEXT,
  contacto       TEXT,                             -- teléfono o correo
  web            TEXT,
  estado         TEXT NOT NULL DEFAULT 'programado',
  programado_para DATE,                            -- día estimado de envío (solo en cola)
  enviado_at     TIMESTAMPTZ,
  respondio_at   TIMESTAMPTZ,
  reunion        TEXT,                             -- día y hora agendados, tal como los dio el cliente
  ultimo_at      TIMESTAMPTZ,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  extra          JSONB NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS outreach_prospects_estado_idx ON outreach_prospects (estado);
CREATE INDEX IF NOT EXISTS outreach_prospects_enviado_idx ON outreach_prospects (enviado_at DESC);

CREATE TABLE IF NOT EXISTS outreach_messages (
  id             BIGSERIAL PRIMARY KEY,
  prospect_key   TEXT NOT NULL,
  ext_id         TEXT UNIQUE,                      -- evita duplicar al reenviar un lote
  at             TIMESTAMPTZ NOT NULL,
  de             TEXT NOT NULL,                    -- prospecto | ia | websy | sistema
  tipo           TEXT NOT NULL DEFAULT 'mensaje',  -- mensaje | campana | nota | correo
  texto          TEXT
);
CREATE INDEX IF NOT EXISTS outreach_messages_key_idx ON outreach_messages (prospect_key, at);

-- Posibles clientes (base tipo Apollo del panel): negocios encontrados en Google Maps a los que todavía no
-- se les escribió, con lo que se averiguó de su web y por qué les serviría Websy. Los carga el script de
-- búsqueda con POST /api/outreach/pool; desde el panel se guardan, descartan o anotan.
CREATE TABLE IF NOT EXISTS prospect_pool (
  id             TEXT PRIMARY KEY,                 -- id del lugar en Google Maps
  pais           TEXT,
  ciudad         TEXT,
  rubro          TEXT,
  nombre         TEXT,
  telefono       TEXT,                             -- tal como figura en Maps
  whatsapp       TEXT,                             -- solo dígitos, si es un celular o la web tiene wa.me
  email          TEXT,
  web            TEXT,
  direccion      TEXT,
  rating         NUMERIC(2,1),
  resenas        INT,
  maps_url       TEXT,
  oportunidad    INT NOT NULL DEFAULT 0,           -- 0 a 100: qué tan claro es que nos necesita
  servicio       TEXT,                             -- servicio sugerido
  motivos        JSONB NOT NULL DEFAULT '[]'::jsonb,
  info           JSONB NOT NULL DEFAULT '{}'::jsonb, -- redes, horarios, datos de la web, correos extra…
  estado         TEXT NOT NULL DEFAULT 'nuevo',    -- nuevo | guardado | contactado (ya se le habló) | descartado
  nota           TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS prospect_pool_oportunidad_idx ON prospect_pool (oportunidad DESC);

-- Mensajes editados desde el panel antes de enviarse. Los servidores de campaña los consultan antes de
-- cada envío (GET /api/outreach/overrides) y, si hay uno, mandan este texto en lugar del de la plantilla.
CREATE TABLE IF NOT EXISTS outreach_overrides (
  key            TEXT PRIMARY KEY,                 -- misma clave que outreach_prospects
  mensaje        TEXT NOT NULL,
  asunto         TEXT,                             -- solo correo
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
