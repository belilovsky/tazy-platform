async function getJson(path: string) {
  const base = process.env.API_INTERNAL_URL || 'http://tazy_api:8000';
  try { const r = await fetch(base + path, { cache: 'no-store' }); if (!r.ok) return null; return await r.json(); } catch { return null; }
}
export default async function DogsPage() {
  const data = await getJson('/api/dogs/?limit=100');
  const items = data?.items || [];
  return (
    <main style={{maxWidth:1040, margin:'0 auto', padding:'2.5rem 1.5rem', fontFamily:'system-ui'}}>
      <a href="/" style={{color:'#7a6a3a'}}>← Назад</a>
      <h1 style={{fontSize:'2rem', margin:'0.6rem 0'}}>Реестр тазы</h1>
      <p style={{color:'#555'}}>Открытые записи реестра. Всего: <b>{data?.total ?? 0}</b>.</p>
      <table style={{width:'100%', borderCollapse:'collapse', marginTop:'1rem', fontSize:14}}>
        <thead><tr style={{textAlign:'left', borderBottom:'2px solid #ddd'}}>
          <th style={{padding:'0.5rem'}}>Имя</th><th>Каз.</th><th>Пол</th><th>Рожден</th><th>Окрас</th><th>Регион</th>
        </tr></thead>
        <tbody>{items.map((d:any)=>(<tr key={d.id} style={{borderBottom:'1px solid #eee'}}>
          <td style={{padding:'0.5rem'}}>{d.name}</td><td>{d.name_kz}</td><td>{d.sex}</td><td>{d.birthdate}</td><td>{d.colour}</td><td>{d.region}</td>
        </tr>))}</tbody>
      </table>
    </main>
  );
}
