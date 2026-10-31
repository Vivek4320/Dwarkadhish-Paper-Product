"use client";

import { SignIn } from "@clerk/nextjs";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Sign in">
        <SignIn routing="hash" />
      </div>
    </div>
  );
}
