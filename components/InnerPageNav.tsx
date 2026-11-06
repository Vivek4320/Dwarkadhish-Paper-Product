"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import CartLink from "./CartLink";
import { navItems } from "./site-data";

// The home page has its own full header; these pages are focused flows.
const HIDDEN_EXACT = ["/"];
const HIDDEN_PREFIXES = ["/admin", "/checkout", "/sign-in", "/sign-up"];

/** Desktop/tablet link bar for inner pages. Phones use the bottom bar. */
export default function InnerPageNav() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  if (
    HIDDEN_EXACT.includes(pathname) ||
    HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return null;
  }
  return (
    <nav className="inner-nav" aria-label="Main navigation">
      <div className="inner-nav-row">
        <Link href="/" className="inner-nav-brand">
          Dwarkadhish Paper Products
        </Link>
        <div className="inner-nav-links">
          {navItems.map(([label, href]) => {
            const active = href === "/" ? false : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          {isSignedIn && <Link href="/orders">My Orders</Link>}
          {isSignedIn && <CartLink isSignedIn={isSignedIn} />}
        </div>
      </div>
    </nav>
  );
}
