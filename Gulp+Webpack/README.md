#Gulp + Webpack

## React + ES6 的打包方案

* package.json部分依赖可以删除，为早期gulp配置插件，现gulp仅负责合图和调度webpack（其余功能转webpack）

### webpack

```bash
    "babel-core": "^6.7.2",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "css-loader": "^0.23.1",
    "file-loader": "^0.8.5",
    "react": "^0.14.7",
    "react-dom": "^0.14.7",
    "react-redux": "^4.4.0",
    "redux": "^3.3.1",
    "style-loader": "^0.13.0",
    "url-loader": "^0.5.7",
    "webpack": "^1.12.14",
    "html-webpack-plugin": "^2.10.0",
```

* babel-loader编译es6(babel) & react(jsx)

* **process.env.BABEL_ENV 区分 production 和 development 环境（.babelrc）避免编译后混入开发代码**

* HtmlWebpackPlugin多文件输出，并添加hash，防止缓存

##### *production*

```bash
    "extract-text-webpack-plugin": "^1.0.1",
```

* css-modules模块化管理css变量

* url-loader管理图片并将符合条件的图片转为base64

* CommonsChunkPlugin提取js公共模块

* ExtractTextPlugin分离css文件

* UglifyJsPlugin混淆压缩

##### *devlopment*

```bash
    "webpack-dev-server": "^1.14.1"
```

* webpack-dev-server负责dev调试

* HotModuleReplacementPlugin热替换

* DefinePlugin消除webpack-transform-hmr警告


### gulp

```bash
    "gulp": "github:gulpjs/gulp#4.0",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-concat": "^2.6.0",
    "gulp-css-base64": "^1.3.4",
    "gulp-css-spriter": "^0.3.3",
    "gulp-cssmin": "^0.1.7",
    "gulp-file-include": "^0.13.7",
    "gulp-md5-plus": "^0.2.0",
    "gulp-sass": "^2.2.0",
    "gulp-util": "^3.0.7",
```

```bash
	npm install --save-dev gulpjs/gulp#4.0
```

##### *插件*

* **gulp-autoprefixer	补全css浏览器前缀**

* gulp-concat		合成文件

* gulp-css-base64	内嵌图片转为base64

* **gulp-css-spriter	合成雪碧图，并自动修改css**

* gulp-cssmin		压缩css代码

* gulp-file-include	引入文件

* gulp-md5-plus		文件加入md5后缀，并自动修改html

* gulp-sass			编译sass

* **gulp-util			输出信息**

##### *方法*

* gulp.task为一个任务

* gulp.watch监听文件

* gulp.src引入文件

* gulp.dest输出文件

* gulp.pipe流式传输

* gulp.series串行执行		依赖 gulp#4.0

* gulp.parallel并行执行		依赖 gulp#4.0