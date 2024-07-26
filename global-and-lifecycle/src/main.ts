import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    setTimeout(() => {
        // app.close() 只是触发销毁逻辑，但不会真正退出进程
        app.close()
    }, 3000)
}
bootstrap();
