# 基于 gRPC 实现跨语言的微服务通信


## 命令
```bash
# 创建个 nest 项目
nest new grpc-client

# 我们用 monorepo 的形式来放 client 和 server 的代码
nest g app grpc-server

# 安装用到的微服务的包
npm install --save @nestjs/microservices

# grpc 的包
npm install --save @grpc/grpc-js @grpc/proto-loader
```




## 总结
这节我们学习了基于 gRPC 的远程方法调用。

不同语言的微服务之间可以基于 gRPC 来相互调用对方的方法。

它的实现方式是通过 protocol buffer 的语法来定义通信数据的格式，定义 package、service。

然后 server 端实现 service 对应的方法，client 端远程调用这些 service。

这样就可以实现在 java、node、go、python 等多种语言之间实现微服务的远程方法调用。
