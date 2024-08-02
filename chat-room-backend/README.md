# 聊天室


## 命令
```bash
# 创建个 nest 项目
nest new chat-room-backend

# 安装 prisma
npm install prisma --save-dev
# 然后执行 prisma init 创建 schema 文件
npx prisma init
# 先 migrate reset，重置下数据库
npx prisma migrate reset 
# 然后创建新的 migration
npx prisma migrate dev --name user

# 创建个 module 和 service
nest g module prisma
nest g service prisma --no-spec

# 然后创建 user 模块
nest g resource user

# 然后加一下 ValidationPipe，来对请求体做校验
# 安装用到的包
npm install --save class-validator class-transformer


# 封装个 redis 模块
nest g module redis
nest g service redis --no-spec
# 安装 redis 的包
npm install --save redis

# 封装个 email 模块
nest g resource email --no-spec
# 安装发送邮件用的包
npm install nodemailer --save

# 引入下 jwt 的包
npm install --save @nestjs/jwt

# 然后我们加上 AuthGuard 来做登录鉴权
nest g guard auth --flat --no-spec
```