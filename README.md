# Cynomi Sleep App

## Set up
This project requires NodeJS and Docker.

```sh
npm install

# create .env
cp .env.example .env

# start the development services (database)
docker-compose up -d

# prepare and seed the database
npm run db:migrate
npm run db:seed
```

## Running
```sh
# for development
npm run dev

# for production
npm run build
npm run start

# Prisma Studio (optional)
npm run db:studio
```

The app should be listening on http://localhost:3000
