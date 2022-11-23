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
      value1: 1233
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
</style>
