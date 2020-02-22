# About This Project

The application was developed for a test at Devell, by me. The main pupose of this app is to manage bookings
of a rental car service.

# About Me

Email: passos.fedev@gmail.com

Connect at [LinkedIn](https://www.linkedin.com/in/passosfe/)

# Getting Started

## Prerequisites

In order to run this project you must have the following in your computer:

- Node.js v8+
- PostgreSQL (Running on default port 5432)

## Installing

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

**Docker Containers**

- [Docker Compose](https://docs.docker.com/compose/) or another setted Postgres service

First, you need to create a **.env** file in root of application. The structure of this file is similar to the **.env.example** file, just copy and put the correct informations for all variables.

### Setting database with docker compose

#### Starting postgres service with docker compose

If you dont have postgres service installed localy, you can install it with **docker compose**:

```
  ~ docker-compose up -d
```

The postgres container will be created with a user and password setted in **.env** file.

If you try create postgres service with docker compose with a local postgres service running, you will receive a error because the service is already running in the local port 5432.

You can stop postgres service in Mac with the command:

```
  ~ sudo -u postgres ./pg_ctl -D /your/data/directory/path stop
```

#### Creating and configurating database

```
  ~ yarn typeorm:migration:run
  ~ yarn typeorm:seed:run
```

_or_

```
  ~ npm run typeorm:migration:run
  ~ npm run typeorm:seed:run
```

## Testing application

This app was created using TDD methodology, you can run the tests using the following command:

```
  ~ yarn test
```

_or_

```
  ~ npm run test
```

## Running application

In development mode:

```
  ~ yarn dev
```

_or_

```
  ~ npm run dev
```

# 📗 Documentation

There is a file called `insomnia.json` in the root of application, that is the exported documentation of [insomnia](https://insomnia.rest/).

Insomnia is a software where you can test the requests of your server side application.

# Built With

- [NodeJS](https://nodejs.org/en/) - Server
- [jest](https://jestjs.io) - Testing
- [faker](https://github.com/marak/Faker.js/) - Generating fake data
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Hash generator
- [typeorm](https://typeorm.io/#/) - Typescript ORM for Postgres
- [joi](https://hapi.dev/family/joi/) - Object schema validator
- [express](https://expressjs.com/) - Router
- [ts-node](https://github.com/TypeStrong/ts-node) - Transpiling
- [nodemon](https://nodemon.io/) - Process Manager used in the development
- [dotenv](https://github.com/motdotla/dotenv) - Environment loader
- [eslint](https://eslint.org/) - JS Linter and code style
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [date-fns](https://date-fns.org/) - Date utility
- [pg](https://github.com/brianc/node-postgres) - PostgreSQL client for Node.js
- [pg-hstore](https://github.com/scarney81/pg-hstore) - Serializing and deserializing JSON data to hstore format
