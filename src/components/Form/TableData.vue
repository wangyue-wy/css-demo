<template>
  <div class="table-box">
    <ul v-if="switchList.length">
      <li v-for="(item, index) in switchList" :key="index" :class="selectIndex===index ? 'select': ''" @click="selectCl(index)">{{item}}</li>
    </ul>
    <el-table
      ref="tableData"
      v-on="$listeners"
      v-bind="$attrs"
      :key="toggleIndex"
      :data="tableData"
      style="width: 100%">
      <slot name="tableColumn"></slot>
    </el-table>
    <div class="bottom-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page_no"
        :page-sizes="pagination.sizes"
        :page-size="pagination.page_size"
        :layout="pagination.layout"
        :total="pagination.total">
      </el-pagination>
      <el-dropdown @command="handleCommand">
        <el-button type="primary" size="small">
          导出<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in exportList" :key="index" :command="item.command">{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { exportDataToExcel } from '@/utils/excel.js'
  import { blobToExcel } from '@/utils/bold.js'
  import { multisExcel } from '@/utils/multi.js'
  export default {
    props: {
      switchList: {
        type: Array,
        default: () => {
          return ['一级表格', '二级表格1', '二级表格2']
        }
      },
      tableData: {
        type: Array,
        default: () => {
          return null
        }
      },
      selectIndexP: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        selectIndex: 0,
        toggleIndex: 'toggle0',
        pagination: { // 分页信息
          page_no: 1, // 当前页
          sizes: [10, 20, 30, 50], // 分页条目列表
          page_size: 10, // 分页条目
          total: 0, // 数据条数
          layout: 'total, sizes, prev, pager, next, jumper' // 分页布局
        },
        exportList: [
          { title: '导出当前页', command: '1' },
          { title: '导出全量', command: '2' }
        ]
      }
    },
    mounted () {
      this.$parent.pageInfos = {
        page_no: this.pagination.page_no,
        page_size: this.pagination.page_size
      }
    },
    methods: {
      selectCl (index) {
        this.selectIndex = index
        this.toggleIndex = `toggle${index}`
        this.$emit('update:selectIndexP', index)
        this.$emit('update:tableData', [])
        this.pagination.total = 0
        this.$bus.$emit('validate')
      },
      handleSizeChange (size) {
        this.$parent.pageInfos = {
          page_no: this.pagination.page_no,
          page_size: size
        }
        if ( this.pagination.total > 0 ) this.$emit('tableSearch')
      },
      handleCurrentChange (page) {
        this.$parent.pageInfos = {
          page_no: page,
          page_size: this.pagination.page_size
        }
         if ( this.pagination.total > 0 ) this.$emit('tableSearch')
      },
      /**
       * @param command 1 导出当前量的表格 2 导出全部数据
      **/
      handleCommand (command) {
        if (command === '1') {
          // 一级表单的导出，多级的可以让后端生成一个文件流
          const tableColum = this.$parent.tableColum
          const isMulti = tableColum.some(v => v.hasOwnProperty('child')) // 判断是一级表头还是多级表头
          if (!isMulti) {
            const params = {
              // 对应的表头
              header: [],
              // 对应的key
              key: [],
              // 对应的数据
              data: this.tableData,
              // 是否自动调整宽度
              autoWidth: true,
              // 导出的文件名
              fileName: '一级表格导出',
              // 导出的文件类型，xlsx,csv,txt
              bookType: 'xlsx'
            }
            tableColum.map(item => {
              params.header.push(item.label)
              params.key.push(item.prop)
            })
            exportDataToExcel(params)
          } else {
            multisExcel(this.$refs.tableData, '多级表头')
          }
          
          // 用后端返回的文件流导出
          // this.$post('down/load', {id: 1}, {blod: true}, {responseType: 'arraybuffer'}).then(res => {
          //   blobToExcel(res, '文件名')
          // })
        } else {
          return false
          // 调接口获取全部的数据，然后导出。
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.table-box {
  >ul {
    display: flex;
    padding-bottom: 30px;
    li {
      cursor: pointer;
      transition: all .5s;
    }
    li:not(:first-child) {
      margin-left: 20px;
    }
    .select {
      color: skyblue;
    }
  }
  /deep/ .el-pagination {
    margin-right: 10px;
  }
}
.bottom-box {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>