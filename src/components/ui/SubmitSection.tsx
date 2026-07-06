'use client'
import Link from 'next/link'

export default function SubmitSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mb-8">
      <div className="relative overflow-hidden rounded-3xl" style={{background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 50%, #071a0f 100%)'}}>
        
        {/* Décorations */}
        <div className="absolute top-0 right-0 text-8xl opacity-10 -rotate-12 translate-x-4 -translate-y-2">💎</div>
        <div className="absolute bottom-0 left-0 text-6xl opacity-10 rotate-12 -translate-x-2 translate-y-2">🔮</div>

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1 mb-3">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Vendeurs</span>
              </div>
              <h2 className="text-white font-black text-2xl md:text-3xl mb-2">
                Vous avez une pierre à vendre ?
              </h2>
              <p className="text-gray-400 text-sm max-w-md">
                Soumettez votre offre gratuitement. Rejoignez plus de 120 vendeurs vérifiés sur MadaGem Connect.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300 text-xs">Gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300 text-xs">Visible immédiatement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300 text-xs">Acheteurs internationaux</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/soumettre" className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-white font-black py-4 px-8 rounded-2xl text-base transition-all shadow-lg hover:shadow-yellow-500/25 hover:scale-105">
                ✦ Soumettre une offre
              </Link>
              <Link href="/connexion" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-2xl text-sm transition-all border border-white/20">
                Créer un compte vendeur
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
