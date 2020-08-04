module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
      open: true, // 启动服务后是否打开浏览器
      host: '0.0.0.0',
      port: 8080, // 服务端口
      https: false,
      hotOnly: false,
      proxy: {
        '/media': {//代理api
            target: "http://localhost:8000",//服务器api地址
            changeOrigin: true,//是否跨域
            ws: false, // proxy websockets
            pathRewrite: {//重写路径
                "^/admin": ''
              }
          }
      },
      before: app => {}
  },
  configureWebpack: {
  }
}