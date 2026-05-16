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
    url: 'https://personal-hub-paystats.vercel.app/',
    icon: '💰',
    color: 'from-indigo-500 to-purple-600',
    status: 'live',
  },
    {
    id: 'gymode',
    name: 'GyMode',
    description: 'Allenati seguendo le indicazioni del tuo personal trainer.',
    url: '',
    icon: '💪',
    color: 'from-emerald-500 to-teal-600',
    status: 'planned',
  },
]

export default apps
