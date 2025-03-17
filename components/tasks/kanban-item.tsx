import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "@/components/tasks/kanban-board"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface KanbanItemProps {
  task: Task
  onClick: () => void
  overlay?: boolean
}

export function KanbanItem({ task, onClick, overlay = false }: KanbanItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
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

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "done"

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        "bg-card p-3 rounded-md border shadow-sm cursor-pointer hover:shadow-md transition-all",
        isDragging && "opacity-50 task-card-dragging",
        isOverdue && "border-red-200 dark:border-red-900",
        overlay && "cursor-grabbing shadow-md rotate-1"
      )}
    >
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="font-medium text-sm truncate">{task.title}</div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {getPriorityLabel(task.priority)}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              <span className={cn(isOverdue && "text-red-500")}>{task.dueDate}</span>
            </div>
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt={task.assignee} />
              <AvatarFallback className="text-[10px]">
                {task.assignee
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {task.project && (
          <div className="truncate text-xs text-muted-foreground pt-1">{task.project}</div>
        )}
      </div>
    </div>
  )
}