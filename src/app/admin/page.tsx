'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Vendeur = {
  id: string
  nom: string
  telephone: string | null
  region: string | null
  banni: boolean
  raison_ban: string | null
  created_at: string
}

type Pierre = {
  id: string
  type: string
  region: string | null
  prix_min: number | null
  statut: string
  signalements: number
  verifie: boolean
  created_at: string
  vendeurs: { nom: string; telephone: string | null } | null
}

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState('pierres')
  const [pierres, setPierres] = useState<Pierre[]>([])
  const [vendeurs, setVendeurs] = useState<Vendeur[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [raison, setRaison] = useState('')
  const [banTarget, setBanTarget] = useState<string | null>(null)

  useEffect(() => {
    async function check() {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession(); const user = session?.user
      if (!user) { router.push('/auth'); return }
      const ADMIN_IDS = ["2903a1ce-43f7-4752-ac22-b6403f628182"]; const admin = ADMIN_IDS.includes(user.id) ? { id: user.id } : null
      if (!admin) { router.push('/'); return }
      setIsAdmin(true)
      await loadData()
    }
    check()
  }, [])

  async function loadData() {
    const supabase = createClient()
    const { data: p } = await supabase
      .from('pierres')
      .select('id, type, region, prix_min, statut, signalements, verifie, created_at, vendeurs(nom, telephone)')
      .order('created_at', { ascending: false })
    if (p) setPierres(p as Pierre[])

    const { data: v } = await supabase
      .from('vendeurs')
      .select('id, nom, telephone, region, banni, raison_ban, created_at')
      .order('created_at', { ascending: false })
    if (v) setVendeurs(v as Vendeur[])
    setLoading(false)
  }

  async function supprimerPierre(id: string) {
    const supabase = createClient()
    await supabase.from('photos').delete().eq('pierre_id', id)
    await supabase.from('pierres').delete().eq('id', id)
    setPierres(p => p.filter(x => x.id !== id))
  }

  async function verifierPierre(id: string, val: boolean) {
    const supabase = createClient()
    await supabase.from('pierres').update({ verifie: val }).eq('id', id)
    setPierres(p => p.map(x => x.id === id ? { ...x, verifie: val } : x))
  }

  async function changerStatut(id: string, statut: string) {
    const supabase = createClient()
    await supabase.from('pierres').update({ statut }).eq('id', id)
    setPierres(p => p.map(x => x.id === id ? { ...x, statut } : x))
  }

  async function bannirVendeur(id: string) {
    const supabase = createClient()
    await supabase.from('vendeurs').update({ banni: true, raison_ban: raison }).eq('id', id)
    await supabase.from('pierres').update({ statut: 'archivee' }).eq('vendeur_id', id)
    setVendeurs(v => v.map(x => x.id === id ? { ...x, banni: true, raison_ban: raison } : x))
    setBanTarget(null)
    setRaison('')
  }

  async function debannirVendeur(id: string) {
    const supabase = createClient()
    await supabase.from('vendeurs').update({ banni: false, raison_ban: null }).eq('id', id)
    setVendeurs(v => v.map(x => x.id === id ? { ...x, banni: false, raison_ban: null } : x))
  }

  if (loading || !isAdmin) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117' }}>
      <p style={{ color: 'white' }}>Vérification...</p>
    </div>
  )

  const signales = pierres.filter(p => p.signalements > 0)
  const bannis = vendeurs.filter(v => v.banni)

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: 'white' }}>
      <div style={{ padding: '16px 20px', background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>MadaGem Admin</h1>
          <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '2px' }}>Panneau de contrôle</p>
        </div>
        <a href="/" style={{ fontSize: '12px', color: '#58a6ff', textDecoration: 'none' }}>Voir le site</a>
      </div>

      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: '1px solid #30363d' }}>
            <p style={{ fontSize: '24px', fontWeight: 700, color: '#58a6ff' }}>{pierres.length}</p>
            <p style={{ fontSize: '11px', color: '#8b949e' }}>Pierres</p>
          </div>
          <div style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: '1px solid #30363d' }}>
            <p style={{ fontSize: '24px', fontWeight: 700, color: '#3fb950' }}>{vendeurs.length}</p>
            <p style={{ fontSize: '11px', color: '#8b949e' }}>Vendeurs</p>
          </div>
          <div style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: '1px solid #30363d' }}>
            <p style={{ fontSize: '24px', fontWeight: 700, color: '#f85149' }}>{signales.length}</p>
            <p style={{ fontSize: '11px', color: '#8b949e' }}>Signalés</p>
          </div>
          <div style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: '1px solid #30363d' }}>
            <p style={{ fontSize: '24px', fontWeight: 700, color: '#d29922' }}>{bannis.length}</p>
            <p style={{ fontSize: '11px', color: '#8b949e' }}>Bannis</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
          {['pierres', 'vendeurs', 'signales'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                background: tab === t ? '#238636' : '#21262d', color: tab === t ? 'white' : '#8b949e' }}>
              {t === 'pierres' ? 'Pierres' : t === 'vendeurs' ? 'Vendeurs' : 'Signalés'}
            </button>
          ))}
        </div>

        {tab === 'pierres' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pierres.map(p => (
              <div key={p.id} style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: '1px solid #30363d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <p style={{ fontWeight: 600, color: '#f0f6fc' }}>{p.type}</p>
                      {p.verifie && <span style={{ fontSize: '10px', background: '#1f6feb', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>✓ Vérifié</span>}
                      {p.signalements > 0 && <span style={{ fontSize: '10px', background: '#da3633', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>{p.signalements} signalement{p.signalements > 1 ? 's' : ''}</span>}
                    </div>
                    <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '2px' }}>
                      {p.region} · {p.vendeurs?.nom} · {p.prix_min?.toLocaleString()} Ar
                    </p>
                  </div>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '10px', background: p.statut === 'active' ? '#1a4731' : '#21262d', color: p.statut === 'active' ? '#3fb950' : '#8b949e' }}>
                    {p.statut}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <a href={'/pierres/' + p.id} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #30363d', color: '#58a6ff', textDecoration: 'none' }}>
                    Voir
                  </a>
                  <button onClick={() => verifierPierre(p.id, !p.verifie)}
                    style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #1f6feb', color: '#58a6ff', background: 'none', cursor: 'pointer' }}>
                    {p.verifie ? 'Retirer vérif.' : 'Vérifier'}
                  </button>
                  {p.statut === 'active' && (
                    <button onClick={() => changerStatut(p.id, 'archivee')}
                      style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #d29922', color: '#d29922', background: 'none', cursor: 'pointer' }}>
                      Archiver
                    </button>
                  )}
                  {p.statut === 'archivee' && (
                    <button onClick={() => changerStatut(p.id, 'active')}
                      style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #3fb950', color: '#3fb950', background: 'none', cursor: 'pointer' }}>
                      Réactiver
                    </button>
                  )}
                  <button onClick={() => supprimerPierre(p.id)}
                    style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #da3633', color: '#f85149', background: 'none', cursor: 'pointer' }}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'vendeurs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {vendeurs.map(v => (
              <div key={v.id} style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: v.banni ? '1px solid #da3633' : '1px solid #30363d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <p style={{ fontWeight: 600, color: '#f0f6fc' }}>{v.nom}</p>
                      {v.banni && <span style={{ fontSize: '10px', background: '#da3633', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>BANNI</span>}
                    </div>
                    <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '2px' }}>
                      {v.telephone} · {v.region}
                    </p>
                    {v.raison_ban && (
                      <p style={{ fontSize: '11px', color: '#f85149', marginTop: '4px' }}>Raison: {v.raison_ban}</p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {!v.banni ? (
                    banTarget === v.id ? (
                      <div style={{ width: '100%' }}>
                        <input value={raison} onChange={e => setRaison(e.target.value)} placeholder="Raison du bannissement..."
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #30363d', background: '#0d1117', color: 'white', fontSize: '12px', marginBottom: '6px', boxSizing: 'border-box' }}/>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => bannirVendeur(v.id)}
                            style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', background: '#da3633', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                            Confirmer bannissement
                          </button>
                          <button onClick={() => setBanTarget(null)}
                            style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #30363d', color: '#8b949e', background: 'none', cursor: 'pointer' }}>
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setBanTarget(v.id)}
                        style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #da3633', color: '#f85149', background: 'none', cursor: 'pointer' }}>
                        Bannir
                      </button>
                    )
                  ) : (
                    <button onClick={() => debannirVendeur(v.id)}
                      style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #3fb950', color: '#3fb950', background: 'none', cursor: 'pointer' }}>
                      Débannir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'signales' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {signales.length === 0 && (
              <p style={{ textAlign: 'center', color: '#8b949e', padding: '32px 0' }}>Aucun signalement pour le moment</p>
            )}
            {signales.map(p => (
              <div key={p.id} style={{ background: '#161b22', borderRadius: '10px', padding: '14px', border: '1px solid #da3633' }}>
                <p style={{ fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>{p.type}</p>
                <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>{p.vendeurs?.nom} · {p.signalements} signalement{p.signalements > 1 ? 's' : ''}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <a href={'/pierres/' + p.id} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', border: '1px solid #30363d', color: '#58a6ff', textDecoration: 'none' }}>
                    Voir
                  </a>
                  <button onClick={() => supprimerPierre(p.id)}
                    style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px', background: '#da3633', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
