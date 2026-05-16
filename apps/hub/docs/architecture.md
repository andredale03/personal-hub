# Architettura del progetto

## Struttura delle cartelle

```
apps/hub/
├── docs/                   # Documentazione
├── public/
│   ├── icon.svg            # Icona app (512×512, gradiente indigo/viola)
│   ├── favicon.svg
│   ├── icons.svg
│   └── manifest.json       # PWA manifest (display: standalone)
├── src/
│   ├── main.tsx            # Entry point React
│   ├── App.tsx             # Griglia app + apertura popup
│   ├── apps.ts             # Registro app (fonte di verità)
│   └── index.css           # Tailwind directives + font
├── index.html              # HTML entry point (meta PWA inclusi)
├── vite.config.ts          # Config Vite (porta 5174)
├── tailwind.config.js      # Config Tailwind (dark mode, colori brand)
└── package.json
```

## Stack tecnico

| Tecnologia | Versione | Ruolo |
|------------|----------|-------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 5 | Build tool e dev server |
| Tailwind CSS | 3 | Styling utility-first |
| lucide-react | latest | Icone UI |

## Registro app: apps.ts

Le app sono definite in `src/apps.ts` come array TypeScript versionato col codice.

```ts
interface AppEntry {
  id: string
  name: string
  description: string
  url: string
  icon: string
  color: string
  status: 'live' | 'wip' | 'planned'
}
```

**Vantaggi rispetto a localStorage:**
- Versionato con git
- Type-safe
- Sincronizzato su tutti i dispositivi via deploy
- Zero runtime failures

## Apertura app

Le card con `status: 'live'` aprono l'URL tramite `window.open` con features specifiche:

```ts
window.open(url, `app_${id}`, 'width=1280,height=800,toolbar=0,menubar=0,location=0')
```

Questo apre una finestra centrata senza chrome del browser. Se l'app di destinazione è installata come PWA, il browser la apre direttamente nella finestra standalone.

## PWA

Il hub è una Progressive Web App:
- `public/manifest.json` — `display: standalone`, `theme_color: #4f46e5`
- `index.html` — meta tag `theme-color`, `apple-mobile-web-app-capable`

Installato da Chrome/Edge, si apre come app desktop dal menu Start senza barra del browser.

## Dark mode

`darkMode: 'class'` in Tailwind. Il toggle aggiunge/rimuove la classe `dark` su `<html>` e salva la preferenza con la chiave `hub-theme` in localStorage.

## Layout

Il hub usa `h-screen` + `flex flex-col` + `overflow-hidden` sul root:
- Header fisso (56px)
- Main scrollabile (`flex-1 overflow-y-auto`)

Con poche app, non è necessario scrollare. Se le app crescono, la sezione principale scrolla internamente.

## Flusso dati

```
apps.ts (array statico)
  └─ App.tsx
       └─ .map() → <button> card
            ├─ status === 'live' → window.open(url, popup features)
            └─ status !== 'live' → disabled (opacità ridotta)
```
