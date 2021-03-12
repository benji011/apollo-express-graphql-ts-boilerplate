import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '~/entity/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
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

  /**
   * A simple mutation that receives a user and saves to Postgres with
   * a hashed password.
   */
  @Mutation(() => User)
  async register(
    @Arg('payload') { firstName, lastName, email, password }: RegisterInput
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
