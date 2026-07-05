'use client'
import Link from 'next/link'

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
  return (
    <Link href={`/pierres/${id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all cursor-pointer overflow-hidden border border-gray-100">
        
        {/* Image placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
          <span className="text-5xl">💎</span>
        </div>

        {/* Infos */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-sm">{nom}</h3>
          <p className="text-xs text-gray-500 mb-2">{type} — {poids} carats</p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-bold text-sm">
                {prix_ar.toLocaleString()} Ar
              </p>
              <p className="text-gray-400 text-xs">${prix_usd}</p>
            </div>
            <div className="text-xs text-gray-500 text-right">
              <p>{origine}</p>
              {verifie && <span className="text-green-600">✅ Vérifié</span>}
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <span>⭐ {note}/5</span>
            <span>· {vendeur}</span>
          </div>
        </div>

      </div>
    </Link>
  )
}
