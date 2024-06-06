import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogService {
    @InjectModel(Dog.name)
    private dogModel: Model<Dog>;

    create(createDogDto: CreateDogDto) {
        const dog = new this.dogModel(createDogDto);
        
        return dog.save();
    }

    findAll() {
        return this.dogModel.find();
    }

    findOne(id: string) {
        return this.dogModel.findById(id);
    }

    update(id: string, updateDogDto: UpdateDogDto) {
        return this.dogModel.findByIdAndUpdate(id, updateDogDto);
    }

    remove(id: string) {
        return this.dogModel.findByIdAndDelete(id);
    }
}
