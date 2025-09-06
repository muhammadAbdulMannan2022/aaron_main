import React, { useEffect } from "react";
import { useLocation } from "react-router";

import Navbar from "./sections/NavBar/Navbar";
import { Hero } from "./sections/hero/Hero";
import BenefitsSection from "./sections/features/Features";
import HowToImprove from "./sections/HowToImprove/HowToImprove";
import Pricing from "./sections/priceing/Priceing";
import { Testimonials } from "./sections/testimonials/Testimonials";
import SubscribeS from "./sections/SubButton/SubscribeS";
import { FAQ } from "./sections/Faq/FAQ";
import { Footer } from "./sections/footer/Footer";
import Chatbot from "./sections/bot/Landingbot";
import { HowItsWorks } from "./sections/howitsWorks/HowItsWorks";

export default function LandingLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // fallback → scroll to top if no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="bg-main-bg">
      <Navbar />
      <Hero />
      <BenefitsSection />
      <HowToImprove />
      <HowItsWorks />
      <Pricing />
      <Testimonials />
      <SubscribeS />
      <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
}
