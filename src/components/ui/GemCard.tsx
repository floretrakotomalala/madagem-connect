'use client'
import Link from 'next/link'

const gemEmojis: Record<string, string> = {
  'Saphir Naturel': '💎',
  'Rubis Naturel': '❤️',
  'Tourmaline Naturelle': '💠',
  'Émeraude Naturelle': '💚',
  'Alexandrite Naturelle': '🔮',
}

const gemColors: Record<string, string> = {
  'Saphir Naturel': 'from-blue-100 to-blue-300',
  'Rubis Naturel': 'from-red-100 to-red-300',
  'Tourmaline Naturelle': 'from-teal-100 to-teal-300',
  'Émeraude Naturelle': 'from-green-100 to-green-300',
  'Alexandrite Naturelle': 'from-purple-100 to-purple-300',
}

interface GemCardProps {
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

export default function GemCard({ id, nom, prix_ar, prix_usd, poids, origine, type, vendeur, note, verifie }: GemCardProps) {
  const emoji = gemEmojis[type] || '💎'
  const gradient = gemColors[type] || 'from-gray-100 to-gray-300'

  return (
    <Link href={`/pierres/${id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:-translate-y-1 group">
        
        {/* Image */}
        <div className={`w-full h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
          {verifie && (
            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              ✓ Vérifié
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {poids} ct
          </div>
        </div>

        {/* Infos */}
        <div className="p-4">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{type}</p>
          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-3">{nom}</h3>
          
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-green-700 font-black text-lg leading-none">
                {prix_ar.toLocaleString()} Ar
              </p>
              <p className="text-gray-400 text-xs mt-1">${prix_usd.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{origine.split(',')[0]}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs font-bold text-gray-700">{note}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <p className="text-xs text-gray-500 truncate">{vendeur}</p>
            <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-1 rounded-lg">
              Contacter →
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}
