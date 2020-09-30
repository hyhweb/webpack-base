const path = require('path');
const  webpack = require('webpack');
const  htmlWebpackPlugin =require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={
    //模式
    //mode: "development",//development, production 或 none
    //入口
    entry: "./src/scripts/index.js",
    //输出
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    //模块
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
   // devtool: 'inline-source-map',//使用 source map
    //插件
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({template: "./src/view/index.html", title: "webpack开发环境"})
    ],
    //解析
    resolve: {
        alias: {
            scripts:path.resolve(__dirname,'src/scripts/'),
            src:path.resolve(__dirname,'src'),
            theme:path.resolve(__dirname,'src/theme'),
        }
    },
    //优化
    optimization:{
        minimize: true
    },
    /*devServer: {
        contentBase:path.resolve(__dirname,'dist'),
        compress:true,
        port:9000,
        hot:true
    }*/
}
