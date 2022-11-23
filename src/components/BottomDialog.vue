<template>
  <div class="bottom-dialog-box" v-show="showDialog">
    <div class="section" :class="slider ? 'open-section' : ''">
      <h3>{{title}}</h3>
      <div class="section-body">
        <slot></slot>
      </div>
      <div class="section-foot">
       <button v-for="(item, index) in btnList" :key="index" :type="item.type" @click="btnClick(item.methodName)">{{item.text}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '选择传播名'
    },
    btnList: {
      type: Array,
      default: () => {
        return [
          { text: '取消', methodName: 'close' },
          { type: 'primary', text: '确认', methodName: 'primary' }
        ]
      }
    }
  },
  data () {
    return {
      showDialog: false,
      slider: false
    }
  },
  methods: {
    btnClick (name) {
      this[name]()
    },
    close () {
      this.slider = false
      setTimeout(() => {
        this.showDialog = false
        this.$emit('parenClose')
      }, 500)
    },
    primary () {
      this.slider = false
      setTimeout(() => {
        this.showDialog = false
        this.$emit('parenPrimary')
      }, 500)
    },
    openDialog () {
      this.showDialog = true
      this.$nextTick(() => {
        const dom = document.querySelector('.section')
        const height = dom.offsetHeight
        dom.style.bottom = `-${height + 10}px`
        this.slider = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-dialog-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  .section {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -60vw;
    padding: 20px;
    background: white;
    border-radius: 6px 6px 0 0;
    transition: all .5s;
    h3 {
      text-align: center;
    }
    .section-body {
      max-height: 40vh;
      min-height: 10vh;
      overflow-y: auto;
      padding: 20px;
    }
    .section-foot {
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
        font-size: 18px;
        height: 36px;
        border: none;
        background: #f5f7fa;
        color: rgb(153, 168, 173);
        border-radius: 8px;
      }
      button[type=primary] {
        background: skyblue;
        color: white;
      }
    }
  }
  .open-section {
    bottom: 0 !important;
  }
}
</style>
