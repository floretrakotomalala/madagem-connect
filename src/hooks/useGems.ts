import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export type Pierre = {
  id: string
  type: string
  region: string | null
  prix_min: number | null
  poids_carats: number | null
  description: string | null
  photos: { url: string; ordre: number }[]
  vendeurs: { nom: string; telephone: string | null } | null
}

export function useGems(page = 0) {
  const [pierres, setPierres] = useState<Pierre[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const PAGE_SIZE = 12

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('pierres')
        .select('id, type, region, prix_min, poids_carats, description, photos(url, ordre), vendeurs(nom, telephone)')
        .eq('statut', 'active')
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

      if (!error && data) {
        setPierres(data as Pierre[])
        setHasMore(data.length === PAGE_SIZE)
      }
      setLoading(false)
    }
    fetch()
  }, [page])

  return { pierres, loading, hasMore }
}
