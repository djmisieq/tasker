import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarClock, Check, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  dueDate: string
  project: string
  priority: "low" | "medium" | "high" | "urgent"
  completed: boolean
  overdue?: boolean
}

const priorityTasks: Task[] = [
  {
    id: "1",
    title: "Przygotować prezentację projektu",
    dueDate: "Dzisiaj, 17:00",
    project: "Marketing 2.0",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Finalizacja dokumentacji API",
    dueDate: "Jutro, 12:00",
    project: "System CRM",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Code review pull requestów",
    dueDate: "Dzisiaj, 16:00",
    project: "System CRM",
    priority: "urgent",
    completed: false,
  },
  {
    id: "4",
    title: "Opublikować aktualizację na staging",
    dueDate: "Wczoraj, 14:00",
    project: "System CRM",
    priority: "high",
    completed: false,
    overdue: true,
  },
  {
    id: "5",
    title: "Zaktualizować harmonogram projektu",
    dueDate: "Piątek, 11:00",
    project: "Marketing 2.0",
    priority: "medium",
    completed: false,
  },
]

export function PriorityTasks() {
  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Priorytetowe zadania</CardTitle>
          <CardDescription>Zadania wymagające Twojej uwagi</CardDescription>
        </div>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {priorityTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center space-x-4 rounded-md border p-3 hover:bg-muted/50 transition-colors",
                task.overdue && "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-900/20",
                task.completed && "opacity-60"
              )}
            >
              <div>
                <Checkbox id={`task-${task.id}`} checked={task.completed} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={cn(
                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      task.completed && "line-through"
                    )}
                  >
                    {task.title}
                  </label>
                  <Badge
                    variant="outline"
                    className="ml-2 font-normal border-none flex space-x-1 items-center px-1.5"
                  >
                    <div className={cn("h-2 w-2 rounded-full", priorityColors[task.priority])} />
                    <span className="text-xs capitalize">{task.priority}</span>
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="font-medium">{task.project}</span>
                  <span className="mx-1">•</span>
                  <div className="flex items-center">
                    <CalendarClock className="mr-1 h-3 w-3" />
                    <span className={cn(task.overdue && "text-red-500")}>{task.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-xs justify-center" asChild>
          <Link href="/tasks">
            <Check className="mr-1 h-3.5 w-3.5" />
            <span>Pokaż wszystkie zadania</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}