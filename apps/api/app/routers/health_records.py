from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def list_health_records():
    return {'module': 'health_records', 'items': [], 'status': 'stub'}
