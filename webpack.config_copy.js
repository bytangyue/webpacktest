/**
 * Created by ty on 2016/10/11 0011.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var ReactHtmlPlugin = require("babel-plugin-react-html-attrs");
module.exports = {
    //是页面中的入口文件
    //entry:"./src/manystandard/main.js",
    entry: {//多个入口文件，做到按需加载【会生成2个】,当然entry也可以是一个数组。
        main: "./src/main.js",
        index: "./src/index.js"
    },
    //是指页面通过webpack打包后生成的目标文件放在什么地方去，我这边是在根目录下生成build文件夹，该文件夹内有一个build.js文件；
    output: {//打包输出
        filename: "[name].build.js",//打包后的文件名,[name]为入口文件的名字
        path: __dirname + '/assets/',//打包文件存放的绝对路径
        publicPath: './'//html引用路径，在这里是本地地址。【创建文件引用的文件路径】
    },
    module: {
        //是文件的加载器，比如我们之前react需要在页面中引入jsx的js源码到页面上来，然后使用该语法，但是通过webpack打包后就不需要再引入JSXTransformer.js；看到上面的加载器；比如jsx-loader加载器就是代表JSXTransformer.js的，还有style-loader和css-loader加载器；因此在使用之前我们需要通过命令把它引入到项目上来；因此需要如下命令生成下
        loaders: [//【-loader可以省略，!表示用并且的关系】
            //.less 文件使用 style-loader 、 css-loader 和 less-loader 来处理--->会生成内联样式，然后创建style标签插入head标签里
            //{test: /\.less$/, loader: "style!css!less"},
            //.js 文件使用 jsx-loader【可以处理react】 来编译处理
            {test: /\.js$/, loader: "jsx"},
            {
                test: /\.less$/,//将内联css提取到单独的css文件
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!' +
                    'less?sourceMap'
                )//独立css出来，然后在页面上外链css
            },
            {test: /.(png|jpg)$/, loader: 'url?limit=8192'}//assets目录下会生成1个图片打包文件
        ]
    },
    //定义了解析模块路径时的配置，常用的就是extensions; 可以用来指定模块的后缀，这样在引入模块时就不需要写后缀，会自动补全。
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    //定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取公用的部分，生成common.js;
    plugins: [// 内联css提取到单独的css   [name]为入口文件的名字
        new ExtractTextPlugin('[name].css'),
        //new ReactHtmlPlugin()
    ]
};