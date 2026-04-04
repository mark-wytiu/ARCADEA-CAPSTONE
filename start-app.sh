#!/bin/bash

echo "Starting ARCADEA application..."

# Repo root (directory containing this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../ARCADEA-CAPSTONE-backend" && pwd)"

# Start backend
echo "Starting backend..."
cd "$BACKEND_DIR" || exit 1
node index.js &
BACKEND_PID=$!

# Start frontend (root package.json + src/)
echo "Starting frontend..."
cd "$SCRIPT_DIR" || exit 1
PORT=3001 BROWSER=none npm start &
FRONTEND_PID=$!

echo "Backend running on port 5050 (PID: $BACKEND_PID)"
echo "Frontend running on port 3001 (PID: $FRONTEND_PID)"
echo "Open http://localhost:3001 in your browser"
echo "Press Ctrl+C to stop both services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
