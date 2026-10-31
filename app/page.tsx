"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import SiteHeader from "../components/SiteHeader";
import HomeHero from "../components/HomeHero";
import BenefitsStrip from "../components/BenefitsStrip";
import CustomizeSection from "../components/CustomizeSection";
import SiteFooter from "../components/SiteFooter";
import MobileBottomNav from "../components/MobileBottomNav";
import LoginModal from "../components/LoginModal";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isSignedIn) setLoginOpen(false);
  }, [isSignedIn]);

  async function handleLogout() {
    await signOut();
  }

  return (
    <main id="home" className="site-shell">
      <SiteHeader
        onLogin={() => setLoginOpen(true)}
        userEmail={user?.primaryEmailAddress?.emailAddress ?? null}
        onLogout={handleLogout}
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
