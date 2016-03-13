var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_PATH = path.resolve(__dirname, 'build');
var JS_SRC_PATH = path.resolve(__dirname, 'src/js/');
var JS_ENTRY_PATH = path.resolve(__dirname, 'src/js/tomato.jsx');

process.env.BABEL_ENV = 'production';

module.exports = {
    devtool: 'source-map',
    entry: {
        tomato: JS_ENTRY_PATH
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.css', '.scss', '.jsx', '.png', '.jpg']
    },
    output: {
        path: BUILD_PATH, //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '../', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js' //每个页面对应的主js的生成配置
            // chunkFilename: 'js/[id].chunk.js' //chunk生成的配置
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: JS_SRC_PATH,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]', {
                    publicPath: '../'
                }
            )
        }, {
            test: /\.(jpg|png)$/,
            loader: 'url?name=images/[name].[ext]&limit=51200'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'js/lib.js',
            chunks: ['react', 'react-dom', 'redux', 'react-redux']
        }),
        new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './app/index.html', //生成的html存放路径，相对于path
            template: './src/app/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['lib', 'tomato'], //需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require', '*'] //排除关键字
        })
    ]
};