from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import health, dogs, owners, breeders, pedigree, health_records, evidence, search, public

app = FastAPI(title='TAZY.PRO API', version='0.1.0', docs_url='/docs', redoc_url='/redoc')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.API_CORS_ORIGINS.split(',') if o.strip()],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(health.router, tags=['health'])
app.include_router(public.router, prefix='/api/public', tags=['public'])
app.include_router(dogs.router, prefix='/api/dogs', tags=['dogs'])
app.include_router(owners.router, prefix='/api/owners', tags=['owners'])
app.include_router(breeders.router, prefix='/api/breeders', tags=['breeders'])
app.include_router(pedigree.router, prefix='/api/pedigree', tags=['pedigree'])
app.include_router(health_records.router, prefix='/api/health-records', tags=['health'])
app.include_router(evidence.router, prefix='/api/evidence', tags=['evidence'])
app.include_router(search.router, prefix='/api/search', tags=['search'])
