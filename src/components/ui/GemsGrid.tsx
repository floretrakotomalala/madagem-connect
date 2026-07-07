const GEMS = [
  { name:'Saphir', zone:'Ilakaka · Toliara', price:'dès 800 000 Ar', bg:'#1B4332',
    icon:<svg width="18" height="18" viewBox="0 0 20 20"><polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="rgba(201,162,39,0.3)" stroke="#C9A227" strokeWidth="1.5"/><polygon points="10,5 15,8 15,12 10,15 5,12 5,8" fill="#C9A227" opacity="0.7"/></svg> },
  { name:'Rubis', zone:'Andilamena · Moramanga', price:'dès 2 000 000 Ar', bg:'#5a0a0a',
    icon:<svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="#c0392b" opacity="0.45"/><circle cx="10" cy="10" r="4" fill="#e74c3c" opacity="0.75"/><circle cx="8" cy="8" r="1.5" fill="#fff" opacity="0.55"/></svg> },
  { name:'Émeraude', zone:'Mananjary · Fianarantsoa', price:'dès 1 500 000 Ar', bg:'#0d3320',
    icon:<svg width="18" height="18" viewBox="0 0 20 20"><rect x="4" y="7" width="12" height="9" rx="2" fill="#27ae60" opacity="0.5"/><polygon points="4,7 10,2 16,7" fill="#2ecc71" opacity="0.65"/><rect x="7" y="9" width="6" height="4" rx="1" fill="#fff" opacity="0.28"/></svg> },
  { name:'Tourmaline', zone:'Antananarivo · Mahajanga', price:'dès 400 000 Ar', bg:'#2a1a4a',
    icon:<svg width="18" height="18" viewBox="0 0 20 20"><polygon points="10,2 17,9 14,18 6,18 3,9" fill="#8e44ad" opacity="0.45"/><polygon points="10,5 14,10 12,16 8,16 6,10" fill="#9b59b6" opacity="0.7"/><circle cx="10" cy="10" r="2" fill="#fff" opacity="0.35"/></svg> },
  { name:'Spinelle', zone:'Andilamena · Ambatondrazaka', price:'dès 600 000 Ar', bg:'#1a3a4a',
    icon:<svg width="18" height="18" viewBox="0 0 20 20"><polygon points="10,1 18,6 15,16 5,16 2,6" fill="#2980b9" opacity="0.45"/><polygon points="10,4 15,8 13,14 7,14 5,8" fill="#3498db" opacity="0.7"/></svg> },
  { name:'Topaze', zone:'Betafo · Antsirabe', price:'dès 300 000 Ar', bg:'#3a2a00',
    icon:<svg width="18" height="18" viewBox="0 0 20 20"><rect x="3" y="7" width="14" height="10" rx="2" fill="#f39c12" opacity="0.4"/><polygon points="3,7 10,1 17,7" fill="#e67e22" opacity="0.6"/><rect x="7" y="9" width="6" height="5" rx="1" fill="#fff" opacity="0.2"/></svg> },
]

export default function GemsGrid() {
  return (
    <section style={{padding:'0 20px 26px'}}>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700,color:'var(--green)',marginBottom:'3px'}}>Pierres populaires</div>
      <div style={{fontSize:'12px',color:'var(--muted)',marginBottom:'16px'}}>Les plus demandées à Madagascar</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
        {GEMS.map(gem => (
          <div key={gem.name} style={{background:'#fff',borderRadius:'12px',border:'1px solid #e8e8e0',padding:'14px',cursor:'pointer'}}>
            <div style={{width:'38px',height:'38px',borderRadius:'50%',marginBottom:'9px',display:'flex',alignItems:'center',justifyContent:'center',background:gem.bg}}>
              {gem.icon}
            </div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'14px',fontWeight:700,color:'var(--green)',marginBottom:'2px'}}>{gem.name}</div>
            <div style={{fontSize:'11px',color:'#aaa'}}>{gem.zone}</div>
            <div style={{fontSize:'13px',fontWeight:600,color:'var(--gold)',marginTop:'6px'}}>{gem.price}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
