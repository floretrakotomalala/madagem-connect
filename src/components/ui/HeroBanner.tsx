'use client'

export default function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden" style={{background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 40%, #0d3320 70%, #071a0f 100%)', minHeight: '220px'}}>
      
      {/* Cercles décoratifs */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{background: 'radial-gradient(circle, #DAA520, transparent)'}} />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10" style={{background: 'radial-gradient(circle, #4ade80, transparent)'}} />
      
      {/* Pierres décoratives flottantes */}
      <div className="absolute top-4 right-4 text-4xl opacity-30 rotate-12">💎</div>
      <div className="absolute bottom-4 right-16 text-3xl opacity-20 -rotate-12">🔴</div>
      <div className="absolute top-8 right-24 text-2xl opacity-25 rotate-6">💚</div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-300 text-xs font-medium tracking-wider">MADAGASCAR • AUTHENTIQUE • CERTIFIÉ</span>
        </div>
        
        <h1 className="text-white font-black text-2xl md:text-4xl uppercase leading-tight mb-2">
          Trouvez des pierres précieuses
        </h1>
        <h1 className="font-black text-2xl md:text-4xl uppercase leading-tight mb-4" style={{color: '#DAA520'}}>
          authentiques à Madagascar.
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-md">
          Inspectez en personne avant d'acheter. Vendeurs vérifiés. Certificats authentiques.
        </p>

        <div className="flex items-center gap-6 mt-6">
          <div className="text-center">
            <div className="text-white font-black text-xl">500+</div>
            <div className="text-gray-400 text-xs">Annonces</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center">
            <div className="text-white font-black text-xl">120+</div>
            <div className="text-gray-400 text-xs">Vendeurs vérifiés</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center">
            <div className="text-white font-black text-xl">15+</div>
            <div className="text-gray-400 text-xs">Types de pierres</div>
          </div>
        </div>
      </div>

    </div>
  )
}
