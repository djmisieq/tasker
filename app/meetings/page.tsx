"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, List, Calendar } from "lucide-react"
import { MeetingsList } from "@/components/meetings/meetings-list"
import { CalendarView } from "@/components/meetings/calendar-view"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/contexts/user-context"

export default function MeetingsPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [meetings, setMeetings] = useState<any[]>([])
  const { user } = useUser()

  useEffect(() => {
    // Symulacja ładowania danych spotkań
    const loadMeetings = async () => {
      // W rzeczywistej aplikacji, pobieralibyśmy dane z API
      await new Promise((resolve) => setTimeout(resolve, 300))

      setMeetings([
        {
          id: 1,
          title: "Spotkanie projektowe",
          date: "2025-03-18",
          time: "10:00 - 11:30",
          startTime: "10:00",
          endTime: "11:30",
          status: "upcoming",
          participants: ["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski"],
          participantIds: ["user-1", "user-2", "user-3"],
          location: "Sala konferencyjna A",
          agenda: "Omówienie postępów projektu, planowanie kolejnych kroków",
          tags: ["projekt", "planowanie"],
        },
        {
          id: 2,
          title: "Przegląd sprintu",
          date: "2025-03-19",
          time: "14:00 - 15:00",
          startTime: "14:00",
          endTime: "15:00",
          status: "upcoming",
          participants: ["Jan Kowalski", "Michał Lewandowski"],
          participantIds: ["user-1", "user-4"],
          location: "Online (Zoom)",
          agenda: "Przegląd zadań wykonanych w bieżącym sprincie",
          tags: ["sprint", "przegląd"],
        },
        {
          id: 3,
          title: "Planowanie kwartalne",
          date: "2025-03-20",
          time: "11:00 - 13:00",
          startTime: "11:00",
          endTime: "13:00",
          status: "upcoming",
          participants: ["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Michał Lewandowski"],
          participantIds: ["user-1", "user-2", "user-3", "user-4"],
          location: "Sala konferencyjna B",
          agenda: "Planowanie działań na kolejny kwartał",
          tags: ["planowanie", "kwartał"],
        },
        {
          id: 4,
          title: "Spotkanie z klientem",
          date: "2025-03-15",
          time: "09:00 - 10:00",
          startTime: "09:00",
          endTime: "10:00",
          status: "completed",
          participants: ["Jan Kowalski", "Anna Nowak", "Klient"],
          participantIds: ["user-1", "user-2", "user-5"],
          location: "Online (Teams)",
          agenda: "Prezentacja postępów projektu, zebranie feedbacku",
          tags: ["klient", "prezentacja"],
        },
        {
          id: 5,
          title: "Retrospektywa sprintu",
          date: "2025-03-12",
          time: "15:00 - 16:00",
          startTime: "15:00",
          endTime: "16:00",
          status: "completed",
          participants: ["Anna Nowak", "Piotr Wiśniewski", "Michał Lewandowski"],
          participantIds: ["user-2", "user-3", "user-4"],
          location: "Sala konferencyjna A",
          agenda: "Omówienie co poszło dobrze, co można poprawić",
          tags: ["sprint", "retrospektywa"],
        },
        {
          id: 6,
          title: "Spotkanie zespołu",
          date: new Date().toISOString().split("T")[0],
          time: "10:00 - 11:00",
          startTime: "10:00",
          endTime: "11:00",
          status: "upcoming",
          participants: ["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Michał Lewandowski"],
          participantIds: ["user-1", "user-2", "user-3", "user-4"],
          location: "Sala konferencyjna A",
          agenda: "Cotygodniowe spotkanie zespołu",
          tags: ["zespół", "cotygodniowe"],
        },
        {
          id: 7,
          title: "Szkolenie z nowych technologii",
          date: new Date().toISOString().split("T")[0],
          time: "14:00 - 16:00",
          startTime: "14:00",
          endTime: "16:00",
          status: "upcoming",
          participants: ["Jan Kowalski", "Piotr Wiśniewski"],
          participantIds: ["user-1", "user-3"],
          location: "Sala szkoleniowa",
          agenda: "Szkolenie z nowych technologii",
          tags: ["szkolenie", "technologie"],
        },
      ])
    }

    loadMeetings()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spotkania</h1>
        <Button asChild>
          <Link href="/meetings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nowe spotkanie
          </Link>
        </Button>
      </div>

      <div className="flex justify-center mb-4">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "calendar")}>
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Kalendarz
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "list" ? <MeetingsList meetings={meetings} /> : <CalendarView meetings={meetings} />}
    </div>
  )
}