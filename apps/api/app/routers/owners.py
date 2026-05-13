from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db

router = APIRouter()

@router.get('/')
async def list_owners_aggregate(db: AsyncSession = Depends(get_db)):
    total = (await db.execute(text('SELECT count(*) FROM owners'))).scalar() or 0
    by_region = (await db.execute(text('SELECT region, count(*) AS c FROM owners GROUP BY region ORDER BY c DESC NULLS LAST LIMIT 20'))).mappings().all()
    return {'total': total, 'by_region': [dict(r) for r in by_region]}
