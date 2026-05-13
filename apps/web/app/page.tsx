async function getJson(path: string) {
  const base = process.env.API_INTERNAL_URL || 'http://tazy_api:8000';
  try {
    const r = await fetch(base + path, { cache: 'no-store' });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export default async function Page() {
  const root = await getJson('/api/public/');
  const tl = await getJson('/api/public/timeline');
  const media = await getJson('/api/public/media-projects');
  const manifesto = await getJson('/api/public/manifesto');
  const stats = await getJson('/api/public/stats');
  const site = root?.site;
  const pillars = root?.pillars || [];
  return (
    <main style={{maxWidth:1040, margin:'0 auto', padding:'2.5rem 1.5rem', fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color:'#1a1a1a', lineHeight:1.55}}>
      <header style={{borderBottom:'1px solid #e5e5e5', paddingBottom:'1.5rem', marginBottom:'2rem'}}>
        <div style={{fontSize:14, letterSpacing:2, textTransform:'uppercase', color:'#7a6a3a'}}>TAZY.PRO · ОО Найза</div>
        <h1 style={{fontSize:'2.6rem', margin:'0.6rem 0 0.4rem'}}>Национальная платформа породы тазы</h1>
        <p style={{fontSize:'1.15rem', color:'#3a3a3a', maxWidth:760}}>{site?.mission}</p>
        <div style={{marginTop:'1rem', display:'flex', gap:'1.5rem', flexWrap:'wrap', fontSize:14, color:'#555'}}>
          <span><b>Запуск:</b> 17 мая 2026</span>
          <span><b>День Тазы:</b> 3 сентября 2026</span>
          <span><b>Языки:</b> KK / RU / EN</span><span><a href="/dogs" style={{color:'#7a6a3a'}}>Реестр</a></span><span><a href="/breeders" style={{color:'#7a6a3a'}}>Питомники</a></span><span><a href="/media" style={{color:'#7a6a3a'}}>Медиа</a></span><span><a href="/day-of-tazy" style={{color:'#7a6a3a'}}>День Тазы</a></span><span><a href="/about" style={{color:'#7a6a3a'}}>О проекте</a></span><span><a href="/search" style={{color:'#7a6a3a'}}>Поиск</a></span>
        </div>
      </header>

      <section style={{marginBottom:'2.5rem'}}>
        <h2 style={{fontSize:'1.4rem', marginBottom:'0.8rem'}}>Направления платформы</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1rem'}}>
          {pillars.map((p:any)=>(
            <div key={p.code} style={{border:'1px solid #e5e5e5', borderRadius:8, padding:'1rem 1.1rem', background:'#fafaf7'}}>
              <div style={{fontSize:12, color:'#7a6a3a', textTransform:'uppercase', letterSpacing:1}}>{p.code}</div>
              <div style={{fontWeight:600, margin:'0.3rem 0'}}>{p.title}</div>
              <div style={{fontSize:14, color:'#444'}}>{p.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginBottom:'2.5rem'}}>
        <h2 style={{fontSize:'1.4rem', marginBottom:'0.8rem'}}>Ключевые даты</h2>
        <ul style={{listStyle:'none', padding:0, margin:0}}>
          {(tl?.items||[]).map((t:any)=>(
            <li key={t.date} style={{display:'flex', gap:'1rem', padding:'0.7rem 0', borderBottom:'1px solid #eee'}}>
              <div style={{minWidth:120, color:'#7a6a3a', fontFamily:'ui-monospace,monospace'}}>{t.date}</div>
              <div><b>{t.title}</b><div style={{fontSize:14, color:'#444'}}>{t.description}</div></div>
            </li>
          ))}
        </ul>
      </section>

      <section style={{marginBottom:'2.5rem'}}>
        <h2 style={{fontSize:'1.4rem', marginBottom:'0.8rem'}}>Медиапроекты</h2>
        <p style={{color:'#444', fontSize:15}}>Спецпроекты о тазы на крупных казахстанских и российских медиа.</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'0.7rem', marginTop:'0.7rem'}}>
          {(media?.items||[]).map((m:any,i:number)=>(
            <div key={i} style={{border:'1px solid #e5e5e5', borderRadius:6, padding:'0.7rem 0.9rem', fontSize:14}}>
              <div style={{fontWeight:600}}>{m.partner}</div>
              <div style={{color:'#666'}}>{m.country} · {m.format}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginBottom:'2.5rem'}}>
        <h2 style={{fontSize:'1.4rem', marginBottom:'0.8rem'}}>Манифест</h2>
        {(manifesto?.paragraphs||[]).map((t:string,i:number)=>(<p key={i} style={{margin:'0.5rem 0', color:'#222'}}>{t}</p>))}
      </section>

      <footer style={{borderTop:'1px solid #e5e5e5', paddingTop:'1.2rem', fontSize:13, color:'#666', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'0.6rem'}}>
        <span>© 2026 ОО «Найза» · tazy.pro</span>
        <span>Обновлено: {stats?.updated_at}</span>
        <span><a href="/docs" style={{color:'#7a6a3a'}}>API документация</a></span>
      </footer>
    </main>
  );
}
