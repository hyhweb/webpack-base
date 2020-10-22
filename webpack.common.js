const path = require('path');
const  webpack = require('webpack');
const  htmlWebpackPlugin =require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin =require('webpack-parallel-uglify-plugin');

module.exports={
   /* 官网给出了三种常用的代码分割的方法

    Entry Points：入口文件设置的时候可以配置
    CommonsChunkPlugin：上篇文章讲了一下应用，更详细的信息可以查看官网
    Dynamic Imports：动态导入。通过模块的内联函数调用来分割，这篇文章主要会结合 vue-router 分析一下这种方式
*/

    //模式
    //mode: "development",//development, production 或 none
    //多文件入口，可以实现代码分割（代码分割方式一）
  /*  entry: {
        bundle:"./src/scripts/index.js",
        module:"./src/scripts/module.js",
    },*/
    entry: ["./src/scripts/index.js"],
    //输出
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: path.posix.join("static", "js/[name][chunkhash:8].js"),
        chunkFilename:path.posix.join("static", "js/[name][chunkhash:8].js"),
        /*filename: path.resolve("./dist","[name].js"),*/
        publicPath: "/",
    },

    //模块
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:18192,  //18k,图片小于18k，就会生产dataUrl的base64位图放到首页，减少图片请求。如果大于18k，就放到下面的文件夹里面。
                            outputPath:"static/images"
                        }
                    }

                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ]
    },
   // devtool: 'inline-source-map',//使用 source map
    //插件
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
           /* filename: '[name].css',
            chunkFilename: '[id].css',*/
           filename:path.posix.join("static", "css/[name][chunkhash:8].css"),
            chunkFilename:path.posix.join("static", "css/[name][chunkhash:8].css"),
        }),
        new OptimizeCssAssetsPlugin(),

        new htmlWebpackPlugin({
            template: "./src/view/index.html",
            inject: true,
            title: "webpack开发环境",
            /*publicPath:'/static',*/
           /* templateParameters: {
                BASE_URL: '/static',
            },*/
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
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
        //代码分割配置（方式二）
        splitChunks: {
            chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
            minSize: 1,         //字节 引入的文件大于30kb才进行分割
            //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
            minChunks: 1,           //模块至少使用次数
            maxAsyncRequests: 2,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
            maxInitialRequests: 2,  //首页加载的时候引入的文件最多3个
            automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
            name: true,                  //缓存组里面的filename生效，覆盖默认命名
            cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
                vendors: {  //自定义打包模块
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
                    name: 'chunk-vendors'
                    //filename: path.posix.join('static','js/[name][chunkhash:8][id].vendors.js') ,
                },
                default: { //默认打包模块
                    priority: -20,
                    reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
                   // name: 'chunk-common'
                    // filename:path.posix.join('static','js/[name][chunkhash:8][id].common.js'),
                }
            }
        },
        minimize: true,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS:{
                    output: {
                        beautify:false,
                        comments: false
                    },
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                        reduce_vars:true
                    }
                }
            })
        ]

    },
    /*devServer: {
        contentBase:path.resolve(__dirname,'dist'),
        compress:true,
        port:9000,
        hot:true
    }*/
}
