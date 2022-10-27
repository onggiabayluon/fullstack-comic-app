FRONT_END_LOCALHOST_URL='http://localhost:3000'

# OpenChromeFrontEnd()
# {
#     echo "${green}>>> Sleep for 5 seconds until Opening Chrome..."
#     sleep 5s
#     echo "${green}>>> Opening Chrome Localhost..."
#     start chrome -ArgumentList --start-fullscreen "$FRONT_END_LOCALHOST_URL"
# }
OpenChromeFrontEnd()
{
    echo "${green}>>> Sleep for 5 seconds until Opening Chrome..."
    sleep 5s
    echo "${green}>>> Opening Chrome Localhost..."
    start chrome -ArgumentList --start-fullscreen "$FRONT_END_LOCALHOST_URL"
}

run() {
    OpenChromeFrontEnd    
}


run