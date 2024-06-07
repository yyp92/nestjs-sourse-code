# 使用 passport 做身份认证


## 命令
```bash
# 创建项目
nest new nest-passport

# 安装 passport
npm install --save @nestjs/passport passport

# 这用到 passport-local 的策略，安装下
npm install --save passport-local
npm install --save-dev @types/passport-local

# 创建一个认证模块
nest g module auth
nest g service auth --no-spec

# AuthService 里根据用户名密码去校验，但是查询用户的逻辑应该在 UserModule 里，我们写一下：
nest g module user
nest g service user --no-spec

# 安装用到的jwt包
npm install --save @nestjs/jwt

# 安装用到的包
npm install --save passport-jwt
npm install --save-dev @types/passport-jwt

# 生成一个自定义装饰器
nest g decorator is-public --flat --no-spec
```




## 总结
之前我们都是自己实现身份认证，比如基于用户名密码的认证，基于 jwt 的认证，今天我们基于 passport 库来实现了一遍。

passport 把不同的认证逻辑封装成了不同 Strategy，每个 Stategy 都有 validate 方法来验证。

每个 Strategy 都是从 request 取出一些东西，交给 validate 方法验证，validate 方法返回 user 信息，自动放到 request.user 上。

并且 @nestjs/passport 提供了 Guard 可以直接用，如果你想扩展，继承 AuthGuard('xxx') 然后重写下 canActivate 方法就好了。

细想一下，你做各种认证的时候，是不是也在做同样的事情呢？

那既然每次都是做这些事情，那为啥不用 passport 库来简化呢？
