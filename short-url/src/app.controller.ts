import {
    Controller,
    Get,
    Inject,
    Query,
    Redirect,
    Param,
    BadRequestException
} from '@nestjs/common';
import { AppService } from './app.service';
import { ShortLongMapService } from './short-long-map.service';

@Controller()
export class AppController {
    @Inject(ShortLongMapService)
    private shortLongMapService: ShortLongMapService;

    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('short-url')
    async generateShortUrl(@Query('url') longUrl) {
        return this.shortLongMapService.generate(longUrl);
    }

    @Get(':code')
    @Redirect()
    async jump(@Param('code') code) {
        const longUrl = await this.shortLongMapService.getLongUrl(code);

        if (!longUrl) {
            throw new BadRequestException('短链不存在');
        }

        return {
            url: longUrl,
            statusCode: 302
        }  
    }
}
