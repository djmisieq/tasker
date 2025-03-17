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
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Bezpieczeństwo</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Powiadomienia</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Prywatność</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden md:inline">Wygląd</span>
          </TabsTrigger>
          <TabsTrigger value="workspace" className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Workspace</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Informacje o koncie</CardTitle>
              <CardDescription>
                Zaktualizuj swoje dane osobowe i informacje kontaktowe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt="Avatar" />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Zdjęcie profilowe</h4>
                  <p className="text-sm text-muted-foreground">
                    Twoje zdjęcie będzie widoczne dla innych użytkowników.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      Zmień
                    </Button>
                    <Button size="sm" variant="outline">
                      Usuń
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input id="name" defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" defaultValue="+48 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Stanowisko</Label>
                  <Input id="role" defaultValue={user?.role || "Project Manager"} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Anuluj</Button>
              <Button>Zapisz zmiany</Button>
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
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Zmiana hasła</h3>
                <div className="grid grid-cols-1 gap-4">
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
                </div>
                <Button>Zmień hasło</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Weryfikacja dwuetapowa</h3>
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">Uwierzytelnianie dwuskładnikowe</div>
                    <div className="text-sm text-muted-foreground">
                      Dodaj dodatkową warstwę zabezpieczeń do swojego konta.
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Powiadomienia</CardTitle>
              <CardDescription>
                Zdecyduj, które powiadomienia chcesz otrzymywać i kiedy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Powiadomienia e-mail</h3>
                <div className="space-y-3">
                  {[
                    { id: "email-tasks", label: "Zadania", description: "Powiadomienia o przypisanych i zmienionych zadaniach" },
                    { id: "email-meetings", label: "Spotkania", description: "Powiadomienia o spotkaniach i zmianach w kalendarzu" },
                    { id: "email-projects", label: "Projekty", description: "Aktualizacje projektów i kamienie milowe" },
                    { id: "email-team", label: "Zespół", description: "Działania członków zespołu i komunikacja" },
                  ].map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Powiadomienia w aplikacji</h3>
                <div className="space-y-3">
                  {[
                    { id: "app-mentions", label: "Wzmianki", description: "Kiedy ktoś oznacza Cię w komentarzu lub zadaniu" },
                    { id: "app-deadlines", label: "Terminy", description: "Przypomnienia o zbliżających się terminach" },
                    { id: "app-comments", label: "Komentarze", description: "Nowe komentarze w zadaniach, do których jesteś przypisany" },
                  ].map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zapisz preferencje</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Prywatność</CardTitle>
              <CardDescription>
                Zarządzaj ustawieniami prywatności swojego konta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { id: "privacy-profile", label: "Widoczność profilu", description: "Kto może zobaczyć Twój profil" },
                  { id: "privacy-activity", label: "Aktywność", description: "Kto może zobaczyć Twoją aktywność" },
                  { id: "privacy-tasks", label: "Zadania", description: "Kto może zobaczyć Twoje zadania" },
                ].map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Tylko ja</Button>
                      <Button variant="outline" size="sm">Zespół</Button>
                      <Button variant="outline" size="sm">Wszyscy</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Wygląd</CardTitle>
              <CardDescription>
                Dostosuj wygląd aplikacji do swoich preferencji.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Motyw</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start" size="lg">
                    <Sun className="h-4 w-4 mr-2" />
                    Jasny
                  </Button>
                  <Button variant="outline" className="justify-start" size="lg">
                    <Moon className="h-4 w-4 mr-2" />
                    Ciemny
                  </Button>
                  <Button variant="outline" className="justify-start" size="lg">
                    <Laptop className="h-4 w-4 mr-2" />
                    Systemowy
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Inne ustawienia</h3>
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">Animacje</div>
                    <div className="text-sm text-muted-foreground">Włącz lub wyłącz animacje w aplikacji</div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium">Tryb kompaktowy</div>
                    <div className="text-sm text-muted-foreground">Zmniejsza odstępy w interfejsie</div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Zapisz preferencje</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia workspace</CardTitle>
              <CardDescription>
                Zarządzaj swoją przestrzenią roboczą i ustawieniami organizacji.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informacje o organizacji</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Nazwa organizacji</Label>
                    <Input id="org-name" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-domain">Domena</Label>
                    <Input id="org-domain" defaultValue="acme.com" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Zarządzanie subskrypcją</h3>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Plan Business</h4>
                      <p className="text-sm text-muted-foreground">25 użytkowników, wszystkie funkcje</p>
                    </div>
                    <Button variant="outline">Zmień plan</Button>
                  </div>
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
