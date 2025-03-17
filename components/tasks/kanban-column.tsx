"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanItem } from "@/components/tasks/kanban-item"
import type { Task } from "@/components/tasks/kanban-board"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

export function KanbanColumn({ id, title, tasks, onTaskClick }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col h-full bg-muted/40 rounded-lg p-3 border border-border/50 glass-effect"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center">
          <h3 className="font-medium">{title}</h3>
          <div className="ml-2 flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-xs font-medium text-primary">
            {tasks.length}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Dodaj zadanie</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide pr-1">
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanItem key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 border border-dashed rounded-lg border-border/50">
            <p className="text-sm text-muted-foreground">Przeciągnij zadanie tutaj</p>
          </div>
        )}
      </div>
    </div>
  )
}