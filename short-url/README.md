# 短链服务


## 命令
```bash
# 创建个 nest 项目
nest new short-url

# 安装用到的包
# mysql2 是数据库驱动，typeorm 是我们用的 orm 框架，而 @nestjs/tyeporm 是 nest 集成 typeorm 用的
npm install --save @nestjs/typeorm typeorm mysql2

# 表创建好了，接下来插入一些数据
nest g service unique-code --flat --no-spec

# 安装用到的包
npm install base62

# 我们用定时任务的方式来跑
# 安装用到的包
npm install --save @nestjs/schedule

# 加一个生成短链的 service
nest g service short-long-map --flat --no-spec
```




## 总结
我们经常用短链服务把长的 url 缩短，在短信里的链接一般都是这种。

我们用 Nest 自己实现了一个。

核心是压缩码的生成，我们分析了自增 id + base62，这样容易被人拿到其它短链，不安全。hash + base62 会有冲突的可能，所以最终用的是自己生成随机数 + base62 的方案。

当然，这个随机字符串最好是提前生成，比如用定时任务在低峰期批量生成一堆，之后直接用就好了。

短链的重定向使用 302 临时重定向，这样可以记录短链访问记录，做一些分析。

市面上的短链服务，基本都是这样实现的。
