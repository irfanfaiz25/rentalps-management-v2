# setup.sh
#!/bin/bash

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Copy .env file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

echo "Setup complete. You can now run the development server with 'php artisan serve' and 'npm run dev'."
    