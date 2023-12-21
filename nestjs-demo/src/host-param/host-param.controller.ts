import { Controller, Get, Post, Body, Patch, Param, Delete, HostParam, Req, Res, Next, HttpCode, Header, Redirect, Render } from '@nestjs/common';
import {NextFunction, Request, Response} from 'express'
import { HostParamService } from './host-param.service';
import { CreateHostParamDto } from './dto/create-host-param.dto';
import { UpdateHostParamDto } from './dto/update-host-param.dto';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class HostParamController {
    // @Get('bbb')
    // hello() {
    //     return 'hello';
    // }


    @Get('bbb')
    hello(@HostParam('host') host) {
        return host;
    }

    @Get('ccc')
    getRequest(@Req() req: Request) {
        console.log('hostname', req.hostname)
        console.log('url', req.url)
    }


    /**
     * 当你注入 response 对象之后，服务器会一直没有响应：
     */
    // @Get('ddd')
    // getResponse(@Res() res: Response) {
    //     return 'ddd'
    // }

    /**
     * 你可以自己返回响应
     */
    // @Get('ddd')
    // getResponse(@Res() res: Response) {
    //     res.end('ddd')
    //     return 'ddd'
    // }

    /**
     * Nest 这么设计是为了避免你自己返回的响应和 Nest 返回的响应的冲突。
     * 如果你不会自己返回响应，可以通过 passthrough 参数告诉 Nest
     */
    // @Get('ddd')
    // getResponse(@Res({passthrough: true}) res: Response) {  
    //     return 'ddd'
    // }

    /**
     * 除了注入 @Res 不会返回响应外，注入 @Next 也不会：
     */
    @Get('ddd')
    getResponse(@Next() next: NextFunction) {  
        console.log('handler1')
        next()
        return '111'
    } 
    @Get('ddd')
    getResponse1() {  
        console.log('handler2')
        return '222'
    }


    @Get('fff')
    @HttpCode(202)
    getHttpCode() {  
        return 'hello'
    }


    @Get('ggg')
    @Header('aaa', 'bbb')
    getResHeader() {  
        return 'hello'
    }


    @Get('hhh')
    @Redirect('http://juejin.cn')
    getRedirect() {  
        return 'hello'
    }


    @Get('user')
    @Render('user')
    getRender() {  
        return {name: 'guang', age: 20}
    }
}
