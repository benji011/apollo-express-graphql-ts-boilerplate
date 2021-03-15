<p align="center">
  <img src="public/assets/img/logo.jpg"/>
</p>

## Express-GraphQL-TS

A boilerplate GraphQL server + playground written in TypeScript powered by (Apollo-)Express. Still a WIP.

## Why TypeGraphQL?

1. Works well with Postgres
2. Avoid code redundancy when trying to build up schema types in SDL, data models using ORM classes & resolvers etc.
3. TypeGraphQL aims to be the source of truth by defining the schema using classes and decorators

### Installing

```bash
yarn install
```

### Create Postgres DB

```bash
createdb typegraphql-db
```

### Start your Redis service

(Used for login)
This step is not necessary if you want to register a user.

```bash
brew services start redis
```

Refer to this [README](src/modules/user/login/README.md) for more info including installing if you haven't done it yet.

### Run the server

```bash
yarn start
```

Then access http://localhost:3000/graphql for the GraphQL server
or
access http://localhost:3000 for the frontend

### Example Queries & Mutations

- [Example of registering a new user](src/modules/user/register/example-register.md)
- [Example of a user login](src/modules/user/login/example-login.md)
- [Example of fetching a user from session](src/modules/user/session/README.md)

## To do

1. Introduce IoC to showcase some dependency injection
2. Unit tests
3. E2E tests

## License

The MIT License (MIT)
