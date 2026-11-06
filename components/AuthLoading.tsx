"use client";

import { useEffect, useState } from "react";

/** Shown while the sign-in service loads. Explains itself if it never does. */
export default function AuthLoading({ label }: { label: string }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center text-sm text-[#77716E]">
      <p>{slow ? "Sign-in is taking too long to load." : label}</p>
      {slow && (
        <>
          <p className="mt-1 text-xs">
            Please check your internet connection and try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-lg bg-[#DF151D] px-4 py-2 text-xs font-bold text-white"
          >
            Reload page
          </button>
        </>
      )}
    </div>
  );
}
