# 访问控制表（Access Control List）

比如用户 1 有权限 A、B、C，用户 2 有权限 A，用户 3 有权限 A、B。

这种记录每个用户有什么权限的方式，叫做访问控制表（Access Control List）

用户和权限是多对多关系，存储这种关系需要用户表、角色表、用户-角色的中间表。




## 命令
### 创建数据库表
```bash
CREATE DATABASE acl_test DEFAULT CHARACTER SET utf8mb4;
```


### 命令
```bash
# 创建个 nest 项目
nest new acl-test -p npm

# 安装 typeorm 的依赖
npm install --save @nestjs/typeorm typeorm mysql2

# 添加创建 user 模块
nest g resource user

# 安装 session 相关的包
npm install express-session @types/express-session

# 安装 ValidationPipe 用到的包
npm install --save class-validator class-transformer

# 然后添加 aaa、bbb 两个模块，分别生成 CRUD 方法
nest g resource aaa 
nest g resource bbb 

# 先添加一个 LoginGuard，限制只有登录状态才可以访问这些接口
nest g guard login --no-spec --flat

# 我们还需要再做登录用户的权限控制，所以再写个 PermissionGuard
nest g guard permission --no-spec --flat

# 引入下 redis
npm install redis 
# 新建一个模块来封装 redis 操作
nest g module redis
# 新建一个 service
nest g service redis --no-spec
```





## 总结
有的接口除了需要登录外，还需要权限。

只有登录用户有调用该接口的权限才能正常访问。

这节我们通过 ACL （Access Control List）的方式实现了权限控制，它的特点是用户直接和权限关联。

用户和权限是多对多关系，在数据库中会存在用户表、权限表、用户权限中间表。

登录的时候，把用户信息查出来，放到 session 或者 jwt 返回。

然后访问接口的时候，在 Guard 里判断是否登录，是否有权限，没有就返回 401，有的话才会继续处理请求。

我们采用的是访问接口的时候查询权限的方案，通过 handler 上用 SetMetadata 声明的所需权限的信息，和从数据库中查出来的当前用户的权限做对比，有相应权限才会放行。

但是这种方案查询数据库太频繁，需要用 redis 来做缓存。

当然，你选择登录的时候把权限一并查出来放到 session 或者 jwt 里也是可以的。

这就是通过 ACL 实现的权限控制。
