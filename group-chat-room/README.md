# 聊天室


## 命令
```bash
nest new group-chat-room

# 安装 websocket 的包
npm i --save @nestjs/websockets @nestjs/platform-socket.io

# 创建个 websocket 模块， 选择生成 WebSockets 类型的代码
nest g resource chatroom
```



## 总结
主要是基于 socket.io 的 room 实现的，可以把 client socket 加入某个 room，然后向这个 room 发消息。

这样，发消息的时候带上昵称、群聊名等内容，就可以往指定群聊发消息了。

更完善的聊天室，会带上 userId、groupId 等，然后可以根据这俩 id 查询更详细的信息，但只是消息格式更复杂一些，原理都是 room。

