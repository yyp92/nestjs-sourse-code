import { Injectable } from '@nestjs/common';
import { CreateFastifyTestDto } from './dto/create-fastify-test.dto';
import { UpdateFastifyTestDto } from './dto/update-fastify-test.dto';

@Injectable()
export class FastifyTestService {
  create(createFastifyTestDto: CreateFastifyTestDto) {
    return 'This action adds a new fastifyTest';
  }

  findAll() {
    return `This action returns all fastifyTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fastifyTest`;
  }

  update(id: number, updateFastifyTestDto: UpdateFastifyTestDto) {
    return `This action updates a #${id} fastifyTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} fastifyTest`;
  }
}
