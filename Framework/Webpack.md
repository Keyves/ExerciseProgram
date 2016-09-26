# Webpack



------------------------------------------------------------------------------
## entry 入口
在入口文件内引用的模块都会被webpack加载，被引用的文件里如果又引用了其他文件同样也会加载
所以就像一个金字塔，从最上端扩散，也可以理解为树的分叉
所以入口文件一般不会有很多逻辑 ，只是负责引入文件而已
这样就可以把逻辑写入到其他文件，分门别类

> 这里就有一种分拆文件的方法了，将自己的文件通过一个入口引入，然后再加一个入口，将所有的依赖写入该入口，就可以将依赖和业务代码分成两个文件
> webpack会自动分析，第二个文件载入的这些模块，就算第一个文件引入了，也会被倒入到第二个文件里
> 依赖一般是不变的，所以根据前端优化策略让用户缓存，之后你每次只替换业务代码的文件，就可以减小除第一次外的加载时间

------------------------------------------------------------------------------
## output 输出
如字面意思就是输出
输出对应入口
有多少个入口就有多少个输出

### path
对应的是文件导出的路径

### publicPath
文件内部资源映射的路径

### filename
就是文件名，可以包含路径
'[name].js'中被中括号扩起来的name对应的就是入口文件的key值
所以当有多个入口的时候就会生成相应key值的文件

> **理解此段 需先了解 HtmlWebpackPlugin 插件**
> [entry]
> path: './build'
> publicPath: './build/js'
> filename: 'js/lib.js'
>
> [HtmlWebpackPlugin]
> filename: 'template/template.html'
>
> [输出后]
> js存放点 ./build/js/lib.js = path + filename [entry]
> html存放点 ./build/xxx.html = publicPath + filename [HtmlWebpackPlugin]
> html中插入的script标签的src './build/js/js/lib.js' = publicPath + filename [entry]
>
> 此时src引入的js文件因为路径错误将会显示404
> 正确的publicPath = '../'
> 最终src将等于 '../js/lib.js'


------------------------------------------------------------------------------
## resolve 路径补充

### root
即alias的根目录  可以设置为`process.cwd()`运行程序的根目录，一般也就是config.js所在的目录

### alias
路径的别名
没有这个东西的时候就是按平常的路径方案

> ./src就是当前目录下的src
/src就是根目录的src
所以当你定义了别名的时候比方`assets: 'assets'`
这个指的是webpack.config.js文件所在的同级目录下的assets文件 然后别名也叫assets
之后你就可以在入口文件引入的所有的文件里直接使用'assets'就可以导向该文件夹
`import xx from 'assets/xx'`
这段代码无论你放在哪，只要被入口文件引入了，都是会指向assets下的xx

### extensions
自动补全后缀，在数组里设置好后缀名，之后你引入文件的时候就可以省略了，webpack会把这个数组的值全部试一遍，直到匹配
`import './xx.less'` 等同于 `import './xx'`

------------------------------------------------------------------------------

## module 模块加载

### loaders
各种模块的加载编译器

#### test
正则匹配，匹配符合后缀名条件的文件都会被loader指定的编译器编译
另外babel这个编译器会默认读取根目录下的.babelrc文件及babel的配置文件
exclude就是排除符合该正则匹配的目录，不进行编译

#### query
预设

#### plugins

## devtool 开发工具

'source-map'生成映射文件
编译过程是这个样子react + es6 => es5
所以当报错的时侯可以通过映射文件直接找到源代码的错误点，而不是编译后的es5版本

## devServer
就是webpack-dev-server的配置选项

### color
就是控制台带颜色输出

### profile
显示编译的具体内容

### hot & inline
开启热替换

> 开服务器需要在每个入口文件数组里插入这两句
'webpack/hot/only-dev-server'
'webpack-dev-server/client?http://host:port'(host为ip，port为端口，需自定义)
host:port是页面和调试服务器进行沟通的地址  —host 0.0.0.0就是使用前面设置好的地址 —port指定输出文件的服务器端口
热替换，浏览器需要通过socket.io实时查看服务器这边的文件状态

### progress
编译进度

### config
配置文件的路径，默认是当前目录下的webpack.config.js


## plugins 插件

* CommonsChunkPlugin
提取js公共模块

* ExtractTextPlugin
分离css文件

* UglifyJsPlugin
混淆压缩

* HtmlWebpackPlugin
多文件输出，并添加hash，防止缓存

* HotModuleReplacementPlugin
热替换

* DefinePlugin
消除webpack-transform-hmr警告
