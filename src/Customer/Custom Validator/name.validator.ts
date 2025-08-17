import {
  ValidationArguments,ValidatorConstraint,ValidatorConstraintInterface,registerDecorator,ValidationOptions, 
} from 'class-validator';

@ValidatorConstraint({ name: 'CustomerName' })
export class CustomerNameConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const regex = /^[a-zA-Z\s\.-]+$/; // Only letters, spaces, dots, hyphens
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Customer name must contain only letters, spaces, dots, or hyphens.';
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
