"use client";
import { useState } from "react";
export default function LoginModal({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
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
          >
            ×
          </button>
          <p className="section-eyebrow">WELCOME BACK</p>
          <h2 id="login-title">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p className="login-subtitle">
            {isSignup
              ? "Sign up to start creating your notebook."
              : "Sign in to continue to your account."}
          </p>
          <div className="login-tabs">
            <button
              className={!isSignup ? "selected" : ""}
              onClick={() => setIsSignup(false)}
            >
              Log in
            </button>
            <button
              className={isSignup ? "selected" : ""}
              onClick={() => setIsSignup(true)}
            >
              Create account
            </button>
          </div>
          {isSignup && (
            <label>
              Full name
              <input type="text" placeholder="Enter your full name" />
            </label>
          )}
          <label>
            Email address
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter your password" />
          </label>
          {!isSignup && (
            <a className="forgot-link" href="#contact">
              Forgot password?
            </a>
          )}
          <button className="login-submit" onClick={onContinue}>
            {isSignup ? "Create account" : "Log in"}
          </button>
          <button className="google-button" onClick={onContinue}>
            <b>G</b> Continue with Google
          </button>
          <p className="login-note">
            Demo interface — account services can be connected later.
          </p>
        </div>
      </section>
    </div>
  );
}
