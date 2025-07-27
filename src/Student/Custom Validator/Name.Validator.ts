import { ValidationArguments,ValidatorConstraint,ValidatorConstraintInterface,ValidatorOptions,registerDecorator} from "class-validator";


//If you have custom validation logic you can create a Constraint class:
//Custom validation classes
@ValidatorConstraint({name:'CustomerName'})
export class CustomerNameConstraint implements ValidatorConstraintInterface{
    validate(value: string, args: ValidationArguments):boolean{
        const regex = /^[a-zA-Z\s\.-]+$/;  // only allow dots, spaces, hypen and Letters
        return value != null && typeof value === 'string' && regex.test(value);
    }
    defaultMessage(args: ValidationArguments) {
    //error message if validation failed
     return 'Customer name must contain only letters, spaces, dots or hyphens' ;
  }
}


//Custom validation decorator(function)
export function CustomerName(validationOptions?: ValidatorOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomerNameConstraint,
    });
  };
}

