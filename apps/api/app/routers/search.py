from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db

router = APIRouter()

@router.get('/')
async def search(q: str = Query(..., min_length=1), limit: int = Query(20, le=100), db: AsyncSession = Depends(get_db)):
    like = f'%{q}%'
    dogs = (await db.execute(text("SELECT id, name, region, 'dog' AS kind FROM dogs WHERE public = true AND (name ILIKE :q OR name_kz ILIKE :q OR name_en ILIKE :q) LIMIT :lim"), {'q': like, 'lim': limit})).mappings().all()
    breeders = (await db.execute(text("SELECT id, kennel_name AS name, region, 'breeder' AS kind FROM breeders WHERE suspended_at IS NULL AND (kennel_name ILIKE :q OR kennel_name_kz ILIKE :q) LIMIT :lim"), {'q': like, 'lim': limit})).mappings().all()
    return {'query': q, 'hits': [dict(r) for r in dogs] + [dict(r) for r in breeders]}
