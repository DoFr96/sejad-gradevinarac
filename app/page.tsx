export const dynamic = "force-static";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
// import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      {/* <StatsSection /> */}
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
    </main>
  );
}
