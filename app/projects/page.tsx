import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ProjectsList } from "@/components/projects/projects-list"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projekty</h1>
        <Button asChild>
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nowy projekt
          </Link>
        </Button>
      </div>

      <ProjectsList />
    </div>
  )
}