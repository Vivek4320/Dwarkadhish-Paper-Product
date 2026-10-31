"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import SiteHeader from "./SiteHeader";
import HomeHero from "./HomeHero";
import BenefitsStrip from "./BenefitsStrip";
import CustomizeSection from "./CustomizeSection";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import LoginModal from "./LoginModal";

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
