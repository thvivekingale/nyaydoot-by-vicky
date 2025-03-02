"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, FileText, Users, Award, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FeatureCard from "@/components/feature-card"
import CountUp from "@/components/count-up"
import { useInView } from "react-intersection-observer"

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [stats, setStats] = useState({
    complaints: 0,
    resolved: 0,
    users: 0,
    lawyers: 0,
  })

  useEffect(() => {
    if (inView) {
      setStats({
        complaints: 1247,
        resolved: 892,
        users: 5280,
        lawyers: 124,
      })
    }
  }, [inView])

  const features = [
    {
      title: "Secure Reporting",
      description: "Submit complaints with end-to-end encryption and optional anonymity",
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
    {
      title: "Evidence Collection",
      description: "Upload photos, videos, and documents to strengthen your case",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "Community Support",
      description: "Connect with others facing similar issues and build solidarity",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Legal Assistance",
      description: "Get connected with qualified lawyers who can help with your case",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: "Location Tracking",
      description: "Geo-tag incidents to route complaints to the correct authorities",
      icon: <MapPin className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Raising Voices, Ensuring Justice</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering citizens to report corruption, police misconduct, and abuse with security and transparency
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="pulse-button text-lg">
                <Link href="/report">
                  Report an Incident
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20 text-lg"
              >
                <Link href="/public-board">View Public Board</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Card className="neomorphic">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Total Complaints</h3>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUp end={stats.complaints} />
                </p>
              </CardContent>
            </Card>
            <Card className="neomorphic">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Cases Resolved</h3>
                <p className="text-3xl md:text-4xl font-bold text-green-600">
                  <CountUp end={stats.resolved} />
                </p>
              </CardContent>
            </Card>
            <Card className="neomorphic">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Active Users</h3>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUp end={stats.users} />
                </p>
              </CardContent>
            </Card>
            <Card className="neomorphic">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Lawyers Available</h3>
                <p className="text-3xl md:text-4xl font-bold text-secondary">
                  <CountUp end={stats.lawyers} />
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary text-primary">
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Nyay Doot Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides powerful tools to help you document, report, and resolve incidents of corruption and
              misconduct.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary text-primary">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Report in Three Easy Steps</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes it easy to document and report incidents while protecting your privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Document the Incident</h3>
              <p className="text-muted-foreground">
                Capture photos, videos, or audio of the incident with our secure app that automatically adds timestamps
                and location data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Your Report</h3>
              <p className="text-muted-foreground">
                Fill out our guided form with details about the incident. Choose to remain anonymous or verify your
                identity for stronger claims.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Get Support</h3>
              <p className="text-muted-foreground">
                Monitor your case progress, connect with legal experts, and optionally share your case to gain community
                support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Stand Against Corruption?</h2>
            <p className="text-xl mb-8">
              Join thousands of citizens who are making a difference by reporting corruption and misconduct.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/register">Create an Account</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20 text-lg"
              >
                <Link href="/report">Report Anonymously</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary text-primary">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Impact, Real Change</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how citizens like you have used Nyay Doot to fight corruption and bring about justice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Success story"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">Resolved</Badge>
                <h3 className="text-xl font-semibold mb-2">Traffic Police Bribery Exposed</h3>
                <p className="text-muted-foreground mb-4">
                  A citizen's video evidence led to the suspension of a corrupt traffic officer who was demanding bribes
                  in Mumbai.
                </p>
                <Link href="/success-stories/1" className="text-primary font-medium hover:underline">
                  Read full story →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Success story"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">Resolved</Badge>
                <h3 className="text-xl font-semibold mb-2">Government Office Corruption Halted</h3>
                <p className="text-muted-foreground mb-4">
                  Multiple reports on our platform exposed systematic corruption in a local government office, leading
                  to an official investigation.
                </p>
                <Link href="/success-stories/2" className="text-primary font-medium hover:underline">
                  Read full story →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Success story"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>
                <h3 className="text-xl font-semibold mb-2">Community Rallies Against Land Grabbing</h3>
                <p className="text-muted-foreground mb-4">
                  A village community used our platform to document and fight against illegal land acquisition, gaining
                  legal support through our network.
                </p>
                <Link href="/success-stories/3" className="text-primary font-medium hover:underline">
                  Read full story →
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/success-stories">
                View All Success Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Nyay Doot</h3>
              <p className="text-gray-400">Empowering citizens against corruption through technology and community.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/report" className="text-gray-400 hover:text-white">
                    Report Incident
                  </Link>
                </li>
                <li>
                  <Link href="/public-board" className="text-gray-400 hover:text-white">
                    Public Board
                  </Link>
                </li>
                <li>
                  <Link href="/lawyers" className="text-gray-400 hover:text-white">
                    Find a Lawyer
                  </Link>
                </li>
                <li>
                  <Link href="/knowledge-base" className="text-gray-400 hover:text-white">
                    Knowledge Base
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-gray-400 hover:text-white">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <p className="text-gray-400 mb-2">Have questions or feedback? Reach out to us.</p>
              <Link href="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Nyay Doot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

