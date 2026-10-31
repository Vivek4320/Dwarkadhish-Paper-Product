"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type CheckoutItem = {
  templateName: string;
  coverColor: string;
  coverText: string;
  uploadedImage: string | null;
  pages: number;
  quantity: number;
  unitPrice: number;
  total: number;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CheckoutPage() {
  const [item, setItem] = useState<CheckoutItem | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("dwarkadhish-checkout-item");
    if (!saved) return;

    try {
      setItem(JSON.parse(saved) as CheckoutItem);
    } catch {
      setItem(null);
    }
  }, []);

  const subtotal = item?.total ?? 0;

  return (
    <main className="min-h-screen bg-[#F8F6F2] font-[Arial,Helvetica,sans-serif] text-[#211F1F]">
      <div className="bg-[#211F1F] px-5 py-2 text-center text-[10px] font-semibold tracking-[0.16em] text-[#D4A84A]">
        DWARKADHISH PAPER PRODUCTS · SECURE CHECKOUT
      </div>

      <header className="border-b border-[#E9E3DD] bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="Dwarkadhish Paper Products home"
            className="flex h-12 w-40 items-center"
          >
            <Image
              src="/Main-Logo.png"
              alt="Dwarkadhish Paper Products"
              width={340}
              height={276}
              priority
              className="h-full w-auto max-w-full object-contain"
            />
          </Link>
          <Link
            href="/customize-book"
            className="text-xs font-semibold text-[#D71920] hover:underline"
          >
            ← Back to customise
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-9 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-xs text-[#8A817A]">
            Home / Customise Book / Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-[38px]">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[#77716E]">
            Complete your details and review your customised notebook.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-[#E9E3DD] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F0] text-sm font-bold text-[#D71920]">
                  01
                </span>
                <div>
                  <h2 className="text-base font-bold">Contact information</h2>
                  <p className="mt-1 text-xs text-[#8A817A]">
                    Your details for order communication
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold text-[#514B47]">
                  Full name
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  Email address
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47] sm:col-span-2">
                  Phone number
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E9E3DD] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F0] text-sm font-bold text-[#D71920]">
                  02
                </span>
                <div>
                  <h2 className="text-base font-bold">Delivery address</h2>
                  <p className="mt-1 text-xs text-[#8A817A]">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold text-[#514B47] sm:col-span-2">
                  Address
                  <textarea
                    rows={3}
                    placeholder="House no., street, area"
                    className="mt-2 w-full rounded-lg border border-[#E9E3DD] p-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  City
                  <input
                    type="text"
                    placeholder="City"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  State
                  <input
                    type="text"
                    placeholder="State"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  PIN code
                  <input
                    type="text"
                    placeholder="PIN code"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  Country
                  <input
                    type="text"
                    defaultValue="India"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E9E3DD] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F0] text-sm font-bold text-[#D71920]">
                  03
                </span>
                <div>
                  <h2 className="text-base font-bold">Payment method</h2>
                  <p className="mt-1 text-xs text-[#8A817A]">
                    Payment options will be configured later.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-dashed border-[#D9CEC5] bg-[#FDFBF9] p-4 text-sm text-[#77716E]">
                <span className="font-semibold text-[#514B47]">
                  Payment on confirmation
                </span>
                <p className="mt-1 text-xs leading-5">
                  Your preferred payment method can be selected when the payment
                  flow is connected.
                </p>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-[#E9E3DD] bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold">Order summary</h2>
            <p className="mt-1 text-xs text-[#8A817A]">
              Review your customised product
            </p>

            {item ? (
              <div className="mt-5 flex gap-4 border-b border-[#F0ECE8] pb-5">
                <div
                  className="relative flex h-32 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border-l-[5px] border-[#242222] shadow-md"
                  style={{ backgroundColor: item.coverColor }}
                >
                  {item.uploadedImage && (
                    <img
                      src={item.uploadedImage}
                      alt="Custom cover artwork"
                      className="absolute inset-2 h-16 w-[calc(100%-1rem)] object-contain"
                    />
                  )}
                  <span
                    className="relative z-10 break-words px-2 text-center text-xs font-extrabold"
                    style={{
                      color:
                        item.templateName === "Minimal" ||
                        item.coverColor === "#F7E8C8" ||
                        item.coverColor === "#FAFAFA"
                          ? "#25211E"
                          : "#FFFFFF",
                    }}
                  >
                    {item.coverText || item.templateName}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold">Customised Notebook</h3>
                  <p className="mt-1 text-xs text-[#77716E]">
                    {item.templateName} cover
                  </p>
                  <p className="mt-1 text-xs text-[#77716E]">
                    {item.pages} pages · Single Line
                  </p>
                  <p className="mt-1 text-xs text-[#77716E]">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-3 text-sm font-bold">
                    {money(item.unitPrice)}{" "}
                    <span className="text-[10px] font-normal text-[#8A817A]">
                      / notebook
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-[#F9F6F2] p-4 text-sm text-[#77716E]">
                No customisation details found.{" "}
                <Link
                  href="/customize-book"
                  className="font-semibold text-[#D71920] underline"
                >
                  Customise a notebook
                </Link>{" "}
                to continue.
              </div>
            )}

            <div className="space-y-3 border-b border-[#F0ECE8] py-5 text-xs">
              <div className="flex justify-between text-[#77716E]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#211F1F]">
                  {money(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#77716E]">
                <span>Shipping</span>
                <span className="text-[#8A817A]">Calculated later</span>
              </div>
              <div className="flex justify-between text-[#77716E]">
                <span>Discount</span>
                <span>—</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-5">
              <span className="text-sm font-bold">Estimated total</span>
              <span className="text-2xl font-bold text-[#D71920]">
                {money(subtotal)}
              </span>
            </div>
            <button
              type="button"
              className="min-h-12 w-full rounded-lg bg-[#D71920] px-4 text-sm font-bold text-white transition hover:bg-[#B91620]"
            >
              Place Order
            </button>
            <p className="mt-3 text-center text-[10px] leading-5 text-[#8A817A]">
              Order submission and payment will be connected in the next step.
            </p>
            <Link
              href="/customize-book"
              className="mt-4 block text-center text-xs font-semibold text-[#D71920] hover:underline"
            >
              ← Edit customisation
            </Link>
          </aside>
        </div>
      </div>

      <footer className="bg-[#211F1F] px-5 py-8 text-center text-[10px] tracking-wider text-[#D4A84A]">
        DWARKADHISH PAPER PRODUCTS · JAMNAGAR, GUJARAT
      </footer>
    </main>
  );
}
