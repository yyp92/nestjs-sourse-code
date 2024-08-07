# 会议室预订系统


## 命令
```bash
# 创建个 nest 项目
nest new meeting_room_booking_system_backend

# 安装 typeorm 相关的包
npm install --save @nestjs/typeorm typeorm mysql2

# 生成 user 模块
nest g resource user

# 安装 对请求体做校验 用到的包
npm install --save class-validator class-transformer

# 封装个 redis 模块
nest g module redis
nest g service redis

# 安装 redis 的包
npm install --save redis

# 封装个 email 模块
nest g resource email
# 安装发送邮件用的包
npm install nodemailer --save

# 安装 config 的包
npm install --save @nestjs/config

# 引入 jwt 模块
npm install --save @nestjs/jwt

# 然后我们加上 LoginGuard 和 PermissionGuard 来做鉴权
nest g guard login --flat --no-spec
nest g guard permission --flat --no-spec

# 先加一个修改响应内容的拦截器。把响应的格式改成 {code、message、data} 这种
nest g interceptor format-response --flat

# 然后再加一个接口访问记录的 interceptor
nest g interceptor invoke-record --flat

# 新建个 exception filter
nest g filter unlogin --flat

# 直接修改下对 HttpException 的处理逻辑就好了
nest g filter custom-exception --flat

# 安装 swagger 的包
npm install --save @nestjs/swagger

# 创建一个 meeting-room 模块
nest g resource meeting-room

# 创建一个 booking 模块
nest g resource booking

# 创建一个 statistic 模块
nest g module statistic
nest g service statistic
nest g controller statistic

# 用 docker 跑服务
docker compose up

# 如果你改了 Dockerfile 或者 docker-compose.yml 想重新跑的话，需要先把之前的镜像和容器删掉再跑
docker-compose down --rmi all

# 购买服务器进行相关部署操作
# 购买后，链接购买后的服务器
# 安装 git
yum install git -y
# 把 github 的代码下下来
git clone 你自己的git仓库
# 在服务安装docker
# https://help.aliyun.com/zh/ecs/use-cases/deploy-and-use-docker-on-alibaba-cloud-linux-2-instances?spm=a2c4g.2590614.0.i3



# 数据库迁移
# migration:generate
npm run migration:generate src/migrations/init
npm run migration:run

# 表创建好了，还要做初始化数据。
# 我们同样通过 migration 来做，但是这个是没法 generate 的，generate 只会对比表结构，然后生成迁移 sql。
# 执行 create 生成 migration 类：
npm run migration:create src/migrations/data
npm run migration:run


# oss
# 安装 minio 的包
npm install --save minio
# 创建个 minio 模块
nest g module minio
# 然后创建 MinioController
nest g controller minio --no-spec


# 第三方登录
# 安装 passport 的包
npm install --save @nestjs/passport passport
# 安装用户名密码认证的 passport-local 策略包
npm install --save passport-local
npm install --save-dev @types/passport-local
# 然后创建一个认证模块：
nest g module auth
# passport 的网站
# 安装下
npm install --save passport-google-oauth20
npm install --save-dev @types/passport-google-oauth20

```




## 会议室预订系统：用户管理模块--用户注册
### 注入 Repository<User>
注册的逻辑是这样的：
![](./imgs/metting-room-7.png)

整个注册的流程:
![](./imgs/meeting-room-8.png)



### 总结
这节我们创建了 nest 项目，并引入了 typeorm 和 redis。

创建了 User、Role、Permission 的 entity，通过 typeorm 的自动建表功能，在数据库创建了对应的 3 个表和 2 个中间表。

引入了 nodemailer 来发邮件，如果是线上可以买阿里云或者其他平台的邮件推送服务。

实现了 /user/register 和 /user/register-captcha 两个接口。

/user/register-captcha 会向邮箱地址发送一个包含验证码的邮件，并在 redis 里存一份。

/user/register 会根据邮箱地址查询 redis 中的验证码，验证通过会把用户信息保存到表中。

这样，注册功能就完成了。




## 用户管理模块--配置抽离、登录认证鉴权

### 总结
这节我们实现了配置抽离、基于 jwt 登录、鉴权功能。

配置抽离使用 @nestjs/config 包，把配置放在 src 下的 .env 文件里，然后代码里从 configService 读取配置。

这样可以配置 nest-cli.json 的 assets 和 watchAssets 来自动把 env 文件复制到 dist 目录下。

我们使用代码做的数据初始化，线上要删掉这个接口，用导出的 sql 文件来初始化。

登录成功之后，返回 access_token、refresh_token 还有用户信息、roles、permissions 等。

并支持使用 refreshToken 来刷新 token。

之后使用 LoginGuard、PermissionGuard 来做登录和权限的鉴权，根据 handler 上的 metadata 来确定要不要做鉴权、需要什么权限。

我们还封装了几个自定义装饰器，用于方便的设置 metadata，从 request 取数据注入 handler。

至此，注册、登录、鉴权、配置抽离等功能就完成了。




