"use client";

import { useState } from "react";

type DesignOrder = {
  id: string;
  item: {
    templateId?: string;
    uploadedImage?: string | null;
    backUploadedImage?: string | null;
    coverText?: string;
    backCoverText?: string;
    frontTextColor?: string;
    backTextColor?: string;
    frontBold?: boolean;
    backBold?: boolean;
    frontItalic?: boolean;
    backItalic?: boolean;
    frontTextPosition?: { x: number; y: number };
    backTextPosition?: { x: number; y: number };
    frontTextSize?: number;
    backTextSize?: number;
    frontZoom?: number;
    backZoom?: number;
  };
};

const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c] || c,
  );

async function toDataUrl(path: string) {
  const response = await fetch(path);
  if (!response.ok)
    throw new Error("Notebook template artwork could not be loaded.");
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Image conversion failed."));
    reader.onerror = () => reject(new Error("Image conversion failed."));
    reader.readAsDataURL(blob);
  });
}

export default function AdminOrderDesignDownload({
  order,
}: {
  order: DesignOrder;
}) {
  const [busy, setBusy] = useState(false);
  async function download() {
    setBusy(true);
    try {
      const id = ["1", "2", "3", "4"].includes(order.item.templateId || "")
        ? order.item.templateId!
        : "1";
      const [start, end] = (
        {
          "1": [47.1, 52.8],
          "2": [48, 51.8],
          "3": [47.8, 51.9],
          "4": [48.4, 52.3],
        } as Record<string, number[]>
      )[id];
      const [base, overlay, label, logo] = await Promise.all([
        toDataUrl("/Templates/Template-" + id + ".png"),
        toDataUrl("/Templates/Template-" + id + "-overlay.png"),
        toDataUrl("/branding/product-label.png"),
        toDataUrl("/branding/warrior-logo.png"),
      ]);
      const backW = start * 14.4;
      const frontX = end * 14.4;
      const frontW = 1440 - frontX;
      const text = (value: string | undefined, side: "front" | "back") => {
        if (!value) return "";
        const front = side === "front";
        const pos = front
          ? order.item.frontTextPosition
          : order.item.backTextPosition;
        const x = front
          ? frontX + ((pos?.x ?? 75) / 100) * frontW
          : ((pos?.x ?? 23) / 100) * backW;
        const y = ((pos?.y ?? 48) / 100) * 1000;
        const color = front
          ? order.item.frontTextColor || "#fff"
          : order.item.backTextColor || "#fff";
        const size =
          (front ? order.item.frontTextSize : order.item.backTextSize) || 24;
        const bold =
          (front ? order.item.frontBold : order.item.backBold) !== false;
        const italic = (front ? order.item.frontItalic : order.item.backItalic)
          ? "italic"
          : "normal";
        return (
          '<text x="' +
          x +
          '" y="' +
          y +
          '" text-anchor="middle" dominant-baseline="middle" fill="' +
          escapeXml(color) +
          '" font-family="Arial,sans-serif" font-size="' +
          size * 2.2 +
          '" font-weight="' +
          (bold ? 800 : 500) +
          '" font-style="' +
          italic +
          '">' +
          escapeXml(value) +
          "</text>"
        );
      };
      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1440" height="1000" viewBox="0 0 1440 1000">
<defs><clipPath id="back"><rect width="${backW}" height="1000"/></clipPath><clipPath id="front"><rect x="${frontX}" width="${frontW}" height="1000"/></clipPath></defs>
<image width="1440" height="1000" xlink:href="${base}"/>
${order.item.backUploadedImage ? '<image width="' + backW + '" height="1000" preserveAspectRatio="xMidYMid slice" clip-path="url(#back)" xlink:href="' + order.item.backUploadedImage + '"/>' : ""}
${order.item.uploadedImage ? '<image x="' + frontX + '" width="' + frontW + '" height="1000" preserveAspectRatio="xMidYMid slice" clip-path="url(#front)" xlink:href="' + order.item.uploadedImage + '"/>' : ""}
<image width="1440" height="1000" xlink:href="${overlay}"/>
<image x="0" y="930" width="${backW}" height="70" preserveAspectRatio="xMinYMax meet" xlink:href="${label}"/>
<image x="1260" y="35" width="145" height="100" preserveAspectRatio="xMidYMin meet" xlink:href="${logo}"/>
${text(order.item.backCoverText, "back")}${text(order.item.coverText, "front")}
</svg>`;
      const url = URL.createObjectURL(
        new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "Dwarkadhish-Order-" + order.id.slice(0, 8) + ".svg";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Design export failed.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <button
      type="button"
      onClick={() => void download()}
      disabled={busy}
      className="whitespace-nowrap rounded-lg border border-[#d71920] px-3 py-2 text-[10px] font-bold text-[#d71920] hover:bg-[#fff2f2] disabled:opacity-50"
    >
      {busy ? "Preparing..." : "Download SVG"}
    </button>
  );
}
