# Telegram Bot with Mini App - Development Guide

A Telegram bot with integrated Mini App functionality, featurin**For Full Stack Development (Bot + Mini App):**
1. Open VS Code in project folder
2. Go to Run & Debug (Ctrl/Cmd+Shift+D)  
3. Select "Debug: Mini App + Bot"
4. Press F5 or click Start Debugging
   - Builds and deploys Mini App with ngrok
   - Starts Docker container for bot
   - Attaches debugger to running bot
   - Updates environment variables automatically
   - **Performs complete cleanup when debugging stops** (Docker + Mini App + all services)r architecture and comprehensive debug system.

## Project Structure

```
telegram-bot-test/
├── tg-bot/              # Telegram Bot Application
│   ├── src/
│   │   ├── config/      # Configuration and settings
│   │   │   ├── __init__.py
│   │   │   └── settings.py
│   │   ├── handlers/    # Command and message handlers
│   │   │   ├── __init__.py
│   │   │   ├── basic_commands.py
│   │   │   ├── message_handlers.py
│   │   │   └── admin_commands.py
│   │   ├── models/      # Data models and Supabase schemas
│   │   │   ├── fastapi/ # Generated Supabase models
│   │   │   ├── __init__.py
│   │   │   └── user.py
│   │   ├── utils/       # Utilities and helpers
│   │   │   ├── __init__.py
│   │   │   ├── logger.py
│   │   │   ├── decorators.py
│   │   │   └── supabase_client.py
│   │   └── __init__.py
│   ├── main.py          # Bot main entry point
│   ├── bot.py           # Legacy bot file
│   ├── requirements.txt # Python dependencies
│   ├── Dockerfile       # Production container
│   ├── Dockerfile.debug # Debug container
│   ├── docker-compose.yml
│   └── docker-compose.debug.yml
├── miniapp-vue/         # Vue.js Mini App (WIP)
│   ├── src/
│   ├── dist/
│   └── package.json
├── scripts/             # Deployment and utility scripts
│   ├── debug-deploy.sh  # Mini App deployment script
│   └── debug-stop.sh    # Stop debug services
├── .vscode/             # VS Code debug configurations
├── nginx.conf           # nginx configuration for Mini App
├── .env.development.local # Environment variables
└── README.md
```

## Prerequisites

### Required Dependencies

1. **Python 3.11+** with pip
2. **Docker & Docker Compose** - For containerized deployment
3. **Node.js 18+ and npm** - Required for Mini App development
4. **nginx** - Web server for Mini App hosting
   ```bash
   # macOS
   brew install nginx
   ```
