# TAZY.PRO

Национальный реестр и доказательная платформа породы тазы. ОО «Найза», Казахстан.

## Стек
- API: FastAPI + SQLAlchemy + PostgreSQL
- Web: Next.js 14 (App Router)
- Search: Meilisearch
- Storage: MinIO (S3-compatible)
- Cache: Redis
- Reverse proxy: nginx + Let's Encrypt

## Структура
- `apps/api` — FastAPI backend
- `apps/web` — Next.js frontend
- `infra/` — docker-compose, nginx, postgres init
- `docs/` — документы и ADR

## Даты
- 17 мая — запуск платформы.
- 3 сентября — День тазы.
