"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HomeCarousel.module.css";

const slides = [
  {
    title: "Every Ambition Needs Preparation",
    instruction: "Quality stationery and paper products, made with care.",
    image: "/products-showcase.png",
    alt: "Dwarkadhish collection of notebooks, bill books, calendars and stationery",
    fit: "contain",
  },
  {
    title: "A Cover That Reflects Your Ideas",
    instruction: "Create a notebook that feels uniquely yours.",
    image: "/product-showcase1.png",
    alt: "Custom notebook cover design",
    fit: "contain",
  },
  {
    title: "Make Every Page Count",
    instruction:
      "Thoughtful paper products for learning, planning and creating.",
    image: "/products-showcase2.png",
    alt: "Notebook cover design",
    fit: "contain",
  },
];

export default function HomeCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) =>
    setActive((index + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section
      className={styles.hero}
      aria-label="Dwarkadhish Paper Products banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setPaused(false);
      }}
    >
      <div className={styles.copy} key={slide.title}>
        <h1>{slide.title}</h1>
        <p>{slide.instruction}</p>
      </div>

      <div className={styles.bannerStage} key={slide.image}>
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority={active === 0}
          sizes="(max-width: 760px) 100vw, 92vw"
          className={styles.bannerImage}
        />
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
          {slides.map((item, index) => (
            <button
              key={item.title}
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
