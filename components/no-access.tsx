import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NoAccessProps {
  type: "meeting" | "task" | "project"
  backUrl: string
}

export function NoAccess({ type, backUrl }: NoAccessProps) {
  const typeText = {
    meeting: "spotkania",
    task: "zadania",
    project: "projektu",
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2">Brak dostępu</h2>
      <p className="text-muted-foreground mb-6">Nie masz uprawnień do wyświetlenia tego {typeText[type]}.</p>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href={backUrl}>Powrót</Link>
        </Button>
        <Button asChild>
          <Link href="/">Strona główna</Link>
        </Button>
      </div>
    </div>
  )
}