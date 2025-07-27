import { Body, Controller , Get,Post,Query, UsePipes, ValidationPipe,UseInterceptors,UploadedFile} from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudetDTO } from "./StudentDTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError,diskStorage } from "multer";

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
@Post('object')
@UsePipes(new ValidationPipe())
objectDTO(@Body() data:StudetDTO): StudetDTO{

console.log(data)
return this.student_objService.objectDTO(data);
}
    

// For file uploads
@Post('uploads')
@UseInterceptors(FileInterceptor('file',
    {
        fileFilter:(req,file,cb) =>{
            if(file.originalname.match(/^.*\.(jpg|png|webp|jpeg)$/)){
                cb(null,true);
            }else{
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits:{fileSize:5000000},
        storage:diskStorage({destination:'./uploads',
            filename:function(req,file,cb){
                cb(null,Date.now()+file.originalname);
            },
        })
    }))
uploadFile(@UploadedFile() file:Express.Multer.File){
console.log(file);
}

}
