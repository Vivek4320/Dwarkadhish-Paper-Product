import { query } from "./db";

/**
 * Where customer photos live. INTERIM: Postgres (bytea), fine for a demo and
 * the first orders. To move to object storage (Cloudflare R2 / S3), replace
 * the bodies of these functions; nothing else in the app touches photo bytes.
 */

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const MAX_PHOTOS_PER_OWNER = 60;
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Checks the real file signature, not just the Content-Type header. */
export function sniffImageType(b: Buffer): string | null {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff)
    return "image/jpeg";
  if (
    b.length > 8 &&
    b[0] === 0x89 &&
    b.subarray(1, 4).toString("latin1") === "PNG"
  )
    return "image/png";
  if (
    b.length > 12 &&
    b.subarray(0, 4).toString("latin1") === "RIFF" &&
    b.subarray(8, 12).toString("latin1") === "WEBP"
  )
    return "image/webp";
  return null;
}

export async function countPhotos(owner: string): Promise<number> {
  const r = await query<{ n: string }>(
    "SELECT count(*) AS n FROM photos WHERE owner = $1",
    [owner],
  );
  return Number(r.rows[0].n);
}

export async function savePhoto(
  owner: string,
  mime: string,
  data: Buffer,
): Promise<string> {
  const r = await query<{ id: string }>(
    "INSERT INTO photos (owner, mime, size, data) VALUES ($1, $2, $3, $4) RETURNING id",
    [owner, mime, data.length, data],
  );
  return r.rows[0].id;
}

export async function loadPhoto(
  id: string,
): Promise<{ mime: string; data: Buffer } | null> {
  const r = await query<{ mime: string; data: Buffer }>(
    "SELECT mime, data FROM photos WHERE id = $1",
    [id],
  );
  return r.rows[0] ?? null;
}

export async function ownsPhoto(owner: string, id: string): Promise<boolean> {
  const r = await query("SELECT 1 FROM photos WHERE id = $1 AND owner = $2", [
    id,
    owner,
  ]);
  return r.rows.length > 0;
}

/** Deletes photos that no cart item uses any more. */
export async function deleteUnusedPhotos(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  // When orders exist, also exclude photos used by order items here.
  await query(
    `DELETE FROM photos p
      WHERE p.id = ANY($1::uuid[])
        AND NOT EXISTS (
          SELECT 1 FROM cart_items c
           WHERE c.front_photo_id = p.id OR c.back_photo_id = p.id)`,
    [ids],
  );
}

/**
 * Housekeeping, run opportunistically on uploads: drops carts untouched for 30
 * days and photos nobody uses (e.g. an upload whose "add to cart" failed).
 * Keeps the free database small.
 */
export async function cleanup(): Promise<void> {
  await query(
    "DELETE FROM cart_items WHERE updated_at < now() - interval '30 days'",
  );
  await query(
    `DELETE FROM photos p
      WHERE p.created_at < now() - interval '1 day'
        AND NOT EXISTS (
          SELECT 1 FROM cart_items c
           WHERE c.front_photo_id = p.id OR c.back_photo_id = p.id)`,
  );
}
