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
          src="/products-showcase.png"
          alt="Dwarkadhish Paper Products collection including bill books, school diaries, A4 notebooks, calendars, visiting cards, ID cards and paper bags"
          width={2048}
          height={682}
          priority
          sizes="(max-width: 760px) 1100px, (max-width: 1200px) 1300px, 1680px"
          className={styles.showcaseImage}
        />
      </div>
    </section>
  );
}
