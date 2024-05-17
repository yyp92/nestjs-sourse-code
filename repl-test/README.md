# Nest 的 REPL 模式
repl 是 read-eval-paint-loop。


## 命令
```bash
# 创建个 Nest 项目
nest new repl-test

# 创建两个模块
nest g resource aaa
nest g resource bbb

# 启动 repl 命令
# 这里的 --entryFile 是指定入口文件是 repl.ts
npm run start:dev -- --entryFile repl

# 安装校验相关的包
npm install class-validator class-transformer
```




## 总结
这节我们学了 nest 的 repl 模式。

repl 模式下可以直接调用 controller 或者 provider 的方法，但是它们并不会触发 pipe、interceptor 等，只是传参测试函数。

可以使用 debug() 拿到 module、controller、provider 的信息，methods() 拿到方法，然后 get() 或者 $() 拿到 controller、provider 然后调用。

repl 模式对于测试 service 或者 contoller 的功能还是很有用的。
