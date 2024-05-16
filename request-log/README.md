# 如何记录请求日志


## 命令
```bash
# 创建项目
nest new request-log

# 创建个 interceptor
nest g interceptor request-log --no-spec --flat

# 但其实这个 ip 是有问题的：
# 如果客户端直接请求 Nest 服务，那这个 ip 是准的，但如果中间经过了 nginx 等服务器的转发，那拿到的 ip 就是 nginx 服务器的 ip 了。
# 这时候要取 X-Forwarded-For 这个 header，它记录着转发的客户端 ip。
npm install --save request-ip

# 请求三方服务用 axios 的包
npm install --save @nestjs/axios axios

# 它就是用来转换字符集的
npm install --save iconv
```




## 总结
我们通过 interceptor 实现了记录请求日志的功能。

其中 ip 地址如果被 nginx 转发过，需要取 X-Forwarded-For 的 header 的值，我们直接用 request-ip 这个包来做。

如果想拿到 ip 对应的城市信息，可以用一些免费接口来查询，用 @nestjs/axios 来发送请求。当然，这个不建议放到请求日志里。

这样，就可以记录下每次请求响应的信息了。
