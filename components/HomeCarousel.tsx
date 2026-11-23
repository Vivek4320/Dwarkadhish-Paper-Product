"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HomeCarousel.module.css";

const slides = [
  {
    image: "/hero-banner-1.png",
    alt: "Premium stationery collection with colourful notebooks and writing accessories",
  },
  {
    image: "/hero-banner-2.png",
    alt: "Dwarkadhish paper products collection with notebooks, calendars, bill books and stationery",
  },
  {
    image: "/hero-banner-3.png",
    alt: "Business paper products including bill books, calendars, notebooks and printed stationery",
  },
];

export default function HomeCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) =>
    setActive((index + slides.length) % slides.length);

  return (
    <section
      className={styles.hero}
      aria-label="Dwarkadhish Paper Products banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className={styles.bannerStage}>
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={index === active ? styles.bannerActive : styles.bannerHidden}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={styles.bannerImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(active - 1)}
          aria-label="Previous banner"
        >
          ←
        </button>
        <div className={styles.dots} aria-label="Choose hero banner">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={index === active ? styles.activeDot : styles.dot}
              aria-label={"Show banner " + (index + 1)}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(active + 1)}
          aria-label="Next banner"
        >
          →
        </button>
      </div>
    </section>
  );
}
