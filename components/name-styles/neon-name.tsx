"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function NeonName() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary">Ryan Klivansky</h1>

  const isDark = resolvedTheme === "dark"

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-6 text-primary relative"
        animate={{
          textShadow: isDark
            ? [
                "0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6, 0 0 20px #3b82f6",
                "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6, 0 0 40px #3b82f6",
                "0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6, 0 0 20px #3b82f6",
              ]
            : [
                "0 0 5px #3b82f6, 0 0 10px #3b82f6",
                "0 0 10px #3b82f6, 0 0 20px #3b82f6",
                "0 0 5px #3b82f6, 0 0 10px #3b82f6",
              ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        Ryan Klivansky
      </motion.h1>
    </motion.div>
  )
}
