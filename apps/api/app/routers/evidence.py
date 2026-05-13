from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db

router = APIRouter()

@router.get('/summary')
async def evidence_summary(db: AsyncSession = Depends(get_db)):
    health = (await db.execute(text('SELECT count(*) FROM health_tests'))).scalar() or 0
    dna = (await db.execute(text('SELECT count(*) FROM dna_samples'))).scalar() or 0
    trials = (await db.execute(text('SELECT count(*) FROM field_trials'))).scalar() or 0
    blup = (await db.execute(text('SELECT count(*) FROM blup_predictions'))).scalar() or 0
    return {'health_tests': health, 'dna_samples': dna, 'field_trials': trials, 'blup_predictions': blup}

@router.get('/dog/{dog_id}')
async def evidence_for_dog(dog_id: str, db: AsyncSession = Depends(get_db)):
    h = (await db.execute(text('SELECT id, test_type, test_date, result FROM health_tests WHERE dog_id = :id AND is_public = true ORDER BY test_date DESC NULLS LAST'), {'id': dog_id})).mappings().all()
    d = (await db.execute(text('SELECT id, lab, parentage_status, genetic_coi, submitted_at FROM dna_samples WHERE dog_id = :id ORDER BY submitted_at DESC NULLS LAST'), {'id': dog_id})).mappings().all()
    t = (await db.execute(text('SELECT id, event_id, trial_date, region, total_score FROM field_trials WHERE dog_id = :id ORDER BY trial_date DESC NULLS LAST'), {'id': dog_id})).mappings().all()
    return {'health': [dict(x) for x in h], 'dna': [dict(x) for x in d], 'trials': [dict(x) for x in t]}
