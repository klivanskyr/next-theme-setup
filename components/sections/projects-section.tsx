"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Github, Search, X } from "lucide-react"
import Image from "next/image"

// Enhanced project interface with toggleable buttons
interface Project {
  id: number
  title: string
  description: string
  image: string
  skills: string[]
  liveUrl?: string
  githubUrl?: string
  showLiveDemo: boolean
  showCode: boolean
  category: string
  featured: boolean
}

// Placeholder projects with enhanced data
const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Computer Vision App",
    description:
      "A real-time object detection and classification system using deep learning models. Features include live camera feed processing, custom model training, and performance analytics.",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["Python", "TensorFlow", "OpenCV", "React", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/klivanskyr/project1",
    showLiveDemo: true,
    showCode: true,
    category: "AI/ML",
    featured: true,
  },
  {
    id: 2,
    title: "Full-Stack E-Commerce Platform",
    description:
      "A complete e-commerce solution with user authentication, payment processing, inventory management, and admin dashboard. Built with modern web technologies.",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/klivanskyr/project2",
    showLiveDemo: true,
    showCode: true,
    category: "Web Development",
    featured: true,
  },
  {
    id: 3,
    title: "Smart IoT Home System",
    description:
      "An integrated home automation system with sensor data collection, real-time monitoring, and mobile app control. Includes machine learning for predictive analytics.",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["C++", "Arduino", "React Native", "Firebase", "Machine Learning"],
    githubUrl: "https://github.com/klivanskyr/project3",
    showLiveDemo: false,
    showCode: true,
    category: "IoT",
    featured: false,
  },
  {
    id: 4,
    title: "Distributed Systems Simulator",
    description:
      "A comprehensive simulator for distributed computing systems with fault tolerance, load balancing, and performance monitoring capabilities.",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["Go", "Docker", "Kubernetes", "gRPC", "Prometheus"],
    liveUrl: "https://example.com",
    showLiveDemo: true,
    showCode: false,
    category: "Systems",
    featured: false,
  },
  {
    id: 5,
    title: "Neural Network Visualizer",
    description:
      "Interactive web application for visualizing neural network architectures and training processes in real-time.",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["JavaScript", "D3.js", "Python", "Flask", "TensorFlow"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/klivanskyr/project5",
    showLiveDemo: true,
    showCode: true,
    category: "AI/ML",
    featured: true,
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description:
      "Secure and transparent voting system built on blockchain technology with smart contracts and decentralized architecture.",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    githubUrl: "https://github.com/klivanskyr/project6",
    showLiveDemo: false,
    showCode: true,
    category: "Blockchain",
    featured: false,
  },
]

export default function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterSkill, setFilterSkill] = useState<string | null>(null)

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  // Listen for skill filter events from the Skills section
  useEffect(() => {
    const handleFilterEvent = (event: CustomEvent) => {
      setFilterSkill(event.detail.skill)
      setSearchTerm("")
      setFilterCategory("all")
    }

    window.addEventListener("filterProjectsBySkill", handleFilterEvent as EventListener)

    return () => {
      window.removeEventListener("filterProjectsBySkill", handleFilterEvent as EventListener)
    }
  }, [])

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filterCategory === "all" || project.category === filterCategory

      const matchesSkill =
        !filterSkill || project.skills.some((skill) => skill.toLowerCase() === filterSkill.toLowerCase())

      return matchesSearch && matchesCategory && matchesSkill
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.featured ? 1 : -1
        case "title":
          return a.title.localeCompare(b.title)
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })
  }, [searchTerm, sortBy, filterCategory, filterSkill])

  const clearSkillFilter = () => {
    setFilterSkill(null)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my technical skills and creative problem-solving
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="p-6 content-bg enhanced-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects, skills, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filterSkill && (
              <div className="mt-4 flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Filtered by skill:</span>
                <Badge className="flex items-center gap-1">
                  {filterSkill}
                  <button onClick={clearSkillFilter} className="ml-1 hover:text-primary">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full content-bg enhanced-shadow hover:bg-card/60 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                          filterSkill === skill ? "bg-primary text-primary-foreground" : ""
                        }`}
                        onClick={() => setFilterSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="flex gap-3 w-full">
                    {project.showLiveDemo && project.liveUrl && (
                      <Button asChild size="sm" className="flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.showCode && project.githubUrl && (
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAndSortedProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
