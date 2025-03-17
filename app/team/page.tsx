"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, PlusCircle } from "lucide-react"

// Przykładowe dane członków zespołu
const teamMembers = [
  {
    id: "1",
    name: "Jan Kowalski",
    role: "Project Manager",
    department: "Zarządzanie Projektami",
    email: "jan.kowalski@example.com",
    phone: "+48 123 456 789",
    avatar: "/placeholder-user.jpg",
    status: "active",
  },
  {
    id: "2",
    name: "Anna Nowak",
    role: "Senior Frontend Developer",
    department: "Rozwój Oprogramowania",
    email: "anna.nowak@example.com",
    phone: "+48 123 456 790",
    avatar: "/placeholder-user.jpg",
    status: "active",
  },
  {
    id: "3",
    name: "Piotr Wiśniewski",
    role: "UX/UI Designer",
    department: "Design",
    email: "piotr.wisniewski@example.com",
    phone: "+48 123 456 791",
    avatar: "/placeholder-user.jpg",
    status: "active",
  },
  {
    id: "4",
    name: "Katarzyna Kowalska",
    role: "Marketing Specialist",
    department: "Marketing",
    email: "katarzyna.kowalska@example.com",
    phone: "+48 123 456 792",
    avatar: "/placeholder-user.jpg",
    status: "active",
  },
  {
    id: "5",
    name: "Michał Lewandowski",
    role: "Backend Developer",
    department: "Rozwój Oprogramowania",
    email: "michal.lewandowski@example.com",
    phone: "+48 123 456 793",
    avatar: "/placeholder-user.jpg",
    status: "vacation",
  },
  {
    id: "6",
    name: "Tomasz Nowak",
    role: "Quality Assurance",
    department: "Rozwój Oprogramowania",
    email: "tomasz.nowak@example.com",
    phone: "+48 123 456 794",
    avatar: "/placeholder-user.jpg",
    status: "active",
  },
]

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Zespół</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Dodaj członka zespołu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{member.department}</Badge>
                  {member.status === "vacation" && (
                    <Badge variant="secondary">Na urlopie</Badge>
                  )}
                </div>

                <div className="text-sm space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Profil
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Wiadomość
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
