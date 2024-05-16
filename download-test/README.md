# 大文件如何实现流式下载

transfer-encoding:chunked


## 命令
```bash
# 创建个 Nest 项目
nest new download-test
```




## 从服务器下载一个文件的时候，如何知道文件下载完了呢？
有两种方式：

一种是 header 里带上 Content-Length，浏览器下载到这个长度就结束。
另一种是设置 transfer-encoding:chunked，它是不固定长度的，服务器不断返回内容，直到返回一个空的内容代表结束。




## 总结
大文件上传的优化是分片上传，大文件下载的优化是分片下载。

只不过这个分片下载 http 帮你做了，你只要指定 transfer-encoding:chunked 就行，也叫流式传输。

在 Nest 里可以用 fs.createReadStream 获取文件流，然后返回 StreamableFile 的对象就可以了。

返回的响应就是流式的，我们通过 wireshark 抓包证实了这点。

每个分块都有 chunk size、chunk data 的信息。

以后面试官再问你大文件下载优化或者问 transfer-encoding:chunked，你就可以大胆的说你用 wireshark 抓包验证过了。
