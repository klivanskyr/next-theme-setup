"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative overflow-hidden"
    >
      <div className="relative z-10">{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</div>
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 0.1 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{ borderRadius: "inherit" }}
      />
    </Button>
  )
}
