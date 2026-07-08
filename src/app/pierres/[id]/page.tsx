'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Pierre = {
  id: string
  type: string
  region: string | null
  prix_min: number | null
  poids_carats: number | null
  description: string | null
  statut: string
  created_at: string
  photos: { url: string; ordre: number }[]
  vendeurs: {
    nom: string
    telephone: string | null
    region: string | null
  } | null
}

export default function PierrePage() {
  const { id } = useParams()
  const router = useRouter()
  const [pierre, setPierre] = useState<Pierre | null>(null)
  const [loading, setLoading] = useState(true)
  const [photoIdx, setPhotoIdx] = useState(0)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('pierres')
        .select('*, photos(url, ordre), vendeurs(nom, telephone, region)')
        .eq('id', id)
        .single()
      if (data) setPierre(data as Pierre)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <p style={{ color: 'var(--green)' }}>Chargement...</p>
    </div>
  )

  if (!pierre) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="text-center">
        <p className="text-xl mb-4">Pierre introuvable</p>
        <button onClick={() => router.push('/')} style={{ color: 'var(--green)' }}>← Retour</button>
      </div>
    </div>
  )

  const photos = pierre.photos?.sort((a, b) => a.ordre - b.ordre) || []
  const tel = pierre.vendeurs?.telephone?.replace(/\s/g, '') || ''
  const telWhatsApp = tel.startsWith('0') ? '261' + tel.slice(1) : tel

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'var(--green)' }}>
        <button onClick={() => router.push('/')}
          style={{ color: 'var(--cream)', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ←
        </button>
        <span style={{ color: 'var(--cream)', fontFamily: 'Playfair Display,serif', fontSize: '18px', fontWeight: 700 }}>
          {pierre.type}
        </span>
      </div>

      {/* Photos */}
      {photos.length > 0 ? (
        <div>
          <img
            src={photos[photoIdx]?.url}
            alt={pierre.type}
            style={{ width: '100%', height: '280px', objectFit: 'cover' }}
          />
          {photos.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', padding: '10px 16px', overflowX: 'auto' }}>
              {photos.map((p, i) => (
                <img
                  key={i}
                  src={p.url}
                  alt={`Photo ${i + 1}`}
                  onClick={() => setPhotoIdx(i)}
                  style={{
                    width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer',
                    border: photoIdx === i ? '2px solid var(--gold)' : '2px solid transparent',
                    flexShrink: 0
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: '100%', height: '220px', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
          💎
        </div>
      )}

      {/* Infos */}
      <div style={{ padding: '20px 16px' }}>

        {/* Prix */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '2px' }}>
              {pierre.type}
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>
              {pierre.region} {pierre.poids_carats && `· ${pierre.poids_carats} ct`}
            </p>
          </div>
          {pierre.prix_min && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gold)' }}>
                {pierre.prix_min.toLocaleString()} Ar
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        {pierre.description && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '14px', marginBottom: '16px', border: '1px solid rgba(201,162,39,0.2)' }}>
            <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', marginBottom: '4px', letterSpacing: '.5px' }}>DESCRIPTION</p>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333' }}>{pierre.description}</p>
          </div>
        )}

        {/* Vendeur */}
        {pierre.vendeurs && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '14px', marginBottom: '20px', border: '1px solid rgba(201,162,39,0.2)' }}>
            <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', marginBottom: '8px', letterSpacing: '.5px' }}>VENDEUR</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px' }}>
                {pierre.vendeurs.nom?.[0]?.toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--green)' }}>{pierre.vendeurs.nom}</p>
                {pierre.vendeurs.region && (
                  <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)' }}>{pierre.vendeurs.region}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Boutons contact */}
        {pierre.vendeurs?.telephone && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {/* WhatsApp */}
            
              href={`https://wa.me/${telWhatsApp}?text=Bonjour, je suis intéressé par votre ${pierre.type} sur MadaGem Connect.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: '#25D366', color: 'white', borderRadius: '12px', padding: '14px',
                fontWeight: 700, fontSize: '15px', textDecoration: 'none'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contacter sur WhatsApp
            </a>

            {/* Appel */}
            
              href={`tel:${tel}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'var(--green)', color: 'white', borderRadius: '12px', padding: '14px',
                fontWeight: 700, fontSize: '15px', textDecoration: 'none'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Appeler le vendeur
            </a>

          </div>
        )}

      </div>
    </div>
  )
}
