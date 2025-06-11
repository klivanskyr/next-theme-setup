"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Placeholder skills - these will be managed by Sanity CMS
const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", image: "/placeholder.svg?height=60&width=60" },
      { name: "TypeScript", image: "/placeholder.svg?height=60&width=60" },
      { name: "Python", image: "/placeholder.svg?height=60&width=60" },
      { name: "C++", image: "/placeholder.svg?height=60&width=60" },
      { name: "Java", image: "/placeholder.svg?height=60&width=60" },
      { name: "Go", image: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    title: "Frontend Technologies",
    skills: [
      { name: "React", image: "/placeholder.svg?height=60&width=60" },
      { name: "Next.js", image: "/placeholder.svg?height=60&width=60" },
      { name: "Vue.js", image: "/placeholder.svg?height=60&width=60" },
      { name: "Tailwind CSS", image: "/placeholder.svg?height=60&width=60" },
      { name: "Three.js", image: "/placeholder.svg?height=60&width=60" },
      { name: "Framer Motion", image: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", image: "/placeholder.svg?height=60&width=60" },
      { name: "Express.js", image: "/placeholder.svg?height=60&width=60" },
      { name: "PostgreSQL", image: "/placeholder.svg?height=60&width=60" },
      { name: "MongoDB", image: "/placeholder.svg?height=60&width=60" },
      { name: "Redis", image: "/placeholder.svg?height=60&width=60" },
      { name: "GraphQL", image: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "TensorFlow", image: "/placeholder.svg?height=60&width=60" },
      { name: "PyTorch", image: "/placeholder.svg?height=60&width=60" },
      { name: "OpenCV", image: "/placeholder.svg?height=60&width=60" },
      { name: "Scikit-learn", image: "/placeholder.svg?height=60&width=60" },
      { name: "Pandas", image: "/placeholder.svg?height=60&width=60" },
      { name: "NumPy", image: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", image: "/placeholder.svg?height=60&width=60" },
      { name: "Kubernetes", image: "/placeholder.svg?height=60&width=60" },
      { name: "AWS", image: "/placeholder.svg?height=60&width=60" },
      { name: "Git", image: "/placeholder.svg?height=60&width=60" },
      { name: "CI/CD", image: "/placeholder.svg?height=60&width=60" },
      { name: "Linux", image: "/placeholder.svg?height=60&width=60" },
    ],
  },
]

export default function SkillsSection() {
  const router = useRouter()

  const handleSkillClick = (skillName: string) => {
    // Scroll to projects section and filter by skill
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })

    // Add a small delay to ensure the section is in view before applying the filter
    setTimeout(() => {
      // Create a custom event to filter projects
      const filterEvent = new CustomEvent("filterProjectsBySkill", {
        detail: { skill: skillName },
      })
      window.dispatchEvent(filterEvent)
    }, 500)
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          <p className="text-sm text-muted-foreground mt-2">Click on any skill to see related projects</p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">{category.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card
                      className="p-4 content-bg enhanced-shadow hover:bg-card/60 transition-all duration-300 group cursor-pointer"
                      onClick={() => handleSkillClick(skill.name)}
                    >
                      <CardContent className="p-0 text-center">
                        <div className="mb-3 flex justify-center">
                          <Image
                            src={skill.image || "/placeholder.svg"}
                            alt={skill.name}
                            width={60}
                            height={60}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{skill.name}</h4>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
