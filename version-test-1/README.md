# 接口实现多版本共存

- 只要在 main.ts 里调用 enableVersioning 即可。
- 有 URI、HEADER、MEDIA_TYPE、CUSTOM 四种指定版本号的方式。
- HEADER 和 MEDIA_TYPE 都是在 header 里置顶，URI 是在 url 里置顶，而 CUSTOM 是自定义版本号规则。
- 可以在 @Controller 通过 version 指定版本号，或者在 handler 上通过 @Version 指定版本号。
- 如果指定为 VERSION_NEUTRAL 则是匹配任何版本号（URI 的方式不支持这个）。
