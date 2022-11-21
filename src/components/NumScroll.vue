<template>
  <div>
    <ul :style="{color: color, fontSize: size}">
      <li v-for="(item,index) in computeNumber" :key="index" :class="{'number-item': !isNaN(item)}" :style="{width: !isNaN(item)?size:0, height: !isNaN(item)?size:auto}">
        <span v-if="!isNaN(item)">
          <i ref="numberItem">0123456789</i>
        </span>
        <span v-else class="fuhao">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    number: {
      type: [Number, String],
      default: 0
    },
    // 字体颜色
    color: {
      type: String,
      default: 'red'
    },
    // 字体大小
    size: {
      type: String,
      default: '16px'
    }
  },
  data () {
    return {
      computeNumber: [0]
    }
  },
  watch: {
    number () {
      this.transformNum()
      this.$nextTick(() => {
        this.scrollNum()
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.transformNum()
      this.$nextTick(() => {
        this.scrollNum()
      })
    }, 500)
  },
  methods: {
    // 将接收的数字转换成需要的数组
    transformNum () {
      this.computeNumber = String(this.number).split('')
    },
    // 根据数字滚动到相应位置
    scrollNum () {
      const numberItem = this.$refs.numberItem
      const arr = this.computeNumber.filter(it => it !== ',')
      arr.map((item, index) => {
        const el = numberItem[index]
        setTimeout(() => {
          el.style.transform = `translate(0, -${item * 10}%)`
        }, 100)
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  display: flex;
  font-size: 16px;
  color: red;
  li {
    position: relative;
    .fuhao {
      position: absolute;
      bottom: -3px;
      left: 0px;
    }
  }
  .number-item {
    width: 16px;
    height: 16px;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      writing-mode: vertical-lr;
      text-orientation: upright;
      position: relative;
      overflow: hidden;
      i {
        display: inline-block;
        width: 100%;
        font-style: normal;
        position: absolute;
        transform: translate(0, 0);
        transition: all .5s ease-in-out;
      }
    }
  }
}
</style>
