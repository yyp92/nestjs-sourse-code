# Nest 的 Monorepo 和 Library


## 命令
```bash
# 创建个 nest 项目
nest new monorepo-test

# 再添加一个 nest 项目
nest g app app2

# 创建一个 library
nest g lib lib1
```




## 总结
微服务项目可能会有很多个项目，为了方便管理，我们会使用 monorepo 的方式。

monorepo 就是在一个 git 仓库里管理多个项目。

nest cli 支持 monorepo，只要执行 nest g app xxx 就会把项目变为 monorepo 的，在 apps 下保存多个 nest 应用。

nest-cli.json 里配置了多个 projects 的信息，以及默认的 project。

npm run start:dev 或者 npm run build 可以加上应用名来编译对应的 app。

此外，多个项目可能有公共代码，这时候可以用 nest g lib xxx 创建 library。

library 保存在 libs 目录下，和 apps 一样可以有多个。

nest 会为 libs 创建别名，可以在其他 app 或者 lib 里用别名引入。

这就是 nest 里创建 monorepo 以及通过 library 复用代码的方式，用起来还是比较简单的。
