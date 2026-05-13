from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional
from ..db import get_db

router = APIRouter()

class DogIn(BaseModel):
    name: str
    name_kz: Optional[str] = None
    name_en: Optional[str] = None
    sex: Optional[str] = None
    birthdate: Optional[str] = None
    colour: Optional[str] = None
    region: Optional[str] = None
    microchip: Optional[str] = None
    public: bool = True

@router.get('/')
async def list_dogs(
    db: AsyncSession = Depends(get_db),
    limit: int = Query(50, le=200),
    offset: int = 0,
    region: Optional[str] = None,
    q: Optional[str] = None,
):
    where = ['public = true']
    params = {'limit': limit, 'offset': offset}
    if region:
        where.append('region = :region'); params['region'] = region
    if q:
        where.append("(name ILIKE :q OR name_kz ILIKE :q OR name_en ILIKE :q)"); params['q'] = f'%{q}%'
    w = ' AND '.join(where)
    rows = (await db.execute(text(
        f"SELECT id, name, name_kz, name_en, sex, birthdate, colour, region, fci_number, status FROM dogs WHERE {w} ORDER BY created_at DESC LIMIT :limit OFFSET :offset"
    ), params)).mappings().all()
    total = (await db.execute(text(f"SELECT count(*) FROM dogs WHERE {w}"), params)).scalar() or 0
    return {'total': total, 'items': [dict(r) for r in rows]}

@router.get('/{dog_id}')
async def get_dog(dog_id: str, db: AsyncSession = Depends(get_db)):
    row = (await db.execute(text(
        "SELECT id, name, name_kz, name_en, sex, birthdate, colour, region, fci_number, skk_number, status, public, created_at FROM dogs WHERE id = :id AND public = true"
    ), {'id': dog_id})).mappings().first()
    if not row: raise HTTPException(404, 'dog not found')
    return dict(row)

@router.post('/', status_code=201)
async def create_dog(d: DogIn, db: AsyncSession = Depends(get_db)):
    row = (await db.execute(text(
        "INSERT INTO dogs (name, name_kz, name_en, sex, birthdate, colour, region, microchip, public) "
        "VALUES (:name, :name_kz, :name_en, :sex, :birthdate, :colour, :region, :microchip, :public) RETURNING id"
    ), d.model_dump())).first()
    await db.commit()
    return {'id': str(row[0])}
