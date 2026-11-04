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
  };
};

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[c] || c);

async function toDataUrl(path: string) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Notebook artwork could not be loaded.");
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Image conversion failed."));
    reader.onerror = () => reject(new Error("Image conversion failed."));
    reader.readAsDataURL(blob);
  });
}

export default function AdminOrderDesignDownload({ order }: { order: DesignOrder }) {
  const [busy, setBusy] = useState<"svg" | "pdf" | null>(null);

  async function buildSvg() {
    const id = ["1", "2", "3", "4"].includes(order.item.templateId || "") ? order.item.templateId! : "1";
    const [start, end] = ({ "1": [47.1, 52.8], "2": [48, 51.8], "3": [47.8, 51.9], "4": [48.4, 52.3] } as Record<string, number[]>)[id];
    const [base, overlay, label, logo] = await Promise.all([
      toDataUrl("/Templates/Template-" + id + ".png"),
      toDataUrl("/Templates/Template-" + id + "-overlay.png"),
      toDataUrl("/branding/product-label.png"),
      toDataUrl("/branding/warrior-logo.png"),
    ]);
    const backW = start * 14.4;
    const frontX = end * 14.4;
    const frontW = 1440 - frontX;
    const makeText = (value: string | undefined, side: "front" | "back") => {
      if (!value) return "";
      const front = side === "front";
      const pos = front ? order.item.frontTextPosition : order.item.backTextPosition;
      const x = front ? frontX + ((pos?.x ?? 75) / 100) * frontW : ((pos?.x ?? 23) / 100) * backW;
      const y = ((pos?.y ?? 48) / 100) * 1000;
      const color = front ? order.item.frontTextColor || "#fff" : order.item.backTextColor || "#fff";
      const size = (front ? order.item.frontTextSize : order.item.backTextSize) || 24;
      const bold = (front ? order.item.frontBold : order.item.backBold) !== false;
      const italic = (front ? order.item.frontItalic : order.item.backItalic) ? "italic" : "normal";
      return '<text x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="middle" fill="' + escapeXml(color) + '" font-family="Arial,sans-serif" font-size="' + size * 2.2 + '" font-weight="' + (bold ? 800 : 500) + '" font-style="' + italic + '">' + escapeXml(value) + "</text>";
    };

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1440" height="1000" viewBox="0 0 1440 1000">
<title>Dwarkadhish order ${escapeXml(order.id)}</title>
<defs><clipPath id="back-clip"><rect width="${backW}" height="1000"/></clipPath><clipPath id="front-clip"><rect x="${frontX}" width="${frontW}" height="1000"/></clipPath></defs>
<g id="template-background"><image width="1440" height="1000" xlink:href="${base}"/></g>
<g id="customer-back-photo">${order.item.backUploadedImage ? '<image width="' + backW + '" height="1000" preserveAspectRatio="xMidYMid slice" clip-path="url(#back-clip)" xlink:href="' + order.item.backUploadedImage + '"/>' : ""}</g>
<g id="customer-front-photo">${order.item.uploadedImage ? '<image x="' + frontX + '" width="' + frontW + '" height="1000" preserveAspectRatio="xMidYMid slice" clip-path="url(#front-clip)" xlink:href="' + order.item.uploadedImage + '"/>' : ""}</g>
<g id="template-overlay"><image width="1440" height="1000" xlink:href="${overlay}"/></g>
<g id="product-label"><image x="0" y="930" width="${backW}" height="70" preserveAspectRatio="xMinYMax meet" xlink:href="${label}"/></g>
<g id="brand-logo"><image x="1260" y="35" width="145" height="100" preserveAspectRatio="xMidYMin meet" xlink:href="${logo}"/></g>
<g id="customer-back-text">${makeText(order.item.backCoverText, "back")}</g>
<g id="customer-front-text">${makeText(order.item.coverText, "front")}</g>
</svg>`;
  }

  async function downloadSvg() {
    setBusy("svg");
    try {
      const svg = await buildSvg();
      const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Dwarkadhish-Order-" + order.id.slice(0, 8) + "-Editable.svg";
      document.body.appendChild(a); a.click(); a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "SVG export failed.");
    } finally { setBusy(null); }
  }

  async function savePdf() {
    setBusy("pdf");
    try {
      const svg = await buildSvg();
      const printWindow = window.open("", "_blank");
      if (!printWindow) throw new Error("Please allow pop-ups to create the PDF.");
      printWindow.document.open();
      printWindow.document.write(`<!doctype html><html><head><title>Dwarkadhish Order ${escapeXml(order.id)}</title><style>@page{size:landscape;margin:0}html,body{margin:0;width:100%;height:100%}svg{width:100vw;height:100vh;object-fit:contain} .hint{font:14px Arial;padding:12px;text-align:center}@media print{.hint{display:none}}</style></head><body><div class="hint">In the print dialog, choose “Save as PDF”.</div>${svg}<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),400));</script></body></html>`);
      printWindow.document.close();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "PDF export failed.");
    } finally { setBusy(null); }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => void downloadSvg()} disabled={busy !== null} className="whitespace-nowrap rounded-lg border border-[#d71920] px-3 py-2 text-[10px] font-bold text-[#d71920] hover:bg-[#fff2f2] disabled:opacity-50">
        {busy === "svg" ? "Preparing..." : "Download Editable SVG"}
      </button>
      <button type="button" onClick={() => void savePdf()} disabled={busy !== null} className="whitespace-nowrap rounded-lg bg-[#d71920] px-3 py-2 text-[10px] font-bold text-white hover:bg-[#b9151b] disabled:opacity-50">
        {busy === "pdf" ? "Preparing..." : "Save Vector PDF"}
      </button>
    </div>
  );
}
