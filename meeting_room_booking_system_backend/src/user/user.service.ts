import {
    Inject,
    Injectable,
    Logger,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListVo } from './vo/user-list.vo';

@Injectable()
export class UserService {
    // 创建 logger 对象
    private logger = new Logger();

    // 注入 Repository<User>
    // 这里注入 Repository 需要在 UserModule 里引入下 TypeOrm.forFeature
    @InjectRepository(User)
    private userRepository: Repository<User>;

    @InjectRepository(Role)
    private roleRepository: Repository<Role>;

    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>;

    @Inject(RedisService)
    private redisService: RedisService; 

    // 注册
    async register(user: RegisterUserDto) {
        const captcha = await this.redisService.get(`captcha_${user.email}`);

        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }

        if (user.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.userRepository.findOneBy({
            username: user.username
        });

        if (foundUser) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        }

        const newUser = new User();
        newUser.username = user.username;
        newUser.password = md5(user.password);
        newUser.email = user.email;
        newUser.nickName = user.nickName;

        try {
            await this.userRepository.save(newUser);

            return '注册成功';
        }
        catch(e) {
            this.logger.error(e, UserService);
                return '注册失败';
            }
    }

    // 初始化数据
    async initData() {
        const user1 = new User();
        user1.username = "zhangsan";
        user1.password = md5("111111");
        user1.email = "xxx@xx.com";
        user1.isAdmin = true;
        user1.nickName = '张三';
        user1.phoneNumber = '13233323333';
    
        const user2 = new User();
        user2.username = 'lisi';
        user2.password = md5("222222");
        user2.email = "yy@yy.com";
        user2.nickName = '李四';
    
        const role1 = new Role();
        role1.name = '管理员';
    
        const role2 = new Role();
        role2.name = '普通用户';
    
        const permission1 = new Permission();
        permission1.code = 'ccc';
        permission1.description = '访问 ccc 接口';
    
        const permission2 = new Permission();
        permission2.code = 'ddd';
        permission2.description = '访问 ddd 接口';
    
        user1.roles = [role1];
        user2.roles = [role2];
    
        role1.permissions = [
            permission1,
            permission2
        ];
        role2.permissions = [permission1];
    
        await this.permissionRepository.save([
            permission1,
            permission2
        ]);
        await this.roleRepository.save([
            role1,
            role2
        ]);
        await this.userRepository.save([
            user1,
            user2
        ]);
    }
    
    // 登录
    async login(
        loginUserDto: LoginUserDto,
        isAdmin: boolean
    ) {
        const user = await this.userRepository.findOne({
            where: {
                username: loginUserDto.username,
                isAdmin
            },

            // 设置级联查询 roles 和 roles.permissions
            relations: [
                'roles',
                'roles.permissions'
            ]
        });
    
        // 如果没有找到用户，返回 400 响应提示用户不存在
        if (!user) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }
    
        // 如果密码不对，返回 400 响应，提示密码错误
        if (user.password !== md5(loginUserDto.password)) {
            throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
        }

        const vo = new LoginUserVo();
        vo.userInfo = {
            id: user.id,
            username: user.username,
            nickName: user.nickName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            headPic: user.headPic,
            createTime: user.createTime.getTime(),
            isFrozen: user.isFrozen,
            isAdmin: user.isAdmin,
            roles: user.roles.map(item => item.name),

            // permissions 是所有 roles 的 permissions 的合并，要去下重
            permissions: user.roles.reduce((arr, item) => {
                item.permissions.forEach(permission => {
                    if (arr.indexOf(permission) === -1) {
                        arr.push(permission);
                    }
                })

                return arr;
            }, [])
        }
    
        return vo;
    }

    async findUserById(userId: number, isAdmin: boolean) {
        const user =  await this.userRepository.findOne({
            where: {
                id: userId,
                isAdmin
            },
            relations: [
                'roles',
                'roles.permissions'
            ]
        });
    
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            roles: user.roles.map(item => item.name),
            permissions: user.roles.reduce((arr, item) => {
                item.permissions.forEach(permission => {
                    if (arr.indexOf(permission) === -1) {
                        arr.push(permission);
                    }
                })
                return arr;
            }, [])
        }
    }

    async findUserDetailById(userId: number) {
        const user =  await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
    
        return user;
    }

    // 修改密码
    async updatePassword(
        // userId: number,
        passwordDto: UpdateUserPasswordDto
    ) {
        // 先查询 redis 中有没有邮箱对应的验证码
        const captcha = await this.redisService.get(`update_password_captcha_${passwordDto.email}`);
    
        // 没有的话就返回验证码不存在或者不正确
        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }
    
        if (passwordDto.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }
    
        // 查到的话再调用 Repository 去更新数据库中的用户密码
        // 检查通过之后根据 id 查询用户信息，修改密码之后 save
        const foundUser = await this.userRepository.findOneBy({
            username: passwordDto.username
        });

        if (foundUser.email !== passwordDto.email) {
            throw new HttpException('邮箱不正确', HttpStatus.BAD_REQUEST);
        }
    
        foundUser.password = md5(passwordDto.password);
    
        try {
            await this.userRepository.save(foundUser);

            return '密码修改成功';
        }
        catch(e) {
            this.logger.error(e, UserService);

            return '密码修改失败';
        }
    }

    // 修改个人信息
    async update(
        userId: number,
        updateUserDto: UpdateUserDto
    ) {
        const captcha = await this.redisService.get(`update_user_captcha_${updateUserDto.email}`);
    
        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }
    
        if (updateUserDto.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }
    
        const foundUser = await this.userRepository.findOneBy({
            id: userId
        });
    
        if (updateUserDto.nickName) {
            foundUser.nickName = updateUserDto.nickName;
        }

        if (updateUserDto.headPic) {
            foundUser.headPic = updateUserDto.headPic;
        }
    
        try {
          await this.userRepository.save(foundUser);

          return '用户信息修改成功';
        }
        catch(e) {
          this.logger.error(e, UserService);

          return '用户信息修改失败';
        }
    }

    // 冻结用户
    async freezeUserById(id: number) {
        const user = await this.userRepository.findOneBy({
            id
        });
        user.isFrozen = true;
        
    
        await this.userRepository.save(user);
    }

    // 获取用户列表
    async findUsersByPage(
        username: string,
        nickName: string,
        email: string,
        pageNo: number,
        pageSize: number
    ) {
        const condition: Record<string, any> = {};

        // 根据 username、nickName、email 搜索的时候，使用模糊查询。
        if (username) {
            condition.username = Like(`%${username}%`);   
        }

        if (nickName) {
            condition.nickName = Like(`%${nickName}%`); 
        }

        if (email) {
            condition.email = Like(`%${email}%`); 
        }

        // 当前页码减一乘以 pageSize，就是要跳过的记录数，然后再取 pageSize 条
        const skipCount = (pageNo - 1) * pageSize;
    
        const [users, totalCount] = await this.userRepository.findAndCount({
            select: [
                'id',
                'username',
                'nickName',
                'email',
                'phoneNumber',
                'isFrozen',
                'headPic',
                'createTime'
            ],
            skip: skipCount,
            take: pageSize,
            where: condition
        });

        const vo = new UserListVo();
        vo.users = users;
        vo.totalCount = totalCount;

        return vo;
    
        // return {
        //     users,
        //     totalCount
        // }
    }
}
