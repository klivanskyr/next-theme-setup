"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function GradientFlowName() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary">Ryan Klivansky</h1>

  const gradientColors =
    resolvedTheme === "dark" ? "from-blue-400 via-purple-400 to-blue-400" : "from-blue-600 via-purple-600 to-blue-600"

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <motion.h1
        className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent bg-[length:200%_auto]`}
        animate={{
          backgroundPosition: ["0% center", "200% center", "0% center"],
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        Ryan Klivansky
      </motion.h1>
    </motion.div>
  )
}
