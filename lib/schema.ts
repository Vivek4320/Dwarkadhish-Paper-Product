/**
 * Database schema for the cart (Neon / PostgreSQL).
 * lib/db.ts runs this automatically (idempotent) the first time the server
 * touches the database, so there is no separate migration step.
 */
export const SCHEMA_SQL = `
-- Customer photos for the front/back cover.
-- INTERIM: stored in the database as bytea. Move to object storage (e.g.
-- Cloudflare R2) before real traffic; only lib/photo-store.ts needs to change.
CREATE TABLE IF NOT EXISTS photos (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner       text NOT NULL,            -- 'user:<clerk id>' or 'guest:<uuid>'
  mime        text NOT NULL,
  size        integer NOT NULL,
  data        bytea NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS photos_owner_idx ON photos (owner);

-- One row per designed notebook in a cart.
CREATE TABLE IF NOT EXISTS cart_items (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner           text NOT NULL,
  template_id     text NOT NULL,
  pages           integer NOT NULL,
  quantity        integer NOT NULL CHECK (quantity BETWEEN 1 AND 999),
  front_photo_id  uuid REFERENCES photos(id) ON DELETE SET NULL,
  back_photo_id   uuid REFERENCES photos(id) ON DELETE SET NULL,
  design          jsonb NOT NULL DEFAULT '{}'::jsonb,  -- cover text, colours, positions, zoom
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cart_items_owner_idx ON cart_items (owner, created_at);
`;
