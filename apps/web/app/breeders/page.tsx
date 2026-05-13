async function getJson(path: string) {
  const base = process.env.API_INTERNAL_URL || 'http://tazy_api:8000';
  try { const r = await fetch(base + path, { cache: 'no-store' }); if (!r.ok) return null; return await r.json(); } catch { return null; }
}
export default async function BreedersPage() {
  const data = await getJson('/api/breeders/?limit=100');
  const items = data?.items || [];
  return (
    <main style={{maxWidth:1040, margin:'0 auto', padding:'2.5rem 1.5rem', fontFamily:'system-ui'}}>
      <a href="/" style={{color:'#7a6a3a'}}>← Назад</a>
      <h1 style={{fontSize:'2rem', margin:'0.6rem 0'}}>Питомники</h1>
      <p style={{color:'#555'}}>Активные питомники в реестре. Всего: <b>{data?.total ?? 0}</b>.</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1rem', marginTop:'1rem'}}>
        {items.map((b:any)=>(
          <div key={b.id} style={{border:'1px solid #e5e5e5', borderRadius:8, padding:'1rem'}}>
            <div style={{fontWeight:600}}>{b.kennel_name}</div>
            <div style={{color:'#666', fontSize:14}}>{b.kennel_name_kz}</div>
            <div style={{marginTop:'0.4rem', fontSize:13}}>Регистрация: {b.registration}</div>
            <div style={{fontSize:13}}>Регион: {b.region}</div>
            <div style={{fontSize:13}}>Tier: {b.tier}</div>
            <div style={{marginTop:'0.4rem', display:'flex', gap:'0.3rem', flexWrap:'wrap'}}>{(b.badges||[]).map((x:string)=>(<span key={x} style={{background:'#fafaf7', border:'1px solid #ddd', borderRadius:4, padding:'0.1rem 0.4rem', fontSize:12}}>{x}</span>))}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
