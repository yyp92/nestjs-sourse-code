import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@WebSocketGateway()
export class ChatroomGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('joinRoom')
    joinRoom(client: Socket, payload: any): void {
        console.log(payload.roomName)

        client.join(payload.roomName)

        this.server.to(payload.roomName).emit('message', {
            nickName: payload.roomName,
            message: `${payload.nickName} 加入了 ${payload.roomName} 房间`
        })
    }

    // @SubscribeMessage('joinRoom')
    // joinRoom(client: Socket, room: string): void {
    //     console.log(room);

    //     client.join(room);
    //     this.server.to(room).emit('message', `新用户加入了 ${room} 房间`);
    // }

    @SubscribeMessage('sendMessage')
    sendMessage(@MessageBody() payload: any): void {
        console.log(payload)

        this.server.to(payload.room).emit('message', {
            nickName: payload.nickName,
            message: payload.message}
        )
    }
}
