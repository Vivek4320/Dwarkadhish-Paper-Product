import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { query } from "../../../lib/db";

export async function GET(request: Request) {
  try {
    const secretKey = process.env.CLERK_SECRET_KEY;
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (!secretKey || !publishableKey) {
      console.error("Clerk server keys are missing for the orders API.");
      return NextResponse.json(
        {
          error:
            "Authentication service is not configured. Please contact the site administrator.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    // Verify the Clerk session token sent by the browser.
    const clerk = await clerkClient();
    const requestState = await clerk.authenticateRequest(request, {
      secretKey,
      publishableKey,
      clockSkewInMs: 15_000,
    });

    if (!requestState.isAuthenticated) {
      console.warn("Orders API Clerk authentication rejected:", {
        reason: requestState.reason,
        message: requestState.message,
        tokenType: requestState.tokenType,
        hasAuthorization: request.headers.has("authorization"),
        hasSessionCookie: request.headers.has("cookie"),
      });
      return NextResponse.json(
        { error: "Please sign in. Your session could not be verified." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const { userId } = requestState.toAuth();
    if (!userId) {
      return NextResponse.json(
        { error: "Please sign in. Your session could not be verified." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

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
      {
        error:
          "Unable to load order history. Check server authentication and database configuration.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
