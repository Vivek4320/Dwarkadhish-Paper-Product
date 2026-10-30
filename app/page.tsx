"use client";

import { useState } from "react";

const products = [
  { category: "STUDENT ESSENTIALS", title: "Classic Study Notebook", description: "For notes, revision and classroom use.", cover: "STUDY|NOTES", coverClass: "cover-red", artClass: "art-cream" },
  { category: "BUSINESS & CORPORATE", title: "Branded Office Notebook", description: "Professional notebooks with your logo.", cover: "YOUR|BRAND", coverClass: "cover-navy", artClass: "art-blue" },
  { category: "GIFTING", title: "Personalised Gift Journal", description: "A thoughtful notebook for special moments.", cover: "A LITTLE|GIFT", coverClass: "cover-gold", artClass: "art-pink" },
  { category: "EVERYDAY WRITING", title: "Minimal Daily Journal", description: "Clean design for plans and ideas.", cover: "DAILY|JOURNAL", coverClass: "cover-paper", artClass: "art-green" },
];
const navItems = [["Home", "#home"], ["Products", "#products"], ["Customize Book", "#customize"], ["About Us", "#about"], ["Contact", "#contact"]];
const benefits = [["✦", "Custom notebook covers"], ["▤", "Multiple sizes & bindings"], ["◎", "Branding for businesses"], ["↗", "Production-ready workflow"]];
const features = [["01", "Choose a size", "A4 · A5 · A6 · Pocket"], ["02", "Design the cover", "Text · Colour · Logo"], ["03", "Set page details", "Ruled · Plain · Grid"], ["04", "Save or enquire", "Keep your design"]];

