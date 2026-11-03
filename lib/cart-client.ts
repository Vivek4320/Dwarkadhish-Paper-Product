import type { CartResponse } from "./cart-items";
import type { CartDesign } from "./cart-design";

export type { CartResponse, CartItem } from "./cart-items";

export const CART_EVENT = "dwp-cart-changed";
const COUNT_KEY = "dwp-cart-count";

export function readCachedCount(): number {
  try {
    return Number(localStorage.getItem(COUNT_KEY)) || 0;
  } catch {
    return 0;
  }
}

/** Remember the item count and tell the header badge to update. */
export function publishCount(count: number) {
  try {
    localStorage.setItem(COUNT_KEY, String(count));
  } catch {
    /* storage unavailable: badge just won't be cached */
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "Something went wrong.",
    );
  }
  return data as T;
}

export async function fetchCart(): Promise<CartResponse> {
  const cart = await request<CartResponse>("/api/cart");
  publishCount(cart.count);
  return cart;
}

export async function fetchCount(): Promise<number> {
  const { count } = await request<{ count: number }>("/api/cart?summary=1");
  publishCount(count);
  return count;
}

export async function uploadPhoto(blob: Blob): Promise<string> {
  const { id } = await request<{ id: string }>("/api/photos", {
    method: "POST",
    headers: { "Content-Type": blob.type },
    body: blob,
  });
  return id;
}

export async function addToCart(input: {
  templateId: string;
  pages: number;
  quantity: number;
  frontPhotoId: string | null;
  backPhotoId: string | null;
  design: Partial<CartDesign>;
}): Promise<number> {
  const { count } = await request<{ count: number }>("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  publishCount(count);
  return count;
}

export async function updateQuantity(id: string, quantity: number) {
  await request(`/api/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
}

export async function removeItem(id: string) {
  const { count } = await request<{ count: number }>(`/api/cart/${id}`, {
    method: "DELETE",
  });
  publishCount(count);
}
