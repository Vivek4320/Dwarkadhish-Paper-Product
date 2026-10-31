"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type LoginModalProps = {
  onClose: () => void;
  onAuthenticated: (email: string) => void;
};

type AuthMode = "login" | "signup" | "forgot";

export default function LoginModal({
  onClose,
  onAuthenticated,
}: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setMessage("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage(
        "Authentication is not configured yet. Add the Supabase environment variables and restart the app.",
      );
      setMessageType("error");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      setMessageType("error");
      return;
    }

    if (mode !== "forgot" && password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        if (data.session && data.user) {
          onAuthenticated(data.user.email ?? email.trim());
          return;
        }

        setMessage(
          "Account created. Check your email and confirm your address before logging in.",
        );
        setMessageType("success");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;
        if (data.user) onAuthenticated(data.user.email ?? email.trim());
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/reset-password`,
          },
        );

        if (error) throw error;
        setMessage(
          "If an account exists for this email, a password reset link will be sent shortly.",
        );
        setMessageType("success");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Add your Supabase environment variables to enable sign in.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
      setLoading(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <div className="login-brand-panel">
          <img
            src="/Main-Logo.png"
            alt="Dwarkadhish Paper Products"
            className="login-logo-placeholder object-contain"
          />
          <p className="login-brand-name">DWARKADHISH</p>
          <h2>
            Good ideas
            <br />
            start with a<br />
            <em>fresh page.</em>
          </h2>
          <p>
            Create an account to customise notebooks, save designs and manage
            your orders.
          </p>
          <span>GIVE MORE THAN EXPECTED.</span>
        </div>

        <div className="login-form-panel">
          <button
            className="modal-close"
            aria-label="Close login"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>

          <p className="section-eyebrow">
            {mode === "forgot" ? "ACCOUNT RECOVERY" : "WELCOME BACK"}
          </p>
          <h2 id="login-title">
            {mode === "signup"
              ? "Create your account"
              : mode === "forgot"
                ? "Reset your password"
                : "Welcome back"}
          </h2>
          <p className="login-subtitle">
            {mode === "signup"
              ? "Sign up to start creating your notebook."
              : mode === "forgot"
                ? "Enter your email and we'll send you a reset link."
                : "Sign in to continue to your account."}
          </p>

          {mode !== "forgot" && (
            <div className="login-tabs">
              <button
                type="button"
                className={mode === "login" ? "selected" : ""}
                onClick={() => changeMode("login")}
                disabled={loading}
              >
                Log in
              </button>
              <button
                type="button"
                className={mode === "signup" ? "selected" : ""}
                onClick={() => changeMode("signup")}
                disabled={loading}
              >
                Create account
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label>
                Full name
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  minLength={2}
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            {mode !== "forgot" && (
              <label>
                Password
                <input
                  type="password"
                  autoComplete={
                    isSignup ? "new-password" : "current-password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                />
              </label>
            )}

            {isSignup && (
              <label>
                Confirm password
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={8}
                />
              </label>
            )}

            {mode === "login" && (
              <button
                type="button"
                className="forgot-link"
                onClick={() => changeMode("forgot")}
              >
                Forgot password?
              </button>
            )}

            <button className="login-submit" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "signup"
                  ? "Create account"
                  : mode === "forgot"
                    ? "Send reset link"
                    : "Log in"}
            </button>
          </form>

          {mode === "forgot" && (
            <button
              type="button"
              className="google-button"
              onClick={() => changeMode("login")}
              disabled={loading}
            >
              Back to Log in
            </button>
          )}

          {mode !== "forgot" && (
            <button
              type="button"
              className="google-button"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <b>G</b> Continue with Google
            </button>
          )}

          {message && (
            <p
              className={`auth-feedback ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <p className="login-note">
            Your account is securely managed by Supabase Authentication.
          </p>
        </div>
      </section>
    </div>
  );
}
