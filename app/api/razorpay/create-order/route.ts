import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PAGE_PRICES: Record<number, number> = {
  200: 90,
  184: 84,
  160: 78,
  144: 72,
  104: 48,
};
const SHIPPING_FEE = 50;

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are not configured on the server." },
        { status: 500 },
      );
    }

    if (!keyId.startsWith("rzp_test_")) {
      return NextResponse.json(
        {
          error:
            "This integration is configured for Razorpay Test Mode keys only.",
        },
        { status: 400 },
      );
    }

    const body = await request.json();
    const pages = Number(body.pages);
    const quantity = Number(body.quantity);

    if (!Number.isInteger(pages) || !(pages in PAGE_PRICES)) {
      return NextResponse.json(
        { error: "Invalid notebook page option." },
        { status: 400 },
      );
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      return NextResponse.json(
        { error: "Invalid notebook quantity." },
        { status: 400 },
      );
    }

    // Recalculate the amount on the server; never trust the browser's total.
    const amount = (PAGE_PRICES[pages] * quantity + SHIPPING_FEE) * 100;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `dwp_${Date.now()}`,
        notes: { pages: String(pages), quantity: String(quantity) },
      }),
      cache: "no-store",
    });
    const order = await response.json();

    if (!response.ok) {
      console.error("Razorpay order creation failed:", order);
      return NextResponse.json(
        { error: "Razorpay could not create the order." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay create-order error:", error);
    return NextResponse.json(
      { error: "Could not create Razorpay order." },
      { status: 500 },
    );
  }
}
