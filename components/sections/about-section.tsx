"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Code, Eye, Brain } from "lucide-react"

const interests = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Building end-to-end applications with modern technologies",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Developing systems that can interpret and understand visual information",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description: "Creating intelligent systems that can learn and adapt",
  },
]

export default function AboutSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Get to know the person behind the code</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 content-bg">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Education & Background</h3>
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  I'm currently a Junior at <span className="text-primary font-semibold">Brown University</span>{" "}
                  studying Computer Engineering. My academic journey has given me a strong foundation in both hardware
                  and software systems.
                </p>
                <p className="text-lg text-muted-foreground">
                  I'm passionate about applying my technical skills to solve unique challenges and am particularly
                  excited about learning more about systems design and advancing AI technologies.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {interests.map((interest, index) => {
              const Icon = interest.icon
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 content-bg hover:bg-card/60 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{interest.title}</h4>
                          <p className="text-muted-foreground">{interest.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 content-bg enhanced-shadow border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold mb-4">What Drives Me</h3>
              <p className="text-lg text-muted-foreground mb-6">
                I believe in the power of technology to solve real-world problems. Whether it's building intuitive user
                interfaces, developing computer vision algorithms, or creating AI systems, I'm always looking for ways
                to make a meaningful impact.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Problem Solving", "Innovation", "Continuous Learning", "Collaboration", "Impact"].map((value) => (
                  <Badge key={value} variant="secondary" className="text-sm">
                    {value}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
