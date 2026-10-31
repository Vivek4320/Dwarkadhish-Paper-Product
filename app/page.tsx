"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SiteHeader from "../components/SiteHeader";
import HomeHero from "../components/HomeHero";
import BenefitsStrip from "../components/BenefitsStrip";
import CustomizeSection from "../components/CustomizeSection";
import SiteFooter from "../components/SiteFooter";
import MobileBottomNav from "../components/MobileBottomNav";
import LoginModal from "../components/LoginModal";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) setLoginOpen(false);
  }, [isSignedIn]);

  return (
    <main id="home" className="site-shell">
      <SiteHeader
        onLogin={() => setLoginOpen(true)}
        isSignedIn={Boolean(isSignedIn)}
      />
      <HomeHero />
      <BenefitsStrip />
      <CustomizeSection />
      <SiteFooter />
      <MobileBottomNav />
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </main>
  );
}
