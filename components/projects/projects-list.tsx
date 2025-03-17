"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"

interface Project {
  id: string
  name: string
  description: string
  progress: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "onHold" | "planning"
  team: {
    name: string
    avatar?: string
  }[]
}

export function ProjectsList() {
  const { user } = useUser()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Symulacja ładowania danych projektów
    const loadProjects = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setProjects([
          {
            id: "1",
            name: "Redesign strony internetowej",
            description: "Kompleksowy redesign strony internetowej firmy z uwzględnieniem nowej identyfikacji wizualnej.",
            progress: 75,
            startDate: "2025-01-15",
            endDate: "2025-04-30",
            status: "active",
            team: [
              { name: "Jan Kowalski", avatar: "/placeholder-user.jpg" },
              { name: "Anna Nowak", avatar: "/placeholder-user.jpg" },
              { name: "Piotr Wiśniewski", avatar: "/placeholder-user.jpg" },
            ],
          },
          {
            id: "2",
            name: "System CRM",
            description: "Implementacja nowego systemu CRM dla działu sprzedaży i obsługi klienta.",
            progress: 40,
            startDate: "2025-02-01",
            endDate: "2025-06-30",
            status: "active",
            team: [
              { name: "Michał Lewandowski", avatar: "/placeholder-user.jpg" },
              { name: "Jan Kowalski", avatar: "/placeholder-user.jpg" },
              { name: "Katarzyna Kowalska", avatar: "/placeholder-user.jpg" },
              { name: "Tomasz Nowak", avatar: "/placeholder-user.jpg" },
            ],
          },
          {
            id: "3",
            name: "Aplikacja mobilna",
            description: "Rozwój aplikacji mobilnej dla klientów dostępnej na platformach iOS i Android.",
            progress: 20,
            startDate: "2025-03-01",
            endDate: "2025-08-31",
            status: "planning",
            team: [
              { name: "Anna Nowak", avatar: "/placeholder-user.jpg" },
              { name: "Piotr Wiśniewski", avatar: "/placeholder-user.jpg" },
            ],
          },
          {
            id: "4",
            name: "Integracja API",
            description: "Integracja z zewnętrznymi systemami poprzez API w celu automatyzacji procesów.",
            progress: 90,
            startDate: "2025-01-05",
            endDate: "2025-03-20",
            status: "completed",
            team: [
              { name: "Jan Kowalski", avatar: "/placeholder-user.jpg" },
              { name: "Michał Lewandowski", avatar: "/placeholder-user.jpg" },
            ],
          },
          {
            id: "5",
            name: "Kampania marketingowa",
            description: "Przygotowanie i wdrożenie kampanii marketingowej w mediach społecznościowych.",
            progress: 60,
            startDate: "2025-02-15",
            endDate: "2025-04-15",
            status: "onHold",
            team: [
              { name: "Anna Nowak", avatar: "/placeholder-user.jpg" },
              { name: "Katarzyna Kowalska", avatar: "/placeholder-user.jpg" },
              { name: "Tomasz Nowak", avatar: "/placeholder-user.jpg" },
            ],
          },
        ])
      } catch (error) {
        console.error("Błąd podczas ładowania projektów:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktywny</Badge>
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-500">Zakończony</Badge>
      case "onHold":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Wstrzymany</Badge>
      case "planning":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Planowanie</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="bg-muted/40 h-24" />
            <CardContent className="h-32 bg-muted/20" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">Nie masz jeszcze żadnych projektów.</p>
          </CardContent>
        </Card>
      ) : (
        projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Postęp projektu</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap justify-between gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <Avatar key={index} className="h-6 w-6 border border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-background bg-muted text-xs font-medium">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  )
}
