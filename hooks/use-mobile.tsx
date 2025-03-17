"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Funkcja do sprawdzania rozmiaru ekranu
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px to breakpoint dla md w Tailwind
    }

    // Sprawdź rozmiar ekranu przy pierwszym renderowaniu
    checkIfMobile()

    // Dodaj nasłuchiwanie na zmianę rozmiaru ekranu
    window.addEventListener("resize", checkIfMobile)

    // Posprzątaj nasłuchiwanie przy odmontowaniu komponentu
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}