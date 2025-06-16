#!/bin/bash

echo "========STARTING SERVERS==========="

# Exit all child processes on Ctrl+C
trap 'kill 0' SIGINT

# Start frontend and backend
npm run dev:frontend &
npm run dev:backend &

# Wait for both to exit
wait
echo "========KILLING SERVERS==========="
