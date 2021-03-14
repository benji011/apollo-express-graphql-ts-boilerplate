## Example of a user login

You must make sure your Redis service is running in the background.
Refer to [this README](./README.md) before getting started.

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

## Confirm login session

You can check that the login session was saved by opening the dev tools > Application > Cookies > http://localhost:3000

| Name      | Value                                   | Domain    | Expires                  |
| --------- | --------------------------------------- | --------- | ------------------------ |
| qid       | s%3AIc-....Og3V73fZeYKlCA               | localhost | Session                  |
| ...       | ...                                     | ...       | ...                      |
| csrftoken | 3Z5cqG7YwS.....CYeHHOttQw2mUuuSGyutVsZt | localhost | 2022-02-08T13:32:56.860Z |
