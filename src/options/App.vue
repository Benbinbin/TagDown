<template>
  <div class="setting-container">
    <h2>浏览书签浮窗大小：</h2>
    <div class="input-container">
      <label for="width">宽度</label>
      <input type="range" id="width" name="width" min="300" max="800" v-model.number="width">
      <span>{{width}}</span>
    </div>
    <div class="input-container">
      <label for="height">高度</label>
      <input type="range" id="height" name="height" min="300" max="570" v-model.number="height">
      <span>{{height}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      width: 500,
      height: 500,
    };
  },
};
</script>

<style lang="scss" scoped>
.setting-container {
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
