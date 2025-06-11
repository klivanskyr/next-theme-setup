"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import GlitchName from "@/components/name-styles/glitch-name"
import GradientFlowName from "@/components/name-styles/gradient-flow-name"
import TypingName from "@/components/name-styles/typing-name"
import ThreeDName from "@/components/name-styles/3d-name"
import NeonName from "@/components/name-styles/neon-name"
import WaveName from "@/components/name-styles/wave-name"
import MatrixName from "@/components/name-styles/matrix-name"
import BounceName from "@/components/name-styles/bounce-name"
import SplitName from "@/components/name-styles/split-name"
import RainbowName from "@/components/name-styles/rainbow-name"

const nameStyles = [
  { id: "glitch", component: GlitchName, label: "Glitch Effect", hasMouseTracking: false, mobileOptimized: true },
  {
    id: "gradient",
    component: GradientFlowName,
    label: "Gradient Flow",
    hasMouseTracking: false,
    mobileOptimized: true,
  },
  { id: "typing", component: TypingName, label: "Typing Effect", hasMouseTracking: false, mobileOptimized: true },
  { id: "3d", component: ThreeDName, label: "3D Interactive", hasMouseTracking: true, mobileOptimized: false },
  { id: "neon", component: NeonName, label: "Neon Glow", hasMouseTracking: false, mobileOptimized: true },
  { id: "wave", component: WaveName, label: "Wave Animation", hasMouseTracking: false, mobileOptimized: true },
  { id: "matrix", component: MatrixName, label: "Matrix Effect", hasMouseTracking: false, mobileOptimized: true },
  { id: "bounce", component: BounceName, label: "Bounce Effect", hasMouseTracking: true, mobileOptimized: false },
  { id: "split", component: SplitName, label: "Split Animation", hasMouseTracking: false, mobileOptimized: true },
  { id: "rainbow", component: RainbowName, label: "Rainbow Colors", hasMouseTracking: false, mobileOptimized: true },
]

