# Nest 项目里如何使用 TypeORM 迁移


## 命令
```bash
# 创建项目
nest new nest-typeorm-migration

# 安装 typeorm 相关的包
npm install --save @nestjs/typeorm typeorm mysql2

# 创建个 article 模块
nest g resource article

# 执行 migration:generate 命令：
npm run migration:generate src/migrations/init
npm run migration:run

# 再创建个 migration 来初始化数据
npm run migration:create src/migrations/data

# 执行 migration:generate 命令， 添加字段
npm run migration:generate src/migrations/add-tag-column
npm run migration:run


# 看下在 data-source.ts 里怎么读取 .env 文件
# 需要安装 dotenv 这个包：
npm install --save-dev dotenv
npm run migration:run
```

> migration:generate 只会根据表结构变动生成迁移 sql，而数据的插入的 sql 需要我们自己添加。




## 总结
生产环境是通过 migration 来创建表、更新表结构、初始化数据的。

这节我们在 nest 项目里实现了下迁移。

大概有这几步：
- 创建 data-source.ts 供 migration 用
- 把 synchronize 关掉
- 用 migration:generate 生成创建表的 migration
- 用 migration:run 执行
- 用 migration:create 创建 migration，然后填入数据库导出的 sql 里的 insert into 语句
- 用 migration:run 执行
- 用 migration:generate 生成修改表的 migration
- 用 migration:run 执行

在生产环境下，我们就是这样创建表、更新表、初始化数据的。
