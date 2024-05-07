# nest 集成 Winston

- 前面我们学过了如何自定义 Nest 的 logger，现在只要在 Logger 的实现里改成 winston 的 logger 就好了。

- 只是想要保持 nest 原本日志的格式，需要用 printf 自定义。我们使用 dayjs + chalk 自定义了 winston 的日志格式。

- 当然，打印到 File 的日志，依然是 json 的。

- 之后封装了个动态模块，在 forRoot 方法里传入 options，模块内创建 winston 的 logger 实例。并且这个模块声明为全局模块。

- 这样，在应用的各处都可以注入我们自定义的基于 winston 的 logger 了。
