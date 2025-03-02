"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  AlertTriangle,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  Users,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import ComplaintMap from "@/components/complaint-map"

// Mock data for complaints
const COMPLAINTS = [
  {
    id: 1,
    title: "Traffic Police Demanding Bribe at Checkpoint",
    description: "Officer demanded ₹500 to let me pass through a checkpoint without any violation.",
    location: "Mumbai, Maharashtra",
    date: "2023-12-15",
    status: "Under Investigation",
    category: "Bribery",
    upvotes: 124,
    comments: 32,
    user: "Anonymous",
    evidence: true,
  },
  {
    id: 2,
    title: "Municipal Officer Asking for Money to Approve Building Plans",
    description:
      "Was asked to pay ₹10,000 as 'processing fee' to get building plans approved, despite all documents being in order.",
    location: "Delhi, NCR",
    date: "2023-11-28",
    status: "Resolved",
    category: "Corruption",
    upvotes: 89,
    comments: 17,
    user: "RajeshK",
    evidence: true,
  },
  {
    id: 3,
    title: "Police Refusing to File FIR in Theft Case",
    description: "Local police station refused to file an FIR for a theft at my shop unless I paid them.",
    location: "Bangalore, Karnataka",
    date: "2024-01-05",
    status: "Pending",
    category: "Police Misconduct",
    upvotes: 56,
    comments: 8,
    user: "Anonymous",
    evidence: false,
  },
  {
    id: 4,
    title: "Government Hospital Doctor Demanding Money for Treatment",
    description: "Doctor at government hospital refused to treat my father unless we paid ₹2,000 directly to him.",
    location: "Chennai, Tamil Nadu",
    date: "2023-12-30",
    status: "Under Investigation",
    category: "Healthcare Corruption",
    upvotes: 143,
    comments: 41,
    user: "PriyaS",
    evidence: true,
  },
  {
    id: 5,
    title: "School Principal Demanding Donation for Admission",
    description: "Principal asked for ₹25,000 'donation' for admitting my child to the school despite RTE quota.",
    location: "Pune, Maharashtra",
    date: "2024-01-10",
    status: "Pending",
    category: "Education Corruption",
    upvotes: 78,
    comments: 23,
    user: "AmarjeetSingh",
    evidence: true,
  },
  {
    id: 6,
    title: "Ration Shop Owner Selling Subsidized Goods at Market Price",
    description: "Local ration shop owner is selling subsidized grains at market price and pocketing the difference.",
    location: "Lucknow, Uttar Pradesh",
    date: "2023-12-05",
    status: "Under Investigation",
    category: "Public Distribution Fraud",
    upvotes: 112,
    comments: 29,
    user: "Anonymous",
    evidence: true,
  },
]

export default function PublicBoardPage() {
  const [view, setView] = useState("list")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const filteredComplaints = COMPLAINTS.filter((complaint) => {
    if (filter !== "all" && complaint.status.toLowerCase() !== filter.toLowerCase()) {
      return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        complaint.title.toLowerCase().includes(query) ||
        complaint.description.toLowerCase().includes(query) ||
        complaint.location.toLowerCase().includes(query) ||
        complaint.category.toLowerCase().includes(query)
      )
    }

    return true
  })

  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "popular") {
      return b.upvotes - a.upvotes
    } else if (sortBy === "comments") {
      return b.comments - a.comments
    }
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "under investigation":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Public Complaints Board</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            View anonymized reports of corruption and misconduct submitted by citizens across India. Your support can
            help bring these issues to light.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search complaints..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under investigation">Under Investigation</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Upvoted</SelectItem>
                      <SelectItem value="comments">Most Commented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted p-2 rounded-md text-center">
                      <FileText className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Total Reports</p>
                      <p className="font-bold">{COMPLAINTS.length}</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Contributors</p>
                      <p className="font-bold">42</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <BarChart3 className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-xs text-muted-foreground">Resolved</p>
                      <p className="font-bold">18</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <AlertTriangle className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="font-bold">24</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/report">Submit New Report</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="list" className="mb-6" onValueChange={(value) => setView(value)}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  Showing {sortedComplaints.length} of {COMPLAINTS.length} reports
                </div>
              </div>

              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {sortedComplaints.map((complaint) => (
                    <motion.div
                      key={complaint.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <Badge className="mb-2" variant="outline">
                                {complaint.category}
                              </Badge>
                              <CardTitle className="text-xl">
                                <Link
                                  href={`/complaint/${complaint.id}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {complaint.title}
                                </Link>
                              </CardTitle>
                            </div>
                            <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{complaint.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {complaint.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(complaint.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Avatar className="h-4 w-4 mr-1">
                                <AvatarFallback className="text-[8px]">
                                  {complaint.user === "Anonymous" ? "A" : complaint.user[0]}
                                </AvatarFallback>
                              </Avatar>
                              {complaint.user}
                            </div>
                            {complaint.evidence && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
                                Evidence Attached
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-between">
                          <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{complaint.upvotes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{complaint.comments}</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="h-[600px] w-full">
                      <ComplaintMap complaints={sortedComplaints} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button variant="outline">
                Load More
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

