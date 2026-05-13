from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
    DATABASE_URL: str = 'postgresql+asyncpg://tazyuser:change_me@tazy_db:5432/tazydb'
    REDIS_URL: str = 'redis://tazy_redis:6379/0'
    MEILI_URL: str = 'http://tazy_meili:7700'
    MEILI_MASTER_KEY: str = 'change_me'
    MINIO_ENDPOINT: str = 'tazy_minio:9000'
    MINIO_ROOT_USER: str = 'tazyminio'
    MINIO_ROOT_PASSWORD: str = 'change_me'
    MINIO_BUCKET: str = 'tazy-documents'
    API_SECRET_KEY: str = 'change_me'
    API_JWT_ALGORITHM: str = 'HS256'
    API_JWT_EXPIRE_MINUTES: int = 10080
    API_CORS_ORIGINS: str = 'https://tazy.pro,https://www.tazy.pro'
    API_ENV: str = 'production'
    IIN_HMAC_SECRET: str = 'change_me'

settings = Settings()
