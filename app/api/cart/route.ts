import { NextResponse } from "next/server";
import { handleError, jsonError } from "../../../lib/api-errors";
import { sanitizeDesign } from "../../../lib/cart-design";
import { EMPTY_CART, listCart } from "../../../lib/cart-items";
import { isUuid, resolveOwner } from "../../../lib/cart-owner";
import { query } from "../../../lib/db";
import { ownsPhoto } from "../../../lib/photo-store";
import {
  MAX_CART_ITEMS,
  MAX_QUANTITY,
  unitPriceFor,
} from "../../../lib/pricing";

/** The current visitor's cart. `?summary=1` returns just the item count. */
export async function GET(request: Request) {
  try {
    const owner = await resolveOwner(false);
    const cart = owner ? await listCart(owner) : EMPTY_CART;
    const summary = new URL(request.url).searchParams.get("summary");
    return NextResponse.json(summary ? { count: cart.count } : cart, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return handleError(error);
  }
}

/** Add one designed notebook to the cart. */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;
    if (!body) return jsonError("Invalid request.", 400);

    const templateId = body.templateId;
    if (typeof templateId !== "string" || !/^\d{1,2}$/.test(templateId)) {
      return jsonError("Invalid template.", 400);
    }
    const pages = Number(body.pages);
    if (unitPriceFor(pages) === null) {
      return jsonError("Invalid page option.", 400);
    }
    const quantity = Number(body.quantity);
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return jsonError("Invalid quantity.", 400);
    }

    const owner = await resolveOwner(true);
    if (!owner) return jsonError("Could not identify your cart.", 400);

    const photoIds: Array<string | null> = [];
    for (const key of ["frontPhotoId", "backPhotoId"] as const) {
      const value = body[key];
      if (value === undefined || value === null) {
        photoIds.push(null);
      } else if (isUuid(value) && (await ownsPhoto(owner, value))) {
        photoIds.push(value);
      } else {
        return jsonError("A photo was not found. Please upload it again.", 400);
      }
    }

    const existing = await listCart(owner);
    if (existing.count >= MAX_CART_ITEMS) {
      return jsonError(
        `Your cart can hold up to ${MAX_CART_ITEMS} designs.`,
        409,
      );
    }

    const inserted = await query<{ id: string }>(
      `INSERT INTO cart_items
         (owner, template_id, pages, quantity, front_photo_id, back_photo_id, design)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
       RETURNING id`,
      [
        owner,
        templateId,
        pages,
        quantity,
        photoIds[0],
        photoIds[1],
        JSON.stringify(sanitizeDesign(body.design)),
      ],
    );

    return NextResponse.json(
      { id: inserted.rows[0].id, count: existing.count + 1 },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
