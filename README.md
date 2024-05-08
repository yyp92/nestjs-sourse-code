# nestjs 代码





## redis
### docker 中安装redis
在 docker desktop 搜索框搜索 redis，点击 run，把 redis 官方镜像下载并跑起来。

端口映射就是把主机的 6379 端口映射到容器内的 6379 端口，这样就能直接通过本机端口访问容器内的服务了。

指定数据卷，用本机的任意一个目录挂载到容器内的 /data 目录，这样数据就会保存在本机。

```bash
# 在docker命令行
# 在 terminal 输入 redis-cli，进入交互模式
redis-cli
```




### 可视化工具
####  list 类型的数据结构
```bash
# lpush 是 left push 的意思，执行后会从左到右添加到列表中。
lpush list1 111
# rpush 是 right push 的意思，执行后会从右往左添加到列表中。
rpush list1 222
# lpop 和 rpop 自然是从左边和从右边删除数据。
lpop list1
rpop list1
# 查看 list 数据
# 输入一段 range，结尾下标为 -1 代表到最后。lrange list1 0 -1 就是查询 list1 的全部数据。
lrange list1 0 -1
```


#### set
set 的特点是无序并且元素不重复。

set 只能去重、判断包含，不能对元素排序。

```bash
# 添加元素
sadd set1 111
sadd set1 222

# 通过 sismember 判断是否是集合中的元素
sismember set1 111
```


#### zset
如果排序、去重的需求，比如排行榜

```bash
# 添加
zadd zset1 5 guang
zadd zset1 4 dong
zadd zset1 3 xxx
zadd zset1 6 yyyy

# 通过 zrange 命令取数据，比如取排名前三的数据
zrange zset1 0 2
```


#### hash
和我们用的 map 一样。

```bash
# 添加
hset hash1 key1 1
hset hash1 key2 2
hset hash1 key3 3
hset hash1 key4 4
hset hash1 key5 5

# 获取
hget hash1 key3
```


#### geo
geo 的数据结构，就是经纬度信息，根据距离计算周围的人用的。

```bash
# 添加 用 loc 作为 key，分别添加 guangguang 和 dongdong 的经纬度
geoadd loc 13.361389 38.115556 "guangguang" 15.087269 37.502669 "dongdong" 

# 用 geodist 计算两个坐标点的距离
geodist loc guangguang dongdong

# 用 georadius 搜索某个半径内的其他点，传入经纬度、半径和单位
georadius loc 15 37 100 km
georadius loc 15 37 200 km
```

#### expire 命令
一般 redis 的 key 我们会设置过期时间，通过 expire 命令。

```bash
# 设置过期时间
expire dong1 30

# 想查剩余过期时间使用 ttl
ttl list1
```




### 总结
因为 mysql 存在硬盘，并且会执行 sql 的解析，会成为系统的性能瓶颈，所以我们要做一些优化。

常见的就是在内存中缓存数据，使用 redis 这种内存数据库。

它是 key、value 的格式存储的，value 有很多种类型，比如 string、list、set、sorted set(zset)、hash、geo 等。

灵活运用这些数据结构，可以完成各种需求，比如排行榜用 zset、阅读数点赞数用 string、附近的人用 geo 等。

而且这些 key 都可以设置过期时间，可以完成一些时效性相关的业务。

用官方 GUI 工具 RedisInsight 可以可视化的操作它，很方便。

redis 几乎和 mysql 一样是后端系统的必用中间件了，它除了用来做数据库的缓存外，还可以直接作为数据存储的地方。

学会灵活使用 redis，是后端开发很重要的一步。




### 资料
[redis 可视化工具](https://redis.io/thank-you/redisinsight-the-best-redis-gui-35/)

[redis 命令](https://redis.io/docs/latest/commands/)
