"use client"

import { useEffect } from "react"

export function StructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ryan Klivansky",
      jobTitle: "Computer Engineering Student",
      description:
        "Computer Engineering student at Brown University specializing in Full-Stack Development, Computer Vision, and AI",
      url: "https://ryanklivansky.com",
      sameAs: ["https://github.com/klivanskyr", "https://linkedin.com/in/ryan-klivansky"],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Brown University",
      },
      knowsAbout: [
        "Full-Stack Development",
        "Computer Vision",
        "Artificial Intelligence",
        "Machine Learning",
        "React",
        "Next.js",
        "Python",
        "JavaScript",
        "TypeScript",
      ],
      email: "klivanskyr@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Providence",
        addressRegion: "RI",
        addressCountry: "US",
      },
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
