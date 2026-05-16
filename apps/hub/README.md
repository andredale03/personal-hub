# My Hub

Pagina principale del monorepo personal-hub. Mostra una griglia di card per accedere a tutte le app personali.

## Stack

| Tecnologia | Versione | Ruolo |
|------------|----------|-------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 5 | Build tool e dev server (porta 5174) |
| Tailwind CSS | 3 | Styling utility-first |
| lucide-react | latest | Icone UI |

## Avvio

```bash
cd apps/hub
npm run dev   # http://localhost:5174
```

## Registrare le app

Le app sono definite in [`src/apps.ts`](src/apps.ts) come array TypeScript:

```ts
const apps: AppEntry[] = [
  {
    id: 'paystats',
    name: 'PayStats',
    description: '...',
    url: 'https://...',
    icon: '💰',
    color: 'from-indigo-500 to-purple-600',
    status: 'live',
  },
]
```

Le card con `status: 'live'` sono cliccabili e aprono l'app in una finestra popup standalone.

## PWA

Il hub è configurato come Progressive Web App. Dopo aver avviato il dev server, apri `localhost:5174` in Chrome o Edge e installa l'app dalla barra degli indirizzi. Si aprirà come applicazione desktop senza chrome del browser.

## Aggiungere un'app

Vedi [`docs/adding-apps.md`](docs/adding-apps.md).
