# README

Welcome to Fantasy Fit! 

Setup Instructions:

install docker (https://docs.docker.com/get-docker/) then run following commands
```
docker compose up --build
```

For first-time installation - creating database, migrations and seeds.
In a new terminal run the following command:
```
docker compose run api rails db:create db:migrate db:seed
```

Verify application works
For frontend:
    http://localhost:4000

For backend:
    http://localhost:3000/users

For regular Rails command (i.e. rails console, generate, etc), prefix "docker compose run api" in front:

```
docker compose run api rails c
docker compose run api rails g resource
```

To terminate the Docker processes:
```
docker compose down
```

To remove all stopped containers networks, build cache
```
docker system prune --all
```

