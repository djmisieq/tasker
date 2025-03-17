"use client"

import { Bell, Search, Sun, Moon, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Header() {
  const { setTheme } = useTheme()
  const [hasNotifications, setHasNotifications] = useState(true)

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="relative hidden md:flex w-full max-w-sm items-center">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Szukaj w aplikacji..." className="w-full pl-8 bg-muted/50" />
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {hasNotifications && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                    <span className="sr-only">Nowe powiadomienia</span>
                  </Badge>
                )}
                <span className="sr-only">Powiadomienia</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <h2 className="text-sm font-medium">Powiadomienia</h2>
                <Button variant="ghost" size="sm" className="text-xs">
                  Oznacz wszystkie jako przeczytane
                </Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                  <div className="text-sm font-medium">Nowe zadanie</div>
                  <div className="text-xs text-muted-foreground">
                    Przypisano Ci nowe zadanie: "Przygotować prezentację projektu"
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 godziny temu</div>
                </div>
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                  <div className="text-sm font-medium">Nadchodzące spotkanie</div>
                  <div className="text-xs text-muted-foreground">
                    Spotkanie "Przegląd sprintu" rozpocznie się za 30 minut
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">30 minut temu</div>
                </div>
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                  <div className="text-sm font-medium">Komentarz do zadania</div>
                  <div className="text-xs text-muted-foreground">
                    Anna Nowak dodała komentarz do zadania "Zaktualizować dokumentację API"
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">wczoraj</div>
                </div>
              </div>
              <div className="p-2 text-center border-t">
                <Button variant="ghost" size="sm" className="text-xs w-full">
                  Zobacz wszystkie powiadomienia
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Przełącz motyw</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Jasny</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Ciemny</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                <span>Systemowy</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserNav />
        </div>
      </div>
    </header>
  )
}