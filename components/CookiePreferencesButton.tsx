"use client";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="transition hover:underline"
      onClick={() =>
        window.dispatchEvent(new Event("dpp:open-cookie-preferences"))
      }
    >
      Cookie Preferences
    </button>
  );
}