## 会议室预订系统：用户管理模块-- interceptor、修改信息接口
因为这是在 LoginGuard 里从 jwt 取出来放到 request.user 的，而 Guard 在 interceptor 之前调用：

![](./imgs/metting-room-8.png)


### 总结
这节我们添加了 interceptor 用来对响应格式做转换，改成 {code、message、data} 的格式，用到了 map 操作符。

并且还用 interceptor 实现了接口访问的日志记录，用到 tap 操作符。

然后实现了修改信息、修改密码的接口。

这些流程都差不多，首先实现一个查询的接口用来回显数据，通过 vo 封装返回的数据。

然后提交数据进行更新，用到的 userId 通过之前封装的 @UserInfo 装饰从 request.user 来取。




## 会议室预订系统：用户管理模块--用户列表和分页查询
### 总结
这节我们实现了冻结用户和用户列表接口。

我们通过自定义 exception filter，catch 了 HTTPException，返回了自定义格式的响应，统一了响应格式。

冻结用户接口比较简单，就是修改 users 表的一个字段。

用户列表支持了分页查询和模糊搜索：

分页查询就是根据 (pageNo -1) * pageSize 计算出从哪里开始，然后取 pageSize 条。

模糊搜索就是通过 like 来匹配。

此外，ParseIntPipe 我们自定义了错误格式，还使用了 DefaultValuePipe 设置了默认值。




## 会议室预订系统：用户管理模块-- swagger 接口文档
### 总结
这节我们用 swagger 生成了接口文档。

在 main.ts 里调用 SwaggerModule.setup 来生成接口文档。

然后用 @ApiQuery、@ApiBody、@ApiResponse、@ApiProperty 等来标识每个接口的参数和响应。

并且通过 @ApiBearerAuth 标识需要 jwt 认证的接口。

返回对象的接口需要把它封装成 vo，然后再添加 @ApiProperty。

接口文档提供给前端之后，前端就可以基于这个来写页面了。




## 代码部署
**用到 mysql、redis、nginx，它们是这样的关系**
![](./imgs/meeting-room-9.png)

前端代码由 nginx 托管，处理静态请求。

并且后端服务也会经过 nginx 做反向代理，这样可以做多个 Nest 服务的负载均衡。

Nginx、Mysql、Redis、Nest 服务等都是通过 docker 来跑。

当然，不用一个个的跑，可以通过 Docker Compose 把它们组合成一个整体，一起跑。

开发完之后，本地把代码 push 到 github、gitlab 等代码仓库。

之后服务器上把代码 pull 下来，然后用 docker compose 跑就行

![](./imgs/meeting-room-10.png)

有了 docker，根本不用考虑 mysql、redis、node 等在 linux 下怎么装，直接跑 docker 镜像就行。





## 会议室预定系统：用 migration 初始化表和数据
这节我们实现了 migration 数据迁移，也就是创建表、初始化数据。

在生产环境会把 synchronize 关掉，然后跑 migration。

我们用 migration:generate 生成了 create table 的 migration。

然后用 migration:create 生成了空的 migration，填入了导出的 inert 语句。

执行完这两个 migration 之后，表和数据就都有了，就可以跑 Nest 项目了。

线上项目，都是这样用手动跑 migration 的方式来修改表的。




## 会议室预定系统：文件上传 OSS

### 总结
这节我们把文件上传从基于 multer 实现，保存在项目目录下，换成了基于 minio 实现的 OSS 服务。

我们是用前端直传 OSS，然后把文件 url 发给应用服务器的方式。

但是又不想在前端代码暴露 accessKey，所以是用的预签名的方式，服务端用 presignedPutObject 返回一个预签名 url 给前端。前端用这个 url 来发送 put 请求，来把文件直传 minio。

antd 的 Dragger 组件默认用 form data 来发送请求，我们通过 customRequest 来重写了上传逻辑。

这样，文件就都保存在了 minio 服务里，可以更方便的管理。




## Google 账号登录后端开发
我们的应用之前只支持用户名密码登录，今天实现了 google 登录的后端部分。

首先我们把用户名密码的身份认证改成了用 passport。

当然，这不是必须的，每个策略都是可以独立用的。

然后我们创建了新的 google 应用，拿到 client id 和 client secret。

用 passport-google-oauth20 的策略来实现了 google 登录。

在 callback 的路由里，基于 google 返回的信息做了自动注册，如果用户已经注册过，就直接返回登录信息。

google 登录同样是返回 userInfo、accessToken、refreshToken 的，和之前的用户名密码登录一样，后续流程也都一样。




## 后端代码优化
这节我们对后端代码做了一些优化：
- .env：分开了 .dev.env 和 .env 分别用于开发和生产环境，分别用不同的配置。
- docker-compose.yml：添加了 minio 的容器，和 nest 集成成功，并且添加了 mysql 容器启动时设置字符集的命令，还添加了 restart 容器重启配置
- dto：用 mapped-types 包的 PickTypes 等 api 对 dto 做了简化，直接复用已有 dto 的字段
- captcha：验证码用完之后就从 redis 中删掉，并且前端提示验证码失效

开发的时候只想着完成功能，但代码中有很多可以优化的点，这些可以逐步优化。
