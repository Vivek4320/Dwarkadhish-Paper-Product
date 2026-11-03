import { query } from "./db";
import { sanitizeDesign, type CartDesign } from "./cart-design";
import { unitPriceFor } from "./pricing";

export type CartItem = {
  id: string;
  templateId: string;
  pages: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  frontPhotoUrl: string | null;
  backPhotoUrl: string | null;
  design: CartDesign;
  createdAt: string;
};

export type CartResponse = {
  items: CartItem[];
  /** Number of designs in the cart (what the header badge shows). */
  count: number;
  subtotal: number;
};

export type CartRow = {
  id: string;
  template_id: string;
  pages: number;
  quantity: number;
  front_photo_id: string | null;
  back_photo_id: string | null;
  design: unknown;
  created_at: Date;
};

export const ITEM_COLUMNS =
  "id, template_id, pages, quantity, front_photo_id, back_photo_id, design, created_at";

export function toItem(r: CartRow): CartItem {
  const unitPrice = unitPriceFor(r.pages) ?? 0;
  return {
    id: r.id,
    templateId: r.template_id,
    pages: r.pages,
    quantity: r.quantity,
    unitPrice,
    lineTotal: unitPrice * r.quantity,
    frontPhotoUrl: r.front_photo_id ? `/api/photos/${r.front_photo_id}` : null,
    backPhotoUrl: r.back_photo_id ? `/api/photos/${r.back_photo_id}` : null,
    design: sanitizeDesign(r.design),
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export const EMPTY_CART: CartResponse = { items: [], count: 0, subtotal: 0 };

export async function listCart(owner: string): Promise<CartResponse> {
  const r = await query<CartRow>(
    `SELECT ${ITEM_COLUMNS} FROM cart_items WHERE owner = $1 ORDER BY created_at`,
    [owner],
  );
  const items = r.rows.map(toItem);
  return {
    items,
    count: items.length,
    subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0),
  };
}
