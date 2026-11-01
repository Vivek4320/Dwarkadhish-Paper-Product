"use client";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "PAPER PRODUCTS, MADE PERSONAL",
    title: ["Your ideas.", "Your notebook."],
    accent: "Your way.",
    description:
      "Create notebooks that feel like yours, with thoughtful details, quality paper and a finish made to last.",
    primary: "Customize Your Notebook",
    primaryHref: "/customize-book",
    secondary: "Explore Products",
    secondaryHref: "/products",
    cover: "carousel-cover-red",
    monogram: "dp.",
    coverTitle: ["Ideas Into", "Pages."],
    coverNote: "YOUR STORY STARTS HERE",
    visualLabel: "Make it yours",
    visualNote: "Text, colours & logo",
    theme: "carousel-slide-warm",
  },
  {
    eyebrow: "MADE FOR EVERYDAY MOMENTS",
    title: ["Write it down.", "Make it happen."],
    accent: "One page at a time.",
    description:
      "Discover practical notebooks and stationery for study, work, planning and all the ideas in between.",
    primary: "View Our Collection",
    primaryHref: "/products",
    secondary: "Contact Us",
    secondaryHref: "/contact",
    cover: "carousel-cover-blue",
    monogram: "01",
    coverTitle: ["Plan.", "Create.", "Achieve."],
    coverNote: "MADE FOR YOUR EVERYDAY",
    visualLabel: "Everyday essentials",
    visualNote: "Study, work & gifting",
    theme: "carousel-slide-blue",
  },
  {
    eyebrow: "CUSTOM & BULK ORDERS",
    title: ["Your brand.", "On every page."],
    accent: "Made to represent you.",
    description:
      "Bring your notebooks and paper-product ideas to life with custom details for teams, businesses and special occasions.",
    primary: "Start a Custom Order",
    primaryHref: "/contact",
    secondary: "Customize a Book",
    secondaryHref: "/customize-book",
    cover: "carousel-cover-gold",
    monogram: "D",
    coverTitle: ["Made", "For You."],
    coverNote: "THOUGHTFUL BY DESIGN",
    visualLabel: "Made for your needs",
    visualNote: "Personal or bulk orders",
    theme: "carousel-slide-gold",
  },
];

export default function HomeCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      3000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const current = slides[active];
  const previous = () =>
    setActive((index) => (index - 1 + slides.length) % slides.length);
  const next = () => setActive((index) => (index + 1) % slides.length);

  return (
    <section
      className={"home-carousel " + current.theme}
      aria-label="Featured products"
    >
      <div className="carousel-inner">
        <div className="carousel-copy" key={active}>
          <div className="carousel-eyebrow">{current.eyebrow}</div>
          <h1>
            {current.title.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p className="carousel-accent">{current.accent}</p>
          <p className="carousel-description">{current.description}</p>
          <div className="carousel-actions">
            <a className="button-primary" href={current.primaryHref}>
              {current.primary} <span aria-hidden="true">↗</span>
            </a>
            <a className="button-secondary" href={current.secondaryHref}>
              {current.secondary} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="carousel-visual" aria-hidden="true">
          <div className="carousel-paper-shape" />
          <div className="carousel-notebook-back" />
          <div className={"carousel-notebook " + current.cover}>
            <span className="carousel-monogram">{current.monogram}</span>
            <span className="carousel-cover-rule" />
            <strong>
              {current.coverTitle.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </strong>
            <small>{current.coverNote}</small>
          </div>
          <div className="carousel-floating-card">
            <strong>✦ &nbsp;{current.visualLabel}</strong>
            <span>{current.visualNote}</span>
          </div>
          <div className="carousel-stamp">
            DWARKADHISH
            <br />
            PAPER PRODUCTS
          </div>
        </div>
      </div>
      <div className="carousel-controls">
        <div className="carousel-dots" aria-label="Choose slide">
          {slides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              className={index === active ? "active" : ""}
              aria-label={"Go to slide " + (index + 1)}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button onClick={previous} aria-label="Previous slide">
            ←
          </button>
          <span>
            0{active + 1} <i>/</i> 0{slides.length}
          </span>
          <button onClick={next} aria-label="Next slide">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
