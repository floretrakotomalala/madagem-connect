'use client'
import { useState } from 'react'
import { useGems } from '@/hooks/useGems'

export default function GemsGrid() {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<any>(null)
  const { pierres, loading, hasMore } = useGems(page)

  function getTel(tel: string | null) {
    if (!tel) return ''
    return tel.replace(/\s/g, '')
  }

  function getWhatsApp(tel: string | null) {
    if (!tel) return ''
    const t = tel.replace(/\s/g, '')
    return t.startsWith('0') ? '261' + t.slice(1) : t
  }

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
        {pierres.map(p => (
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
              <button
                onClick={() => setSelected(p)}
                className="w-full mt-2 py-1.5 rounded-lg text-white text-xs font-semibold"
                style={{ background: 'var(--green)' }}
              >
                Contacter le vendeur
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button onClick={() => setPage(p => p + 1)} className="px-6 py-2 rounded-full text-white text-sm" style={{ background: 'var(--green)' }}>
            Voir plus
          </button>
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50, display: 'flex', alignItems: 'flex-end' }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px 20px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: '40px', height: '4px', background: '#ddd', borderRadius: '2px', margin: '0 auto 20px' }}/>
            <p style={{ fontFamily: 'Playfair Display,serif', fontSize: '18px', fontWeight: 700, color: 'var(--green)', marginBottom: '4px' }}>
              {selected.type}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)', marginBottom: '4px' }}>
              {selected.region}{selected.poids_carats ? ' · ' + selected.poids_carats + ' ct' : ''}
            </p>
            {selected.prix_min && (
              <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gold)', marginBottom: '16px' }}>
                {selected.prix_min.toLocaleString()} Ar
              </p>
            )}
            {selected.description && (
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: 1.6 }}>
                {selected.description}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
                href={'https://wa.me/' + getWhatsApp(selected.vendeurs?.telephone) + '?text=Bonjour, je suis interesse par votre ' + selected.type + ' sur MadaGem Connect.'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25D366', color: 'white', borderRadius: '12px', padding: '14px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
              >
                WhatsApp
              </a>
              
                href={'tel:' + getTel(selected.vendeurs?.telephone)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--green)', color: 'white', borderRadius: '12px', padding: '14px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
              >
                Appeler le vendeur
              </a>
            </div>
            <button onClick={() => setSelected(null)} style={{ width: '100%', marginTop: '12px', padding: '12px', background: 'none', border: '1px solid #ddd', borderRadius: '12px', fontSize: '14px', color: '#999', cursor: 'pointer' }}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
