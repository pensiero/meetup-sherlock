# Meetup Sherlock

In order to get Meetup Sherlock up&running you should have Docker installed onto your computer.

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