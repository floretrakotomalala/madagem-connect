'use client'

export default function HeroBanner() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      
      {/* Overlay texture */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Contenu */}
      <div className="relative z-10">
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wide">
          Trouvez des pierres précieuses
        </h1>
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wide text-yellow-400">
          authentiques à Madagascar.
        </h1>
        <p className="mt-2 text-gray-300 text-sm md:text-base">
          Inspectez en personne avant d'acheter.
        </p>
      </div>

    </div>
  )
}
