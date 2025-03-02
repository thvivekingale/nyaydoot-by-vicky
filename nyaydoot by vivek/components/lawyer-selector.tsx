"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for lawyers
const LAWYERS = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    specialization: "Anti-Corruption",
    experience: "12 years",
    rating: 4.8,
    reviews: 124,
    fee: "₹2,000",
    image: "/placeholder.svg?height=100&width=100",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    id: 2,
    name: "Adv. Rajesh Kumar",
    specialization: "Criminal Law",
    experience: "15 years",
    rating: 4.9,
    reviews: 156,
    fee: "₹2,500",
    image: "/placeholder.svg?height=100&width=100",
    availability: ["Mon", "Wed", "Fri"],
  },
  {
    id: 3,
    name: "Adv. Ananya Patel",
    specialization: "Public Interest Litigation",
    experience: "8 years",
    rating: 4.7,
    reviews: 98,
    fee: "₹1,800",
    image: "/placeholder.svg?height=100&width=100",
    availability: ["Tue", "Thu", "Sat"],
  },
]

export default function LawyerSelector() {
  const { toast } = useToast()
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null)
  const [specialization, setSpecialization] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const filteredLawyers =
    specialization === "all"
      ? LAWYERS
      : LAWYERS.filter((lawyer) => lawyer.specialization.toLowerCase().includes(specialization.toLowerCase()))

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(filteredLawyers.length - 1, prev + 1))
  }

  const handleBookConsultation = () => {
    toast({
      title: "Consultation Booked",
      description: `Your consultation with ${LAWYERS.find((l) => l.id === selectedLawyer)?.name} has been scheduled for ${selectedDate} at ${selectedTime}.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-medium">Select a Lawyer</h3>
          <p className="text-sm text-muted-foreground">Choose a legal expert to help with your case</p>
        </div>
        <Select value={specialization} onValueChange={setSpecialization}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="anti-corruption">Anti-Corruption</SelectItem>
            <SelectItem value="criminal">Criminal Law</SelectItem>
            <SelectItem value="public">Public Interest</SelectItem>
            <SelectItem value="civil">Civil Rights</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredLawyers.map((lawyer) => (
              <div key={lawyer.id} className="w-full flex-shrink-0 px-1">
                <Card
                  className={`cursor-pointer transition-all ${selectedLawyer === lawyer.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedLawyer(lawyer.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src={lawyer.image} alt={lawyer.name} />
                        <AvatarFallback>
                          {lawyer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{lawyer.name}</h4>
                            <p className="text-sm text-muted-foreground">{lawyer.specialization}</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {lawyer.fee}/hr
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center text-sm">
                          <div className="flex items-center text-yellow-500 mr-2">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1">{lawyer.rating}</span>
                          </div>
                          <span className="text-muted-foreground">({lawyer.reviews} reviews)</span>
                          <span className="mx-2">•</span>
                          <span className="text-muted-foreground">{lawyer.experience}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {lawyer.availability.map((day) => (
                            <Badge key={day} variant="outline" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {filteredLawyers.length > 1 && (
          <div className="flex justify-between mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= filteredLawyers.length - 1}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {selectedLawyer && (
        <div className="mt-4 p-4 border rounded-md">
          <h4 className="font-medium mb-2">Schedule a Consultation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Select Date</label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-03-05">March 5, 2024</SelectItem>
                    <SelectItem value="2024-03-06">March 6, 2024</SelectItem>
                    <SelectItem value="2024-03-07">March 7, 2024</SelectItem>
                    <SelectItem value="2024-03-08">March 8, 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Select Time</label>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button className="w-full" disabled={!selectedDate || !selectedTime} onClick={handleBookConsultation}>
            Book Consultation
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            A 10% platform fee will be added to the lawyer's hourly rate
          </p>
        </div>
      )}
    </div>
  )
}

