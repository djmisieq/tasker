"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "@/components/tasks/kanban-board"
import { Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface KanbanItemProps {
  task: Task
  onClick: () => void
  overlay?: boolean
}

export function KanbanItem({ task, onClick, overlay }: KanbanItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: overlay,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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

  // Symulacja danych użytkownika
  const assigneeData = {
    avatar: "/placeholder.svg?height=32&width=32",
    initials: task.assignee
      .split(" ")
      .map((n) => n[0])
      .join(""),
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab hover-card-animation border-border/50",
        isDragging && "task-card-dragging",
        overlay && "opacity-70",
      )}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <CardContent className="p-3 space-y-2">
        <h4 className="text-sm font-medium">{task.title}</h4>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {getPriorityLabel(task.priority)}
          </Badge>

          {task.project && <span className="text-xs text-muted-foreground">{task.project}</span>}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <div className="flex items-center">
            <Avatar className="h-5 w-5 mr-1">
              <AvatarImage src={assigneeData.avatar} alt={task.assignee} />
              <AvatarFallback className="text-[10px]">{assigneeData.initials}</AvatarFallback>
            </Avatar>
            <span className="truncate max-w-[100px]">{task.assignee}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}