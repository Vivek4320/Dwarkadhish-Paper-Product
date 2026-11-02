"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";

const templates = [
  {
    id: "1",
    name: "Template 1",
    image: "/Templates/Template-1.png",
    color: "#FFFFFF",
    text: "",
    textColor: "#202020",
  },
  {
    id: "2",
    name: "Template 2",
    image: "/Templates/Template-2.png",
    color: "#FFFFFF",
    text: "",
    textColor: "#202020",
  },
  {
    id: "3",
    name: "Template 3",
    image: "/Templates/Template-3.png",
    color: "#FFFFFF",
    text: "",
    textColor: "#202020",
  },
  {
    id: "4",
    name: "Template 4",
    image: "/Templates/Template-4.png",
    color: "#FFFFFF",
    text: "",
    textColor: "#202020",
  },
] as const;

const pageOptions = [
  { pages: 200, price: 90 },
  { pages: 184, price: 84 },
  { pages: 160, price: 78 },
  { pages: 144, price: 72 },
  { pages: 104, price: 48 },
];

export default function CustomizeBookPage() {
  const router = useRouter();
  const [templateId, setTemplateId] = useState<string>("1");
  const [coverColor, setCoverColor] = useState("#FFFFFF");
  const [coverText, setCoverText] = useState("");
  const [backCoverColor, setBackCoverColor] = useState("#F7F7F5");
  const [backCoverText, setBackCoverText] = useState(
    "DWARKADHISH PAPER PRODUCTS",
  );
  const [backUploadedImage, setBackUploadedImage] = useState<string | null>(
    null,
  );
  const [frontZoom, setFrontZoom] = useState(1);
  const [backZoom, setBackZoom] = useState(1);
  const [activeCover, setActiveCover] = useState<"front" | "back">("front");
  const [quantity, setQuantity] = useState(1);
  const [pages, setPages] = useState(200);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const selectedTemplate =
    templates.find((item) => item.id === templateId) ?? templates[0];
  const unitPrice =
    pageOptions.find((item) => item.pages === pages)?.price ?? 90;
  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  function selectTemplate(id: string) {
    const template = templates.find((item) => item.id === id);
    if (!template) return;
    setTemplateId(id);
    setCoverColor(template.color);
    const nextText = template.text;
    if (activeCover === "front") {
      setCoverColor(template.color);
      setCoverText(nextText);
    } else {
      setBackCoverColor(template.color);
      setBackCoverText(nextText);
    }
    setMessage("");
  }

  function handleUpload(
    event: ChangeEvent<HTMLInputElement>,
    side: "front" | "back",
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Please choose a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("The selected image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : null;
      if (side === "front") setUploadedImage(image);
      else setBackUploadedImage(image);
      setMessage(`${side === "front" ? "Front" : "Back"} cover image added.`);
    };
    reader.readAsDataURL(file);
  }

  function resetDesign() {
    setTemplateId("1");
    setCoverColor(templates[0].color);
    setCoverText("");
    setBackCoverColor("#FFFFFF");
    setBackCoverText("");
    setBackUploadedImage(null);
    setFrontZoom(1);
    setBackZoom(1);
    setActiveCover("front");
    setQuantity(1);
    setPages(200);
    setUploadedImage(null);
    setMessage("Design reset to Template 1.");
  }

  function submitDesign(action: "cart" | "buy") {
    if (action === "cart") {
      setMessage("Cart functionality will be connected later.");
      return;
    }

    const checkoutItem = {
      templateId,
      templateName: selectedTemplate.name,
      coverColor,
      coverText,
      uploadedImage,
      backCoverColor,
      backCoverText,
      backUploadedImage,
      frontZoom,
      backZoom,
      pages,
      quantity,
      unitPrice,
      total,
    };
    sessionStorage.setItem(
      "dwarkadhish-checkout-item",
      JSON.stringify(checkoutItem),
    );
    router.push("/checkout");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white font-[Arial,Helvetica,sans-serif] text-[#211F1F]">
      <div className="bg-[#211F1F] px-5 py-2 text-[10px] font-semibold tracking-wide text-[#D4A84A] sm:px-10">
        STATIONERY MANUFACTURER · CUSTOM &amp; BULK ORDERS
      </div>
      <div className="border-b border-[#E9E3DD] bg-white px-5 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#E9E3DD] px-4 py-2.5 text-sm font-semibold text-[#211F1F] transition hover:border-[#D71920] hover:text-[#D71920]"
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        <p className="text-xs text-[#6E6966]">
          <Link href="/" className="hover:text-[#D71920]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/products" className="hover:text-[#D71920]">
            Products
          </Link>{" "}
          / <span className="text-[#D71920]">Customize Book</span>
        </p>
        <div className="mt-7">
          <h1 className="text-3xl font-bold tracking-tight sm:text-[38px]">
            Customise your notebook
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6E6966] sm:text-[15px]">
            Choose a cover template, adjust quantity, and keep product
            specifications consistent across every design.
          </p>
        </div>

        <div className="mt-9 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
          <section className="xl:sticky xl:top-6">
            <div className="rounded-2xl bg-[#F5F2ED] p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">Live open-book preview</p>
                  <p className="mt-1 text-[10px] text-[#77716E]">
                    Adjust from 30% (smaller) to 250% (zoomed in). Default size
                    is 100%.
                  </p>
                  <p className="mt-1 text-[10px] text-[#77716E]">
                    A single notebook opened flat on a table
                  </p>
                </div>
                <div className="flex rounded-full bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setActiveCover("back")}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition ${activeCover === "back" ? "bg-[#D71920] text-white" : "text-[#6E6966]"}`}
                  >
                    Edit back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCover("front")}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition ${activeCover === "front" ? "bg-[#D71920] text-white" : "text-[#6E6966]"}`}
                  >
                    Edit front
                  </button>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[680px] rounded-md bg-[#c9beb0] p-[7px] shadow-[0_18px_35px_rgba(55,42,30,0.18)]">
                <div className="relative flex overflow-hidden rounded-[3px]">
                  <div
                    className={`relative flex min-w-0 flex-1 flex-col items-center overflow-hidden border-r border-black/10 px-2 pb-5 pt-5 transition-shadow sm:px-4 sm:pt-7 ${activeCover === "back" ? "ring-2 ring-inset ring-[#D71920]" : ""}`}
                    style={{
                      backgroundColor: backCoverColor,
                      backgroundImage: `url("${selectedTemplate.image}")`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      aspectRatio: "0.72 / 1",
                    }}
                  >
                    {backUploadedImage && (
                      <>
                        <img
                          src={backUploadedImage}
                          alt=""
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-3 z-0 h-[calc(100%+24px)] w-[calc(100%+24px)] scale-110 object-cover opacity-70 blur-xl"
                        />
                        <img
                          src={backUploadedImage}
                          alt="Back cover full-page artwork"
                          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
                          style={{ transform: `scale(${backZoom})` }}
                        />
                      </>
                    )}
                    <span className="pointer-events-none absolute inset-2 border border-[#D6B65D]/70 sm:inset-3" />
                    <p
                      className="relative z-20 mb-3 max-w-full break-words text-center text-[10px] font-extrabold sm:mb-5 sm:text-sm"
                      style={{ color: selectedTemplate.textColor }}
                    >
                      {backCoverText}
                    </p>
                    <label className="absolute inset-0 z-[15] flex cursor-pointer items-center justify-center">
                      {!backUploadedImage && (
                        <span className="flex flex-col items-center gap-1 rounded-lg border-2 border-dashed border-[#bdb7b1] bg-white/90 px-4 py-5 text-[#77716E] sm:px-8 sm:py-8">
                          <span className="text-2xl leading-none sm:text-3xl">
                            ↑
                          </span>
                          <span className="text-[9px] font-semibold sm:text-xs">
                            Upload back cover photo
                          </span>
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => {
                          setActiveCover("back");
                          handleUpload(event, "back");
                        }}
                        className="sr-only"
                      />
                    </label>
                    <div
                      className="relative z-20 mt-auto pt-3 text-center text-[7px] font-semibold tracking-widest sm:text-[9px]"
                      style={{ color: selectedTemplate.textColor }}
                    >
                      DWARKADHISH
                      <br />
                      PAPER PRODUCTS
                    </div>
                  </div>

                  <div className="relative z-30 w-[10px] shrink-0 bg-gradient-to-r from-[#6f6255] via-[#e6ddd0] to-[#746759] shadow-[0_0_9px_rgba(0,0,0,0.28)] sm:w-[14px]">
                    <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/20" />
                  </div>

                  <div
                    className={`relative flex min-w-0 flex-1 flex-col items-center overflow-hidden px-2 pb-5 pt-5 transition-shadow sm:px-4 sm:pt-7 ${activeCover === "front" ? "ring-2 ring-inset ring-[#D71920]" : ""}`}
                    style={{
                      backgroundColor: coverColor,
                      backgroundImage: `url("${selectedTemplate.image}")`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      aspectRatio: "0.72 / 1",
                    }}
                  >
                    {uploadedImage && (
                      <>
                        <img
                          src={uploadedImage}
                          alt=""
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-3 z-0 h-[calc(100%+24px)] w-[calc(100%+24px)] scale-110 object-cover opacity-70 blur-xl"
                        />
                        <img
                          src={uploadedImage}
                          alt="Front cover full-page artwork"
                          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
                          style={{ transform: `scale(${frontZoom})` }}
                        />
                      </>
                    )}
                    <span className="pointer-events-none absolute inset-2 border border-[#D6B65D]/70 sm:inset-3" />
                    <p
                      className="relative z-20 mb-3 max-w-full break-words text-center text-[10px] font-extrabold sm:mb-5 sm:text-sm"
                      style={{ color: selectedTemplate.textColor }}
                    >
                      {coverText || selectedTemplate.text}
                    </p>
                    <label className="absolute inset-0 z-[15] flex cursor-pointer items-center justify-center">
                      {!uploadedImage && (
                        <span className="flex flex-col items-center gap-1 rounded-lg border-2 border-dashed border-[#bdb7b1] bg-white/90 px-4 py-5 text-[#77716E] sm:px-8 sm:py-8">
                          <span className="text-2xl leading-none sm:text-3xl">
                            ↑
                          </span>
                          <span className="text-[9px] font-semibold sm:text-xs">
                            Upload front cover photo
                          </span>
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => {
                          setActiveCover("front");
                          handleUpload(event, "front");
                        }}
                        className="sr-only"
                      />
                    </label>
                    <div
                      className="relative z-20 mt-auto pt-3 text-center text-[7px] font-semibold tracking-widest sm:text-[9px]"
                      style={{ color: selectedTemplate.textColor }}
                    >
                      DWARKADHISH
                      <br />
                      PAPER PRODUCTS
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-2 left-[3%] right-[3%] h-3 rounded-b-full bg-[#a99b8a]/70 blur-[2px]" />
              </div>

              <p className="mt-5 text-center text-[11px] leading-5 text-[#77716E]">
                Both covers are shown as one open notebook. Choose Front or Back
                above, then upload and adjust that page.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E9E3DD] bg-white p-5 shadow-[0_8px_25px_rgba(0,0,0,0.025)] sm:p-7">
            <div className="border-b border-[#F0ECE8] pb-6">
              <h2 className="text-base font-bold">01. Select Template</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => selectTemplate(template.id)}
                    className={`rounded-lg border p-1.5 transition ${templateId === template.id ? "border-[#DF151D] bg-[#FFFAFA]" : "border-[#E9E3DD] hover:border-[#d7b4a9]"}`}
                  >
                    <span className="relative block h-36 overflow-hidden rounded-md bg-[#F5F2ED]">
                      <Image
                        src={template.image}
                        alt={template.name}
                        fill
                        sizes="(max-width: 640px) 45vw, 160px"
                        className="object-cover"
                      />
                    </span>
                    <span
                      className={`mt-2 block text-[10px] ${templateId === template.id ? "font-bold text-[#DF151D]" : "text-[#514B47]"}`}
                    >
                      {template.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-[#F0ECE8] py-6">
              <h2 className="text-base font-bold">02. Add Your Photo / Logo</h2>
              <p className="mt-2 text-[11px] text-[#77716E]">
                Upload an image to personalise your cover.
              </p>
              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#D5C9C1] bg-[#FDFBF9] p-4 transition hover:border-[#D71920]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F0] text-2xl text-[#DF151D]">
                  ↑
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold">
                    Upload Photo / Logo
                  </span>
                  <span className="mt-1 block text-[10px] text-[#77716E]">
                    JPG, PNG or WEBP · Max 5 MB
                  </span>
                </span>
                <span className="rounded-md border border-[#E9E3DD] px-3 py-2 text-[10px]">
                  Browse
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => handleUpload(event, activeCover)}
                  className="sr-only"
                />
              </label>
              {uploadedImage && (
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="mt-2 text-xs font-semibold text-[#D71920]"
                >
                  Remove uploaded image
                </button>
              )}
            </div>

            <div className="border-b border-[#F0ECE8] py-6">
              <h2 className="text-base font-bold">03. Additional Options</h2>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCover("front")}
                  className={`rounded-lg px-4 py-2 text-xs font-bold ${activeCover === "front" ? "bg-[#D71920] text-white" : "bg-[#F5F2ED] text-[#514B47]"}`}
                >
                  Front cover
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCover("back")}
                  className={`rounded-lg px-4 py-2 text-xs font-bold ${activeCover === "back" ? "bg-[#D71920] text-white" : "bg-[#F5F2ED] text-[#514B47]"}`}
                >
                  Back cover
                </button>
              </div>
              <label className="mt-4 block text-xs font-medium text-[#514B47]">
                {activeCover === "front"
                  ? "Front cover text"
                  : "Back cover text"}
              </label>
              <input
                value={activeCover === "front" ? coverText : backCoverText}
                onChange={(event) =>
                  activeCover === "front"
                    ? setCoverText(event.target.value.slice(0, 32))
                    : setBackCoverText(event.target.value.slice(0, 32))
                }
                maxLength={32}
                placeholder="Enter text for this cover"
                className="mt-2 h-11 w-full rounded-lg border border-[#E9E3DD] px-3 text-sm outline-none transition focus:border-[#D71920]"
              />
              <div className="mt-4">
                <p className="text-xs font-medium text-[#514B47]">
                  Cover colour
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {[
                    "#D20D13",
                    "#F7E8C8",
                    "#B90E16",
                    "#20395F",
                    "#282828",
                    "#F4F0E8",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`Choose cover colour ${color}`}
                      onClick={() =>
                        activeCover === "front"
                          ? setCoverColor(color)
                          : setBackCoverColor(color)
                      }
                      className={`h-8 w-8 rounded-full border-2 ${(activeCover === "front" ? coverColor : backCoverColor).toUpperCase() === color ? "border-[#D71920] ring-2 ring-[#D71920]/20" : "border-white shadow"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <label className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#E9E3DD] bg-white px-3 text-xs font-semibold text-[#514B47] shadow-sm transition hover:border-[#D71920]">
                    <input
                      type="color"
                      aria-label="Choose custom cover colour"
                      value={
                        activeCover === "front" ? coverColor : backCoverColor
                      }
                      onChange={(event) =>
                        activeCover === "front"
                          ? setCoverColor(event.target.value)
                          : setBackCoverColor(event.target.value)
                      }
                      className="h-6 w-6 cursor-pointer rounded-full border-0 bg-transparent p-0"
                    />
                    <span>Custom colour</span>
                  </label>
                  <span className="text-[10px] font-medium text-[#77716E]">
                    {activeCover === "front" ? coverColor : backCoverColor}
                  </span>
                </div>
              </div>
              <div className="mt-5 rounded-lg bg-[#F9F6F2] p-4">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="photo-zoom"
                    className="text-xs font-semibold text-[#514B47]"
                  >
                    Adjust {activeCover === "front" ? "front" : "back"} cover
                    photo size
                  </label>
                  <span className="text-xs font-bold text-[#D71920]">
                    {Math.round(
                      (activeCover === "front" ? frontZoom : backZoom) * 100,
                    )}
                    %
                  </span>
                </div>
                <input
                  id="photo-zoom"
                  type="range"
                  min="0.3"
                  max="2.5"
                  step="0.05"
                  value={activeCover === "front" ? frontZoom : backZoom}
                  onChange={(event) =>
                    activeCover === "front"
                      ? setFrontZoom(Number(event.target.value))
                      : setBackZoom(Number(event.target.value))
                  }
                  className="mt-3 w-full accent-[#D71920]"
                />
                <p className="mt-1 text-[10px] text-[#77716E]">
                  Each cover has its own full-page photo. Upload a different
                  image for the front and back, then adjust each image size
                  separately.
                </p>
              </div>
              <button
                type="button"
                onClick={resetDesign}
                className="mt-5 rounded-lg border border-[#E9E3DD] px-4 py-3 text-xs font-semibold transition hover:border-[#D71920] hover:text-[#D71920]"
              >
                ↶ Reset Design
              </button>
            </div>

            <div className="pt-6">
              <h2 className="text-base font-bold">04. Quantity &amp; Price</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="page-count"
                    className="text-[11px] text-[#77716E]"
                  >
                    Page option
                  </label>
                  <select
                    id="page-count"
                    value={pages}
                    onChange={(event) => setPages(Number(event.target.value))}
                    className="mt-2 h-10 w-full rounded-lg border border-[#E9E3DD] bg-white px-3 text-sm outline-none focus:border-[#D71920]"
                  >
                    {pageOptions.map((option) => (
                      <option key={option.pages} value={option.pages}>
                        {option.pages} pages · ₹{option.price}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-[10px] text-[#77716E]">
                    Type of ruling: Single Line · Size: 29.5 × 20.5 cm
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#77716E]">Quantity</p>
                  <div className="mt-2 inline-flex h-10 overflow-hidden rounded-lg border border-[#E9E3DD]">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      className="w-10 bg-[#F5F1ED] text-xl disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="flex min-w-14 items-center justify-center px-3 text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        setQuantity((value) => Math.min(999, value + 1))
                      }
                      className="w-10 bg-[#DF151D] text-xl text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between rounded-lg bg-[#F9F6F2] p-4">
                <div>
                  <p className="text-[11px] text-[#77716E]">Total Price</p>
                  <p className="mt-1 text-[10px] text-[#77716E]">
                    All taxes included · Estimate
                  </p>
                </div>
                <p className="text-2xl font-bold text-[#DF151D]">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => submitDesign("cart")}
                  className="min-h-12 rounded-lg border border-[#DF151D] bg-[#FFF5F5] px-4 text-xs font-bold text-[#DF151D] transition hover:bg-[#ffe8e8]"
                >
                  ＋ Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => submitDesign("buy")}
                  className="min-h-12 rounded-lg border border-[#DF151D] bg-[#DF151D] px-4 text-xs font-bold text-white transition hover:bg-[#b91620]"
                >
                  Buy Now →
                </button>
              </div>
              {message && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-[#ead8bd] bg-[#fffaf1] p-3 text-xs leading-5 text-[#514B47]"
                >
                  {message}
                </p>
              )}
              <p className="mt-4 text-[10px] leading-5 text-[#77716E]">
                Orders and final pricing are subject to confirmation by the
                Dwarkadhish Paper Products team.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            Product details that stay fixed
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#6E6966]">
            The cover artwork can change with each template. Ruling, size, page
            options, MRP information and the Dwarkadhish manufacturer block
            remain permanent product elements.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-lg bg-[#F5F2ED] p-5 sm:p-7">
              <p className="text-[10px] font-bold tracking-widest text-[#D9252B]">
                PERMANENT SPECIFICATIONS
              </p>
              <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                <div>
                  <dt className="inline font-semibold">Type of Ruling: </dt>
                  <dd className="inline">Single Line</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Size: </dt>
                  <dd className="inline">29.5 × 20.5 cm</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Pages: </dt>
                  <dd className="inline">200 · 184 · 160 · 144 · 104</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">M.R.P.: </dt>
                  <dd className="inline">₹90 · ₹84 · ₹78 · ₹72 · ₹48</dd>
                </div>
              </dl>
              <p className="mt-4 text-[10px] text-[#6E6966]">
                (Including index &amp; title) · (Inclusive of all taxes)
              </p>
            </div>
            <div className="rounded-lg border border-[#E5DED4] p-5">
              <p className="text-[9px] text-[#6E6966]">A Quality Product By</p>
              <p className="mt-1 text-sm font-bold text-[#D9252B]">
                DWARKADHISH
              </p>
              <p className="text-[10px] font-semibold">PAPER PRODUCTS</p>
              <p className="mt-2 text-[10px]">
                Jamnagar, Gujarat, India - 361 006
              </p>
              <p className="mt-1 text-[10px]">Call us on: +91 9918345499</p>
              <p className="mt-3 text-[9px] font-semibold tracking-wider text-[#6E6966]">
                QUALITY · TRUST · MADE WITH CARE
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#211F1F] px-5 py-12 text-white sm:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xl font-bold sm:text-2xl">
            DWARKADHISH PAPER PRODUCTS
          </p>
          <p className="mt-3 text-sm font-semibold text-[#D4A84A]">
            Give more than expected.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C7C2BA]">
            Custom notebook covers with fixed product specifications and
            manufacturer details, designed for a consistent product.
          </p>
          <p className="mt-8 text-[10px] font-semibold tracking-widest text-[#D4A84A]">
            CUSTOM NOTEBOOKS · TEMPLATE SELECTION · BULK ORDERS
          </p>
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/70">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
