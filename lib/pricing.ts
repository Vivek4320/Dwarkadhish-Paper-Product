/**
 * Notebook prices by page count (INR). The server always recomputes prices
 * from here; never trust a price sent by the browser.
 * Keep in sync with the page options in components/CustomizeBookPage.tsx and
 * app/api/razorpay/create-order/route.ts.
 */
export const PAGE_PRICES: Record<number, number> = {
  200: 90,
  184: 84,
  160: 78,
  144: 72,
  104: 48,
};

export const MAX_QUANTITY = 999;
/** Most distinct designs one cart can hold. */
export const MAX_CART_ITEMS = 25;

export function unitPriceFor(pages: number): number | null {
  return Number.isInteger(pages) && pages in PAGE_PRICES
    ? PAGE_PRICES[pages]
    : null;
}
