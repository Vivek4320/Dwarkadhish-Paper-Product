"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase is not configured. Please try again later.");
      setReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setValidSession(Boolean(data.session));
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setValidSession(Boolean(session));
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSuccess(true);
    setMessage("Your password has been updated. You can now log in.");
    await supabase.auth.signOut();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F2] px-5 py-12 text-[#211F1F]">
      <section className="w-full max-w-[440px] rounded-xl border border-[#E5DED4] bg-white p-7 shadow-[0_18px_55px_rgba(33,31,31,0.08)] sm:p-9">
        <img
          src="/Main-Logo.png"
          alt="Dwarkadhish Paper Products"
          className="mb-6 h-14 w-20 object-contain"
        />
        <p className="text-[11px] font-extrabold tracking-[0.12em] text-[#D9252B]">
          ACCOUNT RECOVERY
        </p>
        <h1 className="mt-2 text-2xl font-bold">Set a new password</h1>
        <p className="mt-2 text-sm leading-6 text-[#6E6966]">
          Choose a new password for your Dwarkadhish Paper Products account.
        </p>

        {!ready ? (
          <p className="mt-6 text-sm text-[#6E6966]">Verifying your reset link...</p>
        ) : success ? (
          <p className="mt-6 rounded-md bg-[#F0F8F0] p-3 text-sm text-[#28633A]">
            {message}
          </p>
        ) : validSession ? (
          <form onSubmit={handleSubmit} className="mt-6">
            <label className="block text-xs font-bold">
              New password
              <input
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-[#D8D1CA] px-3 text-sm outline-none focus:border-[#D9252B]"
                placeholder="At least 8 characters"
              />
            </label>
            <label className="mt-4 block text-xs font-bold">
              Confirm new password
              <input
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-[#D8D1CA] px-3 text-sm outline-none focus:border-[#D9252B]"
                placeholder="Re-enter your password"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 h-11 w-full rounded-md bg-[#D9252B] text-sm font-bold text-white transition hover:bg-[#AD171F] disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        ) : (
          <p className="mt-6 rounded-md bg-[#FFF3F0] p-3 text-sm text-[#A51F26]">
            This password reset link is invalid or has expired. Request a new
            link from the login window.
          </p>
        )}

        {message && !success && (
          <p className="mt-4 text-sm text-[#A51F26]" role="alert">
            {message}
          </p>
        )}
        <Link
          href="/"
          className="mt-6 inline-flex text-sm font-bold text-[#D9252B] hover:underline"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
