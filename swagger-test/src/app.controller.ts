import {
    Controller,
    Get,
    Post,
    Query,
    Param,
    Body,
    HttpStatus,
    UnauthorizedException
} from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
    ApiBody,
    ApiTags,
    ApiBearerAuth,
    ApiCookieAuth,
    ApiBasicAuth
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { CccDto } from './ccc.dto';
import { CccVo } from './ccc.vo';

@ApiBearerAuth('bearer')
@ApiTags('xxx')
@Controller('xxx')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @ApiTags('xxx-get')
    // 描述接口的信息
    @ApiOperation({
        summary: '测试 aaa',
        description: 'aaa 描述'
    })
    // 描述返回值信息
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'aaa 成功',
        type: String
    })
    // 描述 query 参数信息
    @ApiQuery({
        name: 'a1',
        type: String,
        description: 'a1 param',
        required: false,
        example: '1111',
    })
    @ApiQuery({
        name: 'a2',
        type: Number,
        description: 'a2 param',
        required: true,
        example: 2222,
    }) 
    @Get('aaa')
    aaa(@Query('a1') a1, @Query('a2') a2) {
        console.log(a1, a2);
        return 'aaa success';
    }

    @ApiCookieAuth('cookie')
    @ApiTags('xxx-get')
    @ApiOperation({
        summary: '测试 bbb',
        description: 'bbb 描述'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'bbb 成功',
        type: String
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'id 不合法'
    })
    @ApiParam({
        name: 'id',
        description: 'ID',
        required: true,
        example: 222,
    })
    @Get('bbb/:id')
    bbb(@Param('id') id) {
        console.log(id);

        if (id !== 111) {
            throw new UnauthorizedException();
        }

        return 'bbb success';
    }

    @ApiBasicAuth('basic')
    @ApiOperation({summary:'测试 ccc'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'ccc 成功',
        type: CccVo
    })
    @ApiBody({
        type: CccDto
    })
    @Post('ccc')
    ccc(@Body('ccc') ccc: CccDto) {
        console.log(ccc);

        const vo = new CccVo();
        vo.aaa = 111;
        vo.bbb = 222;
        return vo;

        // return {
        //     aaa: 111,
        //     bbb: 222
        // };
    }
}
