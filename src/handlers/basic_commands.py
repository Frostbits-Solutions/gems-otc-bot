"""
Basic command handlers (start, help, etc.).
"""
from telegram import Update
from telegram.ext import ContextTypes

from ..utils.decorators import log_command
from ..utils.logger import get_logger

logger = get_logger(__name__)


@log_command
async def start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /start command."""
    user = update.effective_user
    welcome_message = (
        f"👋 Hello {user.first_name}!\n\n"
        f"I am your Telegram bot. Nice to meet you!\n\n"
        f"Use /help to see available commands."
    )
    await update.message.reply_text(welcome_message)


@log_command
async def help_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /help command."""
    help_text = (
        "🤖 Available Commands:\n\n"
        "/start - Start the bot\n"
        "/help - Display this help\n"
        "/status - View bot status\n"
        "/myid - Get your Telegram User ID\n\n"
        "Admin Commands (if configured):\n"
        "/admin_status - System status\n"
        "/broadcast - Send message to all users\n\n"
        "💬 You can also send me any message and I will repeat it!"
    )
    await update.message.reply_text(help_text)


@log_command
async def status_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /status command."""
    status_message = (
        "✅ Bot Status\n\n"
        "🟢 Bot active and functional\n"
        "📡 Telegram Connection: OK\n"
        "⚡ Ready to process your messages!"
    )
    await update.message.reply_text(status_message)


@log_command
async def myid_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /myid command - shows user's Telegram ID."""
    user = update.effective_user
    user_info = (
        f"👤 Your Telegram Info\n\n"
        f"🆔 User ID: {user.id}\n"
        f"👤 Name: {user.first_name}"
    )
    if user.last_name:
        user_info += f" {user.last_name}"
    if user.username:
        user_info += f"\n🏷️ Username: @{user.username}"
    
    user_info += f"\n\n💡 To set as admin:\nADMIN_USER_ID={user.id}"
    
    await update.message.reply_text(user_info)