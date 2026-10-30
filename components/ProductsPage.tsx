"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  description: string;
  price?: number;
  oldPrice?: number;
  status: "available" | "soon";
  badge?: string;
  art: string;
};

const products: Product[] = [
  { id: 1, name: "Warrior Single Line Notebook", category: "Notebooks", tags: ["Single Line", "Stationery"], description: "A quality single-line notebook for everyday writing, school notes and classroom use.", price: 90, oldPrice: 110, status: "available", badge: "Popular", art: "warrior" },
  { id: 2, name: "Customize Dairy", category: "Customisable", tags: ["Notebooks", "Stationery"], description: "A personalised diary with a custom cover for your school, office or business.", status: "soon", badge: "Bestseller", art: "diary" },
  { id: 3, name: "Customize Banner", category: "Customisable", tags: ["Stationery"], description: "Custom printed banners for promotions, events and business displays.", status: "soon", art: "banner" },
  { id: 4, name: "Customize File", category: "Stationery", tags: ["Customisable"], description: "Organise important documents with a professionally customised file.", status: "soon", art: "file" },
  { id: 5, name: "Customize Pen", category: "Stationery", tags: ["Customisable"], description: "Branded pens for offices, events and promotional stationery.", status: "soon", art: "pen" },
  { id: 6, name: "Customize Calender", category: "Customisable", tags: ["Stationery"], description: "A custom calendar featuring your brand, photographs or important dates.", status: "soon", badge: "New", art: "calendar" },
  { id: 7, name: "Customize Business Card", category: "Customisable", tags: ["Stationery"], description: "Professional business cards designed around your brand identity.", status: "soon", art: "business-card" },
  { id: 8, name: "Customize ID Cards", category: "Customisable", tags: ["Stationery"], description: "Personalised identity cards for schools, teams and organisations.", status: "soon", art: "id-card" },
];

const categories = ["All Products", "Notebooks", "Single Line", "Long Books", "Customisable", "Stationery"];

