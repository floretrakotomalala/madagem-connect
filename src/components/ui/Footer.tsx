export default function Footer() {
  return (
    <footer style={{background:'#0d2218',padding:'26px 20px 20px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'4px'}}>
        <svg width="26" height="30" viewBox="0 0 38 44" fill="none">
          <path d="M19 4 C22 6,28 10,30 16 C32 22,31 28,28 34 C25 38,22 40,19 40 C16 40,14 36,13 32 C11 26,12 20,14 14 C16 9,17 5,19 4Z" fill="rgba(201,162,39,0.15)" stroke="#C9A227" strokeWidth="1.4"/>
          <circle cx="19" cy="22" r="3" fill="#C9A227" opacity="0.8"/>
        </svg>
        <div style={{color:'var(--cream)',fontFamily:'Playfair Display,serif',fontSize:'16px',fontWeight:700}}>MADAGEM Connect</div>
      </div>
      <div style={{fontSize:'12px',color:'rgba(255,255,255,0.35)',marginBottom:'18px'}}>La marketplace des pierres précieuses authentiques de Madagascar</div>

      <div style={{display:'flex',flexWrap:'wrap',gap:'7px 16px',marginBottom:'18px'}}>
        {['À propos','Devenir vendeur','Nos régions','Blog gemologie','Contactez-nous'].map(link => (
          <a key={link} href="#" style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',textDecoration:'none'}}>{link}</a>
        ))}
      </div>

      <div style={{fontSize:'11px',color:'rgba(255,255,255,0.27)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'14px',lineHeight:1.7}}>
        © 2026 Madagem Connect · Antananarivo, Madagascar<br/>
        <a href="#" style={{color:'rgba(201,162,39,0.6)',textDecoration:'none'}}>Conditions générales</a> ·{' '}
        <a href="#" style={{color:'rgba(201,162,39,0.6)',textDecoration:'none'}}>Confidentialité</a> ·{' '}
        <a href="#" style={{color:'rgba(201,162,39,0.6)',textDecoration:'none'}}>Mentions légales</a><br/><br/>
        Madagem Connect est une plateforme de mise en relation entre vendeurs et acheteurs. L'exportation de pierres précieuses brutes est réglementée par le décret malgache n°2006-910.
      </div>
    </footer>
  )
}
