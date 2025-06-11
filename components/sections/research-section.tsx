"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"

// Placeholder research experiences - these will be managed by Sanity CMS
const researchExperiences = [
  {
    id: 1,
    title: "Computer Vision for Autonomous Navigation",
    institution: "Brown University Robotics Lab",
    period: "Jan 2023 - Present",
    description:
      "Developing advanced computer vision algorithms for autonomous robot navigation in unstructured environments. Implementing deep learning models for real-time object detection and scene understanding.",
    skills: ["Computer Vision", "PyTorch", "ROS", "SLAM", "Deep Learning"],
    publications: [
      {
        title: "Robust Visual SLAM for Autonomous Navigation in Dynamic Environments",
        conference: "IEEE International Conference on Robotics and Automation (ICRA)",
        year: 2023,
        url: "#",
      },
    ],
    supervisor: "Dr. Jane Smith",
    ongoing: true,
  },
  {
    id: 2,
    title: "AI-Assisted Medical Diagnosis",
    institution: "Brown University Medical School",
    period: "May 2022 - Dec 2022",
    description:
      "Collaborated on developing machine learning models to assist in medical image analysis for early disease detection. Focused on improving accuracy and reducing false positives in diagnostic algorithms.",
    skills: ["Medical Imaging", "TensorFlow", "Data Analysis", "Python", "Healthcare AI"],
    publications: [],
    supervisor: "Dr. Michael Johnson",
    ongoing: false,
  },
  {
    id: 3,
    title: "Distributed Systems for Edge Computing",
    institution: "Brown University Computer Science Department",
    period: "Sep 2021 - Apr 2022",
    description:
      "Researched efficient algorithms for distributing computational workloads across edge devices. Implemented and evaluated prototype systems for real-time data processing in IoT networks.",
    skills: ["Distributed Systems", "Edge Computing", "IoT", "Algorithm Design", "Performance Analysis"],
    publications: [
      {
        title: "Optimizing Resource Allocation in Edge Computing Networks",
        conference: "ACM Symposium on Edge Computing",
        year: 2022,
        url: "#",
      },
    ],
    supervisor: "Dr. Robert Chen",
    ongoing: false,
  },
]

export default function ResearchSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Research Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Academic and industry research projects exploring cutting-edge technologies
          </p>
        </motion.div>

        <div className="space-y-8">
          {researchExperiences.map((research, index) => (
            <motion.div
              key={research.id}
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
                        {research.title}
                        {research.ongoing && (
                          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                            Ongoing
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{research.institution}</p>
                    </div>
                    <Badge variant="secondary" className="self-start md:self-auto">
                      {research.period}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p>{research.description}</p>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Research Areas & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {research.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {research.publications.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Publications</h4>
                      <ul className="space-y-2">
                        {research.publications.map((pub, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <div>
                              <p className="font-medium">{pub.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {pub.conference}, {pub.year}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Supervisor:</span> {research.supervisor}
                    </div>

                    {research.publications.length > 0 && (
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Publication
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
