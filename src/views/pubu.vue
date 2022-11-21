<template>
  <div class="box">
    <div class="waterfall-first">
      <div class="waterfall-first-item" v-for="(item, index) in list" :key="index">
        <div>
          <span class="flex-margin">{{ index }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.w100 {
  width: 100% !important;
}
.h100 {
  height: 100% !important;
}
.waterfall-first {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); // 设置列的宽度和列的数量
  grid-gap: 10px; // 设置行间距
  grid-auto-flow: row dense; // 改变网格布局的布局顺序 row dense表示"先行后列"，并且尽可能紧密填满，尽量不出现空格
  grid-auto-rows: 20px;
  .waterfall-first-item {
    width: 100%;
    background: skyblue;
    color: white;
    border-radius: 2px;
    &:nth-of-type(3n + 1) {
      grid-row: auto / span 5; // grid-row控制每个网格项目占空间大小
    }
    &:nth-of-type(3n + 2) {
      grid-row: auto / span 6;
    }
    &:nth-of-type(3n + 3) {
      grid-row: auto / span 8;
    }
  }
}
</style>
