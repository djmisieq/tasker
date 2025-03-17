"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"

interface CalendarViewProps {
  meetings: any[]
}

export function CalendarView({ meetings }: CalendarViewProps) {
  const { user } = useUser()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<"month" | "week">("month")

  const filteredMeetings = meetings.filter((meeting) => {
    // Filter meetings for logged in user
    if (user) {
      return meeting.participantIds.includes(user.id)
    }
    return false
  })

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Navigation functions
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week of first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Format date to check against meetings
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  // Get meetings for a specific day
  const getMeetingsForDay = (year: number, month: number, day: number) => {
    const dateString = formatDate(year, month, day)
    return filteredMeetings.filter(meeting => meeting.date === dateString)
  }

  // Month names
  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", 
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ]

  // Day names
  const dayNames = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Calendar grid
  const calendar = []
  let day = 1

  // Create weeks
  for (let i = 0; i < 6; i++) {
    const week = []
    
    // Create days
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        // Empty cells before first day
        week.push(null)
      } else if (day > daysInMonth) {
        // Empty cells after last day
        week.push(null)
      } else {
        // Regular day cell
        const dailyMeetings = getMeetingsForDay(currentYear, currentMonth, day)
        week.push({
          day,
          meetings: dailyMeetings
        })
        day++
      }
    }
    
    if (week.some(day => day !== null)) {
      calendar.push(week)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Dzisiaj
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((name, index) => (
          <div key={index} className="text-center font-medium text-sm py-2">
            {name.substring(0, 3)}
          </div>
        ))}

        {/* Calendar cells */}
        {calendar.flat().map((day, index) => (
          <div
            key={index}
            className={`border rounded-md min-h-[100px] p-1 ${
              day === null
                ? "bg-gray-50 dark:bg-gray-900/20"
                : "hover:bg-gray-50 dark:hover:bg-gray-900/40"
            }`}
          >
            {day !== null && (
              <>
                <div className={`text-right p-1 font-medium ${
                  new Date().getDate() === day.day &&
                  new Date().getMonth() === currentMonth &&
                  new Date().getFullYear() === currentYear
                    ? "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center ml-auto"
                    : ""
                }`}>
                  {day.day}
                </div>
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
                  {day.meetings.map((meeting: any) => (
                    <Link
                      key={meeting.id}
                      href={`/meetings/${meeting.id}`}
                      className="block text-xs bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 p-1 rounded truncate"
                    >
                      {meeting.time.split(" - ")[0]} {meeting.title}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
