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
  vendeurs: { nom: string; telephone: string | null; region: string | null } | null
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
      const { data } = await supabase
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <p style={{ color: 'var(--green)' }}>Chargement...</p>
    </div>
  )

  if (!pierre) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '18px', marginBottom: '16px' }}>Pierre introuvable</p>
        <button onClick={() => router.push('/')} style={{ color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
          Retour
        </button>
      </div>
    </div>
  )

  const photos = pierre.photos?.sort((a, b) => a.ordre - b.ordre) || []
  const tel = pierre.vendeurs?.telephone?.replace(/\s/g, '') || ''
  const wa = tel.startsWith('0') ? '261' + tel.slice(1) : tel
  const msg = encodeURIComponent('Bonjour, je suis interesse par votre ' + pierre.type + ' sur MadaGem Connect.')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--green)' }}>
        <button onClick={() => router.push('/')} style={{ color: 'var(--cream)', fontSize: '22px', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>
          ←
        </button>
        <span style={{ color: 'var(--cream)', fontFamily: 'Playfair Display,serif', fontSize: '18px', fontWeight: 700 }}>
          {pierre.type}
        </span>
      </div>

      {photos.length > 0 ? (
        <div>
          <img src={photos[photoIdx]?.url} alt={pierre.type} style={{ width: '100%', height: '280px', objectFit: 'cover' }}/>
          {photos.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', padding: '10px 16px', overflowX: 'auto' }}>
              {photos.map((p, i) => (
                <img key={i} src={p.url} alt={"photo " + (i+1)} onClick={() => setPhotoIdx(i)}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', flexShrink: 0, border: photoIdx === i ? '2px solid var(--gold)' : '2px solid transparent' }}/>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: '100%', height: '220px', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
          💎
        </div>
      )}

      <div style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '24px', fontWeight: 700, color: 'var(--green)', marginBottom: '4px' }}>
              {pierre.type}
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>
              {pierre.region}{pierre.poids_carats ? ' · ' + pierre.poids_carats + ' ct' : ''}
            </p>
          </div>
          {pierre.prix_min && (
            <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gold)' }}>
              {pierre.prix_min.toLocaleString()} Ar
            </p>
          )}
        </div>

        {pierre.description && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '14px', marginBottom: '16px', border: '1px solid rgba(201,162,39,0.2)' }}>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginBottom: '6px', letterSpacing: '.5px' }}>DESCRIPTION</p>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#333' }}>{pierre.description}</p>
          </div>
        )}

        {pierre.vendeurs && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '14px', marginBottom: '20px', border: '1px solid rgba(201,162,39,0.2)' }}>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginBottom: '8px', letterSpacing: '.5px' }}>VENDEUR</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>
                {pierre.vendeurs.nom?.[0]?.toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--green)' }}>{pierre.vendeurs.nom}</p>
                {pierre.vendeurs.region && (
                  <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>{pierre.vendeurs.region}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {tel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href={'https://wa.me/' + wa + '?text=' + msg} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#25D366', color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
              Contacter sur WhatsApp
            </a>
            <a href={'tel:' + tel}
              style={{ display: 'block', textAlign: 'center', padding: '14px', background: 'var(--green)', color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
              Appeler le vendeur
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
