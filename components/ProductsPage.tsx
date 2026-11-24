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
  },
  {
    id: 2,
    name: "Customize Diary",
    category: "Customisable",
    detail: "Personalised diaries for everyday planning.",
    status: "Coming Soon",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Customize Banner",
    category: "Customisable",
    detail: "Custom printed covers and promotional designs.",
    status: "Coming Soon",
  },
  {
    id: 4,
    name: "Customize File",
    category: "Stationery",
    detail: "Organise documents with customised files.",
    status: "Coming Soon",
  },
  {
    id: 5,
    name: "Customize Pen",
    category: "Stationery",
    detail: "Branded stationery for teams and events.",
    status: "Coming Soon",
  },
  {
    id: 6,
    name: "Customize Calendar",
    category: "Customisable",
    detail: "Desk calendars for homes and businesses.",
    status: "Coming Soon",
    badge: "New",
  },
  {
    id: 7,
    name: "Customize Business Card",
    category: "Customisable",
    detail: "Professional printed cards for your business.",
    status: "Coming Soon",
  },
  {
    id: 8,
    name: "Customize ID Cards",
    category: "Stationery",
    detail: "Identification cards for institutions and teams.",
    status: "Coming Soon",
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
    <main className="products-amazon-page min-h-screen bg-[#f5f6f8] font-[Arial,Helvetica,sans-serif] text-[#211F1E]">
      <div className="products-topbar border-b border-[#E9E3DD] bg-white px-5 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#E9E3DD] px-4 py-2.5 text-sm font-semibold text-[#211F1E] transition hover:border-[#D71920] hover:text-[#D71920]"
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>
      </div>

      <div className="products-amazon-content mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <p className="text-xs text-[#77716D]">
          <Link href="/" className="hover:text-[#D71920]">
            Home
          </Link>{" "}
          / <span className="text-[#D71920]">Products</span>
        </p>

        <section className="products-amazon-hero relative mt-4 overflow-hidden rounded-2xl bg-[linear-gradient(98deg,#FFF2ED_0%,#FAF7F2_100%)] px-6 py-8 sm:px-10 sm:py-10 lg:min-h-60">
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

        <section className="products-toolbar mt-6 flex flex-col gap-3 rounded-xl border border-[#e7e7e7] bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <label className="products-search flex h-12 w-full items-center gap-3 rounded-lg border border-[#D5D9D9] bg-white px-4 lg:max-w-150">
            <span className="text-xl text-[#77716D]">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notebooks, ruling, size..."
              className="w-mid bg-transparent text-sm outline-none placeholder:text-[#999]"
            />
          </label>
          <label className="products-sort flex h-12 items-center gap-3 rounded-lg border border-[#D5D9D9] bg-white px-4 text-sm">
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

        <div className="products-categories mt-4 flex gap-2 overflow-x-auto rounded-xl bg-white p-3 pb-3 shadow-sm">
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

        <div className="products-results-heading mt-7 flex items-center justify-between rounded-t-xl border-b border-[#e5e7eb] bg-white px-4 py-4">
          <h2 className="text-xl font-bold">Our Products</h2>
          <p className="text-xs text-[#77716D]">
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {visibleProducts.length ? (
          <div className="products-amazon-grid mt-0 grid gap-3 rounded-b-xl bg-white p-3 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="product-amazon-card group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#c9cdd2] hover:shadow-lg"
              >
                <div className="product-amazon-image relative h-56.25 overflow-hidden">
                  <Image
                    src={`/product${product.id}.png`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-md bg-[#D71920] px-2.5 py-1.5 text-[10px] font-bold text-white">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="product-amazon-copy flex min-h-56.25 flex-col p-4">
                  <p className="text-[10px] tracking-[0.08em] text-[#77716D]">
                    {product.detail}
                  </p>
                  <h3 className="mt-2 text-[15px] font-bold leading-5 group-hover:text-[#B12704]">
                    {product.name}
                  </h3>
                  {product.status === "Available" ? (
                    <>
                      <p className="mt-2 text-xs leading-5 text-[#77716D]">
                        Quality stationery for everyday writing.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xl font-bold">
                          ₹{product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-[#999] line-through">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto grid grid-cols-1 gap-2 pt-4">
                        <Link
                          href="/customize-book"
                          className="flex min-h-10 items-center justify-center rounded-full border border-[#D5A400] bg-[#FFD814] px-3 text-[12px] font-bold text-[#111827] transition hover:bg-[#F7CA00]"
                        >
                          View & Customize
                        </Link>
                        <Link
                          href="/customize-book"
                          className="flex min-h-10 items-center justify-center rounded-full border border-[#D5D9D9] bg-white px-3 text-[12px] font-semibold text-[#111827] transition hover:bg-[#F7FAFA]"
                        >
                          Customize Now
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="mt-auto flex justify-start pt-5">
                      <Link
                        href={`/coming-soon?product=${encodeURIComponent(product.name)}`}
                        className="inline-flex min-h-10 min-w-32 items-center justify-center rounded-full border border-[#D5D9D9] bg-[#F7FAFA] px-5 text-[12px] font-semibold text-[#565959] transition hover:bg-[#E7E9EC]"
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
