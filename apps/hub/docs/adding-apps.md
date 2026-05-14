# Aggiungere una nuova app al hub

Ci sono due modi per aggiungere un'app.

## 1. Interfaccia Admin (consigliato)

Vai su `/admin` dal hub (icona ingranaggio in alto a destra oppure clicca il placeholder "+").

1. Inserisci il PIN (default: `1234`)
2. Clicca **Nuova app**
3. Compila il form: nome, URL, icona emoji, descrizione, stato e colore
4. Clicca **Salva**

Le app vengono salvate in `localStorage` e sono visibili immediatamente nel hub.

Dall'admin puoi anche:
- **Modificare** un'app esistente (icona matita)
- **Eliminare** un'app (icona cestino)
- **Riordinare** le app trascinandole (icona grip a sinistra)
- **Cambiare il PIN** dalla sezione Sicurezza in fondo alla pagina

## 2. Modifica del codice (fallback)

Le app di default (mostrate se il localStorage è vuoto) si trovano in `src/storage.ts`, nell'array `DEFAULT_APPS`.

```ts
export const DEFAULT_APPS: AppEntry[] = [
  {
    id: 'paystats',
    name: 'PayStats',
    description: 'Traccia le tue spese mensili, analizza budget per categoria e visualizza trend finanziari.',
    url: 'https://paystats.vercel.app',
    icon: '💰',
    color: 'from-indigo-500 to-purple-600',
    status: 'live',
    order: 0,
  },
]
```

## Campi di un'app

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificatore unico (generato automaticamente dall'admin) |
| `name` | string | Nome visualizzato nella card |
| `description` | string | Testo descrittivo sotto al nome |
| `url` | string | URL dell'app (aperto in un nuovo tab) |
| `icon` | string | Emoji usata come icona |
| `color` | string | Gradiente Tailwind (vedi [design-system.md](design-system.md)) |
| `status` | `'live' \| 'wip' \| 'planned'` | Stato dell'app |
| `order` | number | Posizione nella griglia (gestita automaticamente) |

## Valori di `status`

| Valore | Etichetta | Comportamento |
|--------|-----------|---------------|
| `live` | Live | Card cliccabile, apre l'URL in un nuovo tab |
| `wip` | In corso | Card non cliccabile, opacità ridotta |
| `planned` | Pianificata | Card non cliccabile, opacità ridotta |
