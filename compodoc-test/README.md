# 使用 compodoc 生成文档
Nest 项目会有很多模块，模块之间相互依赖，模块内有 controller、service 等。

当项目复杂之后，模块之间的关系错综复杂。

这时候我们可以用 compodoc 生成一份文档，把依赖关系可视化。

compodoc 本来是给 angular 项目生成项目文档的，但是因为 angular 和 nest 项目结构类似，所以也支持了 nest。



## 命令
```bash
# 创建个项目
nest new compodoc-test

# 安装 compodoc
npm install --save-dev @compodoc/compodoc

# 然后生成一份文档
# -p 是指定 tsconfig 文件
# -s 是启动静态服务器
# -o 是打开浏览器
npx @compodoc/compodoc -p tsconfig.json -s -o

# 在项目下加几个模块
nest g resource aaa
nest g resource bbb
```




## 资料
- [compodoc](https://compodoc.app/guides/options.html)

比如 --theme 可以指定主题，一共有 gitbook,aravel, original, material, postmark, readthedocs, stripe, vagrant 这 8 个主题：

```bash
npx @compodoc/compodoc -p tsconfig.json -s -o --theme postmark
```




## 总结
我们学习了用 compodoc 生成 nest 项目的文档，它会列出项目的模块，可视化展示模块之间的依赖关系，展示每个模块下的 provider、exports 等。

对于新人接手项目来说，还是比较有用的。

而且可视化分析依赖和模块结构，对于复杂项目来说，是比较有帮助的。

compodoc 算是一个不错的 nest 相关的工具。
