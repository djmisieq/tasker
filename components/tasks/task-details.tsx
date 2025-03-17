"use client"

import { useState } from "react"
import { Task } from "@/components/tasks/kanban-board"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CalendarIcon, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface TaskDetailsProps {
  task: Task
  onClose: () => void
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskDetails({ task, onClose, onUpdate, onDelete }: TaskDetailsProps) {
  const [editedTask, setEditedTask] = useState<Task>({ ...task })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onUpdate(editedTask)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(task.id)
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

  // Symulacja danych użytkownika
  const assigneeData = {
    avatar: "/placeholder.svg?height=32&width=32",
    initials: task.assignee
      .split(" ")
      .map((n) => n[0])
      .join(""),
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {isEditing ? (
              <Input
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="h-auto text-lg font-semibold py-1"
              />
            ) : (
              <span>{task.title}</span>
            )}
            {!isEditing && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                Edytuj
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>Szczegóły zadania</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Priority & Status */}
          <div className="flex flex-wrap gap-3">
            {isEditing ? (
              <>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-muted-foreground">Priorytet</label>
                  <Select
                    value={editedTask.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setEditedTask({ ...editedTask, priority: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Niski</SelectItem>
                      <SelectItem value="medium">Średni</SelectItem>
                      <SelectItem value="high">Wysoki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-muted-foreground">Status</label>
                  <Select
                    value={editedTask.status}
                    onValueChange={(value: "todo" | "in_progress" | "done") =>
                      setEditedTask({ ...editedTask, status: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Do zrobienia</SelectItem>
                      <SelectItem value="in_progress">W trakcie</SelectItem>
                      <SelectItem value="done">Zrobione</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {getPriorityLabel(task.priority)}
                </Badge>
                <Badge variant="outline">{getStatusLabel(task.status)}</Badge>
                {task.project && <Badge variant="secondary">{task.project}</Badge>}
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium mb-1">Opis</h4>
            {isEditing ? (
              <Textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{task.description}</p>
            )}
          </div>

          {/* Assignee */}
          <div>
            <h4 className="text-sm font-medium mb-1">Przypisane do</h4>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={assigneeData.avatar} alt={task.assignee} />
                <AvatarFallback>{assigneeData.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{task.assignee}</span>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <h4 className="text-sm font-medium mb-1">Termin</h4>
            {isEditing ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editedTask.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editedTask.dueDate ? (
                      format(new Date(editedTask.dueDate), "PPP", { locale: pl })
                    ) : (
                      <span>Wybierz datę</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={editedTask.dueDate ? new Date(editedTask.dueDate) : undefined}
                    onSelect={(date) =>
                      setEditedTask({
                        ...editedTask,
                        dueDate: date ? format(date, "yyyy-MM-dd") : "",
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(task.dueDate), "PPP", { locale: pl })}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {isEditing ? (
            <>
              <Button variant="destructive" size="sm" onClick={handleDelete} className="mr-auto">
                <Trash2 className="h-4 w-4 mr-1" />
                Usuń
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Zapisz zmiany</Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Zamknij
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
