from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_pedigree():
    return {'module': 'pedigree', 'items': [], 'status': 'stub'}
