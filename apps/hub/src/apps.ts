export interface AppEntry {
  id: string
  name: string
  description: string
  url: string
  icon: string
  color: string
  status: 'live' | 'wip' | 'planned'
}

const apps: AppEntry[] = [
  {
    id: 'paystats',
    name: 'PayStats',
    description: 'Traccia le tue spese mensili, analizza budget per categoria e visualizza trend finanziari.',
    url: 'https://paystats.vercel.app',
    icon: '💰',
    color: 'from-indigo-500 to-purple-600',
    status: 'live',
  },
]

export default apps
