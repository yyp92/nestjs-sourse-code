# Redis + 高德地图，实现附近的充电宝


## 命令
```bash
# 创建个 nest 项目
nest new nearby-search

# 安装连接 redis 的包
npm install --save redis


# 创建个 redis 模块和 service
nest g module redis
nest g service redis
```




## 总结
我们经常会使用基于位置的功能，比如附近的充电宝、酒店，打车，附近的人等功能。

这些都是基于 redis 实现的，因为 redis 有 geo 的数据结构，可以方便的计算两点的距离，计算某个半径内的点。

前端部分使用地图的 sdk 分别在搜出的点处绘制 marker 就好了。

geo 的底层数据结构是 zset，所以可以使用 zset 的命令。

我们在 Nest 里封装了 geoadd、geopos、zrange、georadius 等 redis 命令。实现了添加点，搜索附近的点的功能。

以后再用这类附近的 xxx 功能，你是否会想起 redis 呢？




## 资料
- [高德地图开发文档](https://lbs.amap.com/api/javascript-api-v2/getting-started)
