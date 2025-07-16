import { Controller , Get,Query} from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudetDTO } from "./StudentDTO";

@Controller('student') //'student' prefix to all routes inside this controller.
export class StudentController{
constructor(private readonly student_objService : StudentService){}

    @Get('index')
    func1(): string{
        return this.student_objService.func1();
    }

    //any
    @Get('search')
    searchStudent(
        @Query('name') namee: string,
        @Query('age') agee: number,
    ) :any {
        return this.student_objService.searchStudent(namee,agee);
    }

    // Object pass (DTO)
    @Get('object')
    objectDTO(): StudetDTO{
       const obj : StudetDTO = {
        name:"kaushik",
        email:"a22@.com",
        age:22
       }
        return this.student_objService.objectDTO(obj);
    }
        


}
