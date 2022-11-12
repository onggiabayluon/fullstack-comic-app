# How to use generate_env

# Create a project folder

mkdir MySimplepProject

# Go to the project path

cd MySimpleProject

# Initialize git

git init

# Select your heroku app

heroku git:remote -a mySimpleProjectInHeroku

# supposing you have a ".env" and "addEnvToHeroku.sh" in the project root

# Send the .env variables to heroku

bash generate_env.sh ".env"

# Push update to heroku

git add .
git commit -m "text"
git push heroku main

# Fake migrations for existing models
1. python manage.py migrate --fake
2. ./scripts/migrate.sh