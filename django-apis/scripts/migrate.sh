# Colors
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# up one level
echo "${green}>>> cd comicapis${reset}"
cd comicapis

echo "${green}>>> Migrate Models to database${reset}"
python manage.py makemigrations
python manage.py migrate
echo "${green}>>> Finish Migrate${reset}"

