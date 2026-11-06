"use client";
import { useUser } from "@clerk/nextjs";
import SiteHeader from "../components/SiteHeader";
import HomeCarousel from "../components/HomeCarousel";
import BenefitsStrip from "../components/BenefitsStrip";
import HomeProductsSection from "../components/HomeProductsSection";
import CustomizeSection from "../components/CustomizeSection";
import OurClients from "../components/OurClients";
import SiteFooter from "../components/SiteFooter";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <main id="home" className="site-shell">
      <SiteHeader isSignedIn={Boolean(isSignedIn)} showAnnouncement />
      <HomeCarousel />
      <BenefitsStrip />
      <OurClients />
      <HomeProductsSection />
      <CustomizeSection />
      <SiteFooter />
    </main>
  );
}
