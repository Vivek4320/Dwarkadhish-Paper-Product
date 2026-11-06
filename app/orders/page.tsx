"use client";

import Link from "next/link";
import Image from "next/image";
import { SignIn, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type OrderItem = {
  templateName?: string;
  templateId?: string;
  pages?: number;
  quantity?: number;
  coverColor?: string;
  backCoverColor?: string;
  uploadedImage?: string | null;
  backUploadedImage?: string | null;
  coverText?: string;
  backCoverText?: string;
  frontTextColor?: string;
  backTextColor?: string;
  frontBold?: boolean;
  backBold?: boolean;
  frontItalic?: boolean;
  backItalic?: boolean;
  frontTextPosition?: { x: number; y: number };
  backTextPosition?: { x: number; y: number };
  frontTextSize?: number;
  backTextSize?: number;
  frontZoom?: number;
  backZoom?: number;
};

type Order = {
  id: string;
  amount_paise: number;
  currency: string;
  customer: { fullName?: string };
  item: OrderItem;
  status: string;
  created_at: string;
};

const money = (n: number, c: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n / 100);

function BookPreview({ item }: { item: OrderItem }) {
  const templateId = ["1", "2", "3", "4"].includes(item.templateId || "")
    ? item.templateId
    : "1";
  const backWidth =
    templateId === "2"
      ? 48
      : templateId === "3"
        ? 47.8
        : templateId === "4"
          ? 48.4
          : 47.1;
  const frontLeft =
    templateId === "2"
      ? 51.8
      : templateId === "3"
        ? 51.9
        : templateId === "4"
          ? 52.3
          : 52.8;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-[#e8e0d6] shadow-sm"
      style={{
        aspectRatio: "1.44 / 1",
        backgroundImage: `url(/Templates/Template-${templateId}.png)`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      aria-label="Preview of your customised notebook"
    >
      {item.backUploadedImage && (
        <img
          src={item.backUploadedImage}
          alt="Your back cover design"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 h-full object-cover"
          style={{
            width: backWidth + "%",
            transform: `scale(${item.backZoom || 1})`,
          }}
        />
      )}
      {item.uploadedImage && (
        <img
          src={item.uploadedImage}
          alt="Your front cover design"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 h-full object-cover"
          style={{ width: "47.2%", transform: `scale(${item.frontZoom || 1})` }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 bg-gradient-to-r from-[#6f6255] via-[#e6ddd0] to-[#746759]"
        style={{ left: backWidth + "%", width: "5.7%" }}
      />
      <Image
        src={`/Templates/Template-${templateId}-overlay.png`}
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 640px) 42vw, 180px"
        className="pointer-events-none z-30"
      />
      <img
        src="/branding/product-label.png"
        alt="Dwarkadhish Paper Products notebook details"
        className="pointer-events-none absolute bottom-[3%] left-0 z-40 h-auto"
        style={{ width: backWidth + "%" }}
      />
      <img
        src="/branding/warrior-logo.png"
        alt="Notebook brand logo"
        className="pointer-events-none absolute right-[3%] top-[3.5%] z-40 h-auto w-[11%]"
      />
      {item.backCoverText && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-40 overflow-hidden"
          style={{ width: backWidth + "%" }}
        >
          <span
            className={`absolute max-w-[88%] -translate-x-1/2 -translate-y-1/2 break-words text-center ${item.backBold === false ? "font-medium" : "font-extrabold"} ${item.backItalic ? "italic" : ""}`}
            style={{
              left: (item.backTextPosition?.x ?? 23) + "%",
              top: (item.backTextPosition?.y ?? 48) + "%",
              color: item.backTextColor || "#FFFFFF",
              fontSize: `clamp(5px, ${item.backTextSize || 24}px, 13px)`,
            }}
          >
            {item.backCoverText}
          </span>
        </div>
      )}
      {item.coverText && (
        <div
          className="pointer-events-none absolute inset-y-0 z-40 overflow-hidden"
          style={{ left: frontLeft + "%", width: 100 - frontLeft + "%" }}
        >
          <span
            className={`absolute max-w-[88%] -translate-x-1/2 -translate-y-1/2 break-words text-center ${item.frontBold === false ? "font-medium" : "font-extrabold"} ${item.frontItalic ? "italic" : ""}`}
            style={{
              left: (item.frontTextPosition?.x ?? 75) + "%",
              top: (item.frontTextPosition?.y ?? 48) + "%",
              color: item.frontTextColor || "#FFFFFF",
              fontSize: `clamp(5px, ${item.frontTextSize || 24}px, 13px)`,
            }}
          >
            {item.coverText}
          </span>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      if (!isLoaded) return;
      if (!isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        // Prefer an explicit Clerk token, but also allow the same-origin
        // Clerk session cookie to authenticate the request when token retrieval
        // is temporarily unavailable in the browser.
        let token: string | null = null;
        try {
          token = await getToken({ skipCache: true });
        } catch (tokenError) {
          console.warn(
            "Could not retrieve a Clerk token; trying the session cookie.",
            tokenError,
          );
        }

        const response = await fetch("/api/orders", {
          cache: "no-store",
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to load orders.");
        }
        if (!cancelled) setOrders(data.orders || []);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load orders.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadOrders();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);

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
              className="grid gap-5 rounded-xl border border-[#E9E3DD] bg-white p-4 shadow-sm sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center sm:p-5"
            >
              <BookPreview item={o.item || {}} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-bold">Customised Notebook</h2>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                    {o.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#77716E]">
                  {new Date(o.created_at).toLocaleString("en-IN")}
                </p>
                <p className="mt-3 text-sm text-[#514B47]">
                  {o.item.pages} pages <span className="px-1">·</span> Quantity:{" "}
                  {o.item.quantity}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-[#77716E]">
                    Customer: {o.customer?.fullName || "Customer"}
                  </span>
                  <strong className="shrink-0 text-base">
                    {money(o.amount_paise, o.currency)}
                  </strong>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewOrder(o)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D71920] px-4 py-2 text-xs font-bold text-[#D71920] transition hover:bg-[#D71920] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D71920]/30"
                    aria-label={`Preview design for order ${o.id}`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"
                      />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                    Preview Design
                  </button>
                  <a
                    href="https://www.indiapost.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#D71920] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#B9151B] focus:outline-none focus:ring-2 focus:ring-[#D71920]/30"
                  >
                    Track Your Order
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17 17 7M8 7h9v9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {previewOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-preview-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreviewOrder(null);
          }}
        >
          <section className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={() => setPreviewOrder(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#514B47] transition hover:bg-[#F4F0EC]"
              aria-label="Close preview"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 6 12 12M18 6 6 18"
                />
              </svg>
            </button>
            <h2 id="order-preview-title" className="pr-10 text-xl font-bold">
              Your Notebook Design
            </h2>
            <p className="mt-1 text-xs text-[#77716E]">
              Order #{previewOrder.id}
            </p>
            <div className="mt-5">
              <BookPreview item={previewOrder.item || {}} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#F8F6F3] p-4 text-sm">
              <div>
                <span className="text-[#77716E]">Pages</span>
                <p className="mt-1 font-semibold">
                  {previewOrder.item.pages || "—"}
                </p>
              </div>
              <div>
                <span className="text-[#77716E]">Quantity</span>
                <p className="mt-1 font-semibold">
                  {previewOrder.item.quantity || "—"}
                </p>
              </div>
              <div>
                <span className="text-[#77716E]">Status</span>
                <p className="mt-1 font-semibold capitalize">
                  {previewOrder.status}
                </p>
              </div>
              <div>
                <span className="text-[#77716E]">Total</span>
                <p className="mt-1 font-semibold">
                  {money(previewOrder.amount_paise, previewOrder.currency)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPreviewOrder(null)}
              className="mt-5 w-full rounded-lg bg-[#D71920] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B9151B]"
            >
              Close Preview
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
