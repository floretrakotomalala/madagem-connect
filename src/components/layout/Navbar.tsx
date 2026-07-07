'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{background:'var(--green)',padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.25)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <svg width="36" height="42" viewBox="0 0 38 44" fill="none">
          <polygon points="19,2 36,12 36,32 19,42 2,32 2,12" fill="none" stroke="rgba(201,162,39,0.4)" strokeWidth="1"/>
          <path d="M19 4 C22 6,28 10,30 16 C32 22,31 28,28 34 C25 38,22 40,19 40 C16 40,14 36,13 32 C11 26,12 20,14 14 C16 9,17 5,19 4Z" fill="rgba(201,162,39,0.12)" stroke="#C9A227" strokeWidth="1.5"/>
          <line x1="19" y1="4" x2="19" y2="40" stroke="rgba(201,162,39,0.2)" strokeWidth="0.6"/>
          <line x1="13" y1="14" x2="28" y2="28" stroke="rgba(201,162,39,0.2)" strokeWidth="0.6"/>
          <line x1="14" y1="30" x2="30" y2="16" stroke="rgba(201,162,39,0.2)" strokeWidth="0.6"/>
          <circle cx="19" cy="22" r="3.2" fill="#C9A227" opacity="0.9"/>
          <circle cx="19" cy="22" r="1.3" fill="#fff" opacity="0.8"/>
        </svg>
        <div>
          <div style={{color:'var(--cream)',fontFamily:'Playfair Display,serif',fontSize:'18px',fontWeight:700,lineHeight:1.15}}>MADAGEM</div>
          <div style={{color:'var(--gold)',fontSize:'10px',letterSpacing:'2.5px',fontWeight:500,textTransform:'uppercase'}}>Connect</div>
        </div>
      </div>
      <Link href="#formulaire" style={{background:'var(--gold)',color:'#1a1000',borderRadius:'7px',padding:'8px 16px',fontSize:'13px',fontWeight:600,textDecoration:'none'}}>
        ↓ Vendre une pierre
      </Link>
    </nav>
  )
}
