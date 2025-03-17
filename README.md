# Tasker - Aplikacja do zarządzania zadaniami, projektami i spotkaniami

Tasker to nowoczesna aplikacja webowa, która umożliwia efektywne zarządzanie zadaniami, projektami i spotkaniami w zespole. Aplikacja oferuje intuicyjny interfejs użytkownika, który wspiera organizację pracy i poprawia produktywność zespołu.

## 🚀 Funkcje

- **Dashboard** - przegląd najważniejszych informacji, statystyk i nadchodzących wydarzeń
- **Zarządzanie zadaniami** - tworzenie, przypisywanie i śledzenie postępu zadań z użyciem tablicy Kanban
- **Zarządzanie projektami** - organizacja zadań w projekty z diagramami Gantta
- **Planowanie spotkań** - koordynacja i zarządzanie spotkaniami zespołu
- **Struktura organizacyjna** - wizualizacja struktury zespołu i organizacji
- **Wsparcie dla trybu ciemnego** - komfort pracy w różnych warunkach oświetleniowych
- **Responsywny design** - dostosowany do pracy na urządzeniach mobilnych i desktopowych

## 🛠️ Technologie

- **Next.js 15** - framework React do budowy nowoczesnych aplikacji
- **React 19** - biblioteka JavaScript do tworzenia interfejsów użytkownika
- **TypeScript** - typowany JavaScript dla lepszej jakości kodu
- **Tailwind CSS** - framework CSS do szybkiego tworzenia responsywnych interfejsów
- **Shadcn UI** - zestaw dostępnych i konfigurowalnych komponentów UI
- **DND Kit** - biblioteka drag-and-drop do interaktywnych interfejsów
- **Recharts** - biblioteka do tworzenia wykresów
- **Lucide Icons** - zestaw nowoczesnych ikon

## 🚀 Uruchomienie projektu w GitHub Codespaces

### Metoda 1: Automatyczna instalacja (zalecana)

1. Otwórz projekt w GitHub Codespaces
2. Poczekaj, aż środowisko zostanie zainicjowane (skrypt `setup.sh` zostanie automatycznie uruchomiony)
3. Po zakończeniu instalacji, uruchom aplikację:
   ```bash
   npm run dev
   ```

### Metoda 2: Ręczna instalacja

1. Otwórz projekt w GitHub Codespaces
2. Uruchom ręcznie skrypt instalacyjny:
   ```bash
   npm run setup
   ```
3. Po zakończeniu instalacji, uruchom aplikację:
   ```bash
   npm run dev
   ```

### Rozwiązywanie problemów

Jeśli napotkasz błędy związane z zależnościami, spróbuj:

```bash
# Usunąć istniejące instalacje
rm -rf node_modules
rm -f package-lock.json

# Zainstalować pakiety z obejściem konfliktów zależności
npm install --legacy-peer-deps
```

## 📁 Struktura projektu

- `/app` - główne komponenty aplikacji i routing Next.js
- `/components` - komponenty UI aplikacji
- `/hooks` - hooki React
- `/contexts` - konteksty React
- `/lib` - biblioteki i funkcje pomocnicze
- `/styles` - style globalne
- `/public` - statyczne pliki

## 📝 Licencja

Ten projekt jest własnością prywatną i nie jest objęty licencją open source.