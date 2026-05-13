async function getJson(p:string){const b=process.env.API_INTERNAL_URL||'http://tazy_api:8000';try{const r=await fetch(b+p,{cache:'no-store'});return r.ok?await r.json():null}catch{return null}}
export default async function About(){
  const m=await getJson('/api/public/manifesto');
  const s=await getJson('/api/public/site');
  const p=await getJson('/api/public/pillars');
  return (<main style={{maxWidth:880,margin:'0 auto',padding:'2.5rem 1.5rem',fontFamily:'system-ui'}}>
    <a href="/" style={{color:'#7a6a3a'}}>← Назад</a>
    <h1 style={{fontSize:'2rem',margin:'0.6rem 0'}}>О платформе</h1>
    <p style={{color:'#444'}}>{s?.mission}</p>
    <h2 style={{fontSize:'1.3rem',marginTop:'1.5rem'}}>{m?.title}</h2>
    {(m?.paragraphs||[]).map((t:string,i:number)=>(<p key={i}>{t}</p>))}
    <h2 style={{fontSize:'1.3rem',marginTop:'1.5rem'}}>Направления</h2>
    <ul>{(p?.items||[]).map((x:any)=>(<li key={x.code}><b>{x.title}</b> — {x.description}</li>))}</ul>
    <p style={{marginTop:'2rem',fontSize:13,color:'#666'}}>{s?.org} · {s?.contacts?.email}</p>
  </main>);
}
