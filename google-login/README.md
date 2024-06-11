# passport 实现 Google 三方账号登录

[passport 网站](https://www.passportjs.org/packages/)


## 命令
```bash
# 创建个 nest 项目
nest new google-login

# 进入项目，安装 passport 的包
npm install --save passport @nestjs/passport

# 安装 google 的策略包
npm install --save passport-google-oauth20
npm install --save-dev @types/passport-google-oauth20

#
nest g module auth

# 引入下 TypeORM 来操作数据库
npm install --save @nestjs/typeorm typeorm mysql2
```




## 总结
我们实现了基于 google 的三方账号登录。

首先搜索对应的 passport 策略，然后生成 client id 和 client secret。

在 nest 项目里使用这个策略，添加登录和 callback 的路由。

之后基于 google 返回的信息来自动注册，如果信息不够，可以重定向到一个 url 让用户填写其余信息。

之后再次用这个 google 账号登录的话，就会自动登录。

现在，你可以在你的应用中加上 docker.com 这种三方账号登录了。
