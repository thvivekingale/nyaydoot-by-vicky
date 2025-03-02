"use client"

import { useEffect, useRef } from "react"

interface Complaint {
  id: number
  title: string
  description: string
  location: string
  date: string
  status: string
  category: string
  upvotes: number
  comments: number
}

interface ComplaintMapProps {
  complaints: Complaint[]
}

export default function ComplaintMap({ complaints }: ComplaintMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, this would use a mapping library like Mapbox, Google Maps, or Leaflet
    // For this demo, we'll create a simple visualization

    if (!mapRef.current) return

    const mapContainer = mapRef.current
    mapContainer.innerHTML = ""

    // Create a simple map background
    const mapBackground = document.createElement("div")
    mapBackground.className = "absolute inset-0 bg-gray-100 dark:bg-gray-800"
    mapBackground.style.backgroundImage = "url('/placeholder.svg?height=600&width=1200')"
    mapBackground.style.backgroundSize = "cover"
    mapBackground.style.opacity = "0.5"
    mapContainer.appendChild(mapBackground)

    // Add complaint markers
    complaints.forEach((complaint, index) => {
      // Generate random positions for demo purposes
      // In a real app, these would be actual geo-coordinates
      const left = 10 + Math.random() * 80
      const top = 10 + Math.random() * 80

      const marker = document.createElement("div")
      marker.className = "absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
      marker.style.left = `${left}%`
      marker.style.top = `${top}%`

      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "resolved":
            return "bg-green-500"
          case "under investigation":
            return "bg-blue-500"
          case "pending":
            return "bg-yellow-500"
          default:
            return "bg-gray-500"
        }
      }

      marker.innerHTML = `
        <div class="group">
          <div class="flex flex-col items-center">
            <div class="w-6 h-6 rounded-full ${getStatusColor(complaint.status)} text-white flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="hidden group-hover:block absolute bottom-full mb-2 w-64 p-2 bg-white dark:bg-gray-900 rounded-md shadow-lg z-20 transition-opacity duration-200">
              <div class="text-sm font-medium">${complaint.title}</div>
              <div class="text-xs text-muted-foreground mt-1">${complaint.location}</div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs px-2 py-0.5 rounded-full ${getStatusColor(complaint.status)} text-white">${complaint.status}</span>
                <span class="text-xs text-muted-foreground">${new Date(complaint.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      `

      mapContainer.appendChild(marker)
    })

    // Add a legend
    const legend = document.createElement("div")
    legend.className = "absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-3 rounded-md shadow-md z-20"
    legend.innerHTML = `
      <div class="text-sm font-medium mb-2">Status Legend</div>
      <div class="space-y-2">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span class="text-xs">Resolved</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span class="text-xs">Under Investigation</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span class="text-xs">Pending</span>
        </div>
      </div>
    `
    mapContainer.appendChild(legend)
  }, [complaints])

  return (
    <div ref={mapRef} className="relative w-full h-full">
      {/* Map will be rendered here */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  )
}

