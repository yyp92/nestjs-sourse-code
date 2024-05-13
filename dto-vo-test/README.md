# 如何灵活创建 DTO 对象


## 命令
```bash
# 创建个 nest 项目
nest new dto-vo-test

# 创建 aaa 的 crud 模块
nest g resource aaa

# 安装校验的包
npm install --save class-validator class-transformer
```




## 总结
开发 CRUD 接口的时候，经常会发现 update 的 dto 和 create 的 dto 很类似，而我们要重复的写两次。

这时候可以用 @nestjs/mapped-types 的 PartialType、PickType、OmitType、IntersectionType 来避免重复。

PickType 是从已有 dto 类型中取某个字段。

OmitType 是从已有 dto 类型中去掉某个字段。

PartialType 是把 dto 类型变为可选。

IntersectionType 是组合多个 dto 类型。

灵活运用这些方法，可以轻松的基于已有 dto 创建出新的 dto 对象。
