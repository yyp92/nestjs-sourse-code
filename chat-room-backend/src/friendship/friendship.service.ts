import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendAddDto } from './dto/friend-add.dto';
import { User } from '@prisma/client';

@Injectable()
export class FriendshipService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(friendAddDto: FriendAddDto, userId: number) {
        // 先根据 username 查询 user，如果不存在就返回错误，提示 username 不存在。
        const friend = await this.prismaService.user.findUnique({
            where: {
                username: friendAddDto.username
            }
        });

        if (!friend) {
            throw new BadRequestException('要添加的 username 不存在');
        }

        // 如果添加的是自己，返回错误，提示不能添加自己为好友。
        if (friend.id === userId) {
            throw new BadRequestException('不能添加自己为好友');
        }

        const found = await this.prismaService.friendship.findMany({
            where: {
                userId,
                friendId: friend.id
            }
        })

        // 如果已经添加过，返回错误，提示已经添加。
        if (found.length) {
            throw new BadRequestException('该好友已经添加过');
        }

        // 否则，创建好友申请。
        return await this.prismaService.friendRequest.create({
            data: {
                fromUserId: userId,
                toUserId: friend.id,
                reason: friendAddDto.reason,
                status: 0
            }
        })

    }

    // 其实用户发出的好友请求、发给用户的好友请求，都应该展示出来。
    // 并且接口应该顺带把用户信息也给查出来返回。
    async list(userId: number) {
        // 分别查询 fromUserId、toUsrId 为 userId 的好友请求，然后把其中的 user 查出来返回。
        const fromMeRequest = await this.prismaService.friendRequest.findMany({
            where: {
                fromUserId: userId
            }
        })

        const toMeRequest = await this.prismaService.friendRequest.findMany({
            where: {
                toUserId: userId
            }
        })

        const res = {
            toMe: [],
            fromMe: []
        }

        for (let i = 0; i < fromMeRequest.length; i++) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: fromMeRequest[i].toUserId
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true,
                    headPic: true,
                    createTime: true
                }
            })

            res.fromMe.push({
                ...fromMeRequest[i],
                toUser: user
            })
        }

        for (let i = 0; i < toMeRequest.length; i++) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: toMeRequest[i].fromUserId
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true,
                    headPic: true,
                    createTime: true
                }
            })

            res.toMe.push({
                ...toMeRequest[i],
                fromUser: user
            })
        }

        return res;
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
