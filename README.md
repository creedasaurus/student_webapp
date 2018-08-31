# Student Data App #

This was a node/bootstrap/js assignment that I had during my Web 2 class. I decided I should get on and store it here.

Currently I have the node backend using MySQL, so you may have to work on getting that set up. Maybe I'll stub in some code that'll help to keep it working even if it doesn't have MySQL to connect to.


## Setup
Dependencies:
- Docker
- Docker-compose

To get the app running, you'll need to create a volume for the database to persist on (may not be needed later on)
`docker volume create --name=test-db-vol`

Boot the services up with:
`docker-compose up`
And then visit: `localhost:8080`

You will actually need to use the `scripts/buildstudents.sql` script to build the database. I haven't gotten it to run when the database boots up. But you can access Pgadmin4 on `localhost:5000` and then add the database there with using the hostname: `db` and the username and password listed in the `docker-compose.yml`. You can then run the script from there if you want.

To stop:
`docker-compose down`

