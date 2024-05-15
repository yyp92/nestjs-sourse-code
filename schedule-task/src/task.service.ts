import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { AaaService } from './aaa/aaa.service';

@Injectable()
export class TaskService {
    @Inject(AaaService)
    private aaaService: AaaService;

    @Cron(CronExpression.EVERY_5_SECONDS, {
        name: 'task1',
        timeZone: 'Asia/shanghai'
    })
    handleCron() {
        console.log('task execute：', this.aaaService.findAll());
    }

    // @Interval 指定任务的执行间隔，参数是毫秒值
    @Interval('task2', 500)
    task2() {
        console.log('task2')
    }

    // @Timeout 指定多长时间后执行一次
    @Timeout('task3', 3000)
    task3() {
        console.log('task3');
    }
}
