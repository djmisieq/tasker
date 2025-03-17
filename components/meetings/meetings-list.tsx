"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"

interface MeetingsListProps {
  meetings: any[]
}

export function MeetingsList({ meetings }: MeetingsListProps) {
  const { user } = useUser()
  const [filter, setFilter] = useState<"upcoming" | "completed" | "all">("upcoming")

  const filteredMeetings = meetings.filter((meeting) => {
    // Filter by status
    if (filter !== "all" && meeting.status !== filter) {
      return false
    }

    // Filter meetings for logged in user
    if (user) {
      return meeting.participantIds.includes(user.id)
    }
    return false
  })

  // Sort meetings by date
  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    // Parse dates for comparison
    const dateA = new Date(`${a.date}T${a.startTime}`)
    const dateB = new Date(`${b.date}T${b.startTime}`)
    
    // Sort by date and time
    if (filter === "completed") {
      return dateB.getTime() - dateA.getTime() // Newest first for completed
    } else {
      return dateA.getTime() - dateB.getTime() // Oldest first for upcoming
    }
  })

  // Group meetings by date for better presentation
  const groupedMeetings: Record<string, any[]> = {}
  
  sortedMeetings.forEach((meeting) => {
    // Convert date to more readable format
    const meetingDate = new Date(meeting.date)
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    
    let dateLabel
    
    if (meetingDate.toDateString() === today.toDateString()) {
      dateLabel = "Dzisiaj"
    } else if (meetingDate.toDateString() === tomorrow.toDateString()) {
      dateLabel = "Jutro"
    } else {
      dateLabel = meetingDate.toLocaleDateString("pl-PL", { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      })
    }
    
    if (!groupedMeetings[dateLabel]) {
      groupedMeetings[dateLabel] = []
    }
    
    groupedMeetings[dateLabel].push(meeting)
  })

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <Button 
          variant={filter === "upcoming" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("upcoming")}
        >
          Nadchodzące
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Zakończone
        </Button>
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          Wszystkie
        </Button>
      </div>

      {Object.keys(groupedMeetings).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Brak spotkań spełniających kryteria.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/meetings/new">Utwórz nowe spotkanie</Link>
          </Button>
        </div>
      ) : (
        Object.entries(groupedMeetings).map(([dateLabel, dayMeetings]) => (
          <div key={dateLabel} className="space-y-3">
            <h3 className="font-medium text-muted-foreground">{dateLabel}</h3>
            
            {dayMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href={`/meetings/${meeting.id}`} className="block p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium">{meeting.title}</h4>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{meeting.time}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{meeting.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {meeting.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center my-1">
                          <Users className="h-4 w-4 text-muted-foreground mr-1.5" />
                          <div className="flex -space-x-2">
                            {meeting.participants.slice(0, 3).map((participant: string, index: number) => (
                              <Avatar key={index} className="h-6 w-6 border border-background">
                                <AvatarFallback className="text-xs">
                                  {participant.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {meeting.participants.length > 3 && (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-background bg-muted text-xs font-medium">
                                +{meeting.participants.length - 3}
                              </div>
                            )}
                          </div>
                        </div>

                        {meeting.status === "upcoming" && (
                          <Badge className="mt-2">Nadchodzące</Badge>
                        )}
                        {meeting.status === "completed" && (
                          <Badge variant="outline" className="mt-2">Zakończone</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ))
      )}
    </div>
  )
}
