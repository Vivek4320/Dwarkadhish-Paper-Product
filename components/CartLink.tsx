"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { CART_EVENT, fetchCount, readCachedCount } from "../lib/cart-client";

function subscribe(onChange: () => void) {
  window.addEventListener(CART_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Header cart icon with the number of designs in the cart. */
export default function CartLink({ isSignedIn }: { isSignedIn: boolean }) {
  const count = useSyncExternalStore(subscribe, readCachedCount, () => 0);

  useEffect(() => {
    // Guests with an empty cart have nothing to look up.
    if (isSignedIn || readCachedCount() > 0) void fetchCount().catch(() => {});
  }, [isSignedIn]);

  return (
    <Link
      href="/cart"
      className="header-cart"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6" />
      </svg>
      {count > 0 && <span className="header-cart-badge">{count}</span>}
    </Link>
  );
}
