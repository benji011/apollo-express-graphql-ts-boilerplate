## Example of fetching a user from session

You should first consume the login mutation [described here](../login/example-login.md). You may also need to set the GraphQL playgrounds `request.credentials` from `omit` to `include` to make sure we have the right cookie sessions saved after login.

## Query

```graphql
{
  user {
    firstName
    lastName
    email
  }
}
```

## Example response

```json
{
  "data": {
    "user": {
      "firstName": "Ian",
      "lastName": "Malcom",
      "email": "im@jurassic-park.com"
    }
  }
}
```
