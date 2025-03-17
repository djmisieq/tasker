"use client"

import { useState } from "react"
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { KanbanColumn } from "@/components/tasks/kanban-column"
import { KanbanItem } from "@/components/tasks/kanban-item"
import { TaskDetails } from "@/components/tasks/task-details"
import { Button } from "@/components/ui/button"
import { PlusCircle, Filter, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/contexts/user-context"
import Link from "next/link"

export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignee: string
  assigneeId: string
  dueDate: string
  status: "todo" | "in_progress" | "done"
  project?: string
}

export function KanbanBoard() {
  const { user } = useUser()

  const allTasks: Task[] = [
    {
      id: "1",
      title: "Przygotować prezentację projektu",
      description: "Przygotować prezentację dla klienta na temat postępów projektu",
      priority: "high",
      assignee: "Jan Kowalski",
      assigneeId: "user-1",
      dueDate: "2025-03-19",
      status: "todo",
      project: "Redesign strony",
    },
    {
      id: "2",
      title: "Zaktualizować dokumentację API",
      description: "Zaktualizować dokumentację API zgodnie z najnowszymi zmianami",
      priority: "medium",
      assignee: "Anna Nowak",
      assigneeId: "user-2",
      dueDate: "2025-03-20",
      status: "todo",
      project: "Backend API",
    },
    {
      id: "3",
      title: "Naprawić błędy w formularzu kontaktowym",
      description: "Formularz kontaktowy nie wysyła wiadomości - znaleźć i naprawić błąd",
      priority: "high",
      assignee: "Piotr Wiśniewski",
      assigneeId: "user-3",
      dueDate: "2025-03-18",
      status: "in_progress",
      project: "Redesign strony",
    },
    {
      id: "4",
      title: "Zoptymalizować zapytania do bazy danych",
      description: "Zoptymalizować zapytania do bazy danych, aby przyspieszyć ładowanie strony",
      priority: "medium",
      assignee: "Michał Lewandowski",
      assigneeId: "user-4",
      dueDate: "2025-03-22",
      status: "in_progress",
    },
    {
      id: "5",
      title: "Dodać testy jednostkowe",
      description: "Dodać testy jednostkowe dla nowych funkcji",
      priority: "low",
      assignee: "Anna Nowak",
      assigneeId: "user-2",
      dueDate: "2025-03-25",
      status: "todo",
    },
    {
      id: "6",
      title: "Zaktualizować zależności",
      description: "Zaktualizować zależności do najnowszych wersji",
      priority: "low",
      assignee: "Jan Kowalski",
      assigneeId: "user-1",
      dueDate: "2025-03-15",
      status: "done",
    },
    {
      id: "7",
      title: "Wdrożyć nowy system logowania",
      description: "Wdrożyć nowy system logowania z uwierzytelnianiem dwuskładnikowym",
      priority: "high",
      assignee: "Michał Lewandowski",
      assigneeId: "user-4",
      dueDate: "2025-03-10",
      status: "done",
      project: "Backend API",
    },
  ]

  // Filtrowanie zadań przypisanych do zalogowanego użytkownika
  const tasks = allTasks.filter((task) => (user ? task.assigneeId === user.id : false))

  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filterPriority, setFilterPriority] = useState<string[]>([])
  const [filterAssignee, setFilterAssignee] = useState<string[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const columns = [
    { id: "todo", title: "Do zrobienia" },
    { id: "in_progress", title: "W trakcie" },
    { id: "done", title: "Zrobione" },
  ]

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const activeTask = tasks.find((task) => task.id === active.id)
      if (!activeTask) return

      // Jeśli przeciągamy na inną kolumnę
      if (over.id.startsWith("column-")) {
        const newStatus = over.id.replace("column-", "") as "todo" | "in_progress" | "done"
        setTasks(tasks.map((task) => (task.id === active.id ? { ...task, status: newStatus } : task)))
      } else {
        // Jeśli przeciągamy na inne zadanie (zmiana kolejności)
        const oldIndex = tasks.findIndex((task) => task.id === active.id)
        const newIndex = tasks.findIndex((task) => task.id === over.id)
        setTasks(arrayMove(tasks, oldIndex, newIndex))
      }
    }

    setActiveId(null)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setSelectedTask(null)
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setSelectedTask(null)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filterPriority.length > 0 && !filterPriority.includes(task.priority)) {
      return false
    }
    if (filterAssignee.length > 0 && !filterAssignee.includes(task.assignee)) {
      return false
    }
    return true
  })

  const uniqueAssignees = Array.from(new Set(tasks.map((task) => task.assignee)))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filtry
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Priorytet</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterPriority.includes("high")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterPriority([...filterPriority, "high"])
                  } else {
                    setFilterPriority(filterPriority.filter((p) => p !== "high"))
                  }
                }}
              >
                Wysoki
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterPriority.includes("medium")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterPriority([...filterPriority, "medium"])
                  } else {
                    setFilterPriority(filterPriority.filter((p) => p !== "medium"))
                  }
                }}
              >
                Średni
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterPriority.includes("low")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterPriority([...filterPriority, "low"])
                  } else {
                    setFilterPriority(filterPriority.filter((p) => p !== "low"))
                  }
                }}
              >
                Niski
              </DropdownMenuCheckboxItem>

              {uniqueAssignees.length > 1 && (
                <>
                  <DropdownMenuLabel className="mt-2">Przypisane do</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {uniqueAssignees.map((assignee) => (
                    <DropdownMenuCheckboxItem
                      key={assignee}
                      checked={filterAssignee.includes(assignee)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterAssignee([...filterAssignee, assignee])
                        } else {
                          setFilterAssignee(filterAssignee.filter((a) => a !== assignee))
                        }
                      }}
                    >
                      {assignee}
                    </DropdownMenuCheckboxItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {(filterPriority.length > 0 || filterAssignee.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterPriority([])
                setFilterAssignee([])
              }}
            >
              Wyczyść filtry
            </Button>
          )}
        </div>

        <Button size="sm" className="gap-1" asChild>
          <Link href="/tasks/new">
            <PlusCircle className="h-4 w-4" />
            Nowe zadanie
          </Link>
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nie masz przypisanych żadnych zadań.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/tasks/new">Utwórz nowe zadanie</Link>
          </Button>
        </div>
      ) : (
        <div className="h-[calc(100vh-12rem)]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
              {columns.map((column) => {
                const columnTasks = filteredTasks.filter((task) => task.status === column.id)

                return (
                  <SortableContext key={column.id} items={columnTasks.map((task) => task.id)}>
                    <KanbanColumn
                      id={`column-${column.id}`}
                      title={column.title}
                      tasks={columnTasks}
                      onTaskClick={handleTaskClick}
                    />
                  </SortableContext>
                )
              })}
            </div>

            <DragOverlay>
              {activeId ? (
                <KanbanItem task={tasks.find((task) => task.id === activeId)!} onClick={() => {}} overlay />
              ) : null}
            </DragOverlay>
          </DndContext>

          {selectedTask && (
            <TaskDetails
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          )}
        </div>
      )}
    </div>
  )
}

function setTasks(newTasks: Task[]) {
  // W rzeczywistej aplikacji, wysłalibyśmy zmiany do API
  console.log("Aktualizacja zadań:", newTasks)
  // Ponieważ jest to demo, nie implementujemy faktycznej aktualizacji stanu
}