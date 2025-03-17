# Tasker - Aplikacja do zarządzania zadaniami, projektami i spotkaniami

Tasker to nowoczesna aplikacja webowa, która umożliwia efektywne zarządzanie zadaniami, projektami i spotkaniami w zespole. Aplikacja oferuje intuicyjny interfejs użytkownika, który wspiera organizację pracy i poprawia produktywność zespołu.

## Funkcje

- **Dashboard** - przegląd najważniejszych informacji, statystyk i nadchodzących wydarzeń
- **Zarządzanie zadaniami** - tworzenie, przypisywanie i śledzenie postępu zadań
- **Zarządzanie projektami** - organizacja zadań w projekty z diagramami Gantta
- **Planowanie spotkań** - koordynacja i zarządzanie spotkaniami zespołu
- **Struktura organizacyjna** - wizualizacja struktury zespołu i organizacji
- **Wsparcie dla trybu ciemnego** - komfort pracy w różnych warunkach oświetleniowych
- **Responsywny design** - dostosowany do pracy na urządzeniach mobilnych i desktopowych

## Technologie

- **Next.js 15** - framework React do budowy nowoczesnych aplikacji
- **React 19** - biblioteka JavaScript do tworzenia interfejsów użytkownika
- **TypeScript** - typowany JavaScript dla lepszej jakości kodu
- **Tailwind CSS** - frameworka CSS do szybkiego tworzenia responsywnych interfejsów
- **Shadcn UI** - zestaw dostępnych i konfigurowanlnych komponentów UI
- **DND Kit** - biblioteka drag-and-drop do interaktywnych interfejsów
- **Recharts** - biblioteka do tworzenia wykresów
- **Lucide Icons** - zestaw nowoczesnych ikon

## Uruchomienie projektu

### Opcja 1: Szybkie uruchomienie jedną komendą

Możesz uruchomić aplikację używając jednej komendy, która pobierze najnowsze zmiany, zainstaluje zależności i uruchomi serwer deweloperski:

```bash
# Nadaj uprawnienia wykonywania
chmod +x ./start.sh

# Uruchom skrypt startowy
./start.sh
```

### Opcja 2: Standardowe uruchomienie

```bash
# Instalacja zależności
npm install
# lub
pnpm install
# lub
yarn install

# Uruchomienie serwera deweloperskiego
npm run dev
# lub
pnpm dev
# lub
yarn dev
```

### Opcja 3: Użycie skryptów npm

```bash
# Pełna inicjalizacja (git pull + instalacja + build + uruchomienie)
npm run start:dev

# Tylko instalacja i uruchomienie
npm run setup
```

Po uruchomieniu otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce, aby zobaczyć aplikację.

## Praca z projektem w GitHub Codespaces

Ten projekt jest skonfigurowany do pracy w GitHub Codespaces. Po otwarciu projektu w Codespaces, uruchom aplikację używając jednej z powyższych metod. Aplikacja będzie automatycznie dostępna przez port 3000, który zostanie przekierowany na publiczny URL.

## Struktura projektu

- `/app` - główne komponenty aplikacji i routing Next.js
- `/components` - komponenty UI aplikacji
- `/hooks` - hooki React
- `/contexts` - konteksty React
- `/lib` - biblioteki i funkcje pomocnicze
- `/styles` - style globalne
- `/public` - statyczne pliki

## Licencja

Ten projekt jest własnością prywatną i nie jest objęty licencją open source.