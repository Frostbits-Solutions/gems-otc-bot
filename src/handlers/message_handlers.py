"""
Message handlers for text and media processing.
"""
from telegram import Update
from telegram.ext import ContextTypes

from ..utils.decorators import log_command
from ..utils.logger import get_logger

logger = get_logger(__name__)


@log_command
async def echo_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Echo back the user's message."""
    user_message = update.message.text
    response = f"🔄 You said: {user_message}"
    await update.message.reply_text(response)


async def photo_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle photo messages."""
    user = update.effective_user
    logger.info(f"User {user.id} sent a photo")
    
    response = "📸 Nice photo! I can't process images yet, but thanks for sharing!"
    await update.message.reply_text(response)


async def document_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle document messages."""
    user = update.effective_user
    document = update.message.document
    logger.info(f"User {user.id} sent a document: {document.file_name}")
    
    response = f"📄 I received your document: {document.file_name}\nThanks for sharing!"
    await update.message.reply_text(response)