'use client'
import { useState } from 'react'
import { useSearch } from '@/hooks/useSearch'

const PIERRES = ['Alexandrite','Aigue-marine','Amethyste','Beryl','Diamant','Emeraude','Grenat','Kunzite','Labradorite','Morganite','Opale','Peridot','Rubis','Saphir','Spinelle','Tanzanite','Topaze','Tourmaline','Zircon','Autre']
const REGIONS = ['Ambatondrazaka','Andilamena','Antananarivo','Fianarantsoa','Ilakaka','Mahajanga','Mananjary','Moramanga','Nosy Be','Toamasina','Toliara','Autre']

export default function GemsGrid() {
  const [page, setPage] = useState(0)
  const [type, setType] = useState('')
  const [region, setRegion] = useState('')
  const { pierres, loading, hasMore } = useSearch(type, region, page)

  function handleFilter(newType: string, newRegion: string) {
    setPage(0)
    setType(newType)
    setRegion(newRegion)
  }

  return (
    <section className="py-12 px-4" style={{ background: 'var(--cream)' }}>
      <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: 'var(--green)' }}>
        Pierres disponibles
      </h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        <select value={type} onChange={e => handleFilter(e.target.value, region)}
          style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--gold)', background: 'white', fontSize: '13px', color: 'var(--green)', outline: 'none', cursor: 'pointer', flexShrink: 0 }}>
          <option value="">Tous les types</option>
          {PIERRES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={region} onChange={e => handleFilter(type, e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--gold)', background: 'white', fontSize: '13px', color: 'var(--green)', outline: 'none', cursor: 'pointer', flexShrink: 0 }}>
          <option value="">Toutes les regions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {(type || region) && (
          <button onClick={() => handleFilter('', '')}
            style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid #ddd', background: 'white', fontSize: '13px', color: '#999', cursor: 'pointer', flexShrink: 0 }}>
            Effacer
          </button>
        )}
      </div>

      {loading && page === 0 && (
        <div className="text-center py-8" style={{ color: 'var(--green)' }}>Chargement...</div>
      )}

      {!loading && pierres.length === 0 && (
        <div className="text-center py-8 opacity-60">Aucune pierre disponible.</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {pierres.map(p => {
          const tel = p.vendeurs?.telephone?.replace(/[^0-9]/g, '') || ''
          const wa = tel.startsWith('0') ? '261' + tel.slice(1) : tel
          const msg = encodeURIComponent('Bonjour, je suis interesse par votre ' + p.type + ' sur MadaGem Connect.')
          return (
            <div key={p.id} className="rounded-xl overflow-hidden shadow-sm border" style={{ borderColor: 'var(--gold)', background: 'white' }}>
              <a href={'/pierres/' + p.id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {p.photos && p.photos[0] ? (
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
                </div>
              </a>
              {tel && (
                <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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

      {loading && page > 0 && (
        <div className="text-center py-4" style={{ color: 'var(--green)' }}>Chargement...</div>
      )}
    </section>
  )
}
