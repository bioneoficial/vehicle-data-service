#!/bin/sh

echo "Waiting for the database to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection..."
  sleep 5
done

echo "Database is up and running"

echo "Starting server..."

# Run migrations (if you have migrations)
echo "Migrating database..."
if ! npm run db:migrate; then
  echo "Migration failed!"
  exit 1
fi
echo "Database migration completed!"

# Run seeders (if you have seeders)
echo "Seeding database..."
if ! npm run db:seed; then
  echo "Seeding failed!"
  exit 1
fi
echo "Database seeding completed!"

echo "Starting application..."
exec node dist/main.js
