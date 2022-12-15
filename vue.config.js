module.exports = {
  lintOnSave: false,
  devServer:{
    // open:true,
    // before表示在devServer中的配置先经过before的操作
    before: require("./mock/mockServe.js") //引入mock.js
  }
}