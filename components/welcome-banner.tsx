"use client"

import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

export function WelcomeBanner() {
  const { user } = useUser()
  const currentDate = format(new Date(), "EEEE, d MMMM", { locale: pl })
  const userName = user?.name?.split(" ")[0] || "Gość"

  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Witaj, {userName}!</h1>
          <div className="flex items-center space-x-2 text-blue-100">
            <Clock className="h-4 w-4" />
            <span className="capitalize">{currentDate}</span>
          </div>
          <p className="text-blue-100 max-w-md">
            Dzisiejszy dzień zapowiada się pracowicie. Masz zaplanowane 3 spotkania i 8 zadań do wykonania.
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
            Nowe zadanie
          </Button>
          <Button variant="default" className="bg-white text-blue-600 hover:bg-blue-50">
            <span>Przegląd dnia</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}