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
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)

      const { data } = await supabase
        .from('pierres')
        .select('id, type, region, prix_min, statut, created_at')
        .eq('vendeur_id', user.id)
        .order('created_at', { ascending: false })

      if (data) setPierres(data)
      setLoading(false)
    }
    load()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--cream)' }}>
      <p style={{ color: 'var(--green)' }}>Chargement...</p>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between"
        style={{ background: 'var(--green)' }}>
        <div>
          <h1 className="text-white font-bold">Mon espace</h1>
          <p className="text-xs opacity-60 text-white">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-white opacity-60 border border-white/30 px-3 py-1 rounded-full"
        >
          Déconnexion
        </button>
      </div>

      <div className="px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--gold)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--green)' }}>
              {pierres.filter(p => p.statut === 'active').length}
            </p>
            <p className="text-xs opacity-60">Annonces actives</p>
          </div>
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--gold)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>
              {pierres.filter(p => p.statut === 'vendue').length}
            </p>
            <p className="text-xs opacity-60">Pierres vendues</p>
          </div>
        </div>

        {/* Bouton publier */}
        <a href="/#soumettre"
          className="block w-full text-center py-3 rounded-xl text-white font-semibold mb-6"
          style={{ background: 'var(--gold)' }}>
          + Publier une nouvelle pierre
        </a>

        {/* Liste des pierres */}
        <h2 className="font-bold mb-3" style={{ color: 'var(--green)' }}>
          Mes annonces
        </h2>

        {pierres.length === 0 ? (
          <p className="text-center opacity-40 py-8 text-sm">
            Aucune annonce pour le moment
          </p>
        ) : (
          <div className="space-y-3">
            {pierres.map(p => (
              <div key={p.id} className="bg-white rounded-xl p-4 border"
                style={{ borderColor: 'var(--gold)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--green)' }}>
                      {p.type}
                    </p>
                    <p className="text-xs opacity-50">{p.region} · {p.prix_min?.toLocaleString()} Ar</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    p.statut === 'active'
                      ? 'bg-green-100 text-green-700'
                      : p.statut === 'vendue'
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {p.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
