"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, PlusCircle, Users } from "lucide-react"

const departments = [
  {
    id: "1",
    name: "Zarząd",
    head: {
      name: "Marek Nowacki",
      position: "CEO",
      avatar: "/placeholder-user.jpg",
    },
    members: 3,
  },
  {
    id: "2",
    name: "Rozwój Oprogramowania",
    head: {
      name: "Anna Nowak",
      position: "CTO",
      avatar: "/placeholder-user.jpg",
    },
    members: 12,
  },
  {
    id: "3",
    name: "Marketing",
    head: {
      name: "Katarzyna Kowalska",
      position: "CMO",
      avatar: "/placeholder-user.jpg",
    },
    members: 7,
  },
  {
    id: "4",
    name: "Sprzedaż",
    head: {
      name: "Tomasz Nowak",
      position: "Sales Director",
      avatar: "/placeholder-user.jpg",
    },
    members: 9,
  },
  {
    id: "5",
    name: "HR",
    head: {
      name: "Magdalena Kowalczyk",
      position: "HR Director",
      avatar: "/placeholder-user.jpg",
    },
    members: 4,
  },
  {
    id: "6",
    name: "Finanse",
    head: {
      name: "Jan Kowalski",
      position: "CFO",
      avatar: "/placeholder-user.jpg",
    },
    members: 5,
  },
]

// Przykładowa struktura organizacyjna
const orgStructure = {
  name: "Marek Nowacki",
  position: "CEO",
  avatar: "/placeholder-user.jpg",
  children: [
    {
      name: "Anna Nowak",
      position: "CTO",
      avatar: "/placeholder-user.jpg",
      children: [
        {
          name: "Michał Lewandowski",
          position: "Backend Lead",
          avatar: "/placeholder-user.jpg",
        },
        {
          name: "Piotr Wiśniewski",
          position: "Frontend Lead",
          avatar: "/placeholder-user.jpg",
        },
      ],
    },
    {
      name: "Katarzyna Kowalska",
      position: "CMO",
      avatar: "/placeholder-user.jpg",
      children: [
        {
          name: "Alicja Wojciechowska",
          position: "Digital Marketing Manager",
          avatar: "/placeholder-user.jpg",
        },
      ],
    },
    {
      name: "Jan Kowalski",
      position: "CFO",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Magdalena Kowalczyk",
      position: "HR Director",
      avatar: "/placeholder-user.jpg",
    },
  ],
}

interface OrgNodeProps {
  node: any
  isLast?: boolean
  level?: number
  expanded?: Record<string, boolean>
  toggleExpand?: (name: string) => void
}

function OrgNode({ node, isLast = false, level = 0, expanded = {}, toggleExpand }: OrgNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded[node.name] || false
  const nodeKey = `${node.name}-${node.position}`

  return (
    <div className={`ml-${level > 0 ? "6" : "0"}`}>
      <div className="flex items-start">
        {level > 0 && (
          <div className="mr-2 mt-3">
            {isLast ? "└─" : "├─"}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center p-2 rounded-md hover:bg-muted/50">
            {hasChildren && (
              <button
                onClick={() => toggleExpand && toggleExpand(node.name)}
                className="mr-2 h-5 w-5 rounded-full flex items-center justify-center hover:bg-muted"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-7"></div>}
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={node.avatar} alt={node.name} />
              <AvatarFallback>{node.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{node.name}</div>
              <div className="text-xs text-muted-foreground">{node.position}</div>
            </div>
          </div>
          {hasChildren && isExpanded && (
            <div className="ml-4">
              {node.children.map((child: any, index: number) => (
                <OrgNode
                  key={`${child.name}-${child.position}`}
                  node={child}
                  isLast={index === node.children.length - 1}
                  level={level + 1}
                  expanded={expanded}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("structure")
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "Marek Nowacki": true,
  })

  const toggleExpand = (name: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Organizacja</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Dodaj dział
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="structure" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Struktura
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Działy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Struktura organizacyjna</CardTitle>
              <CardDescription>Hierarchiczna struktura organizacji</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="org-tree">
                <OrgNode
                  node={orgStructure}
                  expanded={expandedNodes}
                  toggleExpand={toggleExpand}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((department) => (
              <Card key={department.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle>{department.name}</CardTitle>
                  <CardDescription>
                    {department.members} {department.members === 1 ? "członek" : "członków"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={department.head.avatar} alt={department.head.name} />
                      <AvatarFallback>
                        {department.head.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{department.head.name}</div>
                      <div className="text-sm text-muted-foreground">{department.head.position}</div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Zobacz członków
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
