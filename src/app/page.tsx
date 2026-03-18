"use client";
import HowItWorksPage from "@/components/howitworks/page";
import FeaturesSection from "@/components/features_section/page";
import CtaSection from "@/components/cta_section/page";
import HeroSection from "@/components/hero_section/page";
import ReviewsSection from "@/components/reviews_section/page";
import { useAuthStore } from '@/stores/auth-store';

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  console.log("User:", user);
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-800 via-indigo-900 to-slate-950 mt-18">

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Reviews Section - Infinite Carousel */}
      <ReviewsSection />

      {/* How It Works */}
      <HowItWorksPage />

      {/* CTA Section */}
      <CtaSection />

    </div>
  );
}