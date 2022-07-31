# Colors
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`


echo "${green}>>> Creating virtualenv${reset}"
python -m venv venv
echo "${green}>>> .venv is created.${reset}"

# active
sleep 2
echo "${green}>>> activate the .venv.${reset}"
source "./venv/Scripts/activate"
echo "${green}>>> activate the .venv sucessfully.${reset}"
sleep 2

# install packages
echo "${green}>>> Installing the Packages${reset}"
pip install -r requirements.txt


# up one level
cd comicapis

# # migrate
echo "${green}>>> Migrate Models to database${reset}"
python manage.py makemigrations
python manage.py migrate
echo "${green}>>> Finish Migrate${reset}"

# # createuser
echo "${green}>>> Creating superuser${reset}"
echo "${green}>>> username: admin${reset}"
echo "${green}>>> password: 123456${reset}"
DJANGO_SUPERUSER_USERNAME=admin \
DJANGO_SUPERUSER_EMAIL=admin@gmail.com \
DJANGO_SUPERUSER_PASSWORD=123456 \
python manage.py createsuperuser --noinput
echo "${green}>>> Superuser created.${reset}"



sleep 2
echo "${green}>>> Done${reset}"
echo "${green}>>> Server activated ${reset}"
sleep 2

# run
python manage.py runserver