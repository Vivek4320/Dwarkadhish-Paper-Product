import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { query } from "../../../lib/db";

export async function GET(request: Request) {
  try {
    // Use the auth context established by Clerk's Next.js proxy middleware.
    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated || !userId) {
      return NextResponse.json(
        { error: "Please sign in. Your session could not be verified." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const result = await query(
      "SELECT id, razorpay_order_id, razorpay_payment_id, amount_paise, currency, customer, item, status, tracking_number, created_at FROM customer_orders WHERE owner = $1 ORDER BY created_at DESC",
      ["user:" + userId],
    );

    return NextResponse.json(
      { orders: result.rows },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Order history error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to load order history. Check server authentication and database configuration.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
