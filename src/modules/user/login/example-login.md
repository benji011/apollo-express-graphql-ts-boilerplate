## Example of a user login

You must make sure your Redis service is running in the background.
Refer to [this README](src/modules/user/login/README.md) before getting started.

## Query

```graphql
mutation {
  login(email: "im@jurassic-park.com", password: "ilovewomen") {
    firstName
    lastName
    email
    name
  }
}
```

## Example response

```json
{
  "data": {
    "login": {
      "firstName": "Ian",
      "lastName": "Malcom",
      "email": "im@jurassic-park.com",
      "name": "Ian Malcom"
    }
  }
}
```
