import { Suspense } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import ScrollToTop from "@/components/scroll-to-top"

// Loading component for Suspense
function SectionLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
