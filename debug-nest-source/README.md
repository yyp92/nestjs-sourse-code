# 如何调试 Nest 源码


## 命令
启动调试，选择Launch via NPM。

```json
{
    "name": "Launch via NPM",
    "request": "launch",
    "runtimeArgs": [
        "run-script",
        "start:dev"
    ],
    "runtimeExecutable": "npm",
    "console": "integratedTerminal",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "cwd": "${workspaceFolder}/debug-nest-source"
    "type": "node"
}
```

这个就是跑 npm run start:dev 的调试配置。

指定 console 为 integratedTerminal，这样日志会输出在 terminal。

不然，日志会输出在 debug console。颜色等都不一样

我们想调试 Nest 的 ts 源码，这就需要用到 sourcemap 了。

用 npm install 下载的包没有 sourcemap 的代码，想要 sourcemap，需要自己 build 源码。

把 Nest 项目下载下来，并安装依赖（加个 --depth=1 是下载单 commit，--single-branch 是下载单个分支，这样速度会快很多）：
```bash
git clone --depth=1 --single-branch https://github.com/nestjs/nest
```

build 下:
```bash
npm install
npm run build
```

会在 node_modules/@nestjs 下生成编译后的代码。

看下 npm scripts：


看build和postbuild两个命令。

可以看到它做的事情就是 tsc 编译代码，然后把编译后的文件移动到 node_modules/@nestjs 目录下。


生成 sourcemap 需要改下 tsc 编译配置，也就是 packages/tsconfig.build.json 文件：

设置 sourceMap 为 true 也就是生成 sourcemap，但默认的 sourcemap 里不包含内联的源码，也就是 sourcesContent 部分，需要设置 inlineSources 来包含。


然后把根目录 node_modules 下生成的代码覆盖下 cats 项目的 node_modules 下的代码：


```bash
{
    "name": "调试 nest 源码",
    "request": "launch",
    "runtimeArgs": [
        "run-script",
        "start:dev"
    ],
    "runtimeExecutable": "npm",
    "console": "integratedTerminal",
    "cwd": "${workspaceFolder}/sample/01-cats-app/",
    "resolveSourceMapLocations": [
        "${workspaceFolder}/**",
        // "!**/node_modules/**"
    ],
    "skipFiles": [
        "<node_internals>/**"
    ],
    "type": "node"
}
```


指定 cwd 为那个项目的目录，也就是在那个目录下执行 npm run start:dev。

resolveSourceMapLocations 是从哪里找 sourcemap，默认排除掉了 node_modules，我们把它去掉。





## 总结
这节我们学习了如何调试 Nest 源码。

vscode 里创建 npm scripts 的调试配置，就可以调试 npm run start:dev 的服务。

但如果想调试源码，需要把 Nest 源码下载下来，build 出一份带有 sourcemap 版本的代码。

同时还要设置 resolveSourcemapLocations 去掉排除 node_modules 的配置。

而如果你想在你的项目里调试 Nest 源码，只要把 node_modules/@nestjs 覆盖你项目下那个就好了。

然后再调试，就可以直接调试 Nest 的 ts 源码了。

我们调试了下 AOP 部分的源码，以后你对哪部分的实现原理感兴趣，也可以自己调试源码了。
