"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import AuthLoading from "./AuthLoading";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const { isLoaded } = useUser();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Sign in">
        {isLoaded ? (
          <SignIn routing="hash" />
        ) : (
          <div className="rounded-2xl bg-white p-8">
            <AuthLoading label="Loading sign-in..." />
          </div>
        )}
      </div>
    </div>
  );
}
