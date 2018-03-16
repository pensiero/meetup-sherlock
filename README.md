# Meetup Sherlock

In order to get Meetup Sherlock up&running you are supposed to have Docker installed onto your computer.

Simply run:
```
docker-compose up -d
```

and go to: [http://localhost:3000]()

## What's happening?

When you run `docker-compose` for the first time, docker will create the `backend-php` and `backend-nginx` images.


Containers:
- `mysql`: the mysql server
- `backend-php`: the main application, written in Symfony (PHP)
- `backend-nginx`: a simple web server, intercepts all the requests to the backend
- `frontend`: the frontend, written in React (JS)

If you want, you can dig inside the main containers:

```
docker-compose exec backend-php bash
```

```
docker-compose exec frontend bash
```

or take a look at the status of the containers:

```
docker-compose ps
```