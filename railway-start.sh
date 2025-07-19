#!/bin/sh
echo "=== Railway Start Script ==="
echo "Date: $(date)"
echo "PWD: $(pwd)"
echo "NODE: $(which node)"
echo "Files in root:"
ls -la
echo "=== Starting health server ==="
node health-server.js