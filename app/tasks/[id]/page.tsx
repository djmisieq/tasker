"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Edit, AlertTriangle, CalendarClock } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { NoAccess } from "@/components/no-access"

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  const { user } = useUser()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [task, setTask] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Symulacja ładowania danych zadania
    const loadTask = async () => {
      // W rzeczywistej aplikacji, pobieralibyśmy dane z API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const taskData = {
        id: params.id,
        title: "Przygotować prezentację projektu",
        description: "Przygotować prezentację dla klienta na temat postępów projektu",
        priority: "high",
        assignee: "Jan Kowalski",
        assigneeId: "user-1",
        dueDate: "2025-03-19",
        status: "todo",
        project: "Redesign strony",
        createdAt: "2025-03-10T10:00:00",
        updatedAt: "2025-03-15T14:30:00",
        comments: [
          {
            id: 1,
            content: "Dodałem szablon prezentacji w folderze projektu.",
            author: "Anna Nowak",
            createdAt: "2025-03-12T11:20:00",
          },
          {
            id: 2,
            content: "Potrzebuję danych z ostatniego sprintu, aby uzupełnić prezentację.",
            author: "Jan Kowalski",
            createdAt: "2025-03-14T09:45:00",
          },
        ],
        // Informacje o spotkaniu źródłowym (jeśli zadanie zostało utworzone podczas spotkania)
        sourceMeeting: {
          id: 1,
          title: "Spotkanie projektowe",
          date: "2025-03-18",
          createdAt: "2025-03-18T11:30:00",
        },
      }

      setTask(taskData)

      // Sprawdzamy, czy użytkownik ma dostęp do zadania
      if (user) {
        // W tym przypadku, tylko przypisany użytkownik ma dostęp
        const userHasAccess = taskData.assigneeId === user.id
        setHasAccess(userHasAccess)
      } else {
        setHasAccess(false)
      }

      setIsLoading(false)
    }

    if (user || user === null) {
      loadTask()
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
    return <NoAccess type="task" backUrl="/tasks" />
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Wysoki"
      case "medium":
        return "Średni"
      case "low":
        return "Niski"
      default:
        return priority
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo":
        return "Do zrobienia"
      case "in_progress":
        return "W trakcie"
      case "done":
        return "Zrobione"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/tasks" className="text-sm text-muted-foreground hover:underline">
            &larr; Powrót do zadań
          </Link>
          <h1 className="text-3xl font-bold">{task.title}</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/tasks/${task.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edytuj
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Szczegóły zadania</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Opis</div>
                <p>{task.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Priorytet</div>
                  <div>
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Status</div>
                  <div>
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Termin</div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {new Date(task.dueDate).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {task.project && (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Projekt</div>
                  <div>
                    <Badge variant="secondary">{task.project}</Badge>
                  </div>
                </div>
              )}

              {/* Informacja o spotkaniu źródłowym */}
              {task.sourceMeeting && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-900/30">
                  <div className="flex items-start gap-2">
                    <CalendarClock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                        To zadanie zostało utworzone podczas spotkania:
                      </p>
                      <Link
                        href={`/meetings/${task.sourceMeeting.id}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        {task.sourceMeeting.title}
                      </Link>
                      <p className="text-xs text-blue-600 dark:text-blue-500">
                        {new Date(task.sourceMeeting.date).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-500">
                        Utworzono: {new Date(task.sourceMeeting.createdAt).toLocaleString("pl-PL")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Komentarze</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {task.comments.map((comment: any) => (
                <div key={comment.id} className="flex space-x-4 p-3 rounded-lg border">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {comment.author
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{comment.author}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString("pl-PL")}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name} />
                  <AvatarFallback>{user?.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Dodaj komentarz..."
                    rows={2}
                  ></textarea>
                </div>
                <Button size="sm">Dodaj</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Przypisane do</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={task.assignee} />
                  <AvatarFallback>
                    {task.assignee
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">{task.assignee}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktywność</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-2">
                <div className="flex items-start space-x-2">
                  <Clock className="h-3 w-3 mt-0.5" />
                  <div>
                    <p>Utworzono {new Date(task.createdAt).toLocaleDateString("pl-PL")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-3 w-3 mt-0.5" />
                  <div>
                    <p>Ostatnia aktualizacja {new Date(task.updatedAt).toLocaleDateString("pl-PL")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {new Date(task.dueDate) < new Date() && task.status !== "done" && (
            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Termin minął</p>
                    <p className="text-sm">To zadanie jest opóźnione.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}