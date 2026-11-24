"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

const LEAVE_MS = 350;
const SLIDE_MS = 6500;
const LETTER_STEP = 0.07;

/** Headline split into words and letters so each letter can drop in. */
function Headline({ text }: { text: string }) {
  let index = 0;
  return (
    <h1 aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} aria-hidden="true">
          {wordIndex > 0 && " "}
          <span className={styles.word}>
            {word.split("").map((letter) => (
              <span
                key={index}
                className={styles.letter}
                style={{ animationDelay: `${0.25 + index++ * LETTER_STEP}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function HomeCarousel() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const leaveTimer = useRef<number | undefined>(undefined);

  // Fade the old slide's text out, then swap to the new slide.
  const changeTo = useCallback((index: number) => {
    window.clearTimeout(leaveTimer.current);
    setLeaving(true);
    leaveTimer.current = window.setTimeout(() => {
      setActive(((index % slides.length) + slides.length) % slides.length);
      setLeaving(false);
    }, LEAVE_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => changeTo(active + 1), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [paused, active, changeTo]);

  const goTo = (index: number) => changeTo(index);
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
      {slides.map((item, index) => (
        <div
          key={item.title}
          className={`${styles.bg} ${styles["bg" + index]}`}
          style={{ opacity: index === active ? 1 : 0 }}
          aria-hidden="true"
        />
      ))}

      <div
        className={`${styles.copy} ${leaving ? styles.leaving : ""}`}
        key={slide.title}
      >
        <Headline text={slide.title} />
        <p
          style={{
            animationDelay: `${0.25 + slide.title.length * LETTER_STEP}s`,
          }}
        >
          {slide.instruction}
        </p>
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
