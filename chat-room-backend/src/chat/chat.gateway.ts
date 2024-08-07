import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ChatHistoryService } from 'src/chat-history/chat-history.service';
import { UserService } from 'src/user/user.service';

interface JoinRoomPayload {
    chatroomId: number
    userId: number
}

interface SendMessagePayload {
    sendUserId: number;
    chatroomId: number;
    message: {
        type: 'text' | 'image',
        content: string
    }
}

/**
 * * 监听 joinRoom、sendMessage 消息。
 * joinRoom 把 client socket 加入房间，房间号为直接用聊天室 id。
 * sendMessage 接收并广播消息到对应房间。
 * message 的格式为 type、content，type 可以是 text、image，也就是可以发送文字、图片。
 * 注意，这里要开启 cors 跨域，websocket 也是有跨域问题的。
 */
@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class ChatGateway {
    constructor(private readonly chatService: ChatService) { }

    @WebSocketServer() server: Server;

    @Inject(ChatHistoryService)
    private chatHistoryService: ChatHistoryService

    @Inject(UserService)
    private userService: UserService

    @SubscribeMessage('joinRoom')
    joinRoom(client: Socket, payload: JoinRoomPayload): void {
        const roomName = payload.chatroomId.toString()

        client.join(roomName)

        this.server.to(roomName).emit('message', {
            type: 'joinRoom',
            userId: payload.userId
        })
    }

    @SubscribeMessage('sendMessage')
    async sendMessage(@MessageBody() payload: SendMessagePayload) {
        const roomName = payload.chatroomId.toString()

        const history = await this.chatHistoryService.add(payload.chatroomId, {
            content: payload.message.content,
            type: payload.message.type === 'image' ? 1 : 0,
            chatroomId: payload.chatroomId,
            senderId: payload.sendUserId
        })

        const sender = await this.userService.findUserDetailById(history.senderId) 

        this.server.to(roomName).emit('message', {
            type: 'sendMessage',
            userId: payload.sendUserId,
            message: {
                ...history,
                sender
            }
        })
    }
}
