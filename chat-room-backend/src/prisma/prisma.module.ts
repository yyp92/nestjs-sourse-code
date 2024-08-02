import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 这样各处就都可以注入 PrismaService 用了
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule { }
