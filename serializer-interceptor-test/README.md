# 手写序列化 Entity 的拦截器


## 命令
```bash
# 创建项目
nest new serializer-interceptor-test

# 生成一个 user 的 CRUD 模块
nest g resource user --no-spec

# 安装 class-transformer 包
npm install --save class-transformer

# 先来写这个自定义装饰器
nest g decorator serialize-options --flat

# 然后来写 interceptor
nest g interceptor class-serializer --flat --no-spec
```




## 总结
上节学了用 entity 结合 class-transfomer 的装饰器和 ClassSerializerInterceptor 拦截器实现复用 entity 做 vo 的功能。

这节我们自己实现了下。

首先是 @SerializeOptions 装饰器，它就是在 class 或者 handler 上加一个 metadata，存放 class-transformer 的 options。

在 ClassSerializerInterceptor 里用 reflector 把它取出来。

然后拦截响应，用 map oprator对响应做变换，调用 classTransformer 包的 instanceToPlain 方法进行转换。
