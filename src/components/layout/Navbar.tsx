'use client'
import Link from 'next/link'
import { Search, User, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const PIERRES_MADAGASCAR = [
  '💎 Saphir', '❤️ Rubis', '💠 Tourmaline', '💚 Émeraude',
  '🔮 Alexandrite', '🟡 Chrysobéryl', '⚪ Quartz Rose',
  '🟠 Grenat', '🔵 Aigue-marine', '🟣 Améthyste',
  '🟤 Zircon', '⭐ Topaze', '🌟 Labradorite',
  '💛 Héliodore', '🔷 Tanzanite', '🪨 Kunzite',
]

function MadagascarLogo() {
  return (
    <svg viewBox="0 0 60 80" className="w-8 h-10" fill="none">
      <path d="M30 2 C20 5 12 15 10 28 C8 40 12 52 18 62 C22 70 28 76 30 78 C32 76 38 70 42 62 C48 52 52 40 50 28 C48 15 40 5 30 2Z" fill="#007A3D" opacity="0.9"/>
      <path d="M30 2 C20 5 12 15 10 28 C8 40 12 52 18 62 C22 70 28 76 30 78 C32 76 38 70 42 62 C48 52 52 40 50 28 C48 15 40 5 30 2Z" fill="none" stroke="#DAA520" strokeWidth="1.5"/>
      <circle cx="25" cy="35" r="3" fill="#DAA520" opacity="0.8"/>
      <circle cx="33" cy="28" r="2" fill="#4ade80" opacity="0.8"/>
      <circle cx="28" cy="50" r="2.5" fill="#60a5fa" opacity="0.8"/>
    </svg>
  )
}

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filtered, setFiltered] = useState(PIERRES_MADAGASCAR)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(val: string) {
    setSearch(val)
    setFiltered(PIERRES_MADAGASCAR.filter(p => p.toLowerCase().includes(val.toLowerCase())))
    setShowDropdown(true)
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        
        {/* LOGO avec carte Madagascar */}
        <Link href="/" className="flex items-center gap-2 min-w-fit">
          <MadagascarLogo />
          <div className="leading-tight">
            <div className="text-green-800 font-black text-base tracking-wide">MADAGEM</div>
            <div className="text-yellow-600 text-xs tracking-widest font-semibold">CONNECT</div>
          </div>
        </Link>

        {/* RECHERCHE avec dropdown */}
        <div className="flex-1 relative" ref={ref}>
          <div className="flex items-center border-2 border-gray-200 focus-within:border-green-600 rounded-xl px-3 py-2 bg-gray-50 transition-all">
            <Search className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un Saphir, Rubis, Tourmaline..."
              className="bg-transparent outline-none text-sm w-full text-gray-700"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
            <ChevronDown className="text-gray-400 w-4 h-4 ml-1 flex-shrink-0" />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
              <div className="p-2">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide px-2 py-1">Pierres précieuses de Madagascar</p>
                {filtered.map((pierre) => (
                  <button
                    key={pierre}
                    className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-lg text-sm text-gray-700 hover:text-green-700 transition-colors"
                    onClick={() => { setSearch(pierre.split(' ').slice(1).join(' ')); setShowDropdown(false) }}
                  >
                    {pierre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/soumettre" className="hidden md:flex bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-md whitespace-nowrap">
          + SOUMETTRE
        </Link>
        <Link href="/connexion" className="flex items-center gap-1 text-gray-600 hover:text-green-700 transition-colors">
          <User className="w-5 h-5" />
        </Link>

      </div>
    </nav>
  )
}
