const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
// path.join()方法用于连接路径，
//该方法会正确识别当前系统的路径分隔符，
//如Unix系统是”/“，Windows系统是”\“。
//__dirname 是node的一个全局变量，即获得当前文件所在目录的完整目录名。
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false, // 是否开启eslint保存检测
  assetsDir: process.env.VUE_ASSETS_DIR, // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  publicPath: process.env.VUE_APP_BASE_URL, // 地址路径，同时得修改router/index.js里的base
  devServer: {
    open: false, // 默认false   true自动浏览器打开localhost
    // before表示在devServer中的配置先经过before的操作
    before: require("./mock/mockServe.js") //引入mock.js
    // proxy: {
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: process.env.VUE_APP_BASE_PROXY_API,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // }
  },
  configureWebpack: config => {
    config.externals = {
      // 减少打包体积， 要在index.html中引入对应的cdn
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // vuex: 'Vuex',
      // axios: 'axios',
      // 'element-ui': 'ELEMENT',
      // 'vue-scrollTo': 'VueScrollTo',
      // 'vue-i18n': 'VueI18n'
    }
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'none'
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]', // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件夹
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8
        })
      )
    } else {
      // 开发环境
    }
  }
}