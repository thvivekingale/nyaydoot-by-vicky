"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, BookOpen, FileText, Scale, Shield, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  {
    id: "rights",
    icon: <Scale className="h-5 w-5" />,
    title: "Know Your Rights",
    description: "Understanding fundamental rights and legal protections",
    articles: [
      {
        id: 1,
        title: "Right to Information (RTI) Guide",
        description: "Learn how to file RTI applications effectively",
      },
      {
        id: 2,
        title: "Constitutional Rights",
        description: "Overview of fundamental rights in India",
      },
    ],
  },
  {
    id: "reporting",
    icon: <Shield className="h-5 w-5" />,
    title: "Reporting Corruption",
    description: "Step-by-step guides for reporting corruption",
    articles: [
      {
        id: 3,
        title: "Documentation Guidelines",
        description: "How to gather and preserve evidence",
      },
      {
        id: 4,
        title: "Whistleblower Protection",
        description: "Understanding your rights as a whistleblower",
      },
    ],
  },
  {
    id: "legal",
    icon: <FileText className="h-5 w-5" />,
    title: "Legal Resources",
    description: "Legal frameworks and procedures",
    articles: [
      {
        id: 5,
        title: "Anti-Corruption Laws",
        description: "Overview of key anti-corruption legislation",
      },
      {
        id: 6,
        title: "Legal Process Guide",
        description: "Understanding the legal process",
      },
    ],
  },
]

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("rights")

  const selectedCategoryData = CATEGORIES.find((cat) => cat.id === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive resources and guides to help you understand your rights and fight corruption effectively.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <Card className="md:col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-4">
                  {CATEGORIES.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.icon}
                      <span className="ml-2">{category.title}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="md:col-span-8 lg:col-span-9">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {selectedCategoryData?.icon}
                  <div>
                    <CardTitle>{selectedCategoryData?.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCategoryData?.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {selectedCategoryData?.articles.map((article) => (
                    <AccordionItem key={article.id} value={article.id.toString()}>
                      <AccordionTrigger>{article.title}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{article.description}</p>
                          <Button asChild>
                            <Link href={`/knowledge-base/article/${article.id}`}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <BookOpen className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium mb-1">Beginner's Guide</h3>
                      <p className="text-sm text-muted-foreground">
                        Start here if you're new to anti-corruption efforts
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium mb-1">Community Guidelines</h3>
                      <p className="text-sm text-muted-foreground">Learn how to engage with our community</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

