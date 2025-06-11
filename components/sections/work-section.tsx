"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Calendar } from "lucide-react"

// Placeholder work experiences - these will be managed by Sanity CMS
const workExperiences = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "Jun 2023 - Aug 2023",
    type: "Internship",
    description:
      "Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL. Collaborated with senior engineers to implement new features and optimize existing codebase for better performance.",
    achievements: [
      "Improved application load time by 40% through code optimization",
      "Built 3 new user-facing features that increased user engagement by 25%",
      "Participated in code reviews and contributed to team best practices",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "JavaScript", "Git", "Agile"],
    companyUrl: "https://techcorp.example.com",
    current: false,
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Remote",
    period: "Sep 2022 - May 2023",
    type: "Part-time",
    description:
      "Led frontend development for a fintech startup's web platform. Worked closely with designers and backend developers to create responsive, user-friendly interfaces for financial management tools.",
    achievements: [
      "Designed and implemented responsive UI components used across 5+ products",
      "Reduced bug reports by 60% through comprehensive testing and code quality improvements",
      "Mentored 2 junior developers and conducted technical interviews",
    ],
    skills: ["Vue.js", "TypeScript", "Tailwind CSS", "Jest", "Figma", "REST APIs"],
    companyUrl: "https://startupxyz.example.com",
    current: false,
  },
  {
    id: 3,
    title: "Research Assistant",
    company: "Brown University CS Department",
    location: "Providence, RI",
    period: "Jan 2022 - Present",
    type: "Part-time",
    description:
      "Supporting faculty research in machine learning and computer vision. Developing algorithms for autonomous systems and contributing to academic publications in top-tier conferences.",
    achievements: [
      "Co-authored 2 research papers published in IEEE conferences",
      "Developed ML models with 95% accuracy for object detection tasks",
      "Presented research findings at 3 academic conferences",
    ],
    skills: ["Python", "PyTorch", "Computer Vision", "Machine Learning", "Research", "Academic Writing"],
    companyUrl: "https://cs.brown.edu",
    current: true,
  },
  {
    id: 4,
    title: "Web Development Freelancer",
    company: "Self-Employed",
    location: "Remote",
    period: "Mar 2021 - Dec 2022",
    type: "Freelance",
    description:
      "Provided web development services to small businesses and startups. Built custom websites, e-commerce platforms, and web applications tailored to client needs and requirements.",
    achievements: [
      "Completed 15+ projects with 100% client satisfaction rate",
      "Generated $25K+ in revenue while maintaining full-time student status",
      "Built long-term relationships with 5 recurring clients",
    ],
    skills: ["WordPress", "Shopify", "HTML/CSS", "JavaScript", "PHP", "Client Management"],
    companyUrl: null,
    current: false,
  },
]

export default function WorkSection() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Work Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional experience building real-world solutions and contributing to innovative projects
          </p>
        </motion.div>

        <div className="space-y-8">
          {workExperiences.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="content-bg enhanced-shadow overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                        {work.title}
                        {work.current && (
                          <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-500/20">
                            Current
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
                        <p className="text-lg font-medium text-primary">{work.company}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {work.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {work.period}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="self-start md:self-auto">
                      {work.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{work.description}</p>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {work.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Technologies & Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {work.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {work.companyUrl && (
                    <div className="flex justify-end pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={work.companyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Company Website
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
