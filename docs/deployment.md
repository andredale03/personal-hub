# Deploy su Vercel

## Prima volta

1. Pusha il progetto su GitHub (repository separato o cartella in un monorepo)
2. Vai su [vercel.com](https://vercel.com) → **Add New Project**
3. Importa il repository GitHub
4. Vercel rileva automaticamente Vite — nessuna configurazione necessaria
5. Clicca **Deploy**

Il dominio assegnato sarà tipo `myhub-xxx.vercel.app`. Puoi rinominarlo in **Settings → Domains**.

## Deploy successivi

Ogni push su `main` trigghera automaticamente un nuovo deploy su Vercel.

## Struttura consigliata dei repository

Ogni progetto è un repository GitHub separato:

```
github.com/tuonome/myhub       → hub.vercel.app
github.com/tuonome/paystats    → paystats.vercel.app
github.com/tuonome/altra-app   → altra-app.vercel.app
```

## Aggiornare un link dopo il deploy

Quando un'app riceve il suo URL Vercel definitivo:

1. Apri `src/App.tsx`
2. Trova l'oggetto dell'app nell'array `apps`
3. Aggiorna il campo `url` con il dominio reale
4. Cambia `status` da `'planned'` / `'wip'` a `'live'`
5. Pusha su `main` — Vercel rideploya automaticamente il hub

## Variabili d'ambiente

Il hub non usa variabili d'ambiente. I link alle app sono hardcoded nell'array `apps` in `src/App.tsx`.

## Build locale

```bash
npm run build       # genera dist/
npm run preview     # preview del build su localhost:4173
```
