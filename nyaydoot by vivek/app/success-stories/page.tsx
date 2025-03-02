"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import Image from "next/image"
import { MapPin } from "lucide-react" // Import MapPin

const SUCCESS_STORIES = [
  {
    id: 1,
    title: "Corruption Exposed in Municipal Office",
    category: "Administrative",
    location: "Mumbai, Maharashtra",
    date: "January 15, 2025",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A group of citizens successfully exposed a corruption ring in their local municipal office, leading to the suspension of corrupt officials and implementation of transparent processes.",
    impact: "₹1.2 Crore saved in public funds",
    upvotes: 234,
    comments: 45,
  },
  {
    id: 2,
    title: "Justice Served in Police Harassment Case",
    category: "Law Enforcement",
    location: "Delhi, NCR",
    date: "December 28, 2024",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Through proper documentation and community support, a victim of police harassment successfully got justice, resulting in departmental action against the accused officers.",
    impact: "Policy changes implemented",
    upvotes: 189,
    comments: 32,
  },
  {
    id: 3,
    title: "Education Scam Uncovered",
    category: "Education",
    location: "Bangalore, Karnataka",
    date: "February 1, 2025",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Parents and students exposed an admission scam in private schools, leading to regulatory reforms and fair admission processes.",
    impact: "Benefited 500+ students",
    upvotes: 156,
    comments: 28,
  },
]

const CATEGORIES = ["All", "Administrative", "Law Enforcement", "Education", "Healthcare", "Public Services"]

export default function SuccessStoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [view, setView] = useState<"grid" | "list">("grid")

  const filteredStories = SUCCESS_STORIES.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories of citizens making a difference. These cases demonstrate the power of collective action and
            transparency in fighting corruption.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search success stories..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className={`grid gap-6 ${view === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>{story.category}</Badge>
                    <span className="text-sm text-muted-foreground">{story.date}</span>
                  </div>
                  <CardTitle className="mb-3">{story.title}</CardTitle>
                  <p className="text-muted-foreground mb-4">{story.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
                    <MapPin className="h-4 w-4" />
                    {story.location}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium">Impact</p>
                    <p className="text-primary">{story.impact}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {story.upvotes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {story.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

