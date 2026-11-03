"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import BookThumb from "../../components/BookThumb";
import {
  fetchCart,
  removeItem,
  updateQuantity,
  type CartItem,
  type CartResponse,
} from "../../lib/cart-client";
import { MAX_QUANTITY } from "../../lib/pricing";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCart()
      .then((data) => !cancelled && setCart(data))
      .catch((e: Error) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, []);

  async function run(id: string, action: () => Promise<unknown>) {
    setBusyId(id);
    setError("");
    try {
      await action();
      setCart(await fetchCart());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusyId(null);
    }
  }

  function checkout(item: CartItem) {
    const d = item.design;
    sessionStorage.setItem(
      "dwarkadhish-checkout-item",
      JSON.stringify({
        templateId: item.templateId,
        templateName: `Template ${item.templateId}`,
        coverColor: "#FFFFFF",
        uploadedImage: item.frontPhotoUrl,
        backCoverColor: "#F7F7F5",
        backUploadedImage: item.backPhotoUrl,
        ...d,
        pages: item.pages,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.lineTotal,
      }),
    );
    router.push("/checkout");
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 font-[Arial,Helvetica,sans-serif] text-[#211F1F]">
      <Link href="/customize-book" className="text-xs font-bold text-[#DF151D]">
        ← Continue designing
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Your cart</h1>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-[#fff1f1] p-3 text-xs text-[#b91620]"
        >
          {error}
        </p>
      )}
      {!cart && !error && <p className="mt-6 text-sm">Loading...</p>}

      {cart && cart.items.length === 0 && (
        <div className="mt-6 rounded-lg border border-[#eee] p-8 text-center">
          <p className="text-sm">Your cart is empty.</p>
          <Link
            href="/customize-book"
            className="mt-4 inline-block rounded-lg bg-[#DF151D] px-5 py-3 text-xs font-bold text-white"
          >
            Design a notebook
          </Link>
        </div>
      )}

      {cart && cart.items.length > 0 && (
        <>
          {!isSignedIn && (
            <p className="mt-4 rounded-lg border border-[#ead8bd] bg-[#fffaf1] p-3 text-xs">
              Sign in to keep this cart on all your devices. Your items are
              saved to your account automatically when you do.
            </p>
          )}
          <ul className="mt-5 grid gap-4">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="grid gap-4 rounded-lg border border-[#eee] p-4 sm:grid-cols-[260px_1fr]"
              >
                <BookThumb
                  templateId={item.templateId}
                  frontPhotoUrl={item.frontPhotoUrl}
                  backPhotoUrl={item.backPhotoUrl}
                  design={item.design}
                />
                <div className="flex flex-col gap-2 text-sm">
                  <p className="font-bold">
                    Template {item.templateId} · {item.pages} pages
                  </p>
                  <p className="text-xs text-[#77716E]">
                    {money(item.unitPrice)} each
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={busyId === item.id || item.quantity <= 1}
                      onClick={() =>
                        run(item.id, () =>
                          updateQuantity(item.id, item.quantity - 1),
                        )
                      }
                      className="h-8 w-8 rounded border disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={
                        busyId === item.id || item.quantity >= MAX_QUANTITY
                      }
                      onClick={() =>
                        run(item.id, () =>
                          updateQuantity(item.id, item.quantity + 1),
                        )
                      }
                      className="h-8 w-8 rounded border disabled:opacity-40"
                    >
                      +
                    </button>
                    <span className="ml-auto text-base font-bold text-[#DF151D]">
                      {money(item.lineTotal)}
                    </span>
                  </div>
                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      onClick={() => checkout(item)}
                      className="rounded-lg bg-[#DF151D] px-4 py-2 text-xs font-bold text-white"
                    >
                      Checkout this item
                    </button>
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => run(item.id, () => removeItem(item.id))}
                      className="text-xs font-bold text-[#77716E] underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-right text-lg font-bold">
            Subtotal: {money(cart.subtotal)}
          </p>
          <p className="mt-1 text-right text-[11px] text-[#77716E]">
            Checkout is one design at a time for now. Full-cart checkout is
            coming next.
          </p>
        </>
      )}
    </main>
  );
}
