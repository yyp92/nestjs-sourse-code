import { HttpService } from '@nestjs/axios';
import { Inject, Controller, Get, Query, Param, BadRequestException } from '@nestjs/common';
import pinyin from 'pinyin'
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
    @Inject(HttpService)
    private httpService: HttpService;

    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('pinyin')
    pinyin(@Query('text') text: string) {
        return pinyin(
            text,
            {
                style: 'normal'
            }
        ).join('')
    }

    @Get('weather/:city')
    async weather(@Param('city') city: string) {
        const key = '187d6c3dd15f4d2d99e2a7e0ee08ba04'
        //然后用 pinyin 拿到 city 的拼音，然后调用和风天气的接口
        const cityPinyin = pinyin(
            city,
            {
                style: 'normal'
            }
        ).join('');

        /**
         * 因为 HttpModule 把 axios 的方法返回值封装成了 rxjs 的 Observerable。
         * 好处是你可以用 rxjs 的操作符了。
         * 坏处是转成 promise 还得加一层 firstValueFrom。
         * 它就是用来把 rxjs Observable 转成 promise 的
         */
        const { data } = await firstValueFrom(
            this.httpService.get(`https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=${key}`)
        )

        const location = data?.['location']?.[0];

        if (!location) {
            throw new BadRequestException('没有对应的城市信息');
        }

        const { data: weatherData } = await firstValueFrom(
            this.httpService.get(`https://api.qweather.com/v7/weather/7d?location=${location.id}&key=${key}`)
        )
      
        console.log('data', `https://api.qweather.com/v7/weather/7d?location=${location.id}&key=${key}`)
        return weatherData;
      
    }
}
