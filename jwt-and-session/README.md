# Nest 里实现 Session 和 JWT

## 命令
```bash
# 用 @nest/cli 快速创建一个 Nest.js 项目
nest new jwt-and-session -p npm

# 安装 express-session 和它的 ts 类型定义
npm install express-session @types/express-session

# 运行
nest start --watch


# jwt 需要引入 @nestjs/jwt 这个包
npm install @nestjs/jwt
```




## 总结
**携带 jwt 需要加载 authorization 的 header 里，以 Bearer xxx 的格式，但是返回 jwt 可以放在任何地方，header、cookie 或者 body 里都可以。**

我们分别在 nest 里实现了 session、jwt 两种给 http 添加状态的方式。

session 使用的是 express 的 express-session 中间件，通过 @Session 装饰器取出来传入 controller 里。

jwt 需要引入 @nestjs/jwt 包的 JwtModule，注入其中的 JwtService，然后通过 jwtService.sign 生成 token，通过 jwtService.verify 验证 token。

token 放在 authorization 的 header 里。

session 或者 jwt 都是非常常用的给 http 添加状态的方式，下节我们用这两种方式实现下登录注册功能。


