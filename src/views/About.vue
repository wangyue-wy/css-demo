<template>
  <div>
    <div class="box">
    <div class="item" v-for="(item, index) in list" :key="index" :style="{height: `${item.height}px`}">{{index+1}}</div>
  </div>
  <div class="btn">
    <el-button type="primary" @click="$router.push('/pubu')">去瀑布流布局（不需要给最外成设置固定高度）</el-button>
  </div>
  </div>
</template>

<script>

export default {
  name: 'About',
  data () {
    return {
      list: Object.freeze([
        { height: 200 },
        { height: 210 },
        { height: 220 },
        { height: 230 },
        { height: 240 },
        { height: 250 },
        { height: 260 },
        { height: 270 },
        { height: 280 },
        { height: 290 },
        { height: 300 }
      ])
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-flow: column wrap;
  height: 890px; // 必须得设置高度
  width: 100%;
  .item {
    width: 24%;
    background: skyblue;
    font-size: 20px;
    color: white;
    margin-bottom: 6px;
  }
  // 让盒子按顺序从左到右排序，实现此功能，必须每行是四个，每列的数量应是相同
  .item:nth-child(4n+1) {
    order: 1;
  }
  .item:nth-child(4n+2) {
    order: 2;
  }
  .item:nth-child(4n+3) {
    order: 3;
  }
  .item:nth-child(4n+4) {
    order: 4;
  }
}
</style>
