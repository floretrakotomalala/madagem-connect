export default function FeaturedGem() {
  return (
    <section style={{padding:'26px 20px'}}>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700,color:'var(--green)',marginBottom:'3px'}}>Offre en vedette</div>
      <div style={{fontSize:'12px',color:'var(--muted)',marginBottom:'16px'}}>Sélection certifiée du jour</div>
      
      <div style={{background:'#fff',borderRadius:'14px',border:'1px solid #e0e0d4',overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#8B1A1A,#C0392B)',padding:'20px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-18px',right:'-18px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}}/>
          <div style={{position:'absolute',bottom:'-28px',left:'24px',width:'60px',height:'60px',borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}/>
          <span style={{background:'rgba(255,255,255,0.18)',color:'#fff',fontSize:'10px',letterSpacing:'1px',padding:'4px 12px',borderRadius:'12px',textTransform:'uppercase',display:'inline-block',marginBottom:'12px'}}>
            ● Offre en vedette
          </span>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:900,color:'#fff',lineHeight:1.2}}>
            Rubis Rouge<br/>Sang de Pigeon
          </div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.65)',marginTop:'5px'}}>
            Rubis Naturel · 1,8 carats · Andilamena
          </div>
        </div>

        <div style={{padding:'16px'}}>
          <div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:700,color:'var(--gold)'}}>25 000 000 Ar</span>
            <span style={{fontSize:'12px',color:'#aaa',marginLeft:'6px'}}>≈ $6 500</span>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'10px'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:'4px',fontSize:'11px',color:'var(--green)',background:'var(--green-light)',borderRadius:'20px',padding:'4px 12px'}}>
              ✓ Vendeur vérifié
            </span>
            <button style={{background:'var(--green)',color:'#fff',border:'none',borderRadius:'8px',padding:'9px 16px',fontSize:'12px',fontWeight:600,cursor:'pointer'}}>
              Voir l'offre →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
