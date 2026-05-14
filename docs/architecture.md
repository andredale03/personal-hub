# Architettura del progetto

## Struttura del monorepo

```
personal-hub/                  ← repository GitHub unico
├── apps/
│   ├── hub/                   → hub.vercel.app
│   │   └── src/
│   │       ├── main.tsx       # Entry point
│   │       ├── App.tsx        # Homepage con griglia app
│   │       ├── apps.json      # Lista delle app (fonte di verità)
│   │       └── index.css      # Tailwind + font
│   ├── paystats/              → paystats.vercel.app
│   └── _template/             → starter kit per nuove app
├── docs/                      ← documentazione
├── turbo.json                 ← orchestrazione build
└── package.json               ← workspaces root
```

## Stack tecnico

| Tecnologia | Versione | Ruolo |
|------------|----------|-------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool e dev server |
| Tailwind CSS | 3 | Styling utility-first |
| Turborepo | 2 | Orchestrazione build monorepo |
| lucide-react | latest | Icone UI |

## Fonte di verità: apps.json

La lista delle app nel hub è `apps/hub/src/apps.json` — un array JSON versionato col codice.

**Vantaggi:**
- Sincronizzato su tutti i dispositivi via Vercel (non localStorage)
- Versionato con git
- Zero backend, zero database, zero costi
- Modifica → push → Vercel rideploya in ~30 secondi

## Comandi principali

```bash
# dalla root del monorepo
npm run dev      # avvia tutte le app in parallelo
npm run build    # builda tutte le app
npm run lint     # lint su tutte le app

# da una singola app
cd apps/hub && npm run dev
cd apps/paystats && npm run dev
```

## Deploy su Vercel

Ogni app è un progetto Vercel separato, tutti collegati allo stesso repo GitHub.

```
personal-hub (GitHub)
  ├── apps/hub       → Vercel project "hub"      (Root Directory: apps/hub)
  ├── apps/paystats  → Vercel project "paystats" (Root Directory: apps/paystats)
  └── apps/nome-app  → Vercel project "nome-app" (Root Directory: apps/nome-app)
```

Vercel rideploya automaticamente solo l'app la cui sottocartella è cambiata.

## Aggiungere una nuova app

Vedi [adding-apps.md](adding-apps.md) per il workflow completo.
