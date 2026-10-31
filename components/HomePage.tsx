"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import SiteHeader from "./SiteHeader";
import HomeHero from "./HomeHero";
import BenefitsStrip from "./BenefitsStrip";
import CustomizeSection from "./CustomizeSection";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import LoginModal from "./LoginModal";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <main id="home" className="site-shell">
      <SiteHeader
        onLogin={() => setLoginOpen(true)}
        userEmail={user?.email ?? null}
        onLogout={handleLogout}
      />
      <HomeHero />
      <BenefitsStrip />
      <CustomizeSection />
      <SiteFooter />
      <MobileBottomNav />
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onAuthenticated={() => setLoginOpen(false)}
        />
      )}
    </main>
  );
}