function ProductArtwork({ art }: { art: string }) {
  return (
    <div className={`product-artwork artwork-${art}`} aria-hidden="true">
      {art === "warrior" && <div className="warrior-sheet"><span className="sheet-corner">✦</span><span className="sheet-heart">♥</span><span className="sheet-flower">✿</span></div>}
      {art === "diary" && <div className="diary-book"><span className="diary-seal">✺<small>W</small></span><b>SCHOOL<br />DIARY</b></div>}
      {art === "banner" && <div className="banner-book"><b>Warrior<br />YOUR BOOK</b><small>DWARKADHISH<br />PAPER PRODUCTS</small></div>}
      {art === "file" && <div className="file-folder"><span className="file-label">◉<small>OFFICE</small></span><i /><i /><i /></div>}
      {art === "pen" && <div className="pen-mock"><span /><i /></div>}
      {art === "calendar" && <div className="calendar-mock"><div className="calendar-head">WARRIOR <small>2026</small></div><div className="calendar-seal">✺<small>SCHOOL</small></div><div className="calendar-grid">{Array.from({ length: 21 }, (_, i) => <i key={i}>{i + 1}</i>)}</div></div>}
      {art === "business-card" && <div className="business-mock"><b>Warrior<br />YOUR BOOK</b><small>DWARKADHISH PAPER PRODUCTS</small></div>}
      {art === "id-card" && <div className="id-mock"><div className="id-ribbon" /><div className="id-card-one"><span>STUDENT ID</span><i /><b>NAME</b><small>DWARKADHISH SCHOOL</small></div><div className="id-card-two"><span>✦</span><b>IDENTITY CARD</b></div></div>}
    </div>
  );
}

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [customiseOpen, setCustomiseOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !q || [product.name, product.category, ...product.tags].join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "All Products" ||
        product.category.toLowerCase() === category.toLowerCase() ||
        product.tags.some((tag) => tag.toLowerCase() === category.toLowerCase());
      return matchesQuery && matchesCategory;
    });
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-low") return [...filtered].sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
    return filtered;
  }, [query, category, sort]);

  return (
    <main className="products-page">
      <header className="products-header">
        <Link href="/" className="products-logo" aria-label="Dwarkadhish Paper Products home"><span className="products-logo-empty" /></Link>
        <nav className="products-nav" aria-label="Main navigation">
          <Link href="/">Home</Link><Link className="active" href="/products">Products</Link><Link href="/customize">Customize</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </nav>
        <button className="products-cart" onClick={() => setCartOpen(true)} aria-label="Open cart"><span>♧</span><i>0</i></button>
      </header>

      <div className="products-content">
        <div className="products-breadcrumb"><Link href="/">Home</Link><span>/</span><b>Products</b></div>

        <section className="products-banner">
          <div className="products-banner-copy">
            <p>MADE FOR YOUR EVERYDAY</p>
            <h1>Notebooks for<br />every idea<span>.</span></h1>
            <div>Discover quality notebooks and stationery from Dwarkadhish Paper Products.<br className="desktop-only" /> Choose a design or customise your own cover.</div>
          </div>
          <div className="banner-notebook" aria-hidden="true"><div><small>YOUR</small><b>NOTEBOOK</b></div><span>♥</span></div>
        </section>

        <section className="products-toolbar" aria-label="Product search and filters">
          <label className="products-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notebooks, ruling, size..." aria-label="Search products" /></label>
          <label className="products-sort"><span>Sort:</span><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="name">Name</option><option value="price-low">Price: Low to High</option></select></label>
        </section>

        <div className="products-filters" aria-label="Product categories">
          {categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>

        <div className="products-heading-row"><h2>Our Products</h2><span>{visibleProducts.length} products</span></div>

        {visibleProducts.length ? <div className="products-card-grid">
          {visibleProducts.map((product) => <article className="catalog-card" key={product.id}>
            <div className="catalog-image">
              <ProductArtwork art={product.art} />
              {product.badge && <span className="catalog-badge">{product.badge}</span>}
            </div>
            <div className="catalog-details">
              {product.id === 1 && <p className="catalog-meta">SINGLE LINE&nbsp; · &nbsp;256 PAGES</p>}
              <h3>{product.name}</h3>
              {product.id === 1 ? <><p className="catalog-description">Size 20.5 × 26 cm. Quality stationery for everyday writing.</p><p className="catalog-rating"><span>★★★★★</span> (Product listing)</p><p className="catalog-price">₹90 <del>₹110</del></p><div className="catalog-actions"><button className="outline-action" onClick={() => setSelected(product)}>View Details</button><button className="solid-action" onClick={() => setCustomiseOpen(true)}>Customize Now</button></div></> :
                <div className="catalog-coming"><button disabled>Coming Soon</button></div>}
            </div>
          </article>)}
        </div> : <div className="products-empty"><b>No products found</b><span>Try another search or choose a different category.</span><button onClick={() => { setQuery(""); setCategory("All Products"); }}>Clear filters</button></div>}

        <div className="products-explore"><button onClick={() => { setQuery(""); setCategory("All Products"); setSort("featured"); }}>Explore All Products</button></div>
      </div>

      <footer className="products-footer">
        <b>DWARKADHISH PAPER PRODUCTS</b>
        <span>Give more than expected.</span>
        <p>Quality stationery · Jamnagar, Gujarat</p>
      </footer>

      {selected && <div className="product-dialog-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" onClick={(e) => e.stopPropagation()}><button className="product-dialog-close" onClick={() => setSelected(null)} aria-label="Close">×</button><ProductArtwork art={selected.art} /><div><p className="catalog-meta">SINGLE LINE · 256 PAGES</p><h2 id="product-dialog-title">{selected.name}</h2><p>{selected.description}</p><strong>₹{selected.price}</strong><button className="solid-action" onClick={() => { setSelected(null); setCustomiseOpen(true); }}>Customize Now</button></div></section></div>}

      {customiseOpen && <div className="product-dialog-backdrop" role="presentation" onClick={() => setCustomiseOpen(false)}><section className="simple-product-dialog" role="dialog" aria-modal="true" aria-labelledby="customise-dialog-title" onClick={(e) => e.stopPropagation()}><button className="product-dialog-close" onClick={() => setCustomiseOpen(false)} aria-label="Close">×</button><p className="catalog-meta">CUSTOM ORDER</p><h2 id="customise-dialog-title">Make it yours.</h2><p>Tell us what you need and our team can help with notebook customisation and bulk enquiries.</p><a className="solid-action" href="mailto:info@dwarkadhishpaper.in?subject=Notebook%20customisation%20enquiry">Send an Enquiry</a></section></div>}

      {cartOpen && <div className="product-dialog-backdrop" role="presentation" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(e) => e.stopPropagation()}><button className="product-dialog-close" onClick={() => setCartOpen(false)} aria-label="Close">×</button><h2 id="cart-title">Your Cart</h2><div className="cart-empty-icon">♧</div><b>Your cart is empty</b><p>Explore our products and find something for your everyday ideas.</p><button className="solid-action" onClick={() => setCartOpen(false)}>Continue Shopping</button></aside></div>}
    </main>
  );
}
