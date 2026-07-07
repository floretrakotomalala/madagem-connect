'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://madagem-connect.vercel.app/dashboard'
      }
    })
    setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--cream)' }}>
      <div className="text-center">
        <div className="text-4xl mb-4">📧</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--green)' }}>
          Vérifie ton email
        </h2>
        <p className="opacity-60">Lien de connexion envoyé à <strong>{email}</strong></p>
        <p className="text-sm mt-2 opacity-40">Tu peux fermer cette page</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--cream)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💎</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--green)' }}>
            Espace vendeur
          </h1>
          <p className="text-sm opacity-60 mt-1">
            Reçois un lien de connexion par email
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border"
          style={{ borderColor: 'var(--gold)' }}>
          <label className="block text-sm font-medium mb-2"
            style={{ color: 'var(--green)' }}>
            Adresse email
          </label>
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full border rounded-xl px-4 py-3 mb-4 text-sm outline-none"
            style={{ borderColor: 'var(--gold)' }}
          />
          <button
            onClick={handleLogin}
            disabled={loading || !email}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-50"
            style={{ background: 'var(--green)' }}
          >
            {loading ? 'Envoi...' : 'Recevoir le lien'}
          </button>
        </div>

        <p className="text-center text-xs opacity-40 mt-4">
          Pas de mot de passe — connexion sécurisée par email
        </p>
      </div>
    </div>
  )
}
