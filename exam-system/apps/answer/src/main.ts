import { NestFactory } from '@nestjs/core';
import { AnswerModule } from './answer.module';

async function bootstrap() {
    const app = await NestFactory.create(AnswerModule)

    app.enableCors()

    await app.listen(3003)
}
bootstrap()
