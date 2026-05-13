from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db

router = APIRouter()

@router.get('/')
async def list_health(dog_id: str | None = None, db: AsyncSession = Depends(get_db), limit: int = Query(50, le=200)):
    params = {'limit': limit}
    where = ['is_public = true']
    if dog_id: where.append('dog_id = :dog_id'); params['dog_id'] = dog_id
    w = ' AND '.join(where)
    rows = (await db.execute(text(f'SELECT id, dog_id, test_type, lab_or_vet, test_date, result, result_code, verified_at FROM health_tests WHERE {w} ORDER BY test_date DESC NULLS LAST LIMIT :limit'), params)).mappings().all()
    return {'items': [dict(r) for r in rows]}
