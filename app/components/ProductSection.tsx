import { products } from "./site-data";
type Product = (typeof products)[number];
function ProductCard({ product, onEnquire }: { product: Product; onEnquire: () => void }) {
  const cover = product.cover.split("|");
  return <article className="product-card"><div className={"product-art " + product.artClass}><div className={"mini-notebook " + product.coverClass}><span>{cover[0]}<br />{cover[1]}</span></div></div><div className="product-copy"><p className="product-category">{product.category}</p><h3>{product.title}</h3><p className="product-description">{product.description}</p><button className="text-link" onClick={onEnquire}>ASK FOR PRICING <span>→</span></button></div></article>;
}
export default function ProductSection({ onEnquire }: { onEnquire: () => void }) {
  return <section className="products-section" id="products"><div className="section-container"><p className="section-eyebrow">OUR COLLECTION</p><h2>Stationery for every idea.</h2><p className="section-subtitle">A thoughtful range for study, work, gifting and everyday writing.</p><div className="product-grid">{products.map(product => <ProductCard key={product.title} product={product} onEnquire={onEnquire} />)}</div></div></section>;
}
