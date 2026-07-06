'use client'
import Link from 'next/link'
import { Search, ChevronDown, Plus } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const PIERRES = [
  '💎 Saphir', '❤️ Rubis', '💠 Tourmaline', '💚 Émeraude',
  '🔮 Alexandrite', '🟡 Chrysobéryl', '⚪ Quartz Rose',
  '🟠 Grenat', '🔵 Aigue-marine', '🟣 Améthyste',
  '🟤 Zircon', '⭐ Topaze', '🌟 Labradorite',
  '💛 Héliodore', '🔷 Tanzanite', '🪨 Kunzite',
]

function LogoMada() {
  return (
    <svg viewBox="0 0 50 70" className="w-7 h-9" fill="none">
      <path d="M25 2C16 5 9 14 8 26C6 38 10 50 16 60C20 67 24 72 25 74C26 72 30 67 34 60C40 50 44 38 42 26C41 14 34 5 25 2Z" fill="#007A3D"/>
      <path d="M25 2C16 5 9 14 8 26C6 38 10 50 16 60C20 67 24 72 25 74C26 72 30 67 34 60C40 50 44 38 42 26C41 14 34 5 25 2Z" stroke="#DAA520" strokeWidth="1.5" fill="none"/>
      <circle cx="21" cy="32" r="2.5" fill="#DAA520"/>
      <circle cx="28" cy="24" r="1.8" fill="#4ade80"/>
      <circle cx="24" cy="45" r="2" fill="#60a5fa"/>
    </svg>
  )
}

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = PIERRES.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">

        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <LogoMada />
          <div>
            <div className="text-green-800 font-black text-sm tracking-wider leading-none">MADAGEM</div>
            <div className="text-yellow-600 text-xs tracking-widest font-bold">CONNECT</div>
          </div>
        </Link>

        <div className="flex-1 relative" ref={ref}>
          <div className="flex items-center border-2 border-gray-200 focus-within:border-green-600 rounded-xl px-3 py-2 bg-gray-50 transition-all cursor-pointer" onClick={() => setOpen(true)}>
            <Search className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Saphir, Rubis, Tourmaline..."
              className="bg-transparent outline-none text-sm w-full text-gray-700"
              value={search}
              onChange={e => { setSearch(e.target.value); setOpen(true) }}
            />
            <ChevronDown className={`text-gray-400 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </div>

          {open && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide px-2 py-1 mb-1">Pierres de Madagascar</p>
                {filtered.map(p => (
                  <button key={p} onClick={() => { setSearch(p.split(' ').slice(1).join(' ')); setOpen(false) }}
                    className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-lg text-sm text-gray-700 hover:text-green-700 transition-colors flex items-center gap-2">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/soumettre" className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all shadow-md flex-shrink-0">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">Soumettre</span>
        </Link>

      </div>
    </nav>
  )
}
