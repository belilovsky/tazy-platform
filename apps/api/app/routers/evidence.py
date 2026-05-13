from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_evidence():
    return {'module': 'evidence', 'items': [], 'status': 'stub'}
