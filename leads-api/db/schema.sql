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
