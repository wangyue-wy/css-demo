<template>
  <div class="excel-block">
    <div class="export-excel-wrapper">
      <el-card shadow="always">
        <el-form
          ref="searchForm"
          :inline="true"
          :model="exportParam"
          label-width="100px"
          class="search-form"
        >
          <el-form-item label="文件名:">
            <el-input v-model="exportParam.fileName" placeholder="文件名" />
          </el-form-item>
          <el-form-item label="自动宽度:">
            <el-radio-group v-model="exportParam.autoWidth">
              <el-radio :label="true">自动</el-radio>
              <el-radio :label="false">固定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文件类型:">
            <el-select v-model="exportParam.type" placeholder="文件类型">
              <el-option value="xlsx" label="xlsx" />
              <el-option value="csv" label="csv" />
              <el-option value="txt" label="txt" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="margin-left: 30px"
              @click="handleExport"
              >导出Excel</el-button
            >
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="id" label="编号" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="sex" label="性别" align="center" />
          <el-table-column prop="phone" label="手机" align="center" />
          <el-table-column prop="education" label="学历" align="center" />
          <el-table-column
            prop="hobby"
            label="爱好"
            align="center"
            width="300"
          />
        </el-table>
      </el-card>
    </div>
    <div class="import-excel-wrapper">
      <el-card shadow="always">
        <UploadExcel @on-success="handleSuccess" />
        <el-table
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%"
          size="medium"
        >
          <el-table-column
            v-for="item in tableHeader"
            :key="item"
            :prop="item"
            :label="item"
            align="center"
          />
        </el-table>
      </el-card>
    </div>
  </div>
</template>
 
<script>
import excel from '@/utils/excel.js'
 
export default {
  name: 'PageExcel',
  components: {
    UploadExcel: () => import('@/components/UploadExcel')
  },
  data() {
    return {
      listLoading: false,
      exportParam: {
        fileName: '',
        autoWidth: true,
        type: 'xlsx'
      },
      tableData: [
        {
          id: 1001,
          name: '张三',
          sex: '男',
          phone: 15266001235,
          education: '高中',
          married: 1,
          forbid: true,
          hobby: '羽毛球、篮球、听歌、阅读'
        },
        {
          id: 1002,
          name: '李四',
          sex: '男',
          phone: 15266006621,
          education: '大专',
          married: 3,
          forbid: false,
          hobby: '乒乓球、排球、游泳'
        },
        {
          id: 1003,
          name: '王五',
          sex: '男',
          phone: 15264848125,
          education: '大学',
          married: 0,
          forbid: true,
          hobby: '旱冰、滑雪、跳高、打游戏'
        },
        {
          id: 1004,
          name: '辛八',
          sex: '男',
          phone: 15248491001,
          education: '初中',
          married: 2,
          forbid: false,
          hobby: '网球、篮球、跳伞'
        },
        {
          id: 1005,
          name: '刘二',
          sex: '女',
          phone: 15248411021,
          education: '大学',
          married: 0,
          forbid: true,
          hobby: '滑翔、游泳、篮球、看电影'
        },
        {
          id: 1006,
          name: '赵七',
          sex: '男',
          phone: 15298621500,
          education: '大专',
          married: 2,
          forbid: true,
          hobby: '游泳、篮球、潜水'
        },
        {
          id: 1007,
          name: '杨一',
          sex: '女',
          phone: 15267499461,
          education: '高中',
          married: 1,
          forbid: false,
          hobby: '冲浪、上网、看书、打游戏'
        }
      ],
      multipleSelection: [],
      tableHeader: [],
      tableData2: []
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleExport() {
      if (this.multipleSelection.length) {
        const params = {
          // 对应的表头
          header: ['编号', '姓名', '性别', '手机', '学历', '爱好'],
          // 对应的字段
          key: ['id', 'name', 'sex', 'phone', 'education', 'hobby'],
          // 选择的数据，数组类型
          data: this.multipleSelection,
          // 自动调整宽度
          autoWidth: this.exportParam.autoWidth,
          // 导出的文件名
          fileName: this.exportParam.fileName,
          // 导出的文件类型，xlsx,csv,txt
          bookType: this.exportParam.type
        }
        excel.exportDataToExcel(params)
        // 导出后清空用户的勾选选择
        this.$refs.multipleTable.clearSelection()
      } else {
        this.$message.warning('请勾选要导出的数据项！')
      }
    },
    handleSuccess({ header, results }) {
      this.tableHeader = header
      this.tableData2 = results
    }
  }
}
</script>
 
<style lang="less" scoped>
.excel-block {
  .export-excel-wrapper {
    .el-card {
      min-height: 500px;
    }
    .search-form {
      padding-top: 18px;
      margin-bottom: 15px;
      background-color: #f7f8fb;
    }
    .el-table thead {
      font-weight: 600;
      th {
        background-color: #f2f3f7;
      }
    }
  }
  .import-excel-wrapper {
    margin-top: 10px;
    .el-card {
      min-height: 400px;
    }
    .search-form {
      padding-top: 18px;
      margin-bottom: 15px;
      background-color: #f7f8fb;
    }
    .el-table thead {
      font-weight: 600;
      th {
        background-color: #f2f3f7;
      }
    }
  }
}
</style>