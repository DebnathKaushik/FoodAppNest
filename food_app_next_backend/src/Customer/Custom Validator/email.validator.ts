import { ValidationArguments,ValidatorConstraint,ValidatorConstraintInterface,ValidationOptions,registerDecorator, contains } from "class-validator";

//Custom Validator Class(logic)
@ValidatorConstraint({name:'ISEmail'})
export class EmailConstranint implements ValidatorConstraintInterface{
    validate(email: string, args: ValidationArguments): boolean {
        if(email === null ){
            return false;
        }else{
            return typeof email === 'string' && email.includes("aiub.edu") ;  // includes check (aiub.edu) if true else false
        }
    }
    defaultMessage(args: ValidationArguments) {
    //error message if validation failed
     return `Email is required and must have 'aiub.edu' domain` ;
  }
}

//Custom validation decorator(function)
export function ISEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: EmailConstranint,
    });
  };
}