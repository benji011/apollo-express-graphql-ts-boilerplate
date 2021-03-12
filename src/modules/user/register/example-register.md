## Example of registering a new user

## Query

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

## Example response

```json
{
  "data": {
    "register": {
      "id": "5",
      "firstName": "Ian",
      "lastName": "Malcom",
      "email": "im@jurassic-park.com",
      "name": "Ian Malcom"
    }
  }
}
```

The password is hashed by setting salt to `12` using `bcrypt`. (Set below)

```typescript
const hashedPassword = await bcrypt.hash(password, 12)
```

You can confirm this in the log that looks like below:

```bash
query: START TRANSACTION
query: INSERT INTO "user"("firstName", "lastName", "email", "password") VALUES ($1, $2, $3, $4) RETURNING "id" -- PARAMETERS: ["Ian","Malcom","im@jurassic-park.com","$2a$12$zBXQD4dXYhmjEwAsgslopebH8CoeA1o4sGsQZCGJyBQn5V.W2HWKi"]
query: COMMIT
```
