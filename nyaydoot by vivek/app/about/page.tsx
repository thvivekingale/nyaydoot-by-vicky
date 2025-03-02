"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Scale, Target, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const TEAM_MEMBERS = [
  {
    name: "Vivek Ingale",
    role: "Founder & CEO",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vicky%20photo.jpg-HGfBk8v2Rgj0t5mc1YXgHtMvmphTaM.jpeg",
    bio: "Dedicated to bringing transparency and accountability to public institutions.",
    email: "thevivekingale@gmail.com",
  },
]

const MILESTONES = [
  {
    year: "2023",
    title: "Platform Launch",
    description: "Nyay Doot platform launched to empower citizens against corruption",
  },
  {
    year: "2024",
    title: "Community Growth",
    description: "Reached 10,000 active users and handled 1,000+ cases",
  },
  {
    year: "2025",
    title: "National Recognition",
    description: "Received national award for contribution to transparency",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Citizens for a Corruption-Free India</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Nyay Doot is a platform dedicated to empowering citizens with tools and resources to fight corruption and
              promote transparency in public institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe in the power of collective action and transparency to create lasting change in society. Our
                mission is to provide citizens with the tools, knowledge, and support they need to stand up against
                corruption.
              </p>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <Shield className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Protect Citizens</h3>
                      <p className="text-sm text-muted-foreground">Ensuring safety and anonymity for whistleblowers</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <Scale className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Promote Justice</h3>
                      <p className="text-sm text-muted-foreground">Supporting legal action against corruption</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <Target className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Drive Change</h3>
                      <p className="text-sm text-muted-foreground">
                        Creating systemic impact through collective action
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image src="/placeholder.svg?height=800&width=600" alt="Our Mission" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated individuals working to make Nyay Doot a powerful force for change.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0} // Prioritize loading the founder's image
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-muted-foreground mb-3">{member.bio}</p>
                    <Link href={`mailto:${member.email}`} className="text-sm text-primary hover:underline">
                      {member.email}
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our mission to fight corruption and promote transparency.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {milestone.year}
                  </div>
                  {index < MILESTONES.length - 1 && <div className="w-0.5 h-full bg-border mt-2"></div>}
                </div>
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Us in Fighting Corruption</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Together, we can create a more transparent and accountable society. Start your journey with Nyay Doot
              today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 text-center text-sm text-muted-foreground">
            <p>Copyright © 2025 Vivek Ingale. All rights reserved.</p>
            <p>
              Contact:{" "}
              <Link href="mailto:thevivekingale@gmail.com" className="text-primary hover:underline">
                thevivekingale@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

