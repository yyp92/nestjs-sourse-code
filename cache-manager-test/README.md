# cache-manager
用 CacheManager 的话，只支持 get、set。


## 命令
```bash
# 创建个 nest 项目
nest new cache-manager-test

# 引入 cache-manager
npm install @nestjs/cache-manager cache-manager

# 运行
npm run start:dev
```



## 总结
Nest 文档里操作 Redis 是通过 cache-manager，它可以切换内存存储和 redis 存储，支持 get、set，并且还有 CacheInterceptor 可以对接口做缓存。

但是它并不支持各种 Redis 的命令，绝大多数情况下是不够用的，需要自己再封装。

所以，不如干脆不用那个，自己连接 redis 然后操作它就好。

用到需要 CacheInterceptor 的话也可以自己实现。

后面我们操作 Redis 都是用自己封装个 RedisModule 的方式。
