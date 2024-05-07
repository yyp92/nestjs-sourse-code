# TypeORM 如何保存任意层级的关系？

这节我们基于 TyepORM 实现了任意层级的关系的存储。

在 entity 上使用 @Tree 标识，然后通过 @TreeParent 和 @TreeChildren 标识存储父子节点的属性。

之后可以用 getTreeRepository 的 find、findTrees、findRoots、findAncestorsTree、findAncestors、findDescendantsTree、findDescendants、countDescendants、countAncestors 等 api 来实现各种关系的查询。

存储方式可以指定 closure-table 或者 materialized-path，这两种方式一个用单表存储，一个用两个表，但实现的效果是一样的。

以后遇到任意层级的数据的存储，就是用 Tree Entity 吧。


## 命令
```bash
# 新建个项目
nest new typeorm-tree-entity-test

# 进入项目目录，创建一个 CRUD 模块
nest g resource city --no-spec

# 安装 TypeORM 的包
npm install --save @nestjs/typeorm typeorm mysql2
```
