<template>
  <div>
    <div style="padding: 30px 0">
      <el-radio-group v-model="radio">
        <el-radio v-for="(item, index) in selectList" :key="index" :label="item.value">{{item.text}}</el-radio>
      </el-radio-group>
    </div>
    <el-table
      :key="toggleIndex"
      :data="tableData"
      style="width: 100%">
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
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggleIndex: '1', // 解决动态切换表头时，样式塌陷问题
      radio: '1',
      selectList: [
        { text: '一级表格', value: '1', name: 'tableColum1' },
        { text: '二级表格1', value: '2', name: 'tableColum2' },
        { text: '二级表格2', value: '3', name: 'tableColum3' }
      ],
      tableColum: [],
      tableColum1: [
        { label: '运行台区数', prop: 'a1', click: true, type: 1 },
        { label: '系统赋值成功数', prop: 'a2', click: true, type: 1 },
        { label: '系统赋值失败数', prop: 'a3', click: true, type: 1 },
        { label: '系统赋值率', prop: 'a4', click: true, type: 2 },
        { label: '统计日期', prop: 'a5' }
      ],
      tableColum2: [
        { label: '在运台区总数', prop: 'a1' },
        { label: '系统赋值情况', prop: 'a', child: [{ label: '系统赋值台区数', prop: 'a2', click: true, type: 1 }, { label: '系统不可赋值台区数', prop: 'a3', click: true, type: 1 }, { label: '系统赋值率', prop: 'a4' }] },
        { label: '总赋值情况', prop: 'b', child: [{ label: '系统赋值台区数', prop: 'a5', click: true, type: 1 }, { label: '人工赋值台区数', prop: 'a6', click: true, type: 1 }, { label: '赋值率', prop: 'a7' }] },
        { label: '统计日期', prop: 'a8' },
        { label: '操作', prop: 'a9', click: true, type: 3 }
      ],
      tableColum3: [
        { label: '台区总数', prop: 'a1' },
        { label: '系统赋值准确率情况', prop: 'a', child: [{ label: '赋值准确数', prop: 'a2' }, { label: '赋值准确率', prop: 'a3', click: true, type: 4 }, { label: '赋值不合理数', prop: 'a4', click: true, type: 1 }, { label: '赋值不合理占比', prop: 'a5' }] },
        { label: 'HPLC赋值准确率情况 ', prop: 'b', child: [{ label: 'HPLC台区总数', prop: 'a6' }, { label: 'HPLC赋值准确数', prop: 'a7', click: true, type: 4 }, { label: 'HPLC赋值不合理数', prop: 'a8', click: true, type: 1 }, { label: 'HPLC赋值不合理占比', prop: 'a9' }] },
        { label: '统计日期', prop: 'a10' }
      ],
      tableData: [{
        a1: '11',
        a2: '22',
        a3: '33',
        a4: '44',
        a5: '55',
        a6: '66',
        a7: '77',
        a8: '88',
        a9: '99',
        a10: '10'
      }, {
        a1: '11',
        a2: '22',
        a3: '33',
        a4: '44',
        a5: '55',
        a6: '66',
        a7: '77',
        a8: '88',
        a9: '99',
        a10: '10'
      }, {
        a1: '11',
        a2: '22',
        a3: '33',
        a4: '44',
        a5: '55',
        a6: '66',
        a7: '77',
        a8: '88',
        a9: '99',
        a10: '10'
      }, {
        a1: '11',
        a2: '22',
        a3: '33',
        a4: '44',
        a5: '55',
        a6: '66',
        a7: '77',
        a8: '88',
        a9: '99',
        a10: '10'
      }]
    }
  },
  watch: {
    radio: {
      immediate: true, // 立即执行，让改监听在第一数据没改变时走一次
      handler (val) {
        const name = this.selectList.find(it => it.value === val).name
        this.tableColum = this[name]
        this.toggleIndex = val
      }
    }
  },
  methods: {
    tableClick (row, type) {
      // type: 1 跳转到理论线损赋值明细页面，2 打开近30日赋值率曲线弹窗, 3 打开月赋值率曲线, 4 打开月赋值准确率曲线弹窗
      console.log(row, type)
    }
  }
}
</script>

<style lang="less" scoped>
.table-click {
  cursor: pointer;
  color: #87b991;
}
</style>
