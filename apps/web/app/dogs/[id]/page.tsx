async function getJson(p:string){const b=process.env.API_INTERNAL_URL||'http://tazy_api:8000';try{const r=await fetch(b+p,{cache:'no-store'});return r.ok?await r.json():null}catch{return null}}
export default async function DogPage({params}:{params:{id:string}}){
  const dog=await getJson('/api/dogs/'+params.id);
  if(!dog) return (<main style={{maxWidth:720,margin:'0 auto',padding:'2.5rem 1.5rem',fontFamily:'system-ui'}}><a href="/dogs" style={{color:'#7a6a3a'}}>← Реестр</a><h1>Собака не найдена</h1></main>);
  const ped=await getJson('/api/pedigree/'+params.id);
  const ev=await getJson('/api/evidence/dog/'+params.id);
  return (<main style={{maxWidth:880,margin:'0 auto',padding:'2.5rem 1.5rem',fontFamily:'system-ui'}}>
    <a href="/dogs" style={{color:'#7a6a3a'}}>← Реестр</a>
    <h1 style={{fontSize:'2.2rem',margin:'0.6rem 0 0.2rem'}}>{dog.name} <span style={{color:'#7a6a3a',fontSize:'1.1rem'}}>{dog.name_kz}</span></h1>
    <div style={{color:'#666'}}>{dog.sex} · {dog.birthdate} · {dog.colour} · {dog.region}</div>
    {dog.fci_number&&<div style={{marginTop:'0.4rem'}}>FCI: {dog.fci_number}</div>}
    <h2 style={{fontSize:'1.3rem',marginTop:'1.5rem'}}>Родословная</h2>
    <ul>{(ped?.edges||[]).length===0?<li style={{color:'#888'}}>Данных нет</li>:(ped.edges).map((e:any,i:number)=>(<li key={i}>sire: {e.sire_id} · dam: {e.dam_id} · source: {e.source} · confidence: {e.confidence}</li>))}</ul>
    <h2 style={{fontSize:'1.3rem',marginTop:'1.5rem'}}>Доказательная база</h2>
    <h3 style={{fontSize:'1.05rem',marginTop:'0.8rem'}}>Здоровье</h3>
    <ul>{(ev?.health||[]).length===0?<li style={{color:'#888'}}>Нет записей</li>:ev.health.map((h:any)=>(<li key={h.id}>{h.test_date} — {h.test_type}: {h.result}</li>))}</ul>
    <h3 style={{fontSize:'1.05rem',marginTop:'0.8rem'}}>ДНК</h3>
    <ul>{(ev?.dna||[]).length===0?<li style={{color:'#888'}}>Нет образцов</li>:ev.dna.map((h:any)=>(<li key={h.id}>{h.lab} — {h.parentage_status} · COI {h.genetic_coi}</li>))}</ul>
    <h3 style={{fontSize:'1.05rem',marginTop:'0.8rem'}}>Полевые испытания</h3>
    <ul>{(ev?.trials||[]).length===0?<li style={{color:'#888'}}>Нет результатов</li>:ev.trials.map((h:any)=>(<li key={h.id}>{h.trial_date} · {h.region} — балл: {h.total_score}</li>))}</ul>
  </main>);
}
