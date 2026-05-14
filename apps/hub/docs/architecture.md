# Architettura del progetto

## Struttura delle cartelle

```
MyHub/
├── docs/                   # Documentazione del progetto
│   ├── README.md
│   ├── adding-apps.md
│   ├── architecture.md
│   ├── design-system.md
│   └── deployment.md
├── src/
│   ├── main.tsx            # Entry point React + BrowserRouter
│   ├── App.tsx             # Homepage del hub (legge da localStorage)
│   ├── AdminPage.tsx       # Area admin (PIN + CRUD app + cambio PIN)
│   ├── storage.ts          # Layer localStorage (app e PIN)
│   └── index.css           # Tailwind directives + font Google
├── public/                 # Asset statici (favicon, ecc.)
├── index.html              # HTML entry point
├── vite.config.ts          # Config Vite (porta 5174)
├── tailwind.config.js      # Config Tailwind (dark mode, colori brand)
├── tsconfig.json           # Config TypeScript
└── package.json
```

## Stack tecnico

| Tecnologia | Versione | Ruolo |
|------------|----------|-------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool e dev server |
| Tailwind CSS | 3 | Styling utility-first |
| React Router DOM | 7 | Routing tra hub e admin |
| lucide-react | latest | Icone UI |

## Routing

| Route | Componente | Accesso |
|-------|-----------|---------|
| `/` | `App.tsx` | Pubblico |
| `/admin` | `AdminPage.tsx` | Protetto da PIN |

## Scelte architetturali

**`localStorage` come database** — le app vengono salvate nel browser con la chiave `hub-apps`. Al primo accesso, se il localStorage è vuoto, viene usato `DEFAULT_APPS` da `storage.ts` come fallback.

**PIN client-side** — il PIN è salvato in `localStorage` (chiave `hub-pin`, default `1234`). È sufficiente per un uso personale: l'admin non espone dati sensibili, protegge solo da modifiche accidentali.

**Dark mode via classe** — `darkMode: 'class'` in Tailwind. Il toggle aggiunge/rimuove la classe `dark` su `<html>` e salva la preferenza con la chiave `hub-theme`.

**Drag-and-drop nativo** — il riordinamento nell'admin usa le API HTML5 (`draggable`, `onDragStart`, `onDrop`) senza librerie esterne.

## Flusso dati

```
localStorage (hub-apps)
  └─ loadApps() → App.tsx
       └─ .map() → AppCard
            ├─ status === 'live' → <a href={url} target="_blank">
            └─ status !== 'live' → <div> (non cliccabile)

AdminPage.tsx
  ├─ loadApps() / saveApps()  → legge e scrive hub-apps
  ├─ loadPin() / savePin()    → legge e scrive hub-pin
  └─ CRUD + drag reorder → saveApps() → aggiorna hub-apps
```

## Chiavi localStorage

| Chiave | Contenuto |
|--------|-----------|
| `hub-apps` | JSON array di `AppEntry[]` |
| `hub-pin` | Stringa PIN (default `1234`) |
| `hub-theme` | `'light'` oppure `'dark'` |

## Relazione con le altre app

MyHub è completamente disaccoppiato dalle singole app:

```
MyHub (hub.vercel.app)
  ├── → paystats.vercel.app   (progetto Vercel separato)
  ├── → altra-app.vercel.app  (progetto Vercel separato)
  └── → ...
```

Ogni app è deployata autonomamente. Il hub non condivide codice, stato o dipendenze con le app figlie.
