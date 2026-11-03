import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are not configured." },
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
    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;

    if (
      typeof orderId !== "string" ||
      !/^order_[A-Za-z0-9]+$/.test(orderId) ||
      typeof paymentId !== "string" ||
      !/^pay_[A-Za-z0-9]+$/.test(paymentId) ||
      typeof signature !== "string" ||
      !/^[a-fA-F0-9]{64}$/.test(signature)
    ) {
      return NextResponse.json(
        { error: "Invalid payment verification details." },
        { status: 400 },
      );
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
      return NextResponse.json(
        { error: "Payment signature is invalid." },
        { status: 400 },
      );
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const headers = { Authorization: `Basic ${auth}` };
    const [orderResponse, paymentResponse] = await Promise.all([
      fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
        headers,
        cache: "no-store",
      }),
    ]);

    if (!orderResponse.ok || !paymentResponse.ok) {
      return NextResponse.json(
        { error: "Unable to confirm payment with Razorpay." },
        { status: 502 },
      );
    }

    const [order, payment] = await Promise.all([
      orderResponse.json(),
      paymentResponse.json(),
    ]);

    if (
      payment.order_id !== order.id ||
      payment.amount !== order.amount ||
      payment.currency !== order.currency
    ) {
      return NextResponse.json(
        { error: "Payment details do not match the order." },
        { status: 400 },
      );
    }

    let confirmedPayment = payment;

    // Capture an authorised payment server-side when the account uses manual capture.
    if (confirmedPayment.status === "authorized") {
      const captureResponse = await fetch(
        `https://api.razorpay.com/v1/payments/${paymentId}/capture`,
        {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: confirmedPayment.amount,
            currency: confirmedPayment.currency,
          }),
          cache: "no-store",
        },
      );

      if (!captureResponse.ok) {
        console.error("Razorpay capture failed:", await captureResponse.text());
        return NextResponse.json(
          { error: "Payment is authorised but could not be captured." },
          { status: 409 },
        );
      }
      confirmedPayment = await captureResponse.json();
    }

    if (confirmedPayment.status !== "captured") {
      return NextResponse.json(
        { error: "Payment has not been captured by Razorpay." },
        { status: 409 },
      );
    }

    return NextResponse.json({
      verified: true,
      paymentId: confirmedPayment.id,
      orderId: order.id,
      amount: confirmedPayment.amount,
      currency: confirmedPayment.currency,
    });
  } catch (error) {
    console.error("Razorpay verify-payment error:", error);
    return NextResponse.json(
      { error: "Could not verify Razorpay payment." },
      { status: 500 },
    );
  }
}
