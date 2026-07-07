'use client'
import { useState } from 'react'

const PIERRES = ['Alexandrite','Aigue-marine','Améthyste','Béryl','Diamant','Émeraude','Grenat','Kunzite','Labradorite','Morganite','Opale','Péridot','Rubis','Saphir','Spinelle','Tanzanite','Topaze','Tourmaline','Zircon','Autre']
const REGIONS = ['Ambatondrazaka','Andilamena','Antananarivo','Betafo · Antsirabe','Fianarantsoa','Ilakaka','Mahajanga','Mananjary','Moramanga','Nosy Be','Toamasina','Toliara','Autre']

export default function SubmitSection() {
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

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
    const p = photos.filter((_, idx) => idx !== i)
    const pv = previews.filter((_, idx) => idx !== i)
    setPhotos(p); setPreviews(pv)
  }

  function handleSubmit() {
    const cgu = (document.getElementById('cgu') as HTMLInputElement)?.checked
    const cert = (document.getElementById('cert') as HTMLInputElement)?.checked
    if (!cgu || !cert) { alert('Veuillez cocher les deux cases de consentement.'); return }
    alert('Offre soumise ! Notre équipe la vérifiera sous 24h.')
  }

  const inp = {width:'100%',background:'rgba(255,255,255,0.09)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'11px 13px',fontSize:'14px',color:'var(--cream)',fontFamily:'Inter,sans-serif',outline:'none'} as React.CSSProperties
  const lbl = {display:'block',fontSize:'12px',color:'rgba(250,250,247,0.7)',marginBottom:'6px',letterSpacing:'.4px'} as React.CSSProperties

  return (
    <section id="formulaire" style={{background:'var(--green)',padding:'30px 20px'}}>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700,color:'var(--cream)',marginBottom:'3px'}}>Soumettre une offre</div>
      <p style={{color:'rgba(250,250,247,0.5)',fontSize:'13px',marginBottom:'20px'}}>Vendeur ? Publiez votre pierre en 2 minutes.</p>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Type de pierre *</label>
        <select style={{...inp,cursor:'pointer'}}>
          <option value="">Sélectionner une pierre</option>
          {PIERRES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
        <div>
          <label style={lbl}>Poids (carats) *</label>
          <input style={inp} type="number" placeholder="ex : 2,5" min="0.1" step="0.1"/>
        </div>
        <div>
          <label style={lbl}>Prix (Ar) *</label>
          <input style={inp} type="text" placeholder="ex : 5 000 000"/>
        </div>
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Région d'origine *</label>
        <select style={{...inp,cursor:'pointer'}}>
          <option value="">Sélectionner une région</option>
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Photos de la pierre * <span style={{opacity:.5,fontSize:'11px'}}>— 1 à 5 photos</span></label>
        <div style={{border:'2px dashed rgba(201,162,39,0.42)',borderRadius:'10px',padding:'22px 16px',textAlign:'center',cursor:'pointer',background:'rgba(255,255,255,0.04)',position:'relative'}}>
          <input type="file" accept="image/*" multiple onChange={e => handlePhotos(e.target.files)} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer',width:'100%',height:'100%'}}/>
          <div style={{color:'var(--cream)',fontSize:'14px',fontWeight:500,marginBottom:'5px'}}>Appuyez pour ajouter des photos</div>
          <div style={{color:'rgba(250,250,247,0.38)',fontSize:'11px',lineHeight:1.6}}>JPG ou PNG · max 5 Mo par photo<br/>Face · Profil · Gros plan · Certificat</div>
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
        {photos.length > 0 && <div style={{fontSize:'11px',marginTop:'8px',textAlign:'center',color:'var(--gold)'}}>{photos.length}/5 photo{photos.length > 1 ? 's' : ''}</div>}
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Description</label>
        <textarea style={{...inp,resize:'vertical'}} rows={3} placeholder="Qualité, traitement thermique, certificats disponibles, couleur exacte..."/>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
        <div>
          <label style={lbl}>Votre nom *</label>
          <input style={inp} type="text" placeholder="Nom complet"/>
        </div>
        <div>
          <label style={lbl}>Téléphone *</label>
          <input style={inp} type="tel" placeholder="+261 ..."/>
        </div>
      </div>

      <div style={{marginBottom:'14px'}}>
        <label style={lbl}>Email <span style={{opacity:.5}}>(optionnel)</span></label>
        <input style={inp} type="email" placeholder="votre@email.com"/>
      </div>

      <div style={{marginTop:'18px'}}>
        <div style={{display:'flex',alignItems:'flex-start',gap:'9px',marginBottom:'11px'}}>
          <input type="checkbox" id="cgu" style={{marginTop:'2px',width:'15px',height:'15px',flexShrink:0,accentColor:'var(--gold)'}}/>
          <label htmlFor="cgu" style={{fontSize:'12px',color:'rgba(250,250,247,0.62)',lineHeight:1.5}}>
            J'accepte les <a href="#" style={{color:'var(--gold)',textDecoration:'none'}}>Conditions générales</a> et la <a href="#" style={{color:'var(--gold)',textDecoration:'none'}}>Politique de confidentialité</a>.
          </label>
        </div>
        <div style={{display:'flex',alignItems:'flex-start',gap:'9px',marginBottom:'11px'}}>
          <input type="checkbox" id="cert" style={{marginTop:'2px',width:'15px',height:'15px',flexShrink:0,accentColor:'var(--gold)'}}/>
          <label htmlFor="cert" style={{fontSize:'12px',color:'rgba(250,250,247,0.62)',lineHeight:1.5}}>
            Je certifie que les informations sont exactes et que la pierre est légalement exportable (décret n°2006-910).
          </label>
        </div>
      </div>

      <button onClick={handleSubmit} style={{width:'100%',background:'var(--gold)',color:'#1a1000',border:'none',borderRadius:'10px',padding:'15px',fontSize:'15px',fontWeight:700,cursor:'pointer',fontFamily:'Playfair Display,serif',letterSpacing:'.5px',marginTop:'8px'}}>
        Publier mon offre
      </button>
    </section>
  )
}
