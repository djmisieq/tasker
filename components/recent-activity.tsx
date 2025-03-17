import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
  }
  action: string
  target: string
  date: string
  category: "task" | "meeting" | "project" | "comment"
  targetLink?: string
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "Anna Nowak",
      avatar: "/placeholder-user.jpg",
    },
    action: "dodała komentarz do zadania",
    target: "Aktualizacja dokumentacji API",
    date: "15 minut temu",
    category: "comment",
    targetLink: "/tasks/123",
  },
  {
    id: "2",
    user: {
      name: "Tomasz Wiśniewski",
      avatar: "/placeholder-user.jpg",
    },
    action: "zakończył zadanie",
    target: "Implementacja uwierzytelniania OAuth",
    date: "2 godziny temu",
    category: "task",
    targetLink: "/tasks/456",
  },
  {
    id: "3",
    user: {
      name: "Katarzyna Kowalska",
      avatar: "/placeholder-user.jpg",
    },
    action: "zaplanowała spotkanie",
    target: "Przegląd designu aplikacji mobilnej",
    date: "wczoraj, 15:30",
    category: "meeting",
    targetLink: "/meetings/789",
  },
  {
    id: "4",
    user: {
      name: "Michał Nowakowski",
      avatar: "/placeholder-user.jpg",
    },
    action: "utworzył nowy projekt",
    target: "Aplikacja Mobilna 2.0",
    date: "wczoraj, 11:45",
    category: "project",
    targetLink: "/projects/101",
  },
  {
    id: "5",
    user: {
      name: "Piotr Kowalczyk",
      avatar: "/placeholder-user.jpg",
    },
    action: "przypisał zadanie do",
    target: "Joanna Kamińska",
    date: "wczoraj, 10:15",
    category: "task",
    targetLink: "/tasks/202",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ostatnia aktywność</CardTitle>
        <CardDescription>Najnowsze działania w zespole</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-semibold">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}