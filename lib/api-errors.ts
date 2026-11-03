import { NextResponse } from "next/server";
import { DbNotConfiguredError } from "./db";

export const jsonError = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

/** Turns anything thrown inside a route handler into a clean JSON response. */
export function handleError(error: unknown) {
  if (error instanceof DbNotConfiguredError) {
    return jsonError("The cart database is not configured yet.", 503);
  }
  console.error("Cart API error:", error);
  return jsonError("Something went wrong. Please try again.", 500);
}
