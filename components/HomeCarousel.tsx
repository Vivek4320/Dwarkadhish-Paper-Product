"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HomeCarousel.module.css";

const slides = [
  {
    eyebrow: "EVERY AMBITION NEEDS PREPARATION",
    title: "Every Ambition Needs Preparation",
    description: "Quality stationery and paper products, made with care.",
    image: "/products-showcase.png",
    alt: "Dwarkadhish Paper Products collection of notebooks, bill books, calendars, visiting cards and stationery",
    width: 2048,
    height: 682,
  },
  {
    eyebrow: "MADE FOR YOUR EVERYDAY IDEAS",
    title: "Creativity Begins With The Right Stationery",
    description: "Thoughtfully crafted paper products for school, office and business.",
    image: "/products-showcase.png",
    alt: "Collection of Dwarkadhish paper and stationery products",
    width: 2048,
    height: 682,
  },
  {
    eyebrow: "QUALITY YOU CAN FEEL",
    title: "Making Every Page Matter",
    description: "Reliable paper products for learning, planning and creating.",
    image: "/products-showcase.png",
    alt: "Dwarkadhish stationery and paper product collection",
    width: 2048,
    height: 682,
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
  const slide = slides[active];

  return (
    <section
      className={styles.hero}
      aria-label="Dwarkadhish Paper Products highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className={styles.copy} key={active}>
        <span className={styles.eyebrow}>{slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>
      </div>

      <div className={styles.stage} key={`image-${active}`}>
        <div className={styles.imageGlow} aria-hidden="true" />
        <Image
          src={slide.image}
          alt={slide.alt}
          width={slide.width}
          height={slide.height}
          priority={active === 0}
          sizes="(max-width: 760px) 1200px, 100vw"
          className={styles.showcaseImage}
        />
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className={styles.dots} aria-label="Choose hero slide">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === active ? styles.activeDot : styles.dot}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </section>
  );
}