5. **ngrok** - For HTTPS tunneling (Mini Apps require HTTPS)
   - Download from [ngrok.com](https://ngrok.com/download)
   - Follow installation instructions for your OS
   - Sign up for free account and get auth token
   
### ngrok Setup

After installing ngrok:
```bash
# Authenticate with your ngrok token
ngrok config add-authtoken YOUR_AUTH_TOKEN

# Test installation
ngrok version
```

### Environment Variables

Create a `.env.development.local` file in the project root:
```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
ADMIN_USER_ID=your_telegram_user_id # Used for admin restricted commands

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Mini App Configuration (auto-updated by debug script)
MINI_APP_URL=http://localhost:8080/
```

### Getting Required Tokens

1. **Telegram Bot Token**: Message [@BotFather](https://t.me/botfather) on Telegram
2. **Your Telegram ID**: Use `/myid` command after starting the bot
3. **Supabase credentials**: From your Supabase project dashboard

## How to Start

### Option 1: VS Code Debug Tasks (Recommended)

The project includes VS Code tasks for streamlined development:

**For Bot Development Only:**
1. Open VS Code in project folder
2. Go to Run & Debug (Ctrl/Cmd+Shift+D)
3. Select "Debug : Bot"
4. Press F5 or click Start Debugging
   - Automatically builds and starts Docker container
   - Attaches debugger to running bot
   - **Performs complete cleanup when debugging stops** (Docker + any leftover services)

**For Full Stack Development (Bot + Mini App):**
1. Open VS Code in project folder
2. Go to Run & Debug (Ctrl/Cmd+Shift+D)  
3. Select "Full Debug: Mini App + Bot"
4. Press F5 or click Start Debugging
   - Builds and deploys Mini App with ngrok
   - Starts Docker container for bot
   - Attaches debugger to running bot
   - Updates environment variables automatically
   - Stops all services when debugging ends

**Available VS Code Tasks:**
- `Deploy Mini App` - Build and deploy Mini App only
- `Stop Mini App` - Stop Mini App services only
- `Start Docker Debug` - Start bot container only
- `Stop Docker Debug` - Stop bot container only
- `Deploy Mini App + Start Bot Debug` - Full deployment sequence
- `Stop All Debug Services` - Stop everything (parallel)
- `Complete Debug Cleanup` - Comprehensive cleanup (sequential)

### Option 2: Manual Development Setup

#### Step 1: Install Dependencies

```bash
# Install Python dependencies
cd tg-bot
pip install -r requirements.txt
cd ..

# Install Node.js dependencies (for Mini App)
cd miniapp-vue
npm install
cd ..
```

#### Step 2: Deploy Mini App (if needed)

```bash
# Deploy Mini App with automatic ngrok setup
./scripts/debug-deploy.sh
```

#### Step 3: Start Telegram Bot

```bash
# With Docker (recommended)
cd tg-bot
docker compose -f docker-compose.debug.yml up --build -d
cd ..

# Or run locally
cd tg-bot
python main.py
```

#### Step 4: Test Your Bot

1. Open Telegram and find your bot
2. Send `/start` command
3. Use `/startapp` to test Mini App functionality

#### Step 5: Stop Services (When Done)

```bash
# Stop all debug services
./scripts/debug-stop.sh
cd tg-bot
docker compose -f docker-compose.debug.yml down
cd ..
```

## Telegram Bot

### Architecture

The bot uses a modular architecture with separate handlers for different command types:

- **Basic Commands** (`/start`, `/help`, `/status`, `/myid`)
- **Admin Commands** (`/admin_status`, `/broadcast`) - Requires ADMIN_USER_ID
- **Message Handlers** - Echo functionality for text, photos, documents

### Supabase Integration

The bot includes auto-generated Pydantic models from Supabase database schemas using `supabase-pydantic`:

```bash
# Generate/update models from Supabase schema running locally
cd tg-bot
pip install supabase-pydantic
sb-pydantic gen --type pydantic --framework fastapi --local -d src/models
```

Generated models are placed in `tg-bot/src/models/fastapi/` and provide type-safe database operations. The models include validation and can be imported as:

```python
from src.models.fastapi.schema_public_latest import CurrenciesBaseSchema
```

### Available Commands

- `/start` - Welcome message and bot introduction
- `/help` - Display available commands
- `/status` - Bot status information
- `/myid` - Get your Telegram user ID
- `/startapp` - Launch Mini App (if deployed)
- `/currencies` - View database currencies

## Mini App

**Status: Work in Progress (WIP)**

The Mini App is a Vue.js 3 application that integrates with Telegram's WebApp API. Currently provides basic functionality:

- User greeting with Telegram user information
- Platform detection (mobile/desktop)
- Basic Telegram theme integration
- Close/back navigation


## Development Workflow

### For Bot Development
1. Make changes to Python code in `tg-bot/src/`
2. Use VS Code "Debug : Bot" configuration for debugging
3. Test commands in Telegram

### For Mini App Development  
1. Modify Vue.js code in `miniapp-vue/`
2. Use VS Code "Debug: Mini App + Bot" for full stack debugging
3. Test with `/startapp` command in Telegram

### Available Scripts
- `./scripts/debug-deploy.sh` - Build Mini App, start nginx, launch ngrok
- `./scripts/debug-stop.sh` - Stop all debug services

## Production Deployment

### Docker Production

```bash
# Navigate to bot directory and build
cd tg-bot
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Local Production

```bash
# Install dependencies and run
cd tg-bot
pip install -r requirements.txt
python main.py
```

## Troubleshooting

### Common Issues

1. **"Mini App not loading"**
   - Ensure `./scripts/debug-deploy.sh` completed successfully
   - Check ngrok tunnel: `curl http://localhost:4040/api/tunnels`
   - Verify `MINI_APP_URL` in `.env.development.local`

2. **"nginx/ngrok command not found"**
   - Install missing dependencies (see Prerequisites)
   - Ensure ngrok is authenticated with your token

3. **"Port already in use"**
   ```bash
   ./scripts/debug-stop.sh  # Stop all services
   lsof -i :8080           # Check what's using port
   ```

4. **VS Code debug not connecting**
   - Ensure Docker container is running in `tg-bot/` directory
   - Check port 5678 is available
   - Verify Docker debug configuration and path mappings

5. **Permission denied on scripts**
   ```bash
   chmod +x scripts/debug-deploy.sh scripts/debug-stop.sh
   ```

### Debug Commands

```bash
# Check services status
curl http://localhost:4040/api/tunnels  # ngrok status
lsof -i :8080                          # nginx status
docker ps                              # container status

# View logs
tail -f /tmp/nginx-error.log
tail -f /tmp/ngrok.log
cd tg-bot && docker logs telegram-bot-debug
```