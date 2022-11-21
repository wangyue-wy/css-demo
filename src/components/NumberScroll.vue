<template>
  <div>
    <ul>
      <li v-for="(item,index) in computeNumber" :key="index" :class="{'number-item': !isNaN(item)}">
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
    }
  },
  data () {
    this.staticLength = 8
    return {
      computeNumber: [0, 0, ',', 0, 0, 0, ',', 0, 0, 0]
    }
  },
  watch: {
    number () {
      this.$nextTick(() => {
        this.transformNum()
        this.scrollNum()
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.transformNum()
      this.scrollNum()
    }, 500)
  },
  methods: {
    // 将接收的数字转换成需要的数组
    transformNum () {
      let number = String(this.number)
      // 如果长度不足8位，补0
      if (number.length < this.staticLength) {
        number = number.padStart(this.staticLength, '0')
      }
      // 在字符串的第二位和第五位后面加逗号
      number = number.slice(0, 2) + ',' + number.slice(2, 5) + ',' + number.slice(5)
      this.computeNumber = number.split('')
    },
    // 根据数字滚动到相应位置
    scrollNum () {
      const numberItem = this.$refs.numberItem
      const arr = this.computeNumber.filter(it => it !== ',')
      arr.map((item, index) => {
        const el = numberItem[index]
        el.style.transform = `translate(-50%, -${item * 10}%)`
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  display: flex;
  margin-left: 20px;
  margin-top: 40px;
  li {
    margin-left: 10px;
    position: relative;
    .fuhao {
      position: absolute;
      color: #333;
      font-weight: bold;
      font-size: 30px;
      bottom: 0px;
      left: -5px;
    }
  }
  .number-item {
    width: 53px;
    height: 82px;
    background: url(.././assets/images/num-bgf.png) no-repeat center / 100% 100%;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      writing-mode: vertical-lr;
      text-orientation: upright;
      position: relative;
      overflow: hidden;
      i {
        font-style: normal;
        position: absolute;
        color: white;
        font-size: 54px;
        left: 50%;
        transform: translate(-50%, 0);
        top: 12px;
        transition: all .5s ease-in-out;
        letter-spacing: 40px;
      }
    }
  }
}
</style>
