"use client";

import { SignIn } from "@clerk/nextjs";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
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
            Sign in or create an account to customise notebooks, save designs
            and manage your orders.
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
          <p className="section-eyebrow">WELCOME</p>
          <h2 id="login-title">Your account</h2>
          <p className="login-subtitle">
            Sign in or create your Dwarkadhish Paper Products account.
          </p>
          <SignIn routing="hash" />
          <p className="login-note">
            Your account is securely managed by Clerk.
          </p>
        </div>
      </section>
    </div>
  );
}
