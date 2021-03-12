import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema, Query, Resolver } from 'type-graphql'

@Resolver()
class HelloWorldResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!'
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  })
  const apolloServer = new ApolloServer({ schema })
  const app = Express()

  apolloServer.applyMiddleware({ app })
  app.listen(3000, () => {
    console.log('server started on http://localhost:3000/')
  })
}

main()
