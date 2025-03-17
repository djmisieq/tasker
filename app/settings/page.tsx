"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock, UserCog, Bell, Shield, Palette, Building } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Ustawienia</h1>
        <p className="text-muted-foreground">
          Zarządzaj swoimi ustawieniami konta i preferencjami.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid max-w-screen-md grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="account" className="flex items-center gap-1">
            <UserCog className="h-4 w-4" />
            <span className="hidden md:inline">Konto</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Hasło</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Powiadomienia</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden md:inline">Wygląd</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Bezpieczeństwo</span>
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Organizacja</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Informacje o profilu</CardTitle>
              <CardDescription>
                Edytuj swoje dane profilowe wyświetlane w aplikacji.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Zdjęcie profilowe</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Zmień zdjęcie
                    </Button>
                    <Button size="sm" variant="outline">
                      Usuń
                    </Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input id="name" defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adres email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">Stanowisko</Label>
                  <Input id="job" defaultValue="Project Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Dział</Label>
                  <Input id="department" defaultValue="Zarządzanie Projektami" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zapisz zmiany</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Zmiana hasła</CardTitle>
              <CardDescription>
                Zmień swoje hasło do konta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Aktualne hasło</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nowe hasło</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Potwierdź nowe hasło</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zmień hasło</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia powiadomień</CardTitle>
              <CardDescription>
                Dostosuj jakie powiadomienia chcesz otrzymywać.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-tasks" className="flex-1">
                      Przydzielenie zadania
                    </Label>
                    <Switch id="email-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-meetings" className="flex-1">
                      Nowe spotkanie
                    </Label>
                    <Switch id="email-meetings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-comments" className="flex-1">
                      Komentarze do zadań
                    </Label>
                    <Switch id="email-comments" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-medium">W aplikacji</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-tasks" className="flex-1">
                      Przydzielenie zadania
                    </Label>
                    <Switch id="app-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-meetings" className="flex-1">
                      Nowe spotkanie
                    </Label>
                    <Switch id="app-meetings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-comments" className="flex-1">
                      Komentarze do zadań
                    </Label>
                    <Switch id="app-comments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-updates" className="flex-1">
                      Aktualizacje projektów
                    </Label>
                    <Switch id="app-updates" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zapisz preferencje</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Preferencje wyglądu</CardTitle>
              <CardDescription>
                Dostosuj wygląd aplikacji według swoich preferencji.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Motyw</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <span className="h-4 w-4 rounded-full border mr-2 bg-background"></span>
                    Jasny
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="h-4 w-4 rounded-full border mr-2 bg-black"></span>
                    Ciemny
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="h-4 w-4 rounded-full border mr-2 bg-gradient-to-r from-gray-200 to-gray-800"></span>
                    Systemowy
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rozmiar czcionki</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">Mały</Button>
                  <Button variant="outline">Średni</Button>
                  <Button variant="outline">Duży</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zapisz preferencje</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Bezpieczeństwo</CardTitle>
              <CardDescription>
                Zarządzaj ustawieniami bezpieczeństwa swojego konta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Uwierzytelnianie dwuskładnikowe</h3>
                    <p className="text-sm text-muted-foreground">
                      Dodatkowa warstwa zabezpieczeń dla Twojego konta.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sesje urządzeń</h3>
                    <p className="text-sm text-muted-foreground">
                      Zarządzaj aktywnymi sesjami na urządzeniach.
                    </p>
                  </div>
                  <Button variant="outline">Zarządzaj</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Historia logowań</h3>
                    <p className="text-sm text-muted-foreground">
                      Przeglądaj historię logowań na konto.
                    </p>
                  </div>
                  <Button variant="outline">Zobacz historię</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia organizacji</CardTitle>
              <CardDescription>
                Zarządzaj ustawieniami związanymi z Twoją organizacją.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Nazwa organizacji</Label>
                <Input id="org-name" defaultValue="Tasker Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-address">Adres</Label>
                <Textarea id="org-address" defaultValue="ul. Przykładowa 123, 00-001 Warszawa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-tax-id">NIP</Label>
                <Input id="org-tax-id" defaultValue="1234567890" />
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Członkostwo</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Plan biznesowy</h4>
                    <p className="text-sm text-muted-foreground">
                      Do 50 użytkowników, wszystkie funkcje.
                    </p>
                  </div>
                  <Button variant="outline">Zmień plan</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zapisz zmiany</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
