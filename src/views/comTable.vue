<template>
  <div class="box">
    <table-search :searchData="searchData" @changeType="changeType" @tableSearch="tableSearch" ></table-search>
  </div>
</template>

<script>
export default {
  components: {
    TableSearch: () => import('@/components/Form/TableSearch')
  },
  data () {
    return {
      // 选择周期改变的数据
      selectDate: [
        {
          isChange: 'date', // 能根据切换按钮改变类型的标识
          type: 'date',
          label: '日期',
          model: 'date',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        },
        {
          isChange: 'date', // 能根据切换按钮改变类型的标识
          type: 'date',
          label: '月选择',
          model: 'month1',
          dateType: 'month',
          valueFormat: 'yyyy-MM',
          format: 'yyyy-MM',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        }
      ],
      searchData: [
        {
          type: 'input',
          label: '姓名',
          model: 'name',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6,
          rules: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        {
          type: 'select',
          label: '选择',
          model: 'furit',
          value: '1',
          options: [
            { value: '1', label: '香蕉' },
            { value: '2', label: '苹果' },
            { value: '3', label: '橘子' }
          ],
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        },
        {
          isChange: 'date', // 能根据切换按钮改变类型的标识
          type: 'date',
          label: '日期',
          model: 'date',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        },
        {
          type: 'date',
          label: '日期选择',
          model: 'dateyange',
          dateType: 'daterange',
          startPlaceholder: '开始',
          endPlaceholder: '结束',
          targetModel: ['startTime', 'endTime'],
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        },
        {
          type: 'date',
          label: '月选择',
          model: 'month',
          dateType: 'month',
          valueFormat: 'yyyy-MM',
          format: 'yyyy-MM',
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        },
        {
          type: 'radio',
          label: '统计周期',
          model: 'radio',
          value: '1',
          change: 'changeType',
          options: [
            { label: '日', value: '1' },
            { label: '月', value: '2' }
          ],
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6
        }
      ]
    }
  },
  methods: {
    changeType (val) {
      // 根据标识获取到索引
      const index = this.searchData.findIndex(v => v.isChange && v.isChange === 'date')
      // console.log(val.radio)
      // console.log(val.radio, typeof (val.radio))
      if (val.radio === '1') {
        // this.searchData[index] = this.selectDate[0]
        this.$set(this.searchData, index, this.selectDate[0])
      } else {
        // this.searchData[index] = this.selectDate[1]
        this.$set(this.searchData, index, this.selectDate[1])
      }
      // console.log()
    },
    tableSearch (form) {
      console.log(form)
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  padding-top: 20px;
}
</style>
