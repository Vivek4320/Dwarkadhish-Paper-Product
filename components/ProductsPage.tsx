"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  detail: string;
  price?: number;
  oldPrice?: number;
  status: "Available" | "Coming Soon";
  badge?: string;
  artwork:
    | "warrior"
    | "diary"
    | "banner"
    | "file"
    | "pen"
    | "calendar"
    | "card"
    | "id";
};

const products: Product[] = [
  {
    id: 1,
    name: "Warrior Single Line Notebook",
    category: "Single Line",
    detail: "Single Line · 200 pages · 29.5 × 20.5 cm",
    price: 90,
    oldPrice: 110,
    status: "Available",
    badge: "Popular",
    artwork: "warrior",
  },
  {
    id: 2,
    name: "Customize Diary",
    category: "Customisable",
    detail: "Personalised diaries for everyday planning.",
    status: "Coming Soon",
    badge: "Bestseller",
    artwork: "diary",
  },
  {
    id: 3,
    name: "Customize Banner",
    category: "Customisable",
    detail: "Custom printed covers and promotional designs.",
    status: "Coming Soon",
    artwork: "banner",
  },
  {
    id: 4,
    name: "Customize File",
    category: "Stationery",
    detail: "Organise documents with customised files.",
    status: "Coming Soon",
    artwork: "file",
  },
  {
    id: 5,
    name: "Customize Pen",
    category: "Stationery",
    detail: "Branded stationery for teams and events.",
    status: "Coming Soon",
    artwork: "pen",
  },
  {
    id: 6,
    name: "Customize Calendar",
    category: "Customisable",
    detail: "Desk calendars for homes and businesses.",
    status: "Coming Soon",
    badge: "New",
    artwork: "calendar",
  },
  {
    id: 7,
    name: "Customize Business Card",
    category: "Customisable",
    detail: "Professional printed cards for your business.",
    status: "Coming Soon",
    artwork: "card",
  },
  {
    id: 8,
    name: "Customize ID Cards",
    category: "Stationery",
    detail: "Identification cards for institutions and teams.",
    status: "Coming Soon",
    artwork: "id",
  },
];

const categories = [
  "All Products",
  "Notebooks",
  "Single Line",
  "Long Books",
  "Customisable",
  "Stationery",
];

