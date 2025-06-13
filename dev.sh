#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting ARCADEA Development Environment...${NC}"

# Check if backend repo exists
if [ ! -d "../ARCADEA-CAPSTONE-backend" ]; then
  echo -e "${YELLOW}Backend repository not found. Cloning it now...${NC}"
  cd ..
  git clone https://github.com/mark-wytiu/ARCADEA-CAPSTONE-backend.git
  cd ARCADEA-CAPSTONE-frontend
fi

# Start backend in a new terminal window
echo -e "${GREEN}Starting backend server...${NC}"
osascript -e 'tell app "Terminal" to do script "cd '"$(cd .. && pwd)"'/ARCADEA-CAPSTONE-backend && npm install && npm start"'

# Wait a moment for backend to start initializing
sleep 2

# Start frontend in current terminal
echo -e "${GREEN}Starting frontend development server...${NC}"
npm install
npm start 