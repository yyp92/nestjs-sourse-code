import { Injectable } from '@nestjs/common';
import {
    InjectDataSource,
    InjectEntityManager,
    InjectRepository
} from '@nestjs/typeorm'
import {
    DataSource,
    EntityManager,
    Repository
} from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
    /**
     * * 注入 EntityManager, 用它来做增删改查
     * 直接用 EntityManager 的缺点是每个 api 都要带上对应的 Entity：
     */
    // @InjectEntityManager()
    // private manager: EntityManager;
  
    // create(createUserDto: CreateUserDto) {
    //     this.manager.save(User, createUserDto)

    // }

    // findAll() {
    //     return this.manager.find(User);
    // }

    // findOne(id: number) {
    //     return this.manager.findOne(
    //         User,
    //         {
    //             where: {id}
    //         }
    //     );
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     this.manager.save(
    //         User,
    //         {
    //             id: id,
    //             ...updateUserDto
    //         }
    //     )
    // }

    // remove(id: number) {
    //     this.manager.delete(User, id)
    // }




    /**
     * * 简便方法就是先 getRepository(User) 拿到 user 对应的 Repository 对象，再调用这些方法。
     */
    // @InjectEntityManager()
    // private manager: EntityManager;
  
    // create(createUserDto: CreateUserDto) {
    //     this.manager.getRepository(User).save(createUserDto)
    // }

    // findAll() {
    //     return this.manager.find(User);
    // }

    // findOne(id: number) {
    //     return this.manager.findOne(
    //         User,
    //         {
    //             where: {id}
    //         }
    //     );
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     this.manager.save(
    //         User,
    //         {
    //             id: id,
    //             ...updateUserDto
    //         }
    //     )
    // }

    // remove(id: number) {
    //     this.manager.delete(User, id)
    // }




    /**
     * * 直接注入 User 对应的 Respository, 更好
     */
    @InjectEntityManager()
    private manager: EntityManager;

    // 可以在模块里注入 Repository
    @InjectRepository(User)
    private userRepository: Repository<User>;

    // 还可以注入 DataSource, 不过这个不常用。
    @InjectDataSource()
    private dataSource: DataSource;
  
    create(createUserDto: CreateUserDto) {
        this.userRepository.save(createUserDto)
    }

    findAll() {
        // this.dataSource.getRepository()
        return this.manager.find(User);
    }

    findOne(id: number) {
        return this.manager.findOne(
            User,
            {
                where: {id}
            }
        );
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.manager.save(
            User,
            {
                id: id,
                ...updateUserDto
            }
        )
    }

    remove(id: number) {
        this.manager.delete(User, id)
    }
}
