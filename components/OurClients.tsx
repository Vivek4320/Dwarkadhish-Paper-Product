import { clients } from "./site-data";

function monogram(name: string) {
  const letters = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  return letters.toUpperCase();
}

function ClientCard({ name, logo }: { name: string; logo?: string }) {
  return (
    <li className="client-card">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="client-logo" src={logo} alt={name} loading="lazy" />
      ) : (
        <span className="client-monogram" aria-hidden="true">
          {monogram(name)}
        </span>
      )}
      <span className="client-name">{name}</span>
    </li>
  );
}

/**
 * Endless, auto-scrolling row of clients. The list is rendered twice and the
 * track slides by exactly one copy, so the loop is seamless. The second copy
 * is hidden from assistive tech. Pauses on hover; with "reduce motion" it
 * stops and becomes a normal horizontally scrollable row.
 */
export default function OurClients() {
  return (
    <section className="clients-section" id="clients" aria-label="Our clients">
      <div className="section-container">
        <p className="section-eyebrow">OUR CLIENTS</p>
        <h2>Brands and institutions we work with.</h2>
        <p className="section-subtitle">
          Custom notebooks made with care for businesses, schools and
          organisations.
        </p>
      </div>

      <div className="clients-viewport">
        <div className="clients-track">
          <ul className="clients-list">
            {clients.map((client) => (
              <ClientCard key={client.name} {...client} />
            ))}
          </ul>
          <ul className="clients-list" aria-hidden="true">
            {clients.map((client) => (
              <ClientCard key={client.name} {...client} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
