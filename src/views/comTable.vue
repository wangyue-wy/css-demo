<template>
  <div class="box">
    <table-search :searchData="searchData" @changeType="changeType" @tableSearch="tableSearch" ></table-search>
    <table-data :selectIndexP.sync="selectIndexP" border @tableSearch="tableSearch" :tableData.sync="tableData" ref="tableData">
      <template #tableColumn>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <template v-for="(item, index) in tableColum">
          <el-table-column :key="index" :label="item.label" :prop="item.prop" align="center">
            <template slot-scope="scope">
              <div class="table-click" v-if="item.hasOwnProperty('click')" @click="tableClick(scope.row, item.type)">{{scope.row[item.prop]}}</div>
              <div v-else>{{scope.row[item.prop]}}</div>
            </template>
            <template v-if="item.hasOwnProperty('child')">
              <el-table-column v-for="(ele, id) in item.child" :key="id" :label="ele.label" :prop="ele.prop" align="center">
                <template slot-scope="scope">
                  <div class="table-click" v-if="ele.hasOwnProperty('click')" @click="tableClick(scope.row, ele.type)">{{scope.row[ele.prop]}}</div>
                  <div v-else>{{scope.row[ele.prop]}}</div>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </template>
    </table-data>
  </div>
</template>

<script>
export default {
  components: {
    TableSearch: () => import('@/components/Form/TableSearch'),
    TableData: () => import('@/components/Form/TableData')
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
      ],
      selectIndexP: 0,
      tableColum: [],
      allTable: [
        {
          index: 0,
          detail: [
            { label: '运行台区数', prop: 'a1', click: true, type: 1 },
            { label: '系统赋值成功数', prop: 'a2', click: true, type: 1 },
            { label: '系统赋值失败数', prop: 'a3', click: true, type: 1 },
            { label: '系统赋值率', prop: 'a4', click: true, type: 2 },
            { label: '统计日期', prop: 'a5' }
          ]
        },
        {
          index: 1,
          detail: [
            { label: '在运台区总数', prop: 'a1' },
            { label: '系统赋值情况', prop: 'a', child: [{ label: '系统赋值台区数', prop: 'a2', click: true, type: 1 }, { label: '系统不可赋值台区数', prop: 'a3', click: true, type: 1 }, { label: '系统赋值率', prop: 'a4' }] },
            { label: '总赋值情况', prop: 'b', child: [{ label: '系统赋值台区数', prop: 'a5', click: true, type: 1 }, { label: '人工赋值台区数', prop: 'a6', click: true, type: 1 }, { label: '赋值率', prop: 'a7' }] },
            { label: '统计日期', prop: 'a8' },
            { label: '操作', prop: 'a9', click: true, type: 3 }
          ]
        },
        {
          index: 2,
          detail: [
            { label: '台区总数', prop: 'a1' },
            { label: '系统赋值准确率情况', prop: 'a', child: [{ label: '赋值准确数', prop: 'a2' }, { label: '赋值准确率', prop: 'a3', click: true, type: 4 }, { label: '赋值不合理数', prop: 'a4', click: true, type: 1 }, { label: '赋值不合理占比', prop: 'a5' }] },
            { label: 'HPLC赋值准确率情况 ', prop: 'b', child: [{ label: 'HPLC台区总数', prop: 'a6' }, { label: 'HPLC赋值准确数', prop: 'a7', click: true, type: 4 }, { label: 'HPLC赋值不合理数', prop: 'a8', click: true, type: 1 }, { label: 'HPLC赋值不合理占比', prop: 'a9' }] },
            { label: '统计日期', prop: 'a10' }
          ]
        }
      ],
      searchParams: {}, // 表单数据
      pageInfos: {}, // 分页参数
      tableData: []
    }
  },
  watch: {
    selectIndexP: {
      immediate: true,
      handler (val) {
        this.tableColum = this.allTable.find(v => v.index === val)?.detail
      }
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
    tableSearch () {
      let params = {
        ...this.searchParams,
        ...this.pageInfos
      }
      this.getData(params)
      
    },
    getData (params) {
      this.$post('/user/userInfo', params).then(res => {
        this.tableData = res.data.list
        console.log(this.$refs.tableData.pagination)
        this.$refs.tableData.pagination.total = +res.data.total
      })
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  padding: 20px;
}
.table-click {
  cursor: pointer;
  color: #87b991;
}
</style>
