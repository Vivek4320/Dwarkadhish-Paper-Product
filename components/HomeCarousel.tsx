"use client";

import Image from "next/image";
import styles from "./HomeCarousel.module.css";

export default function HomeCarousel() {
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
        <Image
          src="/products-showcase.svg"
          alt="Dwarkadhish Paper Products collection: bill book, letterhead, visiting cards, envelope, A4 notebook and spiral notebook"
          width={1500}
          height={470}
          priority
          sizes="(max-width: 760px) 1100px, (max-width: 1200px) 1300px, 1500px"
          className={styles.showcaseImage}
        />
      </div>
    </section>
  );
}
