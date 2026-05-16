# Aggiungere una nuova app al hub

## Workflow completo

### 1. Crea la nuova app dal template

```bash
cp -r templates/app-template apps/nome-app
```

Apri `apps/nome-app/package.json` e cambia il campo `name`:
```json
{ "name": "nome-app" }
```

Installa le dipendenze e avvia:
```bash
cd apps/nome-app && npm install && npm run dev
```

Il template include già React 19 + TypeScript + Vite + Tailwind con dark mode pronto.

### 2. Sviluppa l'app

Cerca i commenti `CHANGE_ME` in `src/App.tsx` come punto di partenza.
Aggiungi le tue dipendenze specifiche con `npm install`.

### 3. Deploya su Vercel

1. Pusha il repo su GitHub (se non l'hai già fatto)
2. Vai su [vercel.com](https://vercel.com) → **Add New Project** → importa il repo
3. Imposta **Root Directory** su `apps/nome-app`
4. Deploy → ottieni l'URL (es. `nome-app.vercel.app`)

### 4. Aggiungi l'app al hub

Apri `apps/hub/src/apps.ts` e aggiungi un oggetto all'array:

```ts
{
  id: 'nome-app',
  name: 'Nome App',
  description: 'Descrizione breve di cosa fa l\'app.',
  url: 'https://nome-app.vercel.app',
  icon: '🚀',
  color: 'from-teal-500 to-cyan-600',
  status: 'live',
}
```

### 5. Pusha su GitHub

```bash
git add .
git commit -m "feat: aggiungi nome-app"
git push
```

Vercel rideploya automaticamente il hub (~30s). La nuova card appare su tutti i dispositivi.

---

## Campi di apps.json

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore unico, kebab-case |
| `name` | string | Nome visualizzato nella card |
| `description` | string | Testo descrittivo |
| `url` | string | URL dell'app deployata su Vercel |
| `icon` | string | Emoji icona |
| `color` | string | Gradiente Tailwind (vedi [design-system.md](design-system.md)) |
| `status` | `'live' \| 'wip' \| 'planned'` | Stato visibile nel badge |

## Valori di `status`

| Valore | Badge | Comportamento |
|--------|-------|---------------|
| `live` | Live (verde) | Card cliccabile, apre l'URL |
| `wip` | In corso (ambra) | Card non cliccabile, opacità ridotta |
| `planned` | Pianificata (grigio) | Card non cliccabile, opacità ridotta |

## Riordinare le app

L'ordine delle card segue l'ordine degli oggetti in `apps.json`. Sposta gli oggetti nell'array e pusha.
