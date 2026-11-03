import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { query } from "../../../lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  try {
    const result = await query(
      "SELECT id, razorpay_order_id, razorpay_payment_id, amount_paise, currency, customer, item, status, created_at FROM customer_orders WHERE owner = $1 ORDER BY created_at DESC",
      ["user:" + userId],
    );
    return NextResponse.json(
      { orders: result.rows },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Order history error:", error);
    return NextResponse.json(
      { error: "Unable to load order history. Check database configuration." },
      { status: 500 },
    );
  }
}
