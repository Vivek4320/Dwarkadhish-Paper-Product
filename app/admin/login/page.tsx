"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f6f6] px-5 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#eaeaea] bg-white p-7 shadow-sm sm:p-9">
        <Link
          href="/"
          className="text-xs font-bold tracking-[.2em] text-[#c90d16]"
        >
          DWARKADHISH PAPER PRODUCTS
        </Link>
        <p className="mt-9 text-sm font-semibold text-[#c90d16]">
          ADMIN PORTAL
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#171717]">Welcome back</h1>
        <p className="mt-2 text-sm text-[#777]">
          Sign in to manage your store dashboard.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold text-[#444]"
            >
              Admin email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#ddd] px-4 text-sm outline-none focus:border-[#c90d16]"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold text-[#444]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#ddd] px-4 text-sm outline-none focus:border-[#c90d16]"
              placeholder="Enter admin password"
            />
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-[#c90d16] text-sm font-bold text-white hover:bg-[#a90b13] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <Link href="/" className="mt-6 block text-center text-xs text-[#888]">
          ← Back to Store
        </Link>
      </section>
    </main>
  );
}
