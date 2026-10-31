function NotebookShowcase() {
  return (
    <div className="hero-showcase" aria-label="Custom notebook preview">
      <div className="notebook-back" />
      <div className="notebook-front">
        <span className="notebook-monogram">dp.</span>
        <span className="notebook-gold-line" />
        <strong>
          Ideas Into
          <br />
          Pages.
        </strong>
        <small>YOUR STORY STARTS HERE</small>
      </div>
      <div className="floating-card floating-card-top">
        <strong>✎ &nbsp;Make it yours</strong>
        <span>Text, colours & logo</span>
      </div>
      <div className="floating-card floating-card-bottom">
        <strong>✓ &nbsp;Made for your needs</strong>
        <span>Personal or bulk orders</span>
      </div>
    </div>
  );
}
export default function HomeHero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow-pill">PAPER PRODUCTS, MADE PERSONAL</div>
          <h1>
            Your ideas.
            <br />
            Your notebook.
          </h1>
          <p className="hero-accent">Your way.</p>
          <p className="hero-description">
            From everyday stationery to notebooks designed by you, we bring
            thoughtful details and dependable manufacturing together in every
            page.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="/customize-book">
              ✦ &nbsp;Customize Your Notebook
            </a>
            <a className="button-secondary" href="/products">
              Explore Products&nbsp; →
            </a>
          </div>
        </div>
        <NotebookShowcase />
      </div>
    </section>
  );
}
