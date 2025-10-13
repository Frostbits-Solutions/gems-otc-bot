"""
Admin-only command handlers.
"""
from telegram import Update
from telegram.ext import ContextTypes

from ..utils.decorators import log_command, admin_only
from ..utils.logger import get_logger

logger = get_logger(__name__)


@admin_only
@log_command
async def admin_status_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /admin_status command (admin only)."""
    import sys
    import psutil
    
    # Get system info
    memory = psutil.virtual_memory()
    cpu_percent = psutil.cpu_percent(interval=1)
    
    status_message = (
        "Bot Admin Status\n\n"
        f"Python Version: {sys.version.split()[0]}\n"
        f"Memory Used: {memory.percent}%\n"
        f"CPU Used: {cpu_percent}%\n"
        f"Connected Users: Under development\n"
        f"Messages Processed: Under development"
    )
    await update.message.reply_text(status_message)


@admin_only
@log_command
async def broadcast_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /broadcast command (admin only)."""
    if not context.args:
        await update.message.reply_text(
            "Usage: /broadcast <message>\n"
            "Example: /broadcast Hello everyone!"
        )
        return
    
    message = ' '.join(context.args)
    # TODO: Implement broadcast functionality
    await update.message.reply_text(
        f"Broadcast prepared: {message}\n"
        f"(Broadcast functionality under development)"
    )