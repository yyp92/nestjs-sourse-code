import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { Dog, DogSchema } from './entities/dog.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Dog.name,
                schema: DogSchema
            }
        ])
    ],
    controllers: [DogController],
    providers: [DogService],
})
export class DogModule {}
