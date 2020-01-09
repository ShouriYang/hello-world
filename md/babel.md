# webpack+babel

## 理解

1. `transform-es2015-arrow-funtions`
   使用指定的插件比如`transform-es2015-arrow-funtions`可以将 ES6 编译成 ES5
2. `@babel/polyfill`
   优点：由于第一种每次需要下载指定的插件太麻烦，使用`@babel/polyfill`第三方插件库帮我所有的都编译成功，安装后放在入口文件即可全部使用  
   缺点：全部都要执行第三方库，编译速度慢，打包体积大
3. `@babel/preset-env`
   优点： 通过环境变量的方式会自动下载 23 种常用的转化,但是 promise，Object.assign 还是不能转化，就使用@babel/polyfill 和@babel-preset-env 配合
4. 开发依赖`@babel/plugin-transform-runtime`，实际依赖 `@babel/runtime-corejs3`
   用于 polyfill 的全局污染和支持实例化 API

---

## 实操

1. babel7 以下

- 配置 ES6 转 ES5
  使用插件`babel-preset-es2015`,用于环境变量自动转换
- 配置 ES7 转 ES5
  使用插件`babel-preset-stage-2`,用于转换 async await
- 配置支持 JSX
  使用插件`babel-preset-react`,用于转换 JSX
- 配置支持装饰器
  使用`babel-plugin-transform-decorators-legacy`配置转换装饰器，方便配置 mobx。
- 配置支持 promise
  使用`babel-plugin-transform-runtime`进行对 promise 语法进行打包
- webpack+babel
  使用`babel-loader`加载所有的 js 文件，然后通过`babel-core`进行 babel 打包
- @babel/plugin-proposal-class-properties 必须安装，在 babel6 貌似不用安装就可以使用操作了。
  **webpack.dev.js**:

```
 {
                test:/\.js$/,
                use:[
                {
                    loader:"babel-loader"
                }
            ],
                exclude:/node_modules/
 }
```

**.babelrc**

```
{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": [
        "transform-decorators-legacy","transform-runtime"]
  }
```

使用 babel7 之下撇脂 jest 会包冲突，未解决于是升级 babel 为版本 7 以上。
2.babel7 以上（采用@babel 行式巨 TM 坑）

- babel-cli-----------@babel/cli（babel-cli 依赖了 babel-core，@babel/core 没有以来@babel/core，假如用 cli 本地测试就会报出安装@babel/core）
- @babel/preset-env 配置环境变量必须，参数具有 targets 设置兼容版本
- @babel/preset-react 用于识别 js 语法等等
- @babel/plugin-transform-runtime 配置变量不被 polyfill 等全局污染
- @babel/runtime-corejs3 配置实例化 API 被转译
- @babel/plugin-proposal-decorators 是 ES6 配置装饰器的升级版本
- 最终配置

```
{
  "presets": [
      [
          "@babel/preset-env",
         {
          "targets": {
              "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
         }
      ],
      "@babel/preset-react"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties",{"loose":true}],
    ["@babel/plugin-transform-runtime", {"corejs": 3}
    ]
  ]
}}
```

---

参考资料：

- [babel 中文文档](https://www.babeljs.cn/docs/)
- [阮一峰 babel](http://www.ruanyifeng.com/blog/2016/01/babel.html)
- [github](https://github.com/)
- [npm 官网](https://www.npmjs.com/)
