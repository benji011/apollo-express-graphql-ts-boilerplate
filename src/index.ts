import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { RegisterResolver } from '~/modules/user/Register'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import path from 'path'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redis } from '~/redis'
import dotenv from 'dotenv'
import cors from 'cors'
import { LoginResolver } from './modules/user/login/Login'

dotenv.config()

const main = async () => {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  })
  const apolloServer = new ApolloServer({
    schema,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      if (error && error.extensions) {
        error.extensions.code = 'GRAPHQL_VALIDATION_FAILED'
      }
      return error
    },
    context: ({ req }: any) => ({ req }),
  })
  const app = Express()
  app.use(Express.static('public'))

  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.set('views', path.join(__dirname, 'views'))

  const RedisStore = connectRedis(session)

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  )

  // Session middleware
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: process.env.REDIS_STORE_NAME,
      secret: process.env.REDIS_STORE_SECRET
        ? process.env.REDIS_STORE_SECRET
        : '',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  )

  // Express middleware
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
