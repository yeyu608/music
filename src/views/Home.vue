<template>
  <div class="home">
    <!-- 布局 -->
    <!-- 音乐 -->
    <h3>QQ音乐</h3>
    <MusicItem v-if="showFoot"></MusicItem>
    <!-- 视屏 -->
    <VideoItem v-if="!showFoot"></VideoItem>
    <!-- 内容区域 -->
    <!-- 音乐播放 -->
    <Cmusic></Cmusic>
    <!-- 底部 -->
    <div class="home-foot">
      <!-- flex 布局写项目 -->
      <i
        class="home-left iconfont icon-yinle1"
        :class="showFoot ? 'activeStyle' : ''"
        @click="selectActive(true)"
        >音乐</i
      >
      <i
        class="home-right iconfont icon-shipin"
        :class="!showFoot ? 'activeStyle' : ''"
        @click="selectActive(false)"
        >MV</i
      >
    </div>
  </div>
</template>

<script>
import MusicItem from "../components/Music/Music.vue";
import VideoItem from "../components/Video/Video.vue";
import Cmusic from "../components/Cmusic.vue";
export default {
  data() {
    return {
      showFoot: true,
    };
  },
  components: {
    MusicItem,
    VideoItem,
    Cmusic,
  },
  methods: {
    selectActive(value) {
      // 如果这个value = true => 用户点击
      if (value) {
        // 修改data中的值
        this.showFoot = value;
      } else {
        this.showFoot = value;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.home {
  padding: 0 80px;
  padding-bottom: 220px;
  h3 {
    text-align: center;
  }
  .home-foot {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    height: 220px;
    border-top: 2px solid #ccc;
    width: 100%;
    color: #ccc;
    align-items: center;
    background: #fff;
    .home-left,
    .home-right {
      flex: 1;
      text-align: center;
      font-size: 80px;
    }
    .activeStyle {
      color: #3fbf7f;
    }
  }
}
</style>