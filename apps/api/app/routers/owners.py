from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_owners():
    return {'module': 'owners', 'items': [], 'status': 'stub'}
