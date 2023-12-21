# 用 ORM 库，链接数据库

比如 typeorm，它是基于 class 和 class 上的装饰器来声明和表的映射关系的，然后对表的增删改查就变成了对象的操作以及 save、find 等方法的调用。它会自动生成对应的 sql。

主流的方案还是 ORM 的方案


Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


## 具体的 EntityManager 和 Repository 的方法有这些：
- save：新增或者修改 Entity，如果传入了 id 会先 select 再决定修改还新增
- update：直接修改 Entity，不会先 select
- insert：直接插入 Entity
- delete：删除 Entity，通过 id
- remove：删除 Entity，通过对象
- find：查找多条记录，可以指定 where、order by 等条件
- findBy：查找多条记录，第二个参数直接指定 where 条件，更简便一点
- findAndCount：查找多条记录，并返回总数量
- findByAndCount：根据条件查找多条记录，并返回总数量
- findOne：查找单条记录，可以指定 where、order by 等条件
- findOneBy：查找单条记录，第二个参数直接指定 where 条件，更简便一点
- findOneOrFail：查找失败会抛 EntityNotFoundError 的异常
- query：直接执行 sql 语句
- createQueryBuilder：创建复杂 sql 语句，比如 join 多个 Entity 的查询
- transaction：包裹一层事务的 sql
- getRepository：拿到对单个 Entity 操作的类，方法同 EntityManager
