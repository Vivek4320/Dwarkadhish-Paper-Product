import { features } from "./site-data";
export default function CustomizeSection() {
  return (
    <section className="customize-section" id="customize">
      <div className="customize-inner">
        <div className="customize-copy">
          <p className="section-eyebrow">THE NOTEBOOK CUSTOMISER</p>
          <h2>Make a notebook that feels like yours.</h2>
          <p>
            Choose size, binding and page style. Add your text or logo, preview
            the cover, then save your design or send an enquiry.
          </p>
          <a className="button-primary customize-button" href="/customize-book">
            Start designing&nbsp; ↗
          </a>
        </div>
        <div className="feature-grid">
          {features.map(([number, title, detail]) => (
            <article className="feature-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
