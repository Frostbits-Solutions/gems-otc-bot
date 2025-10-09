"""
Logging utilities for the bot.
"""
import logging
from typing import Optional


def setup_logging(log_level: str = 'INFO') -> logging.Logger:
    """
    Setup logging configuration.
    
    Args:
        log_level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        
    Returns:
        Configured logger instance
    """
    # Configure logging format
    logging.basicConfig(
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        level=getattr(logging, log_level.upper(), logging.INFO)
    )
    
    # Get logger for the bot
    logger = logging.getLogger('telegram_bot')
    return logger


def get_logger(name: Optional[str] = None) -> logging.Logger:
    """
    Get a logger instance.
    
    Args:
        name: Logger name (optional)
        
    Returns:
        Logger instance
    """
    return logging.getLogger(name or 'telegram_bot')