"""
Basic command handlers (start, help, etc.).
"""
from typing import List
from telegram import Update
from telegram.ext import ContextTypes

from ..utils.decorators import log_command
from ..utils.logger import get_logger
from ..utils.supabase_client import get_supabase_client
from ..models.supabase.schema_public_latest import CurrenciesBaseSchema

logger = get_logger(__name__)


@log_command
async def start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /start command."""
    user = update.effective_user
    welcome_message = (
        f"Hello {user.first_name}!\n\n"
        f"I am your Telegram bot. Nice to meet you!\n\n"
        f"Use /help to see available commands."
    )
    await update.message.reply_text(welcome_message)


@log_command
async def help_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /help command."""
    help_text = (
        "Available Commands:\n\n"
        "/start - Start the bot\n"
        "/help - Display this help\n"
        "/status - View bot status\n"
        "/myid - Get your Telegram User ID\n"
        "/startapp - Launch Mini App demo\n\n"
        "/currencies - Debug purposes\n"
        "Admin Commands (if configured):\n"
        "/admin_status - System status\n"
        "/broadcast - Send message to all users\n"
        "You can also send me any message and I will repeat it!"
    )
    await update.message.reply_text(help_text)


@log_command
async def status_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /status command."""
    status_message = (
        "Bot Status\n\n"
        "Bot active and functional\n"
        "Telegram Connection: OK\n"
        "Ready to process your messages!"
    )
    await update.message.reply_text(status_message)


@log_command
async def myid_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /myid command - shows user's Telegram ID."""
    user = update.effective_user
    user_info = (
        f"Your Telegram Info\n\n"
        f"User ID: {user.id}\n"
        f"Name: {user.first_name}"
    )
    if user.last_name:
        user_info += f" {user.last_name}"
    if user.username:
        user_info += f"\nUsername: @{user.username}"
    
    user_info += f"\n\nTo set as admin:\nADMIN_USER_ID={user.id}"
    
    await update.message.reply_text(user_info)


@log_command
async def start_app_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /startapp command - launches a basic Mini App."""
    from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
    import os
    
    user = update.effective_user
    logger.info(f"User {user.username or user.first_name} ({user.id}) requested Mini App launch")
    
    # Get Mini App URL from environment variable
    mini_app_url = os.getenv('MINI_APP_URL', 'http://localhost:8080/')
    
    # Create Web App button
    keyboard = [
        [InlineKeyboardButton("🚀 Launch Mini App", web_app=WebAppInfo(url=mini_app_url))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        f"Hello {user.first_name}!\n\n"
        "Welcome to our Mini App demo!\n\n"
        "Click the button below to launch the Mini App interface:"
    )
    
    await update.message.reply_text(message, reply_markup=reply_markup)



@log_command
async def get_currencies_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the /currencies command - fetch and display currencies using CurrenciesBaseSchema."""
    try:
        await update.message.reply_text("Fetching currencies from database...")
        
        # Get the Supabase client
        supabase_client = get_supabase_client()
        
        # Fetch currencies
        currencies : List[CurrenciesBaseSchema] = await supabase_client.get_currencies(10)
        
        if not currencies:
            await update.message.reply_text("No currencies found in database.")
            return
        
        response_text = f"Currencies Database ({len(currencies)} found)\n\n"
        
        for i, currency in enumerate(currencies, 1):
            # Use schema attributes directly
            currency_id = currency.id
            name = currency.name
            ticker = currency.ticker
            chain_id = currency.chain_id
            decimals = currency.decimals
            is_public = currency.is_public
            currency_type = getattr(currency, 'field_type', 'N/A')
            created_at = currency.created_at.strftime('%Y-%m-%d') if currency.created_at else 'N/A'
            
            # Enhanced logging with schema fields
            logger.debug(f"Currency {i}: ID={currency_id}, Name={name}, Ticker={ticker}, Chain={chain_id}, Type={currency_type}")
            
            response_text += (
                f"{i}. {name} ({ticker}) - ID: {currency_id}\n"
                f"   Chain: {chain_id} | Decimals: {decimals} | Type: {currency_type}\n"
                f"   Created: {created_at} | Public: {'Yes' if is_public else 'No'}\n\n"
            )
           
        
        # Split message if too long (Telegram limit is 4096 characters)
        if len(response_text) > 4000:
            # Send first part
            first_part = response_text[:response_text.rfind('\n\n', 0, 4000)]
            await update.message.reply_text(first_part)
            
            # Send remaining part
            remaining = response_text[len(first_part):]
            if remaining.strip():
                await update.message.reply_text(f"Currencies (continued):\n{remaining}")
        else:
            await update.message.reply_text(response_text)
        
    except Exception as e:
        await update.message.reply_text("Error retrieving currencies from database. Please try again later.")