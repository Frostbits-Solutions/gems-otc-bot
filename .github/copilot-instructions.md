# Telegram Bot - AI Coding Agent Instructions

## Architecture Overview

This is a **modular Telegram bot** built with `python-telegram-bot` library, using Docker for deployment and VS Code for debugging. The codebase separates concerns into distinct modules under `src/`:

- **`src/handlers/`** - Command handlers by functionality (basic, admin, message types)
- **`src/config/`** - Environment-based configuration with validation
- **`src/utils/`** - Reusable decorators and logging utilities
- **`src/models/`** - Data classes for users and messages
- **`main.py`** - Entry point with handler registration and app lifecycle

## Critical Patterns

### Handler Registration Pattern
All handlers are registered in `main.py:setup_handlers()`. Follow this exact pattern:
```python
# Command handlers
application.add_handler(CommandHandler("command_name", handler_function))
# Message handlers  
application.add_handler(MessageHandler(filters.TYPE, handler_function))
```

### Decorator Usage
Use **stacked decorators** from `src.utils.decorators`:
```python
@admin_only  # First for access control
@log_command # Second for logging
async def admin_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
```

### Configuration Access
Always import and use the global config instance:
```python
from src.config.settings import config
# Access: config.telegram_token, config.admin_user_id, config.log_level
```

## Development Workflows

### Docker Development
- **Production**: `docker compose up -d` (uses `Dockerfile`)
- **Debug**: `docker compose -f docker-compose.debug.yml up --build -d` (uses `Dockerfile.debug` with debugpy)
- **VS Code Debug**: F5 → automatically starts debug container and attaches

### Python Path Setup
The project uses `sys.path.insert(0, str(Path(__file__).parent / "src"))` in `main.py` to make `src/` importable. **Always use relative imports within src/** (e.g., `from ..utils.logger import get_logger`).

### Environment Configuration
- Token and admin ID must be set in `.env`
- Use `/myid` command to get user's Telegram ID for `ADMIN_USER_ID`
- Config validation happens in `main()` - bot won't start without valid token

## Key Conventions

### Message Formatting
**Never use Markdown formatting** - this codebase deliberately avoids `parse_mode='Markdown'` due to parsing errors. Use plain text with emojis.

### Error Handling
Admin access is enforced via `@admin_only` decorator, which:
- Compares `str(user.id)` to `config.admin_user_id` 
- Returns permission denied message for unauthorized users
- Logs unauthorized attempts

### Logging Pattern
Use module-level logger: `logger = get_logger(__name__)` then log with context:
```python
logger.info(f"User {user.username or user.first_name} ({user.id}) used command: {command}")
```

## Integration Points

### Telegram Bot API
- Uses `python-telegram-bot==20.6` with async handlers
- `application.run_polling()` handles all event loop management
- Handler functions receive `(update: Update, context: ContextTypes.DEFAULT_TYPE)`

### Docker Integration
- Both Dockerfiles install `gcc g++` for `psutil` compilation
- Debug container exposes port 5678 for remote debugging
- Environment variables loaded from `.env` file in both containers

### VS Code Integration
- `.vscode/launch.json` configured for remote Docker debugging
- Pre/post debug tasks automatically manage container lifecycle
- Path mappings: local `${workspaceFolder}` ↔ container `/app`

## Adding New Features

1. **New command**: Create handler in appropriate `src/handlers/` file, add to `main.py:setup_handlers()`
2. **Admin command**: Use `@admin_only @log_command` decorators
3. **New message type**: Add `MessageHandler` with appropriate `filters`
4. **New model**: Add dataclass to `src/models/` with type hints and properties
5. **New utility**: Add to `src/utils/` and import in relevant handlers