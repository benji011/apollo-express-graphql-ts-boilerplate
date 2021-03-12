import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { User } from '~/entity/User'

@ValidatorConstraint({ async: true })
export class EmailTaken implements ValidatorConstraintInterface {
  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return false
      return true
    })
  }
}

/**
 * Custom decorator to check if an email has already been taken.
 *
 * @param validationOptions
 * @returns true if yes, false if no.
 *
 * Reference: https://github.com/typestack/class-validator#custom-validation-decorators
 */
export function IsEmailAlreadyTaken(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailTaken,
    })
  }
}
