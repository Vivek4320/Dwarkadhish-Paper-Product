import { NextResponse } from "next/server";
import Razorpay from "razorpay";

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

    const body = await request.json();
    const pages = Number(body.pages);
    const quantity = Number(body.quantity);

    if (!Number.isInteger(pages) || !(pages in PAGE_PRICES)) {
      return NextResponse.json({ error: "Invalid notebook page option." }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      return NextResponse.json({ error: "Invalid notebook quantity." }, { status: 400 });
    }

    // Never trust the browser's displayed total: calculate the payable amount here.
    const amount = (PAGE_PRICES[pages] * quantity + SHIPPING_FEE) * 100;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `dwp_${Date.now()}`,
      notes: { pages: String(pages), quantity: String(quantity) },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay create-order error:", error);
    return NextResponse.json({ error: "Could not create Razorpay order." }, { status: 500 });
  }
}
