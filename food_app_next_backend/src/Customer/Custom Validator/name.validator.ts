import {
  ValidationArguments,ValidatorConstraint,ValidatorConstraintInterface,registerDecorator,ValidationOptions, 
} from 'class-validator';

@ValidatorConstraint({ name: 'CustomerName' })
export class CustomerNameConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    return typeof value === 'string' 
  }

  defaultMessage(args: ValidationArguments) {
    return 'Customer name must have String' ;
  }
}

// Custom decorator
export function CustomerName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CustomerName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomerNameConstraint,
    });
  };
}
