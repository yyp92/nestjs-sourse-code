# Puppeteer 实现爬虫，爬取 BOSS 直聘全部前端岗位


## 命令
```bash
# 创建项目
nest new boss-jd-spider

# 安装用到的包
# 用 TypeORM 连接 mysql
npm install --save @nestjs/typeorm typeorm mysql2

# 安装 puppeteer
npm/cnpm install --save puppeteer
```




## 总结
我们通过 puppeteer 实现了对 BOSS 直聘网站的前端职位的爬取，并用 Nest + TypeORM 把数据保存到了数据库里。

这样就可以在本地对这些职位数据做一些处理或分析了。
