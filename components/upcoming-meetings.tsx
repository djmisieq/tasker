import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarPlus, Clock, Users, Video } from "lucide-react"
import Link from "next/link"

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  duration: string
  participants: {
    name: string
    avatar?: string
  }[]
  isOnline: boolean
}

const upcomingMeetings: Meeting[] = [
  {
    id: "1",
    title: "Przegląd sprintu",
    date: "Dzisiaj",
    time: "14:00",
    duration: "1h",
    participants: [
      { name: "Anna Nowak", avatar: "/placeholder-user.jpg" },
      { name: "Tomasz Wiśniewski", avatar: "/placeholder-user.jpg" },
      { name: "Katarzyna Kowalska", avatar: "/placeholder-user.jpg" },
      { name: "Michał Nowakowski", avatar: "/placeholder-user.jpg" },
    ],
    isOnline: true,
  },
  {
    id: "2",
    title: "Planowanie nowych funkcji",
    date: "Jutro",
    time: "10:00",
    duration: "1.5h",
    participants: [
      { name: "Anna Nowak", avatar: "/placeholder-user.jpg" },
      { name: "Tomasz Wiśniewski", avatar: "/placeholder-user.jpg" },
      { name: "Piotr Kowalczyk", avatar: "/placeholder-user.jpg" },
    ],
    isOnline: false,
  },
  {
    id: "3",
    title: "Spotkanie z klientem",
    date: "Piątek",
    time: "11:30",
    duration: "2h",
    participants: [
      { name: "Anna Nowak", avatar: "/placeholder-user.jpg" },
      { name: "Katarzyna Kowalska", avatar: "/placeholder-user.jpg" },
    ],
    isOnline: true,
  },
]

export function UpcomingMeetings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Nadchodzące spotkania</CardTitle>
          <CardDescription>Twoje nadchodzące spotkania na najbliższe dni</CardDescription>
        </div>
        <Button variant="outline" size="icon">
          <CalendarPlus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex items-center space-x-4 rounded-md border p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{meeting.title}</p>
                  <div className="flex items-center">
                    {meeting.isOnline && <Video className="h-3.5 w-3.5 mr-1 text-blue-500" />}
                    <span className="text-xs font-medium">{meeting.time}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>
                    {meeting.date} • {meeting.duration}
                  </span>
                </div>
                <div className="flex items-center mt-1.5">
                  <Users className="h-3 w-3 text-muted-foreground mr-1.5" />
                  <div className="flex -space-x-2">
                    {meeting.participants.slice(0, 3).map((participant, index) => (
                      <Avatar key={index} className="h-5 w-5 border border-background">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback className="text-[10px]">{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {meeting.participants.length > 3 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-background bg-muted text-[10px] font-medium">
                        +{meeting.participants.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-xs justify-center" asChild>
          <Link href="/meetings">Pokaż wszystkie spotkania</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}