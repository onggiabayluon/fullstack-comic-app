# Colors
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# up one level
cd comicapis
# run
python manage.py runserver

echo "${green}>>> Server Deactivated ${reset}"