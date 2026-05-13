from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_public():
    return {'module': 'public', 'items': [], 'status': 'stub'}
