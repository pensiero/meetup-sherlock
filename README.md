# Meetup Sherlock

In order to get Meetup Sherlock up&running you should have Docker installed onto your computer.
Also, ensure that ports 3000 and 8080 are not busy.

First time simply run:
```
./run.sh start --provision
```

and go to: [http://localhost:3000]()

## What's happening?

When you run `./run.sh start --provision` for the first time, docker will create the `backend-php` and `backend-nginx` images.

Containers:
- `mysql`: the mysql server
- `backend-php`: the main application, written in Symfony (PHP)
- `backend-nginx`: a simple web server, intercepts all the requests to the backend
- `frontend`: the frontend, written in React (JS)

## Still curious?

If you want, you can dig inside the main containers:

```
docker-compose exec backend-php bash
docker-compose exec frontend-node bash
```

or take a look at the status of the containers:

```
./run.sh status
```

Explore what you can do with `run.sh`:
```
./run.sh help
```

## Test the API

You can test the API through Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/03cb31159346ec8f9f64)

## Test explanation

### Stack

- I choosed a PHP + Nginx stack because I master them well and let me create quickly a basic API
- Both frontend and backend are *dockerized*, in order to easily run on multiple computer/environments 
- [run.sh](run.sh) is a simple script that wrap [Docker](https://www.docker.com/) commands, in order to provide an "easy to use" "one-line command way" to provision the project also by people that don't master Docker
- Backend runs on port `8080`, frontend runs on port `3000`
- There isn't a reverse proxy (but it could be easily integrated with [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy))

### Backend

- [Favorite](backend/src/Entity/Favorite.php) has an auto incremented int `id`, a `meetupId` string and a `createdAt` datetime
- Favorites are stored in a MySQL db through an ORM (Doctrine)
- Write logic is separated by read logic thanks to [FavoriteManager](backend/src/Favorite/FavoriteManager.php) and [FavoriteProvider](backend/src/Favorite/FavoriteProvider.php)
- A [dedicated controller](backend/src/Controller/Api/V1/FavoriteController.php) manages the Favorite API
- There is a V1 namespace (useful for future upgrades)

### Frontend

- In order to display both the list of the filtered Meetups and the list of the favorites Meetups, I used the `Tab` and `TabsTab` components from `meetup-web-components`
- [Favorite](frontend/src/components/Favorite.jsx) is a new React component that takes advantage of the `withToggleControl` helper
- `Favorite` uses the [Meetup Swarm Icons](https://github.com/meetup/swarm-icons) and [Meetup Swarm Colors](https://meetup.github.io/swarm-design-system/design/color/)
- In order to use the Icons SVG Sprite (and display inline `sprite.inc`), I added a new loader to Webpack: [raw-loader](https://github.com/webpack-contrib/raw-loader)
- `Favorite` listens to the *onClick* event in order to add/remove the favorite (mark or not the event as favourite)
- New tests added for the `Meetups` component and new tests created for the `Favorite` component
- [axiox](https://github.com/axios/axios) is a third-party library that manages HTTP requests
- [classNames](https://github.com/JedWatson/classnames) lets using objects in order to build the `className` attribute of React components
- Change: methods do not require anymore binding during component constructor
- Change: query term as a state value (`fetchEvents` method directly refer to that state value)
- Fix: the submit buttos was without `type="submit"`

### Known bugs / deprecations

- *Favorites* is a filtered list of the events retrieved through the [OpenEvents](https://www.meetup.com/meetup_api/docs/2/open_events/) endpoint; given so, if events are not available anymore, or you choose a different search term, it's not guaranteed that the favorites list will display all the favorites events
- Disposition of elements could be improved
- `row` class is deprecated in favour of the `Flex` component of the [meetup-web-components](https://github.com/meetup/meetup-web-components)