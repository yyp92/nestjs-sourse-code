import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Observable } from 'rxjs';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';


// @WebSocketGateWay 声明这是一个处理 websocket 的类
@WebSocketGateway()
// 分别实现 OnGatewayInit、OnGatewayConnection、OnGatewayDisconnect 接口。
export class AaaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    // * 不建议这么使用
    // @WebSocketServer 注入实例
    @WebSocketServer()
    server: Server;

    constructor(private readonly aaaService: AaaService) {}

    // 在生命周期函数里可以拿到实例对象。
    handleDisconnect(client: Server) {
    }
    handleConnection(client: Server, ...args: any[]) {
        console.log('handleConnection', ...args);
    }
    afterInit(server: Server) {
    }

    // @SubscribeMessage 是指定处理的消息
    // 通过 @MessageBody 取出传过来的消息内容
    @SubscribeMessage('createAaa')
    create(@MessageBody() createAaaDto: CreateAaaDto) {
        this.server.emit('guang', 777);

        return this.aaaService.create(createAaaDto);
    }

    @SubscribeMessage('findAllAaa')
    findAll() {
        // return this.aaaService.findAll();

        // return {
        //     event: 'guang',
        //     data: this.aaaService.findAll()
        // }

        return new Observable((observer) => {
            observer.next({ event: 'guang', data: { msg: 'aaa'} });
      
            setTimeout(() => {
                observer.next({ event: 'guang', data: { msg: 'bbb'} });
            }, 2000);
      
            setTimeout(() => {
                observer.next({ event: 'guang', data: { msg: 'ccc'} });
            }, 5000);
        });
    }

    // @SubscribeMessage('findOneAaa')
    // findOne(@MessageBody() id: number) {
    //     return this.aaaService.findOne(id);
    // }

    @SubscribeMessage('findOneAaa')
    findOne(
        @MessageBody() id: number,

        // * 不建议这么使用
        // @ConnectedSocket 装饰器注入实例
        @ConnectedSocket() server: Server
    ) {

        server.emit('guang', 666);

        return this.aaaService.findOne(id);
    }


    @SubscribeMessage('updateAaa')
    update(@MessageBody() updateAaaDto: UpdateAaaDto) {
        return this.aaaService.update(updateAaaDto.id, updateAaaDto);
    }

    @SubscribeMessage('removeAaa')
    remove(@MessageBody() id: number) {
        return this.aaaService.remove(id);
    }
}
