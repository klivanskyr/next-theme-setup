"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function GlitchName() {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <motion.h1
      className="text-6xl md:text-8xl font-bold mb-6 text-primary relative"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <span className={`relative inline-block ${isGlitching ? "opacity-0" : "opacity-100"}`}>Ryan Klivansky</span>

      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-primary opacity-70 transform -translate-x-2 translate-y-1">
            Ryan Klivansky
          </span>
          <span className="absolute top-0 left-0 text-blue-400 opacity-70 transform translate-x-2 -translate-y-1">
            Ryan Klivansky
          </span>
          <span className="absolute top-0 left-0 text-red-400 opacity-70 mix-blend-screen">Ryan Klivansky</span>
        </>
      )}
    </motion.h1>
  )
}
