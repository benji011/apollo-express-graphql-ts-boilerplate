import { MiddlewareFn } from 'type-graphql'
import { UserContext } from '~/types/UserContext'

/**
 * Just log the session because I'm curious about what that data looks like.
 * @param param0
 */
export const SessionLogger: MiddlewareFn<UserContext> = async (
  { context },
  next
) => {
  console.log(context.req.session)
  return next()
}
