RunFrontEndDev()
{
    echo "${green}>>> cd to front-end root: nextjs-comic"
    cd nextjs-comic

    echo "${green}>>> run next dev..."
    npm run dev || exit 100
}

run() {
    RunFrontEndDev
}


run