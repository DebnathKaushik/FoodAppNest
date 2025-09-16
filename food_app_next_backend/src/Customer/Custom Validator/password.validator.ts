import { ValidationArguments,ValidatorConstraint,ValidatorConstraintInterface,ValidatorOptions,registerDecorator, validate } from "class-validator";

//Custom Validation Class (logic here)
@ValidatorConstraint({name:'IsPassword'})
export class PasswordConstraint implements ValidatorConstraintInterface{
    validate(value: string, args: ValidationArguments): boolean {
        const passLength = value.length;
        const regex = /[a-z]/;
        return value != null && passLength >= 4 && regex.test(value)
    }
    defaultMessage(args: ValidationArguments) {
    //error message if validation failed
     return 'Password must be atleast 4 or more letter and one lowercase letter' ;
  }
}


//Custom Validation Decorator(Function)
export function IsPassword(validationOptions?:ValidatorOptions){
    return function(object:Object,propertyName:string){
        registerDecorator({
            target:object.constructor,
            propertyName,
            options:validationOptions,
            validator:PasswordConstraint,
        });
    };
};