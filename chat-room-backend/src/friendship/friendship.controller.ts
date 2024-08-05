import { Body, Controller, Get, Post, Param, BadRequestException } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendAddDto } from './dto/friend-add.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService) { }

    @Get('list')
    async friendship(@UserInfo('userId') userId: number) {
        return this.friendshipService.getFriendship(userId);
    }


    // 添加好友
    @Post('add')
    @RequireLogin()
    async add(@Body() friendAddDto: FriendAddDto, @UserInfo("userId") userId: number) {
        return this.friendshipService.add(friendAddDto, userId);
    }

    // 好友请求列表
    @Get('request_list')
    async list(@UserInfo("userId") userId: number) {
        return this.friendshipService.list(userId);
    }

    // 同意申请
    @Get('agree/:id')
    async agree(@Param('id') friendId: number, @UserInfo("userId") userId: number) {
        if (!friendId) {
            throw new BadRequestException('添加的好友 id 不能为空');
        }
        return this.friendshipService.agree(friendId, userId);
    }

    // 拒绝申请
    @Get('reject/:id')
    async reject(@Param('id') friendId: number, @UserInfo("userId") userId: number) {
        if (!friendId) {
            throw new BadRequestException('添加的好友 id 不能为空');
        }
        return this.friendshipService.reject(friendId, userId);
    }

    // 删除好友
    @Get('remove/:id')
    async remove(@Param('id') friendId: number, @UserInfo('userId') userId: number) {
        return this.friendshipService.remove(friendId, userId);
    }
}
