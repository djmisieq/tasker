#!/bin/bash

# Wyświetlanie informacji o postępie
echo "🚀 Inicjalizacja aplikacji Tasker..."

# Pobieranie najnowszych zmian z repozytorium
echo "📥 Pobieranie najnowszych zmian z repozytorium..."
git pull origin main

# Instalacja zależności
echo "📦 Instalacja zależności..."
npm install

# Budowanie aplikacji (jeśli potrzebne)
echo "🔨 Budowanie aplikacji..."
npm run build

# Uruchamianie aplikacji
echo "🌐 Uruchamianie serwera deweloperskiego na porcie 3000..."
npm run dev