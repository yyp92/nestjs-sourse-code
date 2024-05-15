import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Injectable()
export class BbbService {
    // @OnEvent('aaa.find')
    // handleAaaFind(data) {
    //     console.log('aaa find 调用', data)
    //     this.create(new CreateBbbDto())
    // }

    @OnEvent('aaa.*')
    handleAaaFind(data) {
        console.log('aaa find 调用', data)
        this.create(new CreateBbbDto())
    }

    create(createBbbDto: CreateBbbDto) {
        return 'This action adds a new bbb';
    }

    findAll() {
        return `This action returns all bbb`;
    }

    findOne(id: number) {
        return `This action returns a #${id} bbb`;
    }

    update(id: number, updateBbbDto: UpdateBbbDto) {
        return `This action updates a #${id} bbb`;
    }

    remove(id: number) {
        return `This action removes a #${id} bbb`;
    }
}
