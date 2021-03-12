import { Length, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailAlreadyTaken } from './IsEmailAlreadyTaken'

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255, { message: 'First name needs to be 1 <= firstName <= 255' })
  firstName: string

  @Field()
  lastName: string

  @Field()
  @IsEmailAlreadyTaken({
    message: 'Email already exists. Please try another one ',
  })
  email: string

  @Field({ nullable: false })
  @MaxLength(30)
  password: string
}
