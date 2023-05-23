<template>
  <div class="music">
    music
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="success">成功按钮</van-button>
  </div>
</template>

<script>
export default {
  name: "Music",
  mounted() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
  },
};
</script>
<style scoped lang="less">
/* scoped防止页面样式污染
    lang

*/
body {
  font-size: 36px;
}
</style>
