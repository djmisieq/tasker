#!/bin/bash

# Kolory dla czytelności komunikatów
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Usuwanie node_modules (jeśli istnieje)...${NC}"
rm -rf node_modules

echo -e "${YELLOW}Usuwanie package-lock.json (jeśli istnieje)...${NC}"
rm -f package-lock.json

echo -e "${YELLOW}Instalowanie zależności z flagą --legacy-peer-deps...${NC}"
npm install --legacy-peer-deps

echo -e "${GREEN}Instalacja zakończona pomyślnie!${NC}"
echo -e "${GREEN}Możesz teraz uruchomić aplikację używając komendy: npm run dev${NC}"
