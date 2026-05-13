async function getJson(p:string){const b=process.env.API_INTERNAL_URL||'http://tazy_api:8000';try{const r=await fetch(b+p,{cache:'no-store'});return r.ok?await r.json():null}catch{return null}}
export default async function Media(){
  const d=await getJson('/api/public/media-projects');
  const items=d?.items||[];
  const kz=items.filter((x:any)=>x.country==='KZ');const ru=items.filter((x:any)=>x.country==='RU');
  return (<main style={{maxWidth:1040,margin:'0 auto',padding:'2.5rem 1.5rem',fontFamily:'system-ui'}}>
    <a href="/" style={{color:'#7a6a3a'}}>← Назад</a>
    <h1 style={{fontSize:'2rem',margin:'0.6rem 0'}}>Медиапроекты</h1>
    <p style={{color:'#444'}}>Спецпроекты о породе тазы на крупных казахстанских и российских медиа.</p>
    {[{t:'Казахстан',list:kz},{t:'Россия',list:ru}].map(g=>(
      <section key={g.t} style={{marginTop:'1.5rem'}}><h2 style={{fontSize:'1.3rem'}}>{g.t}</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'0.8rem'}}>
        {g.list.map((m:any,i:number)=>(<div key={i} style={{border:'1px solid #e5e5e5',borderRadius:6,padding:'0.7rem 0.9rem'}}><div style={{fontWeight:600}}>{m.partner}</div><div style={{color:'#666',fontSize:14}}>{m.format}</div><div style={{color:'#7a6a3a',fontSize:12,marginTop:'0.3rem'}}>{m.status}</div></div>))}
      </div></section>))}
  </main>);
}
