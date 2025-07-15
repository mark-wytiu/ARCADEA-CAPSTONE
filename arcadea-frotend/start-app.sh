#!/bin/bash

echo "Starting ARCADEA application..."

# Start backend
echo "Starting backend..."
cd "/Users/markwytiu/Documents/ School/ARCADEA-CAPSTONE-backend"
node index.js &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend..."
cd "/Users/markwytiu/Documents/ School/ARCADEA-CAPSTONE-frontend/arcadea-frotend"
PORT=3001 BROWSER=none npm start &
FRONTEND_PID=$!

echo "Backend running on port 5050 (PID: $BACKEND_PID)"
echo "Frontend running on port 3001 (PID: $FRONTEND_PID)"
echo "Open http://localhost:3001 in your browser"
echo "Press Ctrl+C to stop both services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
