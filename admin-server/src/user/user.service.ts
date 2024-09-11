import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SystemService } from './../shared/system.service';
import { User } from './entities/user.mongo.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly systemService: SystemService,

    @Inject('USER_REPOSITORY')
    private readonly userRepository: MongoRepository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // console.log('Env', this.systemService.getEnv())

    // 调用Model
    // return 'This action adds a new user';

    // 测试获取 mongodb 的数据
    return this.userRepository.save({
      name: 'haha',
      email: '1@1.com'
    })

    return this.userRepository.findAndCount({})
  }

  findAll() {
    return this.userRepository.findAndCount({})

    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
