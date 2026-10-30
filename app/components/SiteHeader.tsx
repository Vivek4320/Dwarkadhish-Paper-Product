"use client";
import { useState } from "react";
import { navItems } from "./site-data";
import LogoSpace from "./LogoSpace";
export default function SiteHeader({ onLogin }: { onLogin: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogin = () => { setMenuOpen(false); onLogin(); };
  return <>
    <div className="announcement-bar"><div className="announcement-inner"><span>CRAFTED FOR EVERY NOTE WORTH KEEPING</span><span className="announcement-gold">STATIONERY MANUFACTURER&nbsp; · &nbsp;CUSTOM & BULK ORDERS</span></div></div>
    <header className="site-header"><div className="header-inner">
      <a className="brand-placeholder" href="#home" aria-label="Dwarkadhish Paper Products home"><LogoSpace /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <button className="header-cta" onClick={handleLogin}>Get Started <span>↗</span></button>
      <button className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
    </div>
    {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<button onClick={handleLogin}>Get Started ↗</button></nav>}</header>
  </>;
}
