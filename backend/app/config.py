from pydantic_settings import BaseSettings 
 
class Settings(BaseSettings): 
    APP_NAME: str = "NEXA AI Life OS" 
    APP_VERSION: str = "0.1.0" 
    DEBUG: bool = True 
    DATABASE_URL: str = "sqlite:///./nexa.db" 
    OPENAI_API_KEY: str = "" 
    LLM_MODEL: str = "gpt-4" 
    UPLOAD_DIR: str = "uploads" 
    SECRET_KEY: str = "your-secret-key-here" 
    ALGORITHM: str = "HS256" 
 
    class Config: 
        env_file = ".env" 
 
settings = Settings() 
