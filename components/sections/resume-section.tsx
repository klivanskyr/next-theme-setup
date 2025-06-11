"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Eye, FileText } from "lucide-react"

export default function ResumeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownload = () => {
    // This will be replaced with actual resume file
    const link = document.createElement("a")
    link.href = "/resume.pdf" // Placeholder - you'll upload your actual resume
    link.download = "Ryan_Klivansky_Resume.pdf"
    link.click()
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Resume</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Download or view my resume to learn more about my experience and qualifications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 content-bg enhanced-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <FileText className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Ryan Klivansky</CardTitle>
              <p className="text-muted-foreground">Computer Engineering Student</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My resume includes details about my education at Brown University, technical skills, project experience,
                and professional background in full-stack development, computer vision, and AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="group">
                      <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      View Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Resume - Ryan Klivansky</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 bg-muted rounded-lg p-8 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Resume preview will appear here once you upload your PDF
                        </p>
                        <Button onClick={handleDownload} variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </Button>
                      </div>
                      {/* This will be replaced with actual PDF embed */}
                      {/* <iframe 
                        src="/resume.pdf" 
                        className="w-full h-full rounded-lg"
                        title="Resume"
                      /> */}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="lg" onClick={handleDownload} className="group">
                  <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                  Download PDF
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Last updated: December 2024</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
