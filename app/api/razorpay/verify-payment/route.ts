import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys are not configured." }, { status: 500 });
    }

    const body = await request.json();
    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;

    if (
      typeof orderId !== "string" ||
      typeof paymentId !== "string" ||
      typeof signature !== "string"
    ) {
      return NextResponse.json({ error: "Invalid payment verification details." }, { status: 400 });
    }

    const expected = createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    const expectedBuffer = Buffer.from(expected, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return NextResponse.json({ error: "Payment signature is invalid." }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(orderId),
      razorpay.payments.fetch(paymentId),
    ]);

    if (
      payment.order_id !== order.id ||
      payment.amount !== order.amount ||
      payment.currency !== order.currency
    ) {
      return NextResponse.json({ error: "Payment details do not match the order." }, { status: 400 });
    }

    if (payment.status !== "captured") {
      return NextResponse.json(
        { error: "Payment is not captured yet. Check Razorpay capture settings and retry." },
        { status: 409 },
      );
    }

    return NextResponse.json({
      verified: true,
      paymentId: payment.id,
      orderId: order.id,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error("Razorpay verify-payment error:", error);
    return NextResponse.json({ error: "Could not verify Razorpay payment." }, { status: 500 });
  }
}
