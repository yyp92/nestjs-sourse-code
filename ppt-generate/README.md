# 如何用代码动态生成 PPT


## 命令
```bash
# 创建个 Nest 项目
nest new ppt-generate

# 安装 puppeteer
cnpm/npm install --save puppeteer

# 生成ppt
npm install --save pptxgenjs
```




## 总结
我们使用 puppeteer 抓取了大学的信息，用 SSE 的方式创建了接口，不断返回爬取到的数据。

然后用 pptxgenjs 来生成了 ppt。

这样，400 多张 PPT 瞬间就生成了，不用自己手动搞。
