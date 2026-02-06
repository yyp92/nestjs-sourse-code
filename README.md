# nestjs


## Nest 基础概念扫盲

Nest 实现了一套依赖注入机制，叫做 IoC。

### IOC（Inverse Of Control 反转控制）

就是你只需要声明依赖了啥就行，不需要手动去 new 依赖，Nest 的 IoC 容器会自动给你创建并注入依赖。
- controller 是处理路由，解析请求参数的。
- service 是处理业务逻辑的，比如操作数据库。
- dto 是封装请求参数的。
- entities 是封装对应数据库表的实体的。

nest 应用跑起来后，会从 AppModule 开始解析，初始化 IoC 容器，加载所有的 service 到容器里，然后解析 controller 里的路由，接下来就可以接收请求了。

![](./imgs/IOC.png)

其实这种架构叫做 MVC 模式，也就是 model、view、controller。

controller 接收请求参数，交给 model 处理（model 就是处理 service 业务逻辑，处理 repository 数据库访问），然后返回 view，也就是响应。


### AOP
Nest 提供了 AOP （Aspect Oriented Programming 面向切面编程）的机制。

![](./imgs/aop-1.png)

具体来说，有 Middleware、Guard、Interceptor、Pipe、Exception Filter 这五种。

![](./imgs/aop.png)

它们都是在目标 controller 的 handler 前后，额外加一段逻辑的。


### 总结
- controller：控制器，用于处理路由，解析请求参数
- handler：控制器里处理路由的方法
- service：实现业务逻辑的地方，比如操作数据库等
- dto：data transfer object，数据传输对象，用于封装请求体里数据的对象
- module：模块，包含 controller、service 等，比如用户模块、书籍模块
- entity：对应数据库表的实体
- ioc：Inverse of Controller，反转控制或者叫依赖注入，只要声明依赖，运行时 Nest 会自动注入依赖的实例
- aop：Aspect Oriented Programming 面向切面编程，在多个请求响应流程中可以复用的逻辑，比如日志记录等，具体包含 middleware、interceotor、guard、exception filter、pipe
- nest cli：创建项目、创建模块、创建 controller、创建 service 等都可以用这个 cli 工具来做




## Nest CLI
安装命令：
```bash
npm install -g @nestjs/cli

nest new 项目名

# 更新
npm update -g @nestjs/cli
```


### nest new
创建一个新的 nest 项目。

- `--skip-git` 和 `--skip-install` 跳过 git 的初始化，跳过 npm install。
- `--package-manager` 是指定包管理器的，之前创建项目的时候会让我们选择 `npm/yarn/pnpm`。
- `--language` 可以指定 typescript 和 javascript，一般我们都选择 ts，用默认的就好。
- `--strict` 是指定 ts 的编译选项是否开启严格模式的（默认是 false）。


### nest generate
nest 命令除了可以生成整个项目外，还可以生成一些别的代码，比如 controller、service、module 等。

```bash
# 生成 module
nest generate module aaa

# 生成 controller、service 等代码
nest generate controller aaa
nest generate service aaa

# 完整生成一个模块的代码
nest generate resource xxx
```

**nest generate 其他命令**
![](./imgs/nest-generate.png)

**选项**
- `--flat` 和 `--no-flat` 是指定是否生成对应目录的
- `--spec` 和 `--no-spec` 是指定是否生成测试文件
- `--skip-import` 是指定不在 AppModule 里引入
- `--project` 是指定生成代码在哪个子项目的


### nest build
用来构建项目的。

--wepback 和 --tsc 是指定用什么编译，默认是 tsc 编译，也可以切换成 webpack。


### nest-cli.json
![](./imgs/nest-cli-json.png)

webpack 设置为 false 就是用 tsc 了。

deleteOutDir 设置为 true，每次 build 都会都清空 dist 目录。

而 assets 是指定 nest build 的时候，把那些非 js、ts 文件也复制到 dist 目录下。

可以通过 include、exclude 来精确匹配，并且可以单独指定是否 watchAssets。

不过只支持 src 下文件的复制，如果是非 src 下的，可以自己写脚本复制。


### nest start
- `--watch` 是最常用的选项了，也就是改动文件之后自动重新 build。
- `--debug` 是启动调试的 websocket 服务，用来 debug。
- `--exec` 可以指定用什么来跑，默认是用 node 跑，你也可以切换别的 runtime。




## 5 种 HTTP 数据传输方式
- `url param`： url 中的参数，Nest 中使用 `@Param` 来取。
- `query`：url 中 ? 后的字符串，Nest 中使用 `@Query` 来取。
- `form urlencoded`： 类似 query 字符串，只不过是放在 body 中。Nest 中使用 `@Body` 来取，axios 中需要指定 content type 为 `application/x-www-form-urlencoded`，并且对数据用 qs 或者 query-string 库做 url encode。
- `json`： json 格式的数据。Nest 中使用 `@Body` 来取，axios 中不需要单独指定 content type，axios 内部会处理。
- `form data`：通过 ----- 作为 boundary 分隔的数据。主要用于传输文件，Nest 中要使用 FilesInterceptor 来处理其中的 binary 字段，用 `@UseInterceptors` 来启用，其余字段用 `@Body` 来取。axios 中需要指定 content type 为 `multipart/form-data`，并且用 FormData 对象来封装传输的内容。
