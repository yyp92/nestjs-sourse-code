import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ChatroomService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async createOneToOneChatroom(friendId: number, userId: number) {
        const { id } = await this.prismaService.chatroom.create({
            data: {
                name: '聊天室' + Math.random().toString().slice(2, 8),
                type: false,
            },
            select: {
                id: true
            }
        })

        await this.prismaService.userChatroom.create({
            data: {
                userId,
                chatroomId: id
            }
        })

        await this.prismaService.userChatroom.create({
            data: {
                userId: friendId,
                chatroomId: id
            }
        })

        return id

        // return '创建成功'
    }

    async createGroupChatroom(name: string, userId: number) {
        const { id } = await this.prismaService.chatroom.create({
            data: {
                name,
                type: true
            }
        })

        await this.prismaService.userChatroom.create({
            data: {
                userId,
                chatroomId: id
            }
        })

        return '创建成功'
    }

    // 首先查询 userId 的所有 chatrooms 的 id，然后查询 id 对应的 chatroom
    async list(userId: number, name: string) {
        const chatroomIds = await this.prismaService.userChatroom.findMany({
            where: {
                userId
            },
            select: {
                chatroomId: true
            }
        })

        const chatrooms = await this.prismaService.chatroom.findMany({
            where: {
                id: {
                    in: chatroomIds.map(item => item.chatroomId)
                },
                name: {
                    contains: name
                }
            },
            select: {
                id: true,
                name: true,
                type: true,
                createTime: true
            }
        })

        // return chatrooms

        const res = [];
        for (let i = 0; i < chatrooms.length; i++) {
            const userIds = await this.prismaService.userChatroom.findMany({
                where: {
                    chatroomId: chatrooms[i].id
                },
                select: {
                    userId: true
                }
            })

            // 返回聊天室列表的时候，如果是一对一聊天室，就查询下对方用户的信息，用他的名字替换聊天室名字
            if (chatrooms[i].type === false) {
                const user = await this.prismaService.user.findUnique({
                    where: {
                        id: userIds.filter(item => item.userId !== userId)[0].userId
                    }
                })

                chatrooms[i].name = user.nickName
            }

            res.push({
                ...chatrooms[i],
                userCount: userIds.length,
                userIds: userIds.map(item => item.userId)
            })
        }

        return res
    }

    async members(chatroomId: number) {
        const userIds = await this.prismaService.userChatroom.findMany({
            where: {
                chatroomId
            },
            select: {
                userId: true
            }
        })

        const users = await this.prismaService.user.findMany({
            where: {
                id: {
                    in: userIds.map(item => item.userId)
                }
            },
            select: {
                id: true,
                username: true,
                nickName: true,
                headPic: true,
                createTime: true,
                email: true
            }
        })

        return users
    }

    async info(id: number) {
        const chatroom = await this.prismaService.chatroom.findUnique({
            where: {
                id
            }
        })

        return {
            ...chatroom,
            users: await this.members(id)
        }
    }

    async join(id: number, userId: number) {
        const chatroom = await this.prismaService.chatroom.findUnique({
            where: {
                id
            }
        })

        if (chatroom.type === false) {
            throw new BadRequestException('一对一聊天室不能加人');
        }

        await this.prismaService.userChatroom.create({
            data: {
                userId,
                chatroomId: id
            }
        })

        return '加入成功'
    }

    async quit(id: number, userId: number) {
        const chatroom = await this.prismaService.chatroom.findUnique({
            where: {
                id
            }
        })

        if (chatroom.type === false) {
            throw new BadRequestException('一对一聊天室不能退出')
        }

        await this.prismaService.userChatroom.deleteMany({
            where: {
                userId,
                chatroomId: id
            }
        })

        return '退出成功'
    }

    // 因为我们没用外键关联，实现起来麻烦一些
    async queryOneToOneChatroom(userId1: number, userId2: number) {
        // 先查询 userId1 的所有 chatrooms，再查询 userId2 的所有 chatrooms2
        const chatrooms = await this.prismaService.userChatroom.findMany({
            where: {
                userId: userId1
            }
        })
        const chatrooms2 = await this.prismaService.userChatroom.findMany({
            where: {
                userId: userId2
            }
        })

        let res

        // 然后再查询 chatrooms 和 chatroom2 的交集，返回第一个 chatroomId
        for (let i = 0; i < chatrooms.length; i++) {
            const chatroom = await this.prismaService.chatroom.findFirst({
                where: {
                    id: chatrooms[i].chatroomId
                }
            })

            // 过程中要过滤掉类型为群聊的聊天室
            if (chatroom?.type === true) {
                continue
            }

            const found = chatrooms2.find(item2 => item2.chatroomId === chatroom.id)
            if (found) {
                res = found.chatroomId
                break
            }
        }

        return res
    }
}
