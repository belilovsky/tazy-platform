from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db

router = APIRouter()

@router.get('/{dog_id}')
async def get_pedigree(dog_id: str, depth: int = 3, db: AsyncSession = Depends(get_db)):
    base = (await db.execute(text('SELECT id, name, sex FROM dogs WHERE id = :id'), {'id': dog_id})).mappings().first()
    if not base: raise HTTPException(404, 'dog not found')
    edges = (await db.execute(text('SELECT child_id, sire_id, dam_id, source, confidence FROM pedigree_edges WHERE child_id = :id'), {'id': dog_id})).mappings().all()
    return {'dog': dict(base), 'edges': [dict(e) for e in edges], 'depth': depth}
