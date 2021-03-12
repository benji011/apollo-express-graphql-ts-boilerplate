import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import * as bcrypt from 'bcryptjs'
import { User } from '~/entity/User'

@Resolver(User)
export class RegisterResolver {
  /**
   * A simple query that just returns the 'Hello World' string.
   *
   * Example usage:
   * Access http://localhost:3000/graphql
   *
   * Then query 'hello
   */
  @Query(() => String)
  async hello() {
    return 'Hello World!'
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`
  }

  /**
   * A simple mutation that receives a user and saves to Postgres with
   * a hashed password.
   */
  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()
    return user
  }
}
