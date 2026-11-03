"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
  modal: { ondismiss: () => void };
  theme: { color: string };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: "payment.failed",
        callback: (response: { error?: { description?: string } }) => void,
      ) => void;
    };
  }
}

type CheckoutItem = {
  templateName: string;
  coverColor: string;
  coverText: string;
  uploadedImage: string | null;
  pages: number;
  quantity: number;
  unitPrice: number;
  total: number;
  templateId?: string;
  backCoverText?: string;
  backUploadedImage?: string | null;
  frontZoom?: number;
  backZoom?: number;
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
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CheckoutPage() {
  const [item, setItem] = useState<CheckoutItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("dwarkadhish-checkout-item");
    if (!saved) return;

    try {
      setItem(JSON.parse(saved) as CheckoutItem);
    } catch {
      setItem(null);
    }
  }, []);

  const handlePayment = async () => {
    if (!item) {
      setPaymentMessage(
        "Please customise a notebook before placing your order.",
      );
      return;
    }

    const detailsForm = document.getElementById("checkout-details") as HTMLFormElement | null;
    if (!detailsForm || !detailsForm.reportValidity()) {
      setPaymentMessage("Please complete all required contact and delivery details before placing your order.");
      return;
    }

    setPaymentLoading(true);
    setPaymentMessage("");

    try {
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: item.pages, quantity: item.quantity }),
      });
      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Unable to create payment order.");
      }

      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const existing = document.querySelector<HTMLScriptElement>(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
          );
          if (existing) {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener(
              "error",
              () => reject(new Error("Razorpay checkout failed to load.")),
              { once: true },
            );
            return;
          }
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Razorpay checkout failed to load."));
          document.body.appendChild(script);
        });
      }

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay checkout is unavailable. Please refresh and try again.",
        );
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Dwarkadhish Paper Products",
        description: "Customised notebook order",
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData.verified) {
              throw new Error(
                verifyData.error || "Payment verification failed.",
              );
            }
            setPaymentMessage(
              "Payment successful and verified. Payment ID: " +
                response.razorpay_payment_id,
            );
          } catch (error) {
            setPaymentMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact the store.",
            );
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            setPaymentMessage(
              "Payment window closed. No successful payment was confirmed.",
            );
          },
        },
        theme: { color: "#D71920" },
      });

      razorpay.on("payment.failed", (response) => {
        setPaymentLoading(false);
        setPaymentMessage(
          response.error?.description || "Payment failed. Please try again.",
        );
      });
      razorpay.open();
    } catch (error) {
      setPaymentLoading(false);
      setPaymentMessage(
        error instanceof Error ? error.message : "Unable to start payment.",
      );
    }
  };

  const subtotal = item?.total ?? 0;
  const shipping = item ? 50 : 0;
  const couponDiscount = 0;
  const finalAmount = subtotal - couponDiscount + shipping;

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
          <form id="checkout-details" className="space-y-6">
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
                    required
                    minLength={2}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  Email address
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47] sm:col-span-2">
                  Phone number
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="[+]?[0-9() -]{10,15}"
                    title="Enter a valid phone number."
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
                    required
                    minLength={8}
                    autoComplete="street-address"
                    placeholder="House no., street, area"
                    className="mt-2 w-full rounded-lg border border-[#E9E3DD] p-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  City
                  <input
                    type="text"
                    required
                    autoComplete="address-level2"
                    placeholder="City"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  State
                  <input
                    type="text"
                    required
                    autoComplete="address-level1"
                    placeholder="State"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  PIN code
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    minLength={6}
                    autoComplete="postal-code"
                    title="Enter a valid 6-digit PIN code."
                    placeholder="PIN code"
                    className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm font-normal outline-none focus:border-[#D71920]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#514B47]">
                  Country
                  <input
                    type="text"
                    required
                    defaultValue="India"
                    autoComplete="country-name"
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
                    Secure online payment powered by Razorpay (Test Mode).
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-dashed border-[#D9CEC5] bg-[#FDFBF9] p-4 text-sm text-[#77716E]">
                <span className="font-semibold text-[#514B47]">
                  Pay securely with Razorpay
                </span>
                <p className="mt-1 text-xs leading-5">
                  Complete payment in the secure Razorpay checkout window. Test
                  Mode does not deduct real money.
                </p>
              </div>
            </div>
          </form>

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
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ transform: `scale(${item.frontZoom || 1})` }}
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
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="mt-3 inline-flex min-h-9 items-center justify-center rounded-lg border border-[#D71920] px-3 text-xs font-bold text-[#D71920] transition hover:bg-[#FFF5F5]"
                  >
                    View Book Preview
                  </button>
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

            <div className="mt-5 flex gap-2 border-b border-[#F0ECE8] pb-5">
              <input
                type="text"
                placeholder="COUPON CODE"
                aria-label="Coupon code"
                className="h-11 min-w-0 flex-1 rounded-lg border border-[#E9E3DD] px-3 text-xs outline-none placeholder:text-[#A69B92] focus:border-[#D71920]"
              />
              <button
                type="button"
                className="h-11 rounded-lg border border-[#D71920] px-4 text-xs font-semibold text-[#D71920] transition hover:bg-[#FFF5F5]"
              >
                Apply
              </button>
            </div>

            <div className="space-y-3 border-b border-[#F0ECE8] py-5 text-xs">
              <div className="flex justify-between text-[#77716E]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#211F1F]">
                  {money(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#16803D]">
                <span>Coupon Discount</span>
                <span className="font-semibold">−{money(couponDiscount)}</span>
              </div>
              <div className="flex justify-between text-[#77716E]">
                <span>Shipping</span>
                <span className="font-semibold text-[#211F1F]">
                  {money(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-[#77716E]">
                <span>Taxes</span>
                <span className="font-semibold text-[#8A817A]">Included</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-5">
              <span className="text-sm font-bold">Final Amount</span>
              <span className="text-2xl font-bold text-[#D71920]">
                {money(finalAmount)}
              </span>
            </div>

            <div className="mb-4 rounded-xl bg-[#F9F6F2] p-3 text-[10px] leading-5 text-[#6E6966]">
              🚚 Shipping charges are calculated from your store&apos;s delivery
              rules.
              <br />
              This sample uses a demo shipping rate.
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={!item || paymentLoading}
              className="min-h-12 w-full rounded-lg bg-[#D71920] px-4 text-sm font-bold text-white transition hover:bg-[#B91620] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentLoading
                ? "Processing..."
                : `Pay Now · ${money(finalAmount)}`}
            </button>
            {paymentMessage && (
              <p
                role="status"
                className="mt-3 rounded-lg bg-[#F9F6F2] p-3 text-xs leading-5 text-[#514B47]"
              >
                {paymentMessage}
              </p>
            )}
            <p className="mt-3 text-center text-[10px] leading-5 text-[#8A817A]">
              By continuing, you agree to the store&apos;s Terms &amp;
              Conditions and Privacy Policy.
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

      {previewOpen && item && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Your customised notebook preview"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Your book preview</h2>
                <p className="mt-1 text-xs text-[#77716E]">
                  Front and back cover · Open notebook view
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                aria-label="Close preview"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F2ED] text-xl"
              >
                ×
              </button>
            </div>
            <div
              className="relative mx-auto w-full overflow-hidden rounded-md bg-[#c9beb0] shadow-xl"
              style={{
                aspectRatio: "1.44 / 1",
                backgroundImage:
                  "url(/Templates/Template-" +
                  (item.templateId || "1") +
                  ".png)",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {item.backUploadedImage && (
                <img
                  src={item.backUploadedImage}
                  alt="Back cover artwork"
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 h-full object-cover"
                  style={{
                    width: "47.1%",
                    transform: "scale(" + (item.backZoom || 1) + ")",
                  }}
                />
              )}
              {item.uploadedImage && (
                <img
                  src={item.uploadedImage}
                  alt="Front cover artwork"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 h-full object-cover"
                  style={{
                    width: "47.2%",
                    transform: "scale(" + (item.frontZoom || 1) + ")",
                  }}
                />
              )}
              <div className="pointer-events-none absolute inset-y-0 left-[47.1%] z-30 w-[5.7%] bg-gradient-to-r from-[#6f6255] via-[#e6ddd0] to-[#746759] shadow-lg" />
              <img
                src={
                  "/Templates/Template-" +
                  (item.templateId || "1") +
                  "-overlay.png"
                }
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              />
              <img
                src="/branding/product-label.png"
                alt="Notebook product details"
                className="pointer-events-none absolute bottom-[3%] left-0 z-40 h-auto"
                style={{
                  // full back-cover width: left edge of the page to the spine
                  width:
                    (item.templateId === "2"
                      ? 48
                      : item.templateId === "3"
                        ? 47.8
                        : item.templateId === "4"
                          ? 48.4
                          : 47.1) + "%",
                }}
              />
              <img
                src="/branding/warrior-logo.png"
                alt="Warrior logo"
                className="pointer-events-none absolute right-[3%] top-[3.5%] z-40 h-auto w-[11%]"
              />
              {item.backCoverText && (
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-40 overflow-hidden"
                  style={{
                    width:
                      (item.templateId === "2"
                        ? 48
                        : item.templateId === "3"
                          ? 47.8
                          : item.templateId === "4"
                            ? 48.4
                            : 47.1) + "%",
                  }}
                >
                  <span
                    className={
                      "pointer-events-auto absolute max-w-[88%] -translate-x-1/2 -translate-y-1/2 break-words text-center " +
                      (item.backBold === false
                        ? "font-medium "
                        : "font-extrabold ") +
                      (item.backItalic ? "italic" : "")
                    }
                    style={{
                      left: (item.backTextPosition?.x ?? 23) + "%",
                      top: (item.backTextPosition?.y ?? 48) + "%",
                      color: item.backTextColor || "#FFFFFF",
                      fontSize: (item.backTextSize || 24) + "px",
                    }}
                  >
                    {item.backCoverText}
                  </span>
                </div>
              )}
              {item.coverText && (
                <div
                  className="pointer-events-none absolute inset-y-0 z-40 overflow-hidden"
                  style={{
                    left:
                      (item.templateId === "2"
                        ? 51.8
                        : item.templateId === "3"
                          ? 51.9
                          : item.templateId === "4"
                            ? 52.3
                            : 52.8) + "%",
                    width:
                      100 -
                      (item.templateId === "2"
                        ? 51.8
                        : item.templateId === "3"
                          ? 51.9
                          : item.templateId === "4"
                            ? 52.3
                            : 52.8) +
                      "%",
                  }}
                >
                  <span
                    className={
                      "pointer-events-auto absolute max-w-[88%] -translate-x-1/2 -translate-y-1/2 break-words text-center " +
                      (item.frontBold === false
                        ? "font-medium "
                        : "font-extrabold ") +
                      (item.frontItalic ? "italic" : "")
                    }
                    style={{
                      left: (item.frontTextPosition?.x ?? 75) + "%",
                      top: (item.frontTextPosition?.y ?? 48) + "%",
                      color: item.frontTextColor || "#FFFFFF",
                      fontSize: (item.frontTextSize || 24) + "px",
                    }}
                  >
                    {item.coverText}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#77716E]">
              This preview shows your selected template with uploaded front and
              back cover artwork.
            </p>
          </div>
        </div>
      )}
      <footer className="bg-[#211F1F] px-5 py-8 text-center text-[10px] tracking-wider text-[#D4A84A]">
        DWARKADHISH PAPER PRODUCTS · JAMNAGAR, GUJARAT
      </footer>
    </main>
  );
}
