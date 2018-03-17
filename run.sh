#!/usr/bin/env bash

function command_help() {
    echo "Usage: $0 [option...] {start|stop|status|destroy|restart|help}" >&2
    echo ""
    echo "options:"
    echo " -h, --help           show this help."
    echo " -p, --provision      force provisioning of the containers."
    echo
    exit 1
}

# provisioning logic
function provisioning() {
    echo "START PROVISIONING..."

    echo "1. Copying the docker-compose distribution file..."
    cp docker-compose.override.yml.dist docker-compose.override.yml

    echo "2. Copying the .env distribution file, if not exists..."
    if [[ ! -f ".env" ]]; then
        cp backend/.env.dist backend/.env
    fi

    echo "3. Installing frontend vendors through yarn..."
    docker-compose run frontend-node bash -c 'yarn install'

    echo "4. Starting up docker containers..."
    docker-compose up -d

    echo "5. Installing backend vendors through composer..."
    docker-compose exec backend-php bash -c 'composer install'
    docker-compose exec backend-php bash -c './bin/console doctrine:database:create'
    docker-compose exec backend-php bash -c './bin/console doctrine:schema:create'

    touch provisioned.lock
}

provision=false
while :; do
    case $1 in
        -h|--help)
            command_help
            exit
            ;;
        -p|--provision)
            provision=true
            ;;
        start)
            if [[ ( ${provision} = true ) || (! -f "provisioned.lock") ]]; then
                provisioning
            else
                docker-compose up -d
            fi
            exit
            ;;
        stop)
            docker-compose down
            exit
            ;;
        destroy)
            docker-compose rm -f -s -v
            rm -f provisioned.lock
            exit
            ;;
        restart)
            docker-compose down && docker-compose up -d
            exit
            ;;
        status)
            docker-compose ps
            exit
            ;;
        help)
            command_help
            exit
            ;;
        *)  # Default case: No more options, so break out of the loop.
            command_help
            exit
    esac
    shift
done