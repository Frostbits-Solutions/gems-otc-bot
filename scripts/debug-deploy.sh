#!/bin/bash

# Debug Deployment Script for Telegram Mini App
# This script builds Vue app, deploys nginx, starts ngrok, and updates environment

set -e

# Get the project directory dynamically (parent of scripts directory)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
NGINX_PORT=8080
NGINX_PID_FILE="/tmp/nginx-miniapp.pid"
NGROK_PID_FILE="/tmp/ngrok-miniapp.pid"
ENV_FILE="$PROJECT_DIR/.env.development.local"

echo "=== Debug Deployment Started ==="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to stop existing processes
stop_existing_processes() {
    echo "Cleaning up existing processes..."
    
    # Call the dedicated debug-stop script
    if [ -f "$PROJECT_DIR/scripts/debug-stop.sh" ]; then
        "$PROJECT_DIR/scripts/debug-stop.sh"
    else
        echo "Warning: debug-stop.sh not found, performing manual cleanup..."
        
        # Fallback cleanup (simplified version)
        pkill -f "nginx.*nginx.conf" 2>/dev/null || true
        pkill -f "ngrok http" 2>/dev/null || true
        rm -f "$NGINX_PID_FILE" "$NGROK_PID_FILE" /tmp/ngrok.log
        sleep 2
    fi
}

# Function to build Vue app
build_vue_app() {
    echo "Building Vue.js Mini App..."
    cd "$PROJECT_DIR/miniapp-vue"
    
    if [ ! -d "node_modules" ]; then
        echo "Installing npm dependencies..."
        npm install
    fi
    
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "Error: Failed to build Vue.js app"
        exit 1
    fi
    
    cd "$PROJECT_DIR"
}

# Function to start nginx
start_nginx() {
    echo "Starting nginx server..."
    
    # Create a temporary nginx config with correct paths
    TEMP_NGINX_CONF="/tmp/nginx-miniapp.conf"
    sed "s|PROJECT_DIR_PLACEHOLDER|$PROJECT_DIR|g" "$PROJECT_DIR/nginx.conf" > "$TEMP_NGINX_CONF"
    
    nginx -c "$TEMP_NGINX_CONF"
    
    if [ $? -eq 0 ]; then
        local PID=$(pgrep -f "nginx.*nginx-miniapp.conf")
        echo $PID > "$NGINX_PID_FILE"
        echo "Nginx started successfully on port $NGINX_PORT"
        echo "Nginx config: $TEMP_NGINX_CONF"
    else
        echo "Error: Failed to start nginx server"
        rm -f "$TEMP_NGINX_CONF"
        exit 1
    fi
}

# Function to start ngrok
start_ngrok() {
    echo "Starting ngrok tunnel..."
    
    if ! command_exists ngrok; then
        echo "Error: ngrok not found. Please install ngrok first."
        echo "Visit: https://ngrok.com/download"
        exit 1
    fi
    
    # Start ngrok in background
    nohup ngrok http $NGINX_PORT > /tmp/ngrok.log 2>&1 &
    local NGROK_PID=$!
    echo $NGROK_PID > "$NGROK_PID_FILE"
    
    echo "Waiting for ngrok to initialize..."
    sleep 5
    
    # Get ngrok URL
    local NGROK_URL=""
    for i in {1..10}; do
        NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | cut -d'"' -f4 | head -1)
        if [ ! -z "$NGROK_URL" ]; then
            break
        fi
        echo "Waiting for ngrok... (attempt $i/10)"
        sleep 2
    done
    
    if [ -z "$NGROK_URL" ]; then
        echo "Error: Could not get ngrok URL"
        exit 1
    fi
    
    echo "Ngrok URL: $NGROK_URL"
    
    # Update environment file
    update_env_file "$NGROK_URL"
}

# Function to update environment file
update_env_file() {
    local NEW_URL="$1"
    echo "Updating environment file with new URL..."
    
    if grep -q "MINI_APP_URL=" "$ENV_FILE"; then
        # Update existing line (no backup on macOS)
        sed -i '' "s|MINI_APP_URL=.*|MINI_APP_URL=$NEW_URL/|g" "$ENV_FILE"
    else
        # Add new line
        echo "MINI_APP_URL=$NEW_URL/" >> "$ENV_FILE"
    fi
    
    echo "Environment file updated with: $NEW_URL/"
}

# Main execution
main() {
    echo "Project Directory: $PROJECT_DIR"
    
    # Check prerequisites
    if ! command_exists nginx; then
        echo "Error: nginx not found. Please install nginx first."
        echo "macOS: brew install nginx"
        exit 1
    fi
    
    if ! command_exists node; then
        echo "Error: Node.js not found. Please install Node.js first."
        exit 1
    fi
    
    # Execute deployment steps
    stop_existing_processes
    build_vue_app
    start_nginx
    start_ngrok
    
    echo ""
    echo "=== Debug Deployment Complete ==="
    echo "Local URL: http://localhost:$NGINX_PORT/"
    echo "Public URL: $(grep MINI_APP_URL= $ENV_FILE | cut -d'=' -f2)"
    echo ""
    echo "Next steps:"
    echo "1. Start your Telegram bot in debug mode"
    echo "2. Test /startapp command in Telegram"
    echo "3. Use './scripts/debug-stop.sh' to stop all services"
}

# Run main function
main