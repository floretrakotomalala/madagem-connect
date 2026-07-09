'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Pierre = {
  id: string
  type: string
  region: string | null
  prix_min: number | null
  statut: string
  created_at: string
}

export default function Dashboard() {
  const [pierres, setPierres] = useState<Pierre[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  async function loadData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }
    setUser(user)
    const { data } = await supabase
      .from('pierres')
      .select('id, type, region, prix_min, statut, created_at')
      .eq('vendeur_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setPierres(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function handleStatut(id: string, statut: string) {
    const supabase = createClient()
    await supabase.from('pierres').update({ statut }).eq('id', id)
    setPierres(p => p.map(x => x.id === id ? { ...x, statut } : x))
  }

  async function handleDelete(id: string) {
    setDeleting(id)
    const supabase = createClient()
    await supabase.from('photos').delete().eq('pierre_id', id)
    await supabase.from('pierres').delete().eq('id', id)
    setPierres(p => p.filter(x => x.id !== id))
    setDeleting(null)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <p style={{ color: 'var(--green)' }}>Chargement...</p>
    </div>
  )

  const actives = pierres.filter(p => p.statut === 'active').length
  const vendues = pierres.filter(p => p.statut === 'vendue').length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--green)' }}>
        <div>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>Mon espace</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href={"/admin?uid=" + user?.id} style={{ color: 'var(--gold)', border: '1px solid rgba(201,162,39,0.4)', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', textDecoration: 'none' }}>
            Admin
          </a>
          <button onClick={handleLogout}
            style={{ color: 'white', background: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer' }}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid rgba(201,162,39,0.2)' }}>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--green)' }}>{actives}</p>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)' }}>Annonces actives</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid rgba(201,162,39,0.2)' }}>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--gold)' }}>{vendues}</p>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)' }}>Pierres vendues</p>
          </div>
        </div>

        <a href="/#formulaire"
          style={{ display: 'block', textAlign: 'center', padding: '14px', background: 'var(--gold)', color: '#1a1000', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginBottom: '20px' }}>
          + Publier une nouvelle pierre
        </a>

        <h2 style={{ fontWeight: 700, color: 'var(--green)', marginBottom: '12px', fontSize: '16px' }}>Mes annonces</h2>

        {pierres.length === 0 && (
          <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.4)', padding: '32px 0', fontSize: '14px' }}>
            Aucune annonce pour le moment
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pierres.map(p => (
            <div key={p.id} style={{ background: 'white', borderRadius: '12px', padding: '14px', border: '1px solid rgba(201,162,39,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--green)', fontSize: '15px' }}>{p.type}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginTop: '2px' }}>
                    {p.region} {p.prix_min ? '· ' + p.prix_min.toLocaleString() + ' Ar' : ''}
                  </p>
                </div>
                <span style={{
                  fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 600,
                  background: p.statut === 'active' ? '#dcfce7' : p.statut === 'vendue' ? '#f3f4f6' : '#fef9c3',
                  color: p.statut === 'active' ? '#16a34a' : p.statut === 'vendue' ? '#6b7280' : '#ca8a04'
                }}>
                  {p.statut}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href={'/pierres/' + p.id}
                  style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--gold)', color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>
                  Voir
                </a>
                {p.statut === 'active' && (
                  <button onClick={() => handleStatut(p.id, 'vendue')}
                    style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1px solid #16a34a', color: '#16a34a', background: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Marquer vendue
                  </button>
                )}
                {p.statut === 'vendue' && (
                  <button onClick={() => handleStatut(p.id, 'active')}
                    style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--green)', color: 'var(--green)', background: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Remettre active
                  </button>
                )}
                <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                  style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1px solid #ef4444', color: '#ef4444', background: 'none', cursor: 'pointer', fontWeight: 600, opacity: deleting === p.id ? 0.5 : 1 }}>
                  {deleting === p.id ? '...' : 'Supprimer'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
