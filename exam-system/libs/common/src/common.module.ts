import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory() {
                return {
                    secret: 'guang',
                    signOptions: {
                        // 默认 30 分钟
                        expiresIn: '30m'
                    }
                }
            }
        }),
    ],
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule { }
