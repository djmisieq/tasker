"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Edit, ListTodo, Plus, CalendarClock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ProjectTasks } from "@/components/projects/project-tasks"
import { ProjectMilestones } from "@/components/projects/project-milestones"
import { ProjectMeetings } from "@/components/projects/project-meetings"
import { GanttChart } from "@/components/projects/gantt-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/contexts/user-context"
import { NoAccess } from "@/components/no-access"

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const { user } = useUser()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Symulacja ładowania danych projektu
    const loadProject = async () => {
      // W rzeczywistej aplikacji, pobieralibyśmy dane z API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const projectData = {
        id: Number.parseInt(params.id),
        name: "Redesign strony",
        description: "Odświeżenie wyglądu i funkcjonalności strony internetowej",
        status: "in_progress",
        startDate: "2025-02-15",
        endDate: "2025-04-30",
        team: [
          {
            id: "user-1",
            name: "Jan Kowalski",
            role: "Project Manager",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "JK",
          },
          {
            id: "user-2",
            name: "Anna Nowak",
            role: "UI/UX Designer",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "AN",
          },
          {
            id: "user-3",
            name: "Piotr Wiśniewski",
            role: "Frontend Developer",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "PW",
          },
        ],
        progress: 45,
        tasksCompleted: 9,
        totalTasks: 20,
        // Informacje o spotkaniu źródłowym (jeśli projekt został utworzony podczas spotkania)
        sourceMeeting: {
          id: 1,
          title: "Spotkanie projektowe",
          date: "2025-03-18",
          createdAt: "2025-03-18T12:00:00",
        },
      }

      setProject(projectData)

      // Sprawdzamy, czy użytkownik ma dostęp do projektu
      if (user) {
        const userHasAccess = projectData.team.some((member: any) => member.id === user.id)
        setHasAccess(userHasAccess)
      } else {
        setHasAccess(false)
      }

      setIsLoading(false)
    }

    if (user || user === null) {
      loadProject()
    }
  }, [params.id, user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return <NoAccess type="project" backUrl="/projects" />
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planning":
        return "Planowanie"
      case "in_progress":
        return "W trakcie"
      case "completed":
        return "Zakończony"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/projects" className="text-sm text-muted-foreground hover:underline">
            &larr; Powrót do projektów
          </Link>
          <h1 className="text-3xl font-bold">{project.name}</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/projects/${project.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edytuj
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="gantt">Wykres Gantta</TabsTrigger>
          <TabsTrigger value="tasks">Zadania</TabsTrigger>
          <TabsTrigger value="milestones">Kamienie milowe</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Szczegóły projektu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Opis</div>
                    <p>{project.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Data rozpoczęcia</div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {new Date(project.startDate).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Data zakończenia</div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {new Date(project.endDate).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Postęp</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {project.tasksCompleted} z {project.totalTasks} zadań ukończonych
                    </div>
                  </div>

                  {/* Informacja o spotkaniu źródłowym */}
                  {project.sourceMeeting && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-900/30">
                      <div className="flex items-start gap-2">
                        <CalendarClock className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                            Ten projekt został utworzony podczas spotkania:
                          </p>
                          <Link
                            href={`/meetings/${project.sourceMeeting.id}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                          >
                            {project.sourceMeeting.title}
                          </Link>
                          <p className="text-xs text-blue-600 dark:text-blue-500">
                            {new Date(project.sourceMeeting.date).toLocaleDateString("pl-PL", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-500">
                            Utworzono: {new Date(project.sourceMeeting.createdAt).toLocaleString("pl-PL")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <ProjectMilestones projectId={project.id} />

              <ProjectTasks projectId={project.id} />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Zespół projektowy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3">
                    {project.team.map((member: any) => (
                      <div key={member.name} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Dodaj członka zespołu
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Akcje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/projects/${project.id}/milestones/new`}>
                      <Plus className="mr-2 h-4 w-4" />
                      Dodaj kamień milowy
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/tasks/new?project=${project.id}`}>
                      <ListTodo className="mr-2 h-4 w-4" />
                      Dodaj zadanie
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/meetings/new?project=${project.id}`}>
                      <Clock className="mr-2 h-4 w-4" />
                      Zaplanuj spotkanie
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <ProjectMeetings projectId={project.id} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gantt" className="mt-6">
          <GanttChart projectId={params.id} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <ProjectTasks projectId={project.id} />
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <ProjectMilestones projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}