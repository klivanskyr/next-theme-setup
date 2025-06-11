import ThreeBackground from "@/components/three-background"
import FloatingNavigation from "@/components/floating-navigation"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import WorkSection from "@/components/sections/work-section"
import ResearchSection from "@/components/sections/research-section"
import ContactSection from "@/components/sections/contact-section"
import ResumeSection from "@/components/sections/resume-section"
import { StructuredData } from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="relative">
        <ThreeBackground />
        <FloatingNavigation />

        <section id="home" className="section">
          <HeroSection />
        </section>

        <section id="about" className="section">
          <AboutSection />
        </section>

        <section id="projects" className="section">
          <ProjectsSection />
        </section>

        <section id="skills" className="section">
          <SkillsSection />
        </section>

        <section id="work" className="section">
          <WorkSection />
        </section>

        <section id="research" className="section">
          <ResearchSection />
        </section>

        <section id="contact" className="section">
          <ContactSection />
        </section>

        <section id="resume" className="section">
          <ResumeSection />
        </section>
      </main>
    </>
  )
}
