
'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var path = require("path");

module.exports = {
    entry: path.join(__dirname + '/src/entry.js'), //唯一入口文件
    output: {
        path: path.join(__dirname, "dist"), //打包后的文件存放的地方
        filename: "[name].js", //打包后输出文件的文件名
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        publicPath: '/dist/'
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
	devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'},
            { test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,loader : 'url?prefix=font/&limit=10000'}
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        host:'0.0.0.0',
        port: 8888,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        disableHostCheck:true,//ip限制
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery",
            'react': 'React',
            'react-dom': 'ReactDOM'
        }),
//      new cleanWebpackPlugin(['./dist','./build']);
//		new webpack.optimize.DedupePlugin(),
//      new webpack.OldWatchingPlugin(),
//      new webpack.optimize.UglifyJsPlugin({
//          exclude:/\.min\.js$/,
//          mangle:true,
//          compress: { warnings: false },
//          output: { comments: false }
//      }),
//      new webpack.optimize.CommonsChunkPlugin({
//          name:['common']
//      })
    ]

}
