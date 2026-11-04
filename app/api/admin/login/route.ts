import { NextResponse } from "next/server";
import { createAdminSession, credentialsMatch } from "../../../../lib/admin-auth";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return NextResponse.json({ error: "Admin login is not configured on the server." }, { status: 503 });
    if (!credentialsMatch(email, password)) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    await createAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
