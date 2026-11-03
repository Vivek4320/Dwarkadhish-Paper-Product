import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { query } from "./db";

const GUEST_COOKIE = "dwp_guest";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isUuid = (value: unknown): value is string =>
  typeof value === "string" && UUID.test(value);

/**
 * Who owns the cart for this request.
 *  - Signed in with Clerk  -> "user:<clerk id>"
 *  - Not signed in         -> "guest:<random id from an httpOnly cookie>"
 *
 * When a guest signs in, their guest cart is moved onto their account.
 * `create: true` mints the guest cookie if it doesn't exist (use it on writes);
 * with `create: false` a visitor with no cart gets `null`.
 */
export async function resolveOwner(create: boolean): Promise<string | null> {
  const { userId } = await auth();
  const jar = await cookies();
  const guestId = jar.get(GUEST_COOKIE)?.value;
  const validGuest = isUuid(guestId) ? guestId : null;

  if (userId) {
    const owner = `user:${userId}`;
    if (validGuest) {
      // One statement, so the cart and its photos move together.
      await query(
        `WITH moved AS (
           UPDATE cart_items SET owner = $1, updated_at = now() WHERE owner = $2
           RETURNING 1
         )
         UPDATE photos SET owner = $1 WHERE owner = $2`,
        [owner, `guest:${validGuest}`],
      );
      jar.delete(GUEST_COOKIE);
    }
    return owner;
  }

  if (validGuest) return `guest:${validGuest}`;
  if (!create) return null;

  const id = crypto.randomUUID();
  jar.set(GUEST_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return `guest:${id}`;
}
