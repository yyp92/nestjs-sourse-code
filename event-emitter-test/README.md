# Nest 里如何实现事件通信


## 命令
```bash
# 创建项目
nest new event-emitter-test

# 安装用到的包
npm i --save @nestjs/event-emitter

# 然后创建两个 module
nest g resource aaa --no-spec
nest g resource bbb --no-spec

# 具体案例，用户注册成功之后，通知模块里发送欢迎邮件
# user 用户模块
nest g resource user --no-spec
# notification 通知模块
nest g resource notification --no-spec
# email 邮件模块
nest g module email
nest g service email --no-spec

# 安装 nodemailer 包
npm install --save nodemailer
```




## 总结
多个业务模块之间可能会有互相调用的关系，但是也不方便直接注入别的业务模块的 Service 进来。

这种就可以通过 EventEmitter 来实现。

在一个 service 里 emit 事件和 data，另一个 service 里 @OnEvent 监听这个事件就可以了。

用起来很简单，但比起注入别的模块的 service 方便太多了。
