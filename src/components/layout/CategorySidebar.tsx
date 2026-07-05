'use client'
import Link from 'next/link'

const categories = [
  { name: 'Saphires', emoji: '💎', href: '/pierres/saphirs' },
  { name: 'Rubies', emoji: '🔴', href: '/pierres/rubis' },
  { name: 'Tourmalines', emoji: '💠', href: '/pierres/tourmalines' },
  { name: 'Émeralds', emoji: '💚', href: '/pierres/emeraudes' },
  { name: 'Coneur', emoji: '🔵', href: '/pierres/coneur' },
  { name: 'Autres', emoji: '✨', href: '/pierres/autres' },
]

export default function CategorySidebar() {
  return (
    <aside className="w-24 flex flex-col items-center gap-4 py-6 bg-white border-r border-gray-100 min-h-screen">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="text-3xl">{cat.emoji}</div>
          <span className="text-xs text-gray-600 group-hover:text-green-700 font-medium text-center">
            {cat.name}
          </span>
        </Link>
      ))}
    </aside>
  )
}
