# GraphQL + Primsa + React 实现 TodoList


## 命令
```bash
# 创建项目
nest new graphql-todolist

# 启动数据库

# 安装 prisma
npm install prisma --save-dev
# 执行 prisma init 创建 schema 文件
npx prisma init

# 执行 prisma migrate dev，它会根据定义的 model 去创建表
npx prisma migrate dev --name init

# 生成一个 service
nest g service prisma --flat --no-spec

# 实现 graphql 版本
# 安装用到的包
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

# 然后实现 resolver，也就是这些接口的实现
nest g resolver todolist --no-spec --flat
```




## 总结
我们实现了 Restful 和 GraphQL 版的 CRUD。

前端用 React + @apollo/client。

后端用 Nest + GraphQL + Prisma + MySQL。

GraphQL 主要是定义 schema 和 resolver 两部分，schema 是 Query、Mutation 的结构，resolver 是它的实现。

可以在 playground 里调用接口，也可以在 react 里用 @appolo/client 调用。

相比 restful 的版本，graphql 只需要一个接口，然后用查询语言来查，需要什么数据取什么数据，更加灵活。
