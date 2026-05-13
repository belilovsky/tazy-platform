from fastapi import APIRouter
router = APIRouter()

@router.get('/health')
async def health():
    return {'status': 'ok', 'service': 'tazy-api', 'version': '0.1.0'}

@router.get('/')
async def root():
    return {'service': 'TAZY.PRO API', 'docs': '/docs'}
