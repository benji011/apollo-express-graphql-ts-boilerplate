<p align="center">
  <img src="src/public/img/logo.jpg"/>
</p>

## Express-GraphQL-TS

A boilerplate GraphQL server written in TypeScript powered by (Apollo-)Express. Still a WIP.

## Why TypeGraphQL?

1. Works well with Postgres
2. Avoid code redundancy when trying to build up schema types in SDL, data models using ORM classes & resolvers etc.
3. TypeGraphQL aims to be the source of truth by defining the schema using classes and decorators

### Installing

```bash
yarn install
```

### Initialize Postgres

```bash
createdb typegraphql-db
```

### Run the server

```bash
yarn start
```

Then access http://localhost:3000/graphql for the GraphQL server
or
access http://localhost:3000 for the frontend

### Registering a user

E.g.

```graphql
mutation {
  register(
    payload: {
      firstName: "Ian"
      lastName: "Malcom"
      email: "im@jurassic-park.com"
      password: "ilovewomen"
    }
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
```

See: [Example of registering a new user](src/modules/user/register/example-register.md)

## To do

1. IoC
2. Have some template rendered as a frontend
3. Configure CSS framework

## License

The MIT License (MIT)
