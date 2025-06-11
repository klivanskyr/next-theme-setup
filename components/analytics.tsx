"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    dataLayer: any[]
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
      // Load Google Analytics script
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
      script.async = true
      document.head.appendChild(script)

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag("js", new Date())
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      const url = pathname + searchParams.toString()
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  // Track custom events
  useEffect(() => {
    // Track section views
    const handleSectionView = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.gtag) {
          const sectionName = entry.target.id
          window.gtag("event", "section_view", {
            event_category: "engagement",
            event_label: sectionName,
            value: 1,
          })
        }
      })
    }

    const observer = new IntersectionObserver(handleSectionView, {
      threshold: 0.5,
    })

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return null
}
