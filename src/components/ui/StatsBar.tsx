export default function StatsBar() {
  return (
    <div style={{background:'var(--gold)',display:'flex',justifyContent:'space-around',padding:'14px 16px'}}>
      <div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:700,color:'var(--green)',textAlign:'center'}}>500+</div>
        <div style={{fontSize:'10px',color:'#3a2200',letterSpacing:'.6px',textTransform:'uppercase',marginTop:'2px',textAlign:'center'}}>Offres actives</div>
      </div>
      <div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:700,color:'var(--green)',textAlign:'center'}}>120+</div>
        <div style={{fontSize:'10px',color:'#3a2200',letterSpacing:'.6px',textTransform:'uppercase',marginTop:'2px',textAlign:'center'}}>Vendeurs vérifiés</div>
      </div>
      <div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:700,color:'var(--green)',textAlign:'center'}}>50+</div>
        <div style={{fontSize:'10px',color:'#3a2200',letterSpacing:'.6px',textTransform:'uppercase',marginTop:'2px',textAlign:'center'}}>Types de pierres</div>
      </div>
    </div>
  )
}
