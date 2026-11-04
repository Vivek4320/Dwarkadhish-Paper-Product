import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const COOKIE_NAME = "dwarkadhish_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;
function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  return secret;
}
function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}
export function credentialsMatch(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL || "";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  if (!expectedEmail || !expectedPassword) return false;
  const safeEqual = (a: string, b: string) => {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    return left.length === right.length && timingSafeEqual(left, right);
  };
  return safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) && safeEqual(password, expectedPassword);
}
export async function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const value = String(expiresAt);
  const store = await cookies();
  store.set(COOKIE_NAME, value + "." + sign(value), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
}
export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
}
export async function hasAdminSession() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value || "";
  const [expiresAt, signature] = raw.split(".");
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;
  const expected = sign(expiresAt);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  return Number(expiresAt) > Math.floor(Date.now() / 1000);
}
