# 基于 Redis 实现各种排行榜（周榜、月榜、年榜）


## 命令
```bash
# 创建项目
nest new ranking-list-test

# 安装 redis 的包
npm install --save redis

# 创建个 redis 模块
nest g module redis
nest g service redis

# 创建一个 ranking 模块
nest g module ranking
nest g controller ranking --no-spec
nest g service ranking --no-spec
```




## 总结
生活中我们经常会见到各种排行榜，以及它们的周榜、月榜、年榜等。

这些排行榜的功能都是用 redis 的 zset 有序集合实现的。

它保存的值都有一个分数，会自动排序。

多个集合之间可以求并集、交集、差集。

通过并集的方式就能实现月榜合并成年榜的功能。

以后见到各种排行榜，你会不会想到 Redis 的 zset 呢？
