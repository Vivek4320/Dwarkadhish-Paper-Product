"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
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
          {isSignedIn ? (
            <div className="header-profile" aria-label="Your account">
              <UserButton />
            </div>
          ) : (
            <button className="header-cta" onClick={handleAccountAction}>
              {accountLabel} <span>↗</span>
            </button>
          )}
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
