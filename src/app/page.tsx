import Navbar from '@/components/layout/Navbar'
import CategorySidebar from '@/components/layout/CategorySidebar'
import HeroBanner from '@/components/ui/HeroBanner'
import GemCard from '@/components/ui/GemCard'

const gemsDemo = [
  { id: '1', nom: 'Saphir Bleu Profond d\'Ilakaka', prix_ar: 12000000, prix_usd: 3100, poids: 2.4, origine: 'Ilakaka, Madagascar', type: 'Saphir Naturel', vendeur: 'Artisans d\'Ilakaka', note: 4.9, verifie: true },
  { id: '2', nom: 'Rubis Rouge Sang de Pigeon', prix_ar: 25000000, prix_usd: 6500, poids: 1.8, origine: 'Andilamena, Madagascar', type: 'Rubis Naturel', vendeur: 'Gems Madagascar', note: 4.7, verifie: true },
  { id: '3', nom: 'Tourmaline Verte Paraiba', prix_ar: 8000000, prix_usd: 2100, poids: 3.2, origine: 'Antsiranana, Madagascar', type: 'Tourmaline Naturelle', vendeur: 'MadaStones', note: 4.5, verifie: false },
  { id: '4', nom: 'Émeraude Naturelle', prix_ar: 18000000, prix_usd: 4700, poids: 2.1, origine: 'Mananjary, Madagascar', type: 'Émeraude Naturelle', vendeur: 'Pierres Précieuses MG', note: 4.8, verifie: true },
  { id: '5', nom: 'Saphir Jaune Doré', prix_ar: 9500000, prix_usd: 2450, poids: 1.5, origine: 'Ilakaka, Madagascar', type: 'Saphir Naturel', vendeur: 'Artisans d\'Ilakaka', note: 4.6, verifie: true },
  { id: '6', nom: 'Alexandrite Rare', prix_ar: 35000000, prix_usd: 9000, poids: 1.2, origine: 'Bekily, Madagascar', type: 'Alexandrite Naturelle', vendeur: 'Rare Gems MG', note: 5.0, verifie: true },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroBanner />
      <div className="flex">
        <CategorySidebar />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Annonces récentes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gemsDemo.map(gem => (
              <GemCard key={gem.id} {...gem} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
