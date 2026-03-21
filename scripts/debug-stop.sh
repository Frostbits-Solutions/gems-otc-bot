#!/bin/bash

# Debug Stop Script - Stops all debug services

NUXT_PID_FILE="/tmp/nuxt-miniapp.pid"
NGROK_PID_FILE="/tmp/ngrok-miniapp.pid"
NUXT_PORT=8080

echo "=== Stopping Debug Services ==="

# Stop Nuxt Node Server
if [ -f "$NUXT_PID_FILE" ]; then
    PID=$(cat "$NUXT_PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "Stopping Nuxt SSR (PID: $PID)..."
        kill $PID 2>/dev/null || true
        rm -f "$NUXT_PID_FILE"
        echo "Nuxt SSR stopped"
    else
        echo "Nuxt process not found"
        rm -f "$NUXT_PID_FILE"
    fi
else
    echo "Nuxt PID file not found"
fi

# Stop any process on Nuxt port
EXISTING_PID=$(lsof -ti:$NUXT_PORT 2>/dev/null)
if [ ! -z "$EXISTING_PID" ]; then
    echo "Stopping process on port $NUXT_PORT (PID: $EXISTING_PID)..."
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
rm -f /tmp/ngrok.log /tmp/nginx-miniapp.conf /tmp/nginx-miniapp.pid /tmp/nuxt-ssr.log

echo "=== All Debug Services Stopped ==="