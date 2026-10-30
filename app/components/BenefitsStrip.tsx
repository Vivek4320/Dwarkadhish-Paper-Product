import { benefits } from "./site-data";
export default function BenefitsStrip() {
  return <section className="benefits-strip" aria-label="Our benefits"><div className="benefits-inner">{benefits.map(([icon, label], index) => <div className="benefit-item" key={label}><span className="benefit-icon">{icon}</span><span>{label}</span>{index !== benefits.length - 1 && <i className="benefit-divider" />}</div>)}</div></section>;
}
