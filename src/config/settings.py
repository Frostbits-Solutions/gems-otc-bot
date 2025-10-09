"""
Configuration settings for the Telegram bot.
"""
import os
from dataclasses import dataclass
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


@dataclass
class BotConfig:
    """Bot configuration class."""
    telegram_token: str
    log_level: str
    admin_user_id: str
    
    @classmethod
    def from_env(cls) -> 'BotConfig':
        """Create config from environment variables."""
        return cls(
            telegram_token=os.getenv('TELEGRAM_BOT_TOKEN', ''),
            log_level=os.getenv('LOG_LEVEL', 'INFO'),
            admin_user_id=os.getenv('ADMIN_USER_ID', '')
        )
    
    def validate(self) -> bool:
        """Validate configuration."""
        return bool(self.telegram_token)


# Global config instance
config = BotConfig.from_env()