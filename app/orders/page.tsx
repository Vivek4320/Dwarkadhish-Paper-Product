"use client";
import Link from "next/link";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
type Order = {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  amount_paise: number;
  currency: string;
  customer: { fullName?: string };
  item: { templateName?: string; pages?: number; quantity?: number };
  status: string;
  created_at: string;
};
const money = (n: number, c: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n / 100);
export default function OrdersPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }
    fetch("/api/orders", { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Unable to load orders.");
        setOrders(d.orders || []);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load orders."),
      )
      .finally(() => setLoading(false));
  }, [isLoaded, isSignedIn]);
  if (!isLoaded)
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-12">
        Loading...
      </main>
    );
  if (!isSignedIn)
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F1] px-4 py-12">
        <section className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
          <h1 className="text-2xl font-bold">Login to view your orders</h1>
          <div className="mt-6 flex justify-center">
            <SignIn routing="hash" />
          </div>
        </section>
      </main>
    );
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 text-[#211F1F]">
      <Link href="/" className="text-xs font-bold text-[#D71920]">
        ← Back to Home
      </Link>
      <h1 className="mt-4 text-3xl font-bold">My Orders</h1>
      {loading ? (
        <p className="mt-8 text-sm text-[#77716E]">Loading your orders...</p>
      ) : error ? (
        <p
          role="alert"
          className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      ) : orders.length === 0 ? (
        <section className="mt-6 rounded-xl border border-[#E9E3DD] bg-white p-8 text-center">
          <h2 className="text-lg font-bold">No orders yet</h2>
          <p className="mt-2 text-sm text-[#77716E]">
            Your successfully paid orders will appear here.
          </p>
          <Link
            href="/customize-book"
            className="mt-5 inline-block rounded-lg bg-[#D71920] px-5 py-3 text-xs font-bold text-white"
          >
            Customise a notebook
          </Link>
        </section>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <article
              key={o.id}
              className="rounded-xl border border-[#E9E3DD] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h2 className="font-bold">Order #{o.razorpay_order_id}</h2>
                  <p className="mt-1 text-xs text-[#77716E]">
                    {new Date(o.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {o.status}
                </span>
              </div>
              <div className="mt-4 border-t border-[#F0ECE8] pt-4">
                <p className="text-sm font-semibold">
                  Customised Notebook ·{" "}
                  {o.item.templateName || "Custom template"}
                </p>
                <p className="mt-1 text-xs text-[#77716E]">
                  {o.item.pages} pages · Quantity: {o.item.quantity}
                </p>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-[#77716E]">
                    Customer: {o.customer.fullName}
                  </span>
                  <strong>{money(o.amount_paise, o.currency)}</strong>
                </div>
                <p className="mt-2 text-[11px] text-[#8A817A]">
                  Payment ID: {o.razorpay_payment_id}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
