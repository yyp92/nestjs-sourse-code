# 使用 mongoose 操作 MongoDB 数据库


## 命令
```bash
# 创建个项目
nest new nest-mongoose

# 安装用到的包
npm install @nestjs/mongoose mongoose

# 创建个模块
nest g resource dog --no-spec

# 安装用到的包
npm install class-validator class-transformer
```




## 总结
我们学习了用 mongoose 操作 MongoDB 以及在 Nest 里集成 mongoose。

主要是通过 Schema 描述形状，然后创建 Model，通过一个个 model 对象保存数据和做 CRUD。

因为 mongodb 本身提供的就是 api 的操作方式，而 mongoose 的 api 也是对底层 api 的封装， 所以基本可以直接上手用。
