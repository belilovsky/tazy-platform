from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_search():
    return {'module': 'search', 'items': [], 'status': 'stub'}
