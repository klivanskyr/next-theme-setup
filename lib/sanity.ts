import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2024-01-01",
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Enhanced types for Sanity documents
export interface Project {
  _id: string
  title: string
  description: string
  detailedDescription?: any[]
  image: any
  skills: string[]
  category: string
  liveUrl?: string
  githubUrl?: string
  showLiveDemo: boolean
  showCode: boolean
  featured: boolean
  order?: number
  startDate?: string
  endDate?: string
  status: "completed" | "in-progress" | "on-hold" | "archived"
  challenges?: Array<{
    challenge: string
    solution: string
  }>
  keyFeatures?: string[]
  teamSize?: number
  myRole?: string
}

export interface Skill {
  _id: string
  name: string
  image: any
  category: string
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience?: number
  description?: string
  projects?: Project[]
  certifications?: Array<{
    name: string
    issuer: string
    date: string
    url?: string
  }>
  order?: number
  featured: boolean
  learningResources?: Array<{
    title: string
    url: string
    type: "course" | "book" | "documentation" | "tutorial" | "other"
  }>
}

export interface AboutContent {
  _id: string
  name: string
  title: string
  shortBio: string
  profileImage?: any
  education: {
    institution: string
    degree: string
    year: string
    gpa?: number
    relevantCoursework?: string[]
    achievements?: string[]
  }
  interests: Array<{
    title: string
    description: string
    icon: string
    relatedSkills?: Skill[]
  }>
  personalValues?: string[]
  detailedBio?: any[]
  currentFocus?: string
  careerGoals?: string
  hobbies?: string[]
  location: {
    city: string
    state: string
    country: string
  }
  socialLinks: {
    github?: string
    linkedin?: string
    email: string
    twitter?: string
    website?: string
  }
  resume?: {
    file: any
    lastUpdated: string
  }
}

export interface Testimonial {
  _id: string
  name: string
  title: string
  company: string
  image?: any
  testimonial: string
  rating: number
  relationship: string
  linkedinUrl?: string
  featured: boolean
  dateReceived: string
  projectContext?: Project
}

export interface SiteSettings {
  _id: string
  siteTitle: string
  siteDescription: string
  siteUrl?: string
  favicon?: any
  ogImage?: any
  themeSettings: {
    defaultTheme: "light" | "dark" | "system"
    accentColor?: any
  }
  contactSettings: {
    emailNotifications: boolean
    autoReply?: string
    responseTime: string
  }
  analyticsSettings: {
    googleAnalyticsId?: string
    enableAnalytics: boolean
  }
  maintenanceMode: {
    enabled: boolean
    message?: string
  }
}

// Helper functions for fetching data
export async function getProjects(): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project"] | order(featured desc, order asc) {
      _id,
      title,
      description,
      detailedDescription,
      image,
      skills,
      category,
      liveUrl,
      githubUrl,
      showLiveDemo,
      showCode,
      featured,
      order,
      startDate,
      endDate,
      status,
      challenges,
      keyFeatures,
      teamSize,
      myRole
    }
  `)
}

export async function getSkills(): Promise<Skill[]> {
  return client.fetch(`
    *[_type == "skill"] | order(category asc, featured desc, order asc) {
      _id,
      name,
      image,
      category,
      proficiencyLevel,
      yearsOfExperience,
      description,
      "projects": projects[]-> {
        _id,
        title
      },
      certifications,
      order,
      featured,
      learningResources
    }
  `)
}

export async function getAboutContent(): Promise<AboutContent> {
  return client.fetch(`
    *[_type == "about"][0] {
      _id,
      name,
      title,
      shortBio,
      profileImage,
      education,
      interests[] {
        title,
        description,
        icon,
        "relatedSkills": relatedSkills[]-> {
          _id,
          name
        }
      },
      personalValues,
      detailedBio,
      currentFocus,
      careerGoals,
      hobbies,
      location,
      socialLinks,
      resume
    }
  `)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`
    *[_type == "testimonial"] | order(featured desc, dateReceived desc) {
      _id,
      name,
      title,
      company,
      image,
      testimonial,
      rating,
      relationship,
      linkedinUrl,
      featured,
      dateReceived,
      "projectContext": projectContext-> {
        _id,
        title
      }
    }
  `)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      _id,
      siteTitle,
      siteDescription,
      siteUrl,
      favicon,
      ogImage,
      themeSettings,
      contactSettings,
      analyticsSettings,
      maintenanceMode
    }
  `)
}
