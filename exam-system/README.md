# 考试系统


## 命令
```bash
# 添加 4 个 app
nest g app user
nest g app exam
nest g app answer
nest g app analyse

```




## 架构
前端部分 React + Antd Design，脚手架用 create-vite：
![](../imgs/exam-system%20.jpg)

后端服务是 Nest + Prisma，会拆分多个微服务，之间用 TCP 通信。

数据库是 mysql + redis，mysql 做持久化存储，redis 做缓存以及临时数据的存储。

用 minio 做 OSS 对象存储服务，存储上传的文件。

用 nacos 来做注册中心、配置中心，统一管理所有的配置、服务的地址注册。

rabbitmq 做消息队列，用于微服务之间的异步通信。

文档用 swagger 生成，部署用 docker compose。




## 前段项目代码库
exam-system-frontend




## 简单回顾下 zset 的命令：

ZADD：往集合中添加成员

ZREM：从集合中删除成员

ZCARD：集合中的成员个数

ZSCORE：某个成员的分数

ZINCRBY：增加某个成员的分数

ZRANK：成员在集合中的排名

ZRANGE：打印某个范围内的成员

ZRANGESTORE：某个范围内的成员，放入新集合

ZCOUNT：集合中分数在某个返回的成员个数

ZDIFF：打印两个集合的差集

ZDIFFSTORE：两个集合的差集，放入新集合

ZINTER：打印两个集合的交集

ZINTERSTORE：两个集合的交集，放入新集合

ZINTERCARD：两个集合的交集的成员个数

ZUNION：打印两个集合的并集

ZUNIONSTORE：两个集合的并集，放回新集合
