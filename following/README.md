# 基于 Redis 实现关注关系


## 命令
```bash
# 创建项目
nest new following

# 安装 TypeORM 的包
npm install --save @nestjs/typeorm typeorm mysql2

# 新建一个 user 模块
nest g resource user --no-spec

# 安装 redis 的包
npm install --save redis

# 创建个 redis 模块
nest g module redis
nest g service redis
```




## 总结
这节我们实现了下关注、被关注、互相关注。

在 mysql 里用中间表来存储 user 和 user 的关系，在 TypeORM 里用 @ManyToMany 映射。

互相关注用 redis 的 Set 来实现，先把 user 的 followers 和 following 存储到集合中。

然后把两个集合的交集求出来放入一个新的集合。

这样就能求出互相关注的关系。

当有新的关注或者取消关注时，除了要更新数据库外，也要顺便更新下 redis。

这样，查询互相关注关系的功能就完成了。
