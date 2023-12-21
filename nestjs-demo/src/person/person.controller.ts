import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';


@Controller('api/person')
export class PersonController {
    constructor(private readonly personService: PersonService) {}


    /**
     * query
     * 
     * query 是 url 中 ? 后的字符串，需要做 url encode。
     * 注意，这个 find 的路由要放到 :id 的路由前面，因为 Nest 是从上往下匹配的，如果放在后面，那就匹配到 :id 的路由了。
     */
    @Get('find')
    query(@Query('name') name: string, @Query('age') age: number) {
        return `received: name=${name},age=${age}`;
    }


    /**
     * url param
     * 
     * @Controller('api/person') 的路由和 @Get(':id') 的路由会拼到一起，也就是只有 /api/person/xxx 的 get 请求才会走到这个方法。
     */ 
    @Get(':id')
    urlParam(@Param('id') id: string) {
        return `received: id=${id}`;
    } 


    /**
     * form urlencoded
     */
    // @Post()
    // body(@Body() createPersonDto: CreatePersonDto) {
    //   return `received: ${JSON.stringify(createPersonDto)}`
    // }


    /**
     * json
     */
    @Post()
    body1(@Body() createPersonDto: CreatePersonDto) {
      return `received: ${JSON.stringify(createPersonDto)}`
    }


    /**
     * form data
     * 
     * 适合文件上传
     * 
     *  form data 使用 FilesInterceptor 的拦截器，用 @UseInterceptors 装饰器启用，然后通过 @UploadedFiles 来取。
     */
    @Post('file')
    @UseInterceptors(AnyFilesInterceptor({
        dest: 'uploads/'
    }))
    body2(@Body() createPersonDto: CreatePersonDto, @UploadedFiles() files: Array<Express.Multer.File>) {
      console.log(files);
      return `received: ${JSON.stringify(createPersonDto)}`
    }
}



// @Controller('person')
// export class PersonController {
//   constructor(private readonly personService: PersonService) {}

//   @Post()
//   create(@Body() createPersonDto: CreatePersonDto) {
//     return this.personService.create(createPersonDto);
//   }

//   @Get()
//   findAll() {
//     return this.personService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.personService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
//     return this.personService.update(+id, updatePersonDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.personService.remove(+id);
//   }
// }

