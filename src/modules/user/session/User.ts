import { Ctx, Query, Resolver } from 'type-graphql'
import { User } from '~/entity/User'
import { UserContext } from '~/types/UserContext'

@Resolver()
export class UserResolver {
  /**
   * A user resolver that checks the session if the user exists, then returns those details.
   * Can return undefined (which is cast to null by GraphQL) if the user does not.
   */
  @Query(() => User, { nullable: true })
  async user(@Ctx() ctx: UserContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }
    return User.findOne(ctx.req.session!.userId)
  }
}
