"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Kanban, LayoutDashboard, Users, Settings, FolderKanban, Menu, X, Network } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Zamknij sidebar po zmianie ścieżki na urządzeniach mobilnych
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  const routes = [
    {
      href: "/",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/meetings",
      icon: Calendar,
      title: "Spotkania",
    },
    {
      href: "/tasks",
      icon: Kanban,
      title: "Zadania",
    },
    {
      href: "/projects",
      icon: FolderKanban,
      title: "Projekty",
    },
    {
      href: "/team",
      icon: Users,
      title: "Zespół",
    },
    {
      href: "/organization",
      icon: Network,
      title: "Struktura",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Ustawienia",
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-950 border-r transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 glass-effect",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">T</span>
            </div>
            <h1 className="text-2xl font-bold">Tasker</h1>
          </div>
        </div>
        <div className="flex-1 px-3 py-2 space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal transition-all duration-200",
                pathname === route.href ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
              )}
              asChild
            >
              <Link href={route.href} className="flex items-center space-x-3">
                <route.icon
                  className={cn("h-5 w-5", pathname === route.href ? "text-primary" : "text-muted-foreground")}
                />
                <span>{route.title}</span>
                {pathname === route.href && <div className="absolute left-0 h-8 w-1 rounded-r-full bg-primary" />}
              </Link>
            </Button>
          ))}
        </div>

        <div className="p-4 mt-auto">
          <div className="rounded-lg bg-muted p-3">
            <h3 className="text-sm font-medium">Potrzebujesz pomocy?</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Sprawdź naszą dokumentację lub skontaktuj się z supportem.
            </p>
            <Button variant="default" size="sm" className="w-full mt-2">
              Pomoc
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}