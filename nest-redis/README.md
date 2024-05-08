# nest-redis

## 命令
```bash
# 执行 nest new nest-redis 创建一个 nest 项目
nest new nest-redis -p npm

# 安装用到的 redis 的包
npm install redis 

# 运行
nest start --watch
```



## 总结
通过 redis 的 npm 包（redis、ioredis 等）可以连接 redis server 并执行命令。

如果在 nest 里，可以通过 useFactory 动态创建一个 provider，在里面使用 redis 的 npm 包创建连接。

redis 是必备的中间件，后面的项目实战会大量用到。
