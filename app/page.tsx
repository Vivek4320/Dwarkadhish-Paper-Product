"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SiteHeader from "../components/SiteHeader";
import HomeCarousel from "../components/HomeCarousel";
import BenefitsStrip from "../components/BenefitsStrip";
import HomeProductsSection from "../components/HomeProductsSection";
import CustomizeSection from "../components/CustomizeSection";
import SiteFooter from "../components/SiteFooter";
import MobileBottomNav from "../components/MobileBottomNav";
import LoginModal from "../components/LoginModal";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { isSignedIn } = useUser();
  useEffect(() => { if (isSignedIn) setLoginOpen(false); }, [isSignedIn]);

  return (
    <main id="home" className="site-shell">
      <SiteHeader onLogin={() => setLoginOpen(true)} isSignedIn={Boolean(isSignedIn)} showAnnouncement />
      <HomeCarousel />
      <BenefitsStrip />
      <HomeProductsSection />
      <CustomizeSection />
      <SiteFooter />
      <MobileBottomNav />
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </main>
  );
}
