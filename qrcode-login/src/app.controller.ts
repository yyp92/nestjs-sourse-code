import {
    Controller,
    Get,
    Query,
    Headers,
    BadRequestException,
    Inject,
    UnauthorizedException
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

// * 实际这个是存在redis, 这里就简化一下
const map = new Map<string, QrCodeInfo>();

// noscan 未扫描
// scan-wait-confirm -已扫描，等待用户确认
// scan-confirm 已扫描，用户同意授权
// scan-cancel 已扫描，用户取消授权
// expired 已过期
interface QrCodeInfo{
    status: 'noscan' | 'scan-wait-confirm' | 'scan-confirm' | 'scan-cancel' | 'expired',
    userInfo?: {
        userId: number;
    }
}


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Inject(JwtService)
    private jwtService: JwtService;

    private users = [
        {id: 1, username: 'dong', password: '111'},
        {id: 2, username: 'guang', password: '222'},
    ];

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('login')
    async login(
        @Query('username') username: string,
        @Query('password') password: string
    ) {
        const user = this.users.find(item => item.username === username);
    
        if (!user) {
            throw new UnauthorizedException('用户不存在');
        }

        if (user.password !== password) {
            throw new UnauthorizedException('密码错误');
        }
    
        return {
            token: await this.jwtService.sign({
                userId: user.id
            })
        }
    }

    @Get('userInfo')
    async userInfo(@Headers('Authorization') auth: string) {
        try {
            const [, token] = auth.split(' ');
            const info = await this.jwtService.verify(token);

            const user = this.users.find(item => item.id == info.userId);

            return user;
        }
        catch(e) {
            throw new UnauthorizedException('token 过期，请重新登录');
        }
    }

    // 生成二维码
    @Get('qrcode/generate')
    async generate() {
        // 用 node 的 crypto 模块生成一个随机的 uuid
        const uuid = randomUUID();
        const dataUrl = await qrcode.toDataURL(`http://localhost:3000/pages/comfirm.html?id=${uuid}`);

        map.set(
            `qrcode_${uuid}`,
            {
                status: 'noscan'
            }
        );          

        return {
            qrcode_id: uuid,
            img: dataUrl
        }
    }

    // 用来查询二维码状态
    @Get('qrcode/check')
    async check(@Query('id') id: string) {
        const info = map.get(`qrcode_${id}`);

        if (info.status === 'scan-confirm') {
            return {
                token: await this.jwtService.sign({
                    userId: info.userInfo.userId
                }),
                ...info
            }
        }

        return info;
    }

    // 已扫描，等待用户确认
    @Get('qrcode/scan')
    async scan(@Query('id') id: string) {
        const info = map.get(`qrcode_${id}`);

        if (!info) {
            throw new BadRequestException('二维码已过期');
        }

        info.status = 'scan-wait-confirm';

        return 'success';
    }

    // 已扫描，用户同意授权
    @Get('qrcode/confirm')
    async confirm(
        @Query('id') id: string,
        @Headers('Authorization') auth: string
    ) {
        // 把 token 取出来，拿到其中的用户信息，保存到 map 里
        let user;
        try {
            const [, token] = auth.split(' ');
            const info = await this.jwtService.verify(token);

            user = this.users.find(item => item.id == info.userId);
        }
        catch(e) {
            throw new UnauthorizedException('token 过期，请重新登录');
        }

        const info = map.get(`qrcode_${id}`);

        if (!info) {
            throw new BadRequestException('二维码已过期');
        }

        info.status = 'scan-confirm';
        info.userInfo = user;

        return 'success';
    }

    // 已扫描，用户取消授权
    @Get('qrcode/cancel')
    async cancel(@Query('id') id: string) {
        const info = map.get(`qrcode_${id}`);

        if (!info) {
            throw new BadRequestException('二维码已过期');
        }

        info.status = 'scan-cancel';

        return 'success';
    }
}
