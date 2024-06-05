import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    @InjectEntityManager()
    entityManager: EntityManager;

    @Inject(RedisService)
    redisService: RedisService;

    async initData() {    
        const user2 = new User();
        user2.name = '李四';

        const user3 = new User();
        user3.name = '王五';

        const user4 = new User();
        user4.name = '赵六';

        const user5 = new User();
        user5.name = '刘七';

        await this.entityManager.save(user2);
        await this.entityManager.save(user3);
        await this.entityManager.save(user4);
        await this.entityManager.save(user5);

        const user1 = new User();
        user1.name = '张三';

        user1.followers = [user2, user3, user4];

        user1.following = [user2, user5];

        await this.entityManager.save(user1);
    }

    // 传入 userIds，查询对应的 User 信息返回
    async findUserByIds(userIds: string[] | number[]) {
        let users = [];

        for (let i = 0; i < userIds.length; i ++) {
            const user = await this.entityManager.findOne(
                User,
                {
                    where: {
                        id: +userIds[i]
                    }
                }
            );

            users.push(user);
        }

        return users;
    }

    async getFollowRelationship(userId: number) {
        // 如果 exits 判断 followers 集合存在，就是处理过了，那就直接取 redis 里的这三个集合
        const exists = await this.redisService.exists('followers:' + userId);

        if (!exists) {
            // 根据 id 查询用户的信息，关联查出 followers 和 following
            const user = await this.entityManager.findOne(
                User,
                {
                    where: {
                        id: userId
                    },
                    relations: ['followers', 'following']
                }
            );

            // 如果 follwers 或者 following 为空，那就没有互相关注，可以直接返回
            if (!user.followers.length || !user.following.length) {
                return {
                    followers: user.followers,
                    following: user.following,
                    followEachOther: []
                }
            }


            /**
             * 否则就分别把 follwers 和 follwing 的 id 用 SADD 添加到两个集合中。
             * 之后求两个集合的交集，存入 follow-each-other:userId 的集合。
             * 最后把 followers、following 还有求出来的相互关注的关系返回。
             */
            await this.redisService.sAdd(
                'followers:' + userId,
                ...user.followers.map(item => item.id.toString())
            );

            await this.redisService.sAdd(
                'following:' + userId,
                ...user.following.map(item => item.id.toString())
            )

            await this.redisService.sInterStore(
                'follow-each-other:' + userId,
                'followers:' + userId,
                'following:' + userId
            );

            const followEachOtherIds = await this.redisService.sMember('follow-each-other:' + userId);
            const followEachOtherUsers = await this.findUserByIds(followEachOtherIds);

            return {
                followers: user.followers,
                following: user.following,
                followEachOther: followEachOtherUsers
            }
        }
        else {
            // 根据集合的 id 求出用户信息返回
            const followerIds = await this.redisService.sMember('followers:' + userId);
            const followUsers = await this.findUserByIds(followerIds);

            const followingIds = await this.redisService.sMember('following:' + userId);
            const followingUsers = await this.findUserByIds(followingIds);

            const followEachOtherIds = await this.redisService.sMember('follow-each-other:' + userId);
            const followEachOtherUsers =await this.findUserByIds(followEachOtherIds);

            return {
                followers: followUsers,
                following: followingUsers,
                followEachOtherUsers: followEachOtherUsers
            }
        }
    }

    async follow(userId: number, userId2: number) {
        // 先查询出 user 的数据，在 followers 添加 user2，然后 save 保存到数据库。
        const user = await this.entityManager.findOne(
            User,
            {
                where: {
                    id: userId
                },
                relations: ['followers', 'following']
            }
        );
      
        const user2 = await this.entityManager.findOne(
            User,
            {
                where: {
                    id: userId2
                }
            }
        );
      
        user.followers.push(user2);
      
        await this.entityManager.save(User, user);

      
        // 之后查询下 redis，如果有 followers:userId 的 key，就更新下 followers 和 follow-each-other 集合。
        // 这里 user1 和 user2 的集合都要查询并更新下。
        const exists = await this.redisService.exists('followers:' + userId);
        if (exists) {
            await this.redisService.sAdd(
                'followers:' + userId,
                userId2.toString()
            );

            await this.redisService.sInterStore(
                'follow-each-other:' + userId,
                'followers:' + userId,
                'following:' + userId
            );
        }
        
        const exists2 = await this.redisService.exists('following:' + userId2);
        if (exists2) {
            await this.redisService.sAdd(
                'following:' + userId2,
                userId.toString()
            );

            await this.redisService.sInterStore(
                'follow-each-other:' + userId2,
                'followers:' + userId2,
                'following:' + userId2
            );
        }
    }  
}
