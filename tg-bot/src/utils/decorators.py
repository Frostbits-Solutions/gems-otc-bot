"""
Common decorators and helper functions.
"""
import functools
from typing import Callable, Any
from telegram import Update
from telegram.ext import ContextTypes

from ..utils.logger import get_logger

logger = get_logger(__name__)


def log_command(func: Callable) -> Callable:
    """
    Decorator to log command usage.
    
    Args:
        func: Handler function to wrap
        
    Returns:
        Wrapped function
    """
    @functools.wraps(func)
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE, *args, **kwargs) -> Any:
        user = update.effective_user
        command = update.message.text if update.message else "Unknown"
        
        logger.info(f"User {user.username or user.first_name} ({user.id}) used command: {command}")
        
        return await func(update, context, *args, **kwargs)
    
    return wrapper


def admin_only(func: Callable) -> Callable:
    """
    Decorator to restrict commands to admin users only.
    
    Args:
        func: Handler function to wrap
        
    Returns:
        Wrapped function
    """
    @functools.wraps(func)
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE, *args, **kwargs) -> Any:
        from ..config.settings import config
        
        user = update.effective_user
        if str(user.id) != config.admin_user_id:
            await update.message.reply_text("You don't have permission to use this command.")
            logger.warning(f"Unauthorized access attempt by user {user.id}")
            return
        
        return await func(update, context, *args, **kwargs)
    
    return wrapper