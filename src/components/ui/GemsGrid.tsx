'use client'
import { useState } from 'react'
import { useGems } from '@/hooks/useGems'

export default function GemsGrid() {
  const [page, setPage] = useState(0)
  const { pierres, loading, hasMore } = useGems(page)

  return (
    <section className="py-12 px-4" style={{ background: 'var(--cream)' }}>
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--green)' }}>
        Pierres disponibles
      </h2>

      {loading && (
        <div className="text-center py-8" style={{ color: 'var(--green)' }}>
          Chargement...
        </div>
      )}

      {!loading && pierres.length === 0 && (
        <div className="text-center py-8 opacity-60">
          Aucune pierre disponible pour le moment.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {pierres.map(p => (
          <div
            key={p.id}
            className="rounded-xl overflow-hidden shadow-sm border"
            style={{ borderColor: 'var(--gold)', background: 'white' }}
          >
            {p.photos?.[0] ? (
              <img
                src={p.photos[0].url}
                alt={p.type}
                loading="lazy"
                className="w-full h-36 object-cover"
              />
            ) : (
              <div
                className="w-full h-36 flex items-center justify-center text-3xl"
                style={{ background: 'var(--green)' }}
              >
                💎
              </div>
            )}
            <div className="p-3">
              <p className="font-semibold text-sm" style={{ color: 'var(--green)' }}>
                {p.type}
              </p>
              {p.region && (
                <p className="text-xs opacity-60 mt-0.5">{p.region}</p>
              )}
              {p.poids_carats && (
                <p className="text-xs opacity-60">{p.poids_carats} ct</p>
              )}
              {p.prix_min && (
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--gold)' }}>
                  À partir de {p.prix_min.toLocaleString()} Ar
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 rounded-full text-white text-sm"
            style={{ background: 'var(--green)' }}
          >
            Voir plus
          </button>
        </div>
      )}
    </section>
  )
}
