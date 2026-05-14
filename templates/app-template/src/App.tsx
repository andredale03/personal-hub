import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

function initDark(): boolean {
  const saved = localStorage.getItem('theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [dark, setDark] = useState(initDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans transition-colors duration-200">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {/* CHANGE_ME: nome app */}
            My App
          </span>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {/* CHANGE_ME: titolo */}
          Titolo
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {/* CHANGE_ME: descrizione */}
          Inizia qui.
        </p>
      </main>
    </div>
  )
}
