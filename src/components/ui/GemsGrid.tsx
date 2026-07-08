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
        <div className="text-center py-8" style={{ color: 'var(--green)' }}>Chargement...</div>
      )}

      {!loading && pierres.length === 0 && (
        <div className="text-center py-8 opacity-60">Aucune pierre disponible pour le moment.</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {pierres.map(p => {
          const tel = p.vendeurs?.telephone?.replace(/\s/g, '') || ''
          const wa = tel.startsWith('0') ? '261' + tel.slice(1) : tel
          const msg = encodeURIComponent('Bonjour, je suis interesse par votre ' + p.type + ' sur MadaGem Connect.')
          return (
            <div key={p.id} className="rounded-xl overflow-hidden shadow-sm border" style={{ borderColor: 'var(--gold)', background: 'white' }}>
              {p.photos?.[0] ? (
                <img src={p.photos[0].url} alt={p.type} loading="lazy" className="w-full h-36 object-cover"/>
              ) : (
                <div className="w-full h-36 flex items-center justify-center text-3xl" style={{ background: 'var(--green)' }}>
                  💎
                </div>
              )}
              <div className="p-3">
                <p className="font-semibold text-sm" style={{ color: 'var(--green)' }}>{p.type}</p>
                {p.region && <p className="text-xs opacity-60 mt-0.5">{p.region}</p>}
                {p.poids_carats && <p className="text-xs opacity-60">{p.poids_carats} ct</p>}
                {p.prix_min && (
                  <p className="text-sm font-bold mt-1" style={{ color: 'var(--gold)' }}>
                    {p.prix_min.toLocaleString()} Ar
                  </p>
                )}
                {tel && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    <a href={'https://wa.me/' + wa + '?text=' + msg} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'block', textAlign: 'center', padding: '6px', background: '#25D366', color: 'white', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                      WhatsApp
                    </a>
                    <a href={'tel:' + tel}
                      style={{ display: 'block', textAlign: 'center', padding: '6px', background: 'var(--green)', color: 'white', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                      Appeler
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button onClick={() => setPage(p => p + 1)} className="px-6 py-2 rounded-full text-white text-sm" style={{ background: 'var(--green)' }}>
            Voir plus
          </button>
        </div>
      )}
    </section>
  )
}
