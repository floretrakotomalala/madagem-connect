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
  'Saphir Naturel': 'from-blue-100 to-blue-200',
  'Rubis Naturel': 'from-red-100 to-red-200',
  'Tourmaline Naturelle': 'from-teal-100 to-teal-200',
  'Émeraude Naturelle': 'from-green-100 to-green-200',
  'Alexandrite Naturelle': 'from-purple-100 to-purple-200',
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

export default function GemGrid({ gems }: { gems: Gem[] }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-gray-800">Annonces récentes</h2>
        <span className="text-sm text-gray-400">{gems.length} pierres disponibles</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gems.map(gem => (
          <Link key={gem.id} href={`/pierres/${gem.id}`}>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 hover:-translate-y-0.5 group">
              <div className={`w-full h-32 bg-gradient-to-br ${gemColors[gem.type] || 'from-gray-100 to-gray-200'} flex items-center justify-center relative`}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                  {gemEmojis[gem.type] || '💎'}
                </span>
                {gem.verifie && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    ✓
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/20 text-white text-xs px-2 py-0.5 rounded-full">
                  {gem.poids}ct
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{gem.type.split(' ')[0]}</p>
                <h3 className="font-bold text-gray-900 text-xs leading-tight mb-2 line-clamp-2">{gem.nom}</h3>
                <p className="text-green-700 font-black text-sm">{gem.prix_ar.toLocaleString()} Ar</p>
                <p className="text-gray-400 text-xs">${gem.prix_usd.toLocaleString()}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{gem.origine}</span>
                  <span className="text-xs text-yellow-500">★ {gem.note}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
