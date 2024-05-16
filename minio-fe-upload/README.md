# 前端如何直传文件到 Minio


## 命令
```bash
# 创建个 nest 服务
nest new minio-fe-upload

# 安装 minio 包
npm install --save minio

# 然后创建个模块
nest g module minio
```




## 总结
前面我们实现过阿里云 OSS 的前端直传文件，只要在服务端做预签名，前端就可以不用 accessKey 实现文件上传。

这节我们实现了 minio 的前端文件直传，也是通过服务端做预签名，然后前端直接传 minio 就行。

一般我们不会直接上传文件到应用服务器，或者传阿里云 OSS 或者传 minio。
