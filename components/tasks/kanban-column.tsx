import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Task } from "@/components/tasks/kanban-board"
import { KanbanItem } from "@/components/tasks/kanban-item"

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

export function KanbanColumn({ id, title, tasks, onTaskClick }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-muted/40 dark:bg-muted/20 rounded-lg h-full overflow-hidden border"
    >
      <div className="p-2 font-medium border-b bg-muted/60 dark:bg-muted/30">
        <h3 className="text-sm">{title}</h3>
        <div className="text-xs text-muted-foreground mt-1">{tasks.length} zadań</div>
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-24 border border-dashed rounded-md bg-background/50">
            <p className="text-sm text-muted-foreground">Brak zadań</p>
          </div>
        ) : (
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {tasks.map((task) => (
                <KanbanItem key={task.id} task={task} onClick={() => onTaskClick(task)} />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  )
}