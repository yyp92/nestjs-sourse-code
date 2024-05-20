# class- validator 的内置装饰器，如何自定义装饰器


## 命令
```bash
# 创建项目
nest new class-validator-decorators

# 创建个 CRUD 模块
nest g resource aaa --no-spec

# 安装用到的 class-validator 和 class-transformer 包
npm install --save class-validator class-transformer
```




## 总结
我们过了一遍 class-validator 的常用装饰器。

它们可以对各种类型的数据做精确的校验。

然后 @ValidateIf 可以根据别的字段来决定是否校验当前字段。

如果内置的装饰器不符合需求，完全可以自己实现，然后用 @Validate 来应用，用自定义装饰器 applyDecorators 包一层之后，和 class-validator 的内置装饰器就一模一样了。

所有的 class-validator 内置装饰器我们完全可以自己实现一遍。




## 资料
[class-validator 的文档](https://www.npmjs.com/package/class-validator#validation-decorators)
