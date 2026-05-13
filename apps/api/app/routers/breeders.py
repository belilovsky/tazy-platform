from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db

router = APIRouter()

@router.get('/')
async def list_breeders(db: AsyncSession = Depends(get_db), limit: int = Query(50, le=200), offset: int = 0, region: str | None = None):
    where = ['suspended_at IS NULL']; params = {'limit': limit, 'offset': offset}
    if region: where.append('region = :region'); params['region'] = region
    w = ' AND '.join(where)
    rows = (await db.execute(text(
        f"SELECT id, kennel_name, kennel_name_kz, registration, region, tier, badges, created_at FROM breeders WHERE {w} ORDER BY tier DESC, created_at DESC LIMIT :limit OFFSET :offset"
    ), params)).mappings().all()
    total = (await db.execute(text(f"SELECT count(*) FROM breeders WHERE {w}"), params)).scalar() or 0
    return {'total': total, 'items': [dict(r) for r in rows]}
