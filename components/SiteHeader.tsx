"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CartLink from "./CartLink";
import { navItems } from "./site-data";

type SiteHeaderProps = {
  isSignedIn: boolean;
  showAnnouncement?: boolean;
};

export default function SiteHeader({
  isSignedIn,
  showAnnouncement = false,
}: SiteHeaderProps) {
  return (
    <>
      {showAnnouncement && (
        <div className="announcement-bar">
          <div className="announcement-inner">
            <span>CRAFTED FOR EVERY NOTE WORTH KEEPING</span>
            <span className="announcement-gold">
              STATIONERY MANUFACTURER&nbsp; · &nbsp;CUSTOM & BULK ORDERS
            </span>
          </div>
        </div>
      )}
      <header className="site-header">
        <div className="header-inner">
          <Link
            className="brand-placeholder"
            href="/"
            aria-label="Dwarkadhish Paper Products home"
          >
            <img
              src="/Main-Logo.png"
              alt="Dwarkadhish Paper Products"
              className="brand-logo"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            {isSignedIn && (
              <>
                <CartLink isSignedIn={isSignedIn} />
                <Link
                  href="/orders"
                  className="header-cart"
                  aria-label="Order history"
                  title="My Orders"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 3h12v18l-6-3-6 3z" />
                    <path d="M9 8h6M9 12h6" />
                  </svg>
                </Link>
              </>
            )}
            {isSignedIn ? (
              <div className="header-profile" aria-label="Your account">
                <UserButton />
              </div>
            ) : (
              <Link className="header-cta" href="/sign-in">
                Get Started <span>↗</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
