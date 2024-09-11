# nest.js 学习

## 搭建
```bash
npm i -g @nestjs/cli
nest new admin-server

# 启动
pnpm start
```

### 利用CLI生成代码
```bash
# 生成 Module
nest g mo xxx 

# 生成 Controller
nest g co xxx

# 生成 Service
nest g s xxx

# 生成一套Restful风格接口
nest g resource xxx
```

## Swagger文档
```bash
pnpm i @nestjs/swagger
```

## 调用流程
- controller层 -> service层 -> module层


## 数据校验
```bash
pnpm i class-validator class-transformer
```


## 配置中心 - 环境变量
```bash
pnpm i @nestjs/config
```
### /.env
```js
APP_ENV=development
APP_PORT=3000
DB_URL=mongodb://mongo:27017
DB_NAME=nest-server
DB_USER=xxxx
DB_PASS=123456
DB_ENTITY_NAME=mongo
DB_SYNCHRONIZE=false
DB_LOGGING=true
```


## 数据持久化 - Typeorm
Typeorm 是一个ORM框架。ORM(Object-relational-mapping) 是指对象关系映射，是一种将某种编程语言中的对象转换为其他不兼容系统中的数据。ORM 最常见使用便是对象与数据库表之间的转换。

- [Typeorm 官方文档](https://typeorm.io/)

```bash
pnpm i typeorm
```


### 安装 mongodb
因为mongodb支持ts的版本暂时只到了 v3.6.0

```bash
pnpm i mongodb@"^3.6.0"
```
