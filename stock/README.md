# Demo

# Wymagania

- zainstalowany npm

# Zmienne środowiskowe

- REACT_APP_ALPHAVANTAGE_API_ADDRESS - adres serwisu do pobierania informacji o giełdzie
- REACT_APP_ALPHAVANTAGE_API_KEY - klucz do api giełdowego
- REACT_APP_AUTOCOMPLETE_API_ADDRESS - adres serwisu do pobierania informacji o domenach oraz ikonach

# Jak przygotować

```
npm i
```

# Jak uruchomić

```
npm start
```

# Jak testowac

```
npm test
```

# Jak budować

Przed zbudowaniem należy załadować zmienne środowiskowe z opdowiedniego pliku np

```
sh -ac "./.env.production"
```

Następnie budujey:

```
npm run build
```

# Poprawki

- Testy komponentów
- Klucze api powinny być umieszczone na serwisach backendowych. W tym momencie można je przechwycić po stronie klienta sprawdzając networking.
