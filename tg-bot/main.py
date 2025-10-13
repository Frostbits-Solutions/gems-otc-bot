#!/usr/bin/env python3
"""
Main entry point for the Telegram bot.
Refactored version with modular architecture.
"""
import sys
import asyncio
from pathlib import Path

# Add src directory to Python path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters

from src.config.settings import config
from src.utils.logger import setup_logging
from src.handlers.basic_commands import start_handler, help_handler, status_handler, myid_handler, get_currencies_handler, start_app_handler
from src.handlers.message_handlers import echo_handler, photo_handler, document_handler
from src.handlers.admin_commands import admin_status_handler, broadcast_handler

# Setup logging
logger = setup_logging(config.log_level)


def setup_handlers(application: Application) -> None:
    """Setup all command and message handlers."""
    
    # Basic command handlers
    application.add_handler(CommandHandler("start", start_handler))
    application.add_handler(CommandHandler("help", help_handler))
    application.add_handler(CommandHandler("status", status_handler))
    application.add_handler(CommandHandler("myid", myid_handler))
    application.add_handler(CommandHandler("currencies", get_currencies_handler))
    application.add_handler(CommandHandler("startapp", start_app_handler))

    
    # Admin command handlers
    application.add_handler(CommandHandler("admin_status", admin_status_handler))
    application.add_handler(CommandHandler("broadcast", broadcast_handler))
    
    # Message handlers
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo_handler))
    application.add_handler(MessageHandler(filters.PHOTO, photo_handler))
    application.add_handler(MessageHandler(filters.Document.ALL, document_handler))
    
    logger.info("All handlers registered successfully")


async def post_init(application: Application) -> None:
    """Post initialization tasks."""
    bot_info = await application.bot.get_me()
    logger.info(f"Bot started: @{bot_info.username} ({bot_info.first_name})")


def main() -> None:
    """Main function to start the bot."""
    logger.info("Starting Telegram Bot...")
    
    # Validate configuration
    if not config.validate():
        logger.error("Configuration validation failed! Check your .env file.")
        logger.error("Make sure TELEGRAM_BOT_TOKEN is set.")
        return
    
    # Create the Application
    application = Application.builder().token(config.telegram_token).build()
    
    # Setup handlers
    setup_handlers(application)
    
    logger.info("Bot is ready! Starting polling...")
    
    # Start the Bot
    try:
        # Start polling (bot info will be logged automatically when it connects)
        application.run_polling(
            allowed_updates=Update.ALL_TYPES,
            drop_pending_updates=True
        )
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Bot stopped due to error: {e}")
        raise


if __name__ == '__main__':
    main()