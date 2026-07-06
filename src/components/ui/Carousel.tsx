'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const gemEmojis: Record<string, string> = {
  'Saphir Naturel': '💎',
  'Rubis Naturel': '❤️',
  'Tourmaline Naturelle': '💠',
  'Émeraude Naturelle': '💚',
  'Alexandrite Naturelle': '🔮',
}

const gemColors: Record<string, string> = {
  'Saphir Naturel': 'from-blue-900 via-blue-700 to-blue-500',
  'Rubis Naturel': 'from-red-900 via-red-700 to-red-500',
  'Tourmaline Naturelle': 'from-teal-900 via-teal-700 to-teal-500',
  'Émeraude Naturelle': 'from-green-900 via-green-700 to-green-500',
  'Alexandrite Naturelle': 'from-purple-900 via-purple-700 to-purple-500',
}

interface Gem {
  id: string
  nom: string
  prix_ar: number
  prix_usd: number
  poids: number
  origine: string
  type: string
  vendeur: string
  note: number
  verifie: boolean
}

export default function Carousel({ gems }: { gems: Gem[] }) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setCurrent(c => (c + 1) % gems.length)
          return 0
        }
        return p + 1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [current, gems.length])

  const gem = gems[current]
  const emoji = gemEmojis[gem.type] || '💎'
  const gradient = gemColors[gem.type] || 'from-gray-900 via-gray-700 to-gray-500'

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-r ${gradient}`} style={{minHeight: '280px'}}>
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div className="h-full bg-yellow-400 transition-all duration-100" style={{width: `${progress}%`}} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex items-center justify-between px-6 py-10 max-w-4xl mx-auto">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-xs font-medium">OFFRE EN VEDETTE</span>
          </div>
          <h2 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2">{gem.nom}</h2>
          <p className="text-white/60 text-sm mb-4">{gem.type} · {gem.poids} carats · {gem.origine}</p>
          <div className="flex items-center gap-4 mb-6">
            <div>
              <p className="text-yellow-400 font-black text-2xl">{gem.prix_ar.toLocaleString()} Ar</p>
              <p className="text-white/50 text-sm">${gem.prix_usd.toLocaleString()}</p>
            </div>
            {gem.verifie && (
              <div className="bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                ✓ Vendeur Vérifié
              </div>
            )}
          </div>
          <Link href={`/pierres/${gem.id}`} className="inline-flex bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg">
            Voir l'offre →
          </Link>
        </div>

        {/* Emoji pierre */}
        <div className="hidden md:flex text-9xl opacity-80 ml-8 animate-bounce" style={{animationDuration:'3s'}}>
          {emoji}
        </div>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {gems.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setProgress(0) }}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-yellow-400 w-6' : 'bg-white/40'}`}
          />
        ))}
      </div>

    </div>
  )
}
