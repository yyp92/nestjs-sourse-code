# nestjs-demo


## 学习笔记

### http 5种传输数据的方式
- url param： url 中的参数，Nest 中使用 @Param 来取
- query：url 中 ? 后的字符串，Nest 中使用 @Query 来取
- form urlencoded： 类似 query 字符串，只不过是放在 body 中。Nest 中使用 @Body 来取，axios 中需要指定 content type 为 application/x-www-form-urlencoded，并且对数据用 qs 或者 query-string 库做 url encode
- json： json 格式的数据。Nest 中使用 @Body 来取，axios 中不需要单独指定 content type，axios 内部会处理。
- form data：通过 ----- 作为 boundary 分隔的数据。主要用于传输文件，Nest 中要使用 FilesInterceptor 来处理其中的 binary 字段，用 @UseInterceptors 来启用，其余字段用 @Body 来取。axios 中需要指定 content type 为 multipart/form-data，并且用 FormData 对象来封装传输的内容。


### 后端系统中，会有很多对象
- Controller 对象：接收 http 请求，调用 Service，返回响应
- Service 对象：实现业务逻辑
- Repository 对象：实现对数据库的增删改查

Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息。


### 全局模块和生命周期
- 模块可以通过 @Global 声明为全局的，这样它 exports 的 provider 就可以在各处使用了，不需要 imports。
- provider、controller、module 都支持启动和销毁的生命周期函数，这些生命周期函数都支持 async 的方式。
- 可以在其中做一些初始化、销毁的逻辑，比如 onApplicationShutwon 里通过 moduleRef.get 取出一些 provider，执行关闭连接等销毁逻辑。
- 全局模块、生命周期、moduleRef 都是 Nest 很常用的功能。


### nestjs 中的架构思想
MVC、IOC、AOP架构思想


### Nest 实现 AOP 的方式
-  Middleware、Guard、Pipe、Interceptor、ExceptionFilter

#### 调用顺序
调用顺序，Middleware 是 Express 的概念，在最外层，到了某个路由之后，会先调用 Guard，Guard 用于判断路由有没有权限访问，然后会调用 Interceptor，对 Contoller 前后扩展一些逻辑，在到达目标 Controller 之前，还会调用 Pipe 来对参数做检验和转换。所有的 HttpException 的异常都会被 ExceptionFilter 处理，返回不同的响应。

![几种 AOP 机制的顺序](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4d0291cafa9449ca4702617464c5979~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.png)


### Nest 全部的装饰器
- @Module： 声明 Nest 模块
- @Controller：声明模块里的 controller
- @Injectable：声明模块里可以注入的 provider
- @Inject：通过 token 手动指定注入的 provider，token 可以是 class 或者 string
- @Optional：声明注入的 provider 是可选的，可以为空
- @Global：声明全局模块
- @Catch：声明 exception filter 处理的 exception 类型
- @UseFilters：路由级别使用 exception filter
- @UsePipes：路由级别使用 pipe
- @UseInterceptors：路由级别使用 interceptor
- @SetMetadata：在 class 或者 handler 上添加 metadata
- @Get、@Post、@Put、@Delete、@Patch、@Options、@Head：声明 get、post、put、delete、patch、options、head 的请求方式
- @Param：取出 url 中的参数，比如 /aaa/:id 中的 id
- @Query: 取出 query 部分的参数，比如 /aaa?name=xx 中的 name
- @Body：取出请求 body，通过 dto class 来接收
- @Headers：取出某个或全部请求头
- @Session：取出 session 对象，需要启用 express-session 中间件
- @HostParm： 取出 host 里的参数
- @Req、@Request：注入 request 对象
- @Res、@Response：注入 response 对象，一旦注入了这个 Nest 就不会把返回值作为响应了，除非指定 passthrough 为true
- @Next：注入调用下一个 handler 的 next 方法
- @HttpCode： 修改响应的状态码
- @Header：修改响应头
- @Redirect：指定重定向的 url
- @Render：指定渲染用的模版引擎


### 如何创建动态模块
Module 可以传入 options 动态产生，这叫做动态 Module，你还可以把传入的 options 作为 provider 注入到别的对象里。

建议的动态产生 Module 的方法名有 register、forRoot、forFeature 3种。
- register：用一次注册一次
- forRoot：只注册一次，用多次，一般在 AppModule 引入
- forFeature：用了 forRoot 之后，用 forFeature 传入局部配置，一般在具体模块里 imports


### 资料
- [HttpServer 的 interface](https://github.com/nestjs/nest/blob/d352e6f138bc70ff33cccf830053946d17272b82/packages/common/interfaces/http/http-server.interface.ts#L21C1-L85)
- [AbstractHttpAdapter 的 abstract class](https://github.com/nestjs/nest/blob/d352e6f138bc70ff33cccf830053946d17272b82/packages/core/adapters/http-adapter.ts#L12C1-L131)
- [class-validator](https://www.npmjs.com/package/class-validator)


### 上传测试

需要本地起服务
```bash
npx http-server .
```
