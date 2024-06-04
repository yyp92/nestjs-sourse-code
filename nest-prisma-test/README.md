# Nest 里集成 Prisma


## 命令
```bash
# 新建个 nest 项目
nest new nest-prisma-test

# 安装 prisma
npm install prisma --save-dev

# 然后执行 init 创建 schema 文件
npx prisma init

# 先 migrate reset，重置下数据库
npx prisma migrate reset 

# 然后创建新的 migration
npx prisma migrate dev --name init

# 创建个 Service 
nest g service prisma --flat --no-spec

# 再创建两个 service
nest g service department --flat --no-spec
nest g service employee --flat --no-spec
```




## 总结
这节我们做了 Prisma 和 Nest 的集成。

其实还是先用 prisma init 创建 schema 文件，然后修改 model 后用 prisma migrate dev 同步到数据库和生成 client 代码。

只不过之后使用 client 代码的方式不同。

我们创建了个 Service 继承 PrismaClient，在 constructor 里设置初始化参数。

之后把这个 service 的实例注入到别的 service 里，就可以做 CRUD 了。
