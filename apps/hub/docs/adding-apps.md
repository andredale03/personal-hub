# Aggiungere una nuova app al hub

## Workflow

### 1. Aggiungi l'entry in `apps.ts`

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

Usa `status: 'planned'` o `status: 'wip'` se l'app non è ancora pronta — la card sarà visibile ma non cliccabile.

### 2. Crea l'app dal template

```bash
cp -r templates/app-template apps/nome-app
cd apps/nome-app
npm install
npm run dev
```

### 3. Aggiungi il manifest PWA all'app

Crea `apps/nome-app/public/manifest.json`:

```json
{
  "name": "Nome App",
  "short_name": "NomeApp",
  "description": "...",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#4f46e5",
  "icons": [{ "src": "/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any maskable" }]
}
```

Aggiungi in `index.html`:
```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#4f46e5" />
```

### 4. Deploya su Vercel

1. Pusha su GitHub
2. Vai su [vercel.com](https://vercel.com) → **Add New Project** → importa il repo
3. Imposta **Root Directory** su `apps/nome-app`
4. Deploy → ottieni l'URL e aggiornalo in `apps.ts`

---

## Campi di AppEntry

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore unico, kebab-case |
| `name` | string | Nome visualizzato nella card |
| `description` | string | Testo descrittivo sotto al nome |
| `url` | string | URL dell'app (aperta in popup standalone) |
| `icon` | string | Emoji icona |
| `color` | string | Gradiente Tailwind (es. `from-indigo-500 to-purple-600`) |
| `status` | `'live' \| 'wip' \| 'planned'` | Stato dell'app |

## Valori di `status`

| Valore | Badge | Comportamento |
|--------|-------|---------------|
| `live` | Live (verde) | Card cliccabile, apre popup |
| `wip` | In corso (ambra) | Card non cliccabile, opacità ridotta |
| `planned` | Pianificata (grigio) | Card non cliccabile, opacità ridotta |

## Riordinare le app

L'ordine delle card segue l'ordine degli oggetti in `apps.ts`. Sposta gli oggetti nell'array e salva.
