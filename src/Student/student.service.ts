import { Injectable } from "@nestjs/common";
import { StudetDTO } from "./StudentDTO";

@Injectable()
export class StudentService{
func1():string{
    return "Hello Student Index"
}

searchStudent(name:string,age:number):any{
    return `Student is ${name} and age is ${age}`
}

objectDTO(value:StudetDTO):StudetDTO{
    return {name:value.name, Phone:value.Phone, password:value.password };
}
}