"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CartLink from "./CartLink";
import { navItems } from "./site-data";

type SiteHeaderProps = {
  onLogin: () => void;
  isSignedIn: boolean;
  showAnnouncement?: boolean;
};

export default function SiteHeader({
  onLogin,
  isSignedIn,
  showAnnouncement = false,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAccountAction = () => {
    setMenuOpen(false);
    if (!isSignedIn) onLogin();
  };

  const accountLabel = "Get Started";

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
          <a
            className="brand-placeholder"
            href="#home"
            aria-label="Dwarkadhish Paper Products home"
          >
            <img
              src="/Main-Logo.png"
              alt="Dwarkadhish Paper Products"
              className="brand-logo"
            />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            {isSignedIn && (
              <>
                <CartLink isSignedIn={isSignedIn} />
                <Link href="/orders" className="header-cart" aria-label="Order history" title="My Orders">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              <button className="header-cta" onClick={handleAccountAction}>
                {accountLabel} <span>↗</span>
              </button>
            )}
          </div>
          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            {isSignedIn ? (
              <div className="mobile-account-row">
                <span>Your account</span>
                <UserButton />
              </div>
            ) : (
              <button onClick={handleAccountAction}>{accountLabel} ↗</button>
            )}
          </nav>
        )}
      </header>
    </>
  );
}
