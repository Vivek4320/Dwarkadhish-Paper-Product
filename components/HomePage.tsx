"use client";
import { useState } from "react";
import SiteHeader from "./SiteHeader";
import HomeHero from "./HomeHero";
import BenefitsStrip from "./BenefitsStrip";
import ProductSection from "./ProductSection";
import CustomizeSection from "./CustomizeSection";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import LoginModal from "./LoginModal";
export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const goToContact = () => { setLoginOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); };
  return <main id="home" className="site-shell"><SiteHeader onLogin={() => setLoginOpen(true)} /><HomeHero /><BenefitsStrip /><ProductSection /><CustomizeSection /><SiteFooter /><MobileBottomNav />{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onContinue={goToContact} />}</main>;
}