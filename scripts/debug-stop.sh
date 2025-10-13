#!/bin/bash

# Debug Stop Script - Stops all debug services

NGINX_PID_FILE="/tmp/nginx-miniapp.pid"
NGROK_PID_FILE="/tmp/ngrok-miniapp.pid"
NGINX_PORT=8080

echo "=== Stopping Debug Services ==="

# Stop nginx
if [ -f "$NGINX_PID_FILE" ]; then
    PID=$(cat "$NGINX_PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "Stopping nginx (PID: $PID)..."
        kill $PID 2>/dev/null || true
        rm -f "$NGINX_PID_FILE"
        echo "Nginx stopped"
    else
        echo "Nginx process not found"
        rm -f "$NGINX_PID_FILE"
    fi
else
    echo "Nginx PID file not found"
fi

# Stop any process on nginx port
EXISTING_PID=$(lsof -ti:$NGINX_PORT 2>/dev/null)
if [ ! -z "$EXISTING_PID" ]; then
    echo "Stopping process on port $NGINX_PORT (PID: $EXISTING_PID)..."
    kill $EXISTING_PID 2>/dev/null || true
fi

# Stop ngrok
if [ -f "$NGROK_PID_FILE" ]; then
    NGROK_PID=$(cat "$NGROK_PID_FILE")
    if ps -p $NGROK_PID > /dev/null 2>&1; then
        echo "Stopping ngrok (PID: $NGROK_PID)..."
        kill $NGROK_PID 2>/dev/null || true
        rm -f "$NGROK_PID_FILE"
        echo "Ngrok stopped"
    else
        echo "Ngrok process not found"
        rm -f "$NGROK_PID_FILE"
    fi
else
    echo "Ngrok PID file not found"
fi

# Kill any remaining ngrok processes
pkill -f "ngrok http" 2>/dev/null || true

# Clean up temporary files
rm -f /tmp/ngrok.log /tmp/nginx-miniapp.conf

echo "=== All Debug Services Stopped ==="