async function getJson(p:string){const b=process.env.API_INTERNAL_URL||'http://tazy_api:8000';try{const r=await fetch(b+p,{cache:'no-store'});return r.ok?await r.json():null}catch{return null}}
export default async function DayOfTazy(){
  const tl=await getJson('/api/public/timeline');
  const day=(tl?.items||[]).find((x:any)=>x.kind==='holiday');
  return (<main style={{maxWidth:880,margin:'0 auto',padding:'2.5rem 1.5rem',fontFamily:'system-ui'}}>
    <a href="/" style={{color:'#7a6a3a'}}>← Назад</a>
    <h1 style={{fontSize:'2.4rem',margin:'0.6rem 0'}}>День Тазы</h1>
    <div style={{fontSize:'1.1rem',color:'#7a6a3a'}}>{day?.date}</div>
    <p style={{fontSize:'1.05rem',color:'#333'}}>{day?.description}</p>
    <h2 style={{fontSize:'1.3rem',marginTop:'1.5rem'}}>Программа</h2>
    <ul><li>Полевые состязания и выставки в регионах</li><li>Открытые церемонии регистрации в реестре</li><li>Научная конференция по породе тазы</li><li>Медиадень: спецпроекты партнёров</li></ul>
  </main>);
}
