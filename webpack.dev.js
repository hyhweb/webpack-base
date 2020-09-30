const {merge} = require('webpack-merge');
const common = require('./webpack.common');
module.exports =merge(common,{
    //mode:'development',
    mode:'production',
    devtool:'inline-source-map',
    devServer:{
        contentBase: common.output.path,
        compress:true,
        port:9000,
        hot:true
    }
})
