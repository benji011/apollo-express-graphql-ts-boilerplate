import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '~/entity/User'
import { UserContext } from '~/types/UserContext'

@Resolver()
export class LoginResolver {
  /**
   * A Login mutation. Checks the user exists and if the password entered
   * is valid. If any checks fail then return null
   */
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: UserContext
  ): Promise<User | null> {
    const user = await User.findOne({ email: email })
    if (!user) {
      return null
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return null
    }

    ctx.req.session!.userId = user.id
    return user
  }
}
