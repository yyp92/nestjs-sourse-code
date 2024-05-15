# 定时任务 + Redis 实现阅读量计数


## 命令
```bash
# 创建项目
nest new article-views -p npm

# 安装 typeorm 相关的包
npm install --save @nestjs/typeorm typeorm mysql2

# 然后建个文章和用户的模块：
nest g resource user --no-spec
nest g resource article --no-spec

# 安装相关登录的包
npm install express-session @types/express-session

# 安装 redis 的包
npm install --save redis

# 然后创建个 redis 模块
nest g module redis
nest g service redis

# 需要引入定时任务包 @nestjs/schedule
npm install --save @nestjs/schedule

# 然后创建一个 service
nest g module task
nest g service task
```




## 总结
我们通过 redis + 定时任务实现了阅读量计数的功能。

因为阅读是个高频操作，所以我们查出数据后存在 redis里，之后一直访问 redis 的数据，然后通过定时任务在凌晨 4 点把最新数据写入数据库。

并且为了统计真实的用户阅读量，我们在 redis 存储了用户看了哪篇文章的标识，10 分钟后过期。

这就是我们常见的阅读量功能的实现原理。
