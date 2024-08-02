/**
 * nest 装饰器学习
 */

import { Module } from '@nestjs/common';
import { AllDecoratorService } from './all-decorator.service';
import { AllDecoratorController } from './all-decorator.controller';


/**
 * @Module声明模块
 */
@Module({
    controllers: [AllDecoratorController],
    providers: [
        AllDecoratorService,

        {
            provide: 'Guang',
            useFactory() {
                return {
                    name: 'guang'
                }
            }
        }
    ],
})
export class AllDecoratorModule { }
