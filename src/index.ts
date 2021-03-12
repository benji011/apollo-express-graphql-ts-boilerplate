import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { RegisterResolver } from './modules/user/Register'

const main = async () => {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  })
  const apolloServer = new ApolloServer({ schema })
  const app = Express()

  apolloServer.applyMiddleware({ app })
  app.get('/', (_, res) => {
    res.json({
      data: 'Hello World!',
    })
  })
  app.listen(3000, () => {
    console.log(
      `server started on http://localhost:3000/ \nGraphQL server -> http://localhost:3000/graphql`
    )
  })
}

main()
