import { Loading } from 'element-ui' // 使用elemrnt的loading（服务用法）

export default class SetLoading {
  // 构造函数
  constructor (options) {
    this.loadingInstance = null
    this.axiosCount = 0 // ?计数器，用于统计当前axios进行中的数量 控制loading显示隐藏
  }

  open (config) {
    if (!(config && config.noLoading)) {
      this.axiosCount++
    }
    // 只有第一个 才展示蒙层
    if (this.axiosCount === 1) {
      this.loadingInstance = Loading.service({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  }

  close (config) {
    if (!(config && config.noLoading)) {
      this.axiosCount--
    }
    if (this.axiosCount === 0) {
      // 只有最后一个 在关闭蒙层
      this.loadingInstance.close()
    }
  }
}
