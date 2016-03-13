var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var JS_BUILD_PATH = path.resolve(__dirname, 'build/js/');
var JS_SRC_PATH = path.resolve(__dirname, 'src/js/');
var JS_ENTRY_PATH = path.resolve(__dirname, 'src/js/tomato.jsx');

process.env.BABEL_ENV = "development";

module.exports = {
    devtool: 'source-map',
    devServer: {
        stats: {
            colors: true
        },
        hot: true,
        inline: true,
        progress: true,
        historyApiFallback: true,
        publicPath: '/build/',
        contentBase: './'
    },
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            JS_ENTRY_PATH
        ]
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.css', '.scss', '.jsx', '.png', '.jpg']
    },
    output: {
        path: JS_BUILD_PATH,
        publicPath: '/build/',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: JS_SRC_PATH,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]", {
                    publicPath: "../"
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
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './app/index.html', //生成的html存放路径，相对于path
            template: './src/app/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            chunks: ['lib', 'index'] //需要引入的chunk，不配置就会引入所有页面的资源
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development")
        })
    ]
};