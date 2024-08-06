import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendAddDto } from './dto/friend-add.dto';
import { User } from '@prisma/client';

@Injectable()
export class FriendshipService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(friendAddDto: FriendAddDto, userId: number) {
        return await this.prismaService.friendRequest.create({
            data: {
                fromUserId: userId,
                toUserId: friendAddDto.friendId,
                reason: friendAddDto.reason,
                status: 0
            }
        })
    }

    async list(userId: number) {
        return this.prismaService.friendRequest.findMany({
            where: {
                fromUserId: userId
            }
        })
    }
    
    // 添加之前先查询下，如果已经有好友了，就不用添加了。
    async agree(friendId: number, userId: number) {
        await this.prismaService.friendRequest.updateMany({
            where: {
                fromUserId: friendId,
                toUserId: userId,
                status: 0
            },
            data: {
                status: 1
            }
        })
    
        const res = await this.prismaService.friendship.findMany({
            where: {
                userId,
                friendId
            }
        })
    
        if (!res.length) {
            await this.prismaService.friendship.create({
                data: {
                    userId,
                    friendId
                }
            })
        }

        return '添加成功'
    }
    
    async reject(friendId: number, userId: number) {
        await this.prismaService.friendRequest.updateMany({
            where: {
                fromUserId: friendId,
                toUserId: userId,
                status: 0
            },
            data: {
                status: 2
            }
        })

        return '已拒绝'
    } 
    
    // 获取好友列表
    // 我们要查询 userId 或者 friendId 为当前用户的记录，把 id 去重并去掉自身后，查询对应的用户信息。
    async getFriendship(userId: number, name: string) {
        const friends = await this.prismaService.friendship.findMany({
            where: {
                OR: [
                    {
                        userId: userId
                    },
                    {
                        friendId: userId
                    }
                ]
            }
        });

        const set = new Set<number>();
        for (let i = 0; i < friends.length; i++) {
            set.add(friends[i].userId)
            set.add(friends[i].friendId)
        }

        const friendIds = [...set].filter(item => item !== userId)

        const res = []

        for (let i = 0; i < friendIds.length; i++) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: friendIds[i],
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true
                }
            })

            res.push(user)
        }

        return res.filter((item: User) => item.nickName.includes(name))
    }

    async remove(friendId: number, userId: number) {
        await this.prismaService.friendship.deleteMany({
            where: {
                userId,
                friendId,
            }
        })

        return '删除成功'
    }    
}
