"use client";

import Link from "next/link";
import { SignIn, useUser } from "@clerk/nextjs";

export default function OrdersPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 text-sm text-[#77716E]">
        Loading...
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F1] px-4 py-12">
        <section className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg sm:p-8">
          <h1 className="text-2xl font-bold text-[#211F1F]">
            Login to view your orders
          </h1>
          <p className="mt-2 text-sm text-[#77716E]">
            Sign in to access your order history.
          </p>
          <div className="mt-6 flex justify-center">
            <SignIn routing="hash" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 text-[#211F1F]">
      <Link href="/" className="text-xs font-bold text-[#D71920]">
        ← Back to Home
      </Link>
      <h1 className="mt-4 text-3xl font-bold">My Orders</h1>
      <section className="mt-6 rounded-xl border border-[#E9E3DD] bg-white p-8 text-center">
        <h2 className="text-lg font-bold">Order history</h2>
        <p className="mt-2 text-sm leading-6 text-[#77716E]">
          Your confirmed orders will appear here once order placement and
          payment confirmation are connected.
        </p>
        <Link
          href="/customize-book"
          className="mt-5 inline-block rounded-lg bg-[#D71920] px-5 py-3 text-xs font-bold text-white"
        >
          Customise a notebook
        </Link>
      </section>
    </main>
  );
}
