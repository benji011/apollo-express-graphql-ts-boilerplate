import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { RegisterResolver } from './modules/user/Register'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import path from 'path'

const main = async () => {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  })
  const apolloServer = new ApolloServer({
    schema,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      if (error && error.extensions) {
        error.extensions.code = 'GRAPHQL_VALIDATION_FAILED'
      }
      return error
    },
  })
  const app = Express()
  app.use(Express.static('public'))

  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.set('views', path.join(__dirname, 'views'))

  apolloServer.applyMiddleware({ app })
  app.get('/', (_, res) => {
    res.render('index', {
      data: {
        header: {
          title: 'GraphQL, Express & TypeScript boilerplate',
          subTitle: '(Aiming for the title "Technical masturbation")',
        },
        content: [
          {
            title: 'GraphQL',
            subTitle: 'Access the playground here',
            url: '/graphql',
          },
          {
            title: 'GitHub',
            subTitle: 'View the source code',
            url:
              'https://github.com/benji011/apollo-express-graphql-ts-boilerplate',
          },
        ],
      },
    })
  })
  app.listen(3000, () => {
    console.log(
      `server started on http://localhost:3000/ \nGraphQL server -> http://localhost:3000/graphql`
    )
  })
}

main()
