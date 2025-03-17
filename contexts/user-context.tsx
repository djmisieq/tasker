"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Symulacja ładowania danych użytkownika
  useEffect(() => {
    // W prawdziwej aplikacji sprawdzilibyśmy token, sesję itp.
    const loadUser = async () => {
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Tymczasowy mock użytkownika
        setUser({
          id: "1",
          name: "Jan Kowalski",
          email: "jan.kowalski@example.com",
          role: "admin",
          avatar: "/placeholder-user.jpg",
        })
        setError(null)
      } catch (err) {
        setError("Nie udało się załadować danych użytkownika")
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Symulacja logowania
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "test@example.com" && password === "password") {
        setUser({
          id: "1",
          name: "Jan Kowalski",
          email: "jan.kowalski@example.com",
          role: "admin",
          avatar: "/placeholder-user.jpg",
        })
        setError(null)
      } else {
        throw new Error("Nieprawidłowe dane logowania")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Wystąpił błąd podczas logowania")
      }
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true)
    try {
      // Symulacja aktualizacji profilu
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser((prev) => (prev ? { ...prev, ...userData } : null))
      setError(null)
    } catch (err) {
      setError("Nie udało się zaktualizować profilu")
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}