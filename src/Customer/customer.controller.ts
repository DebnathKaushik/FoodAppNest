import { Body, Controller ,Get,Post,Query, UsePipes, ValidationPipe,UseInterceptors,UploadedFile} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./DTO/customerDTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError,diskStorage } from "multer";

//'Customer' prefix to all routes inside this controller.
@Controller('Customer') 
export class CustomerController{
constructor(private readonly customer_objService : CustomerService){}

@Get('profile')
func1(): string{
return this.customer_objService.func1();
}


// Create Customer // [data(Customer Type) pass DTO --> service]
@Post('create-customer')
@UsePipes(new ValidationPipe())
C_CreateCustomer(@Body() dto_data:CustomerDTO):any{
    return this.customer_objService.CreateCustomer(dto_data);
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
