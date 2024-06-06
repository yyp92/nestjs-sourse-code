# Nest 开发 GraphQL 服务：实现 CRUD


## 命令
```bash
# 新建个项目
nest new nest-graphql

# 安装 graphql 和 apollo 的包
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

# 定义它的 resolver
nest g resolver student
```




## 总结
这节我们在 Nest 里集成了 GraphQL，并做了 CRUD。

graphql 主要是分为 schema、resolver 两部分。

GraphQLModule.forRoot 指定 typePaths 也就是 schema 文件的位置。

然后用 nest g resolver 生成 resolver 文件，实现 Query、Mutaion 的方法。

并且还可以切换 playground 为 apollo 的。

之后就可以在 palyground 里发送 graphql 请求，做 CRUD 了。
