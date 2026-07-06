import Navbar from '@/components/layout/Navbar'
import Carousel from '@/components/ui/Carousel'
import HeroBanner from '@/components/ui/HeroBanner'
import GemGrid from '@/components/ui/GemGrid'
import SubmitSection from '@/components/ui/SubmitSection'

const gemsDemo = [
  { id: '1', nom: 'Saphir Bleu Profond d\'Ilakaka', prix_ar: 12000000, prix_usd: 3100, poids: 2.4, origine: 'Ilakaka', type: 'Saphir Naturel', vendeur: 'Artisans d\'Ilakaka', note: 4.9, verifie: true },
  { id: '2', nom: 'Rubis Rouge Sang de Pigeon', prix_ar: 25000000, prix_usd: 6500, poids: 1.8, origine: 'Andilamena', type: 'Rubis Naturel', vendeur: 'Gems Madagascar', note: 4.7, verifie: true },
  { id: '3', nom: 'Tourmaline Verte Paraiba', prix_ar: 8000000, prix_usd: 2100, poids: 3.2, origine: 'Antsiranana', type: 'Tourmaline Naturelle', vendeur: 'MadaStones', note: 4.5, verifie: false },
  { id: '4', nom: 'Émeraude de Mananjary', prix_ar: 18000000, prix_usd: 4700, poids: 2.1, origine: 'Mananjary', type: 'Émeraude Naturelle', vendeur: 'Pierres Précieuses MG', note: 4.8, verifie: true },
  { id: '5', nom: 'Saphir Jaune Doré', prix_ar: 9500000, prix_usd: 2450, poids: 1.5, origine: 'Ilakaka', type: 'Saphir Naturel', vendeur: 'Artisans d\'Ilakaka', note: 4.6, verifie: true },
  { id: '6', nom: 'Alexandrite Rare de Bekily', prix_ar: 35000000, prix_usd: 9000, poids: 1.2, origine: 'Bekily', type: 'Alexandrite Naturelle', vendeur: 'Rare Gems MG', note: 5.0, verifie: true },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Carousel gems={gemsDemo} />
      <HeroBanner />
      <GemGrid gems={gemsDemo} />
      <SubmitSection />
    </main>
  )
}
