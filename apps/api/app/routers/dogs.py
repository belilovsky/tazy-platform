from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_dogs():
    return {'module': 'dogs', 'items': [], 'status': 'stub'}
