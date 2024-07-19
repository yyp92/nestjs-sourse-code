# 图书管理系统


## 命令
```bash
# 创建项目
nest new book-management-system-backend

# 创建一个 user 模块
nest g resource user --no-spec

# 还没有学习数据库，这里就用 json 文件来存储数据吧。
# 创建一个 db 模块
nest g module db
nest g service db
# 加下 book 模块
nest g resource book

# 上传
# 安装用到的包：
npm install --save multer
npm install -save-dev @types/multer
```
