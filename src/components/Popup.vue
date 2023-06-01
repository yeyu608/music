<template>
  <div id="Popup">
    <div class="head"></div>
    <div class="foot">
      <div class="top">
          单曲循环
      </div>
      <div class="midlle"></div>
      <div class="close">
          关闭
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
#Popup {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  .head {
    height: 75%;
    background: #000;
    opacity: 0.3;
  }
  .foot {
      height: 25%;
      background: #fff;
      padding: 0 100px;
      .top{
          height: 250px;
          border-bottom: 2px solid #ccc;
          color: #000;
          line-height:250px;
          font-size:100px;
      }
      .midlle{
          height: 300px;
          background: #000;
      }
  }
}
</style>