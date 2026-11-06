"use client";

import { useState } from "react";

export default function AdminTrackingEditor({
  orderId,
  initialTrackingNumber,
}: {
  orderId: string;
  initialTrackingNumber?: string | null;
}) {
  const [value, setValue] = useState(initialTrackingNumber || "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/orders/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, trackingNumber: value }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Could not save tracking number.");
      setValue(data.trackingNumber || "");
      setMessage(
        value.trim() ? "Tracking number saved" : "Tracking number removed",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-w-[190px] space-y-2">
      <input
        value={value}
        onChange={(event) =>
          setValue(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
        }
        maxLength={40}
        placeholder="India Post consignment no."
        aria-label={`India Post tracking number for order ${orderId}`}
        className="w-full rounded-md border border-[#ddd] px-2 py-2 text-[11px] outline-none focus:border-[#d71920]"
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => void save()}
        className="rounded-md bg-[#d71920] px-3 py-2 text-[10px] font-bold text-white disabled:opacity-50"
      >
        {busy ? "Saving..." : "Save Tracking"}
      </button>
      {message && (
        <p role="status" className="text-[10px] text-[#666]">
          {message}
        </p>
      )}
    </div>
  );
}
