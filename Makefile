.PHONY: up down logs build ps restart
up:
	cd infra && docker compose --env-file .env up -d --build
down:
	cd infra && docker compose down
logs:
	cd infra && docker compose logs -f --tail=200
build:
	cd infra && docker compose build
ps:
	cd infra && docker compose ps
restart:
	cd infra && docker compose restart
