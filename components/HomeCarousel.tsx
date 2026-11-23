"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HomeCarousel.module.css";

const slides = [
  {
    title: "Every Ambition Needs Preparation",
    subtitle: "Quality stationery and paper products, made with care.",
    image: "/products-showcase.png",
    alt: "Dwarkadhish collection of notebooks, bill books, calendars and stationery",
    collection: true,
  },
  {
    title: "A Cover That Reflects Your Ideas",
    subtitle: "Customised notebooks designed around your creativity.",
    image: "/Templates/Template-1.png",
    alt: "Custom notebook cover design from Dwarkadhish Paper Products",
    collection: false,
  },
  {
    title: "Make Every Page Count",
    subtitle: "Thoughtful notebook designs for learning, planning and creating.",
    image: "/Templates/Template-3.png",
    alt: "Another notebook cover design from Dwarkadhish Paper Products",
    collection: false,
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
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </div>

      <div
        className={slide.collection ? styles.stage : styles.notebookStage}
        key={"image-" + active}
      >
        <div className={styles.imageGlow} aria-hidden="true" />
        <Image
          src={slide.image}
          alt={slide.alt}
          width={slide.collection ? 2048 : 1200}
          height={slide.collection ? 682 : 1200}
          priority={active === 0}
          sizes="(max-width: 760px) 100vw, 100vw"
          className={slide.collection ? styles.showcaseImage : styles.notebookImage}
        />
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => goTo(active - 1)} aria-label="Previous slide">←</button>
        <div className={styles.dots} aria-label="Choose hero slide">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === active ? styles.activeDot : styles.dot}
              aria-label={"Show slide " + (index + 1)}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={() => goTo(active + 1)} aria-label="Next slide">→</button>
      </div>
    </section>
  );
}
