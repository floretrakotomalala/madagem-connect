'use client'
import Link from 'next/link'
import { Search, User, Diamond } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [search, setSearch] = useState('')

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 min-w-fit">
          <Diamond className="text-green-700 w-8 h-8" />
          <div className="leading-tight">
            <div className="text-green-700 font-black text-lg">MADAGEM</div>
            <div className="text-gray-500 text-xs tracking-widest">CONNECT</div>
          </div>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Rechercher un Saphir, Rubis, Tourmaline..."
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* BOUTONS */}
        <Link href="/soumettre" className="btn-gold whitespace-nowrap text-sm hidden md:block">
          SOUMETTRE UNE OFFRE
        </Link>
        <Link href="/connexion" className="flex items-center gap-1 text-gray-600 hover:text-green-700 text-sm">
          <User className="w-5 h-5" />
          <span className="hidden md:block">Connexion</span>
        </Link>

      </div>
    </nav>
  )
}
