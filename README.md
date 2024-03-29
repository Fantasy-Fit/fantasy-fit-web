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

For frontend (if running outside of Docker)
```
cd client
npm install
npm run dev
```

Verify application works
For frontend:
    http://localhost:4000

For backend:
    http://localhost:3000/users

To install additional node packages, in a separate terminal, run:
```
docker compose exec client npm install <name of package>
```

For regular Rails command (i.e. rails console, generate, etc), prefix "docker compose run api" in front:

```
docker compose run api rails c
docker compose run api rails g resource
```

For debugging purposes and to run byebug with Docker, after building the containers, run:
```
docker compose up -d
docker container ls
docker attach [container_id obtained from prev cmd]
```

To terminate the Docker processes:
```
docker compose down
```

To remove all stopped containers networks, build cache
```
docker system prune --all
```

