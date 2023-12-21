import { Injectable } from '@nestjs/common';
import { CreateHostParamDto } from './dto/create-host-param.dto';
import { UpdateHostParamDto } from './dto/update-host-param.dto';

@Injectable()
export class HostParamService {
  create(createHostParamDto: CreateHostParamDto) {
    return 'This action adds a new hostParam';
  }

  findAll() {
    return `This action returns all hostParam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hostParam`;
  }

  update(id: number, updateHostParamDto: UpdateHostParamDto) {
    return `This action updates a #${id} hostParam`;
  }

  remove(id: number) {
    return `This action removes a #${id} hostParam`;
  }
}
