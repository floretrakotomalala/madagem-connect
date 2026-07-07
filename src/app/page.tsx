import Navbar from '@/components/layout/Navbar'
import HeroBanner from '@/components/ui/HeroBanner'
import StatsBar from '@/components/ui/StatsBar'
import FeaturedGem from '@/components/ui/FeaturedGem'
import GemsGrid from '@/components/ui/GemsGrid'
import SubmitSection from '@/components/ui/SubmitSection'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroBanner />
      <StatsBar />
      <FeaturedGem />
      <GemsGrid />
      <div style={{height:'1px',background:'linear-gradient(90deg,transparent,rgba(201,162,39,0.35),transparent)',margin:'6px 0'}}/>
      <SubmitSection />
      <Footer />
    </main>
  )
}
