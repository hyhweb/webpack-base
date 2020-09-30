const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports =merge(common,{
    mode:'development',
    //:'production',
    devtool:'inline-source-map',
    devServer:{
        contentBase: common.output.path,
        compress:true,
        port:9000,
        hot:true
    }
})
