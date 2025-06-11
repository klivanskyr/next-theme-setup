"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TypingName() {
  const fullName = "Ryan Klivansky"
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (isTyping) {
      if (displayedText.length < fullName.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullName.substring(0, displayedText.length + 1))
        }, 150)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        const timeout = setTimeout(() => {
          setIsTyping(true)
          setDisplayedText("")
        }, 3000)
        return () => clearTimeout(timeout)
      }
    }
  }, [displayedText, isTyping])

  return (
    <div className="w-full flex justify-center">
      <motion.h1
        className={`font-bold mb-6 text-primary font-mono text-center ${
          isMobile ? "text-3xl sm:text-4xl" : "text-6xl md:text-8xl"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "100%",
          wordBreak: "break-word",
        }}
      >
        {displayedText}
        <span
          className={`inline-block w-[0.1em] h-[1em] bg-primary ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
        ></span>
      </motion.h1>
    </div>
  )
}
