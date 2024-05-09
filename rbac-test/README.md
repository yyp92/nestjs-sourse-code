# Role Based Access Control
RBAC 是 Role Based Access Control，基于角色的权限控制




## 命令
### 创建 rbac_test 的 database
```bash
CREATE DATABASE rbac_test DEFAULT CHARACTER SET utf8mb4;
```


### 命令
```bash
# 创建 nest 项目
nest new rbac-test -p npm

# 安装 typeorm 的依赖
npm install --save @nestjs/typeorm typeorm mysql2

# 添加创建 user 模块
nest g resource user

# 运行
npm run start:dev

# 安装 ValidationPipe 用到的包
npm install --save class-validator class-transformer

# 要把 user 信息放到 jwt 里，所以安装下相关的包
npm install --save @nestjs/jwt

# 添加 aaa、bbb 两个模块，分别生成 CRUD 方法
nest g resource aaa 
nest g resource bbb

# 先添加一个 LoginGuard，限制只有登录状态才可以访问这些接口
nest g guard login --no-spec --flat

# 我们还需要再做登录用户的权限控制，所以再写个 PermissionGuard
nest g guard permission --no-spec --flat
```




## 总结
这节我们学了 RBAC（role based access control） 权限控制，它相比于 ACL （access control list）的方式，多了一层角色，给用户分配角色而不是直接分配权限。

当然，检查权限的时候还是要把角色的权限合并之后再检查是否有需要的权限的。

我们通过 jwt 实现了登录，把用户和角色信息放到 token 里返回。

添加了 LoginGuard 来做登录状态的检查。

然后添加了 PermissionGuard 来做权限的检查。

LoginGuard 里从 jwt 取出 user 信息放入 request，PermissionGuard 从数据库取出角色对应的权限，检查目标 handler 和 controller 上声明的所需权限是否满足。

LoginGuard 和 PermissionGuard 需要注入一些 provider，所以通过在 AppModule 里声明 APP_GUARD 为 token 的 provider 来注册的全局 Gard。

然后在 controller 和 handler 上添加 metadata 来声明是否需要登录，需要什么权限，之后在 Guard 里取出来做检查。

这种方案查询数据库也比较频繁，也应该加一层 redis 来做缓存。

这就是基于 RBAC 的权限控制，是用的最多的一种权限控制方案。

当然，这是 RBAC0 的方案，更复杂一点的权限模型，可能会用 RBAC1、RBAC2 等，那个就是多角色继承、用户组、角色之间互斥之类的概念，会了 RBAC0，那些也就是做一些变形的事情。

绝大多数系统，用 RBAC0 就足够了。
