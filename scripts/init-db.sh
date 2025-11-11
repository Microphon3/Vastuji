#!/bin/bash

# Database initialization script for Vastuji MySQL setup

set -e

echo "Waiting for MySQL to be ready..."
sleep 5

echo "Running database migrations..."

# Run migrations in order
mysql -h localhost -u vastuji_user -pvastuji_pass vastuji < migrations/001_create_analyses_table.sql
mysql -h localhost -u vastuji_user -pvastuji_pass vastuji < migrations/002_create_bookings_table.sql

echo "Database initialized successfully!"
