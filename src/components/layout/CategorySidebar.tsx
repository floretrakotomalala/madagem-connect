'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { name: 'Saphirs', emoji: '💎', href: '/pierres/saphirs', color: 'bg-blue-50 text-blue-700' },
  { name: 'Rubis', emoji: '❤️', href: '/pierres/rubis', color: 'bg-red-50 text-red-700' },
  { name: 'Tourmalines', emoji: '💠', href: '/pierres/tourmalines', color: 'bg-teal-50 text-teal-700' },
  { name: 'Émeraudes', emoji: '💚', href: '/pierres/emeraudes', color: 'bg-green-50 text-green-700' },
  { name: 'Coneur', emoji: '🔵', href: '/pierres/coneur', color: 'bg-indigo-50 text-indigo-700' },
  { name: 'Alexandrite', emoji: '🔮', href: '/pierres/alexandrite', color: 'bg-purple-50 text-purple-700' },
  { name: 'Autres', emoji: '✨', href: '/pierres/autres', color: 'bg-yellow-50 text-yellow-700' },
]

export default function CategorySidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-20 md:w-24 flex flex-col items-center gap-2 py-6 bg-white border-r border-gray-100 min-h-screen sticky top-16 self-start">
      <p className="text-gray-300 text-xs font-bold uppercase tracking-widest mb-2" style={{writingMode:'vertical-rl', transform:'rotate(180deg)'}}>Catégories</p>
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl w-16 transition-all hover:scale-105 ${pathname === cat.href ? cat.color + ' shadow-sm' : 'hover:bg-gray-50'}`}
        >
          <span className="text-2xl">{cat.emoji}</span>
          <span className="text-xs text-gray-600 font-medium text-center leading-tight">{cat.name}</span>
        </Link>
      ))}
    </aside>
  )
}
