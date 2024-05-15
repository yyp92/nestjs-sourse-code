import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { AaaModule } from './aaa/aaa.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        AaaModule
    ],
    controllers: [AppController],
    providers: [AppService, TaskService],
})
export class AppModule implements OnApplicationBootstrap {
    // 可以注入 SchedulerRegistry 来动态增删定时任务
    @Inject(SchedulerRegistry)
    private schedulerRegistry: SchedulerRegistry;

    onApplicationBootstrap() {
        // const jobs = this.schedulerRegistry.getCronJobs()
        // console.log('jobs', jobs)



        const crons = this.schedulerRegistry.getCronJobs();
    
        crons.forEach((item, key) => {
            item.stop();
            this.schedulerRegistry.deleteCronJob(key);
        });

        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach(item => {
            const interval = this.schedulerRegistry.getInterval(item);
            clearInterval(interval);

            this.schedulerRegistry.deleteInterval(item);
        });

        const timeouts = this.schedulerRegistry.getTimeouts();
        timeouts.forEach(item => {
            const timeout = this.schedulerRegistry.getTimeout(item);
            clearTimeout(timeout);

            this.schedulerRegistry.deleteTimeout(item);
        });

        console.log(this.schedulerRegistry.getCronJobs());
        console.log(this.schedulerRegistry.getIntervals());
        console.log(this.schedulerRegistry.getTimeouts());


        const job = new CronJob(`0/5 * * * * *`, () => {
            console.log('cron job');
        });
        
        this.schedulerRegistry.addCronJob('job1', job);
        job.start();
        
        const interval = setInterval(() => {
            console.log('interval job')
        }, 3000);
        this.schedulerRegistry.addInterval('job2', interval);
        
        const timeout = setTimeout(() => {
            console.log('timeout job');
        }, 5000);
        this.schedulerRegistry.addTimeout('job3', timeout);
    }
}
