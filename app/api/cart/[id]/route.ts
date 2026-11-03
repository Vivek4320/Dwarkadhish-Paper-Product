import { NextResponse } from "next/server";
import { handleError, jsonError } from "../../../../lib/api-errors";
import {
  ITEM_COLUMNS,
  listCart,
  toItem,
  type CartRow,
} from "../../../../lib/cart-items";
import { isUuid, resolveOwner } from "../../../../lib/cart-owner";
import { query } from "../../../../lib/db";
import { deleteUnusedPhotos } from "../../../../lib/photo-store";
import { MAX_QUANTITY } from "../../../../lib/pricing";

type Ctx = { params: Promise<{ id: string }> };

/** Change the quantity of one cart item. Body: { "quantity": 5 } */
export async function PATCH(request: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    if (!isUuid(id)) return jsonError("Not found.", 404);
    const body = (await request.json().catch(() => null)) as {
      quantity?: unknown;
    } | null;
    const quantity = Number(body?.quantity);
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return jsonError("Invalid quantity.", 400);
    }
    const owner = await resolveOwner(false);
    if (!owner) return jsonError("Not found.", 404);

    const updated = await query<CartRow>(
      `UPDATE cart_items SET quantity = $1, updated_at = now()
        WHERE id = $2 AND owner = $3
        RETURNING ${ITEM_COLUMNS}`,
      [quantity, id, owner],
    );
    if (updated.rows.length === 0) return jsonError("Not found.", 404);
    return NextResponse.json({ item: toItem(updated.rows[0]) });
  } catch (error) {
    return handleError(error);
  }
}

/** Remove one item from the cart (and its photos, if nothing else uses them). */
export async function DELETE(_request: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    if (!isUuid(id)) return jsonError("Not found.", 404);
    const owner = await resolveOwner(false);
    if (!owner) return jsonError("Not found.", 404);

    const removed = await query<{
      front_photo_id: string | null;
      back_photo_id: string | null;
    }>(
      `DELETE FROM cart_items WHERE id = $1 AND owner = $2
        RETURNING front_photo_id, back_photo_id`,
      [id, owner],
    );
    if (removed.rows.length === 0) return jsonError("Not found.", 404);

    const { front_photo_id, back_photo_id } = removed.rows[0];
    await deleteUnusedPhotos(
      [front_photo_id, back_photo_id].filter((v): v is string => Boolean(v)),
    );

    const cart = await listCart(owner);
    return NextResponse.json({ count: cart.count, subtotal: cart.subtotal });
  } catch (error) {
    return handleError(error);
  }
}
