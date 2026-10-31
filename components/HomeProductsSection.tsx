import Link from "next/link";
import { products } from "./site-data";

export default function HomeProductsSection() {
  return (
    <section className="products-section" id="products">
      <div className="section-container">
        <p className="section-eyebrow">OUR COLLECTION</p>
        <h2>Stationery for every idea.</h2>
        <p className="section-subtitle">
          A thoughtful range for study, work, gifting and everyday writing.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.title}>
              <div className={`product-art ${product.artClass}`}>
                <div className={`mini-notebook ${product.coverClass}`}>
                  {product.cover.split("|").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </div>
              <div className="product-copy">
                <p className="product-category">{product.category}</p>
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <Link className="text-link" href="/contact">
                  ASK FOR PRICING <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
