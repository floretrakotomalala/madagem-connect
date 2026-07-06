'use client'
import Link from 'next/link'
import { Search, User, Gem } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [search, setSearch] = useState('')

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        
        <Link href="/" className="flex items-center gap-2 min-w-fit">
          <div className="bg-green-700 p-2 rounded-lg">
            <Gem className="text-white w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="text-green-800 font-black text-base tracking-wide">MADAGEM</div>
            <div className="text-yellow-600 text-xs tracking-widest font-semibold">CONNECT</div>
          </div>
        </Link>

        <div className="flex-1 flex items-center border-2 border-gray-200 focus-within:border-green-600 rounded-xl px-3 py-2 bg-gray-50 transition-all">
          <Search className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un Saphir, Rubis, Tourmaline..."
            className="bg-transparent outline-none text-sm w-full text-gray-700"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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
