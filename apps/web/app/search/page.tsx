async function getJson(p:string){const b=process.env.API_INTERNAL_URL||'http://tazy_api:8000';try{const r=await fetch(b+p,{cache:'no-store'});return r.ok?await r.json():null}catch{return null}}
export default async function Search({searchParams}:{searchParams:{q?:string}}){
  const q=(searchParams?.q||'').trim();
  const data=q?await getJson('/api/search/?q='+encodeURIComponent(q)):null;
  const hits=data?.hits||[];
  return (<main style={{maxWidth:880,margin:'0 auto',padding:'2.5rem 1.5rem',fontFamily:'system-ui'}}>
    <a href="/" style={{color:'#7a6a3a'}}>← Назад</a>
    <h1 style={{fontSize:'2rem',margin:'0.6rem 0'}}>Поиск</h1>
    <form method="GET" style={{display:'flex',gap:'0.5rem',marginBottom:'1rem'}}>
      <input type="text" name="q" defaultValue={q} placeholder="Имя собаки или питомника" style={{flex:1,padding:'0.6rem',border:'1px solid #ddd',borderRadius:6}} />
      <button style={{padding:'0.6rem 1rem',background:'#7a6a3a',color:'#fff',border:0,borderRadius:6}}>Найти</button>
    </form>
    {q&&<p style={{color:'#666',fontSize:14}}>Найдено: {hits.length}</p>}
    <ul style={{listStyle:'none',padding:0}}>{hits.map((h:any)=>(
      <li key={h.id} style={{padding:'0.6rem 0',borderBottom:'1px solid #eee'}}>
        <a href={h.kind==='dog'?'/dogs/'+h.id:'/breeders'} style={{color:'#222',textDecoration:'none'}}>
          <b>{h.name}</b> <span style={{color:'#7a6a3a',fontSize:12,marginLeft:'0.4rem'}}>{h.kind}</span> <span style={{color:'#666',fontSize:13}}>· {h.region}</span>
        </a>
      </li>))}</ul>
  </main>);
}
