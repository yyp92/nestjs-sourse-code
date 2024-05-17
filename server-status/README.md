# 如何拿到服务器 CPU、内存、磁盘状态


## 命令
```bash
# 创建项目
nest new server-status

# 磁盘信息
npm install --save node-disk-info
```




## 总结
这节我们拿到了服务器的 cpu、内存、磁盘、ip 等信息。

通过 node 的 os 模块的 api 以及 node-disk-info 这个包。

可以在后台管理系统加一个页面来展示这些信息。
