import { useState, useEffect, useRef } from 'react'
import { Moon, Sun, LayoutGrid, ChevronLeft, ArrowRight } from 'lucide-react'
import apps, { type AppEntry } from './apps'

const statusLabel: Record<AppEntry['status'], { label: string; classes: string }> = {
  live:    { label: 'Live',        classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' },
  wip:     { label: 'In corso',   classes: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  planned: { label: 'Pianificata', classes: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' },
}

function initDark(): boolean {
  const saved = localStorage.getItem('hub-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [dark, setDark] = useState(initDark)
  const [activeApp, setActiveApp] = useState<AppEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('hub-theme', next ? 'dark' : 'light')
  }

  function openApp(app: AppEntry) {
    setActiveApp(app)
    setLoading(true)
  }

  function closeApp() {
    setActiveApp(null)
    setLoading(false)
  }

  // ── App view (iframe shell) ──────────────────────────────────────────────────
  if (activeApp) {
    return (
      <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
        {/* Top bar */}
        <div className="shrink-0 h-11 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 gap-1">
          <button
            onClick={closeApp}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium"
            aria-label="Torna all'hub"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Hub</span>
          </button>

          <div className="w-px h-4 bg-zinc-700 mx-1" />

          <span className="text-base leading-none">{activeApp.icon}</span>
          <span className="text-sm font-semibold text-zinc-100 ml-1">{activeApp.name}</span>

          <div className="flex-1" />

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="shrink-0 h-0.5 bg-zinc-800">
            <div className="h-full w-1/3 bg-brand-500 animate-[loading_1s_ease-in-out_infinite]" />
          </div>
        )}

        {/* App iframe */}
        <iframe
          ref={iframeRef}
          src={activeApp.url}
          title={activeApp.name}
          className="flex-1 w-full border-0"
          allow="camera; microphone; geolocation; accelerometer; gyroscope"
          onLoad={() => setLoading(false)}
        />
      </div>
    )
  }

  // ── Grid view ────────────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950 font-sans transition-colors duration-200 flex flex-col overflow-hidden">
      <header className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <LayoutGrid className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-base tracking-tight">
              My Hub
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Le mie app
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Strumenti personali sempre a portata di mano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => {
              const s = statusLabel[app.status]
              const isLive = app.status === 'live'
              return (
                <button
                  key={app.id}
                  onClick={() => isLive && openApp(app)}
                  disabled={!isLive}
                  className={[
                    'group relative flex flex-col rounded-2xl border bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-200 text-left',
                    isLive
                      ? 'border-zinc-200 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                      : 'border-zinc-200 dark:border-zinc-800 opacity-60 cursor-default',
                  ].join(' ')}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${app.color}`} />
                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{app.icon}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.classes}`}>
                        {s.label}
                      </span>
                    </div>
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      {app.name}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                      {app.description}
                    </p>
                    {isLive && (
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
                        Apri <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}

            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-6 text-center min-h-[160px]">
              <span className="text-2xl mb-2">＋</span>
              <p className="text-xs text-zinc-400 dark:text-zinc-600">Nuova app in arrivo</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