export default function HeroSection() {
  const [currentNameStyle, setCurrentNameStyle] = useState(0)
  const [globalMouseX, setGlobalMouseX] = useState(0)
  const [globalMouseY, setGlobalMouseY] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { trackNameStyleChange } = useAnalytics()

  // Check if mobile and filter styles accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // If switching to mobile and current style isn't mobile optimized, switch to a mobile-friendly one
      if (mobile && !nameStyles[currentNameStyle].mobileOptimized) {
        const mobileOptimizedIndex = nameStyles.findIndex((style) => style.mobileOptimized)
        if (mobileOptimizedIndex !== -1) {
          setCurrentNameStyle(mobileOptimizedIndex)
        }
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [currentNameStyle])

  // Global mouse tracking for 3D effects (disabled on mobile)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      setGlobalMouseX((e.clientX - centerX) / centerX)
      setGlobalMouseY((e.clientY - centerY) / centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  // Auto-cycle through name styles
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentNameStyle((prev) => {
          const nextIndex = (prev + 1) % nameStyles.length
          // Skip non-mobile optimized styles on mobile
          if (isMobile && !nameStyles[nextIndex].mobileOptimized) {
            const nextMobileIndex = nameStyles.findIndex((style, index) => index > nextIndex && style.mobileOptimized)
            return nextMobileIndex !== -1 ? nextMobileIndex : 0
          }
          return nextIndex
        })
      }, 15000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, isMobile])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const currentStyle = nameStyles[currentNameStyle]
  const NameComponent = currentStyle.component

  const nextStyle = () => {
    setAutoPlay(false)
    setCurrentNameStyle((prev) => {
      const nextIndex = (prev + 1) % nameStyles.length
      // Skip non-mobile optimized styles on mobile
      if (isMobile && !nameStyles[nextIndex].mobileOptimized) {
        const nextMobileIndex = nameStyles.findIndex((style, index) => index > nextIndex && style.mobileOptimized)
        const finalIndex = nextMobileIndex !== -1 ? nextMobileIndex : 0
        trackNameStyleChange(nameStyles[finalIndex].label, "manual")
        return finalIndex
      }
      trackNameStyleChange(nameStyles[nextIndex].label, "manual")
      return nextIndex
    })
    setTimeout(() => setAutoPlay(true), 30000)
  }

  const prevStyle = () => {
    setAutoPlay(false)
    setCurrentNameStyle((prev) => {
      const prevIndex = (prev - 1 + nameStyles.length) % nameStyles.length
      // Skip non-mobile optimized styles on mobile
      if (isMobile && !nameStyles[prevIndex].mobileOptimized) {
        const prevMobileIndex = nameStyles.findLastIndex((style, index) => index < prevIndex && style.mobileOptimized)
        const finalIndex = prevMobileIndex !== -1 ? prevMobileIndex : nameStyles.length - 1
        trackNameStyleChange(nameStyles[finalIndex].label, "manual")
        return finalIndex
      }
      trackNameStyleChange(nameStyles[prevIndex].label, "manual")
      return prevIndex
    })
    setTimeout(() => setAutoPlay(true), 30000)
  }

  const selectStyle = (index: number) => {
    // Skip non-mobile optimized styles on mobile
    if (isMobile && !nameStyles[index].mobileOptimized) return

    setCurrentNameStyle(index)
    setAutoPlay(false)
    trackNameStyleChange(nameStyles[index].label, "manual")
    setTimeout(() => setAutoPlay(true), 30000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen hero-bg">
      <div className="text-center max-w-6xl mx-auto px-6 md:px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Name container with proper mobile margins */}
          <div className="relative flex items-center justify-center mb-6 md:mb-8">
            {/* Left Arrow - Positioned closer on desktop too */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-8 hidden sm:block">
              <Button
                size="sm"
                variant="ghost"
                onClick={prevStyle}
                className="rounded-full opacity-70 hover:opacity-100 w-8 h-8 md:w-10 md:h-10"
                title="Previous style"
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>

            {/* Name Container - Better mobile spacing */}
            <div className="flex-1 max-w-full mx-4 md:mx-12 overflow-hidden">
              {currentStyle.hasMouseTracking && !isMobile ? (
                currentStyle.id === "3d" ? (
                  <ThreeDName globalMouseX={globalMouseX} globalMouseY={globalMouseY} />
                ) : currentStyle.id === "bounce" ? (
                  <BounceName globalMouseX={globalMouseX} globalMouseY={globalMouseY} />
                ) : (
                  <NameComponent />
                )
              ) : (
                <NameComponent />
              )}
            </div>

            {/* Right Arrow - Positioned closer on desktop too */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-8 hidden sm:block">
              <Button
                size="sm"
                variant="ghost"
                onClick={nextStyle}
                className="rounded-full opacity-70 hover:opacity-100 w-8 h-8 md:w-10 md:h-10"
                title="Next style"
              >
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile arrows - Much smaller and better positioned */}
          <div className="flex justify-center gap-2 mb-3 sm:hidden">
            <Button
              size="sm"
              variant="ghost"
              onClick={prevStyle}
              className="rounded-full opacity-70 hover:opacity-100 w-6 h-6 p-0"
            >
              <ChevronLeft className="h-2.5 w-2.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={nextStyle}
              className="rounded-full opacity-70 hover:opacity-100 w-6 h-6 p-0"
            >
              <ChevronRight className="h-2.5 w-2.5" />
            </Button>
          </div>

          {/* Style Controls - Much smaller dots on mobile */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex gap-0.5">
              {nameStyles.map((style, index) => (
                <button
                  key={index}
                  onClick={() => selectStyle(index)}
                  className={`rounded-full transition-all ${isMobile ? "w-1 h-1" : "w-2 h-2"} ${
                    index === currentNameStyle
                      ? "bg-primary"
                      : (isMobile && !style.mobileOptimized)
                        ? "bg-muted-foreground/10"
                        : "bg-muted-foreground/30"
                  } ${isMobile && !style.mobileOptimized ? "cursor-not-allowed" : "cursor-pointer"}`}
                  disabled={isMobile && !style.mobileOptimized}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2 hidden md:inline">
              {currentStyle.label} {autoPlay && "• Auto"}
            </span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Computer Engineering Student at Brown University
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate about Full-Stack Development, Computer Vision, and AI. Ready to tackle unique challenges and
            explore systems design.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button asChild size="lg" className="group enhanced-shadow w-full sm:w-auto">
              <a href="https://github.com/klivanskyr" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group enhanced-shadow w-full sm:w-auto">
              <a href="https://linkedin.com/in/ryan-klivansky" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group enhanced-shadow w-full sm:w-auto">
              <a href="mailto:klivanskyr@gmail.com">
                <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Contact
              </a>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <Button variant="ghost" size="lg" onClick={scrollToAbout} className="group animate-bounce">
              <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