function ProductArtwork({ type }: { type: Product["artwork"] }) {
  if (type === "id") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAF7F2]">
        <div className="flex h-28 w-48 items-center gap-3 rounded-lg border border-[#e5d8c7] bg-white p-4 shadow-md">
          <div className="h-14 w-12 rounded bg-[#f0e4d2]" />
          <div className="space-y-2">
            <div className="h-2 w-16 rounded bg-[#d71920]/80" />
            <div className="h-1.5 w-20 rounded bg-[#ddd]" />
            <div className="h-1.5 w-14 rounded bg-[#eee]" />
          </div>
        </div>
      </div>
    );
  }
  if (type === "file") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAF7F2]">
        <div className="relative h-40 w-28 rounded-md border-1-10 border-[#272524] bg-[#f6e6c5] shadow-[9px_7px_0_0_#bf151b]">
          <div className="absolute inset-3 border border-[#d6b65d]" />
          <span className="absolute inset-x-0 top-16 text-center text-xs font-bold">
            DOCUMENT
          </span>
        </div>
      </div>
    );
  }
  if (type === "pen") {
    return (
      <div className="flex h-full w-full items-center justify-center gap-5 bg-[#FAF7F2]">
        <div className="h-40 w-3 rotate-12 rounded-full bg-[#d71920] shadow-md" />
        <div className="h-36 w-3 -rotate-6 rounded-full bg-[#242222] shadow-md" />
        <div className="h-32 w-3 rotate-6 rounded-full bg-[#d6b65d] shadow-md" />
      </div>
    );
  }
  if (type === "calendar") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAF7F2]">
        <div className="w-36 -rotate-3 overflow-hidden rounded-md border border-[#e9e3dd] bg-white shadow-lg">
          <div className="bg-[#d71920] py-3 text-center text-xs font-bold tracking-widest text-white">
            2026
          </div>
          <div className="grid grid-cols-4 gap-2 p-4">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="h-5 rounded-sm bg-[#f3e9d8]" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (type === "banner" || type === "card") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAF7F2]">
        <div className="relative flex h-40 w-28 flex-col items-center justify-center rounded-md border-1-10 border-[#272524] bg-[#f6e6c5] shadow-[9px_7px_0_0_#bf151b]">
          <div className="absolute inset-2 border border-[#d6b65d]" />
          <span className="relative text-xs font-bold">WARRIOR</span>
          <span className="relative mt-1 text-[10px] font-bold">YOUR BOOK</span>
          <span className="relative mt-8 text-[7px] tracking-wider">
            DWARKADHISH
          </span>
        </div>
      </div>
    );
  }
  if (type === "diary") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAF7F2]">
        <div className="relative h-44 w-28 -rotate-3 rounded-md border-l-[9px] border-[#272524] bg-[#d71920] shadow-xl">
          <div className="absolute inset-3 border border-[#f2d68b]" />
          <span className="absolute inset-x-0 top-16 text-center text-sm font-bold text-white">
            DIARY
          </span>
          <span className="absolute inset-x-0 bottom-8 text-center text-[8px] tracking-widest text-white">
            2026
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF7F2]">
      <div className="relative flex h-40 w-28 rotate-2 items-center justify-center rounded-md border-l-[9px] border-[#242222] bg-[#f5e5c4] shadow-[10px_7px_0_0_#c5151d]">
        <div className="absolute inset-2 border border-[#d6b65d]" />
        <span className="relative text-center text-sm font-bold leading-5">
          YOUR
          <br />
          NOTEBOOK
        </span>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery =
        !normalized ||
        [product.name, product.category, product.detail].some((value) =>
          value.toLowerCase().includes(normalized),
        );
      const matchesCategory =
        category === "All Products" ||
        (category === "Notebooks" &&
          product.name.toLowerCase().includes("notebook")) ||
        (category === "Long Books" &&
          product.name.toLowerCase().includes("book")) ||
        product.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === "price-low")
      filtered.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER),
      );
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [query, category, sort]);

  return (
    <main className="min-h-screen bg-white font-[Arial,Helvetica,sans-serif] text-[#211F1E]">
      <div className="border-b border-[#E9E3DD] bg-white px-5 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-[#E9E3DD] px-4 py-2.5 text-sm font-semibold text-[#211F1E] transition hover:border-[#D71920] hover:text-[#D71920]">
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        <p className="text-xs text-[#77716D]">
          <Link href="/" className="hover:text-[#D71920]">
            Home
          </Link>{" "}
          / <span className="text-[#D71920]">Products</span>
        </p>

        <section className="relative mt-6 overflow-hidden rounded-2xl bg-[linear-gradient(98deg,#FFF2ED_0%,#FAF7F2_100%)] px-6 py-10 sm:px-10 sm:py-12 lg:min-h-72.5">
          <div className="relative z-10 max-w-xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#D71920]">
              MADE FOR YOUR EVERYDAY
            </p>
            <h1 className="mt-4 max-w-sm text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-black sm:text-5xl">
              Notebooks for every idea.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#77716D]">
              Discover quality notebooks and stationery from Dwarkadhish Paper
              Products. Choose a design or customise your own cover.
            </p>
          </div>
          <div className="pointer-events-none absolute -right-2 top-8 hidden h-56 w-82.5 items-center justify-center lg:flex">
            <span className="absolute right-20 top-0 text-5xl text-[#D71920]">
              ♥
            </span>
            <div className="relative mt-10 flex h-36 w-28 rotate-6 items-center justify-center rounded-md border-1-10 border-[#242222] bg-[#F5E5C4] shadow-[10px_7px_0_0_#C5151D]">
              <span className="text-center text-sm font-bold leading-5">
                YOUR
                <br />
                NOTEBOOK
              </span>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex h-12 w-full items-center gap-3 rounded-lg border border-[#E9E3DD] px-4 lg:max-w-112.5">
            <span className="text-xl text-[#77716D]">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notebooks, ruling, size..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#999]"
            />
          </label>
          <label className="flex h-12 items-center gap-3 rounded-lg border border-[#E9E3DD] px-4 text-sm">
            <span className="text-[#77716D]">Sort:</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="bg-transparent font-medium outline-none"
            >
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </label>
        </section>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${category === item ? "border-[#D71920] bg-[#D71920] text-white" : "border-[#E9E3DD] bg-white text-[#211F1E] hover:border-[#D71920]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-bold">Our Products</h2>
          <p className="text-xs text-[#77716D]">
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {visibleProducts.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#E9E3DD] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56.25 overflow-hidden">
                  <ProductArtwork type={product.artwork} />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-md bg-[#D71920] px-2.5 py-1.5 text-[10px] font-bold text-white">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="flex min-h-56.25 flex-col p-4">
                  <p className="text-[10px] tracking-[0.08em] text-[#77716D]">
                    {product.detail}
                  </p>
                  <h3 className="mt-3 text-[15px] font-bold leading-5">
                    {product.name}
                  </h3>
                  {product.status === "Available" ? (
                    <>
                      <p className="mt-2 text-xs leading-5 text-[#77716D]">
                        Quality stationery for everyday writing.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-xl font-bold">
                          ₹{product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-[#999] line-through">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                        <Link
                          href="/contact"
                          className="flex min-h-9 items-center justify-center rounded-md border border-[#D71920] px-2 text-[11px] font-bold text-[#D71920] transition hover:bg-[#fff4f3]"
                          style={{ color: "#D71920" }}
                        >
                          View Details
                        </Link>
                        <Link
                          href="/customize-book"
                          className="flex min-h-9 items-center justify-center rounded-md border border-[#D71920] bg-[#D71920] px-2 text-[11px] font-bold transition hover:bg-[#b81720]"
                          style={{ color: "#FFFFFF" }}
                        >
                          Customize Now
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="mt-auto flex justify-center pt-7">
                      <Link
                        href={`/coming-soon?product=${encodeURIComponent(product.name)}`}
                        className="inline-flex min-h-9 min-w-28 items-center justify-center rounded-md border border-[#D71920] bg-white px-5 text-[11px] font-semibold text-[#211F1E] transition hover:bg-[#fff4f3]"
                      >
                        Coming Soon
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-[#E9E3DD] px-5 py-16 text-center">
            <p className="font-semibold">No products found</p>
            <p className="mt-2 text-sm text-[#77716D]">
              Try another search term or category.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All Products");
              }}
              className="mt-5 text-sm font-bold text-[#D71920]"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg px-7 text-sm font-bold text-[#D71920] bg-[#D71920] transition hover:bg-[#b81720]"
            style={{ color: "#FFFFFF" }}
          >
            Explore All Products
          </Link>
        </div>
      </div>

      <footer className="bg-[#211F1E] px-5 py-9 text-center text-white">
        <p className="text-base font-bold">DWARKADHISH PAPER PRODUCTS</p>
        <p className="mt-2 text-xs text-[#E2BD64]">Give more than expected.</p>
        <p className="mt-3 text-[13px] text-white">
          Quality stationery · Jamnagar, Gujarat
        </p>
        <div className="mt-5 flex justify-center gap-5 text-xs text-white/70">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
