<template>
  <div class="home">
    <div class="select-box">
      <el-select v-model="value" placeholder="请选择数字">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <number-scroll :number = value></number-scroll>
    <div class="select-box">
      <el-select v-model="value1" placeholder="请选择数字">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="num-box">数量：<num-scroll :number="value1"></num-scroll></div>
    <div class="btn">
      <el-button type="primary" @click="$router.push('/about')">去瀑布流布局（需要给最外成设置固定高度）</el-button>
    </div>
    <div v-for="(item, index) in selectList" :key="index">
      <div>{{item.title}}</div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="op in item.list" :label="op.value" :key="op.value">{{op.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="select">
      <el-checkbox-group v-model="checkList1"  @change="handleCheckedCitiesChange">
        <div v-for="(item, index) in selectList" :key="index">
          <div>{{item.title}}</div>
          <el-checkbox v-for="op in item.list" :label="op.value" :key="op.value">{{op.label}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    NumberScroll: () => import('@/components/NumberScroll'),
    NumScroll: () => import('@/components/NumScroll')
  },
  data () {
    return {
      options1: [
        {
          value: 12345,
          label: 12345
        },
        {
          value: 9893.239,
          label: 9893.239
        },
        {
          value: 6739203,
          label: 6739203
        }
      ],
      options: [
        {
          value: 12345,
          label: 12345
        },
        {
          value: 99999,
          label: 99999
        },
        {
          value: 6739203,
          label: 6739203
        }
      ],
      value: 12345,
      value1: 1233,
      selectList: [
        {
          title: '选项1',
          list: [
            { label: '上海', value: 1 },
            { label: '北京', value: 2 },
            { label: '广州', value: 3 }
          ]
        },
        {
          title: '选项2',
          list: [
            { label: '南京', value: 4 },
            { label: '苏州', value: 5 },
            { label: '无锡', value: 6 }
          ]
        },
        {
          title: '选项3',
          list: [
            { label: '合肥', value: 7 },
            { label: '滁州', value: 8 },
            { label: '芜湖', value: 9 }
          ]
        }
      ],
      checkList: [],
      checkList1: []
    }
  },
  watch: {
    checkList: {
      handler (val) {
        console.log(val)
      },
      deep: true
    }
  },
  methods: {
    handleCheckedCitiesChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
.select-box {
  padding: 20px 0 0 20px;
}
.num-box {
  margin-top: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.select {
  padding-top: 30px;
  >div {
    font-size: 14px;
  }
}
</style>
