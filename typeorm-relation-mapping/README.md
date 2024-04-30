# TypeORM

ORM 是 Object Relational Mapping，对象关系映射。也就是说把关系型数据库的表映射成面向对象的 class，表的字段映射成对象的属性映射，表与表的关联映射成属性的关联

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command



## 命令

通过 typeorm entity:create 命令创建：

```bash
npx typeorm entity:create src/entity/IdCard
```
