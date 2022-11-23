<template>
  <div>
    <div class="btn">
      <el-button type="primary" @click="open">点击出现弹框</el-button>
    </div>
    <bottom-dialog ref="dialog">
      <template v-slot:default>
        <div class="select-box">
          <div v-for="(item, index) in list" :key="index">
            <p>{{item.title}}</p>
            <ul>
              <li v-for="(ele, id) in item.content" :key="id" :class="ele.isFlag ? 'select' : ''" @click="select(ele)">{{ele.lable}}</li>
            </ul>
          </div>
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
export default {
  components: {
    BottomDialog: () => import('@/components/BottomDialog')
  },
  data () {
    return {
      list: [
        { title: '荣耀x', content: [{ lable: '荣耀x1', value: '1' }, { lable: '荣耀x1', value: '2' }, { lable: '荣耀x1', value: '3' }, { lable: '荣耀x1', value: '4' }] },
        { title: '荣耀x', content: [{ lable: '荣耀x1', value: '5' }, { lable: '荣耀x1', value: '6' }, { lable: '荣耀x1', value: '7' }, { lable: '荣耀x1', value: '8' }] },
        { title: '荣耀x', content: [{ lable: '荣耀x1', value: '9' }, { lable: '荣耀x1', value: '10' }, { lable: '荣耀x1', value: '10' }, { lable: '荣耀x1', value: '12' }] },
        { title: '荣耀x', content: [{ lable: '荣耀x1', value: '13' }, { lable: '荣耀x1', value: '14' }, { lable: '荣耀x1', value: '15' }, { lable: '荣耀x1', value: '16' }] }
      ],
      selsectList: []
    }
  },
  mounted () {
    this.addMark()
  },
  methods: {
    select (ele) {
      ele.isFlag = !ele.isFlag
      this.getValue()
    },
    open () {
      console.log(this.$refs.dialog)
      this.$refs.dialog.openDialog()
    },
    // 给每个数据添加是否选中标识
    addMark () {
      this.list = this.list.map(item => {
        const bb = item.content.map((ele, index) => {
          return { ...ele, isFlag: Boolean(!index) }
        })
        return { title: item.title, content: bb }
      })
      this.getValue()
    },
    // 获取选中的值
    getValue () {
      this.selsectList = []
      this.list.map(item => {
        item.content.map(ele => {
          if (ele.isFlag) this.selsectList.push(ele.value)
        })
      })
      console.log(this.selsectList)
    }
  }
}
</script>

<style lang="less" scoped>
.select-box {
  >div {
    >p {
      color: #999;
      font-size: 16px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        font-size: 16px;
        color: #333;
        background: #f5f7fa;
        border-radius: 20px;
        padding: 4px 20px;
        margin-right: 10px;
        margin-top: 16px;
        transition: all .5s;
        overflow: hidden;
        cursor: pointer;
      }
      .select {
        background: skyblue;
        color: blue;
      }
    }
  }
  >div:not(:first-child) {
    padding-top: 20px;
  }
}
</style>
