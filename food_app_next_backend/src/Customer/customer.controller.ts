import { Body, Controller,Param ,Get,Post,Query, UsePipes, ValidationPipe,UseInterceptors,UploadedFile, Patch, Delete} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./DTOs/customerDTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError,diskStorage } from "multer";



//'Customer' prefix to all routes inside this controller.
@Controller('Customer') 
export class CustomerController{
constructor(private readonly customerService : CustomerService){}

@Get('profile')
func1(): string{
return this.customerService.func1();
}


//Create Customer // [dto_data(CustomerDTO as like Customer Entity Type) pass "DTO" through --> "service"]
@Post('create-customer')
@UsePipes(new ValidationPipe())
C_CreateCustomer(@Body() dto_data:CustomerDTO):any{
    return this.customerService.CreateCustomer(dto_data);
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

