"use client";

import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/products", label: "Products", icon: "▤" },
  { href: "/customize-book", label: "Customize", icon: "✎" },
  { href: "/about", label: "About", icon: "ⓘ" },
  { href: "/contact", label: "Contact", icon: "✉" },
];

// Pages that have their own focused layout and should not show the bar.
const HIDDEN_PREFIXES = ["/admin", "/checkout", "/sign-in", "/sign-up"];

/** Phone-only bottom navigation with real page links, shown on every page. */
export default function MobileBottomNav() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      {items.map(({ href, label, icon }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <a
            key={href}
            href={href}
            className={active ? "active" : undefined}
            aria-current={active ? "page" : undefined}
            aria-label={label}
          >
            <span aria-hidden="true">{icon}</span>
            <small>{label}</small>
          </a>
        );
      })}
    </nav>
  );
}
