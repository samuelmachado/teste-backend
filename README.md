# Teste backend

## Running with Docker

```bash
source dev.sh
setup_dev_environment # create volumes, networks, envfile, install package and database setup
dkupa # starts containers in attach mode
dkupd # starts containes in detach mode
dk bash # exec bash inside container
```

## Routes

All routes are listed within the Postman folder

## Features

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) integration
- Dependency Injection done with the nice framework from [TypeDI](https://github.com/pleerock/typedi)
- Simplified Database Query with the ORM [TypeORM](https://github.com/typeorm/typeorm)
- Easy Exception Handling thanks to [routing-controllers](https://github.com/pleerock/routing-controllers)
- Integrated Testing Tool thanks to [Jest](https://facebook.github.io/jest)
- Code linter to [ESLint](https://eslint.org/)
- Debug mode for dockerized environment
- [GitHub Actions](https://github.com/features/actions) integration for CI

### Devhelp

```bash
devhelp                Prints devhelp

db_setup               Setup database

setup_dev_environment  Setup dev environment

pkg_install            Install node packages

dkupa                  Starts docker services in attach mode (at first time, runs pkg_install)

dkupd                  Starts docker services in detached mode (at first time, runs pkg_install)

dk "cmd"               Runs the 'cmd' command inside the container

dkdown                 Stop and remove docker containers
```
