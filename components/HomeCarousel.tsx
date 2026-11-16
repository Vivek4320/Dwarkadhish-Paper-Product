"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import styles from "./HomeCarousel.module.css";

function ProductLogo({ size = 46 }: { size?: number }) {
  return (
    <span className={styles.logo} style={{ width: size, height: size }}>
      <Image
        src="/Logo.jpeg"
        alt="Dwarkadhish Paper Products DP logo"
        width={size}
        height={size}
      />
    </span>
  );
}

function BrandName({ left = false }: { left?: boolean }) {
  return (
    <>
      <span
        className={styles.brand}
        style={left ? { textAlign: "left" } : undefined}
      >
        DWARKADHISH
      </span>
      <span
        className={styles.brandSub}
        style={left ? { textAlign: "left" } : undefined}
      >
        Paper Products
      </span>
    </>
  );
}

export default function HomeCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const move = useCallback((direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({
      left: direction * viewport.clientWidth * 0.72,
      behavior: "smooth",
    });
  }, []);

  const updateProgress = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const progress = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
    setActiveDot(Math.max(0, Math.min(2, Math.round(progress * 2))));
  }, []);

  const goToDot = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({ left: (maxScroll * index) / 2, behavior: "smooth" });
  };

  return (
    <section
      className={styles.hero}
      aria-label="Dwarkadhish stationery product showcase"
    >
      <div className={styles.heading}>
        <span className={styles.eyebrow}>EVERY AMBITION NEEDS PREPARATION</span>
        <h1>Every Ambition Needs Preparation</h1>
        <p>Quality stationery and paper products, made with care</p>
      </div>

      <div className={styles.stage}>
        <button
          className={styles.arrow + " " + styles.previous}
          type="button"
          onClick={() => move(-1)}
          aria-label="Scroll to previous products"
        >
          ‹
        </button>

        <div
          className={styles.viewport}
          ref={viewportRef}
          onScroll={updateProgress}
          tabIndex={0}
          aria-label="Scroll through our stationery products"
        >
          <div className={styles.track}>
            <article
              className={styles.product + " " + styles.billBook}
              aria-label="Bill book mockup"
            >
              <ProductLogo />
              <BrandName />
              <h2>Bill Book</h2>
              <div className={styles.invoice}>
                INVOICE
                <br />
                No. ______
              </div>
            </article>

            <article
              className={styles.product + " " + styles.letterhead}
              aria-label="Letterhead mockup"
            >
              <ProductLogo size={38} />
              <BrandName left />
              <div className={styles.letterLines} />
            </article>

            <article
              className={styles.product + " " + styles.cards}
              aria-label="Visiting card mockup"
            >
              <div className={styles.cardStack} />
              <div className={styles.businessCard}>
                <ProductLogo size={30} />
                <BrandName left />
              </div>
            </article>

            <article
              className={styles.product + " " + styles.envelope}
              aria-label="Envelope mockup"
            >
              <ProductLogo size={39} />
              <BrandName />
            </article>

            <article
              className={styles.product + " " + styles.a4}
              aria-label="A4 notebook mockup"
            >
              <ProductLogo size={42} />
              <BrandName />
              <h2>
                A4
                <br />
                Note Book
              </h2>
              <p>A4 SIZE · 80 GSM · RULED</p>
            </article>

            <article
              className={styles.product + " " + styles.spiral}
              aria-label="Spiral notebook mockup"
            >
              <ProductLogo size={43} />
              <BrandName />
              <h2>Note Book</h2>
            </article>

            <article
              className={styles.product + " " + styles.books}
              aria-label="Stack of branded books mockup"
            >
              <div className={styles.book}>
                <span>DWARKADHISH · BOOKS</span>
              </div>
              <div className={styles.book}>
                <span>NOTE BOOK</span>
              </div>
              <div className={styles.book}>
                <span>PAPER PRODUCTS</span>
              </div>
            </article>
          </div>
        </div>

        <button
          className={styles.arrow + " " + styles.next}
          type="button"
          onClick={() => move(1)}
          aria-label="Scroll to next products"
        >
          ›
        </button>
      </div>

      <div className={styles.pagination} aria-label="Product showcase position">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            type="button"
            className={
              dot === activeDot
                ? styles.dot + " " + styles.activeDot
                : styles.dot
            }
            onClick={() => goToDot(dot)}
            aria-label={"Go to product group " + (dot + 1)}
            aria-current={dot === activeDot ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
