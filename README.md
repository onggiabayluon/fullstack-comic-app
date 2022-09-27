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
