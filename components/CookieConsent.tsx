"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preferences = {
  essential: true;
  analytics: boolean;
  preferences: boolean;
};
const STORAGE_KEY = "dpp-cookie-consent-v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choices, setChoices] = useState<Preferences>({
    essential: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
    const openPreferences = () => {
      setVisible(true);
      setSettings(true);
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setChoices({ essential: true, analytics: Boolean(parsed.analytics), preferences: Boolean(parsed.preferences) });
        }
      } catch { /* Keep safe defaults if stored data is unavailable. */ }
    };
    window.addEventListener("dpp:open-cookie-preferences", openPreferences);
    return () => window.removeEventListener("dpp:open-cookie-preferences", openPreferences);
  }, []);

  function save(next: Preferences) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...next,
          savedAt: new Date().toISOString(),
          version: 1,
        }),
      );
    } finally {
      setVisible(false);
      setSettings(false);
    }
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-[#e7e1db] bg-white p-5 text-[#211f1e] shadow-[0_18px_60px_rgba(0,0,0,.2)] sm:inset-x-6 sm:bottom-6 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold tracking-[.16em] text-[#d71920]">
            YOUR PRIVACY
          </p>
          <h2 id="cookie-consent-title" className="mt-1 text-lg font-bold">
            Cookie preferences
          </h2>
        </div>
        <span aria-hidden="true" className="text-2xl">
          🍪
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[#625d58]">
        We use essential browser storage and service cookies to keep the
        website, sign-in and cart working. Optional analytics and preference
        cookies are off unless you choose them. Read our{" "}
        <Link
          className="font-semibold text-[#07558d] underline"
          href="/cookie-policy"
        >
          Cookie Policy
        </Link>{" "}
        and{" "}
        <Link
          className="font-semibold text-[#07558d] underline"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        .
      </p>

      {settings && (
        <div className="mt-4 space-y-3 rounded-xl bg-[#f7f8fa] p-4">
          <label className="flex items-center justify-between gap-4 text-sm">
            <span>
              <strong className="block">Essential</strong>
              <span className="text-xs text-[#777]">
                Required for core site functions; always active.
              </span>
            </span>
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Essential cookies always active"
            />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm">
            <span>
              <strong className="block">Analytics</strong>
              <span className="text-xs text-[#777]">
                Usage measurement, if an analytics service is enabled.
              </span>
            </span>
            <input
              type="checkbox"
              checked={choices.analytics}
              onChange={(e) =>
                setChoices((v) => ({ ...v, analytics: e.target.checked }))
              }
            />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm">
            <span>
              <strong className="block">Preferences</strong>
              <span className="text-xs text-[#777]">
                Remember optional display choices.
              </span>
            </span>
            <input
              type="checkbox"
              checked={choices.preferences}
              onChange={(e) =>
                setChoices((v) => ({ ...v, preferences: e.target.checked }))
              }
            />
          </label>
          <p className="text-xs text-[#777]">
            Changing these choices records your preference only. Optional
            analytics or advertising scripts are not currently activated by this
            consent component.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() =>
            save({ essential: true, analytics: true, preferences: true })
          }
          className="min-h-10 rounded-lg bg-[#07558d] px-4 text-sm font-bold text-white"
        >
          Accept All
        </button>
        <button
          onClick={() =>
            save({ essential: true, analytics: false, preferences: false })
          }
          className="min-h-10 rounded-lg border border-[#d5d9dd] bg-white px-4 text-sm font-semibold"
        >
          Reject Optional
        </button>
        {settings ? (
          <button
            onClick={() => save(choices)}
            className="min-h-10 rounded-lg border border-[#d5d9dd] px-4 text-sm font-semibold"
          >
            Save Preferences
          </button>
        ) : (
          <button
            onClick={() => setSettings(true)}
            className="min-h-10 rounded-lg border border-[#d5d9dd] px-4 text-sm font-semibold"
          >
            Customize
          </button>
        )}
      </div>
    </aside>
  );
}