function LogoSpace({ className = "" }: { className?: string }) {
  return <div className={"logo-space " + className} aria-label="Logo will be added here" />;
}
function NotebookShowcase() {
  return <div className="hero-showcase" aria-label="Custom notebook preview">
    <div className="notebook-back" />
    <div className="notebook-front">
      <span className="notebook-monogram">dp.</span><span className="notebook-gold-line" />
      <strong>Ideas Into<br />Pages.</strong><small>YOUR STORY STARTS HERE</small>
    </div>
    <div className="floating-card floating-card-top"><strong>✎ &nbsp;Make it yours</strong><span>Text, colours & logo</span></div>
    <div className="floating-card floating-card-bottom"><strong>✓ &nbsp;Made for your needs</strong><span>Personal or bulk orders</span></div>
  </div>;
}
function ProductCard({ product, onEnquire }: { product: (typeof products)[number]; onEnquire: () => void }) {
  return <article className="product-card">
    <div className={"product-art " + product.artClass}><div className={"mini-notebook " + product.coverClass}><span>{product.cover.split("|")[0]}<br />{product.cover.split("|")[1]}</span></div></div>
    <div className="product-copy"><p className="product-category">{product.category}</p><h3>{product.title}</h3><p className="product-description">{product.description}</p><button className="text-link" onClick={onEnquire}>ASK FOR PRICING <span>→</span></button></div>
  </article>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const openLogin = () => { setIsSignup(false); setLoginOpen(true); setMenuOpen(false); };
  const goToContact = () => { setLoginOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); };

  return <main id="home" className="site-shell">
    <div className="announcement-bar"><div className="announcement-inner"><span>CRAFTED FOR EVERY NOTE WORTH KEEPING</span><span className="announcement-gold">STATIONERY MANUFACTURER&nbsp; · &nbsp;CUSTOM & BULK ORDERS</span></div></div>
    <header className="site-header"><div className="header-inner">
      <a className="brand-placeholder" href="#home" aria-label="Dwarkadhish Paper Products home"><LogoSpace /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <button className="header-cta" onClick={openLogin}>Get Started <span>↗</span></button>
      <button className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
    </div>{menuOpen && <nav className="mobile-menu">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<button onClick={openLogin}>Get Started ↗</button></nav>}</header>

    <section className="hero-section"><div className="hero-inner">
      <div className="hero-copy"><div className="eyebrow-pill">PAPER PRODUCTS, MADE PERSONAL</div><h1>Your ideas.<br />Your notebook.</h1><p className="hero-accent">Your way.</p>
        <p className="hero-description">From everyday stationery to notebooks designed by you, we bring thoughtful details and dependable manufacturing together in every page.</p>
        <div className="hero-actions"><a className="button-primary" href="#customize">✦ &nbsp;Customize Your Notebook</a><a className="button-secondary" href="#products">Explore Products&nbsp; →</a></div>
      </div><NotebookShowcase />
    </div></section>

    <section className="benefits-strip"><div className="benefits-inner">{benefits.map(([icon, label], i) => <div className="benefit-item" key={label}><span className="benefit-icon">{icon}</span><span>{label}</span>{i !== 3 && <i className="benefit-divider" />}</div>)}</div></section>

    <section className="products-section" id="products"><div className="section-container">
      <p className="section-eyebrow">OUR COLLECTION</p><h2>Stationery for every idea.</h2><p className="section-subtitle">A thoughtful range for study, work, gifting and everyday writing.</p>
      <div className="product-grid">{products.map(product => <ProductCard key={product.title} product={product} onEnquire={goToContact} />)}</div>
    </div></section>

    <section className="customize-section" id="customize"><div className="customize-inner">
      <div className="customize-copy"><p className="section-eyebrow">THE NOTEBOOK CUSTOMISER</p><h2>Make a notebook that feels like yours.</h2><p>Choose size, binding and page style. Add your text or logo, preview the cover, then save your design or send an enquiry.</p><a className="button-primary customize-button" href="#contact">Start designing&nbsp; ↗</a></div>
      <div className="feature-grid">{features.map(([number, title, detail]) => <article className="feature-card" key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
    </div></section>

    <footer className="site-footer" id="contact"><div className="footer-main">
      <div className="footer-brand" id="about"><div className="footer-brand-row"><LogoSpace className="footer-mark-placeholder" /><div><h2>DWARKADHISH PAPER PRODUCTS</h2><span>Give more than expected.</span></div></div><p>Thoughtfully made paper products for schools, offices, businesses and everyday ideas. Quality, trust and dependable service in every order.</p></div>
      <div className="footer-column"><h3>EXPLORE</h3><a href="#home">Home</a><a href="#products">Our Products</a><a href="#customize">Customize Book</a><a href="#about">About Us</a></div>
      <div className="footer-column"><h3>HELP & SUPPORT</h3><a href="#contact">Contact Us</a><a href="#contact">Bulk Enquiries</a><a href="#contact">Custom Orders</a><a href="#contact">Frequently Asked Questions</a></div>
      <div className="footer-column footer-contact"><h3>GET IN TOUCH</h3><span>Jamnagar, Gujarat, India</span><span>Product and business enquiries</span><a href="mailto:info@dwarkadhishpaper.in">info@dwarkadhishpaper.in</a></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dwarkadhish Paper Products. All rights reserved.</span><strong>QUALITY&nbsp; · &nbsp;TRUST&nbsp; · &nbsp;MADE WITH CARE</strong></div></footer>

    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      <a className="active" href="#home"><span>⌂</span><small>Home</small></a><a href="#products"><span>▤</span><small>Products</small></a><a href="#customize"><span>✎</span><small>Customize</small></a><a href="#products"><span>▧</span><small>Templates</small></a><a href="#contact"><span>✉</span><small>Contact</small></a>
    </nav>

    {loginOpen && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setLoginOpen(false); }}>
      <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <div className="login-brand-panel"><LogoSpace className="login-logo-placeholder" /><p className="login-brand-name">DWARKADHISH</p><h2>Good ideas<br />start with a<br /><em>fresh page.</em></h2><p>Create an account to customise notebooks, save designs and manage your orders.</p><span>GIVE MORE THAN EXPECTED.</span></div>
        <div className="login-form-panel"><button className="modal-close" aria-label="Close login" onClick={() => setLoginOpen(false)}>×</button><p className="section-eyebrow">WELCOME BACK</p><h2 id="login-title">{isSignup ? "Create your account" : "Welcome back"}</h2><p className="login-subtitle">{isSignup ? "Sign up to start creating your notebook." : "Sign in to continue to your account."}</p>
          <div className="login-tabs"><button className={!isSignup ? "selected" : ""} onClick={() => setIsSignup(false)}>Log in</button><button className={isSignup ? "selected" : ""} onClick={() => setIsSignup(true)}>Create account</button></div>
          {isSignup && <label>Full name<input type="text" placeholder="Enter your full name" /></label>}<label>Email address<input type="email" placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="Enter your password" /></label>
          {!isSignup && <a className="forgot-link" href="#contact">Forgot password?</a>}<button className="login-submit" onClick={goToContact}>{isSignup ? "Create account" : "Log in"}</button><button className="google-button" onClick={goToContact}><b>G</b> Continue with Google</button><p className="login-note">Demo interface — account services can be connected later.</p>
        </div>
      </section>
    </div>}
  </main>;
}
