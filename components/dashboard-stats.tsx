import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, FolderKanban, TrendingUp } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover-card-animation">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktywne projekty</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <FolderKanban className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500 font-medium">+2</span>
            <span className="ml-1">w tym miesiącu</span>
          </div>
        </CardContent>
      </Card>
      <Card className="hover-card-animation">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Zadania do wykonania</CardTitle>
          <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Clock className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="text-orange-500 dark:text-orange-400 font-medium">8</span>
            <span className="ml-1">z wysokim priorytetem</span>
          </div>
        </CardContent>
      </Card>
      <Card className="hover-card-animation">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ukończone zadania</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">16</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500 font-medium">+5</span>
            <span className="ml-1">w tym tygodniu</span>
          </div>
        </CardContent>
      </Card>
      <Card className="hover-card-animation">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nadchodzące spotkania</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>Najbliższe: </span>
            <span className="ml-1 font-medium">jutro, 10:00</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}