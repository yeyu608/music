const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: { //代理
      '/api': {
        target: 'http://www.codeman.ink:3000',//服务器的更根地址
        changeOrigin: true, //代理
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }

})