# PayStats

App per il tracciamento delle spese mensili con grafici, budget per categoria e insight automatici.

## Stack

| Tecnologia | Versione | Ruolo |
|------------|----------|-------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 5 | Build tool e dev server |
| Tailwind CSS | 3 | Styling utility-first |
| Recharts | 3 | Grafici |
| date-fns | 4 | Utilità date |
| lucide-react | latest | Icone UI |

## Avvio

```bash
cd apps/paystats
npm run dev   # http://localhost:5173
```

## Funzionalità

- **Dashboard** — saldo, spese mensili, media giornaliera, risparmio previsto
- **Grafici** — donut (distribuzione), trend giornaliero, confronto categorie, calendario heatmap
- **Budget** — barre di utilizzo per categoria
- **Spese** — lista filtrabile per categoria con ricerca
- **Smart insights** — analisi automatiche su categoria top, burn rate, previsione
- **Categorie** — CRUD con colore, icona e budget opzionale
- **Dark mode** — persistente, con preferenza di sistema come default
- **Demo data** — 65+ transazioni pre-caricate al primo avvio

## Persistenza

Tutti i dati sono in `localStorage`. Non richiede backend.

## PWA

Il app è configurata come Progressive Web App. Installabile da Chrome/Edge visitando `localhost:5173` — si apre come app desktop standalone senza chrome del browser.

## Layout

- **Desktop**: sidebar fissa a sinistra (240px), contenuto scrollabile a destra
- **Mobile**: header + bottom nav, modale a bottom sheet
