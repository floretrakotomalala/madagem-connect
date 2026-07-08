import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Pierre } from './useGems'

export function useSearch(type: string, region: string, page: number) {
  const [pierres, setPierres] = useState<Pierre[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const PAGE_SIZE = 12

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const supabase = createClient()
      let query = supabase
        .from('pierres')
        .select('id, type, region, prix_min, poids_carats, description, photos(url, ordre), vendeurs(nom, telephone)')
        .eq('statut', 'active')
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

      if (type) query = query.eq('type', type)
      if (region) query = query.eq('region', region)

      const { data, error } = await query
      if (!error && data) {
        if (page === 0) setPierres(data as Pierre[])
        else setPierres(p => [...p, ...data as Pierre[]])
        setHasMore(data.length === PAGE_SIZE)
      }
      setLoading(false)
    }
    fetch()
  }, [type, region, page])

  return { pierres, loading, hasMore }
}
