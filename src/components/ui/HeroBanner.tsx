'use client'
import { useState } from 'react'

const PIERRES = [
  'Alexandrite','Aigue-marine','Améthyste','Apatite','Béryl','Chrysobéryl',
  'Citrine','Corail','Cornaline','Cristal de roche','Diamant','Émeraude',
  'Fluorite','Grenat','Grenat rouge','Héliodore','Iolite','Jade','Jaspe',
  'Kunzite','Labradorite','Lapis-lazuli','Malachite','Morganite','Obsidienne',
  'Œil-de-tigre','Opale','Orthoclase','Péridot','Pierre de lune','Quartz fumé',
  'Quartz rose','Rhodolite','Rose des sables','Rubis','Saphir','Saphir jaune',
  'Saphir rose','Saphir violet','Scapolite','Spinelle','Tanzanite','Topaze',
  'Tourmaline','Tourmaline multicolore','Turquoise','Zircon','Zoisite',
]

const TAGS = ['Rubis','Saphir','Tourmaline','Émeraude','Spinelle','Alexandrite']

export default function HeroBanner() {
  const [selected, setSelected] = useState('')

  return (
    <section style={{background:'linear-gradient(160deg,var(--green) 0%,var(--green-dark) 100%)',padding:'40px 20px 50px',textAlign:'center'}}>
      
      <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(201,162,39,0.12)',border:'1px solid var(--gold-dim)',borderRadius:'20px',padding:'5px 14px',fontSize:'11px',color:'var(--gold)',letterSpacing:'1.8px',textTransform:'uppercase',marginBottom:'20px'}}>
        <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'var(--gold)',display:'inline-block',animation:'pulse 2s infinite'}}></span>
        Madagascar · Authentique · Certifié
      </div>

      <h1 style={{fontFamily:'Playfair Display,serif',color:'var(--cream)',fontSize:'27px',fontWeight:900,lineHeight:1.22,marginBottom:'10px'}}>
        Trouvez des <em style={{color:'var(--gold)',fontStyle:'normal'}}>pierres précieuses</em><br/>authentiques à Madagascar
      </h1>
      <p style={{color:'rgba(250,250,247,0.6)',fontSize:'13px',marginBottom:'28px',lineHeight:1.7}}>
        Inspectez en personne avant d'acheter
      </p>

      <div style={{background:'rgba(255,255,255,0.07)',border:'1px solid var(--gold-dim)',borderRadius:'14px',padding:'18px'}}>
        <span style={{color:'var(--gold)',fontSize:'11px',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'10px',display:'block',fontWeight:500}}>
          Rechercher une pierre
        </span>
        <div style={{display:'flex',gap:'8px'}}>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{flex:1,background:'#fff',border:'1.5px solid #d8d8d0',borderRadius:'8px',padding:'11px 32px 11px 12px',fontSize:'14px',color:'var(--text)',cursor:'pointer',appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231B4332' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'right 12px center'}}
          >
            <option value="">— Toutes les pierres —</option>
            {PIERRES.map(p => <option key={p}>{p}</option>)}
          </select>
          <button style={{background:'var(--gold)',color:'#1a1000',border:'none',borderRadius:'8px',padding:'11px 18px',fontSize:'14px',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}}>
            Chercher
          </button>
        </div>

        <div style={{display:'flex',flexWrap:'wrap',gap:'7px',marginTop:'14px'}}>
          {TAGS.map(tag => (
            <span key={tag} onClick={() => setSelected(tag)}
              style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.18)',borderRadius:'16px',padding:'5px 13px',fontSize:'11px',color:'rgba(250,250,247,0.7)',cursor:'pointer'}}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
    </section>
  )
}
