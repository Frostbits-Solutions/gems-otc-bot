# Telegram Bot - Modular Architecture

A Telegram bot with modular architecture to facilitate development and maintenance.

## Project Structure

```
telegram-bot-test/
├── src/
│   ├── config/          # Configuration and settings
│   │   ├── __init__.py
│   │   └── settings.py
│   ├── handlers/        # Command and message handlers
│   │   ├── __init__.py
│   │   ├── basic_commands.py
│   │   ├── message_handlers.py
│   │   └── admin_commands.py
│   ├── models/          # Data models
│   │   ├── supabase/    # Generated Supabase models
│   │   ├── __init__.py
│   │   └── user.py
│   ├── utils/           # Utilities and helpers
│   │   ├── __init__.py
│   │   ├── logger.py
│   │   └── decorators.py
│   └── __init__.py
├── main.py              # Main entry point
├── bot.py               # Legacy file (old version)
├── requirements.txt
├── .env
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Dependencies

### Database Type Generation

This project uses [supabase-pydantic](https://github.com/kmbhm1/supabase-pydantic) to generate Python type definitions from Supabase database models. This package allows automatic generation of Pydantic models from your Supabase schema, ensuring type safety and consistency between your database and Python code.

To install the type generation tool:
```bash
pip install supabase-pydantic
```

Generate types from your Supabase schema to `src/models/fastapi/`:
```bash
# Generate types in the specific directory
sb-pydantic gen --type pydantic --framework fastapi --local -d src/models
```

The generated models will be placed in `src/models/supabase/` and can be imported as:
```python
from src.models.supabase.models import YourTableModel
```

## Configuration

1. Get a bot token from [@BotFather](https://t.me/botfather) on Telegram.

2. Create a `.env` file with your configuration:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
LOG_LEVEL=INFO
ADMIN_USER_ID=your_telegram_user_id
VITE_SUPABASE_URL=http://host.docker.internal:54321 # To connect to your local supabase docker db

```

## Running the Bot

### With Docker (Recommended)

1. Build and start the bot:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f
```

3. Stop the bot:
```bash
docker-compose down
```

### Debug with Docker

To debug the bot in VS Code:
```bash
docker-compose -f docker-compose.debug.yml up --build -d
```
Then use the VS Code debug configuration "Python: Remote Attach (Docker)".

### Without Docker

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the bot:
```bash
python main.py
```

## Available Commands

### Basic Commands
- `/start` - Start the bot and receive a welcome message
- `/help` - Display help and available commands
- `/status` - View bot status

### Admin Commands (requires ADMIN_USER_ID)
- `/admin_status` - Detailed system status
- `/broadcast <message>` - Broadcast a message (under development)

### Features
- **Message Echo** - The bot repeats your text messages
- **Photo Handling** - Recognition of sent photos
- **Document Handling** - Recognition of sent files

## Architecture

The bot uses a modular architecture:

- **config/**: Configuration and environment variable management
- **handlers/**: Separation of handlers by functionality
- **models/**: Data models for users and messages
- **utils/**: Utilities, logging, and decorators

This structure facilitates:
- Adding new features
- Code maintenance
- Unit testing
- Debugging