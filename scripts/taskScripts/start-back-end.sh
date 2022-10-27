RunBackendDev()
{
    echo "${green}>>> cd to back-end root: django-apis"
    cd django-apis

    # up one level
    echo "${green}>>> cd to comicapis"
    cd comicapis
    # run
    echo "${green}>>> run back-end server..."
    python manage.py runserver || exit 100
}


Run()
{
    RunBackendDev
}


Run