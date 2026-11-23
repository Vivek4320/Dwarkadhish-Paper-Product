"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./HomeCarousel.module.css";

const slides = [
  {
    eyebrow: "PAPER PRODUCTS, MADE WITH CARE",
    title: "Every idea deserves a beautiful page.",
    description:
      "Thoughtfully made paper products for classrooms, offices, businesses and everyday creativity.",
    primary: "Explore Products",
    primaryHref: "/products",
    secondary: "Get in Touch",
    secondaryHref: "/contact",
    kind: "collection",
    images: [
      {
        src: "/products-showcase.png",
        alt: "Collection of notebooks, bill books, calendars, visiting cards and paper products",
      },
    ],
    note: "A collection for every need",
  },
  {
    eyebrow: "MADE PERSONAL, MADE YOURS",
    title: "Put your identity on every cover.",
    description:
      "Create customised notebooks with thoughtful cover details, colours and text that feel uniquely yours.",
    primary: "Customise a Notebook",
    primaryHref: "/customize-book",
    secondary: "View Our Collection",
    secondaryHref: "/products",
    kind: "custom",
    images: [
      {
        src: "/Templates/Template-1.png",
        alt: "Custom notebook cover design one",
      },
      {
        src: "/Templates/Template-2.png",
        alt: "Custom notebook cover design two",
      },
    ],
    note: "Your cover. Your story.",
  },
  {
    eyebrow: "FOR WORK, SCHOOL & BIG IDEAS",
    title: "The right paper makes ideas happen.",
    description:
      "From everyday notebooks to business stationery and bulk requirements, find products made to work for you.",
    primary: "Discover Products",
    primaryHref: "/products",
    secondary: "Discuss a Bulk Order",
    secondaryHref: "/contact",
    kind: "business",
    images: [
      { src: "/Templates/Template-3.png", alt: "Notebook cover design three" },
      { src: "/Templates/Template-4.png", alt: "Notebook cover design four" },
    ],
    note: "Thoughtful stationery for every day",
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
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.copy} key={active}>
          <span className={styles.eyebrow}>{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p className={styles.description}>{slide.description}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={slide.primaryHref}>
              {slide.primary}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.secondary} href={slide.secondaryHref}>
              {slide.secondary}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.slideMeta}>
            <span className={styles.slideNumber}>0{active + 1}</span>
            <span className={styles.metaLine} />
            <span>{slide.note}</span>
          </div>
        </div>

        <div className={styles.visual} key={`visual-${active}`}>
          <div className={styles.visualHalo} aria-hidden="true" />
          {slide.kind === "collection" ? (
            <div className={styles.collectionFrame}>
              <Image
                src={slide.images[0].src}
                alt={slide.images[0].alt}
                width={2048}
                height={682}
                priority
                sizes="(max-width: 760px) 100vw, 58vw"
                className={styles.collectionImage}
              />
            </div>
          ) : (
            <div className={styles.bookShowcase}>
              {slide.images.map((item, index) => (
                <div
                  className={
                    index === 0 ? styles.bookPrimary : styles.bookSecondary
                  }
                  key={item.src}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 760px) 44vw, 25vw"
                    className={styles.bookImage}
                    priority={active === 1}
                  />
                </div>
              ))}
              <span className={styles.floatingNote}>{slide.note}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots} aria-label="Choose hero slide">
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              type="button"
              className={index === active ? styles.activeDot : styles.dot}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous slide"
          >
            ←
          </button>
          <span>
            0{active + 1}
            <i>/</i>0{slides.length}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
