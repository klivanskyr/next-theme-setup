import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Ryan Klivansky - Software Engineer & Computer Vision Specialist",
    template: "%s | Ryan Klivansky",
  },
  description:
    "Portfolio of Ryan Klivansky, Computer Engineering student at Brown University specializing in Full-Stack Development, Computer Vision, and AI. Explore my projects, skills, and experience.",
  keywords: [
    "Ryan Klivansky",
    "Software Engineer",
    "Computer Engineering",
    "Brown University",
    "Full-Stack Developer",
    "Computer Vision",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "JavaScript",
    "Portfolio",
  ],
  authors: [{ name: "Ryan Klivansky", url: "https://ryanklivansky.com" }],
  creator: "Ryan Klivansky",
  publisher: "Ryan Klivansky",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryanklivansky.com",
    title: "Ryan Klivansky - Software Engineer & Computer Vision Specialist",
    description:
      "Portfolio of Ryan Klivansky, Computer Engineering student at Brown University specializing in Full-Stack Development, Computer Vision, and AI.",
    siteName: "Ryan Klivansky Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan Klivansky - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Klivansky - Software Engineer & Computer Vision Specialist",
    description:
      "Portfolio of Ryan Klivansky, Computer Engineering student at Brown University specializing in Full-Stack Development, Computer Vision, and AI.",
    images: ["/og-image.jpg"],
    creator: "@ryanklivansky",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://ryanklivansky.com",
  },
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense>{children}</Suspense>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
