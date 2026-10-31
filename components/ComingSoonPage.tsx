"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [productName, setProductName] = useState("New Paper Product");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");

    if (product) {
      setProductName(product);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="flex w-full justify-center border-b border-[#E9E2DA] px-5 py-[17px]">
        <div className="w-full max-w-[1120px]">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-[37px] w-[37px] items-center justify-center rounded-[18.5px] border border-[#E9E2DA] text-lg font-bold text-[#211F1F] transition hover:bg-[#FAF7F2]">
              ←
            </span>
            <span className="text-[13px] font-bold text-[#211F1F]">
              Back to Home
            </span>
          </Link>
        </div>
      </header>

      <section className="flex w-full flex-1 items-center justify-center bg-[radial-gradient(120.21%_120.21%_at_85%_15%,#F5E5C7_0%,rgba(245,229,199,0)_30%),linear-gradient(128deg,#FFF_45%,#FAF7F2_100%)] px-5 py-24 sm:py-32">
        <div className="w-full max-w-[1120px]">
          <div className="flex max-w-[650px] flex-col items-start gap-[18px]">
            <div className="flex items-center gap-[9px] rounded-[30px] border border-[#F4D6D2] bg-[#FFF3F0] px-[15px] py-[9px]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#E21E26] shadow-[0_0_0_4px_rgba(226,30,38,0.10)]" />
              <span className="text-[11px] font-extrabold tracking-[0.1364em] text-[#E21E26]">
                Coming Soon
              </span>
            </div>

            <h1 className="whitespace-pre-line text-[clamp(2.75rem,7vw,65px)] font-bold leading-[1.08] tracking-[-0.0387em] text-[#E21E26]">
              Something new{"\n"}is on its way.
            </h1>

            <p className="max-w-[490px] text-[13px] leading-[26.6px] text-[#77716B]">
              We&apos;re preparing something special for you. This product will
              be available soon from Dwarkadhish Paper Products. Stay connected
              and check back for updates.
            </p>

            <div className="w-full max-w-[410px] rounded-[5px] border border-[#D7AD51] border-l-[3px] bg-white px-[17px] pb-[15px] pt-5">
              <p className="text-[10px] text-[#77716B]">
                YOU&apos;RE LOOKING FOR
              </p>
              <p className="mt-1 text-[15px] font-bold text-[#211F1F]">
                {productName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2.5">
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#E21E26] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#bd171e]"
              >
                Explore Available Products →
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#E9E2DA] bg-white px-5 py-3.5 text-xs font-bold text-[#211F1F] transition hover:bg-[#FAF7F2]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex w-full justify-center border-t border-[#E9E2DA] bg-white px-5 py-5">
        <div className="flex w-full max-w-[1120px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-[5px]">
            <p className="text-xs font-bold text-[#211F1F]">
              DWARKADHISH PAPER PRODUCTS
            </p>
            <p className="text-[10px] text-[#77716B]">
              Jamnagar, Gujarat, India
            </p>
          </div>
          <p className="text-[11px] font-bold text-[#E21E26]">
            Give more than expected.
          </p>
        </div>
      </footer>
    </main>
  );
}
