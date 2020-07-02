const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'store': '@/store',
        'views': '@/views'
      }
    },
    plugins: [

      new webpack.ProvidePlugin({

        $: "jquery",

        jQuery: "jquery",

        "windows.jQuery": "jquery"

      })

    ],
    devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      https: false,
      //以上的ip和端口是我们本机的;下面为需要跨域的
      proxy: { //配置跨域
        '/api': {
          target: 'localhost:3000/forum/posting/saveall', //这里后台的地址模拟的;应该填写你们真实的后台接口
          ws: true,
          changOrigin: true, //允许跨域
          pathRewrite: {
            '^/api': '' //请求的时候使用这个api就可以
          }
        }
      }
    }
  }
}