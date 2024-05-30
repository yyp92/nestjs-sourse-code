import { Module } from '@nestjs/common';
import { Lib1Module } from '@app/lib1';
import { App2Controller } from './app2.controller';
import { App2Service } from './app2.service';

@Module({
    imports: [
        Lib1Module
    ],
    controllers: [App2Controller],
    providers: [App2Service],
})
export class App2Module {}
