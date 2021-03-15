import { MiddlewareFn } from 'type-graphql'
import { UserContext } from '~/types/UserContext'

/**
 * Custom middleware to throw an error if the user isn't authenticated.
 *
 * @param param0
 * @param next
 * @returns
 */
export const IsAuthenticated: MiddlewareFn<UserContext> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId) {
    throw new Error('Not authenticated')
  }
  return next()
}
