import { NextResponse } from "next/server";
import { hasAdminSession } from "../../../../../lib/admin-auth";
import { query } from "../../../../../lib/db";

export async function POST(request: Request) {
  try {
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const trackingNumber = typeof body.trackingNumber === "string"
      ? body.trackingNumber.trim().toUpperCase()
      : "";
    if (!/^[0-9a-f-]{36}$/i.test(orderId)) {
      return NextResponse.json({ error: "Invalid order ID." }, { status: 400 });
    }
    if (trackingNumber.length > 40 || (trackingNumber && !/^[A-Z0-9]+$/.test(trackingNumber))) {
      return NextResponse.json({ error: "Enter a valid India Post consignment number." }, { status: 400 });
    }
    const result = await query(
      "UPDATE customer_orders SET tracking_number = $2 WHERE id = $1 RETURNING id, tracking_number",
      [orderId, trackingNumber || null],
    );
    if (!result.rowCount) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, trackingNumber: result.rows[0].tracking_number });
  } catch (error) {
    console.error("Admin tracking update failed:", error);
    return NextResponse.json({ error: "Could not save the tracking number." }, { status: 500 });
  }
}
