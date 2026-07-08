'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const PIERRES = ['Alexandrite','Aigue-marine','Améthyste','Béryl','Diamant','Émeraude','Grenat','Kunzite','Labradorite','Morganite','Opale','Péridot','Rubis','Saphir','Spinelle','Tanzanite','Topaze','Tourmaline','Zircon','Autre']
const REGIONS = ['Ambatondrazaka','Andilamena','Antananarivo','Betafo · Antsirabe','Fianarantsoa','Ilakaka','Mahajanga','Mananjary','Moramanga','Nosy Be','Toamasina','Toliara','Autre']

export default function SubmitSection() {
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  const [form, setForm] = useState({
    type: '', poids: '', prix: '', region: '',
    description: '', nom: '', telephone: '', email: ''
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setUserId(data.session.user.id)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handlePhotos(files: FileList | null) {
    if (!files) return
    const newFiles = Array.from(files).slice(0, 5 - photos.length)
    const all = [...photos, ...newFiles].slice(0, 5)
    setPhotos(all)
    all.forEach((f, i) => {
      if (previews[i]) return
      const r = new FileReader()
      r.onload = e => setPreviews(p => { const n = [...p]; n[i] = e.target?.result as string; return n })
      r.readAsDataURL(f)
    })
  }

  function removePhoto(i: number) {
    setPhotos(p => p.filter((_, idx) => idx !== i))
    setPreviews(p => p.filter((_, idx) => idx !== i))
  }

  async function handleSubmit() {
    setError('')
    if (!form.type || !form.poids || !form.prix || !form.region || !form.nom || !form.telephone) {
      setError('Merci de remplir tous les champs obligatoires *')
      return
    }

    if (!userId) {
      setError('Tu dois être connecté pour publier. Va sur /auth pour te connecter.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    try {
      await supabase.from('vendeurs').upsert({
        id: userId,
        nom: form.nom,
        telephone: form.telephone,
        region: form.region
      }, { onConflict: 'id' })

      const { data: pierre, error: pierreErr } = await supabase
        .from('pierres')
        .insert({
          vendeur_id: userId,
          type: form.type,
          poids_carats: parseFloat(form.poids),
          prix_min: parseInt(form.prix.replace(/\s/g, '')),
          region: form.region,
          description: form.description,
          statut: 'active'
        })
        .select('id')
        .single()

      if (pierreErr) throw pierreErr

      for (let i = 0; i < photos.length; i++) {
        const file = photos[i]
        const ext = file.name.split('.').pop()
        const path = `${pierre.id}/${Date.now()}-${i}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('photos-pierres')
          .upload(path, file, { cacheControl: '3600' })
        if (!upErr) {
          const { data: urlData } = supabase.storage
            .from('photos-pierres')
            .getPublicUrl(path)
          await supabase.from('photos').insert({
            pierre_id: pierre.id,
            url: urlData.publicUrl,
            ordre: i
          })
        }
      }

      setSuccess(true)
      setForm({ type:'', poids:'', prix:'', region:'', description:'', nom:'', telephone:'', email:'' })
      setPhotos([])
      setPreviews([])

    } catch (e: any) {
      setError('Erreur lors de la soumission. Réessaie.')
    }

    setLoading(false)
  }

  const inp = {width:'100%',background:'rgba(255,255,255,0.09)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'11px 13px',fontSize:'14px',color:'var(--cream)',fontFamily:'Inter,sans-serif',outline:'none'} as React.CSSProperties
  const lbl = {display:'block',fontSize:'12px',color:'rgba(250,250,247,0.7)',marginBottom:'6px',letterSpacing:'.4px'} as React.CSSProperties

  if (success) return (
    <section id="formulaire" style={{background:'var(--green)',padding:'30px 20px'}}>
      <div style={{textAlign:'center',padding:'40px 0'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>✅</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'22px',color:'var(--cream)',marginBottom:'8px'}}>
          Annonce publiée !
        </div>
        <p style={{color:'rgba(250,250,247,0.6)',fontSize:'14px',marginBottom:'24px'}}>
          Ta pierre est maintenant visible sur MadaGem Connect
        </p>
        <button onClick={() => setSuccess(false)}
          style={{background:'var(--gold)',color:'#1a1000',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:700,cursor:'pointer'}}>
          Publier une autre pierre
        </button>
      </div>
    </section>
  )

  return (
    <section id="formulaire" style={{background:'var(--green)',padding:'30px 20px'}}>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700,color:'var(--cream)',marginBottom:'3px'}}>
        Soumettre une offre
      </div>
      <p style={{color:'rgba(250,250,247,0.5)',fontSize:'13px',marginBottom:'20px'}}>
        Vendeur ? Publiez votre pierre en 2 minutes.
      </p>

      {!userId && (
        <div style={{background:'rgba(201,162,39,0.15)',border:'1px solid rgba(201,162,39,0.3)',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',fontSize:'13px',color:'var(--gold)'}}>
          <a href="/auth" style={{color:'var(--gold)',fontWeight:700}}>Connecte-toi</a> pour publier ton annonce
        </div>
      )}

      {error && (
        <div style={{background:'rgba(255,100,100,0.15)',border:'1px solid rgba(255,100,100,0.3)',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',fontSize:'13px',color:'#ffaaaa'}}>
          {error}
        </div>
      )}

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Type de pierre *</label>
        <select name="type" value={form.type} onChange={handleChange} style={{...inp,cursor:'pointer'}}>
          <option value="">Sélectionner une pierre</option>
          {PIERRES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
        <div>
          <label style={lbl}>Poids (carats) *</label>
          <input style={inp} name="poids" value={form.poids} onChange={handleChange} type="number" placeholder="ex : 2,5" min="0.1" step="0.1"/>
        </div>
        <div>
          <label style={lbl}>Prix (Ar) *</label>
          <input style={inp} name="prix" value={form.prix} onChange={handleChange} type="text" placeholder="ex : 5 000 000"/>
        </div>
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Région d'origine *</label>
        <select name="region" value={form.region} onChange={handleChange} style={{...inp,cursor:'pointer'}}>
          <option value="">Sélectionner une région</option>
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Photos de la pierre * <span style={{opacity:.5,fontSize:'11px'}}>— 1 à 5 photos</span></label>
        <div style={{border:'2px dashed rgba(201,162,39,0.42)',borderRadius:'10px',padding:'22px 16px',textAlign:'center',cursor:'pointer',background:'rgba(255,255,255,0.04)',position:'relative'}}>
          <input type="file" accept="image/*" multiple onChange={e => handlePhotos(e.target.files)} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer',width:'100%',height:'100%'}}/>
          <div style={{color:'var(--cream)',fontSize:'14px',fontWeight:500,marginBottom:'5px'}}>Appuyez pour ajouter des photos</div>
          <div style={{color:'rgba(250,250,247,0.38)',fontSize:'11px',lineHeight:1.6}}>JPG ou PNG · max 5 Mo par photo</div>
        </div>
        {previews.length > 0 && (
          <div style={{display:'flex',flexWrap:'wrap',gap:'9px',marginTop:'13px'}}>
            {previews.map((src, i) => (
              <div key={i} style={{position:'relative',width:'64px',height:'64px'}}>
                <img src={src} alt={`Photo ${i+1}`} style={{width:'64px',height:'64px',borderRadius:'8px',objectFit:'cover',border:'2px solid rgba(201,162,39,0.4)'}}/>
                <button onClick={() => removePhoto(i)} style={{position:'absolute',top:'-5px',right:'-5px',width:'18px',height:'18px',background:'var(--gold)',color:'#1a1000',borderRadius:'50%',border:'none',fontSize:'12px',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} style={{...inp,minHeight:'80px',resize:'vertical'} as React.CSSProperties} placeholder="Qualité, traitement, certificat..."/>
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Votre nom *</label>
        <input style={inp} name="nom" value={form.nom} onChange={handleChange} type="text" placeholder="Nom complet"/>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
        <div>
          <label style={lbl}>Téléphone *</label>
          <input style={inp} name="telephone" value={form.telephone} onChange={handleChange} type="tel" placeholder="034 00 000 00"/>
        </div>
        <div>
          <label style={lbl}>Email <span style={{opacity:.5}}>(optionnel)</span></label>
          <input style={inp} name="email" value={form.email} onChange={handleChange} type="email" placeholder="votre@email.com"/>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading || !userId}
        style={{width:'100%',background:'var(--gold)',color:'#1a1000',border:'none',borderRadius:'10px',padding:'15px',fontSize:'15px',fontWeight:700,cursor:loading||!userId?'not-allowed':'pointer',fontFamily:'Playfair Display,serif',letterSpacing:'.5px',marginTop:'8px',opacity:loading||!userId?0.6:1}}>
        {loading ? 'Publication en cours...' : !userId ? 'Connecte-toi pour publier' : 'Publier mon offre'}
      </button>
    </section>
  )
}
