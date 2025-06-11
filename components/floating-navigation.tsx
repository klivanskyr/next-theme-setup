"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Briefcase, Building, Mail, Menu, X } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "work", label: "Experience", icon: Building },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { trackEvent } = useAnalytics()

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      trackEvent("navigation_click", { section: sectionId })
    }
    setIsMobileMenuOpen(false)
  }

  // Desktop navigation (top floating bar)
  if (!isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 transform z-50"
          >
            <motion.div className="flex items-center gap-1 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-6 py-3 enhanced-shadow">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 transition-all duration-200 ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="desktopActiveBackground"
                        className="absolute inset-0 bg-primary rounded-md"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                )
              })}

              <div className="w-px h-6 bg-border mx-2" />
              <ThemeToggle />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    )
  }

  // Mobile navigation (hamburger drawer)
  return (
    <>
      {/* Mobile hamburger button */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background/90 backdrop-blur-md border border-border rounded-xl p-2 enhanced-shadow"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-md border-l border-border z-50 enhanced-shadow"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 p-6">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id

                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        size="lg"
                        onClick={() => scrollToSection(item.id)}
                        className="w-full justify-start gap-3 h-12"
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
