# Nest 集成 Etcd 做注册中心、配置中心


## 命令
```bash
# 创建项目
nest new nest-etcd

# 安装包
npm i etcd3

# 封装一个动态模块
nest g module etcd
nest g service etcd

# 再创建个模块
nest g resource aaa

# 安装下 config 的包
npm install @nestjs/config
```




## 总结
这节我们做了 Nest 和 etcd 的集成。

或者加一个 provider 创建连接，然后直接注入 etcdClient 来 put、get、del、watch。

或者再做一步，封装一个动态模块来用，用的时候再传入连接配置

和集成 Redis 的时候差不多。

注册中心和配置中心是微服务体系必不可少的组件，后面会大量用到。
